# Kavach (कवच) — Project Progress & Implementation Status

**Project Name**: Kavach (कवच)  
**Tagline**: Privacy-First Cyber-Abuse Response and Reporting Companion for Women in India  
**Development App URL**: `https://ais-dev-taqq5uncfjfuj53ylomeps-688351316340.asia-northeast1.run.app`  
**Shared App URL**: `https://ais-pre-taqq5uncfjfuj53ylomeps-688351316340.asia-northeast1.run.app`  
**Current Milestone**: Phase 5 (TRACK Mode) Completed — Full Core Suite Functional & Verified  
**Date**: October 2026  

---

## 1. Executive Summary

**Kavach (कवच)** is an in-browser digital crisis response and forensic reporting companion engineered for women and at-risk individuals in India facing cyber harassment, non-consensual intimate imagery (NCII / "revenge porn"), deepfakes, sextortion, digital stalking, impersonation, and online threats.

Unlike conventional platforms that require user logins, store intimate media in the cloud, or introduce third-party trackers, Kavach is built on an absolute **zero-knowledge, zero-storage, 100% client-side architecture**. The platform provides four core operational modes:

- **Mode 01: RESPOND (`/respond`)** — First-Hour Cyber-Abuse Incident Classification & Safety Action Playbook.
- **Mode 02: PRESERVE (`/preserve`)** — In-Browser Cryptographic Evidence Vault with Web Crypto SHA-256 Hashing & Canonical Manifest Export.
- **Mode 03: REPORT (`/report`)** — Deterministic Bilingual Complaint Drafter with Dual-Version Output & Client-Side PII Redaction.
- **Mode 04: TRACK (`/track`)** — In-Memory Complaint Tracking Ledger, Statutory Countdown Timers, and Escalation Playbooks.

---

## 2. Non-Negotiable Privacy Principles (8 Core Guarantees)

Kavach strictly preserves all 8 privacy rules documented in `docs/privacy-principles.md`:

| # | Privacy Rule | Architectural Implementation |
|---|---|---|
| **1** | **Zero Cloud Uploads** | 100% of hashing, text drafting, timer calculations, and redactions execute in browser memory. 0 bytes are transmitted over the network. |
| **2** | **No Intimate Image Retention** | Files are processed into ArrayBuffers in volatile RAM only. Preview objects use temporary blob URLs with click-to-reveal blur and explicit `URL.revokeObjectURL` cleanup. |
| **3** | **No AI / LLM Processing** | All playbooks, legal suggestions, and complaint documents are generated through deterministic template interpolation. Zero external LLM APIs are invoked. |
| **4** | **Zero Third-Party Storage or Trackers** | Absolute prohibition of `localStorage`, `sessionStorage`, `indexedDB`, and cookies. No Google Analytics, telemetry, or third-party trackers are bundled. |
| **5** | **Transient In-Memory Staging** | State lives solely in transient React Contexts (`EvidenceContext`, `TrackingContext`). If the tab closes or refreshes, all data evaporates immediately unless explicitly exported by the user. |
| **6** | **Transparent Boundaries** | Kavach never submits complaints directly or pretends to be law enforcement. It explicitly prepares drafts and manifests for the user to file on official portals (`cybercrime.gov.in`, `gac.gov.in`, or police stations). |
| **7** | **Client-Side Cryptography & Redaction** | Web Crypto API SHA-256 (`crypto.subtle.digest`) computes forensic hashes; local regular expressions detect and redact 7 sensitive PII entity types. |
| **8** | **Synthetic Demo Data Only** | Built-in sample records ("Try with a sample file", "Try with Sample Record") utilize purely fictitious, non-personal data for safe demonstration and testing. |

---

## 3. Completed Milestones

### Milestone 1: Foundation, Shell & Accessibility Architecture
- **Trauma-Informed Design**: High-contrast Charcoal (`#090D16` / `#0F172A`) base with Sky Blue (`#0284C7` / `#38BDF8`) action triggers and large, accessible touch targets ($\ge 44\text{px}$).
- **Anti-Slop Discipline**: Zero-pill discipline (rounded-md/lg), crisp metadata hierarchies, high-contrast assurance badges.
- **24/7 Emergency Dialing Bar**: Persistent footer with direct telephone links for **112** (All-India Emergency), **181** (Women's Helpline), and **1930** (Cybercrime Helpline).
- **Hardened Quick Exit**: Instant window redirection to Google Search via button and <kbd>Esc</kbd> keyboard shortcut, complete with local browser history disclosure. Hardened to prevent accidental triggering when typing inside input/textarea fields or modal dialogs.
- **Database Schema & Separation**: `supabase/schema.sql` providing metadata-only Postgres tables (`evidence_manifest`, `reports`) with Row-Level Security (RLS) prohibiting media binaries or incident narrative text. Configurable `src/services/api.ts` abstraction layer intentionally kept unused by client-only tools.
- **Bilingual Infrastructure**: Instant toggling between English and natural, everyday Hindi (`hi`). Loaded with **Noto Sans Devanagari** and Plus Jakarta Sans. Synchronizes `<html lang>` and `<title>`.

### Milestone 2: Hindi Translation Overhaul & Automated Checker
- **Zero Hardcoded Text in JSX**: Extracted all user-visible strings across all screens into `src/i18n/translations.ts`.
- **Authentic, Everyday Hindi**: Natural, empathetic, and culturally accessible phrasing in simple Hindi.
- **Font & Layout Quality**: Tested responsive layout down to 360px mobile width without horizontal overflow.
- **Automated Checker (`npm run check:i18n`)**:
  - Validates key parity across all 496 translation keys in `translations.ts`.
  - Enforces bilingual coverage across `src/data/playbooks.ts`, `src/data/captureGuidance.ts`, `src/data/legalReferences.ts`, and `src/data/trackingData.ts`.
  - Flags unallowed Latin characters in Hindi strings.
  - Automatically scans `.tsx` components in `src/` to prevent regressions of hard-coded English strings.

### Milestone 3: Phase 2: RESPOND Mode (`/respond`)
- **Guided 4-Step Interactive Flow**:
  1. **Category Selection**: 7 incident categories (Blackmail/Sextortion, Intimate Image/Deepfake, Impersonation, Stalking, Harassment, Account Compromise, and "I'm not sure").
  2. **Immediate Danger Check**: Immediate screening for physical peril with direct 1-tap **112** call button and Sakhi Centre guidance.
  3. **Context Assessment**: 2–3 skippable, non-invasive follow-up questions tailored per category.
  4. **First-Hour Action Playbook**:
     - **Do Now**, **Do NOT Do**, and **When Ready** task tabs with progress indicator.
     - Platform lockdown guides for **WhatsApp** (2FA, Linked Devices), **Instagram** (Login Activity, Restrict), **Telegram** (Active Sessions), and **Google** (Security Checkup).
     - Direct routing to `/preserve`, `/report`, and `/track` with category context.

### Milestone 4: Phase 3: PRESERVE Mode (`/preserve`) & Cryptographic Vault
- **In-Browser Web Crypto Hashing Engine (`src/lib/hash.ts`)**:
  - `calculateSHA256(file: File)`: Uses standard browser-native `crypto.subtle.digest('SHA-256', arrayBuffer)` returning a 64-character lowercase hexadecimal hash.
  - 100 MB hard limit guard (`MAX_FILE_SIZE_BYTES`): Gracefully catches oversized files with bilingual alert to prevent browser memory exhaustion.
  - `calculateManifestHash(entries: any[])`: Produces deterministic SHA-256 checksums over canonical JSON structures (recursively sorted keys, no whitespace).
  - Strict privacy enforcement: Zero `console.log` of file names, contents, or hashes.
- **Evidentiary Forensic Guidance (`src/data/captureGuidance.ts`)**:
  - Contextual banners explaining how to capture screenshots (showing full URLs, system time, usernames, status bars) and screen recordings.
- **Evidence Management & Staging (`src/pages/PreservePage.tsx`)**:
  - Drag-and-drop file target + native multi-file picker.
  - Synthetic sample generator ("Try with a sample file").
  - Safe in-memory preview with default blur (`blur-md`), click-to-reveal, and automatic `URL.revokeObjectURL` cleanup.
  - Structured JSON manifest download & print/PDF export.
  - Integrity verification against active items or external imported manifests.

### Milestone 5: Phase 4: REPORT Mode (`/report`) & Dual-Version Drafter
- **Shared In-Memory Evidence Context (`src/state/EvidenceContext.tsx`)**:
  - Lifted evidence items and incident category state to an application-level React Context.
  - Preserves evidence state across client navigation between `/preserve`, `/respond`, and `/report`.
  - Strictly in-memory: 0 bytes in `localStorage`, `sessionStorage`, `indexedDB`, or cookies.
  - Global `beforeunload` listener protects unexported evidence in memory.
- **Deterministic Bilingual Templates (`src/data/complaintTemplates.ts`)**:
  - Generates official Police / Cybercrime Complaint drafts and Platform Takedown Requests in English and Hindi.
  - **7 Mandated Police Complaint Sections** in strict chronological order:
    1. Subject line and nature of complaint
    2. Complainant's account of events (using strictly user-entered facts)
    3. Chronological timeline
    4. Platform URLs and suspect account identifiers
    5. Evidence inventory with evidence IDs and SHA-256 hashes
    6. Requested action (investigation, server log preservation, content blocking)
    7. Declaration of truth with signature, date, and place placeholders
  - **Zero Hallucination Rule**: Any missing information is rendered as a visible square-bracket placeholder (`[Your Full Name]`, `[Date and Time]`), never an invented value.
- **Curated Statutory References (`src/data/legalReferences.ts`)**:
  - Curated rule set covering IT Act (66C, 66D, 66E, 67, 67A) and BNS (77, 78, 79, 308, 351, 319).
  - All marked unverified (`verifiedBy: null`) with prominent badge: *"Not yet verified by a legal professional"*.
  - Advisory disclaimer: *"These are suggestions for a qualified person to verify. This is not legal advice."*
  - Opt-in checkbox (OFF by default). When enabled, uses non-binding request phrasing.
- **Client-Side Redaction Engine (`src/lib/redact.ts`)**:
  - Identifies 7 entity types: phone numbers, email addresses, profile URLs, UPI IDs, 12-digit Aadhaar-style numbers, long digit sequences (cards/accounts), security PINs/OTPs, and custom user-specified words.
  - Smart Defaults: Complainant PII, Aadhaar numbers, and secrets default to ON (concealed); perpetrator URLs, handles, and UPI IDs default to OFF (preserved for police investigation).
- **Two Distinct Output Versions**:
  - **Official Full Version**: Keeps perpetrator handles, URLs, and payment IDs for official law enforcement action.
  - **Redacted Copy**: Replaces selected complainant details with `[REDACTED]` markers for safe sharing with trusted friends, counselors, or advocates.

### Milestone 6: Phase 5: TRACK Mode (`/track`) & Statutory Compliance Engine
- **In-Memory Tracking Context (`src/state/TrackingContext.tsx`)**:
  - Encapsulates tracking records (`records`) and statutory timers (`timers`) in tab memory.
  - Zero browser storage persistence (`localStorage` = 0, `indexedDB` = 0).
  - `beforeunload` lifecycle hook protects unsaved tracking records and countdown timers.
  - Periodic background updater recalculating active, warning (< 4h), and expired statuses.
- **Statutory Countdown Timers (`src/data/trackingData.ts`)**:
  - **24-Hour NCII Removal Window**: Under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
  - **72-Hour Grievance & Cybercrime Portal Acknowledgment Window**: Under Rule 3(2)(a) IT Rules 2021 & standard police inquiry protocols.
  - **15-Day Grievance Resolution Window**: Under Rule 3(2)(a) IT Rules 2021.
  - **Custom Timers**: Flexible duration for personal officer follow-up.
  - Live visual readout with seconds, minutes, hours, and overdue calculation.
- **Complaint Submission Ledger (`src/pages/TrackPage.tsx`)**:
  - Multi-authority logging: NCRP (cybercrime.gov.in), Police Station (FIR / Zero FIR / GD), Platform Grievance Officer, National Commission for Women (NCW), Grievance Appellate Committee (GAC).
  - Copyable reference / acknowledgment numbers with single-tap toast.
  - Quick status dropdown: *Draft Prepared*, *Submitted*, *Acknowledged*, *Under Investigation*, *Content Removed / Action Taken*, *Escalated*, *Closed / FIR Registered*.
  - Dated follow-up notes timeline with inline note addition.
  - Instant synthetic demo data loader ("Try with Sample Record").
- **Statutory Escalation Playbooks**:
  - **Intimate Content Not Removed within 24 Hours**: Direct escalation to Grievance Appellate Committee (`gac.gov.in`), NCW (`ncwapps.nic.in`), and Police Zero FIR under BNS 77 / IT Act 67A. Includes copyable statutory notice template citing intermediary liability forfeiture under Section 79(3)(b) IT Act.
  - **Police Station Refuses to Register FIR**: Step-by-step enforcement of Zero FIR under Section 173(1) proviso BNSS 2023, right to free copy of FIR under Section 173(2) BNSS, representation to Superintendent of Police (SP) under Section 175(3) BNSS, and Magistrate application under Section 175(4) BNSS.
  - **Platform Unresponsive After 72 Hours**: Escalation to GAC under Rule 3A IT Rules 2021 and 1930 Cybercrime Helpline.
- **Client-Side Export & Portability**:
  - Export structured JSON ledger (`kavach-tracking-ledger-[date].json`) allowing cross-session resumption without cloud storage.
  - Export formatted text summary (`kavach-tracking-summary-[date].txt`).
  - Print / Save as PDF summary sheet.
  - Re-import previously exported JSON ledger directly into memory.

---

## 4. Indian Statutory & Regulatory Compliance Matrix

| Statute & Section | Legal Mandate / Scope | Implementation in Kavach |
|---|---|---|
| **Rule 3(2)(b), IT Rules 2021** | Intermediaries must remove or disable access to non-consensual intimate or morphed imagery within **24 hours** of receipt of notice. | Dedicated 24h NCII Countdown Timer in Track Mode; automated statutory notice template; direct link to GAC appeal. |
| **Rule 3(2)(a), IT Rules 2021** | Grievance Officer must acknowledge complaint within **72 hours** and dispose of it within **15 days**. | 72-hour acknowledgment timer and 15-day resolution timer in Track Mode; escalation guidance upon expiry. |
| **Rule 3A, IT Rules 2021** | Aggrieved users may appeal Grievance Officer orders to the Grievance Appellate Committee (GAC). | Integrated GAC escalation playbook and direct links to `https://gac.gov.in`. |
| **Section 173(1), BNSS 2023** | Mandatory registration of FIR for cognizable offences irrespective of territorial jurisdiction (**Zero FIR**). | Zero FIR guidance and legal rights card across Help, Report, and Track modes. |
| **Section 173(2), BNSS 2023** | Informant is legally entitled to a free copy of the FIR immediately upon registration. | Documented rights reminder in Police complaint drafting and tracking follow-up. |
| **Section 175(3) & (4), BNSS 2023** | Remedy against police refusal: Written representation to Superintendent of Police (SP) and application to Judicial Magistrate. | Step-by-step escalation roadmap with actionable copyable letters in Track Mode. |
| **Section 66E, IT Act 2000** | Punishment for violation of privacy (capturing/publishing intimate images without consent). | Curated, non-binding legal suggestion module in complaint drafter. |
| **Section 67 & 67A, IT Act 2000** | Punishment for publishing or transmitting sexually explicit content electronically. | Pre-configured statutory suggestion for intimate imagery and sextortion complaints. |
| **Section 77, BNS 2023** | Voyeurism (capturing or disseminating images of private acts). | Suggested statutory provision in complaint generator. |
| **Section 78, BNS 2023** | Stalking (monitoring a woman's electronic communication or physical movements). | Suggested statutory provision for cyber-stalking incidents. |
| **Section 79, BNS 2023** | Word, gesture, or act intended to insult the modesty of a woman. | Suggested statutory provision for online sexual harassment. |

---

## 5. Automated Test Suite & QA Verification

All 7 automated test commands pass cleanly with **0 errors and 0 warnings**:

| Test Command | Scope & Purpose | Result |
| :--- | :--- | :--- |
| `npm run lint` | TypeScript compilation check (`tsc --noEmit`) across all files. | **PASSED** (0 errors) |
| `npm run build` | Full production Vite client bundle compilation. | **PASSED** (0 errors) |
| `npm run check:i18n` | Validates key parity (496 keys), playbooks, legal references, tracking data, and audits JSX components for hardcoded English. | **PASSED** (0 errors) |
| `npm run test:hash` | Validates SHA-256 calculation against NIST/FIPS 180-4 test vectors (empty string & `"abc"`). | **PASSED** (0 errors) |
| `npm run check:privacy` | Static analysis scanning `src/lib/`, `src/state/`, `src/data/`, and `src/pages/` for forbidden network calls (`fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`), storage (`localStorage`, `sessionStorage`, `indexedDB`, `cookies`), `FormData`, or `api.ts` imports. | **PASSED** (0 violations) |
| `npm run test:report` | Verifies placeholder generation, strict 7-section ordering, non-binding legal phrasing, Hindi template integrity, and entity redaction detection. | **PASSED** (0 errors) |
| `npm run test:track` | Verifies statutory timer presets (24h NCII Rule 3(2)(b), 72h Rule 3(2)(a)), countdown arithmetic, synthetic demo data, JSON manifest round-trip, and escalation legal paths. | **PASSED** (0 errors) |

---

## 6. File Inventory

```
/
├── docs/
│   └── privacy-principles.md        # The 8 non-negotiable rules + Report & Track privacy guides
├── scripts/
│   ├── check-i18n.ts                # Bilingual completeness & JSX hardcoded string checker
│   ├── check-privacy.ts             # Static analyzer for zero network, storage, & client-isolation
│   ├── test-hash.ts                 # NIST FIPS 180-4 test vector verification script
│   ├── test-report.ts               # Complaint drafting, 7-section ordering, & redaction tester
│   └── test-track.ts                # Statutory timer arithmetic, ledger lifecycle, & escalation tester
├── src/
│   ├── components/
│   │   ├── Footer.tsx               # Emergency dial links (112, 181, 1930) + disclaimers
│   │   └── Header.tsx               # Nav, language switcher, Esc-hardened Quick Exit
│   ├── data/
│   │   ├── captureGuidance.ts       # Typed category-matched capture guides
│   │   ├── complaintTemplates.ts    # Deterministic bilingual complaint & takedown templates
│   │   ├── legalReferences.ts       # 11 curated statutory references (marked unverified)
│   │   ├── playbooks.ts             # Typed bilingual triage questions & first-hour guides
│   │   └── trackingData.ts          # Statutory timer presets, escalation paths, & synthetic demo data
│   ├── i18n/
│   │   ├── LanguageContext.tsx      # Language state provider with dynamic html lang / title
│   │   └── translations.ts          # Comprehensive English & Hindi dictionaries (496 keys)
│   ├── lib/
│   │   ├── hash.ts                  # Web Crypto SHA-256, 100MB guard, canonical JSON manifest
│   │   └── redact.ts                # Regex entity detection, PII concealment, & custom words
│   ├── pages/
│   │   ├── HelpPage.tsx             # Official resources, Zero-FIR rights, statutory guides
│   │   ├── HomePage.tsx             # Calm portal view with 4 mode cards & safety principles
│   │   ├── ModePlaceholderPage.tsx  # Fallback shell
│   │   ├── PreservePage.tsx         # Phase 3: Preserve & Verify mode implementation
│   │   ├── PrivacyPage.tsx          # Privacy principles & cryptographic truth architecture
│   │   ├── ReportPage.tsx           # Phase 4: 6-step complaint drafter & dual-version export
│   │   ├── RespondPage.tsx          # Phase 2: 4-step triage flow & action playbooks
│   │   └── TrackPage.tsx            # Phase 5: In-memory tracking ledger & countdown timers
│   ├── services/
│   │   └── api.ts                   # Abstracted API service layer (mocked, unused by client tools)
│   ├── state/
│   │   ├── EvidenceContext.tsx      # In-memory shared evidence state & beforeunload protection
│   │   └── TrackingContext.tsx      # In-memory complaint ledger, statutory timers, & export/import
│   ├── App.tsx                      # HashRouter routing & application shell
│   ├── index.css                    # Tailwind CSS v4 + Noto Sans Devanagari typography
│   └── main.tsx                     # React 19 root entrypoint
├── index.html                       # HTML entry point with window.fetch safety accessor
├── package.json                     # Dependencies & custom test scripts
└── metadata.json                    # Application metadata
```

---

## 7. Step-by-Step Testing Walkthrough for Reviewers

### A. Testing Track Mode (Ledger & Statutory Timers)
1. Navigate to `/track` (or click **Track Report** on Home or in Header).
2. Click **"Try with Sample Record"** (`नमूने का रिकॉर्ड आज़माएं`):
   - Notice two realistic synthetic records appear: an NCRP portal complaint and an Instagram takedown notice.
   - Notice two statutory countdown timers appear: an active 72-hour acknowledgment timer and an expired 24-hour NCII removal timer.
3. Observe the expired 24h NCII timer:
   - Notice the prominent badge: *"Statutory Window Expired — Time to Escalate"* (`वैधानिक समय सीमा समाप्त — आगे कदम उठाएं`).
   - Click **"View Escalation Steps"** (`अगले कानूनी कदम देखें`).
   - Verify the escalation guidance details Rule 3(2)(b) compliance, links to `https://gac.gov.in` and `https://ncwapps.nic.in`, and provides a copyable statutory appeal notice.
4. Add a manual complaint record:
   - Click **"Add Complaint Record"** (`शिकायत रिकॉर्ड जोड़ें`).
   - Select authority (e.g. Police Station), enter reference number, officer contact, and initial notes.
   - Save to memory. Verify it immediately appears in the ledger list.
   - Click on the reference number copy button; verify toast confirms copy.
   - Use the quick status dropdown to update status (e.g. from *Submitted* to *Under Investigation*).
   - Click **"Add Note"** to append a timestamped diary entry.
5. Start a new timer:
   - Click **"Start Statutory Timer"** (`कानूनी टाइमर शुरू करें`).
   - Select **24-Hour NCII Removal Window** or **72-Hour Grievance Acknowledgment**.
   - Optionally link it to your newly created complaint record.
   - Verify the countdown timer displays live remaining time updating every second.

### B. Testing Portability (Export & Import)
1. Click **"Export Ledger"** (`लेज़र निर्यात करें`):
   - Choose **"Download Structured JSON (.json)"**: download `kavach-tracking-ledger-[date].json`.
   - Choose **"Download Text Summary (.txt)"**: download plain-text summary.
   - Choose **"Print / Save as PDF"**: verify clean print stylesheet.
2. Click **"Clear Ledger"** (trash can icon):
   - Confirm deletion in modal. Verify all records and timers are wiped from tab memory.
3. Click **"Import Ledger"** (`लेज़र आयात करें`):
   - Select the previously downloaded `.json` file.
   - Verify all records, notes, and timers are instantly restored to memory with zero server calls.

---

## 8. Project Architecture Overview

| Phase | Mode Name | Route | Key Feature | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | Foundation | `/`, `/help`, `/privacy` | Trauma-informed shell, Quick Exit (<kbd>Esc</kbd>), i18n English/Hindi | **COMPLETE** |
| **Phase 2** | RESPOND | `/respond` | 4-step triage flow, 7 incident categories, platform lockdowns | **COMPLETE** |
| **Phase 3** | PRESERVE | `/preserve` | Web Crypto SHA-256 vault, 100MB guard, canonical JSON manifest, verification | **COMPLETE** |
| **Phase 4** | REPORT | `/report` | Deterministic complaint drafter, 7 police sections, client-side PII redaction | **COMPLETE** |
| **Phase 5** | TRACK | `/track` | In-memory ledger, 24h/72h statutory timers, escalation paths (BNSS/GAC), portability | **COMPLETE** |
