/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Phase 3: PRESERVE & VERIFY
 * Privacy-First In-Browser Evidence Hashing & Verification
 * 
 * PRIVACY GUARANTEES:
 * 1. ZERO network requests. No fetch, no XMLHttpRequest, no FormData, no WebSockets.
 * 2. 100% in-browser Web Crypto API (crypto.subtle.digest).
 * 3. Previews are in-memory Object URLs, blurred by default for trauma-informed protection.
 * 4. Object URLs revoked on file removal and unmount to prevent memory leaks.
 * 5. Full 64-char SHA-256 fingerprint, canonical JSON manifest, and integrity verification.
 */

import React, { useState, useEffect, useRef, useId } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  calculateSHA256,
  calculateManifestHash,
  MAX_FILE_SIZE_BYTES,
  FileSizeExceededError,
  FileReadError,
} from '../lib/hash';
import { CAPTURE_GUIDANCE, CategoryGuidance } from '../data/captureGuidance';
import {
  ShieldCheck,
  FileCheck,
  UploadCloud,
  FileText,
  AlertTriangle,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Printer,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  Search,
  Lock,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

import {
  useEvidence,
  EvidenceItem,
  ExternalManifestEntry,
  ExternalManifest,
} from '../state/EvidenceContext';

interface PreservePageProps {
  onNavigate: (path: string) => void;
}

export const PreservePage: React.FC<PreservePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const {
    items,
    setItems,
    removeItem,
    updateItemField,
    incidentCategory,
    setIncidentCategory,
  } = useEvidence();

  // Tab State
  const [activeTab, setActiveTab] = useState<'preserve' | 'verify'>('preserve');

  // Category Guidance State
  const [selectedGuidanceCategory, setSelectedGuidanceCategory] = useState<string>(
    incidentCategory && CAPTURE_GUIDANCE[incidentCategory] ? incidentCategory : 'general'
  );
  const [isGuidanceCollapsed, setIsGuidanceCollapsed] = useState(false);

  // Evidence Collection State
  const [isDragging, setIsDragging] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [incidentReference, setIncidentReference] = useState('');

  // Verification Tab State
  const [verifySource, setVerifySource] = useState<'current' | 'import'>('current');
  const [selectedCurrentItemId, setSelectedCurrentItemId] = useState<string>('');
  const [importedManifest, setImportedManifest] = useState<ExternalManifest | null>(null);
  const [selectedImportedEntryIndex, setSelectedImportedEntryIndex] = useState<number>(0);
  const [candidateFile, setCandidateFile] = useState<File | null>(null);
  const [candidateHash, setCandidateHash] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const manifestInputRef = useRef<HTMLInputElement>(null);
  const verifyCandidateInputRef = useRef<HTMLInputElement>(null);
  const incidentRefInputId = useId();
  const guidanceCategorySelectId = useId();

  // Track created object URLs for leak-free revocation
  const objectUrlsRef = useRef<Set<string>>(new Set());

  // Determine initial guidance category from query param or EvidenceContext
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam && CAPTURE_GUIDANCE[catParam]) {
      setSelectedGuidanceCategory(catParam);
      setIncidentCategory(catParam);
    } else if (incidentCategory && CAPTURE_GUIDANCE[incidentCategory]) {
      setSelectedGuidanceCategory(incidentCategory);
    }
  }, [location.search, incidentCategory, setIncidentCategory]);

  // Clean up object URLs on component unmount
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
      urls.clear();
    };
  }, []);

  // Alert on tab close/reload if unexported items exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (items.length > 0) {
        e.preventDefault();
        e.returnValue = t.preserveUnsavedLeaveWarning;
        return t.preserveUnsavedLeaveWarning;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [items.length, t.preserveUnsavedLeaveWarning]);

  // Format file size helper
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Helper to safely register an Object URL
  const createLocalPreviewUrl = (file: File): string | null => {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      return null;
    }
    try {
      const url = URL.createObjectURL(file);
      objectUrlsRef.current.add(url);
      return url;
    } catch {
      return null;
    }
  };

  // Process incoming files locally
  const processFiles = async (fileList: FileList | File[]) => {
    setErrorMessage(null);
    setIsHashing(true);

    const newEntries: EvidenceItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Check size limit (100 MB)
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(t.preserveFileSizeError);
        continue;
      }

      try {
        const hash = await calculateSHA256(file);
        const now = new Date();
        const nextId = `EV-${String(items.length + newEntries.length + 1).padStart(2, '0')}`;
        const previewUrl = createLocalPreviewUrl(file);

        newEntries.push({
          id: nextId,
          file,
          fileName: file.name,
          excludeFileName: false,
          fileSizeBytes: file.size,
          mimeType: file.type || 'application/octet-stream',
          sha256: hash,
          hashedAtUtc: now.toISOString(),
          hashedAtLocal: now.toLocaleString(),
          fileLastModified: new Date(file.lastModified).toLocaleString(),
          originalCapturedAt: '',
          sourceType: 'screenshot',
          sourceReference: '',
          excludeSourceRef: false,
          note: '',
          includeNote: false,
          previewUrl,
          isPreviewVisible: false,
          isUnblurred: false,
        });
      } catch (err: any) {
        if (err instanceof FileSizeExceededError) {
          setErrorMessage(t.preserveFileSizeError);
        } else if (err instanceof FileReadError) {
          setErrorMessage(t.preserveFileReadError);
        } else {
          setErrorMessage(t.preserveFileReadError);
        }
      }
    }

    if (newEntries.length > 0) {
      setItems((prev) => [...prev, ...newEntries]);
    }
    setIsHashing(false);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
      e.target.value = '';
    }
  };

  // Generate synthetic sample file
  const handleTrySample = async () => {
    setErrorMessage(null);
    const sampleText = [
      '--- KAVACH SYNTHETIC EVIDENCE SAMPLE ---',
      'Timestamp: 2026-10-28T04:15:00Z',
      'Channel: Demo Messaging Platform',
      'Sender: synthetic_user_9281',
      'Content: [Simulated unauthorized message text for hashing verification purposes only]',
      'Safety Note: This synthetic sample contains zero personal data and verifies client-side SHA-256 calculation.',
    ].join('\n');

    const sampleBlob = new Blob([sampleText], { type: 'text/plain;charset=utf-8' });
    const sampleFile = new File([sampleBlob], 'sample-evidence-log.txt', {
      type: 'text/plain',
      lastModified: Date.now(),
    });

    await processFiles([sampleFile]);
  };

  // Copy SHA-256 to clipboard
  const handleCopyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 3000);
    } catch {
      // ignore
    }
  };

  // Build and Download JSON Manifest
  const handleDownloadManifest = async () => {
    if (items.length === 0) return;

    // Sanitize entries according to redaction toggles
    const sanitizedEntries = items.map((item) => {
      const entry: Record<string, any> = {
        evidenceId: item.id,
        fileName: item.excludeFileName ? '[REDACTED]' : item.fileName,
        fileSizeBytes: item.fileSizeBytes,
        mimeType: item.mimeType,
        sha256: item.sha256,
        hashedAtUtc: item.hashedAtUtc,
        fileLastModified: item.fileLastModified,
        sourceType: item.sourceType,
      };

      if (item.originalCapturedAt.trim()) {
        entry.originalCapturedAt = item.originalCapturedAt.trim();
      }

      if (!item.excludeSourceRef && item.sourceReference.trim()) {
        entry.sourceReference = item.sourceReference.trim();
      } else if (item.excludeSourceRef) {
        entry.sourceReference = '[REDACTED]';
      }

      if (item.includeNote && item.note.trim()) {
        entry.note = item.note.trim();
      }

      return entry;
    });

    const manifestHash = await calculateManifestHash(sanitizedEntries);

    const manifestDoc = {
      manifestVersion: '1.0',
      tool: 'Kavach Cyber-Abuse Response & Reporting Companion',
      generatedAtUtc: new Date().toISOString(),
      incidentReference: incidentReference.trim() || undefined,
      entriesCount: sanitizedEntries.length,
      entries: sanitizedEntries,
      manifestHash,
      manifestHashMethod: 'SHA-256 over canonical JSON entries',
      limitations: {
        legalNotice: t.preserveManifestLimitationsText,
        statutoryReference: 'Section 63 Bharatiya Sakshya Adhiniyam (BSA) 2023 / Section 65B Indian IT Act 2000',
        clientSideGuarantee: 'Generated 100% in browser memory with Web Crypto API. Files were not transmitted over network.',
      },
    };

    const jsonString = JSON.stringify(manifestDoc, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `kavach-evidence-manifest-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  // Print manifest / evidentiary summary sheet
  const handlePrintPdf = () => {
    window.print();
  };

  // External Manifest file selection for Verification
  const handleImportManifestFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyError(null);
    setCandidateHash(null);
    setCandidateFile(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          if (!parsed || !Array.isArray(parsed.entries) || parsed.entries.length === 0) {
            setVerifyError(t.verifyInvalidManifest);
            setImportedManifest(null);
            return;
          }
          setImportedManifest(parsed);
          setSelectedImportedEntryIndex(0);
        } catch {
          setVerifyError(t.verifyInvalidManifest);
          setImportedManifest(null);
        }
      };

      reader.onerror = () => {
        setVerifyError(t.verifyInvalidManifest);
      };

      reader.readAsText(file);
      e.target.value = '';
    }
  };

  // Verification: Test target file against chosen reference hash
  const handleVerifyCandidateFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyError(null);
    setCandidateHash(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCandidateFile(file);
      setIsVerifying(true);

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setVerifyError(t.preserveFileSizeError);
        setIsVerifying(false);
        return;
      }

      try {
        const hash = await calculateSHA256(file);
        setCandidateHash(hash);
      } catch {
        setVerifyError(t.preserveFileReadError);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  // Get active reference entry for Verification
  const getReferenceEntry = (): { id: string; name: string; expectedHash: string } | null => {
    if (verifySource === 'current') {
      const currentItem = items.find((i) => i.id === selectedCurrentItemId) || items[0];
      if (!currentItem) return null;
      return {
        id: currentItem.id,
        name: currentItem.fileName,
        expectedHash: currentItem.sha256,
      };
    } else {
      if (!importedManifest || !importedManifest.entries[selectedImportedEntryIndex]) return null;
      const entry = importedManifest.entries[selectedImportedEntryIndex];
      return {
        id: entry.evidenceId || `Entry #${selectedImportedEntryIndex + 1}`,
        name: entry.fileName || 'Unnamed Evidence Entry',
        expectedHash: entry.sha256,
      };
    }
  };

  const activeReference = getReferenceEntry();
  const isMatch = activeReference && candidateHash ? activeReference.expectedHash.toLowerCase() === candidateHash.toLowerCase() : null;

  const currentGuidance: CategoryGuidance = CAPTURE_GUIDANCE[selectedGuidanceCategory] || CAPTURE_GUIDANCE.general;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Print View Stylesheet Integration */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print, header, footer, button, nav { display: none !important; }
          .print-only { display: block !important; }
          .print-card { border: 1px solid #94a3b8 !important; page-break-inside: avoid; margin-bottom: 1rem; padding: 1rem !important; background: white !important; color: black !important; }
          .print-hash { word-break: break-all !important; font-family: monospace !important; color: black !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>

      {/* Header Badge & Title */}
      <div className="mb-6 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-medium tracking-wide mb-3">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>{t.preserveHeaderBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          {t.preserveTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {t.preserveSubtitle}
        </p>
      </div>

      {/* Memory Notice Banner */}
      <div className="mb-6 p-4 rounded-lg bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs sm:text-sm flex items-start gap-3 no-print">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-300">{t.preserveMemoryNotice}</p>
        </div>
      </div>

      {/* Capture Guidance Banner (Category-Matched & Switchable) */}
      <div className="mb-8 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden no-print">
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-white">
              {currentGuidance.heading[language]}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor={guidanceCategorySelectId} className="sr-only">
              Guidance Category
            </label>
            <select
              id={guidanceCategorySelectId}
              value={selectedGuidanceCategory}
              onChange={(e) => setSelectedGuidanceCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="general">{t.guidanceCatGeneral}</option>
              <option value="blackmail">{t.guidanceCatBlackmail}</option>
              <option value="ncii_threat">{t.guidanceCatNcii}</option>
              <option value="impersonation">{t.guidanceCatImpersonation}</option>
              <option value="stalking">{t.guidanceCatStalking}</option>
            </select>
            <button
              type="button"
              onClick={() => setIsGuidanceCollapsed(!isGuidanceCollapsed)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded bg-slate-800"
            >
              <span>{isGuidanceCollapsed ? 'Expand' : 'Collapse'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isGuidanceCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {!isGuidanceCollapsed && (
          <div className="p-4 space-y-3">
            <p className="text-xs text-slate-400">
              {currentGuidance.subheading[language]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {currentGuidance.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-md text-xs border ${
                    tip.isWarning
                      ? 'bg-amber-950/20 border-amber-800/50 text-amber-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    {tip.isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                    <span>{tip.title[language]}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{tip.detail[language]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 mb-6 no-print">
        <button
          type="button"
          onClick={() => setActiveTab('preserve')}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'preserve'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>{t.preserveTabHash}</span>
          {items.length > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-sky-900/60 text-sky-200 border border-sky-700">
              {items.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verify')}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'verify'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{t.preserveTabVerify}</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: PRESERVE & HASH EVIDENCE */}
      {/* ===================================================================== */}
      {activeTab === 'preserve' && (
        <div className="space-y-8">
          {/* File Drop & Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all no-print ${
              isDragging
                ? 'border-sky-400 bg-sky-950/40'
                : 'border-slate-700 hover:border-slate-600 bg-slate-900/60'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 shadow-inner">
                {isHashing ? (
                  <RefreshCw className="w-7 h-7 animate-spin text-sky-400" />
                ) : (
                  <UploadCloud className="w-7 h-7 text-sky-400" />
                )}
              </div>

              <div>
                <h2 className="text-base font-semibold text-white">
                  {t.preserveDropTitle}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {t.preserveDropSubtitle}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.preserveDropFormats}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={isHashing}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white text-xs font-semibold tracking-wide transition shadow cursor-pointer"
                >
                  {isHashing ? t.preserveHashingInProgress : t.preserveDropTitle}
                </button>

                <button
                  type="button"
                  disabled={isHashing}
                  onClick={handleTrySample}
                  className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold tracking-wide border border-slate-700 transition cursor-pointer"
                >
                  {t.preserveSampleBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-4 rounded-md bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start gap-3 no-print">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Copied Toast Notification */}
          {copiedHash && (
            <div className="fixed bottom-6 right-6 z-50 p-3 rounded-md bg-sky-900 border border-sky-600 text-sky-100 text-xs font-medium shadow-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-300" />
              <span>{t.preserveCopiedToast}</span>
            </div>
          )}

          {/* Preserved Items List */}
          {items.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{t.preserveItemsCount}</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
                    {items.length}
                  </span>
                </h2>
              </div>

              {/* Individual Evidence Item Cards */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-4 print-card"
                  >
                    {/* Header Row: ID, Name, Size, Actions */}
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 font-mono text-xs font-bold">
                          {item.id}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-white flex items-center gap-2">
                            <span>{item.excludeFileName ? '[REDACTED]' : item.fileName}</span>
                            <span className="text-xs text-slate-400 font-normal">
                              ({formatBytes(item.fileSizeBytes)} · {item.mimeType})
                            </span>
                          </div>
                          <label className="inline-flex items-center gap-2 mt-1 cursor-pointer no-print">
                            <input
                              type="checkbox"
                              checked={item.excludeFileName}
                              onChange={(e) => updateItemField(item.id, 'excludeFileName', e.target.checked)}
                              className="rounded bg-slate-950 border-slate-700 text-sky-600 focus:ring-0 w-3.5 h-3.5"
                            />
                            <span className="text-xs text-slate-400 hover:text-slate-300">
                              {t.preserveExcludeFileName}
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 no-print">
                        {item.previewUrl && (
                          <button
                            type="button"
                            onClick={() => updateItemField(item.id, 'isPreviewVisible', !item.isPreviewVisible)}
                            className="px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
                          >
                            {item.isPreviewVisible ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>{t.preserveHidePreview}</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>{t.preserveShowPreview}</span>
                              </>
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="px-2.5 py-1 rounded text-xs bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 flex items-center gap-1.5 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.preserveRemoveItem}</span>
                        </button>
                      </div>
                    </div>

                    {/* SHA-256 Fingerprint Display */}
                    <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-sky-400" />
                          <span>{t.preserveSha256FingerprintLabel}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyHash(item.sha256)}
                          className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition no-print"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.preserveCopyHash}</span>
                        </button>
                      </div>
                      <p className="font-mono text-xs text-sky-300 break-all select-all print-hash">
                        {item.sha256}
                      </p>
                    </div>

                    {/* Timestamps & Unreliable Warning */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
                        <span className="text-slate-400 block mb-0.5">{t.preserveHashedTimestampLabel}</span>
                        <span className="text-slate-200 font-mono">{item.hashedAtLocal}</span>
                        <span className="text-slate-500 block text-[11px] font-mono">{item.hashedAtUtc}</span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
                        <span className="text-slate-400 block mb-0.5">{t.preserveFileLastModifiedLabel}:</span>
                        <span className="text-slate-200 font-mono">{item.fileLastModified}</span>
                        <span className="text-amber-400/90 block text-[11px] mt-0.5">
                          ⚠ {t.preserveFileLastModifiedNote}
                        </span>
                      </div>
                    </div>

                    {/* Optional Inputs: Source Type, Reference, Original Date, Note */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 no-print">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          {t.preserveSourceTypeLabel}
                        </label>
                        <select
                          value={item.sourceType}
                          onChange={(e) => updateItemField(item.id, 'sourceType', e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="screenshot">{t.preserveSourceTypeScreenshot}</option>
                          <option value="chat">{t.preserveSourceTypeChat}</option>
                          <option value="web">{t.preserveSourceTypeWeb}</option>
                          <option value="other">{t.preserveSourceTypeOther}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          {t.preserveOriginalCapturedLabel}
                        </label>
                        <input
                          type="datetime-local"
                          value={item.originalCapturedAt}
                          onChange={(e) => updateItemField(item.id, 'originalCapturedAt', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          {t.preserveSourceRefLabel}
                        </label>
                        <input
                          type="text"
                          value={item.sourceReference}
                          placeholder="@handle, +91-XXXXXXXXXX, or profile URL"
                          onChange={(e) => updateItemField(item.id, 'sourceReference', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <label className="inline-flex items-center gap-2 mt-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.excludeSourceRef}
                            onChange={(e) => updateItemField(item.id, 'excludeSourceRef', e.target.checked)}
                            className="rounded bg-slate-950 border-slate-700 text-sky-600 focus:ring-0 w-3.5 h-3.5"
                          />
                          <span className="text-xs text-slate-400 hover:text-slate-300">
                            {t.preserveExcludeSourceRef}
                          </span>
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          {t.preserveNoteLabel}
                        </label>
                        <textarea
                          rows={2}
                          value={item.note}
                          placeholder="Private context or notes..."
                          onChange={(e) => updateItemField(item.id, 'note', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <label className="inline-flex items-center gap-2 mt-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.includeNote}
                            onChange={(e) => updateItemField(item.id, 'includeNote', e.target.checked)}
                            className="rounded bg-slate-950 border-slate-700 text-sky-600 focus:ring-0 w-3.5 h-3.5"
                          />
                          <span className="text-xs text-slate-400 hover:text-slate-300">
                            {t.preserveIncludeNote}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Blurred In-Memory Preview (Click to Unblur) */}
                    {item.previewUrl && item.isPreviewVisible && (
                      <div className="pt-2 no-print">
                        <p className="text-[11px] text-slate-400 mb-2">
                          {t.preservePreviewNotice}
                        </p>
                        <div
                          onClick={() => updateItemField(item.id, 'isUnblurred', !item.isUnblurred)}
                          className="relative rounded-lg overflow-hidden border border-slate-700 max-h-72 flex items-center justify-center bg-black cursor-pointer group"
                        >
                          {item.mimeType.startsWith('image/') ? (
                            <img
                              src={item.previewUrl}
                              alt="Evidence Preview"
                              className={`max-h-72 object-contain transition duration-200 ${
                                item.isUnblurred ? 'filter-none' : 'filter blur-md scale-105 opacity-60'
                              }`}
                            />
                          ) : (
                            <video
                              src={item.previewUrl}
                              controls={item.isUnblurred}
                              className={`max-h-72 object-contain transition duration-200 ${
                                item.isUnblurred ? 'filter-none' : 'filter blur-md opacity-60'
                              }`}
                            />
                          )}

                          {!item.isUnblurred && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 p-4 text-center">
                              <EyeOff className="w-6 h-6 text-slate-300 mb-2" />
                              <span className="text-xs font-semibold text-white px-3 py-1.5 rounded bg-slate-800 border border-slate-700">
                                {t.preserveClickToUnblur}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Export Panel */}
              <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 space-y-4 no-print">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Download className="w-5 h-5 text-sky-400" />
                    <span>{t.preserveExportTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {t.preserveExportDesc}
                  </p>
                </div>

                <div>
                  <label htmlFor={incidentRefInputId} className="block text-xs font-medium text-slate-300 mb-1">
                    {t.preserveIncidentRefLabel}
                  </label>
                  <input
                    id={incidentRefInputId}
                    type="text"
                    value={incidentReference}
                    placeholder={t.preserveIncidentRefPlaceholder}
                    onChange={(e) => setIncidentReference(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadManifest}
                    className="px-4 py-2.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold tracking-wide flex items-center gap-2 transition cursor-pointer shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.preserveDownloadJsonBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintPdf}
                    className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold tracking-wide border border-slate-700 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.preservePrintPdfBtn}</span>
                  </button>
                </div>
              </div>

              {/* Evidentiary Limitations & Notice Box */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-sky-400" />
                  <span>{t.preserveManifestLimitationsTitle}</span>
                </div>
                <p className="leading-relaxed">
                  {t.preserveManifestLimitationsText}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: VERIFY EVIDENCE INTEGRITY */}
      {/* ===================================================================== */}
      {activeTab === 'verify' && (
        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-sky-400" />
                <span>{t.verifyTitle}</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t.verifySubtitle}
              </p>
            </div>

            {/* Selection: Current Session vs External Manifest */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setVerifySource('current')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  verifySource === 'current'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.verifyMethodCurrent}
              </button>
              <button
                type="button"
                onClick={() => setVerifySource('import')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  verifySource === 'import'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.verifyMethodImport}
              </button>
            </div>

            {/* Sub-selector based on verifySource */}
            {verifySource === 'current' ? (
              <div>
                {items.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">
                    {t.verifyNoSessionItems}
                  </p>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {t.verifySelectCurrentItem}
                    </label>
                    <select
                      value={selectedCurrentItemId || items[0]?.id}
                      onChange={(e) => {
                        setSelectedCurrentItemId(e.target.value);
                        setCandidateHash(null);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                    >
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id}: {item.fileName} ({item.sha256.slice(0, 16)}...)
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={manifestInputRef}
                  accept=".json,application/json"
                  onChange={handleImportManifestFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => manifestInputRef.current?.click()}
                  className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>{t.verifyImportManifestBtn}</span>
                </button>

                {importedManifest && (
                  <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs text-slate-300">
                      {t.verifyLoadedManifestNotice.replace('{count}', String(importedManifest.entries.length))}
                    </div>
                    <select
                      value={selectedImportedEntryIndex}
                      onChange={(e) => {
                        setSelectedImportedEntryIndex(Number(e.target.value));
                        setCandidateHash(null);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2.5 py-1.5 focus:outline-none font-mono"
                    >
                      {importedManifest.entries.map((entry, idx) => (
                        <option key={idx} value={idx}>
                          {entry.evidenceId || `#${idx + 1}`}: {entry.fileName || 'Unnamed'} ({entry.sha256.slice(0, 16)}...)
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reference Hash Information */}
          {activeReference && (
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400">
                {t.verifyTargetRefLabel} ({activeReference.id} · {activeReference.name})
              </span>
              <p className="font-mono text-xs text-sky-300 break-all select-all bg-slate-950 p-2.5 rounded border border-slate-800">
                {activeReference.expectedHash}
              </p>
            </div>
          )}

          {/* Target File Selector */}
          {activeReference && (
            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 text-center space-y-3">
              <input
                type="file"
                ref={verifyCandidateInputRef}
                onChange={handleVerifyCandidateFile}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center">
                <FileCheck className="w-10 h-10 text-sky-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">
                  {t.verifyDropTargetFile}
                </h3>
                {candidateFile && (
                  <p className="text-xs text-slate-400 mt-1">
                    {t.verifySelectedFileLabel} <span className="text-slate-200 font-medium">{candidateFile.name}</span> ({formatBytes(candidateFile.size)})
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={isVerifying}
                onClick={() => verifyCandidateInputRef.current?.click()}
                className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white text-xs font-semibold tracking-wide transition cursor-pointer"
              >
                {isVerifying ? t.verifyCheckingIntegrity : t.verifySelectFileBtn}
              </button>
            </div>
          )}

          {/* Verification Error */}
          {verifyError && (
            <div className="p-4 rounded-md bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{verifyError}</span>
            </div>
          )}

          {/* Verification Comparison Results */}
          {activeReference && candidateHash && (
            <div className="space-y-4">
              {isMatch ? (
                <div className="p-5 rounded-lg bg-emerald-950/40 border border-emerald-600 text-emerald-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <h3 className="text-base font-bold text-emerald-300">
                      {t.verifyMatchTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-emerald-200">
                    {t.verifyMatchDesc}
                  </p>
                  <div className="p-3 rounded bg-emerald-950/80 border border-emerald-800/80 font-mono text-xs text-emerald-300 break-all select-all">
                    Fingerprint: {candidateHash}
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-lg bg-rose-950/40 border border-rose-600 text-rose-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                    <h3 className="text-base font-bold text-rose-300">
                      {t.verifyMismatchTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-rose-200">
                    {t.verifyMismatchDesc}
                  </p>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-rose-950/80 border border-rose-800/80">
                      <span className="text-rose-400 block mb-0.5">{t.verifyExpectedLabel}</span>
                      <span className="text-rose-200 break-all select-all">{activeReference.expectedHash}</span>
                    </div>
                    <div className="p-2.5 rounded bg-rose-950/80 border border-rose-800/80">
                      <span className="text-rose-400 block mb-0.5">{t.verifyComputedLabel}</span>
                      <span className="text-rose-200 break-all select-all">{candidateHash}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Link to Privacy & Cryptographic Principles */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  className="text-xs text-sky-400 hover:text-sky-300 inline-flex items-center gap-1.5 transition underline cursor-pointer"
                >
                  <span>{t.verifyPrivacyLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
