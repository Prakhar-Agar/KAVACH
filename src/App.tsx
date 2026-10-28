/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { EvidenceProvider } from './state/EvidenceContext';
import { TrackingProvider } from './state/TrackingContext';
import { AppStateProvider } from './state/AppStateContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RespondPage } from './pages/RespondPage';
import { PreservePage } from './pages/PreservePage';
import { ReportPage } from './pages/ReportPage';
import { TrackPage } from './pages/TrackPage';
import { HelpPage } from './pages/HelpPage';
import { PrivacyPage } from './pages/PrivacyPage';

const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header currentPath={location.pathname} onNavigate={handleNavigate} />
      
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/respond" element={<RespondPage onNavigate={handleNavigate} />} />
          <Route path="/preserve" element={<PreservePage onNavigate={handleNavigate} />} />
          <Route path="/report" element={<ReportPage onNavigate={handleNavigate} />} />
          <Route path="/track" element={<TrackPage onNavigate={handleNavigate} />} />
          <Route path="/help" element={<HelpPage onNavigate={handleNavigate} />} />
          <Route path="/privacy" element={<PrivacyPage onNavigate={handleNavigate} />} />
          <Route path="*" element={<HomePage onNavigate={handleNavigate} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <EvidenceProvider>
        <TrackingProvider>
          <AppStateProvider>
            <Router>
              <AppShell />
            </Router>
          </AppStateProvider>
        </TrackingProvider>
      </EvidenceProvider>
    </LanguageProvider>
  );
}
