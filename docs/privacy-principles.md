# Kavach Privacy Principles & Non-Negotiable Tenets

These principles govern every line of code, database schema, API design, and future iteration of **Kavach** (a privacy-first Cyber-Abuse Response and Reporting Companion for women in India).

---

## 1. Client-Side Hermetic Isolation
**Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host.**
- Never upload evidence files, audio, video, or screenshots to any server, storage bucket, database, or external AI API.
- All evidence hashing is performed locally on the user's device using the browser's native Web Crypto API (`crypto.subtle.digest('SHA-256', ...)`).
- All fonts (Plus Jakarta Sans and Noto Sans Devanagari) are bundled locally as self-hosted npm packages via `@fontsource`. Zero external font or style CDNs are contacted.

---

## Content Security Policy (CSP) & Development Preview Relaxation
Kavach enforces a strict Content Security Policy (`<meta http-equiv="Content-Security-Policy">`) in `index.html`:
`default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' blob: data:; connect-src 'self' ws: wss:;`

- **Production Rules**: Disallows all third-party network connections, remote scripts, analytics trackers, and external font or image CDNs.
- **Preview Environment Relaxation**: In the Vite development and preview server, `connect-src 'self' ws: wss:` and `script-src 'self' 'unsafe-inline' 'unsafe-eval'` are permitted strictly to enable the Vite runtime and hot module communication between the preview server and the browser tab. Kavach application code itself issues zero remote `fetch`, `XMLHttpRequest`, or telemetry requests.
- **Unblocked Quick Exit**: Quick Exit (<kbd>Esc</kbd> or button) sets `(window as any).__KAVACH_SUPPRESS_BEFOREUNLOAD = true`, wipes in-memory sensitive evidence and tracking entries, and navigates immediately via `window.location.replace('https://www.google.com')` without triggering browser confirmation dialogs.

---

## 2. Zero Retention of Intimate Media
**Non-consensual intimate imagery (NCII) or video must never be uploaded, processed on remote servers, or retained anywhere.**
- Even when generating reports or manifests, images are examined strictly via browser-local file handles or blobs for calculating cryptographic hashes.
- Once the browser session closes or the user leaves, raw evidence is discarded unless explicitly downloaded locally by the user.

## 3. Explicit Consent & Redacted Text Only for AI Assistance
**Only user-reviewed, sanitized, and redacted text may ever be submitted to an AI model, and only with unambiguous user opt-in.**
- No raw evidence text, personal identifiers (names, addresses, phone numbers), or sensitive messages are ever dispatched to an LLM without explicit step-by-step redaction preview and confirmation.

## 4. Server-Side Secret Segregation
**API keys, database service-role secrets, and LLM credentials must remain strictly server-side.**
- Client-side code must never contain or expose Supabase service-role keys, backend secrets, or model provider API keys.
- Client applications communicate only with authenticated, bounded proxy or gateway endpoints.

## 5. Absolute Zero Tracking & Logging
**Do not log incident text, evidence contents, or personal identity details.**
- No third-party analytics scripts (Google Analytics, Mixpanel, Meta Pixel, etc.) are permitted.
- Server logs, debug telemetry, or error trackers must never capture incident narrative bodies, usernames, IP-linked report drafts, or contact numbers.

## 6. Metadata-Only Database Persistence
**The database records metadata strictly — never media or raw text.**
- Allowed database fields: SHA-256 hash string, MIME type, capture timestamp, report status (`draft` | `submitted` | `takedown_confirmed`), and statutory target deadlines.
- Disallowed fields: File binary content, image base64 data, victim narrative, suspect personal identifiable information (PII).

## 7. Truth in Cryptography & Legal Realities
**Never make ungrounded legal or cryptographic guarantees.**
- **Integrity, not Authenticity**: An SHA-256 hash proves only that a particular file bitstream matches a calculated cryptographic digest at a point in time; it does *not* prove legal authenticity, origin, chain-of-custody validity, or admissibility under Section 65B of the Indian Evidence Act / Section 63 of Bharatiya Sakshya Adhiniyam (BSA) 2023.
- **Unverified Statutory Information**: Legal information on Kavach is general and has not yet been reviewed by a qualified lawyer. All statutory sections, timelines, and complaint templates must be verified against current official rules before being relied upon.
- **No Anonymity Promises**: Browsers and network providers retain connection footprints; never promise 100% legal anonymity.
- **No False Confirmation**: Never state or imply a report was successfully registered with law enforcement or platform grievance officers unless a verified official acknowledgment receipt confirms it. A Kavach timer is a personal reminder, not proof that a valid complaint was received.

## 8. Synthetic Data Only in Demos & Tests
**All seed fixtures, automated tests, development mocks, and onboarding examples must use purely synthetic, fictional placeholders.**
- Never use real victim complaints, live FIR screenshots, genuine phone numbers, or actual social media profile handles in sample data or screenshots.

---

## How to Verify Zero File Data Transmission in the Browser
Any user, security researcher, or legal advocate can independently verify that evidence files never leave the browser:
1. Open the browser's Developer Tools (press `F12` or right-click anywhere and select **Inspect**).
2. Click on the **Network** tab.
3. Check the **All** or **Fetch/XHR** filter and ensure the record button (red dot) is active.
4. Drag and drop an image, PDF, or video into the Preserve Evidence screen (`/preserve`).
5. Observe the Network log: Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host. Zero outgoing file payload requests are transmitted during file selection, loading, hashing, or manifest generation.
6. The SHA-256 calculation runs exclusively within the local browser sandbox via `window.crypto.subtle.digest`.

---

## Report Mode Privacy Architecture & Dual Output Versions
When drafting a complaint or grievance notice in Mode 03 (`/report`):
- **100% Browser-Local Assembly**: All complaint text, complainant details, timelines, and redactions are processed strictly in browser memory. No data is saved to `localStorage`, `sessionStorage`, `indexedDB`, or cookies.
- **Kavach Never Submits Complaints**: Kavach is an assistive drafting companion only. It does not file police FIRs, issue complaints to `cybercrime.gov.in`, or communicate with platform grievance officers. The user exports the draft and files it directly through verified official channels.
- **Two Distinct Output Versions**:
  - **Official Full Version**: Retains all perpetrator identifiers (suspect profile links, social handles, phone numbers, and UPI payment IDs) essential for law enforcement investigation.
  - **Redacted Copy**: Replaces selected personal contact details, Aadhaar IDs, and sensitive text with `[REDACTED]` markers, allowing the complainant to seek advice from trusted friends, family, or counselors without revealing sensitive private data.

---

## Track Mode Privacy Architecture & Client-Side Portability
When monitoring submissions and statutory deadlines in Mode 04 (`/track`):
- **In-Memory Ledger Only**: All reference numbers (e.g. NCRP acknowledgment IDs, GD/DD numbers, FIR numbers, grievance ticket numbers), submission dates, officer names, and follow-up notes exist exclusively in browser tab memory.
- **Zero Local Storage Retention**: Absolutely no data is written to `localStorage`, `sessionStorage`, `indexedDB`, or cookies. Closing the tab discards the memory state unless the user exports their ledger.
- **BeforeUnload Protection**: A native browser warning alerts users before navigating away or refreshing if unexported records or timers exist in memory.
- **Portable Structured JSON Ledger**: Users own and control their persistence. By exporting an encrypted or plaintext structured JSON file (`kavach-tracking-ledger-*.json`), they can re-import and resume tracking across separate browser sessions or devices without any server, account, or database involvement.
- **Local Statutory Countdown Engine**: Time calculations for mandatory compliance windows (24-hour NCII removal under Rule 3(2)(b) IT Rules 2021, 72-hour intermediary acknowledgment under Rule 3(2)(a), and 15-day grievance resolution) are evaluated entirely on the client without remote server polling or push notifications.


