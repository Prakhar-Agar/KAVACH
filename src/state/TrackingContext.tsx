/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Shared In-Memory Tracking State
 * 
 * PRIVACY GUARANTEES:
 * 1. STRICTLY IN-MEMORY: No localStorage, sessionStorage, indexedDB, or cookies.
 * 2. Tab memory isolation: Zero network calls, zero analytics.
 * 3. Warns on beforeunload if unexported tracking records exist.
 * 4. Enables export and import of encrypted/structured JSON manifests for user-owned persistence.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  TrackingRecord,
  StatutoryTimer,
  SYNTHETIC_SAMPLE_RECORDS,
  SYNTHETIC_SAMPLE_TIMERS,
  STATUTORY_TIMER_PRESETS,
  StatutoryTimerType,
} from '../data/trackingData';

export interface TrackingExportManifest {
  manifestType: 'kavach_tracking_ledger';
  version: '1.0';
  exportedAtUtc: string;
  recordCount: number;
  timerCount: number;
  records: TrackingRecord[];
  timers: StatutoryTimer[];
}

interface TrackingContextType {
  records: TrackingRecord[];
  timers: StatutoryTimer[];
  addRecord: (record: Omit<TrackingRecord, 'id' | 'updatedAt' | 'notes'> & { notes?: string }) => TrackingRecord;
  updateRecord: (id: string, updates: Partial<TrackingRecord>) => void;
  removeRecord: (id: string) => void;
  addNoteToRecord: (recordId: string, noteText: string) => void;
  addTimer: (params: {
    timerType: StatutoryTimerType;
    recordId?: string;
    customHours?: number;
    customTitle?: { en: string; hi: string };
    customLegal?: { en: string; hi: string };
  }) => StatutoryTimer;
  updateTimer: (id: string, updates: Partial<StatutoryTimer>) => void;
  removeTimer: (id: string) => void;
  loadSampleData: () => void;
  clearAll: () => void;
  exportJson: () => string;
  exportTextSummary: (lang: 'en' | 'hi') => string;
  importJson: (jsonString: string) => { success: boolean; error?: string; count?: number };
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const TrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const [records, setRecords] = useState<TrackingRecord[]>([]);
  const [timers, setTimers] = useState<StatutoryTimer[]>([]);

  // Warn if user attempts to close or reload while tracking records exist in memory
  // Quick Exit MUST NEVER be blocked: if __KAVACH_SUPPRESS_BEFOREUNLOAD is set, exit immediately
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if ((window as any).__KAVACH_SUPPRESS_BEFOREUNLOAD) {
        return;
      }
      if (records.length > 0 || timers.length > 0) {
        e.preventDefault();
        e.returnValue = t.preserveUnsavedLeaveWarning;
        return t.preserveUnsavedLeaveWarning;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [records.length, timers.length, t.preserveUnsavedLeaveWarning]);

  // Listen for clear all data and quick exit events
  useEffect(() => {
    const handleClear = () => {
      setRecords([]);
      setTimers([]);
    };

    window.addEventListener('kavach:clear-all-data', handleClear);
    window.addEventListener('kavach:quick-exit', handleClear);
    return () => {
      window.removeEventListener('kavach:clear-all-data', handleClear);
      window.removeEventListener('kavach:quick-exit', handleClear);
    };
  }, []);

  // Periodic timer status updater (every 10 seconds, recalculates active/warning/expired)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        let changed = false;
        const now = Date.now();

        const updated = prevTimers.map((timer) => {
          if (timer.status === 'completed') return timer;

          const expiresAtMs = new Date(timer.expiresAt).getTime();
          const msRemaining = expiresAtMs - now;

          let newStatus = timer.status;
          if (msRemaining <= 0) {
            newStatus = 'expired';
          } else if (msRemaining <= 4 * 60 * 60 * 1000) {
            // Less than 4 hours remaining
            newStatus = 'warning';
          } else {
            newStatus = 'active';
          }

          if (newStatus !== timer.status) {
            changed = true;
            return { ...timer, status: newStatus };
          }
          return timer;
        });

        return changed ? updated : prevTimers;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addRecord = (
    data: Omit<TrackingRecord, 'id' | 'updatedAt' | 'notes'> & { notes?: string }
  ): TrackingRecord => {
    const id = `trk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();
    const newRecord: TrackingRecord = {
      ...data,
      id,
      notes: data.notes
        ? [
            {
              id: `note-${Date.now()}`,
              timestamp: nowIso,
              text: data.notes,
            },
          ]
        : [],
      updatedAt: nowIso,
    };

    setRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const updateRecord = (id: string, updates: Partial<TrackingRecord>) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id
          ? {
              ...rec,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : rec
      )
    );
  };

  const removeRecord = (id: string) => {
    setRecords((prev) => prev.filter((rec) => rec.id !== id));
    // Also remove or unlink connected timers
    setTimers((prev) =>
      prev.map((tmr) => (tmr.recordId === id ? { ...tmr, recordId: undefined } : tmr))
    );
  };

  const addNoteToRecord = (recordId: string, noteText: string) => {
    if (!noteText.trim()) return;
    const nowIso = new Date().toISOString();
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        return {
          ...rec,
          notes: [
            ...rec.notes,
            {
              id: `note-${Date.now()}`,
              timestamp: nowIso,
              text: noteText.trim(),
            },
          ],
          updatedAt: nowIso,
        };
      })
    );
  };

  const addTimer = (params: {
    timerType: StatutoryTimerType;
    recordId?: string;
    customHours?: number;
    customTitle?: { en: string; hi: string };
    customLegal?: { en: string; hi: string };
  }): StatutoryTimer => {
    const preset = STATUTORY_TIMER_PRESETS[params.timerType];
    const durationHours = params.customHours || preset.durationHours;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

    const id = `tmr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newTimer: StatutoryTimer = {
      id,
      recordId: params.recordId,
      timerType: params.timerType,
      title: params.customTitle || preset.title,
      legalBasis: params.customLegal || preset.legalBasis,
      startedAt: now.toISOString(),
      durationHours,
      expiresAt: expiresAt.toISOString(),
      status: 'active',
      source: preset.source,
      lastReviewed: preset.lastReviewed,
      verifiedBy: preset.verifiedBy,
    };

    setTimers((prev) => [newTimer, ...prev]);

    // If linked to a record, update the record's timer pointer
    if (params.recordId) {
      updateRecord(params.recordId, { statutoryTimerId: id });
    }

    return newTimer;
  };

  const updateTimer = (id: string, updates: Partial<StatutoryTimer>) => {
    setTimers((prev) =>
      prev.map((tmr) => (tmr.id === id ? { ...tmr, ...updates } : tmr))
    );
  };

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((tmr) => tmr.id !== id));
    // Also unlink from any record
    setRecords((prev) =>
      prev.map((rec) => (rec.statutoryTimerId === id ? { ...rec, statutoryTimerId: undefined } : rec))
    );
  };

  const loadSampleData = () => {
    setRecords(SYNTHETIC_SAMPLE_RECORDS);
    setTimers(SYNTHETIC_SAMPLE_TIMERS);
  };

  const clearAll = () => {
    setRecords([]);
    setTimers([]);
  };

  const exportJson = (): string => {
    const manifest: TrackingExportManifest = {
      manifestType: 'kavach_tracking_ledger',
      version: '1.0',
      exportedAtUtc: new Date().toISOString(),
      recordCount: records.length,
      timerCount: timers.length,
      records,
      timers,
    };
    return JSON.stringify(manifest, null, 2);
  };

  const exportTextSummary = (lang: 'en' | 'hi'): string => {
    const isHi = lang === 'hi';
    const nowStr = new Date().toLocaleString();

    let text = isHi
      ? `=================================================================\nकवच (KAVACH) — साइबर अपराध रिपोर्टिंग एवं अनुवर्ती ट्रैकिंग लेज़र\nनिर्यात समय: ${nowStr}\nगोपनीयता सूचना: यह डेटा केवल आपके उपकरण पर तैयार किया गया है।\n=================================================================\n\n`
      : `=================================================================\nKAVACH — Cyber-Abuse Incident Tracking Ledger & Action Summary\nExported At: ${nowStr}\nPrivacy Notice: Prepared locally in browser memory. Never uploaded.\n=================================================================\n\n`;

    text += isHi ? `[1. दर्ज शिकायत रिकॉर्ड (${records.length})]\n\n` : `[1. SUBMITTED COMPLAINT RECORDS (${records.length})]\n\n`;

    if (records.length === 0) {
      text += isHi ? `(कोई शिकायत रिकॉर्ड दर्ज नहीं है)\n\n` : `(No complaint records logged)\n\n`;
    } else {
      records.forEach((rec, idx) => {
        text += `--------------------------------------------------\n`;
        text += `#${idx + 1} ${rec.title}\n`;
        text += `${isHi ? 'संदर्भ / पावती संख्या' : 'Reference / Ack No'}: ${rec.referenceNumber || 'N/A'}\n`;
        text += `${isHi ? 'शिकायत का माध्यम' : 'Authority / Platform'}: ${rec.submissionType.toUpperCase()}\n`;
        text += `${isHi ? 'दर्ज करने की तारीख' : 'Date Submitted'}: ${rec.submittedAt}\n`;
        text += `${isHi ? 'वर्तमान स्थिति' : 'Current Status'}: ${rec.status.toUpperCase()}\n`;
        if (rec.officerName) text += `${isHi ? 'जांच / शिकायत अधिकारी' : 'Officer in Charge'}: ${rec.officerName}\n`;
        if (rec.officerContact) text += `${isHi ? 'अधिकारी संपर्क' : 'Officer Contact'}: ${rec.officerContact}\n`;
        if (rec.notes.length > 0) {
          text += `${isHi ? 'अनुवर्ती टिप्पणियाँ (Notes)' : 'Follow-Up Notes'}:\n`;
          rec.notes.forEach((n) => {
            text += `  • [${n.timestamp.substring(0, 16)}] ${n.text}\n`;
          });
        }
        text += `\n`;
      });
    }

    text += isHi ? `[2. कानूनी समय सीमा एवं टाइमर (${timers.length})]\n\n` : `[2. STATUTORY DEADLINES & TIMERS (${timers.length})]\n\n`;

    if (timers.length === 0) {
      text += isHi ? `(कोई सक्रिय टाइमर नहीं है)\n\n` : `(No active timers)\n\n`;
    } else {
      timers.forEach((tmr, idx) => {
        const title = isHi ? tmr.title.hi : tmr.title.en;
        const legal = isHi ? tmr.legalBasis.hi : tmr.legalBasis.en;
        text += `--------------------------------------------------\n`;
        text += `Timer #${idx + 1}: ${title}\n`;
        text += `${isHi ? 'कानूनी आधार' : 'Legal Basis'}: ${legal}\n`;
        text += `${isHi ? 'आरंभ समय' : 'Started At'}: ${tmr.startedAt}\n`;
        text += `${isHi ? 'समाप्ति समय' : 'Expires At'}: ${tmr.expiresAt}\n`;
        text += `${isHi ? 'स्थिति' : 'Status'}: ${tmr.status.toUpperCase()}\n\n`;
      });
    }

    text += `=================================================================\n`;
    text += isHi
      ? `आपातकालीन सहायता:\n• राष्ट्रीय आपातकालीन हेल्पलाइन: 112\n• राष्ट्रीय महिला हेल्पलाइन: 181\n• राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930\n• पोर्टल: https://cybercrime.gov.in\n• शिकायत अपीलीय समिति (GAC): https://gac.gov.in\n`
      : `EMERGENCY HELPLINES:\n• National Emergency: 112\n• Women's Helpline: 181\n• Cybercrime Helpline: 1930\n• Cyber Portal: https://cybercrime.gov.in\n• Grievance Appellate Committee (GAC): https://gac.gov.in\n`;
    text += `=================================================================\n`;

    return text;
  };

  const importJson = (jsonString: string): { success: boolean; error?: string; count?: number } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || parsed.manifestType !== 'kavach_tracking_ledger') {
        return {
          success: false,
          error: 'Invalid file format. Please upload a valid Kavach tracking ledger JSON file.',
        };
      }

      if (Array.isArray(parsed.records)) {
        setRecords(parsed.records);
      }
      if (Array.isArray(parsed.timers)) {
        setTimers(parsed.timers);
      }

      return {
        success: true,
        count: (parsed.records?.length || 0) + (parsed.timers?.length || 0),
      };
    } catch {
      return {
        success: false,
        error: 'JSON parsing failed. The file may be corrupt or not in JSON format.',
      };
    }
  };

  return (
    <TrackingContext.Provider
      value={{
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
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = (): TrackingContextType => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};
