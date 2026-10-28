/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Phase 4: Mode 03 — REPORT
 * Deterministic In-Browser Bilingual Complaint Drafter
 * 
 * PRIVACY GUARANTEES:
 * 1. ZERO network requests, ZERO telemetry, ZERO cloud uploads.
 * 2. 100% in-browser deterministic template assembly and regex entity redaction.
 * 3. Never submits anything or implies automated submission.
 * 4. In-memory state only (no localStorage, sessionStorage, indexedDB, or cookies).
 */

import React, { useState, useEffect, useId, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useEvidence, ExternalManifest } from '../state/EvidenceContext';
import { LEGAL_PROVISIONS } from '../data/legalReferences';
import {
  generateComplaintDraft,
  countUnresolvedPlaceholders,
  TimelineRow,
  ComplaintEvidenceRow,
  ComplaintFormData,
} from '../data/complaintTemplates';
import { CATEGORIES } from '../data/playbooks';
import {
  findRedactionTargets,
  applyRedactions,
  RedactionItem,
} from '../lib/redact';
import {
  FileText,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  AlertTriangle,
  Check,
  Copy,
  Download,
  Printer,
  ExternalLink,
  HelpCircle,
  Eye,
  EyeOff,
  Scale,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

interface ReportPageProps {
  onNavigate: (path: string) => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { items: sessionEvidenceItems, incidentCategory } = useEvidence();

  // Wizard Step (1 to 6)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Step 1: Document Type & Language
  const [documentType, setDocumentType] = useState<'police' | 'takedown'>('police');
  const [draftLanguage, setDraftLanguage] = useState<'en' | 'hi'>(language === 'hi' ? 'hi' : 'en');

  // Step 2: Complainant Details (optional)
  const [complainantName, setComplainantName] = useState('');
  const [complainantContact, setComplainantContact] = useState('');
  const [complainantLocation, setComplainantLocation] = useState('');

  // Step 3: Incident Details
  const [categoryKey, setCategoryKey] = useState<string>('blackmail');
  const [approxDateTime, setApproxDateTime] = useState('');
  const [platformName, setPlatformName] = useState('');
  const [suspectIdentifiers, setSuspectIdentifiers] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [intimateContentStatus, setIntimateContentStatus] = useState<'yes' | 'no' | 'not_sure'>('not_sure');
  const [moneyDemandedStatus, setMoneyDemandedStatus] = useState<'yes' | 'no'>('no');
  const [moneyAmount, setMoneyAmount] = useState('');

  // Step 4: Timeline
  const [timelineRows, setTimelineRows] = useState<TimelineRow[]>([]);
  const [newTimelineDate, setNewTimelineDate] = useState('');
  const [newTimelineDesc, setNewTimelineDesc] = useState('');

  // Step 5: Evidence Selection
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<Set<string>>(new Set());
  const [importedEvidenceRows, setImportedEvidenceRows] = useState<ComplaintEvidenceRow[]>([]);
  const manifestInputRef = useRef<HTMLInputElement>(null);

  // Step 6: Review, Edit & Redaction
  const [draftText, setDraftText] = useState('');
  const [isCustomEdited, setIsCustomEdited] = useState(false);
  const [showRegenerateWarning, setShowRegenerateWarning] = useState(false);

  // Legal Provisions
  const [includeProvisions, setIncludeProvisions] = useState(false);
  const [selectedProvisionIds, setSelectedProvisionIds] = useState<string[]>(['it_66e', 'bns_78']);

  // Redaction
  const [activeOutputVersion, setActiveOutputVersion] = useState<'full' | 'redacted'>('full');
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [newCustomWord, setNewCustomWord] = useState('');
  const [redactionItems, setRedactionItems] = useState<RedactionItem[]>([]);
  const [selectedRedactionIds, setSelectedRedactionIds] = useState<Set<string>>(new Set());

  // Export Confirmation Modal
  const [showPlaceholderModal, setShowPlaceholderModal] = useState(false);
  const [pendingExportAction, setPendingExportAction] = useState<'copy' | 'txt' | 'pdf' | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // IDs for accessibility
  const complainantNameId = useId();
  const complainantContactId = useId();
  const complainantLocationId = useId();
  const categorySelectId = useId();
  const dateTimeInputId = useId();
  const platformInputId = useId();
  const suspectInputId = useId();
  const descriptionTextareaId = useId();
  const moneyAmountId = useId();
  const timelineDateInputId = useId();
  const timelineDescInputId = useId();
  const draftTextareaId = useId();
  const customWordInputId = useId();

  // Initialize category from URL query or EvidenceContext
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setCategoryKey(cat);
    } else if (incidentCategory) {
      setCategoryKey(incidentCategory);
    }
  }, [location.search, incidentCategory]);

  // Pre-select all current session evidence by default
  useEffect(() => {
    if (sessionEvidenceItems.length > 0) {
      setSelectedEvidenceIds(new Set(sessionEvidenceItems.map((item) => item.id)));
    }
  }, [sessionEvidenceItems]);

  // Consolidate evidence list
  const allAvailableEvidence: ComplaintEvidenceRow[] = [
    ...sessionEvidenceItems.map((item) => ({
      evidenceId: item.id,
      fileName: item.excludeFileName ? '[REDACTED]' : item.fileName,
      sha256: item.sha256,
      hashedAt: item.hashedAtLocal,
    })),
    ...importedEvidenceRows,
  ];

  // Compile form data structure
  const buildCurrentFormData = (): ComplaintFormData => {
    const activeEvidence = allAvailableEvidence.filter((ev) =>
      selectedEvidenceIds.has(ev.evidenceId)
    );

    return {
      documentType,
      language: draftLanguage,
      complainantName,
      complainantContact,
      complainantLocation,
      categoryKey,
      approxDateTime,
      platformName,
      suspectIdentifiers,
      incidentDescription,
      intimateContentStatus,
      moneyDemandedStatus,
      moneyAmount,
      timeline: timelineRows,
      evidenceItems: activeEvidence,
      includeProvisions,
      selectedProvisionIds,
    };
  };

  // Generate or regenerate draft
  const doGenerateDraft = (force = false) => {
    if (isCustomEdited && !force) {
      setShowRegenerateWarning(true);
      return;
    }
    const freshDraft = generateComplaintDraft(buildCurrentFormData());
    setDraftText(freshDraft);
    setIsCustomEdited(false);
    setShowRegenerateWarning(false);
  };

  // Re-generate draft when entering step 6 initially
  useEffect(() => {
    if (currentStep === 6 && !isCustomEdited && !draftText) {
      const generated = generateComplaintDraft(buildCurrentFormData());
      setDraftText(generated);
    }
  }, [currentStep]);

  // When draftText, contact details, or custom words change, re-run redaction scanner
  useEffect(() => {
    if (draftText) {
      const targets = findRedactionTargets(draftText, {
        userPhone: complainantContact,
        userEmail: complainantContact,
        customWords,
      });
      setRedactionItems(targets);
      // Initialize selected redaction IDs with recommended defaults
      setSelectedRedactionIds(new Set(targets.filter((t) => t.defaultRedact).map((t) => t.id)));
    }
  }, [draftText, complainantContact, customWords]);

  // Placeholder counter
  const placeholderInfo = countUnresolvedPlaceholders(draftText);

  // Timeline handlers
  const handleAddTimelineRow = () => {
    if (!newTimelineDate.trim() && !newTimelineDesc.trim()) return;
    const newRow: TimelineRow = {
      id: `tl-${Date.now()}`,
      dateTime: newTimelineDate.trim(),
      description: newTimelineDesc.trim(),
    };
    setTimelineRows((prev) => [...prev, newRow]);
    setNewTimelineDate('');
    setNewTimelineDesc('');
  };

  const handleRemoveTimelineRow = (id: string) => {
    setTimelineRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Evidence manifest import handler
  const handleImportManifest = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed: ExternalManifest = JSON.parse(event.target?.result as string);
          if (parsed && Array.isArray(parsed.entries)) {
            const imported: ComplaintEvidenceRow[] = parsed.entries.map((ent, idx) => ({
              evidenceId: ent.evidenceId || `IMP-${idx + 1}`,
              fileName: ent.fileName || '[File Name Withheld]',
              sha256: ent.sha256,
              hashedAt: ent.hashedAtUtc || 'Imported Manifest',
            }));
            setImportedEvidenceRows((prev) => [...prev, ...imported]);
            setSelectedEvidenceIds((prev) => {
              const next = new Set(prev);
              imported.forEach((it) => next.add(it.evidenceId));
              return next;
            });
          }
        } catch {
          // ignore invalid
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    }
  };

  // Redaction custom word handler
  const handleAddCustomWord = () => {
    if (newCustomWord.trim().length >= 2 && !customWords.includes(newCustomWord.trim())) {
      setCustomWords((prev) => [...prev, newCustomWord.trim()]);
      setNewCustomWord('');
    }
  };

  const handleRemoveCustomWord = (word: string) => {
    setCustomWords((prev) => prev.filter((w) => w !== word));
  };

  // Computed draft based on active tab
  const activeDisplayedText =
    activeOutputVersion === 'redacted'
      ? applyRedactions(draftText, selectedRedactionIds, redactionItems)
      : draftText;

  // Export handlers with placeholder check
  const triggerExport = (action: 'copy' | 'txt' | 'pdf') => {
    if (placeholderInfo.count > 0) {
      setPendingExportAction(action);
      setShowPlaceholderModal(true);
      return;
    }
    executeExport(action);
  };

  const executeExport = (action: 'copy' | 'txt' | 'pdf') => {
    setShowPlaceholderModal(false);
    const content = activeDisplayedText;
    const isRedacted = activeOutputVersion === 'redacted';
    const filenamePrefix = isRedacted ? 'kavach-complaint-redacted' : 'kavach-complaint-official';

    if (action === 'copy') {
      navigator.clipboard.writeText(content).then(() => {
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 3000);
      });
    } else if (action === 'txt') {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filenamePrefix}-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (action === 'pdf') {
      window.print();
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Print View Stylesheet Integration */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print, header, footer, button, nav { display: none !important; }
          .print-only { display: block !important; }
          .print-document { white-space: pre-wrap !important; font-family: monospace !important; font-size: 11pt !important; line-height: 1.5 !important; color: black !important; background: white !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>

      {/* Screen Only Print Content Container */}
      <div className="print-only print-document p-8">
        {activeDisplayedText}
      </div>

      {/* Header Badge & Title */}
      <div className="mb-6 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-medium tracking-wide mb-3">
          <FileText className="w-4 h-4 text-sky-400" />
          <span>{t.reportHeaderBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          {t.reportTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {t.reportSubtitle}
        </p>
      </div>

      {/* Site-wide General Legal Notice Banner */}
      <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs sm:text-sm text-amber-200 flex items-start gap-3 no-print">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="leading-relaxed">
          <strong className="text-amber-100 font-semibold">{t.trackUnverifiedLegalBadge}:</strong> {t.generalLegalNotice}
        </div>
      </div>

      {/* Step Progress Navigation Bar */}
      <div className="mb-8 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 py-1.5 px-3 rounded bg-slate-800 border border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToHome}</span>
          </button>
          <span className="text-xs font-mono font-bold text-sky-400">
            {t.progressText}: {currentStep}/6
          </span>
        </div>

        {/* Step Numbers Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setCurrentStep(num as any)}
              className={`w-7 h-7 rounded text-xs font-mono font-bold transition flex items-center justify-center ${
                currentStep === num
                  ? 'bg-sky-600 text-white'
                  : currentStep > num
                  ? 'bg-slate-800 text-sky-400 border border-slate-700'
                  : 'bg-slate-950 text-slate-500 border border-slate-800'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* STEP 1: CHOOSE DOCUMENT & LANGUAGE */}
      {/* ===================================================================== */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6 no-print">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
              {t.reportStep1Badge}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              {t.reportStep1Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.reportStep1Desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDocumentType('police')}
              className={`p-5 rounded-lg border text-left transition cursor-pointer ${
                documentType === 'police'
                  ? 'border-sky-500 bg-sky-950/40'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{t.reportDocTypePolice}</span>
                {documentType === 'police' && <Check className="w-4 h-4 text-sky-400" />}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.reportDocTypePoliceDesc}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setDocumentType('takedown')}
              className={`p-5 rounded-lg border text-left transition cursor-pointer ${
                documentType === 'takedown'
                  ? 'border-sky-500 bg-sky-950/40'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{t.reportDocTypeTakedown}</span>
                {documentType === 'takedown' && <Check className="w-4 h-4 text-sky-400" />}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.reportDocTypeTakedownDesc}
              </p>
            </button>
          </div>

          {/* Language Selector */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-300 mb-2">
              {t.reportDocLangLabel}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDraftLanguage('en')}
                className={`px-4 py-2 rounded-md text-xs font-semibold border transition ${
                  draftLanguage === 'en'
                    ? 'border-sky-500 bg-sky-600 text-white'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.reportDocLangEn}
              </button>
              <button
                type="button"
                onClick={() => setDraftLanguage('hi')}
                className={`px-4 py-2 rounded-md text-xs font-semibold border transition ${
                  draftLanguage === 'hi'
                    ? 'border-sky-500 bg-sky-600 text-white'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.reportDocLangHi}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition flex items-center gap-2"
            >
              <span>{t.stepNext}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 2: ABOUT COMPLAINANT */}
      {/* ===================================================================== */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6 no-print">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
              {t.reportStep2Badge}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              {t.reportStep2Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.reportStep2Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-sky-950/30 border border-sky-800/60 text-sky-200 text-xs flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>{t.reportComplainantNotice}</span>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor={complainantNameId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportNameLabel}
              </label>
              <input
                id={complainantNameId}
                type="text"
                value={complainantName}
                placeholder={t.reportNamePlaceholder}
                onChange={(e) => setComplainantName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor={complainantContactId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportContactLabel}
              </label>
              <input
                id={complainantContactId}
                type="text"
                value={complainantContact}
                placeholder={t.reportContactPlaceholder}
                onChange={(e) => setComplainantContact(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor={complainantLocationId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportLocationLabel}
              </label>
              <input
                id={complainantLocationId}
                type="text"
                value={complainantLocation}
                placeholder={t.reportLocationPlaceholder}
                onChange={(e) => setComplainantLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.stepBack}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition flex items-center gap-2"
            >
              <span>{t.stepNext}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 3: INCIDENT DETAILS */}
      {/* ===================================================================== */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6 no-print">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
              {t.reportStep3Badge}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              {t.reportStep3Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.reportStep3Desc}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor={categorySelectId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportCategoryLabel}
              </label>
              <select
                id={categorySelectId}
                value={categoryKey}
                onChange={(e) => setCategoryKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.title[language]}
                  </option>
                ))}
                <option value="not_sure">{t.reportCategoryNotSure}</option>
              </select>
            </div>

            <div>
              <label htmlFor={dateTimeInputId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportDateTimeLabel}
              </label>
              <input
                id={dateTimeInputId}
                type="text"
                value={approxDateTime}
                placeholder={t.reportDateTimePlaceholder}
                onChange={(e) => setApproxDateTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">{t.reportDateTimeHelper}</p>
            </div>

            <div>
              <label htmlFor={platformInputId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportPlatformLabel}
              </label>
              <input
                id={platformInputId}
                type="text"
                value={platformName}
                placeholder={t.reportPlatformPlaceholder}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor={suspectInputId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportSuspectLabel}
              </label>
              <input
                id={suspectInputId}
                type="text"
                value={suspectIdentifiers}
                placeholder={t.reportSuspectPlaceholder}
                onChange={(e) => setSuspectIdentifiers(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label htmlFor={descriptionTextareaId} className="block text-xs font-medium text-slate-300 mb-1">
                {t.reportDescriptionLabel}
              </label>
              <p className="text-[11px] text-sky-400 mb-1.5">{t.reportDescriptionGuidance}</p>
              <textarea
                id={descriptionTextareaId}
                rows={4}
                value={incidentDescription}
                placeholder={t.reportDescriptionPlaceholder}
                onChange={(e) => setIncidentDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.reportIntimateLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: 'yes', label: t.reportIntimateYes },
                  { val: 'no', label: t.reportIntimateNo },
                  { val: 'not_sure', label: t.reportIntimateNotSure },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setIntimateContentStatus(opt.val as any)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                      intimateContentStatus === opt.val
                        ? 'border-sky-500 bg-sky-600 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.reportMoneyLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { val: 'no', label: t.reportMoneyNo },
                  { val: 'yes', label: t.reportMoneyYes },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setMoneyDemandedStatus(opt.val as any)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                      moneyDemandedStatus === opt.val
                        ? 'border-sky-500 bg-sky-600 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {moneyDemandedStatus === 'yes' && (
                <div className="mt-2.5">
                  <label htmlFor={moneyAmountId} className="block text-xs font-medium text-slate-300 mb-1">
                    {t.reportMoneyAmountLabel}
                  </label>
                  <input
                    id={moneyAmountId}
                    type="text"
                    value={moneyAmount}
                    placeholder={t.reportMoneyAmountPlaceholder}
                    onChange={(e) => setMoneyAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.stepBack}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition flex items-center gap-2"
            >
              <span>{t.stepNext}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 4: TIMELINE */}
      {/* ===================================================================== */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6 no-print">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
              {t.reportStep4Badge}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              {t.reportStep4Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.reportStep4Desc}
            </p>
          </div>

          {/* Add Timeline Event Box */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor={timelineDateInputId} className="block text-xs font-medium text-slate-300 mb-1">
                  {t.reportTimelineDateHeader}
                </label>
                <input
                  id={timelineDateInputId}
                  type="text"
                  value={newTimelineDate}
                  placeholder="e.g. 24 Oct, 8:30 PM"
                  onChange={(e) => setNewTimelineDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={timelineDescInputId} className="block text-xs font-medium text-slate-300 mb-1">
                  {t.reportTimelineEventHeader}
                </label>
                <input
                  id={timelineDescInputId}
                  type="text"
                  value={newTimelineDesc}
                  placeholder="e.g. Received unsolicited message demanding payment"
                  onChange={(e) => setNewTimelineDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddTimelineRow}
                className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.reportAddTimelineRowBtn}</span>
              </button>
            </div>
          </div>

          {/* Timeline Rows List */}
          {timelineRows.length > 0 ? (
            <div className="space-y-2">
              {timelineRows.map((row, idx) => (
                <div
                  key={row.id}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 font-bold">#{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-sky-300">
                      {row.dateTime || 'Date/Time'}
                    </span>
                    <span className="text-slate-200">{row.description}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimelineRow(row.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 rounded"
                    title={t.reportTimelineRemoveRow}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded border border-slate-800/60">
              {t.reportTimelineEmptyNotice}
            </p>
          )}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.stepBack}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition flex items-center gap-2"
            >
              <span>{t.stepNext}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 5: EVIDENCE SELECTION */}
      {/* ===================================================================== */}
      {currentStep === 5 && (
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6 no-print">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
              {t.reportStep5Badge}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              {t.reportStep5Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.reportStep5Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>{t.reportEvidenceAdvisoryNote}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                {t.reportEvidenceSelectSession}
              </span>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={manifestInputRef}
                  accept=".json,application/json"
                  onChange={handleImportManifest}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => manifestInputRef.current?.click()}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.reportEvidenceImportManifestBtn}</span>
                </button>
              </div>
            </div>

            {allAvailableEvidence.length > 0 ? (
              <div className="space-y-2.5">
                {allAvailableEvidence.map((ev) => {
                  const isChecked = selectedEvidenceIds.has(ev.evidenceId);
                  return (
                    <label
                      key={ev.evidenceId}
                      className={`p-3.5 rounded-lg border flex items-start gap-3 cursor-pointer transition ${
                        isChecked
                          ? 'bg-slate-950 border-sky-600'
                          : 'bg-slate-950/40 border-slate-800 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const next = new Set(selectedEvidenceIds);
                          if (e.target.checked) next.add(ev.evidenceId);
                          else next.delete(ev.evidenceId);
                          setSelectedEvidenceIds(next);
                        }}
                        className="mt-1 rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-0 w-4 h-4"
                      />
                      <div className="space-y-1 text-xs">
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-mono text-[11px]">
                            {ev.evidenceId}
                          </span>
                          <span>{ev.fileName}</span>
                        </div>
                        <p className="font-mono text-[11px] text-sky-300/80 break-all">
                          SHA-256: {ev.sha256}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-950/40 rounded border border-slate-800/60">
                {t.reportEvidenceNoSessionItems}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.stepBack}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                doGenerateDraft(true);
                setCurrentStep(6);
              }}
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition flex items-center gap-2"
            >
              <span>{t.stepNext}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 6: REVIEW, EDIT, REDACT & EXPORT */}
      {/* ===================================================================== */}
      {currentStep === 6 && (
        <div className="space-y-6">
          {/* Top Review Box */}
          <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-6 no-print">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
                  {t.reportStep6Badge}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {t.reportStep6Title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  {t.reportStep6Desc}
                </p>
              </div>

              {/* Placeholder Counter Badge */}
              <div>
                {placeholderInfo.count > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-700 text-amber-300 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{t.reportPlaceholderCountBadge.replace('{count}', String(placeholderInfo.count))}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.reportNoPlaceholdersLeft}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Overwrite Confirmation Dialog */}
            {showRegenerateWarning && (
              <div className="p-4 rounded-lg bg-amber-950/60 border border-amber-700 text-amber-200 text-xs space-y-3">
                <div className="font-bold flex items-center gap-2 text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{t.reportRegenerateWarningTitle}</span>
                </div>
                <p>{t.reportRegenerateWarningDesc}</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => doGenerateDraft(true)}
                    className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold"
                  >
                    {t.reportRegenerateConfirmBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegenerateWarning(false)}
                    className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                  >
                    {t.reportRegenerateCancelBtn}
                  </button>
                </div>
              </div>
            )}

            {/* Editable Text Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={draftTextareaId} className="text-xs font-semibold text-slate-300">
                  Complaint Text Draft ({draftLanguage.toUpperCase()}):
                </label>

                <button
                  type="button"
                  onClick={() => doGenerateDraft(false)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.reportResetDraftBtn}</span>
                </button>
              </div>

              <textarea
                id={draftTextareaId}
                rows={16}
                value={draftText}
                onChange={(e) => {
                  setDraftText(e.target.value);
                  setIsCustomEdited(true);
                }}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs sm:text-sm p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 leading-relaxed"
              />
            </div>

            {/* Suggested Legal Provisions Panel (Part D) */}
            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Scale className="w-4 h-4 text-sky-400" />
                  <span>{t.reportProvisionsPanelTitle}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {t.reportProvisionsPanelDesc}
                </p>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeProvisions}
                  onChange={(e) => {
                    const nextVal = e.target.checked;
                    setIncludeProvisions(nextVal);
                    // Update draft text with new setting
                    const updatedData = { ...buildCurrentFormData(), includeProvisions: nextVal };
                    setDraftText(generateComplaintDraft(updatedData));
                  }}
                  className="rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-0 w-4 h-4"
                />
                <span className="text-xs font-semibold text-sky-300">
                  {t.reportProvisionsCheckboxLabel}
                </span>
              </label>

              {includeProvisions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {LEGAL_PROVISIONS.map((prov) => {
                    const isSelected = selectedProvisionIds.includes(prov.id);
                    return (
                      <label
                        key={prov.id}
                        className={`p-3 rounded border text-xs cursor-pointer transition ${
                          isSelected
                            ? 'bg-sky-950/40 border-sky-700 text-sky-100'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const nextSet = e.target.checked
                                ? [...selectedProvisionIds, prov.id]
                                : selectedProvisionIds.filter((id) => id !== prov.id);
                              setSelectedProvisionIds(nextSet);
                              const updatedData = {
                                ...buildCurrentFormData(),
                                selectedProvisionIds: nextSet,
                              };
                              setDraftText(generateComplaintDraft(updatedData));
                            }}
                            className="mt-0.5 rounded bg-slate-950 border-slate-700 text-sky-600 focus:ring-0 w-3.5 h-3.5"
                          />
                          <div>
                            <span className="font-mono font-bold block text-white">
                              {prov.section} — {prov.title[draftLanguage]}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {prov.description[draftLanguage]}
                            </span>
                            <span className="text-[10px] text-amber-400/90 block mt-1 font-mono">
                              ⚠ {t.reportProvisionsUnverifiedBadge}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Redaction Controls & Two Output Versions (Part E) */}
            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-sky-400" />
                  <span>{t.reportRedactionPanelTitle}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {t.reportRedactionPanelDesc}
                </p>
              </div>

              {/* Version Selector Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveOutputVersion('full')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    activeOutputVersion === 'full'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.reportVersionFullTab}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputVersion('redacted')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    activeOutputVersion === 'redacted'
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.reportVersionRedactedTab}
                </button>
              </div>

              <p className="text-xs text-slate-400">
                {activeOutputVersion === 'full'
                  ? t.reportVersionFullDesc
                  : t.reportVersionRedactedDesc}
              </p>

              {/* Custom Word Input */}
              <div className="pt-2">
                <label htmlFor={customWordInputId} className="block text-xs font-medium text-slate-300 mb-1">
                  {t.reportRedactionCustomWordLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    id={customWordInputId}
                    type="text"
                    value={newCustomWord}
                    placeholder={t.reportRedactionCustomWordPlaceholder}
                    onChange={(e) => setNewCustomWord(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomWord}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
                  >
                    {t.reportRedactionAddWordBtn}
                  </button>
                </div>

                {customWords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {customWords.map((word) => (
                      <span
                        key={word}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs text-slate-200"
                      >
                        <span>{word}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomWord(word)}
                          className="hover:text-rose-400 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Redaction Detected Entities Checklist */}
              {redactionItems.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Detected Identifiers (Check to conceal as [REDACTED] in Redacted Copy):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {redactionItems.map((item) => {
                      const isSelected = selectedRedactionIds.has(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`p-2.5 rounded border text-xs flex items-center justify-between gap-2 cursor-pointer transition ${
                            isSelected
                              ? 'bg-rose-950/30 border-rose-800 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                const next = new Set(selectedRedactionIds);
                                if (e.target.checked) next.add(item.id);
                                else next.delete(item.id);
                                setSelectedRedactionIds(next);
                              }}
                              className="rounded bg-slate-950 border-slate-700 text-rose-600 focus:ring-0 w-3.5 h-3.5 flex-shrink-0"
                            />
                            <span className="truncate font-mono">{item.text}</span>
                          </div>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 flex-shrink-0">
                            {item.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-3 rounded bg-amber-950/20 border border-amber-800/40 text-amber-300/90 text-xs leading-relaxed">
                ⚠ {t.reportRedactionWarningNotice}
              </div>
            </div>

            {/* Export Action Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => triggerExport('copy')}
                className="px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs tracking-wide transition flex items-center gap-2 cursor-pointer shadow"
              >
                <Copy className="w-4 h-4" />
                <span>{t.reportExportCopyBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => triggerExport('txt')}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.reportExportTxtBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => triggerExport('pdf')}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t.reportExportPdfBtn}</span>
              </button>
            </div>

            {/* Step 6 Back Button */}
            <div className="pt-4 border-t border-slate-800 flex justify-start">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.stepBack}</span>
              </button>
            </div>
          </div>

          {/* Where to Submit Panel (Part C) */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3 no-print">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <span>{t.reportWhereToSubmitTitle}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.reportWhereToSubmitDesc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1.5"
              >
                <span>{t.reportWhereToSubmitPortalLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('/help')}
                className="text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.reportWhereToSubmitZeroFirLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/track')}
                className="text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <span>{t.reportProceedToTrackBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
              {t.reportWhereToSubmitDisclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Copied Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-3 rounded-md bg-sky-900 border border-sky-600 text-sky-100 text-xs font-medium shadow-xl flex items-center gap-2 no-print">
          <Check className="w-4 h-4 text-sky-300" />
          <span>{t.reportCopiedToast}</span>
        </div>
      )}

      {/* Unresolved Placeholders Modal */}
      {showPlaceholderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{t.reportPlaceholderModalTitle}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.reportPlaceholderModalDesc.replace(
                '{placeholders}',
                placeholderInfo.placeholders.slice(0, 3).join(', ') +
                  (placeholderInfo.placeholders.length > 3 ? '...' : '')
              )}
            </p>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 max-h-36 overflow-y-auto space-y-1 font-mono text-[11px] text-amber-300">
              {placeholderInfo.placeholders.map((ph, idx) => (
                <div key={idx}>• {ph}</div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPlaceholderModal(false)}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                {t.reportPlaceholderModalReviewBtn}
              </button>

              <button
                type="button"
                onClick={() => pendingExportAction && executeExport(pendingExportAction)}
                className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
              >
                {t.reportPlaceholderModalProceedBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
