import React, { useState } from 'react';
import { 
  Settings, 
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
  ChevronRight,
  Trash2,
  Mail,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';

/**
 * Account Settings & Subscription Management - Strict Electric Light Blueprint
 * White (#FFFFFF), Deep Obsidian Navy (#0F172A), Electric Blue (#067CF9), Slate (#64748B)
 */

export default function AccountSettings({ onNavigate }) {
  const { user, tier, updateTier, logout, changeEmail, updateCurrency, deleteAccount } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();

  // Active Sub-Tab: 'account' | 'billing' | 'security' | 'preferences' | 'notifications' | 'help'
  const [activeTab, setActiveTab] = useState('account');

  // Profile Form State
  const [displayName, setDisplayName] = useState(user?.displayName || 'Creator');
  const [email, setEmail] = useState(user?.email || 'creator@vyralify.in');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Currency & Regional Preferences State
  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('vyralify_currency') || user?.currency || 'INR');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata (IST)');

  // Notification Preferences State
  const [notifPrefs, setNotifPrefs] = useState({
    sales: true,
    weeklyRecap: true,
    billing: true,
    tokenExpiry: true,
    usageLimit: true
  });

  // Account Deletion State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    if (email !== user?.email && changeEmail) {
      await changeEmail(email);
      addNotification({
        title: 'Email Changed & Verification Sent',
        message: `Re-verification link sent to ${email}.`,
        type: 'warning'
      });
    }
    setTimeout(() => {
      setIsSavingProfile(false);
      addNotification({
        title: 'Profile Updated',
        message: 'Your account credentials were successfully saved.',
        type: 'success'
      });
    }, 400);
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(prev => !prev);
    addNotification({
      title: is2FAEnabled ? '2FA Disabled' : '2FA Authenticator Enabled',
      message: is2FAEnabled ? 'Two-factor authentication turned off.' : 'Backup codes generated.',
      type: 'info'
    });
  };

  const handleRevokeOtherSessions = () => {
    setSessions(prev => prev.filter(s => s.current));
    addNotification({
      title: 'Sessions Terminated',
      message: 'All other devices logged out.',
      type: 'success'
    });
  };

  const handleExportData = () => {
    const data = {
      user: { displayName, email, tier, currency: selectedCurrency },
      activePage: activePage || {},
      exportDate: new Date().toISOString()
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
      message: 'Downloaded complete profile data.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-[#067CF9] text-[11px] font-mono mb-2 font-medium">
            <Settings className="w-3 h-3 text-[#067CF9]" />
            <span>Account Settings &amp; Subscription Portal</span>
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight font-headline">
            Settings &amp; Billing Management
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Manage your subscription tier, regional currencies, sessions, and Meta API authorizations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'account', label: 'Profile' },
            { id: 'billing', label: 'Billing & Plan' },
            { id: 'preferences', label: 'Preferences' },
            { id: 'notifications', label: 'Notifications' },
            { id: 'help', label: 'Help & Support' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#067CF9] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-50'
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
          <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <h3 className="font-bold text-[#0F172A] text-sm font-headline">
              Creator Identity &amp; Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono text-slate-500 font-medium">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:border-[#067CF9] focus:bg-white focus:outline-hidden transition-colors font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-slate-500 font-medium">Primary Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:border-[#067CF9] focus:bg-white focus:outline-hidden transition-colors font-medium"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#0F172A] block">Active Instagram Workspace:</span>
                <span className="text-[11px] text-[#067CF9] font-mono font-medium">@{activePage?.handle || 'creator'} ({activePage?.category || 'General'})</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('builder')}
                className="text-xs text-[#067CF9] hover:underline font-semibold cursor-pointer"
              >
                Switch Account in Builder &rarr;
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="px-5 py-2.5 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] disabled:opacity-50 text-white font-semibold text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all"
              >
                {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. SUB-TAB: BILLING & PLANS */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Current Subscription</span>
                <h3 className="text-lg font-bold text-[#0F172A] capitalize mt-0.5 font-headline">
                  {tier === 'free' ? 'Starter Plan (Free)' : tier === 'pro' ? 'Pro Creator Plan' : 'Elite Agency Plan'}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                tier === 'elite' ? 'bg-amber-100 text-amber-800' :
                tier === 'pro' ? 'bg-[#EFF6FF] text-[#067CF9] border border-[#067CF9]/30' :
                'bg-slate-100 text-slate-700'
              }`}>
                {tier.toUpperCase()} TIER
              </span>
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        ? 'bg-blue-50/50 border-[#067CF9] shadow-md shadow-blue-500/10'
                        : 'bg-white border-slate-200/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-[#0F172A] text-xs font-headline">{plan.name}</h4>
                        {isCurrent && <Check className="w-4 h-4 text-[#067CF9]" />}
                      </div>
                      <div className="text-xl font-bold font-mono text-[#0F172A] mt-2">
                        {plan.price}
                        <span className="text-xs font-normal text-slate-400 font-sans ml-1">{plan.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{plan.desc}</p>
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
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#067CF9] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-[#0F172A] text-sm font-headline">Billing Receipts &amp; Invoices</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-mono text-[11px]">
                    <th className="pb-2.5 font-medium">Invoice ID</th>
                    <th className="pb-2.5 font-medium">Description</th>
                    <th className="pb-2.5 font-medium">Amount</th>
                    <th className="pb-2.5 font-medium">Status</th>
                    <th className="pb-2.5 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/70">
                      <td className="py-3 font-mono text-slate-500">{inv.id}</td>
                      <td className="py-3 font-semibold text-[#0F172A]">{inv.plan}</td>
                      <td className="py-3 font-mono text-[#067CF9] font-bold">{inv.amount}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] text-[#067CF9] border border-[#067CF9]/20">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-slate-400 font-mono text-[11px]">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: REGIONAL PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          <h3 className="font-bold text-[#0F172A] text-sm font-headline">Regional &amp; Currency Preferences</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-mono text-slate-500 font-medium">Display Currency</label>
              <select
                value={selectedCurrency}
                onChange={async (e) => {
                  const val = e.target.value;
                  setSelectedCurrency(val);
                  localStorage.setItem('vyralify_currency', val);
                  if (updateCurrency) await updateCurrency(val);
                  addNotification({ title: 'Currency Updated', message: `Display currency set to ${val}.`, type: 'info' });
                }}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:border-[#067CF9] focus:bg-white focus:outline-hidden font-medium"
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-slate-500 font-medium">Timezone Cadence</label>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] focus:border-[#067CF9] focus:bg-white focus:outline-hidden font-medium"
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Theme Setting:</span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-[#067CF9] font-mono text-[11px] font-semibold">
              ☀️ Radiant Electric Light Blueprint
            </span>
          </div>
        </div>
      )}

      {/* 6. SUB-TAB: NOTIFICATION PREFERENCES */}
      {activeTab === 'notifications' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-[#0F172A] text-sm font-headline">Notification Channels &amp; Delivery</h3>
            <p className="text-xs text-slate-500 mt-0.5">Configure in-app alerts and transactional email digests.</p>
          </div>

          <div className="divide-y divide-slate-100 space-y-3 pt-1">
            {[
              { key: 'sales', title: 'Real-Time Store Sales & Lead Alerts', desc: 'Instant push & email alert when a customer completes an order or submits lead info.' },
              { key: 'weeklyRecap', title: 'Weekly Creator Performance Digest', desc: 'Every Monday: 7-day revenue, view velocity, top performing reel, and audience growth.' },
              { key: 'billing', title: 'Subscription & Invoice Receipts', desc: 'Automatic email receipts on monthly plan renewal or plan upgrade.' },
              { key: 'tokenExpiry', title: 'Meta / Instagram Token Expiry Warnings', desc: 'Alerts 7 days prior to token expiration to prevent automation interruption.' },
              { key: 'usageLimit', title: 'AI Credit Usage Limits (80% & 100%)', desc: 'Proactive banner and notifications when daily AI quota is nearing limit.' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between pt-3 text-xs">
                <div>
                  <h4 className="font-semibold text-[#0F172A]">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotifPrefs(prev => ({ ...prev, [item.key]: !prev[item.key] }));
                    addNotification({ title: 'Preferences Saved', message: `Updated ${item.title} setting.`, type: 'info' });
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ml-4 ${
                    notifPrefs[item.key] ? 'bg-[#067CF9]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                      notifPrefs[item.key] ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SUB-TAB: HELP & SUPPORT */}
      {activeTab === 'help' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-[#0F172A] text-sm font-headline">Help, Community &amp; Direct Support</h3>
            <p className="text-xs text-slate-500 mt-0.5">Need assistance scaling your creator business? We are here 24/7.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <a
              href="mailto:support@vyralify.in"
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#067CF9] transition-colors block"
            >
              <h4 className="font-bold text-[#0F172A]">Direct Email Support</h4>
              <p className="text-slate-500 text-[11px] mt-1">support@vyralify.in</p>
              <span className="text-[#067CF9] text-[11px] font-mono mt-2 inline-block font-semibold">Response time: &lt; 2 hours &rarr;</span>
            </a>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 block">
              <h4 className="font-bold text-[#0F172A]">Platform Version</h4>
              <p className="text-slate-500 text-[11px] mt-1">Vyralify Production 2026.4</p>
              <span className="text-emerald-600 text-[11px] font-mono mt-2 inline-block font-semibold">&bull; 100% Operational &amp; Synced</span>
            </div>
          </div>
        </div>
      )}

      {/* 8. COMPLIANT ACCOUNT DELETION ZONE */}
      <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-xs space-y-3">
        <h3 className="font-bold text-rose-800 text-sm font-headline">Danger Zone: Compliant Account Deletion</h3>
        <p className="text-xs text-rose-700/80 leading-relaxed">
          In full accordance with GDPR and India DPDP Act, deleting your account permanently wipes all your connected Instagram metadata, products, CRM leads, and order history from Firestore.
        </p>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
        >
          Permanently Delete Vyralify Account
        </button>
      </div>

      {/* Deletion Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl bg-white border border-rose-200 p-6 text-[#0F172A] shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-rose-700 font-headline">Permanently Delete Account?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This action cannot be undone. All your Instagram analytics, products, customer records, and AI history will be immediately deleted.
            </p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 block">
                Type <strong className="text-rose-600 font-mono">DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] font-mono focus:border-rose-500 focus:outline-hidden"
              />
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmInput('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmInput !== 'DELETE' || isDeletingAccount}
                onClick={async () => {
                  setIsDeletingAccount(true);
                  if (deleteAccount) await deleteAccount();
                  setIsDeletingAccount(false);
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-xs font-semibold text-white cursor-pointer shadow-xs transition-colors"
              >
                {isDeletingAccount ? 'Deleting...' : 'Confirm & Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
