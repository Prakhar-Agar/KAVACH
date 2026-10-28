/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { PhoneCall, ExternalLink, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const helplines = [
    {
      number: '112',
      title: t.helpline112Title,
      desc: t.helpline112Desc,
      href: 'tel:112',
    },
    {
      number: '181',
      title: t.helpline181Title,
      desc: t.helpline181Desc,
      href: 'tel:181',
    },
    {
      number: '1930',
      title: t.helpline1930Title,
      desc: t.helpline1930Desc,
      href: 'tel:1930',
    },
  ];

  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-800 text-slate-300">
      {/* Primary Emergency Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white uppercase font-mono">
                {t.emergencyDisclaimer}
              </span>
            </div>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              <span>{t.officialPortalLink}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Helpline Quick-Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {helplines.map((item) => (
              <a
                key={item.number}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 transition-all text-left focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <span className="font-mono text-sky-400 font-extrabold text-lg tracking-tight tabular-nums">
                      {item.number}
                    </span>
                    <span className="truncate text-xs sm:text-sm font-medium text-slate-200">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{item.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 shrink-0">
                  <PhoneCall className="w-4 h-4 text-sky-400" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Notice & Integrity Assurance Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
            <span>
              <strong className="text-slate-200">{t.footerIsolationTitle}</strong> {t.footerIsolationText}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{t.footerZeroTrackers}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>{t.footerDisclaimerText}</p>
          <p className="shrink-0 text-slate-500 font-mono text-[11px]">
            {t.quickExitEscHint}
          </p>
        </div>
      </div>
    </footer>
  );
};
