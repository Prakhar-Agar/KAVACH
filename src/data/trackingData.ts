/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Phase 5: Tracking Ledger Data Models & Statutory Escalation Guides
 * 
 * Governed by:
 * - Rule 3(2)(b) IT Rules 2021 (24-hour mandatory removal for intimate imagery)
 * - Rule 3(2)(a) IT Rules 2021 (24-72h grievance acknowledgment, 15-day redressal)
 * - Section 173 BNSS 2023 (Zero FIR and mandatory free copy of FIR)
 * - Section 175(3) BNSS 2023 (Representation to Superintendent of Police)
 * - Section 175(4) BNSS 2023 (Judicial Magistrate application)
 * - IT Rules Rule 3A (Grievance Appellate Committee - GAC at gac.gov.in)
 */

export type TrackingSubmissionType = 'ncrp' | 'police' | 'platform' | 'ncw' | 'gac' | 'other';

export type TrackingStatus =
  | 'drafted'
  | 'submitted'
  | 'acknowledged'
  | 'under_investigation'
  | 'content_removed'
  | 'escalated'
  | 'closed';

export interface TrackingNote {
  id: string;
  timestamp: string;
  text: string;
}

export interface TrackingRecord {
  id: string;
  submissionType: TrackingSubmissionType;
  title: string;
  referenceNumber: string;
  submittedAt: string;
  officerName: string;
  officerContact: string;
  status: TrackingStatus;
  categoryKey: string;
  notes: TrackingNote[];
  followUpDeadline: string;
  statutoryTimerId?: string;
  updatedAt: string;
}

export type StatutoryTimerType = '24h_ncii' | '72h_acknowledgment' | '15d_resolution' | 'custom';
export type StatutoryTimerStatus = 'active' | 'warning' | 'expired' | 'completed';

export interface StatutoryTimer {
  id: string;
  recordId?: string;
  timerType: StatutoryTimerType;
  title: { en: string; hi: string };
  legalBasis: { en: string; hi: string };
  startedAt: string; // ISO string
  durationHours: number;
  expiresAt: string; // ISO string
  status: StatutoryTimerStatus;
  completedAt?: string;
  notes?: string;
}

export interface EscalationStep {
  title: { en: string; hi: string };
  desc: { en: string; hi: string };
  actionUrl?: string;
  actionLabel?: { en: string; hi: string };
  helpline?: string;
}

export interface EscalationPath {
  id: string;
  triggerTimerType: StatutoryTimerType;
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  legalBasis: { en: string; hi: string };
  steps: EscalationStep[];
  templateLetter?: {
    en: string;
    hi: string;
  };
}

export const STATUTORY_TIMER_PRESETS: Record<
  StatutoryTimerType,
  {
    durationHours: number;
    title: { en: string; hi: string };
    legalBasis: { en: string; hi: string };
    description: { en: string; hi: string };
  }
> = {
  '24h_ncii': {
    durationHours: 24,
    title: {
      en: '24-Hour NCII Removal Window',
      hi: '24 घंटे की अनिवार्य सामग्री निष्कासन समय सीमा',
    },
    legalBasis: {
      en: 'Rule 3(2)(b), IT (Intermediary Guidelines) Rules, 2021',
      hi: 'नियम 3(2)(b), सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम, 2021',
    },
    description: {
      en: 'Mandatory 24-hour statutory deadline for platforms to remove intimate images, deepfakes, or impersonation after receiving grievance.',
      hi: 'शिकायत प्राप्त होने के 24 घंटे के भीतर अंतरंग चित्र, डीपफेक या प्रतिरूपण सामग्री हटाने की अनिवार्य वैधानिक समय सीमा।',
    },
  },
  '72h_acknowledgment': {
    durationHours: 72,
    title: {
      en: '72-Hour Grievance & Police Acknowledgment',
      hi: '72 घंटे की शिकायत पावती एवं प्रारंभिक संज्ञान समय सीमा',
    },
    legalBasis: {
      en: 'Rule 3(2)(a), IT Rules 2021 & NCRP Standard Operating Procedure',
      hi: 'नियम 3(2)(a), आईटी नियम 2021 एवं राष्ट्रीय साइबर अपराध पोर्टल प्रक्रिया',
    },
    description: {
      en: 'Statutory window for platform grievance officer to issue a written ticket/acknowledgment and police cell to record receipt.',
      hi: 'मध्यस्थ शिकायत अधिकारी द्वारा पावती/टिकट जारी करने और साइबर सेल द्वारा रसीद देने की मानक समय सीमा।',
    },
  },
  '15d_resolution': {
    durationHours: 360, // 15 days
    title: {
      en: '15-Day Grievance Disposal Window',
      hi: '15 दिन की पूर्ण शिकायत निस्तारण समय सीमा',
    },
    legalBasis: {
      en: 'Rule 3(2)(a), IT Rules 2021',
      hi: 'नियम 3(2)(a), सूचना प्रौद्योगिकी नियम, 2021',
    },
    description: {
      en: 'Platforms must formally resolve and convey decision on the grievance within 15 days of receipt.',
      hi: 'शिकायत मिलने के अधिकतम 15 दिनों के भीतर सोशल मीडिया मध्यस्थ को अंतिम निर्णय और समाधान देना अनिवार्य है।',
    },
  },
  'custom': {
    durationHours: 48,
    title: {
      en: 'Custom Follow-Up Reminder',
      hi: 'कस्टम अनुवर्ती अनुस्मारक',
    },
    legalBasis: {
      en: 'Self-Scheduled Follow-Up',
      hi: 'स्वयं निर्धारित समय सीमा',
    },
    description: {
      en: 'Custom reminder to call investigating officer or check portal status.',
      hi: 'जांच अधिकारी से संपर्क करने या पोर्टल स्थिति जांचने हेतु व्यक्तिगत अनुस्मारक।',
    },
  },
};

export const ESCALATION_PATHS: EscalationPath[] = [
  {
    id: 'ncii_expired',
    triggerTimerType: '24h_ncii',
    title: {
      en: 'Intimate Content Not Removed Within 24 Hours',
      hi: '24 घंटे के भीतर अंतरंग सामग्री नहीं हटाई गई',
    },
    subtitle: {
      en: 'Platform has failed its mandatory duty under Rule 3(2)(b) of IT Rules, 2021',
      hi: 'आईटी नियम 2021 के नियम 3(2)(b) के तहत मध्यस्थ ने अपनी अनिवार्य समय सीमा का उल्लंघन किया है',
    },
    legalBasis: {
      en: 'Rule 3(2)(b) & Rule 3A, IT (Intermediary Guidelines) Rules, 2021',
      hi: 'नियम 3(2)(b) एवं नियम 3A, सूचना प्रौद्योगिकी नियम, 2021',
    },
    steps: [
      {
        title: {
          en: '1. Appeal to the Grievance Appellate Committee (GAC)',
          hi: '1. शिकायत अपीलीय समिति (GAC) में ऑनलाइन अपील दर्ज करें',
        },
        desc: {
          en: 'The GAC is the official statutory body created under Rule 3A of the IT Rules. You can file an appeal against platform inaction directly at gac.gov.in with your grievance ticket number and evidence hashes.',
          hi: 'GAC एक वैधानिक डिजिटल अपीलीय संस्था है। प्लेटफॉर्म द्वारा सामग्री न हटाने पर आप gac.gov.in पर सीधे अपने टिकट नंबर और साक्ष्य हैश के साथ अपील दर्ज कर सकती हैं।',
        },
        actionUrl: 'https://gac.gov.in',
        actionLabel: {
          en: 'Open GAC Appeal Portal (gac.gov.in)',
          hi: 'GAC अपील पोर्टल खोलें (gac.gov.in)',
        },
      },
      {
        title: {
          en: '2. Escalate to the National Commission for Women (NCW)',
          hi: '2. राष्ट्रीय महिला आयोग (NCW) में प्राथमिकता शिकायत दर्ज करें',
        },
        desc: {
          en: 'NCW runs a dedicated Cyber Crime Cell for Women that directly coordinates with platform nodal officers and senior police leadership for urgent non-consensual imagery takedowns.',
          hi: 'राष्ट्रीय महिला आयोग की साइबर सेल सोशल मीडिया नोडल अधिकारियों और वरिष्ठ पुलिस अधिकारियों से सीधे संपर्क कर त्वरित कार्रवाई सुनिश्चित कराती है।',
        },
        actionUrl: 'https://ncwapps.nic.in',
        actionLabel: {
          en: 'Open NCW Complaint Portal (ncwapps.nic.in)',
          hi: 'NCW शिकायत पोर्टल खोलें (ncwapps.nic.in)',
        },
        helpline: '181',
      },
      {
        title: {
          en: '3. File a Police Zero FIR under BNS Section 77 & IT Act Section 67A',
          hi: '3. बीएनएस धारा 77 एवं आईटी एक्ट 67A के तहत पुलिस में शून्य एफआईआर दर्ज कराएं',
        },
        desc: {
          en: 'Under Section 173 BNSS, any police station must register a Zero FIR for non-consensual circulation of intimate images, irrespective of jurisdiction. Inform them that the platform failed the 24-hour statutory takedown order.',
          hi: 'बीएनएस धारा 173 के तहत कोई भी थाना अधिकार क्षेत्र के आधार पर एफआईआर से इनकार नहीं कर सकता। उन्हें बताएं कि प्लेटफॉर्म ने 24 घंटे की वैधानिक समय सीमा में सामग्री नहीं हटाई है।',
        },
        helpline: '112',
      },
    ],
    templateLetter: {
      en: `To: The Grievance Appellate Committee (GAC) / Platform Nodal Officer
Subject: URGENT: Non-Compliance with Rule 3(2)(b) IT Rules 2021 — Failure to Remove Intimate Content within 24 Hours

Sir/Madam,
I filed a takedown grievance regarding non-consensual intimate content / morphed imagery on [Date & Time] under Grievance Ticket Number [Reference Number].
More than 24 hours have elapsed since receipt of the grievance. The content remains publicly accessible, in violation of mandatory statutory Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
I urge you to immediately disable access to the offending URLs and preserve server logs for law enforcement investigation.

Complainant: [Your Name]
Ticket Reference: [Reference Number]`,
      hi: `सेवा में: शिकायत अपीलीय समिति (GAC) / मध्यस्थ नोडल अधिकारी
विषय: अत्यंत आवश्यक: आईटी नियम 2021 के नियम 3(2)(b) का उल्लंघन — 24 घंटे में अंतरंग सामग्री हटाने में विफलता

महोदय/महोदया,
मैंने [तारीख एवं समय] को शिकायत टिकट संख्या [संदर्भ संख्या] के तहत अनधिकृत अंतरंग/मॉर्फ्ड सामग्री हटाने हेतु औपचारिक शिकायत दर्ज कराई थी।
शिकायत प्राप्ति को 24 घंटे से अधिक समय बीत चुका है, किंतु सामग्री अब भी इंटरनेट पर उपलब्ध है। यह सूचना प्रौद्योगिकी नियम 2021 के नियम 3(2)(b) का स्पष्ट उल्लंघन है।
अतः आपसे अनुरोध है कि संबंधित लिंक को तत्काल प्रभाव से ब्लॉक करें एवं कानूनी जांच हेतु सर्वर लॉग्स सुरक्षित रखें।

शिकायतकर्ता: [आपका नाम]
शिकायत संदर्भ: [संदर्भ संख्या]`,
    },
  },
  {
    id: 'police_refusal',
    triggerTimerType: '72h_acknowledgment',
    title: {
      en: 'Police Station Refuses to Register FIR or Issue GD Copy',
      hi: 'पुलिस थाना एफआईआर दर्ज करने या जीडी रसीद देने से मना करे',
    },
    subtitle: {
      en: 'Your statutory rights under Section 173 and 175 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
      hi: 'भारतीय नागरिक सुरक्षा संहिता (BNSS) 2023 की धारा 173 एवं 175 के तहत आपके कानूनी अधिकार',
    },
    legalBasis: {
      en: 'Section 173 & Section 175, Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
      hi: 'धारा 173 एवं धारा 175, भारतीय नागरिक सुरक्षा संहिता (BNSS), 2023',
    },
    steps: [
      {
        title: {
          en: '1. Demand a General Diary (GD / DD) Entry & Free Copy',
          hi: '1. जनरल डायरी (GD / DD) प्रविष्टि एवं निःशुल्क प्रति की मांग करें',
        },
        desc: {
          en: 'Under Section 173(2) BNSS, you have a statutory right to receive a copy of your complaint record immediately and free of cost. If the officer conducts a preliminary enquiry, request the GD / DD entry number in writing.',
          hi: 'बीएनएसएस धारा 173(2) के तहत आपको अपनी शिकायत दर्ज होने की प्रति निःशुल्क प्राप्त करने का कानूनी अधिकार है। यदि पुलिस प्रारंभिक जांच कर रही है तो जीडी/डीडी नंबर लिखित रूप में अवश्य लें।',
        },
      },
      {
        title: {
          en: '2. Enforce the Zero FIR Mandate (Proviso to Sec 173(1) BNSS)',
          hi: '2. शून्य एफआईआर (Zero FIR) के अधिकार का हवाला दें',
        },
        desc: {
          en: 'A police station CANNOT refuse your cybercrime complaint on the grounds of location or jurisdiction. Under Section 173(1) proviso, they must register a Zero FIR and transfer it to the relevant cyber cell.',
          hi: 'थाना यह नहीं कह सकता कि अपराध किसी अन्य क्षेत्र में हुआ है। धारा 173(1) के तहत वे शून्य एफआईआर दर्ज कर उचित थाने को स्थानांतरित करने के लिए बाध्य हैं।',
        },
      },
      {
        title: {
          en: '3. Send Written Representation to the SP / DCP (Sec 175(3) BNSS)',
          hi: '3. पुलिस अधीक्षक (SP / DCP) को लिखित शिकायत भेजें (धारा 175(3) BNSS)',
        },
        desc: {
          en: 'If the Station House Officer refuses to register the FIR, send your complete complaint with evidence hashes to the Superintendent of Police (SP) or Deputy Commissioner of Police (DCP) by registered post or email.',
          hi: 'यदि थाना प्रभारी एफआईआर दर्ज न करे, तो धारा 175(3) बीएनएसएस के तहत जिले के पुलिस अधीक्षक (SP/DCP) को रजिस्टर्ड डाक या ईमेल द्वारा शिकायत भेजें।',
        },
      },
      {
        title: {
          en: '4. File Application to Judicial Magistrate (Sec 175(4) BNSS)',
          hi: '4. न्यायिक मजिस्ट्रेट के समक्ष आवेदन प्रस्तुत करें (धारा 175(4) BNSS)',
        },
        desc: {
          en: 'If the SP does not direct investigation, you can file an application before the Judicial Magistrate under Section 175(4) BNSS (formerly Sec 156(3) CrPC) for an order directing the police to register the FIR and investigate.',
          hi: 'यदि एसपी द्वारा भी कार्रवाई न की जाए, तो किसी अधिवक्ता के माध्यम से न्यायिक मजिस्ट्रेट के समक्ष धारा 175(4) बीएनएसएस के तहत एफआईआर दर्ज कराने का आदेश प्राप्त किया जा सकता है।',
        },
      },
    ],
    templateLetter: {
      en: `To: The Superintendent of Police (SP) / Deputy Commissioner of Police (DCP)
Subject: Representation under Section 175(3) of Bharatiya Nagarik Suraksha Sanhita, 2023 regarding refusal to register FIR

Respected Sir/Madam,
I am writing to bring to your notice that on [Date] at [Time], I approached [Police Station Name] to lodge a complaint regarding cognizable cyber offences including [Brief Offence: cyber blackmail / intimate imagery circulation].
The duty officer refused to register an FIR or provide a copy of the entry, contrary to Section 173 of the Bharatiya Nagarik Suraksha Sanhita, 2023.
A copy of my original signed complaint, along with cryptographic evidence hashes, is enclosed herewith.
I respectfully request you to exercise your powers under Section 175(3) BNSS and direct the immediate registration of an FIR and investigation into this matter.

Complainant: [Your Full Name]
Contact: [Your Phone / Email]
Address: [Your City/State]`,
      hi: `सेवा में: पुलिस अधीक्षक (SP) / पुलिस उपायुक्त (DCP)
विषय: भारतीय नागरिक सुरक्षा संहिता 2023 की धारा 175(3) के तहत एफआईआर दर्ज न करने पर अभ्यावेदन

महोदय/महोदया,
निवेदन है कि दिनांक [तारीख] को समय [समय] पर मैं [थाने का नाम] में [संक्षिप्त अपराध: साइबर ब्लैकमेल / अंतरंग चित्र प्रसार] की संज्ञेय शिकायत दर्ज कराने गई थी।
ड्यूटी अधिकारी ने बीएनएसएस 2023 की धारा 173 के स्पष्ट प्रावधानों के बावजूद एफआईआर दर्ज करने या पावती देने से इनकार कर दिया।
मेरी मूल शिकायत एवं साक्ष्य हैश की प्रति संलग्न है।
अतः आपसे विनम्र निवेदन है कि बीएनएसएस की धारा 175(3) के तहत अपने अधिकारों का प्रयोग करते हुए अविलंब एफआईआर दर्ज करने एवं निष्पक्ष जांच का निर्देश दें।

शिकायतकर्ता: [आपका पूरा नाम]
संपर्क: [फ़ोन / ईमेल]
पता: [शहर / राज्य]`,
    },
  },
  {
    id: 'intermediary_72h',
    triggerTimerType: '72h_acknowledgment',
    title: {
      en: 'No Acknowledgment from Platform After 72 Hours',
      hi: '72 घंटे बाद भी प्लेटफॉर्म से पावती या टिकट नहीं मिला',
    },
    subtitle: {
      en: 'Platform has breached Rule 3(2)(a) acknowledgment requirement',
      hi: 'मध्यस्थ ने नियम 3(2)(a) के तहत अनिवार्य पावती नियम का पालन नहीं किया',
    },
    legalBasis: {
      en: 'Rule 3(2)(a) & Rule 3A, IT Rules 2021',
      hi: 'नियम 3(2)(a) एवं नियम 3A, सूचना प्रौद्योगिकी नियम 2021',
    },
    steps: [
      {
        title: {
          en: '1. Re-Submit with SHA-256 Hashes and "Statutory Notice" Subject',
          hi: '1. विषय में "Statutory Notice" लिखकर और साक्ष्य हैश जोड़कर पुनः भेजें',
        },
        desc: {
          en: 'Send an email to the platform’s designated Grievance Officer with the words "Statutory Notice under Rule 3(2) IT Rules 2021" in the subject line.',
          hi: 'प्लेटफॉर्म के शिकायत अधिकारी को विषय में "Statutory Notice under Rule 3(2) IT Rules 2021" लिखकर ईमेल भेजें।',
        },
      },
      {
        title: {
          en: '2. Escalate to Grievance Appellate Committee (GAC)',
          hi: '2. शिकायत अपीलीय समिति (GAC) पोर्टल पर शिकायत दर्ज करें',
        },
        desc: {
          en: 'Failure to acknowledge within 72 hours constitutes grounds for escalation to the central GAC portal at gac.gov.in.',
          hi: '72 घंटे में पावती न मिलना gac.gov.in पर अपील दायर करने का वैध आधार है।',
        },
        actionUrl: 'https://gac.gov.in',
        actionLabel: {
          en: 'Visit GAC (gac.gov.in)',
          hi: 'GAC पोर्टल पर जाएँ (gac.gov.in)',
        },
      },
      {
        title: {
          en: '3. Dial 1930 Cybercrime Helpline',
          hi: '3. 1930 साइबर अपराध हेल्पलाइन पर कॉल करें',
        },
        desc: {
          en: 'Call 1930 to record that the intermediary is unresponsive to a harassment / cyber fraud grievance.',
          hi: '1930 पर कॉल कर बताएं कि मध्यस्थ द्वारा साइबर अपराध शिकायत पर कोई पावती नहीं दी जा रही है।',
        },
        helpline: '1930',
      },
    ],
  },
];

/**
 * Synthetic Sample Records for instant demonstration without entering personal data
 */
export const SYNTHETIC_SAMPLE_RECORDS: TrackingRecord[] = [
  {
    id: 'trk-sample-ncrp-01',
    submissionType: 'ncrp',
    title: 'National Cyber Crime Reporting Portal (cybercrime.gov.in)',
    referenceNumber: '2026/NCRP/984210',
    submittedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 26 hours ago
    officerName: 'Sub-Inspector R. Sharma (Cyber Cell, Central District)',
    officerContact: 'cybercell-central@delhipolice.gov.in',
    status: 'acknowledged',
    categoryKey: 'blackmail',
    notes: [
      {
        id: 'note-01',
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        text: 'Complaint submitted online under "Report Women/Child Related Crime" with evidence manifest SHA-256 checksums.',
      },
      {
        id: 'note-02',
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        text: 'Received SMS acknowledgment with reference 2026/NCRP/984210. Assigned to District Cyber Cell.',
      },
    ],
    followUpDeadline: new Date(Date.now() + 46 * 60 * 60 * 1000).toISOString(),
    statutoryTimerId: 'tmr-sample-72h-01',
    updatedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'trk-sample-platform-02',
    submissionType: 'platform',
    title: 'Instagram Grievance Officer (Meta Platforms)',
    referenceNumber: 'META-GRV-2026-44910',
    submittedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), // 25 hours ago
    officerName: 'Grievance Officer (India)',
    officerContact: 'grievance-officer-india@support.facebook.com',
    status: 'submitted',
    categoryKey: 'intimate_images',
    notes: [
      {
        id: 'note-03',
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        text: 'Formal takedown notice filed under Rule 3(2)(b) IT Rules 2021 requesting removal of non-consensual images within 24 hours.',
      },
    ],
    followUpDeadline: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Expired 1 hour ago
    statutoryTimerId: 'tmr-sample-24h-02',
    updatedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
  },
];

export const SYNTHETIC_SAMPLE_TIMERS: StatutoryTimer[] = [
  {
    id: 'tmr-sample-72h-01',
    recordId: 'trk-sample-ncrp-01',
    timerType: '72h_acknowledgment',
    title: {
      en: '72-Hour Grievance & Police Acknowledgment',
      hi: '72 घंटे की शिकायत पावती एवं प्रारंभिक संज्ञान समय सीमा',
    },
    legalBasis: {
      en: 'Rule 3(2)(a), IT Rules 2021',
      hi: 'नियम 3(2)(a), आईटी नियम 2021',
    },
    startedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    durationHours: 72,
    expiresAt: new Date(Date.now() + 46 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    id: 'tmr-sample-24h-02',
    recordId: 'trk-sample-platform-02',
    timerType: '24h_ncii',
    title: {
      en: '24-Hour NCII Removal Window',
      hi: '24 घंटे की अनिवार्य सामग्री निष्कासन समय सीमा',
    },
    legalBasis: {
      en: 'Rule 3(2)(b), IT Rules 2021',
      hi: 'नियम 3(2)(b), सूचना प्रौद्योगिकी नियम 2021',
    },
    startedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    durationHours: 24,
    expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'expired',
  },
];
