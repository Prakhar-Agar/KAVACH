/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  CATEGORIES,
  CATEGORY_FOLLOW_UPS,
  PLAYBOOKS,
  PLATFORM_LOCKDOWNS,
  PLAYBOOK_METADATA,
  CategoryKey,
} from '../data/playbooks';
import {
  ShieldAlert,
  CameraOff,
  UserX,
  Eye,
  MessageSquareWarning,
  KeyRound,
  HelpCircle,
  PhoneCall,
  CheckSquare,
  Square,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  Lock,
  Layers,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  FileText,
  Clock
} from 'lucide-react';
import { useEvidence } from '../state/EvidenceContext';

interface RespondPageProps {
  onNavigate: (path: string) => void;
}

export const RespondPage: React.FC<RespondPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { setIncidentCategory } = useEvidence();

  // State is strictly in-memory (never persisted to localStorage or server)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('blackmail');
  const [isImmediateDanger, setIsImmediateDanger] = useState<boolean | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [activePlanTab, setActivePlanTab] = useState<'doNow' | 'doNotDo' | 'whenReady'>('doNow');

  // Category Icon resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return ShieldAlert;
      case 'CameraOff':
        return CameraOff;
      case 'UserX':
        return UserX;
      case 'Eye':
        return Eye;
      case 'MessageSquareWarning':
        return MessageSquareWarning;
      case 'KeyRound':
        return KeyRound;
      default:
        return HelpCircle;
    }
  };

  const handleCategorySelect = (key: CategoryKey) => {
    setSelectedCategory(key);
    setIncidentCategory(key);
    // Move to Step 2 (Danger Check)
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDangerChoice = (inDanger: boolean) => {
    setIsImmediateDanger(inDanger);
    if (!inDanger) {
      // If safe, check if this category has follow-up questions
      const followUps = CATEGORY_FOLLOW_UPS[selectedCategory];
      if (followUps && followUps.length > 0) {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFollowUpAnswer = (questionId: string, optionId: string) => {
    setFollowUpAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const toggleChecklistItem = (itemId: string) => {
    setCompletedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleResetFlow = () => {
    setCurrentStep(1);
    setIsImmediateDanger(null);
    setFollowUpAnswers({});
    setCompletedItems({});
    setActivePlanTab('doNow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPlaybook = PLAYBOOKS[selectedCategory] || PLAYBOOKS.not_sure;
  const followUpQuestions = CATEGORY_FOLLOW_UPS[selectedCategory] || [];

  // Calculate progress on the first-hour playbook
  const totalPlaybookTasks =
    currentPlaybook.doNow.length + currentPlaybook.doNotDo.length + currentPlaybook.whenReady.length;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = totalPlaybookTasks > 0 ? Math.round((completedCount / totalPlaybookTasks) * 100) : 0;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Step Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t.backToHome}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-sky-400 font-bold">{t.respondFlowBadge}</span>
          <span aria-hidden="true">·</span>
          <span>{t.progressText}: {currentStep}/4</span>
        </div>
      </div>

      {/* Main Flow Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl text-slate-100">
        {/* Module Header */}
        <div className="border-b border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            <span>01. {t.modeRespondTag}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
            {t.respondFlowTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-3xl">
            {t.respondFlowSubtitle}
          </p>

          {/* Device Memory Assurance */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{PLAYBOOK_METADATA.memoryNotice[language]}</span>
          </div>
        </div>

        {/* =========================================================================
            STEP 1: What is happening? (Category Selection)
           ========================================================================= */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
                {t.respondStep1Title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.respondStep1Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4" role="radiogroup" aria-label={t.respondStep1Title}>
              {CATEGORIES.map((cat) => {
                const IconComponent = getCategoryIcon(cat.iconName);
                const isSelected = selectedCategory === cat.key;
                return (
                  <div
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategorySelect(cat.key);
                      }
                    }}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={`flex items-start gap-4 p-4 sm:p-5 rounded-xl border transition-all cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-sky-400 ${
                      isSelected
                        ? 'bg-slate-800/90 border-sky-500 shadow-md ring-1 ring-sky-500/50'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white tracking-normal font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
                          {cat.title[language]}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {cat.description[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: Immediate Danger Check
           ========================================================================= */}
        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 block mb-1">
                {t.respondStep1SelectionNote}{' '}
                <strong className="text-sky-400">
                  {CATEGORIES.find((c) => c.key === selectedCategory)?.title[language]}
                </strong>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
                {t.respondStep2Title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.respondStep2Subtitle}
              </p>
            </div>

            {/* Critical Danger Alert Banner if user indicates physical threat */}
            {isImmediateDanger === true ? (
              <div className="p-6 rounded-2xl bg-red-950/80 border-2 border-red-600 text-white shadow-2xl mb-8 animate-fadeIn">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                    <PhoneCall className="w-6 h-6 animate-pulse" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {t.dangerAlertHeading}
                    </h3>
                    <p className="text-sm text-red-100 mt-2 leading-relaxed">
                      {t.dangerAlertBody}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6">
                  <a
                    href="tel:112"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 font-extrabold text-white text-base shadow-lg transition-transform active:scale-98"
                  >
                    <PhoneCall className="w-5 h-5" aria-hidden="true" />
                    <span>{t.dangerCall112Btn}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDangerChoice(false)}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    {t.dangerProceedSafeBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {language === 'hi'
                      ? 'क्या आप या आपके आसपास कोई व्यक्ति तात्कालिक शारीरिक खतरे में है?'
                      : 'Are you or someone near you in immediate physical danger?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6 leading-relaxed">
                    {language === 'hi'
                      ? 'यदि कोई व्यक्ति आपके घर, कार्यस्थल या वास्तविक स्थान पर आकर नुकसान पहुँचाने की धमकी दे रहा है, तो पहले पुलिस सहायता प्राप्त करें।'
                      : 'If someone is threatening physical violence, stalking your real-life location, or at your doorstep, emergency police dispatch must be your first action.'}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => handleDangerChoice(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" aria-hidden="true" />
                      <span>{t.dangerRecheckYesBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDangerChoice(false)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      <span>{t.dangerRecheckNoBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Back navigation */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>{t.stepBack}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: 2-3 Follow-up Questions (Skippable, No PII)
           ========================================================================= */}
        {currentStep === 3 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-slate-400 block mb-1">
                {t.respondStep1SelectionNote}{' '}
                <strong className="text-sky-400">
                  {CATEGORIES.find((c) => c.key === selectedCategory)?.title[language]}
                </strong>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
                {t.respondStep3Title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.respondStep3Subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {followUpQuestions.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
                    <span>Q{idx + 1}.</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {q.question[language]}
                  </h3>
                  {q.hint && (
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {q.hint[language]}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isSelected = followUpAnswers[q.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleFollowUpAnswer(q.id, opt.id)}
                          className={`p-3 rounded-lg border text-xs sm:text-sm font-medium text-left transition-all ${
                            isSelected
                              ? 'bg-sky-600/20 border-sky-400 text-sky-200 ring-1 ring-sky-400/50'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt.label[language]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation for Step 3 */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>{t.stepBack}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(4);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {t.stepSkip}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(4);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 font-bold text-white text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                >
                  <span>{t.stepNext}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: First-Hour Plan Checklist & Account Lockdowns
           ========================================================================= */}
        {currentStep === 4 && (
          <div>
            {/* Header & Category info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {t.respondStep1SelectionNote}{' '}
                  <strong className="text-sky-400">
                    {CATEGORIES.find((c) => c.key === selectedCategory)?.title[language]}
                  </strong>
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
                  {t.respondStep4Title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {t.respondStep4Subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.changeCategoryBtn}</span>
              </button>
            </div>

            {/* Checklist Progress Bar */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">{t.checklistProgressTitle}</span>
                <span className="text-sky-400 font-mono">
                  {completedCount}/{totalPlaybookTasks} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {progressPercent === 100 && (
                <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>{t.checklistAllDone}</span>
                </p>
              )}
            </div>

            {/* Action Tabs: Do Now / Do Not Do / When Ready */}
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setActivePlanTab('doNow')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activePlanTab === 'doNow'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {t.doNowTab} ({currentPlaybook.doNow.length})
              </button>
              <button
                type="button"
                onClick={() => setActivePlanTab('doNotDo')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activePlanTab === 'doNotDo'
                    ? 'bg-red-950 text-red-200 border border-red-800/60 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {t.doNotDoTab} ({currentPlaybook.doNotDo.length})
              </button>
              <button
                type="button"
                onClick={() => setActivePlanTab('whenReady')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activePlanTab === 'whenReady'
                    ? 'bg-sky-950 text-sky-200 border border-sky-800/60 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {t.whenReadyTab} ({currentPlaybook.whenReady.length})
              </button>
            </div>

            {/* Tab Items List */}
            <div className="space-y-4 mb-8">
              {/* Tab 1: Do Now */}
              {activePlanTab === 'doNow' &&
                currentPlaybook.doNow.map((item) => {
                  const isChecked = !!completedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-xl border transition-all ${
                        isChecked
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleChecklistItem(item.id)}
                          className="mt-0.5 text-slate-400 hover:text-sky-400 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400"
                          aria-label={isChecked ? 'Mark incomplete' : 'Mark completed'}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex-1">
                          <h3
                            className={`text-sm sm:text-base font-bold ${
                              isChecked ? 'line-through text-slate-400' : 'text-white'
                            }`}
                          >
                            {item.title[language]}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                            {item.description[language]}
                          </p>

                          {/* Quick Navigation Button if defined */}
                          {item.actionRoute && (
                            <div className="mt-3">
                              <button
                                type="button"
                                onClick={() => onNavigate(item.actionRoute!)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 text-xs font-semibold border border-sky-500/40 transition-colors"
                              >
                                <span>{item.actionLabel ? item.actionLabel[language] : t.continueBtn}</span>
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Tab 2: Do Not Do */}
              {activePlanTab === 'doNotDo' &&
                currentPlaybook.doNotDo.map((item) => {
                  const isChecked = !!completedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-red-900/40"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleChecklistItem(item.id)}
                          className="mt-0.5 text-slate-400 hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-red-400"
                          aria-label={isChecked ? 'Mark incomplete' : 'Mark acknowledged'}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Square className="w-5 h-5 text-red-400" />
                          )}
                        </button>

                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-red-300">
                            {item.title[language]}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                            {item.description[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Tab 3: When Ready */}
              {activePlanTab === 'whenReady' &&
                currentPlaybook.whenReady.map((item) => {
                  const isChecked = !!completedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleChecklistItem(item.id)}
                          className="mt-0.5 text-slate-400 hover:text-sky-400 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400"
                          aria-label={isChecked ? 'Mark incomplete' : 'Mark completed'}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-white">
                            {item.title[language]}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                            {item.description[language]}
                          </p>

                          <div className="mt-3 flex items-center gap-3">
                            {item.actionRoute && (
                              <button
                                type="button"
                                onClick={() => onNavigate(item.actionRoute!)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 text-xs font-semibold border border-sky-500/40 transition-colors"
                              >
                                <span>{item.actionLabel ? item.actionLabel[language] : t.continueBtn}</span>
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            )}

                            {item.actionUrl && (
                              <a
                                href={item.actionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold transition-colors"
                              >
                                <span>{item.actionLabel ? item.actionLabel[language] : t.externalLinkText}</span>
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Platform Lockdown Guides Section */}
            {currentPlaybook.relevantLockdowns.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <KeyRound className="w-5 h-5 text-sky-400" aria-hidden="true" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {t.platformLockdownTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPlaybook.relevantLockdowns.map((platformKey) => {
                    const guide = PLATFORM_LOCKDOWNS[platformKey];
                    if (!guide) return null;
                    return (
                      <div
                        key={platformKey}
                        className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-bold text-sm text-sky-400">{guide.platform}</span>
                            <a
                              href={guide.officialHelpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-sky-300 inline-flex items-center gap-1 font-mono text-[11px]"
                            >
                              <span>Help</span>
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </a>
                          </div>

                          <div className="space-y-3 mb-4">
                            {guide.steps.map((step, idx) => (
                              <div key={idx} className="border-t border-slate-900 pt-2 first:border-0 first:pt-0">
                                <strong className="text-slate-200 block mb-0.5">
                                  {step.title[language]}
                                </strong>
                                <p className="text-slate-400 leading-relaxed">
                                  {step.detail[language]}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 italic">
                          {guide.note[language]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Next Steps Buttons Bar */}
            <div className="mt-10 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                {t.helplinesAlwaysAvailable}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(`/preserve?category=${selectedCategory}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 font-bold text-white text-xs transition-colors"
                >
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  <span>{t.continueToPreserve}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(`/report?category=${selectedCategory}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-xs transition-colors"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>{t.continueToReport}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/track')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-xs transition-colors"
                >
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>{t.continueToTrack}</span>
                </button>
              </div>
            </div>

            {/* Metadata / Legal Disclaimers Bar */}
            <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
              <p>{PLAYBOOK_METADATA.disclaimer[language]}</p>
              <p className="font-mono text-[11px] shrink-0">
                Reviewed: {PLAYBOOK_METADATA.lastReviewed[language]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
