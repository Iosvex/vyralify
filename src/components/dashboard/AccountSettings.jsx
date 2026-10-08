import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Shield, 
  ShieldCheck, 
  CreditCard, 
  Key, 
  Globe, 
  Smartphone, 
  Laptop, 
  LogOut, 
  Check, 
  Download, 
  DollarSign, 
  Zap, 
  Crown, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';

export default function AccountSettings({ onNavigate }) {
  const { user, tier, updateTier, logout } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark, toggleTheme } = useTheme();

  // Active Sub-Tab: 'account' | 'billing' | 'security' | 'preferences'
  const [activeTab, setActiveTab] = useState('account');

  // Profile Form State
  const [displayName, setDisplayName] = useState(user?.displayName || 'Creator');
  const [email, setEmail] = useState(user?.email || 'creator@vyralify.in');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Currency & Regional Preferences State
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata (IST)');

  // Security State
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 'sess_1', device: 'Windows 11 PC (Chrome)', ip: '103.21.244.18', location: 'New Delhi, India', current: true, time: 'Active Now' },
    { id: 'sess_2', device: 'iPhone 15 Pro (Safari)', ip: '103.21.244.20', location: 'New Delhi, India', current: false, time: '2 hours ago' },
    { id: 'sess_3', device: 'MacBook Air M2 (Chrome)', ip: '49.36.18.92', location: 'Bengaluru, India', current: false, time: '3 days ago' }
  ]);

  // Billing Invoices State
  const [invoices] = useState([
    { id: 'INV-2026-003', date: 'Oct 01, 2026', plan: `${tier.toUpperCase()} Subscription`, amount: tier === 'elite' ? '₹1,499' : tier === 'pro' ? '₹499' : '₹0', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Sep 01, 2026', plan: 'Pro Subscription', amount: '₹499', status: 'Paid' },
    { id: 'INV-2026-001', date: 'Aug 01, 2026', plan: 'Pro Subscription', amount: '₹499', status: 'Paid' }
  ]);

  // Save profile updates
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      addNotification({
        title: 'Profile Updated',
        message: 'Your account credentials were successfully saved.',
        type: 'success'
      });
    }, 400);
  };

  // Toggle 2FA
  const handleToggle2FA = () => {
    const next = !is2FAEnabled;
    setIs2FAEnabled(next);
    addNotification({
      title: next ? '2FA Protection Enabled' : '2FA Disabled',
      message: next ? 'Two-Factor Authentication is now securing your account.' : 'Two-Factor Authentication turned off.',
      type: next ? 'success' : 'info'
    });
  };

  // Revoke other sessions
  const handleRevokeOtherSessions = () => {
    setSessions(sessions.filter(s => s.current));
    addNotification({
      title: 'Sessions Terminated',
      message: 'Logged out of all other devices successfully.',
      type: 'success'
    });
  };

  // Export Account Data JSON
  const handleExportData = () => {
    const data = {
      user: { displayName, email, tier },
      activePage: activePage,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_account_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Data Archive Exported',
      message: 'Downloaded complete GDPR/DPDP compliant profile data.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono mb-2 font-medium">
            <Settings className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
            <span>Phase 8 &bull; Account Settings & Subscription Portal</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Settings & Billing Management
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
            Manage your subscription tier, regional currencies, sessions, and Meta API authorizations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#0C0D12] p-1 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] shadow-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'account', label: 'Profile' },
            { id: 'billing', label: 'Billing & Plan' },
            { id: 'security', label: 'Security & 2FA' },
            { id: 'preferences', label: 'Preferences' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SUB-TAB: ACCOUNT PROFILE */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-5">
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
              Creator Identity & Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-neutral-500 font-medium">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-500 font-medium">Primary Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-neutral-900 dark:text-white block">Active Instagram Workspace:</span>
                <span className="text-[11px] text-emerald-600 font-mono">@{activePage?.handle || 'creator'} ({activePage?.category})</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('builder')}
                className="text-xs text-emerald-600 hover:underline font-semibold cursor-pointer"
              >
                Switch Account in Builder &rarr;
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200/80 dark:border-white/[0.06]">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors"
              >
                {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>

          {/* Privacy & Compliance Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Data Compliance & AI Processing Rights</span>
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Vyralify processes Instagram insights under strict Meta Graph API permissions and India Digital Personal Data Protection (DPDP) Act guidelines. Your proprietary scripts and subscriber leads are never trained on by external third-parties without consent.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleExportData}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export My Data (JSON)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUB-TAB: BILLING & PLANS */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          
          {/* Active Subscription Summary */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div>
                <span className="text-[11px] font-mono text-neutral-400">Current Subscription</span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white capitalize mt-0.5">
                  {tier === 'free' ? 'Starter Plan (Free)' : tier === 'pro' ? 'Pro Creator Plan' : 'Elite Agency Plan'}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase ${
                tier === 'elite' ? 'bg-amber-100 text-amber-800' :
                tier === 'pro' ? 'bg-emerald-100 text-emerald-800' :
                'bg-neutral-100 text-neutral-700'
              }`}>
                {tier.toUpperCase()} TIER
              </span>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {[
                { id: 'free', name: 'Starter (Free)', price: '₹0', period: 'forever', desc: '1 Instagram page, 20 AI credits/day, 1 store product, 7-day planner' },
                { id: 'pro', name: 'Pro Creator', price: '₹499', period: '/month', desc: 'Up to 3 pages, 300 AI credits/day, Automation Engine, Unlimited store products, 30-day planner' },
                { id: 'elite', name: 'Elite Agency', price: '₹1,499', period: '/month', desc: 'Unlimited pages, Unlimited AI credits, Priority support, White-label AI resale engine' }
              ].map(plan => {
                const isCurrent = tier === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                      isCurrent
                        ? 'bg-emerald-50/70 dark:bg-emerald-500/10 border-emerald-500 shadow-xs'
                        : 'bg-white dark:bg-[#0C0D12] border-neutral-200/80 dark:border-white/[0.06]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-neutral-900 dark:text-white text-xs">{plan.name}</h4>
                        {isCurrent && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-2">
                        {plan.price}
                        <span className="text-xs font-normal text-neutral-400 font-sans">{plan.period}</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">{plan.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        updateTier(plan.id);
                        addNotification({
                          title: 'Subscription Switched',
                          message: `Switched active workspace to ${plan.name}.`,
                          type: 'success'
                        });
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      {isCurrent ? 'Current Active Plan' : `Switch to ${plan.name}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Invoices History Table */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Billing Receipts &amp; Invoices</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200/80 dark:border-white/[0.06] text-neutral-400 font-mono text-[11px]">
                    <th className="pb-2 font-medium">Invoice ID</th>
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/60 dark:divide-white/[0.04]">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-2.5 font-mono text-neutral-500">{inv.id}</td>
                      <td className="py-2.5 font-semibold text-neutral-900 dark:text-white">{inv.plan}</td>
                      <td className="py-2.5 font-mono text-emerald-600 font-bold">{inv.amount}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-neutral-400 font-mono text-[11px]">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: SECURITY & 2FA */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          
          {/* 2FA Toggle */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Two-Factor Authentication (2FA)</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Require an authenticator code when signing into your creator workspace.</p>
              </div>
              <button
                onClick={handleToggle2FA}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  is2FAEnabled 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {is2FAEnabled ? '2FA Active (Enabled)' : 'Enable 2FA'}
              </button>
            </div>
          </div>

          {/* Active Devices & Sessions */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Active Sessions &amp; Devices</h3>
                <p className="text-xs text-neutral-500">Devices currently authenticated to your Vyralify account.</p>
              </div>
              <button
                onClick={handleRevokeOtherSessions}
                className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors cursor-pointer"
              >
                Log Out Other Devices
              </button>
            </div>

            <div className="space-y-2.5">
              {sessions.map(s => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    {s.device.includes('iPhone') ? (
                      <Smartphone className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <Laptop className="w-5 h-5 text-neutral-500" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900 dark:text-white">{s.device}</span>
                        {s.current && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-semibold">
                            This Device
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {s.ip} &bull; {s.location}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. SUB-TAB: REGIONAL PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-5">
          <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Regional & Currency Preferences</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-mono text-neutral-500 font-medium">Display Currency</label>
              <select
                value={selectedCurrency}
                onChange={(e) => {
                  setSelectedCurrency(e.target.value);
                  addNotification({ title: 'Currency Updated', message: `Display currency set to ${e.target.value}.`, type: 'info' });
                }}
                className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-neutral-500 font-medium">Timezone Cadence</label>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-neutral-500">Theme Preference:</span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] text-neutral-800 dark:text-neutral-200 font-semibold cursor-pointer"
            >
              {isDark ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
