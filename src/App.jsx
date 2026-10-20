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
import StoreCommerce from './components/dashboard/StoreCommerce';
import PublicStorefront from './components/public/PublicStorefront';
import AccountSettings from './components/dashboard/AccountSettings';
import PlaceholderModule from './components/dashboard/PlaceholderModule';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import AuthModal from './components/auth/AuthModal';
import InstagramAuthCallback from './components/auth/InstagramAuthCallback';

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
  const [authMode, setAuthMode] = useState('signup');
  const [selectedStartingPath, setSelectedStartingPath] = useState('scratch');
  const [selectedPlan, setSelectedPlan] = useState('free');
  const isDevOrFounder = import.meta.env.DEV || (typeof window !== 'undefined' && (window.location.search.includes('dev') || localStorage.getItem('vyralify_dev') === 'true'));
  const [showDevToolbar, setShowDevToolbar] = useState(import.meta.env.DEV);

  // Check if Meta OAuth redirect callback
  const isAuthCallback = typeof window !== 'undefined' && window.location.pathname.startsWith('/auth/callback');

  if (isAuthCallback) {
    return (
      <InstagramAuthCallback 
        onComplete={() => {
          window.history.pushState({}, '', '/');
          window.location.reload();
        }} 
      />
    );
  }

  // Check if accessing public creator link-in-bio storefront /u/:slug per v4 spec
  const isPublicStore = typeof window !== 'undefined' && window.location.pathname.startsWith('/u/');
  const storeSlug = isPublicStore ? window.location.pathname.replace(/^\/u\/?/, '') : null;

  if (isPublicStore) {
    return (
      <PublicStorefront 
        slug={storeSlug} 
        onBackToApp={() => {
          window.history.pushState({}, '', '/');
          window.location.reload();
        }}
      />
    );
  }

  const handleLoginSuccess = (payload = {}) => {
    const chosenPath = payload.path || selectedStartingPath || 'scratch';
    const chosenPlan = payload.plan || selectedPlan || 'free';

    setSelectedStartingPath(chosenPath);
    setSelectedPlan(chosenPlan);

    // Apply plan upgrade if chosen
    if (chosenPlan && chosenPlan !== 'free') {
      updateTier(chosenPlan);
    }

    // Set target module based on user's starting choice
    if (chosenPath === 'scratch' || chosenPath === 'beginner') {
      setActiveModule('builder');
    } else {
      setActiveModule('home');
    }

    setViewMode('dashboard');
  };

  // 1. DEFAULT PUBLIC VIEW: The Marketing Landing Page
  if (viewMode === 'landing') {
    return (
      <div className="relative min-h-screen w-full bg-[#F0F6FE] text-[#0F172A]">
        <LandingPage onLoginSuccess={handleLoginSuccess} />

        {/* FOUNDER / DEVELOPER TESTING SWITCHER BADGE (Visible in Dev or with ?dev=true) */}
        {isDevOrFounder && (
          <div className="fixed bottom-3 right-3 z-50">
            {showDevToolbar ? (
              <div className="p-1.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs text-slate-700">
                <span className="text-[10px] font-mono text-[#067CF9] uppercase px-1.5 font-bold">Dev:</span>
                
                <button
                  onClick={() => setViewMode('workbench')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                  title="Switch to Function Test Workbench"
                >
                  <FlaskConical className="w-3 h-3 text-[#067CF9]" />
                  <span>Test Bench</span>
                </button>

                <button
                  onClick={() => {
                    if (!user) loginAsDemo();
                    setViewMode('dashboard');
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#067CF9] hover:bg-[#056AD6] text-white text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Open Product Dashboard App"
                >
                  <LayoutDashboard className="w-3 h-3" />
                  <span>App Workspace</span>
                </button>

                <button
                  onClick={() => setShowDevToolbar(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs px-1 cursor-pointer"
                  title="Hide Dev Bar"
                >
                  &times;
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDevToolbar(true)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-[#067CF9] hover:text-[#056AD6] shadow-lg transition-colors cursor-pointer"
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
      <div className="min-h-screen w-full bg-[#F0F6FE] text-[#0F172A] flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
        <div className="relative z-10 max-w-sm w-full text-center space-y-6">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#067CF9] to-[#3B82F6] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#0F172A] font-headline">Vyralify</span>
            <span className="w-2 h-2 rounded-full bg-[#067CF9] animate-pulse" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Creator Operating System
            </h1>
            <p className="text-xs text-slate-500">
              Page builder, viral content engine, and bio storefront.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-xl shadow-blue-500/5 space-y-3">
            <button
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/25"
            >
              <span>Get Started (Sign Up)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Log In to Workspace</span>
            </button>

            <button
              onClick={() => loginAsDemo()}
              className="w-full py-2 px-3 rounded-lg text-slate-500 hover:text-[#067CF9] text-[11px] font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore as Demo Creator &rarr;</span>
            </button>
          </div>

          <button
            onClick={() => setViewMode('landing')}
            className="text-xs text-slate-500 hover:text-[#067CF9] transition-colors cursor-pointer"
          >
            &larr; Return to Main Landing Page
          </button>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          initialMode={authMode || 'signup'}
          selectedPath={selectedStartingPath}
          selectedPlan={selectedPlan}
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // 4. ONBOARDING WIZARD (If not completed)
  if (!user.onboarded) {
    return (
      <div className="min-h-screen bg-[#08090C] text-neutral-200 flex flex-col justify-center">
        <OnboardingWizard 
          initialTrack={user.onboardingTrack || selectedStartingPath}
          onComplete={(completedData) => {
            const finalTrack = completedData?.track || user?.onboardingTrack || selectedStartingPath;
            if (finalTrack === 'beginner' || finalTrack === 'scratch') {
              setActiveModule('builder');
            } else {
              setActiveModule('home');
            }
          }}
        />
      </div>
    );
  }

  // 5. INTERIOR DASHBOARD APP SHELL
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F0F6FE] text-[#0F172A]">
      <AppShell 
        activeModule={activeModule} 
        onSelectModule={(mod) => setActiveModule(mod)}
        onNavigateLanding={() => setViewMode('landing')}
      >
        {activeModule === 'home' || activeModule === 'analytics' ? (
          <HomeDashboard onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'builder' ? (
          <PageBuilder onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'assistant' ? (
          <AIAssistant onNavigate={(mod) => setActiveModule(mod)} />
        ) : activeModule === 'discover_create' ? (
          <DiscoverCreate onNavigate={(mod) => setActiveModule(mod)} initialTab="studio" />
        ) : activeModule === 'viral_discovery' ? (
          <DiscoverCreate onNavigate={(mod) => setActiveModule(mod)} initialTab="feed" />
        ) : activeModule === 'monetisation' ? (
          <StoreCommerce onNavigate={(mod) => setActiveModule(mod)} initialTab="orders" />
        ) : activeModule === 'store' ? (
          <StoreCommerce onNavigate={(mod) => setActiveModule(mod)} initialTab="builder" />
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
        initialMode={authMode || 'signup'}
        selectedPath={selectedStartingPath}
        selectedPlan={selectedPlan}
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleLoginSuccess}
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
