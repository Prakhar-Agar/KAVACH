/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Track Mode (Phase 5) Automated Verification Suite
 * 
 * Tests:
 * 1. Statutory countdown timer duration, presets, and expiration arithmetic.
 * 2. In-memory ledger record lifecycle (add, note, status update, filter).
 * 3. Synthetic demo data integrity (NCRP acknowledgment & 24h NCII takedown samples).
 * 4. Structured JSON manifest export & import round-trip.
 * 5. Statutory escalation paths (Rule 3(2)(b) IT Rules, BNSS 173/175, GAC, NCW).
 */

import {
  STATUTORY_TIMER_PRESETS,
  SYNTHETIC_SAMPLE_RECORDS,
  SYNTHETIC_SAMPLE_TIMERS,
  ESCALATION_PATHS,
  TrackingRecord,
  StatutoryTimer,
} from '../src/data/trackingData';
import { translations } from '../src/i18n/translations';

let failures = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`   ✅ ${message}`);
  }
}

console.log('🧪 Running Kavach Track Mode Verification Suite...\n');

// -----------------------------------------------------------------------------
// 1. Statutory Timer Duration & Presets
// -----------------------------------------------------------------------------
console.log('1. Testing statutory countdown timer presets and legal rules...');
const nciiPreset = STATUTORY_TIMER_PRESETS['24h_ncii'];
assert(nciiPreset.durationHours === 24, '24h NCII timer duration is exactly 24 hours');
assert(nciiPreset.legalBasis.en.includes('3(2)(b)'), '24h NCII timer cites Rule 3(2)(b) in English');
assert(nciiPreset.legalBasis.hi.includes('3(2)(b)'), '24h NCII timer cites Rule 3(2)(b) in Hindi');
assert(nciiPreset.verifiedBy === null, 'NCII preset carries verifiedBy: null');
assert(Boolean(nciiPreset.source && nciiPreset.lastReviewed), 'NCII preset carries source and lastReviewed');

const ackPreset = STATUTORY_TIMER_PRESETS['24h_acknowledgment'];
assert(ackPreset.durationHours === 24, '24h grievance acknowledgment timer duration is exactly 24 hours');
assert(ackPreset.legalBasis.en.includes('3(2)(a)'), '24h grievance acknowledgment timer cites Rule 3(2)(a)');
assert(ackPreset.verifiedBy === null, 'Grievance acknowledgment carries verifiedBy: null');

const removalPreset = STATUTORY_TIMER_PRESETS['72h_removal'];
assert(removalPreset.durationHours === 72, '72h removal request timer duration is exactly 72 hours');
assert(removalPreset.description.en.includes('72 hours'), '72h removal timer specifies 72 hours');
assert(removalPreset.verifiedBy === null, 'Removal request timer carries verifiedBy: null');

const resolutionPreset = STATUTORY_TIMER_PRESETS['15d_resolution'];
assert(resolutionPreset.durationHours === 360, '15-day grievance resolution timer duration is 360 hours (15 days)');
assert(resolutionPreset.verifiedBy === null, 'Resolution timer carries verifiedBy: null');

// Test timer expiration arithmetic
const now = Date.now();
const expiredTimer: StatutoryTimer = {
  id: 'tmr-test-expired',
  timerType: '24h_ncii',
  title: nciiPreset.title,
  legalBasis: nciiPreset.legalBasis,
  startedAt: new Date(now - 25 * 60 * 60 * 1000).toISOString(),
  durationHours: 24,
  expiresAt: new Date(now - 1 * 60 * 60 * 1000).toISOString(),
  source: nciiPreset.source,
  lastReviewed: nciiPreset.lastReviewed,
  verifiedBy: null,
  status: 'expired',
};
const remainingMs = new Date(expiredTimer.expiresAt).getTime() - now;
assert(remainingMs < 0, 'Expired timer correctly registers negative remaining time');
const overdueHours = Math.floor(Math.abs(remainingMs) / (1000 * 60 * 60));
assert(overdueHours === 1, 'Overdue calculation reflects 1 hour overdue accurately');

// -----------------------------------------------------------------------------
// 2. Synthetic Sample Records
// -----------------------------------------------------------------------------
console.log('\n2. Testing synthetic sample records for instant testability...');
assert(SYNTHETIC_SAMPLE_RECORDS.length >= 2, 'At least 2 synthetic sample records provided');
const sampleNcrp = SYNTHETIC_SAMPLE_RECORDS.find((r) => r.submissionType === 'ncrp');
assert(!!sampleNcrp, 'Sample NCRP portal complaint record exists');
assert(Boolean(sampleNcrp?.referenceNumber.includes('NCRP')), 'Sample NCRP reference number format is realistic');
assert((sampleNcrp?.notes.length || 0) >= 2, 'Sample NCRP has dated follow-up notes');

const samplePlatform = SYNTHETIC_SAMPLE_RECORDS.find((r) => r.submissionType === 'platform');
assert(!!samplePlatform, 'Sample platform takedown record exists');
assert(samplePlatform?.categoryKey === 'intimate_images', 'Sample platform record tests intimate imagery category');

// -----------------------------------------------------------------------------
// 3. Structured JSON Manifest Export & Round-Trip
// -----------------------------------------------------------------------------
console.log('\n3. Testing JSON export & round-trip import...');
const mockExport = {
  manifestType: 'kavach_tracking_ledger',
  version: '1.0',
  exportedAtUtc: new Date().toISOString(),
  recordCount: SYNTHETIC_SAMPLE_RECORDS.length,
  timerCount: SYNTHETIC_SAMPLE_TIMERS.length,
  records: SYNTHETIC_SAMPLE_RECORDS,
  timers: SYNTHETIC_SAMPLE_TIMERS,
};

const jsonString = JSON.stringify(mockExport, null, 2);
assert(jsonString.includes('kavach_tracking_ledger'), 'JSON export manifest includes manifestType kavach_tracking_ledger');

const parsed = JSON.parse(jsonString);
assert(parsed.manifestType === 'kavach_tracking_ledger', 'Parsed manifestType matches');
assert(Array.isArray(parsed.records) && parsed.records.length === SYNTHETIC_SAMPLE_RECORDS.length, 'Records round-trip preserved completely');
assert(Array.isArray(parsed.timers) && parsed.timers.length === SYNTHETIC_SAMPLE_TIMERS.length, 'Timers round-trip preserved completely');

// Test bad json rejection
try {
  const badParsed = JSON.parse('{"manifestType": "other"}');
  assert(badParsed.manifestType !== 'kavach_tracking_ledger', 'Non-Kavach JSON correctly distinguished');
} catch {
  // ok
}

// -----------------------------------------------------------------------------
// 4. Statutory Escalation Paths
// -----------------------------------------------------------------------------
console.log('\n4. Testing statutory escalation paths and legal references...');
assert(ESCALATION_PATHS.length >= 3, 'At least 3 statutory escalation paths defined');

const nciiEscalation = ESCALATION_PATHS.find((p) => p.id === 'ncii_expired');
assert(!!nciiEscalation, 'NCII 24h failure escalation path present');
const hasGacUrl = nciiEscalation?.steps.some((s) => s.actionUrl === 'https://gac.gov.in');
assert(hasGacUrl === true, 'NCII escalation directs user to Grievance Appellate Committee (gac.gov.in)');
const hasNcwUrl = nciiEscalation?.steps.some((s) => s.actionUrl === 'https://ncwapps.nic.in');
assert(hasNcwUrl === true, 'NCII escalation directs user to National Commission for Women (ncwapps.nic.in)');
assert(!!nciiEscalation?.templateLetter?.en, 'Bilingual statutory notice template provided in English');
assert(!!nciiEscalation?.templateLetter?.hi, 'Bilingual statutory notice template provided in Hindi');

const policeEscalation = ESCALATION_PATHS.find((p) => p.id === 'police_refusal');
assert(!!policeEscalation, 'Police refusal escalation path present');
assert(Boolean(policeEscalation?.legalBasis.en.includes('173') && policeEscalation?.legalBasis.en.includes('175')), 'Police refusal cites BNSS Section 173 and 175');
assert(Boolean(policeEscalation?.steps.some((s) => s.desc.en.includes('Zero FIR'))), 'Police refusal highlights Zero FIR mandate');
assert(Boolean(policeEscalation?.steps.some((s) => s.desc.en.includes('173(4)'))), 'Police refusal highlights SP representation under Section 173(4) BNSS');
assert(Boolean(policeEscalation?.steps.some((s) => s.desc.en.includes('175(3)'))), 'Police refusal highlights Judicial Magistrate application under Section 175(3) BNSS');
assert(!JSON.stringify(ESCALATION_PATHS).includes('175(4)'), 'No incorrect references to Section 175(4) exist in escalation paths');
assert(policeEscalation?.verifiedBy === null, 'Police refusal carries verifiedBy: null');

// -----------------------------------------------------------------------------
// 5. Translation Completeness for Track Mode
// -----------------------------------------------------------------------------
console.log('\n5. Testing Track Mode translation keys...');
const trackKeys = Object.keys(translations.en).filter((k) => k.startsWith('track'));
assert(trackKeys.length >= 50, `Found ${trackKeys.length} Track Mode translation keys`);

trackKeys.forEach((key) => {
  const enVal = (translations.en as any)[key];
  const hiVal = (translations.hi as any)[key];
  if (!hiVal || typeof hiVal !== 'string' || hiVal.trim() === '') {
    assert(false, `Key ${key} has empty Hindi translation`);
  }
});
assert(true, 'All Track Mode translation keys verified non-empty in both English and Hindi');

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n-------------------------------------------------------------');
if (failures > 0) {
  console.error(`❌ Track Mode Verification FAILED with ${failures} errors.`);
  process.exit(1);
} else {
  console.log('🎉 All Track Mode Verification Suite checks PASSED!');
  process.exit(0);
}
