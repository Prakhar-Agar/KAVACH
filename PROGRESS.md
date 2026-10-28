# Kavach (कवच) — Project Progress & Implementation Status

**Project Name**: Kavach (कवच)  
**Tagline**: Privacy-First Cyber-Abuse Response and Reporting Companion for Women in India  
**Development App URL**: `https://ais-dev-taqq5uncfjfuj53ylomeps-688351316340.asia-northeast1.run.app`  
**Shared App URL**: `https://ais-pre-taqq5uncfjfuj53ylomeps-688351316340.asia-northeast1.run.app`  
**Current Milestone**: Phase 6 (Corrections, Safety Hardening, Demo Readiness) Complete — Production Ready  
**Date**: October 2026  

---

## 1. Executive Summary

**Kavach (कवच)** is an in-browser digital crisis response and forensic reporting companion engineered for women and at-risk individuals in India facing cyber harassment, non-consensual intimate imagery (NCII / "revenge porn"), deepfakes, sextortion, digital stalking, impersonation, and online threats.

Unlike conventional platforms that require user logins, store intimate media in the cloud, or introduce third-party trackers, Kavach is built on an absolute **zero-knowledge, zero-storage, 100% client-side architecture**. The platform provides four core operational modes:

- **Mode 01: RESPOND (`/respond`)** — First-Hour Cyber-Abuse Incident Classification & Safety Action Playbook.
- **Mode 02: PRESERVE (`/preserve`)** — In-Browser Cryptographic Evidence Vault with Web Crypto SHA-256 Hashing & Canonical Manifest Export.
- **Mode 03: REPORT (`/report`)** — Deterministic Bilingual Complaint Drafter with Dual-Version Output & Client-Side PII Redaction.
- **Mode 04: TRACK (`/track`)** — In-Memory Complaint Tracking Ledger, Statutory Countdown Timers, and Escalation Playbooks.
- **Safety Core: Quick Exit & Wiping** — Instant, unblocked escape (<kbd>Esc</kbd>) to Google, bypassing all browser confirmation dialogs, with in-memory state wiping and "Clear everything now" modal.
- **Audited Statutory Grounding** — All legal references marked unverified by counsel (`verifiedBy: null`), complete with automated statutory register export (`docs/legal-review-register.md`) and Hindi linguist review sheet (`docs/hindi-review-sheet.md`).
- **Hermetic CSP & Self-Hosted Fonts** — Bundled `@fontsource` typography and Content Security Policy blocking third-party network connections.

---

## 2. Non-Negotiable Privacy Principles (8 Core Guarantees)

Kavach strictly preserves all 8 privacy rules documented in `docs/privacy-principles.md`:

| # | Privacy Rule | Architectural Implementation |
|---|---|---|
| **1** | **Client-Side Hermetic Isolation** | Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host. 100% of hashing, text drafting, timer countdowns, and redactions execute in browser memory. All fonts self-hosted. |
| **2** | **No Intimate Image Retention** | Files are processed into ArrayBuffers in volatile RAM only. Preview objects use temporary blob URLs with click-to-reveal blur and explicit `URL.revokeObjectURL` cleanup. |
| **3** | **No AI / LLM Processing** | All playbooks, legal suggestions, and complaint documents are generated through deterministic template interpolation. Zero external LLM APIs are invoked. |
| **4** | **Zero Third-Party Storage or Trackers** | Absolute prohibition of `localStorage`, `sessionStorage`, `indexedDB`, and cookies. No Google Analytics, telemetry, or third-party trackers are bundled. |
| **5** | **Transient In-Memory Staging** | State lives solely in transient React Contexts (`AppStateContext`, `EvidenceContext`, `TrackingContext`). If the tab closes or refreshes, all data evaporates immediately unless explicitly exported by the user. |
| **6** | **Transparent Boundaries** | Kavach never submits complaints directly or pretends to be law enforcement. It explicitly prepares drafts and manifests for the user to file on official portals (`cybercrime.gov.in`, `gac.gov.in`, or police stations). |
| **7** | **Truth in Cryptography & Legal Realities** | Web Crypto API SHA-256 (`crypto.subtle.digest`) computes forensic hashes without guaranteeing Section 65B/63 BSA legal admissibility. All statutory deadlines explicitly state: "A Kavach timer is a personal reminder, not proof that a valid complaint was received" and are marked unverified. |
| **8** | **Synthetic Demo Data Only** | Built-in scenario ("Run demo scenario / Demo with fictional data") utilizes purely fictitious, non-personal data for safe demonstration and testing. |

---

## 3. Completed Milestones

### Milestone 1: Foundation, Shell & Accessibility Architecture
- **Trauma-Informed Design**: High-contrast Charcoal (`#090D16` / `#0F172A`) base with Sky Blue (`#0284C7` / `#38BDF8`) action triggers and accessible touch targets ($\ge 44\text{px}$).
- **Anti-Slop Discipline**: Zero-pill discipline (rounded-md/lg), crisp metadata hierarchies, high-contrast assurance badges.
- **24/7 Emergency Dialing Bar**: Persistent footer with direct telephone links for **112** (All-India Emergency), **181** (Women's Helpline), and **1930** (Cybercrime Helpline).
- **Database Schema & Separation**: `supabase/schema.sql` providing metadata-only Postgres tables (`evidence_manifest`, `reports`) with Row-Level Security (RLS) prohibiting media binaries or incident narrative text. Configurable `src/services/api.ts` abstraction layer intentionally kept unused by client-only tools.
- **Bilingual Infrastructure**: Instant toggling between English and natural, everyday Hindi (`hi`). Loaded with **Noto Sans Devanagari** and Plus Jakarta Sans. Synchronizes `<html lang>` and `<title>`.

### Milestone 2: Hindi Translation Overhaul & Automated Checker
- **Zero Hardcoded Text in JSX**: Extracted all user-visible strings across all screens into `src/i18n/translations.ts` (530 keys).
- **Authentic, Everyday Hindi**: Natural, empathetic, and culturally accessible phrasing in simple Hindi.
- **Automated Checker (`npm run check:i18n`)**: Validates key parity across all 530 translation keys in `translations.ts`, enforces bilingual coverage across data files, and scans `.tsx` components in `src/` to prevent hard-coded English regressions.

### Milestone 3: Phase 2: RESPOND Mode (`/respond`)
- **Guided 4-Step Interactive Flow**:
  1. **Category Selection**: 7 incident categories (Blackmail/Sextortion, Intimate Image/Deepfake, Impersonation, Stalking, Harassment, Account Compromise, and "I'm not sure").
  2. **Immediate Danger Check**: Immediate screening for physical peril with direct 1-tap **112** call button and Sakhi Centre guidance.
  3. **Context Assessment**: 2–3 skippable, non-invasive follow-up questions tailored per category.
  4. **First-Hour Action Playbook**: Do Now, Do NOT Do, and When Ready task tabs; platform lockdown guides for WhatsApp, Instagram, Telegram, Google; direct routing to `/preserve`, `/report`, and `/track` with category context.

### Milestone 4: Phase 3: PRESERVE Mode (`/preserve`) & Cryptographic Vault
- **In-Browser Web Crypto Hashing Engine (`src/lib/hash.ts`)**:
  - `calculateSHA256(file: File)`: Standard browser-native `crypto.subtle.digest('SHA-256', arrayBuffer)` returning 64-character lowercase hex.
  - 100 MB hard limit guard (`MAX_FILE_SIZE_BYTES`) with bilingual alert.
  - `calculateManifestHash(entries: any[])`: Produces deterministic SHA-256 checksums over canonical JSON structures (recursively sorted keys, no whitespace).
  - Strict privacy enforcement: Zero `console.log` of file names, contents, or hashes.
- **Evidentiary Forensic Guidance (`src/data/captureGuidance.ts`)**: Contextual banners on screenshot capture and screen recording integrity.
- **Evidence Management & Staging (`src/pages/PreservePage.tsx`)**: Safe in-memory preview with default blur (`blur-md`), click-to-reveal, structured JSON manifest download & print/PDF export, and integrity verification against active items or external imported manifests.

### Milestone 5: Phase 4: REPORT Mode (`/report`) & Dual-Version Drafter
- **Shared In-Memory Evidence Context (`src/state/EvidenceContext.tsx`)**: Preserves evidence state across client navigation between `/preserve`, `/respond`, and `/report`. Strictly in-memory (0 storage).
- **Deterministic Bilingual Templates (`src/data/complaintTemplates.ts`)**: Generates official Police / Cybercrime Complaint drafts and Platform Takedown Requests in English and Hindi across 7 mandated chronological sections.
- **Safe Statutory Provisions Toggle**: 11 optional penal provisions across IT Act 2000, BNS 2023, and BNSS 2023 formatted with non-binding request phrasing.
- **Client-Side Entity Redaction Engine (`src/lib/redact.ts`)**: Detects and redacts 7 entity types into two distinct output versions: Official Full Version and Redacted Copy.

### Milestone 6: Phase 5: TRACK Mode (`/track`) & In-Memory Ledger
- **In-Memory Tracking Ledger (`src/state/TrackingContext.tsx`)**: Tracks reference numbers, authorities, submission timestamps, officer contacts, and dated follow-up notes in tab RAM.
- **Portable JSON Ledger**: Encrypted/plaintext structured JSON file export (`kavach-tracking-ledger-*.json`) allows resume across sessions without any server or account.

---

## 4. Phase 6 Deliverables: Corrections, Safety Hardening & Demo Readiness

### Part A: Quick Exit Unblocked Guarantee
1. **Never-Blocked Exit**: The `beforeunload` warnings in `EvidenceContext` and `TrackingContext` check `(window as any).__KAVACH_SUPPRESS_BEFOREUNLOAD`. When Quick Exit is triggered (<kbd>Esc</kbd> or button), the suppression flag is set immediately, in-memory sensitive state is wiped via global event dispatch, and `window.location.replace('https://www.google.com')` is executed without any browser dialog interruption.
2. **"Clear Everything Now"**: Dedicated header button (trash icon) and Quick Exit modal option triggering `clearAllData()` with confirmation dialog, wiping evidence items, tracking records, timers, report drafts, and respond choices without leaving the page.

### Part B: Statutory Content Corrections
1. **Accurate 5 Timer Presets** (`src/data/trackingData.ts`):
   - `24h_ncii`: NCII removal: 24 hours from receipt of complaint, Rule 3(2)(b), IT Rules 2021.
   - `24h_acknowledgment`: Grievance acknowledgment: 24 hours from receipt of complaint, Rule 3(2)(a), IT Rules 2021.
   - `72h_removal`: Removal request (other content covered by rules): 72 hours from receipt.
   - `15d_resolution`: Grievance resolution: 15 days from receipt.
   - `custom`: Custom reminder timer.
   - Removed old 72h acknowledgment timer and all mentions of "standard police inquiry protocols".
2. **Statutory Audit Metadata**:
   - Every preset and escalation path carries `source`, `lastReviewed`, and `verifiedBy: null`.
   - UI displays: *"Not yet verified by a legal professional. Check the current rules before relying on this."*
   - Timers state: *"from the time the platform received your complaint"* and *"A Kavach timer is a personal reminder, not proof that a valid complaint was received."*
3. **GAC Appeal Guidance**: Clear 30-day appeal notice with direct hyperlink to official portal: `https://gac.gov.in`.
4. **Correct BNSS Police Refusal Escalation**:
   - Zero FIR: **Section 173(1) Proviso BNSS**.
   - Free FIR copy: **Section 173(2) BNSS**.
   - Written representation to SP: **Section 173(4) BNSS**.
   - Judicial Magistrate application: **Section 175(3) BNSS** (all references to 175(4) removed).
   - Prominent Magistrate note highlighting mandatory affidavit verifying prior SP refusal and free representation under Legal Services Authorities Act.
5. **Site-Wide General Legal Notice**: Banner rendered on Help, Report, and Track: *"Legal information on Kavach is general and has not yet been reviewed by a lawyer. Verify before relying on it."*
6. **Automated Legal Review Register Export (`npm run export:legal-register`)**: Generates `docs/legal-review-register.md` listing all sections, citations, and sign-off template.
7. **Automated Hindi Review Sheet Export (`npm run export:hindi-review`)**: Generates `docs/hindi-review-sheet.md` categorizing all bilingual UI strings with linguist sign-off template.

### Part C: True Privacy Architecture & CSP
1. **Self-Hosted Fonts**: Google Fonts external `<link>` tags removed from `index.html`. Plus Jakarta Sans and Noto Sans Devanagari bundled and imported from `@fontsource/plus-jakarta-sans` and `@fontsource/noto-sans-devanagari`.
2. **Content Security Policy**: Implemented `<meta http-equiv="Content-Security-Policy">` in `index.html`:
   `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' blob: data:; connect-src 'self' ws: wss:;`
   *(Development preview relaxation for Vite HMR documented in `docs/privacy-principles.md`).*
3. **Extended Privacy Scanner (`npm run check:privacy`)**: Scans `index.html`, CSS, and source files to guarantee zero external resource loading URLs, maintaining strict allowlist for legitimate user outbound links (`cybercrime.gov.in`, `gac.gov.in`, `ncwapps.nic.in`, `delhipolice.gov.in`, `google.com`, platforms, `tel:`).
4. **Precise Privacy Wording**: Updated across UI and docs to: *"Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host."*

### Part D: Demo Readiness & Evaluator Walkthrough
1. **One-Click Demo Scenario**: "Run demo scenario (Demo with fictional data)" button on Home page loading a coherent incident across Respond, Preserve, Report, and Track.
2. **Persistent Demo Banner**: Amber top banner visible across all screens when demo data is active, with "Exit demo and clear" action.
3. **6-Step Guided Walkthrough**: Bilingual, skippable, accessible tour walking evaluators through the 4 core modes and privacy model.
4. **3-Minute Demonstration Script**: Written in `docs/demo-script.md` detailing exact presenter steps, timing, and DevTools Network tab proof.

---

## 5. Verification Test Matrix

All 8 automated test suites and compiler checks pass with 0 errors:

| Suite | Command | What It Validates | Result |
|---|---|---|---|
| **Compilation** | `npm run build` | Full Vite production build bundle | ✅ **Passed** |
| **Type Check** | `npm run lint` | TypeScript `tsc --noEmit` validation | ✅ **Passed (0 errors)** |
| **i18n Coverage** | `npm run check:i18n` | 530 keys matched, bilingual data files, no hardcoded JSX strings | ✅ **Passed (0 errors)** |
| **Web Crypto Hash** | `npm run test:hash` | Empty string and 'abc' SHA-256 test vectors match exactly | ✅ **Passed (2/2 vectors)** |
| **Privacy Isolation** | `npm run check:privacy` | Zero network calls, zero storage, zero external resource CDN URLs | ✅ **Passed (0 violations)** |
| **Report Drafter** | `npm run test:report` | Section order, non-lawyer phrasing, entity redaction, Hindi order | ✅ **Passed (10/10 assertions)** |
| **Tracking Engine** | `npm run test:track` | 5 presets, BNSS 173(4)/175(3), JSON export/import, timer countdowns | ✅ **Passed (28/28 assertions)** |
| **Legal Register** | `npm run export:legal-register` | Generates `docs/legal-review-register.md` | ✅ **Passed** |
| **Hindi Review Sheet**| `npm run export:hindi-review` | Generates `docs/hindi-review-sheet.md` | ✅ **Passed** |

---

## 6. Complete Codebase File Inventory

```
kavach/
├── index.html                               # HTML5 entry with CSP meta, window.fetch safeguard, self-hosted fonts
├── package.json                             # Dependencies, scripts, and export tooling
├── tsconfig.json                            # TypeScript configuration
├── vite.config.ts                           # Vite configuration with Tailwind CSS v4 plugin
├── docs/
│   ├── privacy-principles.md                # 8 Non-negotiable tenets, CSP policy, and verification guide
│   ├── demo-script.md                       # 3-minute presenter demonstration script with Network tab proof
│   ├── legal-review-register.md             # Generated statutory register for legal counsel review
│   └── hindi-review-sheet.md                # Generated bilingual string review sheet for linguist sign-off
├── scripts/
│   ├── check-i18n.ts                        # Automated translation parity & hard-coded string scanner
│   ├── test-hash.ts                         # SHA-256 cryptographic test vector verification suite
│   ├── check-privacy.ts                     # Static analysis checking network, storage, and external URLs
│   ├── test-report.ts                       # Report generator & regex redaction automated test suite
│   ├── test-track.ts                        # Track ledger & statutory timer countdown test suite
│   ├── export-legal-register.ts             # Exports docs/legal-review-register.md
│   └── export-hindi-review.ts               # Exports docs/hindi-review-sheet.md
├── src/
│   ├── main.tsx                             # React 19 root with self-hosted @fontsource typography
│   ├── App.tsx                              # Router, AppStateProvider, EvidenceProvider, TrackingProvider
│   ├── index.css                            # Global styles, Tailwind CSS v4, custom print stylesheets
│   ├── components/
│   │   ├── Header.tsx                       # Navigation, language switch, Quick Exit, Clear Everything button
│   │   └── Footer.tsx                       # Emergency helplines (112, 181, 1930) & official portal links
│   ├── data/
│   │   ├── playbooks.ts                     # 7 cyber-abuse categories, questions, and safety action playbooks
│   │   ├── captureGuidance.ts               # Evidentiary capture rules & screenshot integrity guidance
│   │   ├── legalReferences.ts               # 11 statutory provisions (IT Act, BNS, BNSS) with source/audit fields
│   │   ├── complaintTemplates.ts            # Deterministic complaint generator across 7 mandated sections
│   │   └── trackingData.ts                  # 5 timer presets, synthetic samples, BNSS 173(4)/175(3) escalation
│   ├── i18n/
│   │   ├── LanguageContext.tsx              # Language state management, auto-syncing <html lang> and <title>
│   │   └── translations.ts                  # 530 bilingual translation keys (English and everyday Hindi)
│   ├── lib/
│   │   ├── hash.ts                          # Web Crypto SHA-256 hasher, 100MB limit, canonical manifest hash
│   │   └── redact.ts                        # Deterministic regular expression entity redaction engine
│   ├── state/
│   │   ├── AppStateContext.tsx              # Unblocked Quick Exit, Clear All, Demo mode, and Guided Tour state
│   │   ├── EvidenceContext.tsx              # In-memory evidence items & category state with unblockable exit
│   │   └── TrackingContext.tsx              # In-memory tracking ledger & countdown timers with unblockable exit
│   └── pages/
│       ├── HomePage.tsx                     # Landing overview, demo scenario trigger, guided tour trigger
│       ├── RespondPage.tsx                  # Mode 01: First-hour incident classification and safety playbook
│       ├── PreservePage.tsx                 # Mode 02: In-browser SHA-256 evidence vault and manifest generator
│       ├── ReportPage.tsx                   # Mode 03: 6-step deterministic complaint drafter & redaction editor
│       ├── TrackPage.tsx                    # Mode 04: Submission ledger, statutory countdown timers, escalation
│       ├── HelpPage.tsx                     # 24/7 helplines, official portals, and legal rights overview
│       └── PrivacyPage.tsx                  # Cryptography limitations (integrity vs authenticity) and CSP info
└── supabase/
    └── schema.sql                           # Metadata-only schema demonstrating zero media storage
```

---

## 7. How to Verify Zero File Data Transmission in the Browser

1. Open DevTools (`F12`) and switch to the **Network** tab.
2. Select **Fetch/XHR** or **All**. Ensure the recording icon is active.
3. In **Preserve** (`/preserve`), select or drag-and-drop any evidence file.
4. **Result**: Zero requests appear in the Network tab. The SHA-256 calculation executes completely inside browser memory via `crypto.subtle.digest`.
5. In **Report** (`/report`), fill in incident facts or redact details. **Result**: 0 network requests.
6. In **Track** (`/track`), start statutory countdown timers or export JSON ledger. **Result**: 0 network requests.
7. Trigger Quick Exit (<kbd>Esc</kbd>). **Result**: Immediately leaves for Google with zero blocking alerts.
