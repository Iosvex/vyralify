import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Rocket, 
  Search, 
  Bot, 
  ShoppingBag, 
  Settings, 
  Bell, 
  ChevronDown, 
  Plus, 
  LogOut, 
  Check, 
  ExternalLink,
  Layers,
  Zap,
  Crown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import UpgradeModal from '../common/UpgradeModal';
import GlobalSearchModal from '../common/GlobalSearchModal';
import ConnectAccountModal from '../common/ConnectAccountModal';

export default function AppShell({ activeModule, onSelectModule, children }) {
  const { user, tier, aiCredits, logout } = useAuth();
  const { pages, activePage, switchPage, canAddMorePages, getPageLimit } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'builder', label: 'Page Builder', icon: Rocket },
    { id: 'discover_create', label: 'Discover & Create', icon: Search },
    { id: 'automation', label: 'Automations', icon: Bot, isLocked: tier === 'free' },
    { id: 'store', label: 'Store & Commerce', icon: ShoppingBag }
  ];

  const handleConnectPageClick = () => {
    setIsPageDropdownOpen(false);
    if (!canAddMorePages()) {
      openUpgradeModal('multi_page', `You've reached your ${tier.toUpperCase()} plan limit of ${getPageLimit()} page(s). Upgrade to add more accounts.`);
    } else {
      setIsConnectModalOpen(true);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#08090C] text-neutral-900 dark:text-neutral-200 font-sans overflow-hidden select-none antialiased">
      
      {/* 1. OG WHITE & GREEN SIDEBAR */}
      <aside className="w-60 shrink-0 bg-white dark:bg-[#0C0D12] border-r border-neutral-200/80 dark:border-white/[0.06] flex flex-col justify-between z-30">
        
        {/* Top: Logo & Tier Chip */}
        <div>
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-200/80 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <img 
                src="/vyralify-logo.png" 
                alt="Vyralify" 
                className="h-5 w-auto object-contain" 
              />
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                Vyralify
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Plan Tier Badge */}
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${
              tier === 'elite'
                ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20'
                : tier === 'pro'
                ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/[0.08]'
            }`}>
              {tier}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-white/[0.08] text-emerald-800 dark:text-white font-semibold border border-emerald-200/80 dark:border-white/[0.08] shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100/80 dark:bg-white/[0.06] text-emerald-700 dark:text-neutral-300 font-mono text-[9px] font-medium border border-emerald-200 dark:border-white/[0.06]">
                      {item.badge}
                    </span>
                  )}
                  {item.isLocked && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/[0.08]">
                      PRO
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Plan Meter & User Profile */}
        <div className="p-2.5 border-t border-neutral-200/80 dark:border-white/[0.06] space-y-2">
          
          {/* Plan Quota Card */}
          <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-[#111319] border border-neutral-200/80 dark:border-white/[0.06] text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-mono">AI Credits</span>
              <span className="font-mono text-neutral-700 dark:text-neutral-300 text-[11px] font-medium">
                {aiCredits.limit > 90000 ? 'Unlimited' : `${aiCredits.limit - aiCredits.usedToday} / ${aiCredits.limit}`}
              </span>
            </div>

            {/* Progress bar */}
            {aiCredits.limit < 90000 && (
              <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-2">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (aiCredits.usedToday / aiCredits.limit) * 100)}%` }}
                />
              </div>
            )}

            <button
              onClick={() => openUpgradeModal('general', 'Upgrade for higher AI limits and automation.')}
              className="w-full py-1.5 px-2 rounded-lg bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.09] text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/[0.08] text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <Zap className="w-3 h-3 text-emerald-600 dark:text-neutral-400" />
              <span>{tier === 'free' ? 'Upgrade Plan' : 'Manage Plan'}</span>
            </button>
          </div>

          {/* User Account / Profile Row */}
          <div className="relative">
            <div 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"}
                  alt={user?.displayName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-white/10"
                />
                <div className="truncate text-left">
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                    {user?.displayName || "Ahmad Khan"}
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                    {user?.email || "ahmad@vyralify.in"}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute bottom-11 left-0 right-0 bg-white dark:bg-[#12141A] border border-neutral-200 dark:border-white/[0.1] rounded-xl shadow-lg p-1 z-40 text-xs">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onSelectModule('settings');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Account & Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* 2. MAIN VIEW AREA (Header + Module View) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC] dark:bg-[#08090C]">
        
        {/* WHITE & GREEN TOPBAR */}
        <header className="h-12 border-b border-neutral-200/80 dark:border-white/[0.06] bg-white/95 dark:bg-[#0C0D12]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
          
          {/* LEFT: Multi-Page Context Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] hover:border-neutral-300 dark:hover:border-white/15 text-xs text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer shadow-xs"
            >
              <img
                src={activePage?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"}
                alt={activePage?.handle}
                className="w-4 h-4 rounded-full object-cover ring-1 ring-emerald-500/30"
              />
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white">
                @{activePage?.handle || "select.page"}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 bg-neutral-200/70 dark:bg-white/[0.04] px-1 rounded font-mono">
                {activePage?.followersCount || "0"}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {/* Page Switcher Menu */}
            {isPageDropdownOpen && (
              <div className="absolute top-10 left-0 w-60 bg-white dark:bg-[#12141C] border border-neutral-200 dark:border-white/[0.1] rounded-xl shadow-xl p-1.5 z-50 text-xs">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-neutral-400 font-semibold">
                  Switch Account ({pages.length}/{getPageLimit()})
                </div>

                <div className="space-y-0.5 my-1 max-h-48 overflow-y-auto">
                  {pages.map((p) => {
                    const isSelected = p.id === activePage?.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          switchPage(p.id);
                          setIsPageDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-white/[0.08] text-emerald-800 dark:text-white font-semibold border border-emerald-200 dark:border-white/10'
                            : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04] text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img src={p.avatar} alt={p.handle} className="w-4 h-4 rounded-full object-cover shrink-0" />
                          <div className="truncate">
                            <div className="truncate font-mono text-xs font-medium">@{p.handle}</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{p.category}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-1.5 border-t border-neutral-200/80 dark:border-white/[0.06]">
                  <button
                    onClick={handleConnectPageClick}
                    className="w-full py-1.5 px-2 rounded-md bg-emerald-50 hover:bg-emerald-100/70 text-emerald-700 text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer border border-emerald-200/70"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Connect Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Search, AI Credits, Theme Toggle, Notifications */}
          <div className="flex items-center gap-2">
            
            {/* Minimal Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.06] hover:border-neutral-300 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <Search className="w-3 h-3 text-neutral-400" />
              <span className="text-[11px]">Search</span>
              <kbd className="px-1 py-0.2 rounded bg-white dark:bg-white/[0.06] text-[9px] font-mono text-neutral-500 border border-neutral-200 dark:border-white/[0.08]">
                ⌘K
              </kbd>
            </button>

            {/* AI Credit Usage Pill */}
            <div 
              onClick={() => openUpgradeModal('ai_credits', 'Boost your daily AI limit with Pro.')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.06] text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-emerald-700 transition-colors cursor-pointer"
              title="Daily AI generation credits remaining"
            >
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-neutral-400" />
              <span className="text-[11px] font-medium">{aiCredits.limit > 90000 ? 'Unlim' : `${aiCredits.limit - aiCredits.usedToday} AI left`}</span>
            </div>

            {/* Prominent Theme Toggle (OG White & Green vs Dark) */}
            <div className="flex items-center p-0.5 rounded-lg bg-neutral-100/90 dark:bg-white/[0.06] border border-neutral-200/90 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => isDark && toggleTheme()}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  !isDark
                    ? 'bg-white text-emerald-800 font-semibold shadow-xs border border-neutral-200/60'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
                title="Switch to OG White & Green Theme"
              >
                <Sun className="w-3 h-3 text-amber-500" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => !isDark && toggleTheme()}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  isDark
                    ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Switch to Dark Theme"
              >
                <Moon className="w-3 h-3 text-neutral-400" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-1.5 rounded-lg bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-3.5 h-3.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[8px] font-mono font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-10 w-80 sm:w-88 bg-white dark:bg-[#12141C] border border-neutral-200 dark:border-white/[0.1] rounded-xl shadow-xl p-2.5 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-white/[0.06]">
                    <span className="font-semibold text-neutral-900 dark:text-white text-xs">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[10px] text-emerald-600 hover:underline font-mono cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 my-1.5 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-neutral-400 font-mono text-xs">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            n.read 
                              ? 'bg-transparent border-neutral-200/50 dark:border-white/[0.04] text-neutral-500' 
                              : 'bg-emerald-50/50 dark:bg-white/[0.04] border-emerald-200/80 dark:border-white/[0.08] text-neutral-900 dark:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-[11px] text-neutral-900 dark:text-white">
                              {n.title}
                            </span>
                            <span className="text-[9px] text-neutral-400 font-mono shrink-0">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* 3. DYNAMIC MODULE VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <UpgradeModal />
      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectModule={onSelectModule}
      />
    </div>
  );
}
