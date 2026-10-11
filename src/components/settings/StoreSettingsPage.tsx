import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Store, 
  Cpu, 
  CreditCard, 
  Shield, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  Key, 
  Save, 
  Check, 
  Copy, 
  AlertCircle,
  HelpCircle,
  Settings
} from 'lucide-react';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

interface StoreSettingsPageProps {
  onBack: () => void;
  onNavigateCatalog?: () => void;
  onNavigateAudit?: () => void;
}

export const StoreSettingsPage: React.FC<StoreSettingsPageProps> = ({
  onBack,
  onNavigateCatalog,
  onNavigateAudit
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'subscription' | 'truth-boundaries'>('profile');
  
  // Store Profile Form State
  const [storeName, setStoreName] = useState<string>(CANONICAL_MERCHANT.name);
  const [storeDomain, setStoreDomain] = useState<string>(CANONICAL_MERCHANT.domain);
  const [storeCurrency, setStoreCurrency] = useState<string>(CANONICAL_MERCHANT.currency);
  const [supportEmail, setSupportEmail] = useState<string>('support@aeropulse.com');
  const [isSaved, setIsSaved] = useState(false);

  // Syncing state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState('8 minutes ago');
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [copiedFeed, setCopiedFeed] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSyncNow = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setLastSyncedTime('Just now');
      setTimeout(() => setSyncSuccess(false), 4000);
    }, 1200);
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard?.writeText?.('https://api.aixshop.app/v1/feeds/aeropulse/canonical.json');
    setCopiedFeed(true);
    setTimeout(() => setCopiedFeed(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Top Header & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold px-2.5 py-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Back to Console</span>
          </button>
          <div className="h-4 w-px bg-stone-300" />
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-orange-600" />
            <h1 className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight">
              Store &amp; Account Settings
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
            Store ID: {CANONICAL_MERCHANT.id}
          </span>
        </div>
      </div>

      {/* Sync Success Notification */}
      {syncSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Store catalog synchronized with Shopify! 24 products and 68 variants updated.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700">Sync status: OK</span>
        </div>
      )}

      {/* 2. Main Container with Sub-navigation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-3 bg-white rounded-3xl p-3 border border-stone-200/80 shadow-xs space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Store className="w-4 h-4 shrink-0" />
            <span>Store Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('connections')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'connections'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>Connections &amp; Feeds</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subscription')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'subscription'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Subscription &amp; Limits</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('truth-boundaries')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
              activeTab === 'truth-boundaries'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span>Truth Boundaries</span>
          </button>
        </div>

        {/* Main Content Workspace */}
        <div className="md:col-span-9 space-y-6">

          {/* TAB 1: Store Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="pb-4 border-b border-stone-100">
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  Store Profile &amp; Commerce Identity
                </h2>
                <p className="text-xs text-stone-500">
                  Authoritative identifiers that anchor your brand across search and AI commerce surfaces.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 block">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                  <p className="text-[11px] text-stone-400">
                    Matches your GS1 brand owner registration.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 block">
                    Storefront Domain (Canonical Host)
                  </label>
                  <input
                    type="text"
                    value={storeDomain}
                    onChange={(e) => setStoreDomain(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-mono"
                  />
                  <p className="text-[11px] text-stone-400">
                    Verified host where product pages and microdata are crawled.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800 block">
                      Default Currency
                    </label>
                    <select
                      value={storeCurrency}
                      onChange={(e) => setStoreCurrency(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800 block">
                      Platform Connector
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Shopify Plus"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100 text-stone-500 cursor-not-allowed font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 block">
                    Support / Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Store Settings</span>
                  </button>
                  {isSaved && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                      <Check className="w-3.5 h-3.5" />
                      <span>Changes saved!</span>
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Connections & Feeds */}
          {activeTab === 'connections' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-stone-900">
                      Store Connectors &amp; Data Feeds
                    </h2>
                    <p className="text-xs text-stone-500">
                      Active connections synchronizing products, prices, stock, and microdata.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Catalog Now'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Connection 1: Shopify */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">Shopify Storefront Connector</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Connected
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px]">
                        shop.aeropulse.com · App v2.4 · Last synced: {lastSyncedTime}
                      </p>
                      <p className="text-stone-600 font-mono text-[11px]">
                        24 products, 68 child variants active
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500 bg-white px-3 py-1.5 rounded-xl border border-stone-200">
                      Webhooks Active
                    </span>
                  </div>

                  {/* Connection 2: Google Merchant Center */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">Google Merchant Center Feed</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Configured
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px]">
                        Content API v2.1 · Merchant ID: 8492019 · Free Listings Active
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500 bg-white px-3 py-1.5 rounded-xl border border-stone-200">
                      24 SKUs Published
                    </span>
                  </div>

                  {/* Connection 3: AI Commerce Syndication Feed */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">AI Commerce Canonical Feed</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                          Live Endpoint
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEndpoint}
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold text-xs cursor-pointer"
                      >
                        {copiedFeed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedFeed ? 'Copied!' : 'Copy URL'}</span>
                      </button>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Structured JSON-LD schema feed consumed by AI assistants for unambiguous product recommendations.
                    </p>
                    <code className="block bg-white p-2.5 rounded-xl border border-orange-200 font-mono text-[11px] text-stone-800 truncate">
                      https://api.aixshop.app/v1/feeds/aeropulse/canonical.json
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Subscription & Limits */}
          {activeTab === 'subscription' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="pb-4 border-b border-stone-100">
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  Subscription Tier &amp; Catalog Capacity
                </h2>
                <p className="text-xs text-stone-500">
                  Your current AIXSHOP subscription plan, active SKU limits, and billing details.
                </p>
              </div>

              {/* Plan Card */}
              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                      CURRENT ACTIVE PLAN
                    </span>
                    <h3 className="text-xl font-extrabold text-stone-900">
                      Pro Tier — 500 Products
                    </h3>
                    <p className="text-xs text-stone-500">
                      Billed monthly ($149 / month) · Next renewal: Nov 1, 2026
                    </p>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-2xl font-black text-stone-900">$149</span>
                    <span className="text-xs text-stone-500"> / month</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-stone-700">Catalog Capacity Utilization</span>
                    <span className="text-stone-900 font-bold">
                      {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} of 500 SKUs used (4.8%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{ width: `${(CANONICAL_SYSTEM_KPIS.totalCatalogProducts / 500) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    476 additional SKUs available under your current Pro tier limit.
                  </p>
                </div>
              </div>

              {/* Features Included */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-stone-900 uppercase tracking-wider block text-[11px]">
                  Included in your plan:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time Store &amp; Product Re-checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-channel offer price reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>AI Shopper buyer intent diagnostic loops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Continuous Schema.org truth boundary auditing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Truth Boundaries */}
          {activeTab === 'truth-boundaries' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="pb-4 border-b border-stone-100">
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  Truth Boundaries &amp; Integrity Policy
                </h2>
                <p className="text-xs text-stone-500">
                  Guiding principles that govern how AIXSHOP assesses and reports on your catalog.
                </p>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-stone-700">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="font-bold text-stone-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    <span>Never Guarantee Third-Party AI Placement</span>
                  </div>
                  <p>
                    AIXSHOP never promises or guarantees that external search engines, ChatGPT, Gemini, or Microsoft Copilot will recommend, rank, or display a specific product. We diagnose and improve your structured catalog data so AI assistants can understand and represent your products truthfully.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="font-bold text-stone-900 flex items-center gap-2">
                    <Store className="w-4 h-4 text-orange-600" />
                    <span>Your Store Is The Single Source of Truth</span>
                  </div>
                  <p>
                    AIXSHOP operates on a &quot;Fix at Source&quot; model. We never silently modify your live Shopify catalog. We highlight what is clear, what is missing, and why it matters, allowing you to update your store admin and re-check to confirm.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="font-bold text-stone-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>Deterministic Re-check &amp; Verification</span>
                  </div>
                  <p>
                    Catalog health metrics update deterministically upon re-check. No fake or randomly fluctuating numbers are shown. Every score is directly traceable to verified attribute completeness and resolved issue tickets.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
