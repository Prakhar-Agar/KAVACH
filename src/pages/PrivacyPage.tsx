/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  FileCode, 
  ArrowLeft,
  Scale
} from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const doesProveItems = [
    {
      title: t.privacyProves1Title,
      desc: t.privacyProves1Desc,
    },
    {
      title: t.privacyProves2Title,
      desc: t.privacyProves2Desc,
    },
    {
      title: t.privacyProves3Title,
      desc: t.privacyProves3Desc,
    },
  ];

  const doesNotProveItems = [
    {
      title: t.privacyNotProves1Title,
      desc: t.privacyNotProves1Desc,
    },
    {
      title: t.privacyNotProves2Title,
      desc: t.privacyNotProves2Desc,
    },
    {
      title: t.privacyNotProves3Title,
      desc: t.privacyNotProves3Desc,
    },
    {
      title: t.privacyNotProves4Title,
      desc: t.privacyNotProves4Desc,
    },
  ];

  const corePrinciples = [
    {
      rule: '1. In-Browser Isolation',
      body: t.homePrivacyStandard1Desc,
    },
    {
      rule: '2. Zero Intimate Media Retention',
      body: t.privacyDeviceCard1Desc,
    },
    {
      rule: '3. Explicit Consent for AI Assistance',
      body: t.privacyDeviceCard2Desc,
    },
    {
      rule: '4. Secret Segregation',
      body: t.privacyDeviceCard3Desc,
    },
    {
      rule: '5. No Logging or Trackers',
      body: t.homePrivacyStandard3Desc,
    },
    {
      rule: '6. Metadata-Only Persistence',
      body: t.footerIsolationText,
    },
    {
      rule: '7. Cryptographic & Legal Honesty',
      body: t.privacyCryptoDesc,
    },
    {
      rule: '8. Synthetic Demonstration Data',
      body: t.homeSafetyNoticeText,
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

      {/* Hero Header */}
      <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-xl mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>{t.privacyBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Plus_Jakarta_Sans','Noto_Sans_Devanagari',sans-serif]">
          {t.privacyTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {t.privacySubtitle}
        </p>
      </div>

      {/* Section 1: What Stays on Your Device */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400">
            <Lock className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{t.privacyStaysDeviceTitle}</h2>
            <p className="text-xs text-sky-400">{t.privacyStaysDeviceSubtitle}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {t.privacyStaysDeviceDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-white block text-sm mb-1">{t.privacyDeviceCard1Title}</strong>
            <p className="text-slate-400 leading-relaxed">
              {t.privacyDeviceCard1Desc}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-white block text-sm mb-1">{t.privacyDeviceCard2Title}</strong>
            <p className="text-slate-400 leading-relaxed">
              {t.privacyDeviceCard2Desc}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-white block text-sm mb-1">{t.privacyDeviceCard3Title}</strong>
            <p className="text-slate-400 leading-relaxed">
              {t.privacyDeviceCard3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Truth in Cryptography */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
            <Scale className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{t.privacyCryptoTitle}</h2>
            <p className="text-xs text-sky-400">{t.privacyCryptoSubtitle}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {t.privacyCryptoDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Hashing Does Prove */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-900/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.privacyWhatProvesTitle}</span>
            </div>
            <ul className="space-y-3">
              {doesProveItems.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300">
                  <strong className="text-slate-100 block mb-0.5">{item.title}</strong>
                  <span className="text-slate-400 leading-relaxed">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Hashing Does NOT Prove */}
          <div className="p-5 rounded-xl bg-slate-950 border border-red-900/40">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
              <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{t.privacyWhatDoesNotProveTitle}</span>
            </div>
            <ul className="space-y-3">
              {doesNotProveItems.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-300">
                  <strong className="text-slate-100 block mb-0.5">{item.title}</strong>
                  <span className="text-slate-400 leading-relaxed">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: The 8 Non-Negotiable Privacy Rules */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 mb-8">
        <h2 className="text-xl font-bold text-white mb-2">
          {t.privacyPrinciplesHeading}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          {t.privacyPrinciplesSubheading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {corePrinciples.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-xs font-bold font-mono text-sky-400 uppercase tracking-wide mb-1">
                {item.rule}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Technical Verification Sample */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs">
        <div className="flex items-center gap-2 text-slate-200 font-bold mb-2">
          <FileCode className="w-4 h-4 text-sky-400" aria-hidden="true" />
          <span>{t.privacyCodeVerificationTitle}</span>
        </div>
        <p className="text-slate-400 mb-3 leading-relaxed">
          {t.privacyCodeVerificationDesc}
        </p>
        <pre className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`// 100% In-Browser Cryptographic Digest (Zero Server Network Activity)
async function computeLocalSha256(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}`}
        </pre>
      </section>
    </div>
  );
};
