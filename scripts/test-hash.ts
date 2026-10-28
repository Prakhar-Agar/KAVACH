/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach SHA-256 Test Vectors Verification Script
 * Validates against standard NIST/FIPS 180-4 test vectors.
 */

import { calculateStringSHA256 } from '../src/lib/hash';

async function runHashTests() {
  console.log('🧪 Running SHA-256 Test Vectors Verification...\n');

  let failed = false;

  // Test Vector 1: Empty String
  const vector1Input = '';
  const vector1Expected = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const vector1Result = await calculateStringSHA256(vector1Input);

  if (vector1Result === vector1Expected) {
    console.log('✅ Test Vector 1 (Empty String): MATCH');
    console.log(`   Expected & Actual: ${vector1Result}`);
  } else {
    console.error('❌ Test Vector 1 FAILED');
    console.error(`   Expected: ${vector1Expected}`);
    console.error(`   Actual:   ${vector1Result}`);
    failed = true;
  }

  // Test Vector 2: "abc"
  const vector2Input = 'abc';
  const vector2Expected = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
  const vector2Result = await calculateStringSHA256(vector2Input);

  if (vector2Result === vector2Expected) {
    console.log('✅ Test Vector 2 ("abc"): MATCH');
    console.log(`   Expected & Actual: ${vector2Result}`);
  } else {
    console.error('❌ Test Vector 2 FAILED');
    console.error(`   Expected: ${vector2Expected}`);
    console.error(`   Actual:   ${vector2Result}`);
    failed = true;
  }

  if (failed) {
    console.error('\n❌ Hash test failed.');
    process.exit(1);
  } else {
    console.log('\n🎉 All SHA-256 test vectors PASSED.');
    process.exit(0);
  }
}

runHashTests().catch((err) => {
  console.error('Fatal error running hash tests:', err);
  process.exit(1);
});
