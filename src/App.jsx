import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PageProvider } from './context/PageContext';
import { PlanGatingProvider } from './context/PlanGatingContext';
import { NotificationProvider } from './context/NotificationContext';

// Marketing Landing Page (The Public Face of Vyralify)
import LandingPage from './components/LandingPage';

// Interior App & Workbench (Safely Preserved for Development & Launch)
import FunctionWorkbench from './components/testing/FunctionWorkbench';
import AppShell from './components/layout/AppShell';
import HomeDashboard from './components/dashboard/HomeDashboard';
import PageBuilder from './components/dashboard/PageBuilder';
import AIAssistant from './components/dashboard/AIAssistant';
import DiscoverCreate from './components/dashboard/DiscoverCreate';
import InstagramAutomation from './components/dashboard/InstagramAutomation';
import StoreCommerce from './components/dashboard/StoreCommerce';
import AccountSettings from './components/dashboard/AccountSettings';
import PlaceholderModule from './components/dashboard/PlaceholderModule';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import AuthModal from './components/auth/AuthModal';

import { 
  Sparkles, 
  RotateCcw, 
  Shield, 
  Zap, 
  LogOut, 
  UserCheck, 
  ArrowRight,
  SlidersHorizontal,
  FlaskConical,
  Globe,
  LayoutDashboard
} from 'lucide-react';

function WorkspaceRouter() {
  const { user, tier, updateTier, logout, resetOnboarding, loginAsDemo } = useAuth();
  const [viewMode, setViewMode] = useState('landing'); // 'landing' (Default public site) | 'workbench' (Function tester) | 'dashboard' (Full UI)
  const [activeModule, setActiveModule] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isDevOrFounder = import.meta.env.DEV || (typeof window !== 'undefined' && (window.location.search.includes('dev') || localStorage.getItem('vyralify_dev') === 'true'));
  const [showDevToolbar, setShowDevToolbar] = useState(import.meta.env.DEV);

  // 1. DEFAULT PUBLIC VIEW: The 17-Section Marketing Landing Page
  if (viewMode === 'landing') {
    return (
      <div className="relative min-h-screen w-full bg-[#0A0A0A]">
        <LandingPage onLoginSuccess={() => setViewMode('dashboard')} />

        {/* FOUNDER / DEVELOPER TESTING SWITCHER BADGE (Visible in Dev or with ?dev=true) */}
        {isDevOrFounder && (
          <div className="fixed bottom-3 right-3 z-50">
            {showDevToolbar ? (
              <div className="p-1.5 rounded-xl bg-[#111111]/95 border border-[#2A2A2A] shadow-xl backdrop-blur-md flex items-center gap-2 text-xs text-neutral-300">
                <span className="text-[10px] font-mono text-[#23E598] uppercase px-1.5 font-bold">Dev:</span>
                
                <button
                  onClick={() => setViewMode('workbench')}
                className="px-2.5 py-1 rounded-md bg-[#1C1C1C] hover:bg-[#282828] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-[#333333]"
                title="Switch to Function Test Workbench"
              >
                <FlaskConical className="w-3 h-3 text-[#23E598]" />
                <span>Test Bench</span>
              </button>

              <button
                onClick={() => {
                  if (!user) loginAsDemo();
                  setViewMode('dashboard');
                }}
                className="px-2.5 py-1 rounded-md bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Open Product Dashboard App"
              >
                <LayoutDashboard className="w-3 h-3" />
                <span>App Workspace</span>
              </button>

              <button
                onClick={() => setShowDevToolbar(false)}
                className="text-neutral-500 hover:text-white text-xs px-1 cursor-pointer"
                title="Hide Dev Bar"
              >
                &times;
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDevToolbar(true)}
              className="p-2 rounded-xl bg-[#111111] border border-[#2A2A2A] text-[#23E598] hover:text-white shadow-lg transition-colors cursor-pointer"
              title="Open Dev Switcher"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
        )}
      </div>
    );
  }

  // 2. FUNCTION TEST BENCH (All internal functions safely accessible)
  if (viewMode === 'workbench') {
    return (
      <div className="relative">
        <FunctionWorkbench onToggleFullUi={() => setViewMode('dashboard')} />
        <div className="fixed bottom-3 right-3 z-50">
          <button
            onClick={() => setViewMode('landing')}
            className="px-3 py-1.5 rounded-xl bg-[#0A0A0A] border border-[#23E598]/40 text-[#23E598] font-mono text-xs flex items-center gap-1.5 shadow-xl hover:bg-[#161616] transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>&larr; Back to Landing Page</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. IF USER NOT LOGGED IN FOR DASHBOARD, SHOW LOGIN GATEWAY
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-[#08090C] text-neutral-200 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
        <div className="relative z-10 max-w-sm w-full text-center space-y-6">
          <div className="flex items-center justify-center gap-2.5">
            <img src="/vyralify-logo.png" alt="Vyralify" className="h-7 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">Vyralify</span>
            <span className="w-2 h-2 rounded-full bg-[#23E598] animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Creator Operating System
            </h1>
            <p className="text-xs text-neutral-400">
              Page builder, viral content engine, and bio storefront.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D0F14] border border-white/[0.08] shadow-sm space-y-2.5">
            <button
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Get Started (Sign Up)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 font-medium text-xs border border-white/[0.08] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Log In to Workspace</span>
            </button>

            <button
              onClick={() => loginAsDemo()}
              className="w-full py-1.5 px-3 rounded-lg text-neutral-400 hover:text-[#23E598] text-[11px] font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore as Demo Creator &rarr;</span>
            </button>
          </div>

          <button
            onClick={() => setViewMode('landing')}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            &larr; Return to Main Landing Page
          </button>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    );
  }

  // 4. ONBOARDING WIZARD (If not completed)
  if (!user.onboarded) {
    return (
      <div className="min-h-screen bg-[#08090C] text-neutral-200 flex flex-col justify-center">
        <OnboardingWizard />
      </div>
    );
  }

  // 5. INTERIOR DASHBOARD APP SHELL
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F8FAFC] dark:bg-[#08090C] text-neutral-900 dark:text-neutral-200">
      <AppShell 
        activeModule={activeModule} 
        onSelectModule={(mod) => setActiveModule(mod)}
      >
        {activeModule === 'home' ? (
          <HomeDashboard onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'builder' ? (
          <PageBuilder onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'assistant' ? (
          <AIAssistant onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'discover_create' ? (
          <DiscoverCreate onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'automation' ? (
          <InstagramAutomation onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'store' ? (
          <StoreCommerce onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'settings' ? (
          <AccountSettings onNavigate={(mod) => setActiveModule(mod)} />
        ) : (
          <PlaceholderModule moduleId={activeModule} onNavigate={(mod) => setActiveModule(mod)} />
        )}
      </AppShell>

      {/* FOUNDER / DEVELOPER TESTING FLOATING BAR */}
      <div className="fixed bottom-3 right-3 z-50">
        {showDevToolbar ? (
          <div className="p-1.5 rounded-xl bg-white/95 dark:bg-[#111319]/90 border border-neutral-200 dark:border-white/[0.08] shadow-md backdrop-blur-md flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-300">
            <button
              onClick={() => setViewMode('landing')}
              className="px-2 py-0.5 rounded-md bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] text-[10px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
              title="Return to Main Landing Page"
            >
              <Globe className="w-2.5 h-2.5" />
              <span>Landing Page</span>
            </button>

            <button
              onClick={() => setViewMode('workbench')}
              className="px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-white/[0.08] hover:bg-neutral-300 text-neutral-800 dark:text-neutral-200 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
              title="Return to Function Test Workbench"
            >
              <FlaskConical className="w-2.5 h-2.5" />
              <span>Test Bench</span>
            </button>

            <span className="text-[10px] font-mono text-neutral-500 uppercase px-1 font-semibold">Tier:</span>

            {/* Tier Switcher */}
            <div className="flex items-center gap-0.5 bg-neutral-100 dark:bg-black/40 p-0.5 rounded-lg border border-neutral-200/80 dark:border-white/[0.05]">
              {['free', 'pro', 'elite'].map((t) => (
                <button
                  key={t}
                  onClick={() => updateTier(t)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                    tier === t 
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs' 
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                  title={`Switch to ${t.toUpperCase()}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Reset Onboarding Button */}
            <button
              onClick={() => resetOnboarding()}
              className="px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset user and launch Onboarding Wizard again"
            >
              <RotateCcw className="w-2.5 h-2.5 text-neutral-500" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setShowDevToolbar(false)}
              className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 text-xs px-1 cursor-pointer"
              title="Minimize"
            >
              &times;
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDevToolbar(true)}
            className="p-2 rounded-xl bg-white dark:bg-[#111319] border border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white shadow-md transition-colors cursor-pointer"
            title="Open Dev Controls"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PageProvider>
          <PlanGatingProvider>
            <NotificationProvider>
              <WorkspaceRouter />
            </NotificationProvider>
          </PlanGatingProvider>
        </PageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
