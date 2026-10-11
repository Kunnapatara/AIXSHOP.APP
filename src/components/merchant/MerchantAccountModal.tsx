import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  CreditCard, 
  Settings, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Store, 
  ArrowRight,
  ShieldCheck,
  Check,
  Mail,
  Globe,
  Bell
} from 'lucide-react';
import { AccountSubSection, MERCHANT_ACCOUNT_SECTIONS } from './merchantNavigationConfig';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

interface MerchantAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: AccountSubSection;
}

export const MerchantAccountModal: React.FC<MerchantAccountModalProps> = ({
  isOpen,
  onClose,
  initialSection = 'connections'
}) => {
  const [activeSection, setActiveSection] = useState<AccountSubSection>(initialSection);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  // Form states for settings
  const [storeName, setStoreName] = useState<string>(CANONICAL_MERCHANT.name);
  const [storeDomain, setStoreDomain] = useState<string>(CANONICAL_MERCHANT.domain);
  const [contactEmail, setContactEmail] = useState('merchant@aeropulse.com');
  const [autoDailyAudit, setAutoDailyAudit] = useState(true);
  const [alertOnDiscrepancy, setAlertOnDiscrepancy] = useState(true);

  if (!isOpen) return null;

  const handleSyncNow = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 900);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
              AP
            </div>
            <div>
              <h2 className="text-base font-extrabold text-stone-900">
                Store Account & Settings
              </h2>
              <p className="text-xs text-stone-500">
                {CANONICAL_MERCHANT.name} · {CANONICAL_MERCHANT.domain}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Secondary Tabs: Connections | Subscription | Settings */}
        <div className="px-6 border-b border-stone-100 flex gap-2">
          {MERCHANT_ACCOUNT_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {sec.id === 'connections' && <Cpu className="w-3.5 h-3.5" />}
                {sec.id === 'subscription' && <CreditCard className="w-3.5 h-3.5" />}
                {sec.id === 'settings' && <Settings className="w-3.5 h-3.5" />}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: CONNECTIONS */}
          {activeSection === 'connections' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Store Connections & Feeds
                </h3>
                <p className="text-xs text-stone-500">
                  Manage connected e-commerce platforms and automated product feed syndication.
                </p>
              </div>

              {/* Connected Platform Card */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                        <span>Shopify Storefront</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Connected
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {storeDomain} · {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} Products Synchronized
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>
                </div>

                {syncSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Catalog re-synchronized: 24 products and specifications up to date.</span>
                  </div>
                )}
              </div>

              {/* Feed Syndication Channels */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Outbound Catalog Syndication
                </h4>
                
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl border border-stone-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900">Google Merchant Center</div>
                      <div className="text-[11px] text-stone-500">Content API v2.1 Feed · Daily automatic refresh</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900">Custom Catalog Feed (CSV / JSON-LD)</div>
                      <div className="text-[11px] text-stone-500">Automated endpoint for search engines and crawlers</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBSCRIPTION */}
          {activeSection === 'subscription' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Plan & Catalog Limits
                </h3>
                <p className="text-xs text-stone-500">
                  Manage your subscription tier, billing cycle, and SKU capacity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Current Plan</span>
                    <h4 className="text-xl font-black">Pro Tier</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black">$79</span>
                    <span className="text-xs text-stone-400 font-normal"> / month</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span>Catalog SKU Usage</span>
                    <span className="font-mono font-bold text-white">24 / 2,000 SKUs (1.2%)</span>
                  </div>
                  <div className="w-full bg-stone-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '1.2%' }}></div>
                  </div>
                </div>

                <div className="text-xs text-stone-400 pt-1">
                  Next renewal date: November 1, 2026
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Included in Pro Tier
                </h4>
                <ul className="text-xs text-stone-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>AI Commerce Visibility intelligence & buyer intent query tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Automated daily store & catalog specification discrepancy audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Multi-channel feed syndication with verified schema generation</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Plan management is active in production settings.')}
                  className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Manage Subscription
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeSection === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Store Profile & Audit Preferences
                </h3>
                <p className="text-xs text-stone-500">
                  Configure store identity, verified domain, and audit frequency.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Primary Store Domain
                  </label>
                  <input
                    type="text"
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-800">Daily Automated Catalog Audit</div>
                      <div className="text-[11px] text-stone-500">Automatically inspect catalog specifications every 24 hours</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoDailyAudit}
                      onChange={(e) => setAutoDailyAudit(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-stone-300"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-xs font-bold text-stone-800">Email Discrepancy Alerts</div>
                      <div className="text-[11px] text-stone-500">Send instant alert when competing retailers post conflicting specifications</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertOnDiscrepancy}
                      onChange={(e) => setAlertOnDiscrepancy(e.target.checked)}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-stone-300"
                    />
                  </div>
                </div>
              </div>

              {savedSettings && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Store settings updated successfully.</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
