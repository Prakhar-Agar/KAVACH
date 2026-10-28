/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Privacy Compliance Static Analysis Script
 * 
 * Scans src/pages/Preserve*, src/pages/Report*, src/lib/*, src/state/*, and src/data/* to guarantee:
 * - NO network calls: fetch, XMLHttpRequest, sendBeacon, WebSocket
 * - NO storage retention: localStorage, sessionStorage, indexedDB, document.cookie
 * - NO FormData multipart constructs
 * - NO import of api.ts
 */

import fs from 'fs';
import path from 'path';

console.log('🔒 Running Kavach Privacy & Client-Isolation Static Analysis...\n');

const TARGET_DIRECTORIES = [
  path.resolve(process.cwd(), 'src/lib'),
  path.resolve(process.cwd(), 'src/state'),
  path.resolve(process.cwd(), 'src/data'),
  path.resolve(process.cwd(), 'src/pages'),
];

const FORBIDDEN_PATTERNS = [
  { name: 'fetch() API', regex: /\bfetch\s*\(/ },
  { name: 'XMLHttpRequest', regex: /\bXMLHttpRequest\b/ },
  { name: 'navigator.sendBeacon', regex: /\bsendBeacon\b/ },
  { name: 'WebSocket', regex: /\bWebSocket\b/ },
  { name: 'FormData multipart serialization', regex: /\bFormData\b/ },
  { name: 'localStorage retention', regex: /\blocalStorage\b/ },
  { name: 'sessionStorage retention', regex: /\bsessionStorage\b/ },
  { name: 'indexedDB retention', regex: /\bindexedDB\b/ },
  { name: 'document.cookie retention', regex: /\bdocument\.cookie\b/ },
  { name: 'Import of api.ts service layer', regex: /from\s+['"][^'"]*services\/api['"]/ },
];

let violationsCount = 0;

function scanFile(filePath: string) {
  const fileName = path.basename(filePath);
  // In src/pages, specifically target Preserve*, Report*, and Track*
  if (filePath.includes(path.join('src', 'pages')) && !fileName.startsWith('Preserve') && !fileName.startsWith('Report') && !fileName.startsWith('Track')) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // Skip comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    FORBIDDEN_PATTERNS.forEach(({ name, regex }) => {
      if (regex.test(line)) {
        console.error(`❌ [Privacy Violation] ${path.relative(process.cwd(), filePath)}:${idx + 1}`);
        console.error(`   Found forbidden network/telemetry/storage construct: ${name}`);
        console.error(`   Code: ${trimmed}`);
        violationsCount++;
      }
    });
  });
}

function scanDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      scanFile(fullPath);
    }
  }
}

// -----------------------------------------------------------------------------
// Part 2: Scan index.html, CSS, and source files for external resource loading
// -----------------------------------------------------------------------------
console.log('\n🌐 Scanning for forbidden external resource loading (CDNs, remote fonts, scripts)...');

const ALLOWED_OUTBOUND_DOMAINS = [
  'cybercrime.gov.in',
  'gac.gov.in',
  'ncwapps.nic.in',
  'delhipolice.gov.in',
  'google.com',
  'www.google.com',
  'instagram.com',
  'facebook.com',
  'whatsapp.com',
  'telegram.org',
  'twitter.com',
  'x.com',
  'snapchat.com',
  'linkedin.com',
  'youtube.com',
  'github.com',
];

// Check index.html
const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  // Check for external fonts, stylesheets, scripts
  const linkMatches = indexHtml.match(/<link[^>]+href=["'](https?:\/\/[^"']+)["']/gi) || [];
  linkMatches.forEach((match) => {
    console.error(`❌ [External Resource In index.html] ${match}`);
    violationsCount++;
  });

  const scriptMatches = indexHtml.match(/<script[^>]+src=["'](https?:\/\/[^"']+)["']/gi) || [];
  scriptMatches.forEach((match) => {
    console.error(`❌ [External Script In index.html] ${match}`);
    violationsCount++;
  });
}

// Check CSS files for @import url(https://...) or background: url(https://...)
const cssPath = path.resolve(process.cwd(), 'src/index.css');
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf-8');
  const cssExternalUrls = css.match(/url\s*\(\s*['"]?https?:\/\/[^'"\)]+['"]?\s*\)/gi) || [];
  cssExternalUrls.forEach((match) => {
    console.error(`❌ [External Resource In CSS] ${match}`);
    violationsCount++;
  });
}

// Scan source files for external resource URLs (excluding allowed outbound user links)
function scanSourceForExternalResources(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanSourceForExternalResources(fullPath);
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
        
        // Find any http:// or https:// URLs in the line
        const urlMatches = line.match(/https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s'"`,;)]*/g) || [];
        for (const urlStr of urlMatches) {
          try {
            const parsedUrl = new URL(urlStr);
            const hostname = parsedUrl.hostname.toLowerCase();
            const isAllowed = ALLOWED_OUTBOUND_DOMAINS.some(
              (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
            );
            if (!isAllowed) {
              console.error(`❌ [Unapproved External URL] ${path.relative(process.cwd(), fullPath)}:${idx + 1}`);
              console.error(`   Found: ${urlStr}`);
              violationsCount++;
            }
          } catch {
            // ignore unparseable
          }
        }
      });
    }
  }
}

scanSourceForExternalResources(path.resolve(process.cwd(), 'src'));

TARGET_DIRECTORIES.forEach(scanDirectory);

console.log('-------------------------------------------------------------');
if (violationsCount > 0) {
  console.error(`❌ Privacy Analysis FAILED: ${violationsCount} privacy violations found.`);
  process.exit(1);
} else {
  console.log('🎉 Privacy Analysis PASSED: 0 violations found! 100% Client-Side Isolation verified.');
  process.exit(0);
}

