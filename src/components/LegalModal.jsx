import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, RefreshCw, Cookie, ExternalLink } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-[#0E1015] border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-200 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-[#12141C]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#3CEB75]/15 border border-[#3CEB75]/30 flex items-center justify-center text-[#3CEB75]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-headline font-bold text-white tracking-tight">
                  Vyralify Legal Center
                </h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Effective &amp; Last Updated: April 2026
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-800/80 bg-[#0A0C10] overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('terms')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs border border-neutral-700'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs border border-neutral-700'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('refund')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'refund'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs border border-neutral-700'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refund Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('cookies')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs border border-neutral-700'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Policy</span>
            </button>
          </div>

          {/* Document Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-neutral-300 font-inter leading-relaxed selection:bg-[#3CEB75] selection:text-black">
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">Terms of Service</h3>
                  <p className="text-neutral-400 text-xs">
                    Please read these Terms carefully before using Vyralify. By accessing or using our platform, you agree to be bound by these Terms.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">1. Platform Services &amp; Eligibility</h4>
                  <p>
                    Vyralify provides content discovery tools, AI-powered generation workflows, Instagram growth intelligence, and a marketplace connecting clippers with brand campaigns. You must be at least 18 years of age or the age of legal majority in your jurisdiction to create an account or participate in payout-eligible campaigns.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">2. Campaigns, Clipping &amp; Verification</h4>
                  <p>
                    Clippers participating in paid campaigns must adhere to the specific campaign guidelines, approved assets, and disclosure rules. 
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                    <li>All submitted views are subject to automated and manual anti-fraud verification.</li>
                    <li>Artificially inflated metrics, bot farms, click manipulation, or unauthorized material result in immediate forfeiture of accrued rewards and permanent account termination.</li>
                    <li>Campaign budgets are escrowed or managed per campaign terms and paid out per verified thousand views ($ / 1K views).</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">3. Independent Platform &amp; Disclaimer</h4>
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-400">
                    <strong>Mandatory Disclaimer:</strong> Vyralify is an independent software application and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Instagram, Meta Platforms, Inc., or any of their subsidiaries or affiliates. We do not guarantee views, followers, algorithmic placement, earnings, or sales.
                  </div>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">4. User Content &amp; Intellectual Property</h4>
                  <p>
                    You retain ownership of the original content you produce. By submitting content to brand campaigns, you grant the respective brand a non-exclusive license to utilize and feature the approved derivative clip in accordance with campaign terms.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">5. Payouts &amp; Taxes</h4>
                  <p>
                    Verified campaign earnings are disbursed via approved payment partners (e.g. Stripe, Bank Transfer, PayPal). Users are solely responsible for determining and paying any taxes applicable to their earnings.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">Privacy Policy</h3>
                  <p className="text-neutral-400 text-xs">
                    Your privacy is essential to us. We adhere to transparent data protection principles under GDPR, CCPA, and applicable global standards.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">1. Information We Collect</h4>
                  <p>We only collect information necessary to deliver our services:</p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-300">
                    <li><strong>Account Information:</strong> Name, email address, password hash, and optional profile photo.</li>
                    <li><strong>Campaign &amp; Clip Submissions:</strong> Public Instagram or TikTok video URLs, view counts, and submission timestamps.</li>
                    <li><strong>Payout Details:</strong> Payment handle or bank account details required solely for disbursing earned rewards.</li>
                    <li><strong>Usage Data:</strong> Device browser, anonymized telemetry, and diagnostic logs to ensure platform stability.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">2. How We Use Your Data</h4>
                  <p>
                    Your data is used to provide AI recommendations, track campaign verification, process payouts, and prevent fraudulent activity. We do <strong>not</strong> sell, rent, or trade your personal information to third parties or data brokers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">3. Security &amp; Encryption</h4>
                  <p>
                    All communication between your client device and Vyralify servers is encrypted using modern TLS 1.3 encryption. Sensitive payout information is tokenized via PCI-compliant payment infrastructure.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">4. Your Data Rights</h4>
                  <p>
                    You have the right to request access to your data, request corrections, or request complete deletion of your account and associated records by emailing <code className="text-[#3CEB75]">privacy@vyralify.in</code>.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">Refund Policy</h3>
                  <p className="text-neutral-400 text-xs">
                    Clear, transparent refund terms for our subscription plans.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">1. Subscription Plans (Pro &amp; Scale)</h4>
                  <p>
                    We offer a 7-day money-back satisfaction guarantee on first-time Pro subscriptions. If you find Vyralify Pro does not fit your workflow within the first 7 calendar days of your initial purchase, contact support at <code className="text-[#3CEB75]">support@vyralify.in</code> for a full refund.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">2. Cancellation Policy</h4>
                  <p>
                    You may cancel your subscription at any time directly through your billing portal. Upon cancellation, your Pro features will remain active until the end of your prepaid billing period.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">3. Clipping Rewards &amp; Marketplace</h4>
                  <p>
                    Campaign payout rewards are performance earnings and are not refundable fees. Once a verified payout is processed to your payout account, it cannot be reversed.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-2">Cookie &amp; Tracking Policy</h3>
                  <p className="text-neutral-400 text-xs">
                    Information about how we use cookies and local browser storage.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">1. Essential Cookies</h4>
                  <p>
                    These cookies are strictly required to keep you signed in, remember your UI theme preferences (dark/light), and maintain secure session tokens.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-semibold text-white">2. Analytics &amp; Performance</h4>
                  <p>
                    We collect aggregated, anonymized metrics to determine page load speeds and identify product bugs. No third-party invasive advertising cookies are deployed on Vyralify.
                  </p>
                </section>
              </div>
            )}
          </div>

          {/* Footer of Modal */}
          <div className="px-6 py-4 border-t border-neutral-800 bg-[#12141C] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            <div>
              Questions? Contact our legal team at{' '}
              <a href="mailto:support@vyralify.in" className="text-[#3CEB75] hover:underline">
                support@vyralify.in
              </a>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors cursor-pointer"
            >
              I Understand &amp; Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
