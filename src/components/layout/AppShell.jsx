import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Settings, 
  Bell, 
  ChevronDown, 
  Plus, 
  LogOut, 
  Check, 
  Zap, 
  Crown, 
  Globe, 
  ArrowRight,
  TrendingUp,
  Compass,
  FileText,
  User,
  Layers,
  BarChart2,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import UpgradeModal from '../common/UpgradeModal';
import GlobalSearchModal from '../common/GlobalSearchModal';
import ConnectAccountModal from '../common/ConnectAccountModal';

export default function AppShell({ activeModule, onSelectModule, onNavigateLanding, children }) {
  const { user, tier, aiCredits, logout } = useAuth();
  const { pages, activePage, switchPage, canAddMorePages, getPageLimit } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation Items matching the streamlined UX
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'builder', label: 'Page Builder', icon: User },
    { id: 'discover_create', label: 'Discover & Create', icon: Compass },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'store', label: 'Store & Commerce', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    onSelectModule(id);
  };

  const isNavActive = (id) => {
    if (id === 'discover_create') {
      return activeModule === 'discover_create' || activeModule === 'viral_discovery';
    }
    if (id === 'store') {
      return activeModule === 'store' || activeModule === 'monetisation';
    }
    return activeModule === id;
  };

  const handleConnectPageClick = () => {
    setIsPageDropdownOpen(false);
    if (!canAddMorePages()) {
      openUpgradeModal('multi_page', `You've reached your ${tier.toUpperCase()} plan limit of ${getPageLimit()} page(s). Upgrade to add more accounts.`);
    } else {
      setIsConnectModalOpen(true);
    }
  };

  const currentHandle = activePage?.handle ? activePage.handle.replace(/^@/, '') : (user?.displayName ? user.displayName.toLowerCase().replace(/\s+/g, '') : 'maaz');

  const creditsLimit = aiCredits?.limit || (tier === 'pro' ? 300 : tier === 'elite' ? 99999 : 20);
  const creditsUsed = aiCredits?.usedToday || 0;
  const creditsRemaining = Math.max(0, creditsLimit - creditsUsed);
  const isUnlimited = creditsLimit > 90000;

  return (
    <div className="flex h-screen w-full bg-[#F0F6FE] text-[#0F172A] font-sans overflow-hidden select-none antialiased">
      
      {/* 1. FLOATING FROSTED WHITE SIDEBAR (Per Image 1 & Blueprint) */}
      <aside className="w-64 shrink-0 m-4 mr-0 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_4px_24px_rgba(6,124,249,0.06)] flex flex-col justify-between z-30">
        
        {/* Top: Logo */}
        <div>
          <div 
            onClick={onNavigateLanding}
            className="flex items-center px-5 py-4 border-b border-[rgba(6,124,249,0.08)] cursor-pointer hover:opacity-90 transition-opacity"
            title="Vyralify — Back to Home"
          >
            <img 
              src="/vyralify-logo.png" 
              alt="Vyralify" 
              className="h-7 w-auto object-contain" 
            />
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#067CF9] font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#067CF9]' : 'text-[#64748B]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Pro Plan Card */}
        <div className="p-3">
          <div 
            onClick={() => openUpgradeModal('general', 'Upgrade to Pro to unlock unlimited generations.')}
            className="p-3 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] hover:border-[#067CF9]/30 transition-all cursor-pointer flex items-center justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
                <Crown className="w-4 h-4 text-[#D97706]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#0F172A]">Pro Plan</div>
                <div className="text-[10px] text-[#64748B]">Everything unlocked</div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#94A3B8] -rotate-90 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA (Header + Module View) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-4">
        
        {/* FLOATING TOPBAR (Per Image 1 & Blueprint) */}
        <header className="h-14 bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl shadow-[0_2px_16px_rgba(6,124,249,0.04)] px-5 flex items-center justify-between shrink-0 mb-4 z-20">
          
          {/* LEFT: Search Box (Minimalist, without ⌘K clutter) */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setIsSearchOpen(true)}
              placeholder="Search features, hooks, assets..."
              className="w-full bg-[#F8FAFC] border border-transparent focus:border-[#067CF9]/30 text-xs rounded-xl pl-9 pr-4 py-2 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden transition-all"
            />
          </div>

          {/* RIGHT: AI Credits Pill + Action Buttons (+ Create, Store, Ask AI) | Bell | Profile Pill */}
          <div className="flex items-center gap-3">
            
            {/* AI Credits Quota Pill Widget in Top Strip */}
            <div
              onClick={() => openUpgradeModal('ai_credits', 'Upgrade to Pro to unlock 300 daily AI credits & vision models!')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.18)] hover:border-[#067CF9]/40 transition-all cursor-pointer shadow-2xs group"
              title="Daily AI Credits Quota (Click to Upgrade)"
            >
              <div className="w-5 h-5 rounded-lg bg-[#067CF9] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Zap className="w-3 h-3 fill-current" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-bold text-xs text-[#0F172A] font-mono">
                    {isUnlimited ? '∞ Unlimited' : `${creditsRemaining} / ${creditsLimit}`}
                  </span>
                  <span className="text-[10px] font-semibold text-[#067CF9] uppercase tracking-wider">Credits</span>
                </div>
                {!isUnlimited && (
                  <div className="w-20 bg-[#DBEAFE] h-1 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-[#067CF9] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, (creditsRemaining / creditsLimit) * 100))}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* + Create (The ONLY Solid Electric Blue CTA button) */}
            <button
              onClick={() => onSelectModule('discover_create')}
              className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#056ad6] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create</span>
            </button>

            {/* Store Button */}
            <button
              onClick={() => onSelectModule('store')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-[rgba(6,124,249,0.14)] text-[#0F172A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Store</span>
            </button>

            {/* Ask AI Button */}
            <button
              onClick={() => onSelectModule('assistant')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-[rgba(6,124,249,0.14)] text-[#0F172A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#067CF9]" />
              <span>Ask AI</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] transition-colors relative cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
                )}
              </button>

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white border border-[rgba(6,124,249,0.12)] rounded-2xl shadow-xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <span className="font-semibold text-[#0F172A]">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[10px] text-[#067CF9] hover:underline font-mono cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-1.5 my-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-[#94A3B8] text-xs">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} onClick={() => markAsRead(n.id)} className="p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                          <div className="font-semibold text-[#0F172A] text-xs">{n.title}</div>
                          <p className="text-[11px] text-[#64748B] mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill: Avatar + @handle + chevron */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] cursor-pointer transition-colors shadow-xs"
              >
                <img
                  src={getSafeAvatarUrl(activePage?.avatar, currentHandle)}
                  alt={currentHandle}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getSafeAvatarUrl('', currentHandle);
                  }}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-[#067CF9]/30"
                />
                <span className="text-xs font-semibold text-[#0F172A]">@{currentHandle}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              </button>

              {/* Profile Menu Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-11 w-52 bg-white border border-[rgba(6,124,249,0.12)] rounded-2xl shadow-xl p-1.5 z-50 text-xs">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onSelectModule('settings');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#0F172A] font-medium transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>Account Settings</span>
                  </button>

                  {onNavigateLanding && (
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onNavigateLanding();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F8FAFC] text-[#067CF9] font-medium transition-colors cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Landing Page</span>
                    </button>
                  )}

                  <div className="my-1 border-t border-neutral-100" />

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-[#EF4444] font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Content Body Container with smooth clean scroll */}
        <main className="flex-1 overflow-y-auto no-scrollbar pr-1">
          {children}
        </main>

      </div>

      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={(mod) => onSelectModule(mod)} 
      />

      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

    </div>
  );
}
