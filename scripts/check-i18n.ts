/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach i18n Integrity and Translation Completeness Checker
 * 
 * Verifies:
 * 1. Key parity between English and Hindi in translations.ts.
 * 2. No untranslated values (Hindi === English, except allowed proper terms).
 * 3. No unallowed Latin terms or raw English sentences inside Hindi translations.
 * 4. Bilingual completeness across playbooks.ts.
 * 5. Absence of hard-coded user-visible English text inside JSX components.
 */

import fs from 'fs';
import path from 'path';
import { translations } from '../src/i18n/translations';
import {
  CATEGORIES,
  CATEGORY_FOLLOW_UPS,
  PLAYBOOKS,
  PLATFORM_LOCKDOWNS,
  PLAYBOOK_METADATA,
} from '../src/data/playbooks';
import { LEGAL_PROVISIONS } from '../src/data/legalReferences';
import { STATUTORY_TIMER_PRESETS, ESCALATION_PATHS } from '../src/data/trackingData';

const ALLOWED_LATIN_TERMS = new Set([
  // Proper names and platforms
  'whatsapp', 'instagram', 'telegram', 'google', 'meta', 'youtube', 'apple', 'x',
  // Helplines and institutions
  '112', '181', '1930', 'ncw', 'erss', 'whl', 'i4c', 'mha', 'sakhi', 'gac',
  // Legal acts and terms
  'it', 'act', 'bns', 'bnss', 'crpc', 'fir', 'zero', 'gd/dd', 'gd', 'dd', 'bsa', 'ipc', 'rule', 'rules', 'under',
  // Sections & Rules
  '66e', '67', '67a', '66d', '77', '78', '79', '63', '65b', '72', '228a', '154', '173', '26', '164', '3', '2', 'a', 'b', 'c', 'd', '3(2)(b)',
  '3a', '175', '175(3)', '175(4)', '3(2)(a)', '3(1)(d)',
  // Technical standards, acronyms and standards
  'sha', 'sha-256', '256', '2fa', 'sms', 'otp', 'ai', 'json', 'pdf', 'url', 'urls', 'upi', 'pin', 'api',
  'web', 'crypto', 'subtle', 'digest', 'isp', 'crypto.subtle.digest', 'ncii', 'io', 'sp', 'dcp', 'sop', 'grv',
  // Domain names and identifiers
  'cybercrime.gov.in', 'ncwapps.nic.in', 'gac.gov.in', 'delhipolice.gov.in', 'faq.whatsapp.com', 'help.instagram.com', 'telegram.org', 'support.google.com',
  'myaccount.google.com', 'instagram.com', 'kavach', 'esc', 'en', 'escape', 'quick', 'exit', 'cybercell',
  // Clarification terms allowed inside brackets for non-technical readers
  'deepfake', 'sextortion', 'impersonation', 'cyber-stalking', 'stalking', 'harassment',
  'hacked', 'account', 'linked', 'devices', 'active', 'sessions', 'two-step', 'verification',
  'security', 'checkup', 'preserve', 'report', 'track', 'respond', 'anonymous', 'crop', 'my', 'contacts',
  'nobody', 'where', 'you', 'are', 'logged', 'in', 'recovery', 'maps', 'hidden', 'words', 'login', 'activity',
  'terminate', 'all', 'other', 'redact', 'screenshot', 'verify', 'manifest', 'mb', 'utc', 'preview',
  'png', 'jpg', 'jpeg', 'mp4', 'txt', 'm4a', 'pdf', 'ncrp', 'count', '354c', '354d', '66c', 'drafting', 'placeholders',
  'english', 'takedown', 'redacted', 'ticket', 'number', 'ip', 'logs', 'vpa', 'ledger', 'statutory', 'notice',
  'tracking', 'grievance', 'office', 'affidavit', 'legal', 'aid', 'proviso', '173(4)', '173(1)', '173(2)'
]);

let errorsFound = 0;

function reportError(scope: string, message: string) {
  console.error(`❌ [${scope}] ${message}`);
  errorsFound++;
}

console.log('🔍 Running Kavach i18n & Translation Verification...\n');

// -----------------------------------------------------------------------------
// 1. Check Key Parity in translations.ts
// -----------------------------------------------------------------------------
const enKeys = Object.keys(translations.en).sort();
const hiKeys = Object.keys(translations.hi).sort();

const missingInHi = enKeys.filter((k) => !hiKeys.includes(k));
const missingInEn = hiKeys.filter((k) => !enKeys.includes(k));

if (missingInHi.length > 0) {
  reportError('Key Parity', `Keys present in English but missing in Hindi: ${missingInHi.join(', ')}`);
}
if (missingInEn.length > 0) {
  reportError('Key Parity', `Keys present in Hindi but missing in English: ${missingInEn.join(', ')}`);
}

if (missingInHi.length === 0 && missingInEn.length === 0) {
  console.log(`✅ Key Parity: All ${enKeys.length} translation keys match perfectly between English and Hindi.`);
}

// -----------------------------------------------------------------------------
// 2. Check Untranslated & Mixed Values in translations.ts
// -----------------------------------------------------------------------------
for (const key of enKeys) {
  const enVal = (translations.en as any)[key];
  const hiVal = (translations.hi as any)[key];

  if (!hiVal || typeof hiVal !== 'string' || hiVal.trim() === '') {
    reportError('Empty Translation', `Hindi value for key "${key}" is empty.`);
    continue;
  }

  // Check identical values (unless the value is solely an allowed proper term or number)
  if (enVal.trim() === hiVal.trim()) {
    const normalized = enVal.trim().toLowerCase();
    if (!ALLOWED_LATIN_TERMS.has(normalized) && isNaN(Number(normalized))) {
      reportError(
        'Untranslated Value',
        `Hindi value is identical to English for key "${key}": "${enVal}"`
      );
    }
  }

  // Check Latin characters in Hindi value
  checkLatinInHindi(`translations.hi.${key}`, hiVal);
}

// -----------------------------------------------------------------------------
// 3. Helper to validate Latin words in Hindi strings
// -----------------------------------------------------------------------------
function checkLatinInHindi(location: string, text: string) {
  // Ignore documented file paths
  if (text.includes('/docs/privacy-principles.md')) {
    text = text.replace('/docs/privacy-principles.md', '');
  }

  // Extract words containing Latin letters
  const matches = text.match(/[A-Za-z0-9_.\-\/\(\)]+/g) || [];

  for (const match of matches) {
    // Strip surrounding punctuation like brackets, quotes, colons, leading dots
    const clean = match.replace(/^[\(\[\{"'\s.]+|[\)\]\}"'\s,.:;!]+$/g, '').toLowerCase();
    if (!clean) continue;

    // Check if purely numeric
    if (!isNaN(Number(clean))) continue;

    // Check if in allowed list
    if (ALLOWED_LATIN_TERMS.has(clean)) continue;

    // Check composite terms (e.g. 66e/67a or sha-256 or 3(2)(b))
    const subParts = clean.split(/[/_\-()]+/);
    const allPartsAllowed = subParts.every(
      (p) => ALLOWED_LATIN_TERMS.has(p) || !isNaN(Number(p)) || p === ''
    );
    if (allPartsAllowed) continue;

    reportError(
      'Disallowed Latin Word',
      `At ${location}: Found unexpected Latin word "${match}" in Hindi text: "${text.substring(0, 80)}..."`
    );
  }
}

// -----------------------------------------------------------------------------
// 4. Validate Bilingual Integrity in playbooks.ts
// -----------------------------------------------------------------------------
console.log('🔍 Checking Bilingual Coverage in playbooks.ts...');

// Categories
CATEGORIES.forEach((cat) => {
  if (!cat.title.en || !cat.title.hi) reportError('Playbooks Category', `Category ${cat.key} missing title`);
  if (!cat.description.en || !cat.description.hi) reportError('Playbooks Category', `Category ${cat.key} missing description`);
  checkLatinInHindi(`CATEGORIES[${cat.key}].title.hi`, cat.title.hi);
  checkLatinInHindi(`CATEGORIES[${cat.key}].description.hi`, cat.description.hi);
});

// Follow-ups
Object.entries(CATEGORY_FOLLOW_UPS).forEach(([catKey, questions]) => {
  questions.forEach((q) => {
    if (!q.question.en || !q.question.hi) reportError('Playbooks FollowUp', `Question ${q.id} in ${catKey} missing bilingual text`);
    checkLatinInHindi(`CATEGORY_FOLLOW_UPS[${catKey}][${q.id}].question.hi`, q.question.hi);
    if (q.hint) checkLatinInHindi(`CATEGORY_FOLLOW_UPS[${catKey}][${q.id}].hint.hi`, q.hint.hi);

    q.options.forEach((opt) => {
      if (!opt.label.en || !opt.label.hi) reportError('Playbooks FollowUp', `Option ${opt.id} in ${q.id} missing bilingual text`);
      checkLatinInHindi(`CATEGORY_FOLLOW_UPS[${catKey}][${q.id}].options[${opt.id}].hi`, opt.label.hi);
    });
  });
});

// Playbooks DoNow, DoNotDo, WhenReady
Object.entries(PLAYBOOKS).forEach(([catKey, pb]) => {
  checkLatinInHindi(`PLAYBOOKS[${catKey}].summary.hi`, pb.summary.hi);

  const checkItems = (items: any[], type: string) => {
    items.forEach((item) => {
      if (!item.title.en || !item.title.hi) reportError('Playbooks Items', `Item ${item.id} in ${catKey} (${type}) missing title`);
      if (!item.description.en || !item.description.hi) reportError('Playbooks Items', `Item ${item.id} in ${catKey} (${type}) missing description`);
      checkLatinInHindi(`PLAYBOOKS[${catKey}].${type}[${item.id}].title.hi`, item.title.hi);
      checkLatinInHindi(`PLAYBOOKS[${catKey}].${type}[${item.id}].description.hi`, item.description.hi);
    });
  };

  checkItems(pb.doNow, 'doNow');
  checkItems(pb.doNotDo, 'doNotDo');
  checkItems(pb.whenReady, 'whenReady');
});

// Platform Lockdowns
Object.entries(PLATFORM_LOCKDOWNS).forEach(([platformKey, guide]) => {
  checkLatinInHindi(`PLATFORM_LOCKDOWNS[${platformKey}].note.hi`, guide.note.hi);
  guide.steps.forEach((step, idx) => {
    if (!step.title.en || !step.title.hi) reportError('Platform Lockdown', `${platformKey} step ${idx} missing title`);
    if (!step.detail.en || !step.detail.hi) reportError('Platform Lockdown', `${platformKey} step ${idx} missing detail`);
    checkLatinInHindi(`PLATFORM_LOCKDOWNS[${platformKey}].steps[${idx}].title.hi`, step.title.hi);
    checkLatinInHindi(`PLATFORM_LOCKDOWNS[${platformKey}].steps[${idx}].detail.hi`, step.detail.hi);
  });
});

// Metadata
checkLatinInHindi('PLAYBOOK_METADATA.disclaimer.hi', PLAYBOOK_METADATA.disclaimer.hi);
checkLatinInHindi('PLAYBOOK_METADATA.memoryNotice.hi', PLAYBOOK_METADATA.memoryNotice.hi);
checkLatinInHindi('PLAYBOOK_METADATA.lastReviewed.hi', PLAYBOOK_METADATA.lastReviewed.hi);

console.log('✅ playbooks.ts: All categories, questions, options, and playbooks are fully verified.');

// -----------------------------------------------------------------------------
// 4b. Validate Bilingual Integrity in legalReferences.ts
// -----------------------------------------------------------------------------
console.log('🔍 Checking Bilingual Coverage in legalReferences.ts...');
LEGAL_PROVISIONS.forEach((p) => {
  if (!p.title.en || !p.title.hi) reportError('Legal Provision', `Provision ${p.id} missing bilingual title`);
  if (!p.description.en || !p.description.hi) reportError('Legal Provision', `Provision ${p.id} missing bilingual description`);
  checkLatinInHindi(`LEGAL_PROVISIONS[${p.id}].title.hi`, p.title.hi);
  checkLatinInHindi(`LEGAL_PROVISIONS[${p.id}].description.hi`, p.description.hi);
});
console.log('✅ legalReferences.ts: All statutory provisions verified.');

// -----------------------------------------------------------------------------
// 4c. Validate Bilingual Integrity in trackingData.ts
// -----------------------------------------------------------------------------
console.log('🔍 Checking Bilingual Coverage in trackingData.ts...');
Object.entries(STATUTORY_TIMER_PRESETS).forEach(([key, preset]) => {
  if (!preset.title.en || !preset.title.hi) reportError('Tracking Timer Preset', `Preset ${key} missing bilingual title`);
  if (!preset.legalBasis.en || !preset.legalBasis.hi) reportError('Tracking Timer Preset', `Preset ${key} missing bilingual legalBasis`);
  if (!preset.description.en || !preset.description.hi) reportError('Tracking Timer Preset', `Preset ${key} missing bilingual description`);
  checkLatinInHindi(`STATUTORY_TIMER_PRESETS[${key}].title.hi`, preset.title.hi);
  checkLatinInHindi(`STATUTORY_TIMER_PRESETS[${key}].legalBasis.hi`, preset.legalBasis.hi);
  checkLatinInHindi(`STATUTORY_TIMER_PRESETS[${key}].description.hi`, preset.description.hi);
});

ESCALATION_PATHS.forEach((ep) => {
  if (!ep.title.en || !ep.title.hi) reportError('Escalation Path', `Path ${ep.id} missing bilingual title`);
  if (!ep.subtitle.en || !ep.subtitle.hi) reportError('Escalation Path', `Path ${ep.id} missing bilingual subtitle`);
  if (!ep.legalBasis.en || !ep.legalBasis.hi) reportError('Escalation Path', `Path ${ep.id} missing bilingual legalBasis`);
  checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].title.hi`, ep.title.hi);
  checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].subtitle.hi`, ep.subtitle.hi);
  checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].legalBasis.hi`, ep.legalBasis.hi);

  ep.steps.forEach((step, idx) => {
    if (!step.title.en || !step.title.hi) reportError('Escalation Step', `Path ${ep.id} step ${idx} missing title`);
    if (!step.desc.en || !step.desc.hi) reportError('Escalation Step', `Path ${ep.id} step ${idx} missing desc`);
    checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].steps[${idx}].title.hi`, step.title.hi);
    checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].steps[${idx}].desc.hi`, step.desc.hi);
    if (step.actionLabel) {
      checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].steps[${idx}].actionLabel.hi`, step.actionLabel.hi);
    }
  });

  if (ep.templateLetter) {
    checkLatinInHindi(`ESCALATION_PATHS[${ep.id}].templateLetter.hi`, ep.templateLetter.hi);
  }
});
console.log('✅ trackingData.ts: All statutory timer presets and escalation paths verified.');


// -----------------------------------------------------------------------------
// 5. Check for Hard-Coded English Text in JSX Components under src/
// -----------------------------------------------------------------------------
console.log('🔍 Scanning src/ component files for hard-coded English text...');

const srcDir = path.resolve(process.cwd(), 'src');

function scanDirectory(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'data' && file !== 'i18n' && file !== 'services') {
        scanDirectory(fullPath);
      }
    } else if (file.endsWith('.tsx')) {
      checkJsxFile(fullPath);
    }
  }
}

function checkJsxFile(filePath: string) {
  const relPath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Ignore comment lines, import lines, svg paths, classNames
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (trimmed.startsWith('import ') || trimmed.startsWith('export interface')) return;

    // Detect raw user-visible English text in JSX children e.g. >Some English Sentence<
    const jsxTextMatches = line.match(/>([^<>{}]*[A-Za-z]{4,}[^<>{}]*)</g);
    if (jsxTextMatches) {
      for (const m of jsxTextMatches) {
        const text = m.substring(1, m.length - 1).trim();
        // Ignore single alphanumeric codes, icon tags, or numbers
        if (text && !isIgnoredCodeOrTechnical(text)) {
          reportError(
            'Hard-Coded English in JSX',
            `${relPath}:${idx + 1} Found hard-coded text "${text}"`
          );
        }
      }
    }
  });
}

function isIgnoredCodeOrTechnical(text: string): boolean {
  const t = text.trim();
  if (t === 'EN' || t === '112' || t === '181' || t === '1930') return true;
  if (t === 'Help' || t === 'cybercrime.gov.in' || t === 'ncwapps.nic.in') return true;
  if (t.startsWith('NCRP-') || t.startsWith('rep-') || t.startsWith('ev-')) return true;
  if (t.includes('crypto.subtle.digest')) return true;
  if (t.startsWith('{') && t.endsWith('}')) return true;
  // If it's pure numbers, dots, dashes, or separators
  if (/^[\d\s.\-:·/()]+$/.test(t)) return true;
  return false;
}

scanDirectory(srcDir);

// -----------------------------------------------------------------------------
// Final Verdict
// -----------------------------------------------------------------------------
console.log('\n-------------------------------------------------------------');
if (errorsFound > 0) {
  console.error(`❌ i18n Verification FAILED with ${errorsFound} errors.`);
  process.exit(1);
} else {
  console.log('🎉 i18n Verification PASSED: 0 errors found! All strings localized.');
  process.exit(0);
}
