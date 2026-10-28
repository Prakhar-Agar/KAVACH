/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Generates docs/legal-review-register.md
 * Extracts all statutory references, countdown timer rules, escalation paths,
 * and complaints provisions from the codebase with their source, lastReviewed,
 * and verifiedBy fields for professional legal counsel audit.
 */

import fs from 'fs';
import path from 'path';
import { LEGAL_PROVISIONS } from '../src/data/legalReferences';
import { STATUTORY_TIMER_PRESETS, ESCALATION_PATHS } from '../src/data/trackingData';

const outputPath = path.resolve(process.cwd(), 'docs/legal-review-register.md');

let md = `# Kavach Statutory Content & Legal Review Register

> **CRITICAL LEGAL NOTICE**: Legal information on Kavach is general and has not yet been reviewed by a qualified lawyer. All statutory sections, mandatory deadlines, and procedural playbooks must be independently verified against current official gazette notifications and acts before being relied upon in legal proceedings.

**Status as of ${new Date().toISOString().slice(0, 10)}**: \`UNVERIFIED BY LEGAL COUNSEL\` (\`verifiedBy: null\`)

---

## 1. Statutory Provisions & Penal Codes Register (\`src/data/legalReferences.ts\`)

| ID | Act & Section | Description (EN) | Statutory Citation / Source | Last Reviewed | Verified By |
|---|---|---|---|---|---|
`;

Object.values(LEGAL_PROVISIONS).forEach((p) => {
  const verified = p.verifiedBy ? `\`${p.verifiedBy}\`` : '**Unverified (`null`)**';
  md += `| \`${p.id}\` | **${p.act} § ${p.section}** | ${p.description.en} | ${p.source} | \`${p.lastReviewed}\` | ${verified} |\n`;
});

md += `\n---

## 2. Statutory Countdown Timers Register (\`src/data/trackingData.ts\`)

| Preset Key | Timer Title | Prescribed Duration | Statutory Basis & Rule | Benchmark Reference | Source | Verified By |
|---|---|---|---|---|---|---|
`;

Object.entries(STATUTORY_TIMER_PRESETS).forEach(([key, t]) => {
  const verified = t.verifiedBy ? `\`${t.verifiedBy}\`` : '**Unverified (`null`)**';
  md += `| \`${key}\` | **${t.title.en}** | **${t.durationHours} Hours** | ${t.legalBasis.en} | From platform receipt of complaint | ${t.source} | ${verified} |\n`;
});

md += `\n---

## 3. Statutory Escalation Pathways Register (\`src/data/trackingData.ts\`)

| Path ID | Escalation Strategy | Governing Statute | Core Mandatory Steps | Source | Verified By |
|---|---|---|---|---|---|
`;

ESCALATION_PATHS.forEach((ep) => {
  const verified = ep.verifiedBy ? `\`${ep.verifiedBy}\`` : '**Unverified (`null`)**';
  const stepsSummary = ep.steps.map((s) => s.title.en).join('; ');
  md += `| \`${ep.id}\` | **${ep.title.en}** | ${ep.legalBasis.en} | ${stepsSummary} | ${ep.source} | ${verified} |\n`;
});

md += `\n---

## 4. Key Statutory Safeguards & Mandates Checklist

1. **Mandatory NCII Takedown**:
   - Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 mandates that intermediaries remove or disable access to non-consensual intimate imagery within **24 hours** from receipt of a complaint.
   - *Status*: General informational reference. Not yet verified by legal counsel.

2. **Intermediary Grievance Acknowledgment**:
   - Rule 3(2)(a) mandates acknowledgment within **24 hours** from receipt of complaint.
   - *Status*: General informational reference. Not yet verified by legal counsel.

3. **Grievance Appellate Committee (GAC) Appeals**:
   - Complainants aggrieved by the Grievance Officer's decision or lack of response may appeal to the GAC via [gac.gov.in](https://gac.gov.in).
   - Common window: 30 days. Complainants are explicitly advised to check gac.gov.in for current rules.

4. **Zero FIR Mandate**:
   - Section 173(1) of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 mandates registration of a Zero FIR at any police station irrespective of jurisdictional boundaries for cognizable cyber-offenses.

5. **Free Copy of FIR**:
   - Section 173(2) BNSS guarantees the informant/victim an immediate free copy of the registered First Information Report.

6. **Representation to Superintendent of Police (SP)**:
   - Section 173(4) BNSS provides that if a Station House Officer refuses to register an FIR, the aggrieved complainant may submit a written representation to the SP.

7. **Application to Judicial Magistrate**:
   - Section 175(3) BNSS provides the statutory remedy to apply before a Judicial Magistrate if the police fail to act following an SP representation.
   - *Requirements*: Must be accompanied by an affidavit verifying prior refusal under Section 173(4). Free legal representation may be sought under the Legal Services Authorities Act.

---

## 5. Formal Legal Review Sign-Off Template

- **Reviewing Advocate / Legal Counsel**: ___________________________
- **Bar Council Enrollment Number**: ___________________________
- **Jurisdiction / High Court / Bar Association**: ___________________________
- **Date of Review**: ___________________________
- **Overall Assessment**: [ ] Approved as accurate [ ] Requires Amendments
- **Specific Amendment Notes**:
  _________________________________________________________________
  _________________________________________________________________
`;

fs.writeFileSync(outputPath, md, 'utf-8');
console.log(`✅ Legal Review Register successfully generated at: ${outputPath}`);
