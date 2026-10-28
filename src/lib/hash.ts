/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Client-Side Web Crypto Hashing Engine
 * 
 * PRIVACY RULES:
 * 1. Files are digested 100% locally in browser memory via crypto.subtle.digest.
 * 2. Files, contents, and hashes are NEVER console.logged or sent across the network.
 * 3. 100 MB hard limit prevents browser tab memory crashes.
 */

export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

export class FileSizeExceededError extends Error {
  constructor(sizeBytes: number) {
    super(`File size (${(sizeBytes / (1024 * 1024)).toFixed(1)} MB) exceeds the 100 MB limit.`);
    this.name = 'FileSizeExceededError';
  }
}

export class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileReadError';
  }
}

/**
 * Converts an ArrayBuffer to a 64-character lowercase hexadecimal string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  let hex = '';
  for (let i = 0; i < byteArray.length; i++) {
    hex += byteArray[i].toString(16).padStart(2, '0');
  }
  return hex.toLowerCase();
}

/**
 * Computes SHA-256 hash for a File object using browser Web Crypto API.
 * Rejects if file exceeds 100 MB or read fails.
 */
export async function calculateSHA256(file: File): Promise<string> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new FileSizeExceededError(file.size);
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const digestBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return bufferToHex(digestBuffer);
  } catch (err: any) {
    if (err instanceof FileSizeExceededError) {
      throw err;
    }
    throw new FileReadError(err?.message || 'Unable to read file contents locally.');
  }
}

/**
 * Computes SHA-256 hash for an ArrayBuffer or Uint8Array.
 */
export async function calculateBufferSHA256(buffer: ArrayBuffer | Uint8Array): Promise<string> {
  const digestBuffer = await crypto.subtle.digest('SHA-256', buffer as ArrayBuffer);
  return bufferToHex(digestBuffer);
}

/**
 * Computes SHA-256 hash for a UTF-8 string.
 */
export async function calculateStringSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digestBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(digestBuffer);
}

/**
 * Serializes an object to deterministic canonical JSON (keys sorted recursively, no whitespace).
 */
export function canonicalJson(obj: any): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return '[' + obj.map(canonicalJson).join(',') + ']';
  }

  const keys = Object.keys(obj).sort();
  const entries = keys.map((key) => JSON.stringify(key) + ':' + canonicalJson(obj[key]));
  return '{' + entries.join(',') + '}';
}

/**
 * Calculates deterministic SHA-256 manifest hash over the canonical JSON of entries array.
 */
export async function calculateManifestHash(entries: any[]): Promise<string> {
  const canonicalString = canonicalJson(entries);
  return calculateStringSHA256(canonicalString);
}
