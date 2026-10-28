/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  FileCheck2, 
  FileText, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Layers
} from 'lucide-react';

interface ModePlaceholderPageProps {
  mode: 'preserve' | 'report' | 'track';
  onNavigate: (path: string) => void;
}

export const ModePlaceholderPage: React.FC<ModePlaceholderPageProps> = ({ mode, onNavigate }) => {
  const { t } = useLanguage();

  const modeConfigs = {
    preserve: {
      number: '02',
      title: t.modePreserveTitle,
      subtitle: t.modePreserveSubtitle,
      icon: FileCheck2,
      badge: t.modePreserveTag,
      summary: t.modePreserveDesc,
      plannedFeatures: [
        {
          heading: t.modePreserveFeature1Title,
          details: t.modePreserveFeature1Desc,
        },
        {
          heading: t.modePreserveFeature2Title,
          details: t.modePreserveFeature2Desc,
        },
        {
          heading: t.modePreserveFeature3Title,
          details: t.modePreserveFeature3Desc,
        },
      ],
      legalContext: t.modePreserveLegal,
    },
    report: {
      number: '03',
      title: t.modeReportTitle,
      subtitle: t.modeReportSubtitle,
      icon: FileText,
      badge: t.modeReportTag,
      summary: t.modeReportDesc,
      plannedFeatures: [
        {
          heading: t.modeReportFeature1Title,
          details: t.modeReportFeature1Desc,
        },
        {
          heading: t.modeReportFeature2Title,
          details: t.modeReportFeature2Desc,
        },
        {
          heading: t.modeReportFeature3Title,
          details: t.modeReportFeature3Desc,
        },
      ],
      legalContext: t.modeReportLegal,
    },
    track: {
      number: '04',
      title: t.modeTrackTitle,
      subtitle: t.modeTrackSubtitle,
      icon: Clock,
      badge: t.modeTrackTag,
      summary: t.modeTrackDesc,
      plannedFeatures: [
        {
          heading: t.modeTrackFeature1Title,
          details: t.modeTrackFeature1Desc,
        },
        {
          heading: t.modeTrackFeature2Title,
          details: t.modeTrackFeature2Desc,
        },
        {
          heading: t.modeTrackFeature3Title,
          details: t.modeTrackFeature3Desc,
        },
      ],
      legalContext: t.modeTrackLegal,
    },
  };

  const config = modeConfigs[mode];
  const Icon = config.icon;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors mb-6 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 focus-visible:outline-2 focus-visible:outline-sky-400"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>{t.backToHome}</span>
      </button>

      {/* Main Module Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-xl">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <span className="text-sky-400 font-bold">{config.number}.</span>
              <span>{config.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
              {config.title}
            </h1>
            <p className="text-sm font-medium text-sky-400 mt-1">
              {config.subtitle}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0">
            <Icon className="w-8 h-8" aria-hidden="true" />
          </div>
        </div>

        {/* Foundation Notice */}
        <div className="mt-8 p-5 rounded-xl bg-slate-950 border border-sky-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-sky-400 shrink-0" aria-hidden="true" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block font-mono">
                {t.comingSoonBadge}
              </span>
              <p className="text-sm text-slate-200 mt-0.5">
                {t.comingSoonNotice}
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
            {t.zeroNetworkNotice}
          </span>
        </div>

        {/* Module Scope */}
        <div className="mt-8">
          <h2 className="text-base font-bold text-white mb-2">
            {t.moduleScopeTitle}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {config.summary}
          </p>
        </div>

        {/* Feature Roadmap List */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono mb-4">
            {t.plannedFeaturesTitle}
          </h3>
          <div className="space-y-4">
            {config.plannedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{feat.heading}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{feat.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Context Notice */}
        <div className="mt-8 p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block mb-1">{t.applicableLawTitle}</strong>
          {config.legalContext}
        </div>

        {/* Privacy Guarantee */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>
            <strong className="text-slate-200">{t.hermeticPrivacyTitle}</strong> {t.hermeticPrivacyDesc}
          </span>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t.backToHome}</span>
          </button>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => onNavigate('/privacy')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {t.navPrivacy}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/help')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {t.navHelp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
