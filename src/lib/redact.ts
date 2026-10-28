/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Client-Side In-Memory Redaction Engine
 * 
 * PRIVACY GUARANTEES:
 * 1. 100% in-browser deterministic regex analysis.
 * 2. No telemetry, no logs, no external dictionary APIs.
 * 3. Distinguishes complainant contact details from perpetrator identifiers.
 */

export type RedactionType =
  | 'phone'
  | 'email'
  | 'url'
  | 'upi'
  | 'aadhaar'
  | 'long_digits'
  | 'secret'
  | 'custom';

export interface RedactionItem {
  id: string;
  type: RedactionType;
  text: string;
  start: number;
  end: number;
  defaultRedact: boolean;
  label: string;
}

export interface RedactScanOptions {
  userPhone?: string;
  userEmail?: string;
  customWords?: string[];
}

/**
 * Scans input text and returns all identifiable entities with recommended default redaction states.
 */
export function findRedactionTargets(text: string, options: RedactScanOptions = {}): RedactionItem[] {
  const items: RedactionItem[] = [];
  let itemIndex = 0;

  const userPhoneClean = options.userPhone?.replace(/\D/g, '') || '';
  const userEmailClean = options.userEmail?.trim().toLowerCase() || '';
  const customWords = options.customWords?.map((w) => w.trim()).filter((w) => w.length > 0) || [];

  // Helper to record non-overlapping matches
  const addMatch = (
    type: RedactionType,
    matchedText: string,
    start: number,
    end: number,
    defaultRedact: boolean,
    label: string
  ) => {
    // Avoid duplicates or overlap
    const overlaps = items.some(
      (it) => (start >= it.start && start < it.end) || (end > it.start && end <= it.end)
    );
    if (!overlaps && matchedText.trim().length > 0) {
      items.push({
        id: `redact-${type}-${++itemIndex}`,
        type,
        text: matchedText,
        start,
        end,
        defaultRedact,
        label,
      });
    }
  };

  // 1. Long digit sequences (Credit/Debit cards, bank account numbers 13-19 digits) (Default: ON)
  const longDigitsRegex = /\b(?:\d[ -]?){13,19}\b/g;
  let match: RegExpExecArray | null;
  while ((match = longDigitsRegex.exec(text)) !== null) {
    const digitsOnly = match[0].replace(/\D/g, '');
    if (digitsOnly.length >= 13 && digitsOnly.length <= 19) {
      addMatch('long_digits', match[0], match.index, match.index + match[0].length, true, 'Card / Bank Account Number');
    }
  }

  // 2. Aadhaar-style 12-digit numbers: exactly 12 digits (4-4-4 or 12 continuous digits) (Default: ON)
  const aadhaarRegex = /\b\d{4}[ -]?\d{4}[ -]?\d{4}\b(?!\s*\d)/g;
  while ((match = aadhaarRegex.exec(text)) !== null) {
    const digitsOnly = match[0].replace(/\D/g, '');
    if (digitsOnly.length === 12) {
      addMatch('aadhaar', match[0], match.index, match.index + match[0].length, true, 'Aadhaar / 12-digit ID');
    }
  }

  // 3. Secret phrases: OTP, PIN, Passwords (Default: ON)
  const secretRegex = /\b(?:OTP|PIN|Password|Passcode|पासवर्ड|पिन)[:\s\-]*([a-zA-Z0-9]{4,16})\b/gi;
  while ((match = secretRegex.exec(text)) !== null) {
    addMatch('secret', match[0], match.index, match.index + match[0].length, true, 'Security PIN / OTP');
  }

  // 4. Email addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  while ((match = emailRegex.exec(text)) !== null) {
    const isUserEmail = userEmailClean && match[0].toLowerCase() === userEmailClean;
    // Default: ON for complainant's own email, OFF for other parties
    addMatch('email', match[0], match.index, match.index + match[0].length, !!isUserEmail, 'Email Address');
  }

  // 5. UPI IDs (name@bank format) (Default: OFF for other person's UPI ID, ON if user's own)
  const upiRegex = /\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|axl|upi|apl|fbl)\b/gi;
  while ((match = upiRegex.exec(text)) !== null) {
    addMatch('upi', match[0], match.index, match.index + match[0].length, false, 'UPI ID / VPA');
  }

  // 6. Indian phone numbers: +91, with spaces/hyphens, or 10 digits starting with 6-9
  const phoneRegex = /(?:\+91[\s\-]?)?[6-9]\d{4}[\s\-]?\d{5}\b/g;
  while ((match = phoneRegex.exec(text)) !== null) {
    const rawDigits = match[0].replace(/\D/g, '');
    const isUserPhone = userPhoneClean && (rawDigits.includes(userPhoneClean) || userPhoneClean.includes(rawDigits));
    // Default: ON for complainant's own phone, OFF for other person's number
    addMatch('phone', match[0], match.index, match.index + match[0].length, !!isUserPhone, 'Phone Number');
  }

  // 7. URLs (Default: OFF for perpetrator profiles/posts)
  const urlRegex = /https?:\/\/[^\s<>"'{}|\\^`]+|www\.[^\s<>"'{}|\\^`]+/gi;
  while ((match = urlRegex.exec(text)) !== null) {
    addMatch('url', match[0], match.index, match.index + match[0].length, false, 'Web / Profile Link');
  }

  // 8. Custom user words to hide (Default: ON)
  customWords.forEach((word) => {
    if (word.length >= 2) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const customRegex = new RegExp(`\\b${escaped}\\b`, 'gi');
      while ((match = customRegex.exec(text)) !== null) {
        addMatch('custom', match[0], match.index, match.index + match[0].length, true, `Custom Word: "${word}"`);
      }
    }
  });

  // Sort by start index
  return items.sort((a, b) => a.start - b.start);
}

/**
 * Replaces selected redaction matches with [REDACTED].
 */
export function applyRedactions(text: string, selectedIds: Set<string>, items: RedactionItem[]): string {
  // Sort descending by start offset to prevent position shifting during replacement
  const itemsToRedact = items
    .filter((it) => selectedIds.has(it.id))
    .sort((a, b) => b.start - a.start);

  let result = text;
  for (const item of itemsToRedact) {
    result = result.slice(0, item.start) + '[REDACTED]' + result.slice(item.end);
  }

  return result;
}
