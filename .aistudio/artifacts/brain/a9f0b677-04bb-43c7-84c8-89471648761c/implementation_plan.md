# Kavach — Foundation Implementation Plan

Kavach is a privacy-first, trauma-informed Cyber-Abuse Response and Reporting Companion designed specifically for women in India. This plan details the architectural shell, accessibility-first design system, safety mechanics, privacy guarantees, and foundational structure for the upcoming modes: Respond, Preserve, Report, and Track.

## User Review & Critical Decisions

> [!IMPORTANT]
> The foundation phase strictly isolates all evidence and personal data to the client browser. No backend services, AI models, or third-party trackers are connected.

- **Confirmed Decision 1 (Quick Exit Target)**: The persistent Quick Exit control immediately replaces the window location to `https://www.google.com` with clean safety warnings informing users about local browser history limitations.
- **Confirmed Decision 2 (Visual Aesthetic)**: High-contrast Charcoal (`#0F172A`) and Sky Blue (`#0284C7` / `#38BDF8`) theme with large, accessible touch targets, high legibility type, and zero distracting animations or decorative clutter.
- **Confirmed Decision 3 (Routing & i18n)**: Single-page responsive web architecture with view-state navigation (accessible via hash/route state), paired with a zero-dependency typed i18n engine providing instant English and Hindi (हिंदी) toggling across all core screens and safety directives.

---

## 1. Overview & Core Concept

- **What It Does**: Kavach ("Shield") provides immediate, structured guidance to women facing digital harassment, non-consensual imagery distribution, impersonation, or cyber-stalking in India. It prepares users for immediate first-hour actions, evidence preservation, complaint drafting for Indian law enforcement / portals, and tracking.
- **Target Audience / Persona**: Women in India navigating urgent or ongoing cyber-abuse incidents who need immediate, calm, reliable guidance without fear of their private files or incident details leaking to external servers.
- **Key Value**: 100% client-side privacy by design. Intimate imagery and screenshots never touch a server; Web Crypto SHA-256 hashing is used for cryptographic manifests; and law enforcement complaints are mapped to Indian statutory provisions (IT Act 2000 & BNS 2023).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Safety Entry & Immediate Choice**: The user lands on a clean, reassuring home view with high contrast. The persistent top bar hosts the language toggle (EN/HI) and a prominent red-accented "Quick Exit" button.
2. **Four Mode Cards Navigation**:
   - **Respond (प्रतिक्रिया)**: First-hour emergency safety playbook and containment checklist.
   - **Preserve Evidence (साक्ष्य संचय)**: In-browser SHA-256 evidence hashing and manifest exporter (with prominent explanation that media never leaves the device).
   - **Draft Complaint (शिकायत प्रारूप)**: Formal grievance draft for National Cyber Crime Reporting Portal (cybercrime.gov.in) and local police stations.
   - **Track Report (ट्रैकिंग)**: Submission ledger, statutory 24–72 hour platform takedown deadlines, and follow-up logger.
3. **Dedicated Informational Portals**:
   - **Consent & Privacy Explainer (`/privacy`)**: Clear explanations of what the Web Crypto SHA-256 hash does (cryptographic integrity check) and what it does *not* do (does not prove ownership, legal admissibility, or legal filing).
   - **Help & Support Guide (`/help`)**: Breakdown of Indian helpline numbers, when to dial 112 vs 181 vs 1930, FIR rights under Section 154 CrPC/BNSS, and Zero-FIR provisions.
4. **Persistent Emergency Footer**: Constant access to 112, 181, 1930 with "verify before use" disclaimer, official cybercrime.gov.in link, and browser privacy warning.

### Visual Identity & Theme
- **Dominant Canvas (60%)**: Deep Charcoal Slate (`#0B0F19` background in dark posture, `#F8FAFC` in light mode with `#0F172A` high-contrast text).
- **Structural Surfaces (30%)**: Clean `#1E293B` slate card surfaces with crisp 1px borders (`#334155`), generous padding, and zero-pill typographic metadata with bullet separators.
- **Accent Budget (10%)**: Focused Sky Blue (`#0284C7` / `#38BDF8`) for interactive triggers and focus rings; safety red (`#EF4444`) strictly reserved for the emergency Quick Exit action.
- **Typography**: `Plus Jakarta Sans` for clean, reassuring display headlines; `Inter`/system sans for high-legibility body prose; and `JetBrains Mono` / `tabular-nums` for emergency contact numbers and cryptographic hashes.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Zero External Data Transmission**:
  - *Chosen Approach*: All application states remain in-memory or in isolated browser memory. `src/services/api.ts` provides a unified mock abstraction with configurable `VITE_API_BASE_URL` for future Python FastAPI backend integration.
  - *Why*: Absolute user safety. In intimate abuse scenarios, accidental data leaks or third-party telemetry can endanger lives.
- **Decision 2: Clear Legal & Cryptographic Disclaimers**:
  - *Chosen Approach*: Explicitly document in the UI that SHA-256 local hashing validates file integrity against alteration, but does not certify authenticity, legal admissibility in court under Section 65B of the Indian Evidence Act / BSA 2023, nor constitute an automatic police filing.
  - *Why*: Sets realistic expectations, prevents false security complacency, and ensures compliance with legal realities.
- **Decision 3: Emergency Quick Exit Implementation**:
  - *Chosen Approach*: Replaces `window.location.replace("https://www.google.com")` immediately on click and keyboard shortcut (`Escape` twice), along with a visible modal explaining how to clear browser history.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Kavach Web Application                          │
├────────────────────────────────────────────────────────────────────────┤
│ Top Navigation: [Brand Wordmark] · [EN/HI i18n Toggle] · [Quick Exit] │
├────────────────────────────────────────────────────────────────────────┤
│ Router Viewport:                                                       │
│   ├── /home          : 4 Core Cards (Respond, Preserve, Draft, Track)   │
│   ├── /respond       : Mode 1 Shell & First-Hour Roadmap               │
│   ├── /preserve      : Mode 2 Shell & Local Manifest Architecture       │
│   ├── /report        : Mode 3 Shell & Complaint Generator Roadmap      │
│   ├── /track         : Mode 4 Shell & Follow-up Ledger Roadmap         │
│   ├── /privacy       : Cryptographic & Device Privacy Explainer        │
│   └── /help          : Emergency Helplines, Zero-FIR & Support Guide   │
├────────────────────────────────────────────────────────────────────────┤
│ Persistent Footer: 112 (Emergency) · 181 (Women) · 1930 (Cybercrime)  │
│                   Official Link: cybercrime.gov.in · Safety Notice     │
├────────────────────────────────────────────────────────────────────────┤
│ Services & Infrastructure:                                             │
│   ├── src/services/api.ts (Configurable Base URL, Mock Service Layer)  │
│   ├── src/i18n/           (English & Hindi translations)               │
│   ├── supabase/schema.sql (Postgres RLS Schema, metadata only)         │
│   └── docs/privacy-principles.md (Constitution of 8 Privacy Rules)     │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model (`supabase/schema.sql`)
1. **`evidence_manifest`**:
   - `evidence_id`: UUID primary key
   - `incident_id`: UUID reference
   - `sha256`: Text (64 hex characters)
   - `mime_type`: Text (e.g. `image/png`)
   - `captured_at`: Timestamptz
   - `source_reference`: Text (redacted domain / context, e.g. "WhatsApp chat export")
   - *Constraint*: STRICTLY NO binary blobs, base64 images, or file contents stored.
2. **`reports`**:
   - `report_id`: UUID primary key
   - `incident_id`: UUID reference
   - `platform`: Text (e.g., "National Cyber Crime Portal", "Instagram Grievance")
   - `submitted_at`: Timestamptz
   - `deadline_at`: Timestamptz (statutory compliance deadline)
   - `status`: Enum (`draft`, `submitted`, `takedown_confirmed`)
   - Row-Level Security (RLS) enabled on all tables.
