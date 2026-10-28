/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Phase 6: App State Context
 * 
 * Responsibilities:
 * 1. Unblocked Quick Exit: Immediately removes beforeunload warning, wipes in-memory state, and redirects to Google.
 * 2. Clear Everything Now: Completely wipes evidence, tracking, report, and respond in-memory data without leaving the page.
 * 3. Demo Scenario: Loads coherent fictional scenario across all modes with top demo banner and "Exit demo and clear".
 * 4. Guided Tour: 6-step accessible, skippable, bilingual guided tour.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEvidence, EvidenceItem } from './EvidenceContext';
import { useTracking } from './TrackingContext';
import {
  AlertTriangle,
  Sparkles,
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Shield,
  Trash2,
  ExternalLink,
} from 'lucide-react';

interface AppStateContextType {
  isDemoMode: boolean;
  runDemoScenario: () => void;
  exitDemoAndClear: () => void;
  clearAllData: () => void;
  executeQuickExit: () => void;
  showClearModal: boolean;
  setShowClearModal: (show: boolean) => void;
  isTourOpen: boolean;
  tourStep: number;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  skipTour: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  const { clearItems, addItem, setIncidentCategory } = useEvidence();
  const { clearAll: clearTracking, addRecord, addTimer } = useTracking();

  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  // Hardened, unblocked quick exit
  const executeQuickExit = () => {
    // 1. Set global suppression flag so beforeunload never triggers native dialog
    (window as any).__KAVACH_SUPPRESS_BEFOREUNLOAD = true;

    // 2. Clear all state in memory
    try {
      clearItems();
      clearTracking();
      setIsDemoMode(false);
      window.dispatchEvent(new CustomEvent('kavach:clear-all-data'));
      window.dispatchEvent(new CustomEvent('kavach:quick-exit'));
    } catch {
      // ignore
    }

    // 3. Immediately replace location
    window.location.replace('https://www.google.com');
  };

  // Clear all in-memory data across the app without leaving
  const clearAllData = () => {
    clearItems();
    clearTracking();
    setIncidentCategory(null);
    setIsDemoMode(false);
    setShowClearModal(false);
    window.dispatchEvent(new CustomEvent('kavach:clear-all-data'));
  };

  // Run coherent demo scenario across all modes
  const runDemoScenario = () => {
    // 1. Clear any existing state first
    clearItems();
    clearTracking();
    setIsDemoMode(true);

    // 2. Set category in Respond & Evidence to blackmail
    setIncidentCategory('blackmail');

    // 3. Add 1 coherent sample evidence item in Preserve
    const sampleItem: EvidenceItem = {
      id: `ev-demo-${Date.now().toString().slice(-4)}`,
      fileName: 'extortion_message_screenshot.png',
      excludeFileName: false,
      fileSizeBytes: 245100,
      mimeType: 'image/png',
      sha256: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
      hashedAtUtc: new Date().toISOString(),
      hashedAtLocal: new Date().toLocaleString(),
      fileLastModified: new Date().toISOString(),
      originalCapturedAt: 'Yesterday, 9:30 PM',
      sourceType: 'screenshot',
      sourceReference: 'Instagram DM @suspect_user_2026',
      excludeSourceRef: false,
      note: 'Unsolicited direct message demanding ₹25,000 via UPI threatening non-consensual image disclosure.',
      includeNote: true,
      previewUrl: null,
      isPreviewVisible: false,
      isUnblurred: false,
    };
    addItem(sampleItem);

    // 4. Add 1 coherent record in Track with matching 24h NCII timer
    const record = addRecord({
      submissionType: 'ncrp',
      title: 'National Cyber Crime Reporting Portal (cybercrime.gov.in)',
      referenceNumber: '2026/NCRP/882190',
      submittedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      officerName: 'Inspector A. Verma (Cyber Crime Unit)',
      officerContact: 'cybercell@delhipolice.gov.in',
      status: 'submitted',
      categoryKey: 'blackmail',
      followUpDeadline: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      notes: 'Initial online grievance filed with cryptographic SHA-256 evidence hashes attached.',
    });

    // Add 24h NCII timer linked to the record (expired 1h ago for instant escalation demonstration)
    addTimer({
      timerType: '24h_ncii',
      recordId: record.id,
      customHours: 24,
    });

    // Notify any listening components
    window.dispatchEvent(new CustomEvent('kavach:demo-loaded', { detail: { category: 'blackmail' } }));
  };

  const exitDemoAndClear = () => {
    clearAllData();
  };

  // Guided tour controllers
  const startTour = () => {
    setTourStep(1);
    setIsTourOpen(true);
  };

  const nextTourStep = () => {
    if (tourStep < 6) {
      setTourStep((prev) => prev + 1);
    } else {
      setIsTourOpen(false);
    }
  };

  const prevTourStep = () => {
    if (tourStep > 1) {
      setTourStep((prev) => prev - 1);
    }
  };

  const skipTour = () => {
    setIsTourOpen(false);
  };

  const tourStepsData = [
    {
      step: 1,
      title: t.tourStep1Title,
      desc: t.tourStep1Desc,
    },
    {
      step: 2,
      title: t.tourStep2Title,
      desc: t.tourStep2Desc,
    },
    {
      step: 3,
      title: t.tourStep3Title,
      desc: t.tourStep3Desc,
    },
    {
      step: 4,
      title: t.tourStep4Title,
      desc: t.tourStep4Desc,
    },
    {
      step: 5,
      title: t.tourStep5Title,
      desc: t.tourStep5Desc,
    },
    {
      step: 6,
      title: t.tourStep6Title,
      desc: t.tourStep6Desc,
    },
  ];

  const currentTourStep = tourStepsData[tourStep - 1];

  return (
    <AppStateContext.Provider
      value={{
        isDemoMode,
        runDemoScenario,
        exitDemoAndClear,
        clearAllData,
        executeQuickExit,
        showClearModal,
        setShowClearModal,
        isTourOpen,
        tourStep,
        startTour,
        nextTourStep,
        prevTourStep,
        skipTour,
      }}
    >
      {/* Persistent Demo Mode Banner at the very top of all screens */}
      {isDemoMode && (
        <div className="bg-amber-600 text-black py-2 px-4 shadow-md sticky top-0 z-50 text-xs font-semibold flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-black" aria-hidden="true" />
            <strong className="tracking-wide uppercase font-mono">{t.demoBannerTitle}</strong>
            <span className="hidden sm:inline text-black/80 font-normal">— {t.demoBannerDesc}</span>
          </div>

          <button
            type="button"
            onClick={exitDemoAndClear}
            className="px-3 py-1 rounded bg-black text-amber-300 hover:bg-slate-900 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-black"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.demoExitBtn}</span>
          </button>
        </div>
      )}

      {children}

      {/* Clear Everything Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <Trash2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{t.clearEverythingModalTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
                aria-label={t.close}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t.clearEverythingModalBody}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {t.trackRecordModalCancelBtn}
              </button>
              <button
                type="button"
                onClick={clearAllData}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.clearEverythingConfirmBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guided Tour Modal */}
      {isTourOpen && currentTourStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-slate-900 border border-sky-600/50 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
            <div className="flex items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400 shrink-0" aria-hidden="true" />
                <h3 className="font-bold text-sm text-white">{t.tourModalTitle}</h3>
              </div>
              <button
                type="button"
                onClick={skipTour}
                className="text-slate-400 hover:text-white p-1 rounded-md"
                aria-label={t.close}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                <span>
                  {isHi ? 'चरण' : 'Step'} {currentTourStep.step} / 6
                </span>
                <span className="text-slate-500 font-sans">{Math.round((tourStep / 6) * 100)}%</span>
              </div>
              <h4 className="text-base font-extrabold text-white">{currentTourStep.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {currentTourStep.desc}
              </p>
            </div>

            {/* Stepper indicators */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {[1, 2, 3, 4, 5, 6].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setTourStep(st)}
                  className={`h-1.5 rounded-full transition-all ${
                    st === tourStep ? 'w-6 bg-sky-400' : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Go to step ${st}`}
                />
              ))}
            </div>

            {/* Tour Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={skipTour}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                {t.tourSkipBtn}
              </button>

              <div className="flex items-center gap-2">
                {tourStep > 1 && (
                  <button
                    type="button"
                    onClick={prevTourStep}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.tourPrevBtn}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={nextTourStep}
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>{tourStep === 6 ? t.tourFinishBtn : t.tourNextBtn}</span>
                  {tourStep < 6 && <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
