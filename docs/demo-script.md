# Kavach (कवच) — 3-Minute Demonstration Script
## Privacy-First Cyber-Abuse Response & Reporting Companion for Women in India

**Target Audience**: Security Auditors, Legal Aid Counsel, NCW Representatives, Hackathon Judges  
**Duration**: Exactly 3 minutes  
**Prerequisites**: A Chromium or Firefox browser window with Developer Tools opened to the **Network** tab.

---

### Step 0: Initial Setup & Network Tab Proof (0:00 - 0:25)
1. Navigate to the Kavach home page.
2. Press `F12` to open Browser Developer Tools and select the **Network** tab.
3. Filter by **Fetch/XHR** or **All**. Verify the recording icon is active (red circle).
4. Notice the clean, trauma-informed interface with bilingual toggle (English / हिंदी).
5. Click **"Run demo scenario (Demo with fictional data)"** on the Home screen.
6. A persistent amber banner appears across the top: *"Demo: Fictional Data Loaded — Synthetic demonstration incident loaded across Respond, Preserve, Report, and Track."*

---

### Step 1: Mode 01 — Respond (0:25 - 0:55)
1. Kavach directs the user into **Respond** (`/respond`) with the synthetic **Blackmail / Extortion** category pre-selected.
2. Review the first-hour safety protocol:
   - **Do not pay**: Paying extortionists increases subsequent extortion demands.
   - **Do not delete chat logs**: These contain critical IP, timestamp, and profile handle evidence.
   - **Account hardening checklist**: Step-by-step guidance on locking Instagram/WhatsApp accounts and changing compromised passwords.
3. Notice that guidance is tailored specifically to non-consensual media threats.
4. Click **"Proceed to Evidence Preservation"** button at the bottom of the playbook.

---

### Step 2: Mode 02 — Preserve & Cryptographic Proof (0:55 - 1:35)
1. Kavach opens **Preserve** (`/preserve`) with the category context preserved in memory.
2. Review the pre-loaded synthetic evidence item: `blackmail_whatsapp_chat_export.png`.
3. Highlight the calculated **SHA-256 fingerprint**:
   `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945`
4. **The Audit Proof**:
   - Point to the open **Network tab**: **0 bytes of image or file data were transmitted to any server**.
   - All hashing is performed locally via the Web Crypto API (`window.crypto.subtle.digest("SHA-256", ...)`).
   - The user can drag and drop any local screenshot to verify real-time client-side hashing in under 50ms.
5. Click **"Export Cryptographic Manifest (JSON)"** to show the standardized proof ledger format for cyber cells.

---

### Step 3: Mode 03 — Report (1:35 - 2:15)
1. Navigate to **Draft Complaint** (`/report`).
2. Show the 6-step deterministic complaint generator:
   - **Step 1**: Choose between **Police Complaint (Cyber Crime Cell / FIR)** and **Platform Takedown Notice**.
   - **Step 2**: Complainant details (all optional, defaults to visible `[...]` brackets if left empty).
   - **Step 3**: Incident facts pre-filled from Respond.
   - **Step 4**: Penal provisions (e.g. IT Act Section 66E, BNS Section 78).
   - **Step 5**: Linked evidence hashes from Preserve automatically attached.
   - **Step 6**: Redaction and export preview.
3. Toggle between **Official Version** (with suspect handles) and **Redacted Copy** (sensitive contact data replaced with `[REDACTED]`).
4. Highlight the disclaimer: *Kavach prepares drafts only. It never submits anything and cannot contact external authorities.*

---

### Step 4: Mode 04 — Track & Statutory Timers (2:15 - 2:45)
1. Navigate to **Track Report** (`/track`).
2. Review the in-memory submission ledger:
   - Shows synthetic reference `NCRP-2026-DL-984210` filed at NCRP Cyber Cell.
3. Inspect the live statutory countdown timer:
   - **24-Hour NCII Removal**: Rule 3(2)(b) IT Rules 2021 mandatory countdown running in tab memory.
   - Clearly states: *"from the time the platform received your complaint"* and *"A Kavach timer is a personal reminder, not proof that a valid complaint was received."*
4. Expand the **Statutory Escalation Pathways**:
   - Shows Zero FIR mandate under **Section 173(1) BNSS**.
   - Shows free copy mandate under **Section 173(2) BNSS**.
   - Shows written representation to SP under **Section 173(4) BNSS**.
   - Shows Judicial Magistrate application under **Section 175(3) BNSS** with the mandatory affidavit note.
   - Shows Grievance Appellate Committee (GAC) appeal instructions with direct link to `https://gac.gov.in`.

---

### Step 5: Safety Verification — Unblocked Quick Exit (2:45 - 3:00)
1. Point out that unexported tracking items and evidence exist in memory.
2. In regular websites, navigating away would trigger a jarring `beforeunload` confirmation modal ("Changes you made may not be saved").
3. Press <kbd>Escape</kbd> or click the red **"Quick Exit (Esc)"** button in the header.
4. **Observation**:
   - The browser immediately redirects to `https://www.google.com`.
   - **Zero blocking popups or confirmation dialogs appear**.
   - All in-memory state is immediately cleared before departure.

---

### Summary of Privacy Guarantees Demonstrated
- **0 Remote Network Requests**: Proved live in browser DevTools Network tab.
- **0 Server Storage**: No databases, no Firebase, no cookies, no localStorage.
- **100% Client-Side Cryptography**: SHA-256 calculated inside browser sandbox.
- **Unblocked Quick Exit**: Survivor safety is never compromised by browser alerts.
