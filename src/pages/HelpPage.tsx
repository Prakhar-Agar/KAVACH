/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  PhoneCall, 
  ExternalLink, 
  ShieldAlert, 
  Scale, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  BookOpen
} from 'lucide-react';

interface HelpPageProps {
  onNavigate: (path: string) => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const helplines = [
    {
      number: '112',
      name: t.helpline112Title,
      purpose: t.helpline112Desc,
      availability: '24/7 · ERSS',
      action: `${t.helpline112Title.split('—')[0].trim()}`,
      href: 'tel:112',
    },
    {
      number: '181',
      name: t.helpline181Title,
      purpose: t.helpline181Desc,
      availability: '24/7 · Sakhi / WHL',
      action: `${t.helpline181Title.split('—')[0].trim()}`,
      href: 'tel:181',
    },
    {
      number: '1930',
      name: t.helpline1930Title,
      purpose: t.helpline1930Desc,
      availability: '24/7 · I4C / MHA',
      action: `${t.helpline1930Title.split('—')[0].trim()}`,
      href: 'tel:1930',
    },
  ];

  const legalRights = [
    {
      title: t.helpRight1Title,
      statute: t.helpRight1Statute,
      body: t.helpRight1Body,
    },
    {
      title: t.helpRight2Title,
      statute: t.helpRight2Statute,
      body: t.helpRight2Body,
    },
    {
      title: t.helpRight3Title,
      statute: t.helpRight3Statute,
      body: t.helpRight3Body,
    },
    {
      title: t.helpRight4Title,
      statute: t.helpRight4Statute,
      body: t.helpRight4Body,
    },
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back to Home */}
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors mb-6 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>{t.backToHome}</span>
      </button>

      {/* Site-wide General Legal Notice Banner */}
      <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="leading-relaxed">
          <strong className="text-amber-100 font-semibold">{t.trackUnverifiedLegalBadge}:</strong> {t.generalLegalNotice}
        </div>
      </div>

      {/* Hero Header */}
      <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-xl mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
          <ShieldAlert className="w-4 h-4" aria-hidden="true" />
          <span>{t.helpBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
          {t.helpTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {t.helpSubtitle}
        </p>

        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-900/40 text-xs text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            {t.helpVerificationNotice}
          </div>
        </div>
      </div>

      {/* Emergency Helpline Numbers */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">
          {t.helpDirectHelplinesTitle}
        </h2>

        <div className="space-y-4">
          {helplines.map((line) => (
            <div
              key={line.number}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-sky-400 tabular-nums">
                    {line.number}
                  </span>
                  <h3 className="text-base font-bold text-white">{line.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mb-2 leading-relaxed">
                  {line.purpose}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                  <span>{line.availability}</span>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={line.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-white text-sm transition-colors shadow-md w-full sm:w-auto"
                >
                  <PhoneCall className="w-4 h-4" aria-hidden="true" />
                  <span>{line.action}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Government Portals */}
      <section className="mb-10 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-sky-400" aria-hidden="true" />
          <h2 className="text-xl font-bold text-white">{t.helpOfficialPortalsTitle}</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t.helpPortalNcrpTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.helpPortalNcrpDesc}
              </p>
            </div>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition-colors shrink-0"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t.helpPortalNcwTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.helpPortalNcwDesc}
              </p>
            </div>
            <a
              href="http://ncwapps.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition-colors shrink-0"
            >
              <span>ncwapps.nic.in</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Your Legal Rights in India */}
      <section className="mb-10 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-sky-400" aria-hidden="true" />
          <div>
            <h2 className="text-xl font-bold text-white">{t.helpLegalRightsTitle}</h2>
            <p className="text-xs text-sky-400">{t.helpLegalRightsSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {legalRights.map((right, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block mb-1">
                {right.statute}
              </span>
              <h3 className="text-sm font-bold text-white mb-2">{right.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{right.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Guide: What to Prepare Before Reporting */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
          {t.helpChecklistTitle}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t.helpChecklist1}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t.helpChecklist2}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t.helpChecklist3}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
