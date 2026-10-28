/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Deterministic Complaint Templates
 * 
 * CORE RULES:
 * 1. Deterministic string assembly only. ZERO AI/LLM generation.
 * 2. Missing fields become visible square-bracket placeholders (e.g. [Date and Time]). Never invented.
 * 3. Police complaint contains all 7 mandated sections in exact chronological order:
 *    (1) Subject line and nature of complaint
 *    (2) Complainant's account of events, using only user's text
 *    (3) Chronological timeline
 *    (4) Platform URLs and account identifiers
 *    (5) Evidence inventory with evidence IDs and SHA-256 hashes
 *    (6) Requested action (investigation, server preservation, content removal)
 *    (7) Declaration of truth with signature, date, and place placeholders
 * 4. Takedown request is focused on URLs, non-consensual notice, evidence IDs, and acknowledgment.
 * 5. Suggested legal provisions are only included if explicit opt-in is checked, and are NEVER
 *    worded as a legal finding (always "request the officer to consider applicable provisions").
 */

import { LEGAL_PROVISIONS } from './legalReferences';

export interface TimelineRow {
  id: string;
  dateTime: string;
  description: string;
}

export interface ComplaintEvidenceRow {
  evidenceId: string;
  fileName?: string;
  sha256: string;
  hashedAt?: string;
}

export interface ComplaintFormData {
  documentType: 'police' | 'takedown';
  language: 'en' | 'hi';

  // Step 2: Complainant details (optional)
  complainantName: string;
  complainantContact: string;
  complainantLocation: string;

  // Step 3: What happened
  categoryKey: string;
  approxDateTime: string;
  platformName: string;
  suspectIdentifiers: string;
  incidentDescription: string;
  intimateContentStatus: 'yes' | 'no' | 'not_sure';
  moneyDemandedStatus: 'yes' | 'no';
  moneyAmount: string;

  // Step 4: Timeline
  timeline: TimelineRow[];

  // Step 5: Evidence
  evidenceItems: ComplaintEvidenceRow[];

  // Step 6: Legal provisions option
  includeProvisions: boolean;
  selectedProvisionIds: string[];
}

/**
 * Builds deterministic Police / Cybercrime Complaint draft in English
 */
function buildPoliceComplaintEn(data: ComplaintFormData): string {
  const name = data.complainantName.trim() || '[Your Full Name]';
  const contact = data.complainantContact.trim() || '[Your Phone Number / Email Address]';
  const location = data.complainantLocation.trim() || '[Your City / Police Jurisdiction]';
  const approxTime = data.approxDateTime.trim() || '[Date and Time of Occurrence]';
  const platform = data.platformName.trim() || '[Platform Name, e.g. WhatsApp, Instagram, Telegram]';
  const suspect = data.suspectIdentifiers.trim() || '[Suspect Profile Link / Handle / Phone / UPI ID]';
  const description = data.incidentDescription.trim() || '[Detailed account of what was said, sent, or demanded in your own words]';

  // Intimate content status clause
  let intimateClause = '';
  if (data.intimateContentStatus === 'yes') {
    intimateClause = 'Non-consensual intimate or sexually explicit imagery/videos were involved, threatened, or transmitted.';
  } else if (data.intimateContentStatus === 'not_sure') {
    intimateClause = 'It is uncertain or suspected whether private/intimate images or media have been accessed or threatened.';
  }

  // Money demand clause
  let moneyClause = '';
  if (data.moneyDemandedStatus === 'yes') {
    const amt = data.moneyAmount.trim() ? `in the amount of ${data.moneyAmount.trim()}` : '';
    moneyClause = `Extortion or illicit monetary demands were made ${amt}.`.trim();
  }

  // Timeline section
  let timelineText = '';
  if (data.timeline.length > 0) {
    timelineText = data.timeline
      .map((row, idx) => `  ${idx + 1}. [${row.dateTime || 'Date/Time'}] — ${row.description || '[Incident detail]'}`)
      .join('\n');
  } else {
    timelineText = '  1. [' + approxTime + '] — ' + description;
  }

  // Evidence inventory section
  let evidenceText = '';
  if (data.evidenceItems.length > 0) {
    evidenceText = data.evidenceItems
      .map(
        (ev, idx) =>
          `  ${idx + 1}. Evidence Ref: ${ev.evidenceId}\n` +
          `     File: ${ev.fileName || '[File Name Redacted / Withheld]'}\n` +
          `     SHA-256 Fingerprint: ${ev.sha256}\n` +
          `     Recorded at: ${ev.hashedAt || '[Local Time]'}`
      )
      .join('\n\n');
  } else {
    evidenceText = '  [No digital evidence items attached yet. Digital screenshots and forensic logs to be submitted separately.]';
  }

  // Optional legal provisions
  let provisionsSection = '';
  if (data.includeProvisions && data.selectedProvisionIds.length > 0) {
    const selected = LEGAL_PROVISIONS.filter((p) => data.selectedProvisionIds.includes(p.id));
    if (selected.length > 0) {
      const list = selected
        .map((p) => `  - ${p.act}: ${p.section} (${p.title.en})`)
        .join('\n');
      provisionsSection =
        '\n\nPROVISIONS FOR LEGAL CONSIDERATION:\n' +
        'I respectfully request the investigating officer to consider the applicable provisions of law, which may include:\n' +
        list;
    }
  }

  return (
`TO,
THE OFFICER-IN-CHARGE / CYBER CRIME CELL,
[Police Station / Jurisdiction / cybercrime.gov.in Portal]

1. SUBJECT AND NATURE OF COMPLAINT:
Complaint regarding cyber-harassment, online abuse, and unlawful digital interference occurring on ${platform} around ${approxTime}.

2. COMPLAINANT'S ACCOUNT OF EVENTS:
I, ${name}, residing at/near ${location} (Contact: ${contact}), hereby submit this formal complaint regarding an unlawful online incident.

Account of Events:
${description}
${intimateClause ? '\n' + intimateClause : ''}
${moneyClause ? '\n' + moneyClause : ''}

3. CHRONOLOGICAL TIMELINE:
${timelineText}

4. PLATFORM URLS AND SUSPECT IDENTIFIERS:
Platform: ${platform}
Suspect Identifier(s) / Account(s) / Handle(s) / Payment Details:
${suspect}

5. EVIDENCE INVENTORY AND INTEGRITY FINGERPRINTS:
The following cryptographic evidence records have been generated. The cryptographic SHA-256 hashes listed below allow the investigating officer to independently confirm that the electronic files handed over match the exact bitstream recorded at the time of preservation:

${evidenceText}

6. REQUESTED ACTIONS:
In light of the aforesaid facts and digital evidence, I earnestly request the authorities to:
  a) Register a First Information Report (FIR) / Zero-FIR under the relevant provisions of the Information Technology Act and Bharatiya Nyaya Sanhita (BNS).
  b) Issue an immediate preservation notice to ${platform} under Section 94 BNSS / Section 91 CrPC to secure IP logs, device details, and account registration records before they expire.
  c) Initiate necessary statutory steps for the immediate takedown or blocking of offending content to prevent further dissemination.${provisionsSection}

7. DECLARATION:
I have read this complaint and the facts stated herein are true and correct to the best of my knowledge, information, and belief. No material facts have been concealed.

Date: [Date of Submission]
Place: [City / State]

_______________________________
[Signature / Name of Complainant]`
  );
}

/**
 * Builds deterministic Police / Cybercrime Complaint draft in Hindi
 */
function buildPoliceComplaintHi(data: ComplaintFormData): string {
  const name = data.complainantName.trim() || '[शिकायतकर्ता का पूरा नाम]';
  const contact = data.complainantContact.trim() || '[फ़ोन नंबर / ईमेल पता]';
  const location = data.complainantLocation.trim() || '[शहर / थाना क्षेत्र]';
  const approxTime = data.approxDateTime.trim() || '[घटना की तारीख व समय]';
  const platform = data.platformName.trim() || '[प्लेटफ़ॉर्म का नाम, जैसे WhatsApp, Instagram, Telegram]';
  const suspect = data.suspectIdentifiers.trim() || '[आरोपी का प्रोफ़ाइल लिंक / यूज़रनेम / फ़ोन नंबर / UPI आईडी]';
  const description = data.incidentDescription.trim() || '[घटना का विवरण: क्या कहा गया, क्या भेजा गया या क्या माँग की गई, अपने शब्दों में]';

  // Intimate content clause
  let intimateClause = '';
  if (data.intimateContentStatus === 'yes') {
    intimateClause = 'इस मामले में बिना सहमति वाली अंतरंग अथवा आपत्तिजनक तस्वीरों/वीडियो का प्रयोग, धमकी या प्रसारण शामिल है।';
  } else if (data.intimateContentStatus === 'not_sure') {
    intimateClause = 'यह आशंका या अनिश्चितता है कि निजी/अंतरंग सामग्री तक अनधिकृत पहुँच बनाई गई है अथवा उसकी धमकी दी गई है।';
  }

  // Money demand clause
  let moneyClause = '';
  if (data.moneyDemandedStatus === 'yes') {
    const amt = data.moneyAmount.trim() ? `(${data.moneyAmount.trim()})` : '';
    moneyClause = `आरोपी द्वारा अवैध रूप से पैसों की माँग / जबरन वसूली ${amt} की गई।`.trim();
  }

  // Timeline section
  let timelineText = '';
  if (data.timeline.length > 0) {
    timelineText = data.timeline
      .map((row, idx) => `  ${idx + 1}. [${row.dateTime || 'तारीख/समय'}] — ${row.description || '[घटना विवरण]'}`)
      .join('\n');
  } else {
    timelineText = '  1. [' + approxTime + '] — ' + description;
  }

  // Evidence inventory section
  let evidenceText = '';
  if (data.evidenceItems.length > 0) {
    evidenceText = data.evidenceItems
      .map(
        (ev, idx) =>
          `  ${idx + 1}. साक्ष्य संदर्भ संख्या: ${ev.evidenceId}\n` +
          `     फ़ाइल का नाम: ${ev.fileName || '[फ़ाइल नाम सुरक्षित रखा गया]'}\n` +
          `     SHA-256 डिजिटल फिंगरप्रिंट: ${ev.sha256}\n` +
          `     अंकित समय: ${ev.hashedAt || '[स्थानीय समय]'}`
      )
      .join('\n\n');
  } else {
    evidenceText = '  [अभी कोई डिजिटल साक्ष्य नहीं जोड़ा गया। डिजिटल स्क्रीनशॉट और फॉरेंसिक लॉग अलग से प्रस्तुत किए जाएँगे।]';
  }

  // Optional legal provisions
  let provisionsSection = '';
  if (data.includeProvisions && data.selectedProvisionIds.length > 0) {
    const selected = LEGAL_PROVISIONS.filter((p) => data.selectedProvisionIds.includes(p.id));
    if (selected.length > 0) {
      const list = selected
        .map((p) => `  - ${p.act}: ${p.section} (${p.title.hi})`)
        .join('\n');
      provisionsSection =
        '\n\nकानूनी प्रावधानों पर विचार हेतु निवेदन:\n' +
        'मैं जांच अधिकारी से ससम्मान निवेदन करती हूँ कि कानून के लागू प्रावधानों पर विचार करें, जिनमें निम्नलिखित शामिल हो सकते हैं:\n' +
        list;
    }
  }

  return (
`सेवा में,
प्रभारी अधिकारी / साइबर अपराध शाखा,
[थाने का नाम / क्षेत्राधिकार / cybercrime.gov.in पोर्टल]

1. विषय एवं शिकायत का स्वरूप:
${platform} पर लगभग ${approxTime} घटित साइबर-उत्पीड़न, ऑनलाइन दुर्व्यवहार एवं गैरकानूनी कृत्यों के संबंध में शिकायत।

2. शिकायतकर्ता का विवरण एवं घटना का ब्योरा:
मैं, ${name}, निवासी ${location} (संपर्क: ${contact}), इस औपचारिक शिकायत के माध्यम से निम्नलिखित गैरकानूनी घटना को आपके संज्ञान में लाती हूँ।

घटना का विवरण:
${description}
${intimateClause ? '\n' + intimateClause : ''}
${moneyClause ? '\n' + moneyClause : ''}

3. कालक्रम (क्रोनोलॉजिकल टाइमलाइन):
${timelineText}

4. प्लेटफ़ॉर्म लिंक एवं आरोपी की पहचान:
प्लेटफ़ॉर्म: ${platform}
आरोपी का प्रोफ़ाइल लिंक / यूज़रनेम / फ़ोन नंबर / UPI विवरण:
${suspect}

5. साक्ष्य सूची एवं डिजिटल फिंगरप्रिंट:
घटना के संबंध में निम्नलिखित इलेक्ट्रॉनिक साक्ष्य सुरक्षित किए गए हैं। नीचे दिए गए SHA-256 हैश जांच अधिकारी को यह स्वतंत्र रूप से सत्यापित करने की सुविधा देते हैं कि सौंपी गई फ़ाइलें संचय के समय दर्ज की गई सामग्री से अक्षरशः मेल खाती हैं:

${evidenceText}

6. आवश्यक कानूनी कार्यवाही हेतु निवेदन:
उपरोक्त तथ्यों एवं डिजिटल साक्ष्यों के आधार पर मेरा विनम्र निवेदन है कि:
  क) सूचना प्रौद्योगिकी अधिनियम (IT Act) एवं भारतीय न्याय संहिता (BNS) के प्रासंगिक प्रावधानों के तहत प्रथम सूचना रिपोर्ट (FIR) / शून्य एफआईआर (Zero FIR) दर्ज की जाए।
  ख) आरोपी के खाते से संबंधित आईपी लॉग (IP logs) और पंजीकरण विवरण सुरक्षित करने हेतु ${platform} को तत्काल नोटिस जारी किया जाए।
  ग) पीड़िता की गरिमा की रक्षा हेतु संबंधित आपत्तिजनक सामग्री को इंटरनेट से तत्काल हटाने (takedown) की वैधानिक प्रक्रिया शुरू की जाए।${provisionsSection}

7. घोषणा:
मैंने यह शिकायत पढ़ ली है और इसमें लिखे गए सभी तथ्य मेरी पूर्ण जानकारी और विश्वास के अनुसार सत्य हैं। इसमें कोई भी तथ्य छिपाया नहीं गया है।

दिनांक: [शिकायत दर्ज करने की तारीख]
स्थान: [शहर / राज्य]

_______________________________
[हस्ताक्षर / शिकायतकर्ता का नाम]`
  );
}

/**
 * Builds deterministic Platform Takedown Request in English
 */
function buildPlatformTakedownEn(data: ComplaintFormData): string {
  const name = data.complainantName.trim() || '[Your Full Name]';
  const contact = data.complainantContact.trim() || '[Your Email Address / Contact]';
  const platform = data.platformName.trim() || '[Platform Name, e.g. Instagram, WhatsApp, X]';
  const suspectUrls = data.suspectIdentifiers.trim() || '[URL(s) of the infringing post, story, account, or channel]';
  const description = data.incidentDescription.trim() || '[Brief description of the non-consensual content]';

  let nciiStatement = '';
  if (data.intimateContentStatus === 'yes') {
    nciiStatement =
      'This matter involves non-consensual sexually explicit or intimate content of which I am the victim. Under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, intermediaries are statutorily required to remove or disable access to such content within 24 hours of notification.';
  } else {
    nciiStatement =
      'The content identified below violates platform community guidelines and constitutes severe unauthorized harassment, impersonation, or privacy infringement.';
  }

  const evidenceRefs = data.evidenceItems.length > 0
    ? data.evidenceItems.map((e) => `  - Ref ${e.evidenceId}: SHA-256 [${e.sha256}]`).join('\n')
    : '  - [Evidence captured and hashed locally; preserved for official verification]';

  return (
`TO,
THE RESIDENT GRIEVANCE OFFICER,
${platform} India / Global Grievance Office

SUBJECT: URGENT GRIEVANCE NOTICE & TAKEDOWN REQUEST — INFRINGING AND HARASSING CONTENT

Dear Grievance Officer,

I, ${name} (Contact: ${contact}), am writing to formally report severe abuse and unlawful content hosted on your platform.

1. URL(S) AND CONTENT TO BE REMOVED:
Please take immediate action to disable access to and permanently remove the following URLs / Accounts:
${suspectUrls}

2. NATURE OF INFRINGEMENT:
${description}

3. STATEMENT OF NON-CONSENT:
${nciiStatement}

4. PRESERVED EVIDENCE REFERENCES:
The following evidence files have been cryptographically preserved in browser memory:
${evidenceRefs}

5. REQUEST FOR IMMEDIATE ACKNOWLEDGMENT & COMPLIANCE:
Please confirm receipt of this grievance notice within the statutory timeframe and issue a formal Grievance Ticket Reference Number detailing the actions taken. Please ensure underlying server and IP logs are preserved for law enforcement authorities.

Sincerely,

${name}
Date: [Date of Notice]`
  );
}

/**
 * Builds deterministic Platform Takedown Request in Hindi
 */
function buildPlatformTakedownHi(data: ComplaintFormData): string {
  const name = data.complainantName.trim() || '[शिकायतकर्ता का पूरा नाम]';
  const contact = data.complainantContact.trim() || '[ईमेल पता / संपर्क सूत्र]';
  const platform = data.platformName.trim() || '[प्लेटफ़ॉर्म का नाम, जैसे Instagram, Meta, Telegram]';
  const suspectUrls = data.suspectIdentifiers.trim() || '[हटाए जाने वाले पोस्ट, प्रोफ़ाइल या चैनल का वेब लिंक (URL)]';
  const description = data.incidentDescription.trim() || '[आपत्तिजनक या अनधिकृत सामग्री का संक्षिप्त विवरण]';

  let nciiStatement = '';
  if (data.intimateContentStatus === 'yes') {
    nciiStatement =
      'यह मामला बिना सहमति वाली अंतरंग अथवा व्यक्तिगत सामग्री से संबंधित है। सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम 2021 के नियम 3(2)(b) के तहत, मध्यवर्ती प्लेटफ़ॉर्म सूचना मिलने के 24 घंटे के भीतर ऐसी सामग्री तक पहुंच हटाने या अक्षम करने के लिए कानूनी रूप से बाध्य हैं।';
  } else {
    nciiStatement =
      'नीचे उल्लिखित सामग्री प्लेटफ़ॉर्म के सामुदायिक मानकों का गंभीर उल्लंघन करती है और अनधिकृत उत्पीड़न, प्रतिरूपण या निजता के हनन की श्रेणी में आती है।';
  }

  const evidenceRefs = data.evidenceItems.length > 0
    ? data.evidenceItems.map((e) => `  - संदर्भ ${e.evidenceId}: SHA-256 [${e.sha256}]`).join('\n')
    : '  - [साक्ष्य स्थानीय स्तर पर सुरक्षित किया गया है; आधिकारिक जांच हेतु उपलब्ध है]';

  return (
`सेवा में,
रेज़िडेंट ग्रीवेंस ऑफिसर (शिकायत निवारण अधिकारी),
${platform}

विषय: अत्यंत आवश्यक शिकायत नोटिस — आपत्तिजनक सामग्री को तत्काल इंटरनेट से हटाने (Takedown) के संबंध में

महोदय / महोदया,

मैं, ${name} (संपर्क: ${contact}), आपके प्लेटफ़ॉर्म पर प्रसारित हो रही गैरकानूनी एवं अपमानजनक सामग्री की औपचारिक शिकायत दर्ज करा रही हूँ।

1. हटाई जाने वाली सामग्री का वेब लिंक (URL):
कृपया निम्नलिखित लिंक / खातों को तुरंत ब्लॉक करने एवं सामग्री हटाने की कृपा करें:
${suspectUrls}

2. आपत्तिजनक सामग्री का विवरण:
${description}

3. सहमति न होने का वैधानिक कथन:
${nciiStatement}

4. सुरक्षित किए गए साक्ष्य संदर्भ:
इस घटना से संबंधित डिजिटल साक्ष्य स्थानीय रूप से सत्यापित किए गए हैं:
${evidenceRefs}

5. त्वरित पावती एवं कार्यवाही हेतु निवेदन:
कृपया इस शिकायत पत्र की प्राप्ति की औपचारिक पुष्टि करें और जारी की गई टिकट संख्या (Ticket Number) प्रदान करें। साथ ही कानून प्रवर्तन एजेंसियों की जांच हेतु संबंधित सर्वर और आईपी लॉग सुरक्षित रखें।

भवदीया,

${name}
दिनांक: [शिकायत भेजने की तारीख]`
  );
}

/**
 * Main complaint draft generator
 */
export function generateComplaintDraft(data: ComplaintFormData): string {
  if (data.documentType === 'police') {
    return data.language === 'hi' ? buildPoliceComplaintHi(data) : buildPoliceComplaintEn(data);
  } else {
    return data.language === 'hi' ? buildPlatformTakedownHi(data) : buildPlatformTakedownEn(data);
  }
}

/**
 * Counts placeholders matching `[...]` in text
 */
export function countUnresolvedPlaceholders(text: string): { count: number; placeholders: string[] } {
  const matches = text.match(/\[[^\]]+\]/g) || [];
  // Filter out [REDACTED] or [REDACTED: ...] as those are intentional redactions, not user fill-in placeholders
  const fillIns = matches.filter((m) => !m.startsWith('[REDACTED'));
  return {
    count: fillIns.length,
    placeholders: Array.from(new Set(fillIns)),
  };
}
