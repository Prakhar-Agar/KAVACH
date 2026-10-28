/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppState } from '../state/AppStateContext';
import { 
  ShieldAlert, 
  FileCheck2, 
  FileText, 
  Clock, 
  ArrowRight, 
  HelpCircle, 
  Lock, 
  Shield, 
  Info,
  CheckCircle2,
  PlayCircle,
  Compass
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { runDemoScenario, startTour, isDemoMode } = useAppState();

  const handleRunDemo = () => {
    runDemoScenario();
    onNavigate('/respond');
  };

  const modeCards = [
    {
      id: '/respond',
      number: '01',
      title: t.modeRespondTitle,
      subtitle: t.modeRespondSubtitle,
      desc: t.modeRespondDesc,
      icon: ShieldAlert,
      tag: t.modeRespondTag,
      actionLabel: t.openMode,
    },
    {
      id: '/preserve',
      number: '02',
      title: t.modePreserveTitle,
      subtitle: t.modePreserveSubtitle,
      desc: t.modePreserveDesc,
      icon: FileCheck2,
      tag: t.modePreserveTag,
      actionLabel: t.openMode,
    },
    {
      id: '/report',
      number: '03',
      title: t.modeReportTitle,
      subtitle: t.modeReportSubtitle,
      desc: t.modeReportDesc,
      icon: FileText,
      tag: t.modeReportTag,
      actionLabel: t.openMode,
    },
    {
      id: '/track',
      number: '04',
      title: t.modeTrackTitle,
      subtitle: t.modeTrackSubtitle,
      desc: t.modeTrackDesc,
      icon: Clock,
      tag: t.modeTrackTag,
      actionLabel: t.openMode,
    },
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <section className="mb-10 text-left">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-400 mb-3 tracking-wide">
          <span>{t.heroBadge}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{t.heroBadgeNoUploads}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{t.heroBadgeShaOnly}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Action Bar: Run Demo & Guided Tour */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRunDemo}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-sky-500/20 transition-all focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <PlayCircle className="w-4 h-4 text-sky-200" aria-hidden="true" />
            <span>{t.demoRunBtn}</span>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded font-mono text-sky-200 font-normal">
              {t.demoBannerTitle}
            </span>
          </button>

          <button
            type="button"
            onClick={startTour}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            <Compass className="w-4 h-4 text-sky-400" aria-hidden="true" />
            <span>{t.tourStartBtn}</span>
          </button>
        </div>

        {/* Quick Safety Notice */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-sm text-slate-300">
          <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="leading-relaxed">
            <strong className="text-white">{t.homeSafetyNoticeTitle}</strong> {t.homeSafetyNoticeText}
          </div>
        </div>
      </section>

      {/* 4 Core Mode Cards Grid */}
      <section className="mb-12" aria-label={t.homeFourStepsTitle}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {t.homeFourStepsTitle}
          </h2>
          <span className="text-xs text-slate-400">
            {t.homeFourStepsSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modeCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/50 transition-all cursor-pointer shadow-lg focus-within:ring-2 focus-within:ring-sky-400"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(card.id);
                  }
                }}
              >
                <div>
                  {/* Top card row: clean unboxed metadata + icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="font-bold text-sky-400">{card.number}.</span>
                      <span>{card.tag}</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-sky-600/20 group-hover:text-sky-400 border border-slate-700/80 flex items-center justify-center text-slate-300 transition-colors">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
                    {card.title}
                  </h3>
                  <div className="text-xs font-medium text-sky-400 mt-1 mb-3">
                    {card.subtitle}
                  </div>

                  {/* Body prose */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Action Trigger */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium group-hover:text-slate-200">
                    {t.previewTag}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-400 group-hover:translate-x-1 transition-transform">
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Access: Help & Privacy Principles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Help Page Card */}
        <div
          onClick={() => onNavigate('/help')}
          className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-start gap-4"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('/help');
            }
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 shrink-0">
            <HelpCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-white mb-1">
              {t.helpCardTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {t.helpCardDesc}
            </p>
            <span className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1">
              <span>{t.learnMore}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Privacy & Cryptography Card */}
        <div
          onClick={() => onNavigate('/privacy')}
          className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-start gap-4"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('/privacy');
            }
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 shrink-0">
            <Lock className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-white mb-1">
              {t.privacyCardTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {t.privacyCardDesc}
            </p>
            <span className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1">
              <span>{t.learnMore}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </section>

      {/* High-Contrast Privacy Assurances Strip */}
      <section className="mt-12 p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-sky-400" aria-hidden="true" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            {t.homePrivacyStandardTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-slate-100 block">{t.homePrivacyStandard1Title}</strong>
              {t.homePrivacyStandard1Desc}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-slate-100 block">{t.homePrivacyStandard2Title}</strong>
              {t.homePrivacyStandard2Desc}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-slate-100 block">{t.homePrivacyStandard3Title}</strong>
              {t.homePrivacyStandard3Desc}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
