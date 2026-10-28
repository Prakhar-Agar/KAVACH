# Kavach Statutory Content & Legal Review Register

> **CRITICAL LEGAL NOTICE**: Legal information on Kavach is general and has not yet been reviewed by a qualified lawyer. All statutory sections, mandatory deadlines, and procedural playbooks must be independently verified against current official gazette notifications and acts before being relied upon in legal proceedings.

**Status as of 2026-10-28**: `UNVERIFIED BY LEGAL COUNSEL` (`verifiedBy: null`)

---

## 1. Statutory Provisions & Penal Codes Register (`src/data/legalReferences.ts`)

| ID | Act & Section | Description (EN) | Statutory Citation / Source | Last Reviewed | Verified By |
|---|---|---|---|---|---|
| `it_66c` | **Information Technology Act, 2000 § Section 66C** | Fraudulent or dishonest use of another person’s electronic signature, password, or unique identification feature. | Section 66C, Information Technology Act, 2000 | `2026-10-28` | **Unverified (`null`)** |
| `it_66d` | **Information Technology Act, 2000 § Section 66D** | Cheating by personating someone else using any communication device or computer resource. | Section 66D, Information Technology Act, 2000 | `2026-10-28` | **Unverified (`null`)** |
| `it_66e` | **Information Technology Act, 2000 § Section 66E** | Capturing, publishing, or transmitting images of private areas of any person without consent. | Section 66E, Information Technology Act, 2000 | `2026-10-28` | **Unverified (`null`)** |
| `it_67` | **Information Technology Act, 2000 § Section 67** | Publishing or transmitting in electronic form any material which is lascivious or appeals to prurient interest. | Section 67, Information Technology Act, 2000 | `2026-10-28` | **Unverified (`null`)** |
| `it_67a` | **Information Technology Act, 2000 § Section 67A** | Publishing or transmitting in electronic form material containing sexually explicit acts or conduct. | Section 67A, Information Technology Act, 2000 | `2026-10-28` | **Unverified (`null`)** |
| `bns_77` | **Bharatiya Nyaya Sanhita, 2023 § Section 77** | Watching or capturing the image of a woman engaging in a private act, or disseminating such images without consent. | Section 77, Bharatiya Nyaya Sanhita, 2023 | `2026-10-28` | **Unverified (`null`)** |
| `bns_78` | **Bharatiya Nyaya Sanhita, 2023 § Section 78** | Monitoring the use by a woman of the internet, email, or other electronic communication despite disinterest, causing distress. | Section 78, Bharatiya Nyaya Sanhita, 2023 | `2026-10-28` | **Unverified (`null`)** |
| `bns_79` | **Bharatiya Nyaya Sanhita, 2023 § Section 79** | Uttering any word, making any sound or gesture, or exhibiting any object intending to insult the modesty of a woman. | Section 79, Bharatiya Nyaya Sanhita, 2023 | `2026-10-28` | **Unverified (`null`)** |
| `bns_308` | **Bharatiya Nyaya Sanhita, 2023 § Section 308** | Intentionally putting any person in fear of injury and dishonestly inducing them to deliver property or valuable security. | Section 308, Bharatiya Nyaya Sanhita, 2023 | `2026-10-28` | **Unverified (`null`)** |
| `bns_351` | **Bharatiya Nyaya Sanhita, 2023 § Section 351** | Threatening another with injury to their person, reputation, or property to compel them to do an act against their will. | Section 351, Bharatiya Nyaya Sanhita, 2023 | `2026-10-28` | **Unverified (`null`)** |
| `bns_319` | **Bharatiya Nyaya Sanhita, 2023 § Section 319** | Cheating by pretending to be some other person, or knowingly substituting one person for another. | Section 319, Bharatiya Nyaya Sanhita, 2023 | `2026-10-28` | **Unverified (`null`)** |

---

## 2. Statutory Countdown Timers Register (`src/data/trackingData.ts`)

| Preset Key | Timer Title | Prescribed Duration | Statutory Basis & Rule | Benchmark Reference | Source | Verified By |
|---|---|---|---|---|---|---|
| `24h_ncii` | **24-Hour NCII Removal Window** | **24 Hours** | Rule 3(2)(b), IT Rules 2021 | From platform receipt of complaint | Rule 3(2)(b), Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 | **Unverified (`null`)** |
| `24h_acknowledgment` | **24-Hour Grievance Acknowledgment** | **24 Hours** | Rule 3(2)(a), IT Rules 2021 | From platform receipt of complaint | Rule 3(2)(a), Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 | **Unverified (`null`)** |
| `72h_removal` | **72-Hour Removal Request Window (Other Content)** | **72 Hours** | Rule 3(2)(b) & Rule 3(1)(d), IT Rules 2021 | From platform receipt of complaint | Rule 3(2)(b), Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 | **Unverified (`null`)** |
| `15d_resolution` | **15-Day Grievance Resolution Window** | **360 Hours** | Rule 3(2)(a), IT Rules 2021 | From platform receipt of complaint | Rule 3(2)(a), Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 | **Unverified (`null`)** |
| `custom` | **Custom Follow-Up Reminder** | **48 Hours** | Self-Scheduled Follow-Up | From platform receipt of complaint | Self-Scheduled Personal Reminder | **Unverified (`null`)** |

---

## 3. Statutory Escalation Pathways Register (`src/data/trackingData.ts`)

| Path ID | Escalation Strategy | Governing Statute | Core Mandatory Steps | Source | Verified By |
|---|---|---|---|---|---|
| `ncii_expired` | **Intimate Content Not Removed Within 24 Hours** | Rule 3(2)(b) & Rule 3A, IT Rules 2021 | 1. Appeal to the Grievance Appellate Committee (GAC); 2. Escalate to the National Commission for Women (NCW); 3. File a Police Zero FIR under Section 173(1) BNSS | Rule 3(2)(b) & Rule 3A, Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 | **Unverified (`null`)** |
| `police_refusal` | **Police Station Refuses to Register FIR or Issue Free Copy** | Section 173 & Section 175, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 | 1. Enforce the Zero FIR Mandate (Section 173(1) Proviso BNSS); 2. Demand Free Copy of FIR (Section 173(2) BNSS); 3. Send Written Representation to the SP / DCP (Section 173(4) BNSS); 4. File Application to Judicial Magistrate (Section 175(3) BNSS) | Section 173 & Section 175, Bharatiya Nagarik Suraksha Sanhita, 2023 | **Unverified (`null`)** |
| `intermediary_gac` | **Platform Inaction or Unresolved Grievance** | Rule 3A, IT Rules 2021 | 1. Re-Submit with SHA-256 Hashes and "Statutory Notice" Subject; 2. Escalate to Grievance Appellate Committee (GAC); 3. Dial 1930 Cybercrime Helpline | Rule 3A, Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 | **Unverified (`null`)** |

---

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
