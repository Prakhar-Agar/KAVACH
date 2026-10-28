/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Phase 5: Mode 04 — TRACK
 * In-Memory Complaint Tracking Ledger & Statutory Countdown Timers
 * 
 * PRIVACY GUARANTEES:
 * 1. ZERO network calls, ZERO analytics, ZERO telemetry.
 * 2. 100% in-browser tab memory. No localStorage, sessionStorage, indexedDB, or cookies.
 * 3. Enforces beforeunload warning when unexported records exist.
 * 4. User-owned persistence via portable structured JSON export/import.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTracking } from '../state/TrackingContext';
import {
  TrackingRecord,
  TrackingSubmissionType,
  TrackingStatus,
  StatutoryTimer,
  StatutoryTimerType,
  STATUTORY_TIMER_PRESETS,
  ESCALATION_PATHS,
  EscalationPath,
} from '../data/trackingData';
import { CATEGORIES } from '../data/playbooks';
import {
  Clock,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  Download,
  Upload,
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  FileText,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  PhoneCall,
  CheckCircle2,
  Layers,
  Sparkles,
  Calendar,
  Share2,
  Scale,
} from 'lucide-react';

interface TrackPageProps {
  onNavigate: (path: string) => void;
}

export const TrackPage: React.FC<TrackPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const {
    records,
    timers,
    addRecord,
    updateRecord,
    removeRecord,
    addNoteToRecord,
    addTimer,
    updateTimer,
    removeTimer,
    loadSampleData,
    clearAll,
    exportJson,
    exportTextSummary,
    importJson,
  } = useTracking();

  // Filter & Search State
  const [activeTab, setActiveTab] = useState<'all' | 'submitted' | 'under_investigation' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TrackingRecord | null>(null);
  const [showAddTimerModal, setShowAddTimerModal] = useState(false);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedEscalationPath, setSelectedEscalationPath] = useState<EscalationPath | null>(null);
  const [expandedEscalationId, setExpandedEscalationId] = useState<string | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Form State for Add / Edit Record
  const [recordAuthority, setRecordAuthority] = useState<TrackingSubmissionType>('ncrp');
  const [recordTitle, setRecordTitle] = useState('');
  const [recordRefNumber, setRecordRefNumber] = useState('');
  const [recordSubmittedAt, setRecordSubmittedAt] = useState('');
  const [recordStatus, setRecordStatus] = useState<TrackingStatus>('submitted');
  const [recordOfficerName, setRecordOfficerName] = useState('');
  const [recordOfficerContact, setRecordOfficerContact] = useState('');
  const [recordCategoryKey, setRecordCategoryKey] = useState('blackmail');
  const [recordInitialNotes, setRecordInitialNotes] = useState('');

  // Form State for Add Timer
  const [timerPresetType, setTimerPresetType] = useState<StatutoryTimerType>('24h_ncii');
  const [timerLinkedRecordId, setTimerLinkedRecordId] = useState<string>('');
  const [customTimerHours, setCustomTimerHours] = useState('48');
  const [customTimerTitle, setCustomTimerTitle] = useState('');

  // Inline Note State per Record
  const [newNoteTexts, setNewNoteTexts] = useState<Record<string, string>>({});
  const [expandedNoteInputs, setExpandedNoteInputs] = useState<Record<string, boolean>>({});

  // File Input for Import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live timer tick every second for smooth UI
  const [currentTimeMs, setCurrentTimeMs] = useState(Date.now());
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCurrentTimeMs(Date.now());
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Set default current date/time on modal open
  useEffect(() => {
    if (showAddRecordModal && !editingRecord) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setRecordSubmittedAt(now.toISOString().slice(0, 16));
      setRecordTitle(t.trackAuthNcrp);
      setRecordRefNumber('');
      setRecordOfficerName('');
      setRecordOfficerContact('');
      setRecordInitialNotes('');
      setRecordStatus('submitted');
      setRecordAuthority('ncrp');
    }
  }, [showAddRecordModal, editingRecord, t.trackAuthNcrp]);

  const handleOpenEditRecord = (record: TrackingRecord) => {
    setEditingRecord(record);
    setRecordAuthority(record.submissionType);
    setRecordTitle(record.title);
    setRecordRefNumber(record.referenceNumber);
    setRecordSubmittedAt(record.submittedAt.slice(0, 16));
    setRecordStatus(record.status);
    setRecordOfficerName(record.officerName);
    setRecordOfficerContact(record.officerContact);
    setRecordCategoryKey(record.categoryKey);
    setRecordInitialNotes('');
    setShowAddRecordModal(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      updateRecord(editingRecord.id, {
        submissionType: recordAuthority,
        title: recordTitle.trim() || t.trackAuthOther,
        referenceNumber: recordRefNumber.trim(),
        submittedAt: recordSubmittedAt,
        status: recordStatus,
        officerName: recordOfficerName.trim(),
        officerContact: recordOfficerContact.trim(),
        categoryKey: recordCategoryKey,
      });
      showToast(isHi ? 'रिकॉर्ड सफलतापूर्वक अपडेट किया गया!' : 'Record updated successfully!');
    } else {
      addRecord({
        submissionType: recordAuthority,
        title: recordTitle.trim() || t.trackAuthOther,
        referenceNumber: recordRefNumber.trim(),
        submittedAt: recordSubmittedAt,
        status: recordStatus,
        officerName: recordOfficerName.trim(),
        officerContact: recordOfficerContact.trim(),
        categoryKey: recordCategoryKey,
        followUpDeadline: '',
        notes: recordInitialNotes.trim(),
      });
      showToast(isHi ? 'नया शिकायत रिकॉर्ड सहेजा गया!' : 'Complaint record logged in memory!');
    }
    setShowAddRecordModal(false);
    setEditingRecord(null);
  };

  const handleStartTimer = (e: React.FormEvent) => {
    e.preventDefault();
    const hours = timerPresetType === 'custom' ? parseInt(customTimerHours, 10) || 24 : undefined;
    const customTitle =
      timerPresetType === 'custom' && customTimerTitle.trim()
        ? { en: customTimerTitle.trim(), hi: customTimerTitle.trim() }
        : undefined;

    addTimer({
      timerType: timerPresetType,
      recordId: timerLinkedRecordId || undefined,
      customHours: hours,
      customTitle,
    });

    showToast(isHi ? 'नया कानूनी टाइमर शुरू किया गया!' : 'Statutory timer started!');
    setShowAddTimerModal(false);
  };

  const handleCopyText = (text: string, successMessage: string) => {
    try {
      navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch {
      // fallback
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;
      const res = importJson(content);
      if (res.success) {
        showToast(t.trackImportSuccessToast);
      } else {
        showToast(res.error || t.trackImportErrorToast);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadJson = () => {
    const jsonStr = exportJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kavach-tracking-ledger-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
    showToast(isHi ? 'JSON फ़ाइल डाउनलोड हो गई!' : 'JSON ledger downloaded!');
  };

  const handleDownloadTxt = () => {
    const txtStr = exportTextSummary(language);
    const blob = new Blob([txtStr], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kavach-tracking-summary-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
    showToast(isHi ? 'टेक्स्ट सारांश डाउनलोड हो गया!' : 'Text summary downloaded!');
  };

  const handlePrint = () => {
    setShowExportModal(false);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Helper to calculate formatted countdown string
  const formatTimerCountdown = (expiresAtIso: string, status: string) => {
    if (status === 'completed') {
      return { text: t.trackTimerCompletedBadge, isExpired: false, isWarning: false };
    }

    const expiresMs = new Date(expiresAtIso).getTime();
    const diffMs = expiresMs - currentTimeMs;

    if (diffMs <= 0) {
      const overdueMs = Math.abs(diffMs);
      const overdueHours = Math.floor(overdueMs / (1000 * 60 * 60));
      const overdueMinutes = Math.floor((overdueMs % (1000 * 60 * 60)) / (1000 * 60));
      return {
        text: `${t.trackTimerOverdueBy} ${overdueHours}${t.trackTimerHours} ${overdueMinutes}${t.trackTimerMinutes}`,
        isExpired: true,
        isWarning: false,
      };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
      text: `${hours}${t.trackTimerHours} ${minutes}${t.trackTimerMinutes} ${seconds}${t.trackTimerSeconds}`,
      isExpired: false,
      isWarning: diffMs <= 4 * 60 * 60 * 1000,
    };
  };

  // Filter records
  const filteredRecords = records.filter((rec) => {
    if (activeTab === 'submitted' && rec.status !== 'submitted' && rec.status !== 'acknowledged') {
      return false;
    }
    if (activeTab === 'under_investigation' && rec.status !== 'under_investigation' && rec.status !== 'escalated') {
      return false;
    }
    if (activeTab === 'closed' && rec.status !== 'closed' && rec.status !== 'content_removed') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rec.title.toLowerCase().includes(q);
      const matchRef = rec.referenceNumber.toLowerCase().includes(q);
      const matchNotes = rec.notes.some((n) => n.text.toLowerCase().includes(q));
      const matchOfficer = rec.officerName.toLowerCase().includes(q);
      if (!matchTitle && !matchRef && !matchNotes && !matchOfficer) return false;
    }
    return true;
  });

  const getStatusBadge = (status: TrackingStatus) => {
    switch (status) {
      case 'drafted':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">{t.trackStatusDrafted}</span>;
      case 'submitted':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-sky-950/80 text-sky-300 border border-sky-800">{t.trackStatusSubmitted}</span>;
      case 'acknowledged':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800">{t.trackStatusAcknowledged}</span>;
      case 'under_investigation':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800">{t.trackStatusUnderInvestigation}</span>;
      case 'content_removed':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">{t.trackStatusContentRemoved}</span>;
      case 'escalated':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800">{t.trackStatusEscalated}</span>;
      case 'closed':
        return <span className="px-2.5 py-1 rounded text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800">{t.trackStatusClosed}</span>;
      default:
        return null;
    }
  };

  const getAuthorityBadge = (type: TrackingSubmissionType) => {
    switch (type) {
      case 'ncrp':
        return <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/60">{'NCRP'}</span>;
      case 'police':
        return <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-800/60">{'POLICE'}</span>;
      case 'platform':
        return <span className="text-xs font-bold font-mono text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-800/60">{'PLATFORM'}</span>;
      case 'ncw':
        return <span className="text-xs font-bold font-mono text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800/60">{'NCW'}</span>;
      case 'gac':
        return <span className="text-xs font-bold font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/60">{'GAC'}</span>;
      default:
        return <span className="text-xs font-bold font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{'OTHER'}</span>;
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Hidden File Input for JSON Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImportFile}
      />

      {/* Top Navigation & Mode Header */}
      <div className="space-y-4 no-print">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
              <span className="text-sky-400 font-bold">{t.trackModeBadge}</span>
              <span>•</span>
              <span className="text-slate-300">{records.length} {t.trackFilterAll}</span>
              <span>•</span>
              <span className="text-slate-300">{timers.length} {t.trackTimersSectionTitle}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
              {t.trackModeTitle}
            </h1>
            <p className="text-sm font-medium text-sky-400 mt-1">
              {t.trackModeSubtitle}
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 shadow-lg">
            <Clock className="w-6 h-6" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Site-wide General Legal Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs sm:text-sm text-amber-200 flex items-start gap-3 no-print">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="leading-relaxed">
          <strong className="text-amber-100 font-semibold">{t.trackUnverifiedLegalBadge}:</strong> {t.generalLegalNotice}
        </div>
      </div>

      {/* Privacy & Client Isolation Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300 shadow-sm no-print">
        <div className="flex items-start gap-3">
          <Layers className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-bold text-sky-400 block mb-0.5 font-mono uppercase tracking-wider">
              {t.hermeticPrivacyTitle}
            </span>
            <p className="leading-relaxed text-slate-300">
              {t.trackPrivacyBanner}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-medium text-slate-400 shrink-0 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          {t.trackZeroStorageNotice}
        </span>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md no-print">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setEditingRecord(null);
              setShowAddRecordModal(true);
            }}
            className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>{t.trackAddRecordBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddTimerModal(true)}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{t.trackStartTimerBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              loadSampleData();
              showToast(t.trackSampleDataLoadedToast);
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>{t.trackSampleDataBtn}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            disabled={records.length === 0 && timers.length === 0}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            <span>{t.trackExportBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span>{t.trackImportBtn}</span>
          </button>

          {(records.length > 0 || timers.length > 0) && (
            <button
              type="button"
              onClick={() => setShowClearConfirmModal(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors"
              title={t.trackClearBtn}
              aria-label={t.trackClearBtn}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: Statutory Countdown Timers */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-400" />
              <span>{t.trackTimersSectionTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.trackTimersSectionSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddTimerModal(true)}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 no-print"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.trackStartTimerBtn}</span>
          </button>
        </div>

        {/* Personal Reminder & Platform Receipt Notice */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <div className="font-semibold text-slate-200">{t.trackTimerPersonalReminderNotice}</div>
            <div className="text-slate-400">{t.trackTimerPlatformReceiptNotice}</div>
          </div>
        </div>

        {timers.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {t.trackNoTimersNotice}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  addTimer({ timerType: '24h_ncii' });
                  showToast(isHi ? '24 घंटे का NCII टाइमर शुरू हुआ' : '24h NCII takedown timer started');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-medium border border-slate-700"
              >
                {'+ 24h NCII'}
              </button>
              <button
                type="button"
                onClick={() => {
                  addTimer({ timerType: '24h_acknowledgment' });
                  showToast(isHi ? '24 घंटे का पावती टाइमर शुरू हुआ' : '24h acknowledgment timer started');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-medium border border-slate-700"
              >
                {'+ 24h Ack'}
              </button>
              <button
                type="button"
                onClick={() => {
                  addTimer({ timerType: '72h_removal' });
                  showToast(isHi ? '72 घंटे का सामग्री हटाने का टाइमर शुरू हुआ' : '72h removal timer started');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-medium border border-slate-700"
              >
                {'+ 72h Removal'}
              </button>
              <button
                type="button"
                onClick={() => {
                  addTimer({ timerType: '15d_resolution' });
                  showToast(isHi ? '15 दिन का समाधान टाइमर शुरू हुआ' : '15d resolution timer started');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-medium border border-slate-700"
              >
                {'+ 15d Resolution'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timers.map((timer) => {
              const countdown = formatTimerCountdown(timer.expiresAt, timer.status);
              const timerTitle = isHi ? timer.title.hi : timer.title.en;
              const timerLegal = isHi ? timer.legalBasis.hi : timer.legalBasis.en;

              let cardBorder = 'border-slate-800 bg-slate-900';
              let badgeColor = 'bg-sky-950/80 text-sky-300 border-sky-800';
              let badgeLabel = t.trackTimerActiveBadge;

              if (timer.status === 'completed') {
                cardBorder = 'border-emerald-900/60 bg-emerald-950/20';
                badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
                badgeLabel = t.trackTimerCompletedBadge;
              } else if (countdown.isExpired) {
                cardBorder = 'border-rose-900/80 bg-rose-950/20 shadow-rose-950/30';
                badgeColor = 'bg-rose-950/80 text-rose-300 border-rose-800';
                badgeLabel = t.trackTimerExpiredBadge;
              } else if (countdown.isWarning) {
                cardBorder = 'border-amber-900/80 bg-amber-950/20';
                badgeColor = 'bg-amber-950/80 text-amber-300 border-amber-800';
                badgeLabel = t.trackTimerWarningBadge;
              }

              // Connected record title
              const linkedRec = records.find((r) => r.id === timer.recordId);

              return (
                <div
                  key={timer.id}
                  className={`p-5 rounded-xl border ${cardBorder} flex flex-col justify-between gap-4 transition-all shadow-md`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold border font-mono ${badgeColor}`}>
                        {badgeLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTimer(timer.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors no-print"
                        title={t.trackTimerDeleteBtn}
                        aria-label={t.trackTimerDeleteBtn}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {timerTitle}
                      </h3>
                      <p className="text-xs text-sky-400 font-mono mt-0.5">
                        {timerLegal}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
                          {t.trackUnverifiedLegalBadge}
                        </span>
                        <span className="text-[10px] text-slate-400 italic">
                          ({t.trackTimerPlatformReceiptNotice})
                        </span>
                      </div>
                      {linkedRec && (
                        <p className="text-[11px] text-slate-400 mt-1">
                          <span className="font-semibold text-slate-300">{isHi ? 'संबद्ध: ' : 'Linked: '}</span>
                          {linkedRec.title} ({linkedRec.referenceNumber || 'Pending ref'})
                        </p>
                      )}
                    </div>

                    {/* Countdown Display */}
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                      <div className="text-xs text-slate-400">
                        {countdown.isExpired ? t.trackTimerOverdueBy : t.trackTimerRemaining}
                      </div>
                      <div
                        className={`text-lg font-mono font-bold tracking-tight ${
                          countdown.isExpired
                            ? 'text-rose-400 animate-pulse'
                            : countdown.isWarning
                            ? 'text-amber-400'
                            : timer.status === 'completed'
                            ? 'text-emerald-400'
                            : 'text-sky-300'
                        }`}
                      >
                        {countdown.text}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 no-print">
                    {countdown.isExpired ? (
                      <button
                        type="button"
                        onClick={() => {
                          const ep = ESCALATION_PATHS.find((p) => p.triggerTimerType === timer.timerType);
                          if (ep) setSelectedEscalationPath(ep);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{t.trackTimerEscalateBtn}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const ep = ESCALATION_PATHS.find((p) => p.triggerTimerType === timer.timerType);
                          if (ep) setSelectedEscalationPath(ep);
                        }}
                        className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t.trackTimerEscalateBtn}</span>
                      </button>
                    )}

                    {timer.status !== 'completed' && (
                      <button
                        type="button"
                        onClick={() => {
                          updateTimer(timer.id, {
                            status: 'completed',
                            completedAt: new Date().toISOString(),
                          });
                          showToast(isHi ? 'टाइमर संपन्न चिह्नित किया गया' : 'Timer marked completed');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.trackTimerMarkResolvedBtn}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: Complaint Submission Ledger */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <span>{t.trackLedgerSectionTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.trackLedgerSectionSubtitle}
            </p>
          </div>

          {/* Filter Tabs & Search */}
          <div className="flex flex-wrap items-center gap-2 no-print">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'all' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.trackFilterAll} ({records.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('submitted')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'submitted' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.trackFilterSubmitted}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('under_investigation')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'under_investigation' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.trackFilterUnderInvestigation}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('closed')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === 'closed' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.trackFilterActionTaken}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative no-print">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.trackSearchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {t.trackNoRecordsNotice}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditingRecord(null);
                  setShowAddRecordModal(true);
                }}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
              >
                + {t.trackAddRecordBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  loadSampleData();
                  showToast(t.trackSampleDataLoadedToast);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
                {t.trackSampleDataBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const categoryObj = CATEGORIES.find((c) => c.key === record.categoryKey);
              const categoryTitle = categoryObj ? categoryObj.title[language] : record.categoryKey;
              const isNoteInputOpen = expandedNoteInputs[record.id] || false;
              const currentNoteVal = newNoteTexts[record.id] || '';

              return (
                <div
                  key={record.id}
                  className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-4 transition-all hover:border-slate-700"
                >
                  {/* Record Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {getAuthorityBadge(record.submissionType)}
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {record.title}
                        </h3>
                        {categoryTitle && (
                          <span className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-medium">
                            {categoryTitle}
                          </span>
                        )}
                      </div>

                      {/* Reference Number */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-slate-400 font-medium">{t.trackRefNumberLabel}</span>
                        <code className="text-xs font-mono font-bold text-sky-400 bg-slate-950 px-2.5 py-1 rounded border border-sky-900/40">
                          {record.referenceNumber || 'N/A (Pending receipt)'}
                        </code>
                        {record.referenceNumber && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(record.referenceNumber, t.trackCopiedRefToast)}
                            className="p-1 text-slate-400 hover:text-sky-300 rounded transition-colors no-print"
                            title="Copy reference number"
                            aria-label="Copy reference number"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Status & Menu */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        {getStatusBadge(record.status)}
                        {/* Quick Status Selector */}
                        <select
                          value={record.status}
                          onChange={(e) => updateRecord(record.id, { status: e.target.value as TrackingStatus })}
                          className="bg-slate-950 text-slate-300 border border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-sky-500 no-print"
                          aria-label="Change Status"
                        >
                          <option value="drafted">{t.trackStatusDrafted}</option>
                          <option value="submitted">{t.trackStatusSubmitted}</option>
                          <option value="acknowledged">{t.trackStatusAcknowledged}</option>
                          <option value="under_investigation">{t.trackStatusUnderInvestigation}</option>
                          <option value="content_removed">{t.trackStatusContentRemoved}</option>
                          <option value="escalated">{t.trackStatusEscalated}</option>
                          <option value="closed">{t.trackStatusClosed}</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1 no-print">
                        <button
                          type="button"
                          onClick={() => handleOpenEditRecord(record)}
                          className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                          title={t.trackEditRecordBtn}
                          aria-label={t.trackEditRecordBtn}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeRecord(record.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                          title={t.trackDeleteRecordBtn}
                          aria-label={t.trackDeleteRecordBtn}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 block mb-0.5">{t.trackSubmittedDateLabel}</span>
                      <span className="font-semibold text-slate-200">
                        {record.submittedAt ? new Date(record.submittedAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    {record.officerName && (
                      <div>
                        <span className="text-slate-400 block mb-0.5">{t.trackOfficerLabel}</span>
                        <span className="font-semibold text-slate-200">{record.officerName}</span>
                      </div>
                    )}

                    {record.officerContact && (
                      <div>
                        <span className="text-slate-400 block mb-0.5">{t.trackContactLabel}</span>
                        <span className="font-mono text-slate-200">{record.officerContact}</span>
                      </div>
                    )}
                  </div>

                  {/* Diary Notes Timeline */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-400" />
                        <span>{t.trackNotesLabel} ({record.notes.length})</span>
                      </span>

                      {!isNoteInputOpen && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedNoteInputs((prev) => ({ ...prev, [record.id]: true }))
                          }
                          className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 no-print"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{t.trackAddNoteBtn}</span>
                        </button>
                      )}
                    </div>

                    {record.notes.length > 0 && (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {record.notes.map((note) => (
                          <div
                            key={note.id}
                            className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex flex-col gap-0.5"
                          >
                            <span className="text-[10px] font-mono text-slate-500">
                              {new Date(note.timestamp).toLocaleString()}
                            </span>
                            <p className="leading-relaxed whitespace-pre-wrap">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inline Add Note Input */}
                    {isNoteInputOpen && (
                      <div className="p-3 rounded-lg bg-slate-950 border border-sky-900/40 space-y-2 no-print">
                        <textarea
                          rows={2}
                          value={currentNoteVal}
                          onChange={(e) =>
                            setNewNoteTexts((prev) => ({ ...prev, [record.id]: e.target.value }))
                          }
                          placeholder={t.trackAddNotePlaceholder}
                          className="w-full p-2.5 rounded bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedNoteInputs((prev) => ({ ...prev, [record.id]: false }))
                            }
                            className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                          >
                            {t.quickExitCancel}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (currentNoteVal.trim()) {
                                addNoteToRecord(record.id, currentNoteVal.trim());
                                setNewNoteTexts((prev) => ({ ...prev, [record.id]: '' }));
                                setExpandedNoteInputs((prev) => ({ ...prev, [record.id]: false }));
                                showToast(isHi ? 'टिप्पणी सहेजी गई' : 'Note added');
                              }
                            }}
                            className="px-3 py-1 rounded bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500"
                          >
                            {t.trackSaveNoteBtn}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 3: Statutory Follow-Up & Escalation Playbooks */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-sky-400" />
            <span>{t.trackEscalationSectionTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.trackEscalationSectionSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {ESCALATION_PATHS.map((path) => {
            const isExpanded = expandedEscalationId === path.id;
            const pathTitle = isHi ? path.title.hi : path.title.en;
            const pathSub = isHi ? path.subtitle.hi : path.subtitle.en;
            const pathLegal = isHi ? path.legalBasis.hi : path.legalBasis.en;

            return (
              <div
                key={path.id}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setExpandedEscalationId(isExpanded ? null : path.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                        {pathLegal}
                      </span>
                      <span className="text-[10px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 font-medium">
                        {t.trackUnverifiedLegalBadge}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {pathTitle}
                    </h3>
                    <p className="text-xs text-slate-400">{pathSub}</p>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 space-y-6">
                    {/* Steps List */}
                    <div className="space-y-4">
                      {path.steps.map((step, sIdx) => {
                        const stepTitle = isHi ? step.title.hi : step.title.en;
                        const stepDesc = isHi ? step.desc.hi : step.desc.en;
                        const actionLabel = step.actionLabel ? (isHi ? step.actionLabel.hi : step.actionLabel.en) : null;

                        return (
                          <div
                            key={sIdx}
                            className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5"
                          >
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                              <span>{stepTitle}</span>
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed pl-6">
                              {stepDesc}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pl-6 pt-1">
                              {step.actionUrl && (
                                <a
                                  href={step.actionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1.5"
                                >
                                  <span>{actionLabel || step.actionUrl}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {step.helpline && (
                                <a
                                  href={`tel:${step.helpline}`}
                                  className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-rose-900 transition-colors"
                                >
                                  <PhoneCall className="w-3 h-3" />
                                  <span>Call {step.helpline}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Template Escalation Notice */}
                    {path.templateLetter && (
                      <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-sky-300 uppercase font-mono tracking-wider">
                            {isHi ? 'वैधानिक नोटिस प्रारूप' : 'Sample Statutory Notice Template'}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyText(
                                isHi ? path.templateLetter!.hi : path.templateLetter!.en,
                                t.trackEscalationNoticeCopiedToast
                              )
                            }
                            className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t.trackEscalationCopyNoticeBtn}</span>
                          </button>
                        </div>

                        <pre className="p-3.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                          {isHi ? path.templateLetter.hi : path.templateLetter.en}
                        </pre>
                      </div>
                    )}

                    {/* Statutory Compliance Note */}
                    {path.complianceNote && (
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-100 font-semibold">{t.trackUnverifiedLegalBadge}:</strong>{' '}
                        {isHi ? path.complianceNote.hi : path.complianceNote.en}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL: Add / Edit Record */}
      {showAddRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingRecord ? t.trackRecordModalEditTitle : t.trackRecordModalAddTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddRecordModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="space-y-4">
              {/* Submission Authority */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {t.trackRecordModalAuthorityLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'ncrp', label: 'NCRP Portal' },
                    { id: 'police', label: 'Police Station / Cyber Cell' },
                    { id: 'platform', label: 'Platform Grievance' },
                    { id: 'ncw', label: 'NCW (181)' },
                    { id: 'gac', label: 'GAC Portal' },
                    { id: 'other', label: 'Other Court / Agency' },
                  ].map((auth) => (
                    <button
                      key={auth.id}
                      type="button"
                      onClick={() => {
                        setRecordAuthority(auth.id as TrackingSubmissionType);
                        if (!recordTitle) {
                          if (auth.id === 'ncrp') setRecordTitle(t.trackAuthNcrp);
                          if (auth.id === 'platform') setRecordTitle('Instagram / Meta Grievance');
                          if (auth.id === 'police') setRecordTitle('Cyber Crime Police Station');
                        }
                      }}
                      className={`p-2 rounded-lg border text-xs font-medium text-center transition-colors ${
                        recordAuthority === auth.id
                          ? 'border-sky-500 bg-sky-950/60 text-sky-200'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {auth.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title / Station Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  {t.trackRecordModalTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  value={recordTitle}
                  onChange={(e) => setRecordTitle(e.target.value)}
                  placeholder={t.trackRecordModalTitlePlaceholder}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Reference / Ack Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  {t.trackRecordModalRefLabel}
                </label>
                <input
                  type="text"
                  value={recordRefNumber}
                  onChange={(e) => setRecordRefNumber(e.target.value)}
                  placeholder={t.trackRecordModalRefPlaceholder}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Date & Time + Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {t.trackRecordModalDateLabel}
                  </label>
                  <input
                    type="datetime-local"
                    value={recordSubmittedAt}
                    onChange={(e) => setRecordSubmittedAt(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {t.trackRecordModalStatusLabel}
                  </label>
                  <select
                    value={recordStatus}
                    onChange={(e) => setRecordStatus(e.target.value as TrackingStatus)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="drafted">{t.trackStatusDrafted}</option>
                    <option value="submitted">{t.trackStatusSubmitted}</option>
                    <option value="acknowledged">{t.trackStatusAcknowledged}</option>
                    <option value="under_investigation">{t.trackStatusUnderInvestigation}</option>
                    <option value="content_removed">{t.trackStatusContentRemoved}</option>
                    <option value="escalated">{t.trackStatusEscalated}</option>
                    <option value="closed">{t.trackStatusClosed}</option>
                  </select>
                </div>
              </div>

              {/* Officer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {t.trackRecordModalOfficerLabel}
                  </label>
                  <input
                    type="text"
                    value={recordOfficerName}
                    onChange={(e) => setRecordOfficerName(e.target.value)}
                    placeholder={t.trackRecordModalOfficerPlaceholder}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {t.trackRecordModalContactLabel}
                  </label>
                  <input
                    type="text"
                    value={recordOfficerContact}
                    onChange={(e) => setRecordOfficerContact(e.target.value)}
                    placeholder={t.trackRecordModalContactPlaceholder}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Initial Note (only on create) */}
              {!editingRecord && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {t.trackRecordModalNotesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={recordInitialNotes}
                    onChange={(e) => setRecordInitialNotes(e.target.value)}
                    placeholder={t.trackRecordModalNotesPlaceholder}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddRecordModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  {t.trackRecordModalCancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
                >
                  {t.trackRecordModalSaveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Start Statutory Timer */}
      {showAddTimerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" />
                <span>{t.trackAddTimerModalTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddTimerModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStartTimer} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  {t.trackAddTimerSelectType}
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: '24h_ncii',
                      label: t.trackAddTimerPreset24hNcii,
                      sub: isHi ? 'शिकायत प्राप्ति से 24 घंटे, नियम 3(2)(b)' : '24h from receipt of complaint, Rule 3(2)(b)',
                    },
                    {
                      id: '24h_acknowledgment',
                      label: t.trackAddTimerPreset24hAck,
                      sub: isHi ? 'शिकायत प्राप्ति से 24 घंटे, नियम 3(2)(a)' : '24h from receipt of complaint, Rule 3(2)(a)',
                    },
                    {
                      id: '72h_removal',
                      label: t.trackAddTimerPreset72hRemoval,
                      sub: isHi ? 'शिकायत प्राप्ति से 72 घंटे (अन्य सामग्री)' : '72h from receipt of complaint (other content)',
                    },
                    {
                      id: '15d_resolution',
                      label: t.trackAddTimerPreset15d,
                      sub: isHi ? 'शिकायत समाधान के लिए 15 दिन' : '15 days grievance resolution deadline',
                    },
                    {
                      id: 'custom',
                      label: t.trackAddTimerPresetCustom,
                      sub: isHi ? 'अपनी समय सीमा तय करें' : 'Set your own reminder window',
                    },
                  ].map((preset) => (
                    <label
                      key={preset.id}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                        timerPresetType === preset.id
                          ? 'border-sky-500 bg-sky-950/40 text-white'
                          : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timerPreset"
                        value={preset.id}
                        checked={timerPresetType === preset.id}
                        onChange={() => setTimerPresetType(preset.id as StatutoryTimerType)}
                        className="mt-1 text-sky-600 focus:ring-sky-500"
                      />
                      <div>
                        <div className="text-xs font-bold">{preset.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{preset.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {timerPresetType === 'custom' && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">
                      {t.trackAddTimerCustomHoursLabel}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={720}
                      value={customTimerHours}
                      onChange={(e) => setCustomTimerHours(e.target.value)}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">
                      {t.trackAddTimerCustomTitleLabel}
                    </label>
                    <input
                      type="text"
                      value={customTimerTitle}
                      onChange={(e) => setCustomTimerTitle(e.target.value)}
                      placeholder="e.g. Call IO Sharma"
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* Link to record */}
              {records.length > 0 && (
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-slate-300">
                    {t.trackAddTimerLinkRecord}
                  </label>
                  <select
                    value={timerLinkedRecordId}
                    onChange={(e) => setTimerLinkedRecordId(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="">{t.trackAddTimerNoRecordLink}</option>
                    {records.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title} ({r.referenceNumber || 'Pending ref'})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTimerModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  {t.trackAddTimerCancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
                >
                  {t.trackAddTimerSubmitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Export Options */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-sky-400" />
                <span>{t.trackExportModalTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-left space-y-1 transition-all group"
              >
                <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  <span>{t.trackExportJsonBtn}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.trackExportJsonDesc}
                </p>
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-left space-y-1 transition-all group"
              >
                <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{t.trackExportTxtBtn}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.trackExportTxtDesc}
                </p>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-left space-y-1 transition-all group"
              >
                <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>{t.trackExportPdfBtn}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t.trackExportPdfDesc}
                </p>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                {t.quickExitCancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Clear Confirmation */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
          <div className="bg-slate-900 border border-rose-900/60 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{t.trackClearConfirmTitle}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.trackClearConfirmDesc}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirmModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                {t.quickExitCancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setShowClearConfirmModal(false);
                  showToast(isHi ? 'सभी रिकॉर्ड साफ कर दिए गए' : 'All tracking records cleared');
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                {t.trackConfirmClearBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL / DRAWER: Escalation Path Detail */}
      {selectedEscalationPath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm no-print">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  {isHi ? selectedEscalationPath.legalBasis.hi : selectedEscalationPath.legalBasis.en}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-1.5">
                  {isHi ? selectedEscalationPath.title.hi : selectedEscalationPath.title.en}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isHi ? selectedEscalationPath.subtitle.hi : selectedEscalationPath.subtitle.en}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEscalationPath(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {selectedEscalationPath.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>{isHi ? step.title.hi : step.title.en}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {isHi ? step.desc.hi : step.desc.en}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pl-6 pt-1">
                    {step.actionUrl && (
                      <a
                        href={step.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1.5"
                      >
                        <span>{step.actionLabel ? (isHi ? step.actionLabel.hi : step.actionLabel.en) : step.actionUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {step.helpline && (
                      <a
                        href={`tel:${step.helpline}`}
                        className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-rose-900 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call {step.helpline}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Template Letter */}
            {selectedEscalationPath.templateLetter && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-900/40 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-300 uppercase font-mono tracking-wider">
                    {isHi ? 'वैधानिक नोटिस प्रारूप' : 'Statutory Notice Template'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        isHi
                          ? selectedEscalationPath.templateLetter!.hi
                          : selectedEscalationPath.templateLetter!.en,
                        t.trackEscalationNoticeCopiedToast
                      )
                    }
                    className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.trackEscalationCopyNoticeBtn}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                  {isHi ? selectedEscalationPath.templateLetter.hi : selectedEscalationPath.templateLetter.en}
                </pre>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedEscalationPath(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                {t.trackEscalationCloseBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-lg bg-sky-900 border border-sky-600 text-sky-100 text-xs font-semibold shadow-2xl flex items-center gap-2 no-print">
          <Check className="w-4 h-4 text-sky-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
