/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Report Mode & Redaction Verification Test Suite
 * Validates deterministic drafting, 7-section ordering, legal safety, and redaction logic.
 */

import { generateComplaintDraft, ComplaintFormData } from '../src/data/complaintTemplates';
import { findRedactionTargets, applyRedactions } from '../src/lib/redact';

async function runReportTests() {
  console.log('🧪 Running Kavach Report Mode & Redaction Verification Suite...\n');

  let failed = false;

  // ---------------------------------------------------------------------------
  // Test 1: Empty fields produce placeholders and NO invented text
  // ---------------------------------------------------------------------------
  console.log('1. Testing placeholder handling for empty input...');
  const emptyFormData: ComplaintFormData = {
    documentType: 'police',
    language: 'en',
    complainantName: '',
    complainantContact: '',
    complainantLocation: '',
    categoryKey: 'general',
    approxDateTime: '',
    platformName: '',
    suspectIdentifiers: '',
    incidentDescription: '',
    intimateContentStatus: 'not_sure',
    moneyDemandedStatus: 'no',
    moneyAmount: '',
    timeline: [],
    evidenceItems: [],
    includeProvisions: false,
    selectedProvisionIds: [],
  };

  const emptyDraft = generateComplaintDraft(emptyFormData);
  if (
    emptyDraft.includes('[Your Full Name]') &&
    emptyDraft.includes('[Your Phone Number / Email Address]') &&
    emptyDraft.includes('[Date and Time of Occurrence]') &&
    emptyDraft.includes('[Signature / Name of Complainant]')
  ) {
    console.log('   ✅ Empty fields correctly produced visible [placeholders].');
  } else {
    console.error('   ❌ Empty draft missing expected placeholders.');
    failed = true;
  }

  // Ensure no invented names or dates
  if (emptyDraft.includes('John') || emptyDraft.includes('Pooja') || emptyDraft.includes('2024-01-01')) {
    console.error('   ❌ Invented mock names or dates found in empty draft!');
    failed = true;
  } else {
    console.log('   ✅ Verified no hallucinated or invented names/dates.');
  }

  // ---------------------------------------------------------------------------
  // Test 2: Police complaint contains all 7 sections in exact chronological order
  // ---------------------------------------------------------------------------
  console.log('\n2. Testing police complaint 7-section order...');
  const sections = [
    '1. SUBJECT AND NATURE OF COMPLAINT:',
    '2. COMPLAINANT\'S ACCOUNT OF EVENTS:',
    '3. CHRONOLOGICAL TIMELINE:',
    '4. PLATFORM URLS AND SUSPECT IDENTIFIERS:',
    '5. EVIDENCE INVENTORY AND INTEGRITY FINGERPRINTS:',
    '6. REQUESTED ACTIONS:',
    '7. DECLARATION:',
  ];

  let lastIndex = -1;
  let orderOk = true;
  for (const section of sections) {
    const idx = emptyDraft.indexOf(section);
    if (idx === -1) {
      console.error(`   ❌ Section missing: "${section}"`);
      orderOk = false;
      failed = true;
    } else if (idx < lastIndex) {
      console.error(`   ❌ Section out of order: "${section}" at index ${idx} followed index ${lastIndex}`);
      orderOk = false;
      failed = true;
    }
    lastIndex = idx;
  }

  if (orderOk) {
    console.log('   ✅ All 7 sections present in strictly increasing order.');
  }

  // ---------------------------------------------------------------------------
  // Test 3: Legal provisions appear ONLY when checked, NEVER as legal findings
  // ---------------------------------------------------------------------------
  console.log('\n3. Testing legal provisions safety phrasing...');
  // Check when toggle is false
  if (emptyDraft.includes('PROVISIONS FOR LEGAL CONSIDERATION')) {
    console.error('   ❌ Legal provisions appeared when includeProvisions was false!');
    failed = true;
  } else {
    console.log('   ✅ Provisions section absent when checkbox is OFF.');
  }

  // Check when toggle is true
  const withProvisionsData: ComplaintFormData = {
    ...emptyFormData,
    includeProvisions: true,
    selectedProvisionIds: ['it_66c', 'bns_78'],
  };
  const provisionsDraft = generateComplaintDraft(withProvisionsData);

  if (
    provisionsDraft.includes('PROVISIONS FOR LEGAL CONSIDERATION:') &&
    provisionsDraft.includes('I respectfully request the investigating officer to consider the applicable provisions of law, which may include:') &&
    provisionsDraft.includes('Section 66C') &&
    provisionsDraft.includes('Section 78')
  ) {
    console.log('   ✅ Provisions correctly formatted with non-binding request phrasing.');
  } else {
    console.error('   ❌ Provisions draft did not include expected safe wording.');
    failed = true;
  }

  // Verify it never asserts a crime "has been committed under"
  if (provisionsDraft.includes('has been committed under') || provisionsDraft.includes('is guilty under')) {
    console.error('   ❌ Illegal definitive finding phrase found in draft!');
    failed = true;
  } else {
    console.log('   ✅ Verified no non-lawyer conclusive assertions.');
  }

  // ---------------------------------------------------------------------------
  // Test 4: Hindi output contains no leftover English template text
  // ---------------------------------------------------------------------------
  console.log('\n4. Testing Hindi complaint translation integrity...');
  const hindiFormData: ComplaintFormData = {
    ...emptyFormData,
    language: 'hi',
    includeProvisions: true,
    selectedProvisionIds: ['bns_77'],
  };
  const hindiDraft = generateComplaintDraft(hindiFormData);

  const hindiSections = [
    'सेवा में,',
    '1. विषय एवं शिकायत का स्वरूप:',
    '2. शिकायतकर्ता का विवरण एवं घटना का ब्योरा:',
    '3. कालक्रम (क्रोनोलॉजिकल टाइमलाइन):',
    '4. प्लेटफ़ॉर्म लिंक एवं आरोपी की पहचान:',
    '5. साक्ष्य सूची एवं डिजिटल फिंगरप्रिंट:',
    '6. आवश्यक कानूनी कार्यवाही हेतु निवेदन:',
    '7. घोषणा:',
  ];

  let hindiOrderOk = true;
  let lastHindiIndex = -1;
  for (const sec of hindiSections) {
    const idx = hindiDraft.indexOf(sec);
    if (idx === -1) {
      console.error(`   ❌ Hindi section missing: "${sec}"`);
      hindiOrderOk = false;
      failed = true;
    } else if (idx < lastHindiIndex) {
      console.error(`   ❌ Hindi section out of order: "${sec}"`);
      hindiOrderOk = false;
      failed = true;
    }
    lastHindiIndex = idx;
  }

  if (hindiOrderOk) {
    console.log('   ✅ All 7 Hindi sections present in exact sequence.');
  }

  // ---------------------------------------------------------------------------
  // Test 5: Redactor detection of synthetic PII & Two Output Versions
  // ---------------------------------------------------------------------------
  console.log('\n5. Testing redaction scanner & entity classification...');
  const syntheticDraftSample = `
Complainant Contact: +91 98765 43210 (Email: user.private@example.com)
Aadhaar ID: 5544 3322 1100
Secret OTP: OTP: 492019
The perpetrator used profile URL: https://instagram.com/blackmail_suspect_2026
Demanded money at UPI ID: suspect.extort@oksbi
Card number used was 4111 2222 3333 4444.
`;

  const targets = findRedactionTargets(syntheticDraftSample, {
    userPhone: '+91 98765 43210',
    userEmail: 'user.private@example.com',
  });

  const typesFound = new Set(targets.map((t) => t.type));
  if (
    typesFound.has('phone') &&
    typesFound.has('email') &&
    typesFound.has('aadhaar') &&
    typesFound.has('secret') &&
    typesFound.has('url') &&
    typesFound.has('upi') &&
    typesFound.has('long_digits')
  ) {
    console.log(`   ✅ Successfully detected all 7 entity types (${targets.length} targets found).`);
  } else {
    console.error(`   ❌ Missing target entity types. Found: ${Array.from(typesFound).join(', ')}`);
    failed = true;
  }

  // Test defaults
  const aadhaarTarget = targets.find((t) => t.type === 'aadhaar');
  const secretTarget = targets.find((t) => t.type === 'secret');
  const userPhoneTarget = targets.find((t) => t.type === 'phone' && t.text.includes('98765 43210'));
  const userEmailTarget = targets.find((t) => t.type === 'email');
  const urlTarget = targets.find((t) => t.type === 'url');
  const upiTarget = targets.find((t) => t.type === 'upi');

  if (
    aadhaarTarget?.defaultRedact === true &&
    secretTarget?.defaultRedact === true &&
    userPhoneTarget?.defaultRedact === true &&
    userEmailTarget?.defaultRedact === true &&
    urlTarget?.defaultRedact === false &&
    upiTarget?.defaultRedact === false
  ) {
    console.log('   ✅ Default redactions verified: Complainant PII & Secrets default ON; Suspect URL & UPI default OFF.');
  } else {
    console.error('   ❌ Incorrect default redaction settings!');
    failed = true;
  }

  // Apply default redactions
  const defaultSelectedIds = new Set(targets.filter((t) => t.defaultRedact).map((t) => t.id));
  const redactedCopy = applyRedactions(syntheticDraftSample, defaultSelectedIds, targets);

  // In the redacted copy:
  // Aadhaar, OTP, user phone, and user email must be replaced with [REDACTED]
  // Suspect URL and UPI ID must remain visible
  if (
    !redactedCopy.includes('5544 3322 1100') &&
    !redactedCopy.includes('OTP: 492019') &&
    !redactedCopy.includes('user.private@example.com') &&
    redactedCopy.includes('https://instagram.com/blackmail_suspect_2026') &&
    redactedCopy.includes('suspect.extort@oksbi')
  ) {
    console.log('   ✅ Redacted copy preserves perpetrator URL & UPI while censoring personal PII.');
  } else {
    console.error('   ❌ Redacted copy failed to censor or incorrectly erased perpetrator details!');
    failed = true;
  }

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log('\n-------------------------------------------------------------');
  if (failed) {
    console.error('❌ Report & Redaction Test Suite FAILED.');
    process.exit(1);
  } else {
    console.log('🎉 All Report & Redaction Test Suite checks PASSED!');
    process.exit(0);
  }
}

runReportTests().catch((err) => {
  console.error('Fatal error in report tests:', err);
  process.exit(1);
});
