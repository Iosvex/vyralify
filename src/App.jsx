import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PageProvider } from './context/PageContext';
import { PlanGatingProvider } from './context/PlanGatingContext';
import { NotificationProvider } from './context/NotificationContext';
import AppShell from './components/layout/AppShell';
import HomeDashboard from './components/dashboard/HomeDashboard';
import PageBuilder from './components/dashboard/PageBuilder';
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
  Sun,
  Moon
} from 'lucide-react';

function WorkspaceRouter() {
  const { user, tier, updateTier, logout, resetOnboarding, loginAsDemo } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [activeModule, setActiveModule] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showDevToolbar, setShowDevToolbar] = useState(true);

  // If user is not logged in, show clean White & Green login gateway
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#08090C] text-neutral-900 dark:text-neutral-200 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
        <div className="relative z-10 max-w-sm w-full text-center space-y-6">
          <div className="flex items-center justify-center gap-2.5">
            <img src="/vyralify-logo.png" alt="Vyralify" className="h-7 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">Vyralify</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Creator Operating System
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Page builder, viral content engine, and bio storefront.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.08] shadow-sm space-y-2.5">
            <button
              onClick={() => {
                setAuthMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Get Started (Sign Up)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 font-medium text-xs border border-neutral-200/70 dark:border-white/[0.08] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Log In to Workspace</span>
            </button>

            <button
              onClick={() => loginAsDemo()}
              className="w-full py-1.5 px-3 rounded-lg text-neutral-500 hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-400 text-[11px] font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore as Demo Creator &rarr;</span>
            </button>
          </div>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
            New user? Click "Get Started" to launch your 3-step setup.
          </p>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    );
  }

  // If user has not completed onboarding, show Dual Branching Wizard
  if (!user.onboarded) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#08090C] text-neutral-900 dark:text-neutral-200 flex flex-col justify-center">
        <OnboardingWizard />
      </div>
    );
  }

  // If user is onboarded, render AppShell with active module
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
        ) : (
          <PlaceholderModule moduleId={activeModule} onNavigate={(mod) => setActiveModule(mod)} />
        )}
      </AppShell>

      {/* FOUNDER / DEVELOPER TESTING FLOATING BAR - Clean White & Green */}
      <div className="fixed bottom-3 right-3 z-50">
        {showDevToolbar ? (
          <div className="p-1.5 rounded-xl bg-white/95 dark:bg-[#111319]/90 border border-neutral-200 dark:border-white/[0.08] shadow-md backdrop-blur-md flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-300">
            <span className="text-[10px] font-mono text-neutral-500 uppercase px-1 font-semibold">Dev:</span>

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

            {/* Quick Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-2.5 h-2.5 text-amber-500" /> : <Moon className="w-2.5 h-2.5 text-neutral-600" />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

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
