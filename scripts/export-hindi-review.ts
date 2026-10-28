/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Generates docs/hindi-review-sheet.md
 * Extracts all bilingual strings from translations.ts grouped by category
 * for professional linguist and legal translator review and sign-off.
 */

import fs from 'fs';
import path from 'path';
import { translations } from '../src/i18n/translations';

const outputPath = path.resolve(process.cwd(), 'docs/hindi-review-sheet.md');

const en = translations.en;
const hi = translations.hi;

// Group keys into logical categories
const categories: Record<string, string[]> = {
  '1. Global, Header & Navigation': [],
  '2. Quick Exit & Privacy': [],
  '3. Emergency Helplines & Official Portals': [],
  '4. Mode 01: First-Hour Response (Respond)': [],
  '5. Mode 02: Evidence Preservation (Preserve)': [],
  '6. Mode 03: Complaint Drafting (Report)': [],
  '7. Mode 04: Incident Tracking & Timers (Track)': [],
  '8. Demo Scenario & Guided Tour': [],
  '9. General Legal Notices & Badges': [],
  '10. Miscellaneous & Accessibility': [],
};

Object.keys(en).forEach((key) => {
  if (key.startsWith('nav') || key.startsWith('app') || key === 'documentTitle' || key === 'tagline') {
    categories['1. Global, Header & Navigation'].push(key);
  } else if (key.startsWith('quickExit') || key.startsWith('privacy') || key.startsWith('hermetic') || key.startsWith('footer')) {
    categories['2. Quick Exit & Privacy'].push(key);
  } else if (key.startsWith('helpline') || key.startsWith('help') || key === 'officialPortalLink' || key === 'emergencyDisclaimer') {
    categories['3. Emergency Helplines & Official Portals'].push(key);
  } else if (key.startsWith('modeRespond') || key.startsWith('respond')) {
    categories['4. Mode 01: First-Hour Response (Respond)'].push(key);
  } else if (key.startsWith('modePreserve') || key.startsWith('preserve') || key.startsWith('verify') || key.startsWith('guidance')) {
    categories['5. Mode 02: Evidence Preservation (Preserve)'].push(key);
  } else if (key.startsWith('modeReport') || key.startsWith('report')) {
    categories['6. Mode 03: Complaint Drafting (Report)'].push(key);
  } else if (key.startsWith('modeTrack') || key.startsWith('track')) {
    categories['7. Mode 04: Incident Tracking & Timers (Track)'].push(key);
  } else if (key.startsWith('demo') || key.startsWith('tour') || key.startsWith('clearEverything')) {
    categories['8. Demo Scenario & Guided Tour'].push(key);
  } else if (key.includes('Legal') || key.includes('Statutory') || key.includes('Badge') || key.includes('Notice')) {
    categories['9. General Legal Notices & Badges'].push(key);
  } else {
    categories['10. Miscellaneous & Accessibility'].push(key);
  }
});

let md = `# Kavach Hindi Translation & Cultural Appropriateness Review Sheet

This sheet catalogs all user-facing bilingual UI strings in **Kavach (कवच)**.

### Cultural & Trauma-Informed Quality Standard:
1. **Calm, supportive, non-intimidating tone**: Clear and respectful phrasing that empowers users under severe stress.
2. **Everyday spoken Hindi (सरल व्यावहारिक हिंदी)**: Avoid heavy Sanskritized or archaic bureaucratic terms.
3. **No raw machine translation**: Ensure natural Hindi grammar, syntax, and word order.
4. **Permitted Latin terms**: Acronyms and technical standards (e.g. SHA-256, URL, PDF, JSON, WhatsApp, FIR, Zero FIR, IT Act, BNS, BNSS) are shown with bracketed transliteration or bilingual clarity where appropriate (e.g. \`शून्य प्राथमिकी (Zero FIR)\`).

---
`;

Object.entries(categories).forEach(([categoryName, keys]) => {
  if (keys.length === 0) return;
  md += `\n## ${categoryName} (${keys.length} keys)\n\n`;
  md += `| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |\n`;
  md += `|---|---|---|:---:|\n`;

  keys.forEach((key) => {
    const enVal = (en as any)[key] || '';
    const hiVal = (hi as any)[key] || '';
    // Clean string for table markdown
    const cleanEn = String(enVal).replace(/\n/g, '<br/>').replace(/\|/g, '\\|');
    const cleanHi = String(hiVal).replace(/\n/g, '<br/>').replace(/\|/g, '\\|');
    md += `| \`${key}\` | ${cleanEn} | ${cleanHi} | [ ] Verified |\n`;
  });
});

md += `\n---

## Professional Translation Reviewer Sign-Off

- **Reviewer Name**: ___________________________
- **Organization / Credentials**: ___________________________
- **Date Reviewed**: ___________________________
- **Quality Score (1-5)**: ______
- **Linguistic / Trauma-Informed Comments**:
  _________________________________________________________________
  _________________________________________________________________
`;

fs.writeFileSync(outputPath, md, 'utf-8');
console.log(`✅ Hindi Review Sheet successfully generated at: ${outputPath}`);
