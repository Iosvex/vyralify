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
  DollarSign,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import UpgradeModal from '../common/UpgradeModal';
import GlobalSearchModal from '../common/GlobalSearchModal';
import ConnectAccountModal from '../common/ConnectAccountModal';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function AppShell({ activeModule, onSelectModule, onNavigateLanding, children }) {
  const { user, tier, aiCredits, logout } = useAuth();
  const { pages, activePage, switchPage, removePage, canAddMorePages, getPageLimit } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { notifications, unreadCount, markAsRead, markAllAsRead, addNotification } = useNotifications();

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
    <div className="relative flex h-screen w-full bg-[#F4F8FD] text-[#0F172A] font-sans overflow-hidden select-none antialiased">
      
      {/* Dynamic Ambient Background with Blue-Purple Mesh and Grid for Glass Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft top-left electric blue glow */}
        <div className="absolute -top-32 -left-32 w-[38rem] h-[38rem] rounded-full bg-gradient-to-br from-[#067CF9]/16 via-[#38BDF8]/10 to-transparent blur-[90px]" />
        
        {/* Soft top-right purple/indigo glow */}
        <div className="absolute -top-24 right-0 w-[42rem] h-[42rem] rounded-full bg-gradient-to-bl from-[#A855F7]/14 via-[#6366F1]/12 to-transparent blur-[100px]" />
        
        {/* Center-bottom subtle violet aura */}
        <div className="absolute -bottom-36 left-1/3 w-[46rem] h-[46rem] rounded-full bg-gradient-to-tr from-[#6366F1]/10 via-[#067CF9]/8 to-[#A855F7]/12 blur-[110px]" />

        {/* Delicate modern tech dot grid for texture depth */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(6,124,249,0.14)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* 1. FLOATING FROSTED GLASS SIDEBAR */}
      <aside className="w-64 shrink-0 m-4 mr-0 rounded-2xl bg-white/75 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(6,124,249,0.06),0_1px_2px_rgba(0,0,0,0.02)] ring-1 ring-[rgba(99,102,241,0.12)] flex flex-col justify-between z-30 transition-all">
        
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

          {/* Navigation Links with Sleek Dividers */}
          <nav className="p-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = isNavActive(item.id);
              return (
                <React.Fragment key={item.id}>
                  {index > 0 && (
                    <div className="my-1.5 mx-2 border-t border-[rgba(6,124,249,0.1)]" />
                  )}
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-[#EFF6FF] via-[#F5F3FF] to-[#FAF5FF] text-[#067CF9] font-semibold border border-[rgba(99,102,241,0.22)] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b from-[#067CF9] via-[#6366F1] to-[#A855F7] shadow-xs" />
                    )}
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#067CF9]' : 'text-[#64748B]'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Pro Plan Card */}
        <div className="p-3">
          <div 
            onClick={() => openUpgradeModal('general', 'Upgrade to Pro to unlock unlimited generations.')}
            className="p-3 rounded-xl bg-gradient-to-br from-white/90 via-[#F5F3FF]/70 to-[#EFF6FF]/70 backdrop-blur-md border border-[rgba(99,102,241,0.2)] hover:border-[#6366F1]/50 transition-all cursor-pointer flex items-center justify-between group shadow-xs relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center shrink-0 shadow-xs">
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-4 relative z-10">
        
        {/* FLOATING FROSTED GLASS TOPBAR */}
        <header className="h-14 bg-white/75 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[0_4px_20px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.1)] px-5 flex items-center justify-between shrink-0 mb-4 z-20">
          
          {/* LEFT: Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setIsSearchOpen(true)}
              placeholder="Search features, hooks, assets..."
              className="w-full bg-white/60 backdrop-blur-md border border-[rgba(99,102,241,0.15)] focus:border-[#6366F1]/60 text-xs rounded-xl pl-9 pr-4 py-2 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden transition-all shadow-xs"
            />
          </div>

          {/* RIGHT: Instagram Account Switcher | AI Credits | Notification Bell | User Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* 1. INSTAGRAM ACCOUNT SWITCHER & MANAGER */}
            <div className="relative">
              {activePage ? (
                <button
                  onClick={() => {
                    setIsPageDropdownOpen(!isPageDropdownOpen);
                    setIsProfileMenuOpen(false);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-white/85 hover:bg-white border border-[rgba(99,102,241,0.22)] hover:border-[#6366F1]/50 cursor-pointer transition-all shadow-xs group"
                  title="Switch or manage connected Instagram accounts"
                >
                  <div className="relative shrink-0">
                    <img
                      src={getSafeAvatarUrl(activePage.avatar, activePage.handle)}
                      alt={activePage.handle}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getSafeAvatarUrl('', activePage.handle);
                      }}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-[#6366F1]/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                  </div>
                  <div className="text-left leading-tight hidden sm:block">
                    <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                      <span>@{activePage.handle}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${isPageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  onClick={handleConnectPageClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white hover:opacity-95 cursor-pointer transition-all shadow-xs text-xs font-bold"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>+ Connect Instagram</span>
                </button>
              )}

              {/* Instagram Account Switcher Dropdown */}
              {isPageDropdownOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white/95 backdrop-blur-2xl border border-[rgba(99,102,241,0.18)] rounded-2xl shadow-2xl p-2 z-50 text-xs">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-neutral-100 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                      Instagram Accounts ({pages.length}/{getPageLimit()})
                    </span>
                    <button
                      onClick={handleConnectPageClick}
                      className="text-[11px] font-semibold text-[#067CF9] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>Add Account</span>
                    </button>
                  </div>

                  {/* Connected Accounts List */}
                  <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar py-1">
                    {pages.length === 0 ? (
                      <div className="p-3 text-center text-xs text-[#64748B]">
                        No Instagram accounts connected yet.
                      </div>
                    ) : (
                      pages.map((p) => {
                        const isActive = activePage?.id === p.id;
                        return (
                          <div
                            key={p.id}
                            className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                              isActive 
                                ? 'bg-gradient-to-r from-[#EFF6FF] to-[#F5F3FF] border border-[rgba(99,102,241,0.25)] text-[#0F172A]' 
                                : 'hover:bg-[#F8FAFC] text-[#334155]'
                            }`}
                          >
                            {/* Click to Switch */}
                            <button
                              onClick={() => {
                                switchPage(p.id);
                                setIsPageDropdownOpen(false);
                                addNotification({
                                  title: 'Account Switched',
                                  message: `Now viewing analytics for @${p.handle}`,
                                  type: 'info'
                                });
                              }}
                              className="flex items-center gap-2.5 flex-1 text-left min-w-0 cursor-pointer"
                            >
                              <img
                                src={getSafeAvatarUrl(p.avatar, p.handle)}
                                alt={p.handle}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = getSafeAvatarUrl('', p.handle);
                                }}
                                className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-black/5"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-xs truncate flex items-center gap-1">
                                  <span>@{p.handle}</span>
                                  {isActive && (
                                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-[#64748B] truncate">
                                  {p.followersCount || '0'} followers • {p.category || 'Creator'}
                                </div>
                              </div>
                            </button>

                            {/* Disconnect / Remove Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Disconnect @${p.handle} from Vyralify? You can reconnect anytime.`)) {
                                  removePage(p.id);
                                  addNotification({
                                    title: 'Account Disconnected',
                                    message: `@${p.handle} was removed.`,
                                    type: 'warning'
                                  });
                                }
                              }}
                              title={`Disconnect @${p.handle}`}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1 cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Add Account Footer */}
                  <div className="pt-1.5 border-t border-neutral-100 mt-1">
                    <button
                      onClick={handleConnectPageClick}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-[rgba(99,102,241,0.2)] text-[#6366F1] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Connect Another Instagram Account</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* 2. AI CREDITS PILL */}
            <div
              onClick={() => openUpgradeModal('ai_credits', 'Upgrade to Pro to unlock 300 daily AI credits & vision models!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#EFF6FF] via-[#F5F3FF] to-[#FAF5FF] hover:from-[#DBEAFE] hover:to-[#EDE9FE] border border-[rgba(99,102,241,0.22)] hover:border-[#6366F1]/50 text-[#0F172A] transition-all cursor-pointer shadow-xs group"
              title="Daily AI Credits Remaining (Click to Upgrade)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1] group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs font-mono bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                {isUnlimited ? '∞ Unlimited' : `${creditsRemaining} AI left`}
              </span>
            </div>

            {/* 3. NOTIFICATION BELL */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsPageDropdownOpen(false);
                  setIsProfileMenuOpen(false);
                }}
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

            {/* 4. USER PROFILE PILL */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsPageDropdownOpen(false);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-xl bg-white/80 hover:bg-white border border-[rgba(99,102,241,0.18)] hover:border-[#6366F1]/40 cursor-pointer transition-colors shadow-xs"
                title="User profile and settings"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#067CF9] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-[11px] ring-2 ring-[#6366F1]/20">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold text-[#0F172A] hidden sm:inline">
                  {user?.displayName?.split(' ')[0] || 'My Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
              </button>

              {/* Profile Menu Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-11 w-52 bg-white/95 backdrop-blur-xl border border-[rgba(99,102,241,0.16)] rounded-2xl shadow-xl p-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <div className="font-bold text-[#0F172A] text-xs truncate">{user?.displayName || 'Creator'}</div>
                    <div className="text-[10px] text-[#64748B] font-mono truncate">{user?.email || 'user@vyralify.in'}</div>
                  </div>

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
