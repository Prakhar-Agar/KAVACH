/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppState } from '../state/AppStateContext';
import { Shield, ExternalLink, AlertTriangle, X, Trash2 } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { executeQuickExit, setShowClearModal } = useAppState();
  const [showExitModal, setShowExitModal] = useState(false);

  // Keyboard shortcut listener for safety (Escape triggers quick exit immediately, unless actively typing in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const target = e.target as HTMLElement | null;
        if (target) {
          const tagName = target.tagName ? target.tagName.toLowerCase() : '';
          if (
            tagName === 'input' ||
            tagName === 'textarea' ||
            tagName === 'select' ||
            target.isContentEditable
          ) {
            // Do not fire quick exit while actively typing in a form field
            return;
          }
        }
        executeQuickExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [executeQuickExit]);

  const navLinks = [
    { id: '/', label: t.navHome },
    { id: '/respond', label: t.navRespond },
    { id: '/preserve', label: t.navPreserve },
    { id: '/report', label: t.navReport },
    { id: '/track', label: t.navTrack },
    { id: '/privacy', label: t.navPrivacy },
    { id: '/help', label: t.navHelp },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-6 h-16 sm:h-18">
            {/* Zone 1: Brand Wordmark */}
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 text-left text-lg sm:text-xl font-bold tracking-tight text-white hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              <div className="w-7 h-7 sm:w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shrink-0">
                <Shield className="w-4 h-4 sm:w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif] tracking-normal">
                {t.appWordmark}
              </span>
            </button>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300" aria-label={t.mainNavAria}>
              {navLinks.map((link) => {
                const isActive = currentPath === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                      isActive
                        ? 'text-sky-400 font-semibold border-b-2 border-sky-400'
                        : 'hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Language Toggle, Clear All & Quick Exit Action */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Language Segmented Control */}
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                    language === 'en'
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  aria-label={t.switchToEnglish}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                    language === 'hi'
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  aria-label={t.switchToHindi}
                >
                  हिंदी
                </button>
              </div>

              {/* Clear Everything Now Action Button */}
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-rose-400"
                title={t.clearEverythingNow}
                aria-label={t.clearEverythingNow}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Quick Exit Button (High-contrast safety red, 360px responsive) */}
              <button
                type="button"
                onClick={executeQuickExit}
                title={t.quickExitNotice}
                className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-red-400"
              >
                <span className="hidden sm:inline">{t.quickExit}</span>
                <span className="sm:hidden inline">{t.quickExitShort}</span>
              </button>

              {/* Quick Exit Info Helper */}
              <button
                type="button"
                onClick={() => setShowExitModal(true)}
                className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
                title={t.quickExitDetails}
                aria-label={t.quickExitDetails}
              >
                <AlertTriangle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Row (Horizontal scroll, accessible touch targets) */}
          <div className="flex lg:hidden overflow-x-auto py-2 gap-3 border-t border-slate-800 text-xs font-medium text-slate-300 scrollbar-none" aria-label={t.mainNavAria}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`whitespace-nowrap shrink-0 pb-0.5 ${
                  currentPath === link.id
                    ? 'text-sky-400 font-bold border-b border-sky-400'
                    : 'hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Quick Exit Explanation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{t.quickExitModalTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {t.quickExitModalBody}
            </p>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-xs text-slate-400 mb-6">
              <strong className="text-slate-200 block mb-1">{t.quickExitKeyboardTitle}</strong>
              <span>{t.quickExitKeyboardText}</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowExitModal(false);
                  setShowClearModal(true);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearEverythingNow}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowExitModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  {t.quickExitCancel}
                </button>
                <button
                  type="button"
                  onClick={executeQuickExit}
                  className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>{t.quickExitModalAction}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
