/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Unified API Service Layer
 * 
 * All communication with the future Python FastAPI backend is abstracted here.
 * For this foundation phase, all methods return synthetic mock data.
 * 
 * PRIVACY GUARANTEE:
 * - Evidence files and raw intimate media are NEVER accepted or dispatched by this service.
 * - Only SHA-256 hashes, metadata, and user-reviewed complaint drafts are supported.
 */

export interface EvidenceManifestItem {
  evidence_id: string;
  incident_id: string;
  sha256: string;
  mime_type: string;
  captured_at: string;
  source_reference?: string;
  file_name?: string;
  file_size?: number;
}

export type ReportStatus = 'draft' | 'submitted' | 'takedown_confirmed';

export interface ReportItem {
  report_id: string;
  incident_id: string;
  platform: string;
  submitted_at: string | null;
  deadline_at: string | null;
  status: ReportStatus;
  created_at: string;
  acknowledgment_number?: string;
}

export interface IncidentClassificationResult {
  category: string;
  urgency: 'immediate_crisis' | 'statutory_24h' | 'statutory_72h' | 'advisory';
  recommended_actions: string[];
  applicable_laws: string[];
}

export interface ComplaintDraftPayload {
  language: 'en' | 'hi';
  incident_type: string;
  platform_name: string;
  date_range: string;
  redacted_summary: string;
  evidence_hashes: string[];
}

export interface ComplaintDraftResult {
  draft_id: string;
  complaint_text: string;
  applicable_sections: string[];
  submission_guidance: string;
}

/** Configurable API base URL, defaults to localhost:8000 for local FastAPI dev */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class KavachApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Mock endpoint to record or synchronize client-computed evidence hashes
   * NOTE: Files are NOT uploaded. Only the 64-character SHA-256 digest is registered.
   */
  async registerEvidenceManifest(manifest: Omit<EvidenceManifestItem, 'evidence_id'>): Promise<EvidenceManifestItem> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      evidence_id: crypto.randomUUID ? crypto.randomUUID() : `ev_${Date.now()}`,
      ...manifest,
    };
  }

  /**
   * Mock endpoint to retrieve existing manifests for an incident
   */
  async getEvidenceManifests(incidentId: string): Promise<EvidenceManifestItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return [
      {
        evidence_id: 'ev-demo-1',
        incident_id: incidentId,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        mime_type: 'image/png',
        captured_at: new Date(Date.now() - 3600000).toISOString(),
        source_reference: 'Platform DM Screenshot (Synthetic Demo)',
        file_name: 'screenshot_evidence_01.png',
        file_size: 428100,
      },
    ];
  }

  /**
   * Mock endpoint to create or update report status and statutory deadlines
   */
  async saveReport(report: Partial<ReportItem>): Promise<ReportItem> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      report_id: report.report_id || (crypto.randomUUID ? crypto.randomUUID() : `rep_${Date.now()}`),
      incident_id: report.incident_id || 'inc_default',
      platform: report.platform || 'National Cyber Crime Reporting Portal (1930)',
      submitted_at: report.submitted_at || null,
      deadline_at: report.deadline_at || new Date(Date.now() + 86400000).toISOString(), // default 24h statutory window
      status: report.status || 'draft',
      created_at: new Date().toISOString(),
      acknowledgment_number: report.acknowledgment_number,
    };
  }

  /**
   * Mock endpoint to list reports
   */
  async getReports(incidentId?: string): Promise<ReportItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return [
      {
        report_id: 'rep-demo-01',
        incident_id: incidentId || 'inc-synth-001',
        platform: 'National Cyber Crime Portal (cybercrime.gov.in)',
        submitted_at: new Date(Date.now() - 7200000).toISOString(),
        deadline_at: new Date(Date.now() + 79200000).toISOString(),
        status: 'submitted',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        acknowledgment_number: 'NCRP-2026-SYNTH-8912',
      },
      {
        report_id: 'rep-demo-02',
        incident_id: incidentId || 'inc-synth-001',
        platform: 'Social Media Grievance Officer',
        submitted_at: null,
        deadline_at: new Date(Date.now() + 86400000).toISOString(),
        status: 'draft',
        created_at: new Date().toISOString(),
      },
    ];
  }

  /**
   * Mock endpoint for incident classification roadmap
   */
  async classifyIncident(categoryHint: string): Promise<IncidentClassificationResult> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return {
      category: categoryHint || 'Non-Consensual Imagery / Online Harassment',
      urgency: 'statutory_24h',
      recommended_actions: [
        'Do not delete threatening chats or messages immediately; preserve evidence locally first.',
        'Obtain full browser screenshots with complete visible URLs, timestamps, and usernames.',
        'Generate local SHA-256 evidence digests.',
        'File complaint with National Cybercrime Portal (1930) and Intermediary Grievance Officer.',
      ],
      applicable_laws: [
        'Section 66E, IT Act 2000 (Violation of Privacy)',
        'Section 67 & 67A, IT Act 2000 (Publishing sexually explicit content)',
        'Rule 3(2)(b), Information Technology Intermediary Guidelines Rules 2021 (24-hour mandatory takedown)',
        'Section 77, 78, 79, Bharatiya Nyaya Sanhita (BNS) 2023 (Voyeurism, Stalking, Word/gesture insulting modesty)',
      ],
    };
  }

  /**
   * Mock endpoint for generating structured complaint drafts
   */
  async generateDraft(payload: ComplaintDraftPayload): Promise<ComplaintDraftResult> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const isHindi = payload.language === 'hi';
    return {
      draft_id: `draft_${Date.now()}`,
      complaint_text: isHindi
        ? `सेवा में,\nप्रभारी अधिकारी / साइबर अपराध प्रकोष्ठ,\n\nविषय: ऑनलाइन उत्पीड़न एवं गैर-सहमति सामग्री के विरुद्ध शिकायत\n\nमहोदय/महोदया,\nमैं यह औपचारिक शिकायत दर्ज कर रही हूँ...`
        : `To,\nThe Officer-in-Charge / Cyber Crime Police Station,\n\nSubject: Formal Complaint regarding Cyber Harassment and Non-Consensual Distribution\n\nRespected Sir/Madam,\nI am writing to register a formal complaint regarding online harassment and violation of privacy...`,
      applicable_sections: [
        'IT Act Section 66E / 67A',
        'BNS 2023 Section 77 / 78',
      ],
      submission_guidance: isHindi
        ? 'इसे cybercrime.gov.in पर महिला/बाल अपराध अनुभाग में जमा करें अथवा नजदीकी साइबर पुलिस स्टेशन में प्रस्तुत करें।'
        : 'Submit this on cybercrime.gov.in under the Women/Child Crime reporting section or submit directly to your nearest Cyber Police Station as an FIR / Zero-FIR.',
    };
  }
}

export const api = new KavachApiService();
