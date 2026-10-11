import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  Compass, 
  Layers, 
  Plus, 
  Store,
  Settings,
  User,
  Menu,
  X,
  Cpu,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { MerchantOverviewHome } from './MerchantOverviewHome';
import { ProductsWorkbenchPage } from '../workbench/ProductsWorkbenchPage';
import { IssuesPage } from '../issues/IssuesPage';
import { MerchantVisibilityPage } from './MerchantVisibilityPage';
import { AddProductsModal } from './AddProductsModal';
import { MerchantAccountModal } from './MerchantAccountModal';
import { ProductDetailPage } from '../product/ProductDetailPage';
import { StoreAuditPage } from '../audit/StoreAuditPage';
import { StoreSettingsPage } from '../settings/StoreSettingsPage';
import { 
  MerchantTab, 
  AccountSubSection,
  MERCHANT_PRIMARY_NAV_ITEMS, 
  resolveMerchantTab 
} from './merchantNavigationConfig';
import { CANONICAL_SYSTEM_KPIS, CANONICAL_MERCHANT } from '../../data/canonicalCatalog';
import { useMerchantSession } from '../../state/useMerchantSession';

// Re-export type for consumers
export type { MerchantTab };

interface MerchantExperienceProps {
  initialTab?: MerchantTab | string;
  onNavigateLanding?: () => void;
}

export const MerchantExperience: React.FC<MerchantExperienceProps> = ({
  initialTab = 'home',
  onNavigateLanding
}) => {
  // Canonical Session Coordinator
  const {
    activeTab,
    setActiveTab,
    issues,
    openIssuesCount,
    readinessScore,
    isRechecking,
    runRecheckSimulation,
    approveIssue: handleApproveIssue,
    dismissIssue: handleDismissIssue,
    updateIssue: handleUpdateIssue
  } = useMerchantSession(initialTab);

  // Secondary Modals & Surfaces
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountSection, setAccountSection] = useState<AccountSubSection>('connections');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDetailProductId, setSelectedDetailProductId] = useState<string | null>(null);
  const [isSettingsViewOpen, setIsSettingsViewOpen] = useState(false);

  const handleTabSwitch = (tab: MerchantTab) => {
    setActiveTab(tab);
    setSelectedDetailProductId(null);
    setIsSettingsViewOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleOpenAccount = (section: AccountSubSection = 'connections') => {
    setAccountSection(section);
    setIsAccountOpen(true);
  };

  const handleScanUrl = (url: string) => {
    // When a URL is scanned from Add Products modal, take merchant to Visibility to inspect discovery
    handleTabSwitch('visibility');
  };

  const handleImportSample = () => {
    handleTabSwitch('catalog');
  };

  // Map Lucide icons dynamically for primary tabs
  const getPrimaryIcon = (id: MerchantTab, isActive: boolean) => {
    switch (id) {
      case 'home':
        return <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
      case 'audit':
      case 'visibility':
        return <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-orange-400' : 'text-orange-600'}`} />;
      case 'products':
      case 'catalog':
        return <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
      case 'actions':
      case 'issues':
        return <AlertTriangle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />;
      default:
        return null;
    }
  };

  // Map badges for primary tabs
  const getPrimaryBadge = (id: MerchantTab, isActive: boolean) => {
    switch (id) {
      case 'products':
      case 'catalog':
        return (
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
          }`}>
            {CANONICAL_SYSTEM_KPIS.totalCatalogProducts}
          </span>
        );
      case 'actions':
      case 'issues':
        return (
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-amber-400/30 text-amber-200' : 'bg-rose-100 text-rose-800'
          }`}>
            {openIssuesCount}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Single Authoritative Merchant Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left Zone: Brand Wordmark + EXACT 4 Primary Navigation Items */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
              {/* Brand Wordmark */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('home');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none shrink-0"
                title="AIXSHOP Home"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors leading-none">
                    AIXSHOP
                  </span>
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wide hidden sm:inline leading-tight mt-0.5">
                    Merchant Console
                  </span>
                </div>
              </button>

              {/* Primary Merchant Navigation: Desktop (md and above) */}
              <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 shrink-0 py-1" aria-label="Merchant Primary Navigation">
                {MERCHANT_PRIMARY_NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabSwitch(item.id)}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive && !selectedDetailProductId && !isSettingsViewOpen
                          ? 'bg-stone-900 text-white shadow-xs font-bold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {getPrimaryIcon(item.id, isActive)}
                      <span>{item.label}</span>
                      {getPrimaryBadge(item.id, isActive)}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right Zone: Primary CTA (+ Add Products) + Account + Mobile Hamburger Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Return to Public Landing / Store Check */}
              {onNavigateLanding && (
                <button
                  type="button"
                  onClick={onNavigateLanding}
                  className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200/80"
                  title="Return to Public Landing & Store URL Quick Check"
                >
                  <Compass className="w-3.5 h-3.5 text-orange-600" />
                  <span>Store Check</span>
                </button>
              )}

              {/* Primary Merchant CTA: + Add Products */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-98"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Add Products</span>
                <span className="sm:hidden">Add</span>
              </button>

              {/* Desktop Account & Settings Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsSettingsViewOpen(!isSettingsViewOpen);
                  setSelectedDetailProductId(null);
                }}
                className={`hidden md:flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition-colors cursor-pointer border ${
                  isSettingsViewOpen 
                    ? 'bg-orange-50 text-orange-900 border-orange-300' 
                    : 'hover:bg-stone-100 text-stone-700 border-stone-200/80'
                }`}
                aria-label="Account Settings"
                title={`Account & Settings: ${CANONICAL_MERCHANT.name}`}
              >
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div className="flex flex-col text-left leading-tight hidden lg:flex">
                  <span className="text-xs font-bold text-stone-900 truncate max-w-[120px]">{CANONICAL_MERCHANT.name}</span>
                  <span className="text-[10px] text-stone-400">Settings</span>
                </div>
                <span className="text-xs font-semibold text-stone-700 hidden sm:inline lg:hidden">Account</span>
              </button>

              {/* Mobile Hamburger / Dropdown Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer border border-stone-200/80 relative"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-stone-800" />
                ) : (
                  <Menu className="w-5 h-5 text-stone-800" />
                )}
                {openIssuesCount > 0 && !isMobileMenuOpen && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200/80 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-4 shadow-xl">
            
            {/* Store & Account Status Row */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs border border-orange-200/60">
                  AP
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-stone-900 leading-tight">{CANONICAL_MERCHANT.name}</span>
                  <span className="text-[10px] text-stone-500 font-mono">shop.aeropulse.com · Connected</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenAccount('settings');
                }}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>

            {/* All 4 Primary Navigation Items */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2 pb-1">
                Navigation
              </div>
              {MERCHANT_PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white font-bold shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getPrimaryIcon(item.id, isActive)}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPrimaryBadge(item.id, isActive)}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white/60' : 'text-stone-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Store Account & Settings Section */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-2">
                Store & Config
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleOpenAccount('connections');
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/60 transition-colors cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-stone-500 mb-1" />
                  <span className="text-[11px] font-semibold">Connections</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleOpenAccount('subscription');
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/60 transition-colors cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-stone-500 mb-1" />
                  <span className="text-[11px] font-semibold">Subscription</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleOpenAccount('settings');
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200/60 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-stone-500 mb-1" />
                  <span className="text-[11px] font-semibold">Settings</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* 2. Main Active Merchant Workspace */}
      <main className="flex-1 pb-20 md:pb-6">
        {selectedDetailProductId ? (
          <ProductDetailPage
            productId={selectedDetailProductId}
            onBack={() => setSelectedDetailProductId(null)}
            onNavigateActions={() => {
              setSelectedDetailProductId(null);
              setActiveTab('actions');
            }}
            onNavigateProducts={() => {
              setSelectedDetailProductId(null);
              setActiveTab('products');
            }}
            issues={issues}
            onApproveIssue={handleApproveIssue}
            onRecheckProduct={runRecheckSimulation}
          />
        ) : isSettingsViewOpen ? (
          <StoreSettingsPage
            onBack={() => setIsSettingsViewOpen(false)}
            onNavigateCatalog={() => {
              setIsSettingsViewOpen(false);
              setActiveTab('products');
            }}
            onNavigateAudit={() => {
              setIsSettingsViewOpen(false);
              setActiveTab('audit');
            }}
          />
        ) : activeTab === 'home' ? (
          <MerchantOverviewHome
            onNavigateIssues={() => setActiveTab('actions')}
            onNavigateProducts={() => setActiveTab('products')}
            onNavigateVisibility={() => setActiveTab('audit')}
            onAddProducts={() => setIsAddModalOpen(true)}
            issues={issues}
            onApproveIssue={handleApproveIssue}
            onDismissIssue={handleDismissIssue}
            readinessScore={readinessScore}
            onRecheckStore={runRecheckSimulation}
            isRechecking={isRechecking}
          />
        ) : activeTab === 'audit' || activeTab === 'visibility' ? (
          <div className="py-2">
            <StoreAuditPage
              onNavigateHome={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateActions={() => setActiveTab('actions')}
              onInspectProduct={(productId) => setSelectedDetailProductId(productId)}
              issues={issues}
              onApproveIssue={handleApproveIssue}
              onDismissIssue={handleDismissIssue}
              readinessScore={readinessScore}
              onRecheckStore={runRecheckSimulation}
              isRechecking={isRechecking}
            />
          </div>
        ) : activeTab === 'products' || activeTab === 'catalog' ? (
          <div className="py-2">
            <ProductsWorkbenchPage
              onBackToLanding={() => setActiveTab('home')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateIssues={() => setActiveTab('actions')}
              onNavigateAnalysis={() => setActiveTab('audit')}
              onNavigateReport={() => setActiveTab('audit')}
              onSelectProductDetail={(productId) => setSelectedDetailProductId(productId)}
            />
          </div>
        ) : activeTab === 'actions' || activeTab === 'issues' ? (
          <div className="py-2">
            <IssuesPage
              onNavigateHome={() => setActiveTab('home')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('products')}
              issues={issues}
              onUpdateIssue={handleUpdateIssue}
            />
          </div>
        ) : (
          <MerchantOverviewHome
            onNavigateIssues={() => setActiveTab('actions')}
            onNavigateProducts={() => setActiveTab('products')}
            onNavigateVisibility={() => setActiveTab('audit')}
            onAddProducts={() => setIsAddModalOpen(true)}
            issues={issues}
            onApproveIssue={handleApproveIssue}
            onDismissIssue={handleDismissIssue}
            readinessScore={readinessScore}
            onRecheckStore={runRecheckSimulation}
            isRechecking={isRechecking}
          />
        )}
      </main>

      {/* 3. Mobile Fixed Bottom Navigation Bar (Native mobile app UX) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around"
        aria-label="Mobile Bottom Navigation"
      >
        {MERCHANT_PRIMARY_NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative cursor-pointer min-w-[64px] ${
                isActive ? 'text-orange-600 font-bold' : 'text-stone-500 hover:text-stone-800 font-medium'
              }`}
            >
              <div className="relative">
                {getPrimaryIcon(item.id, isActive)}
                {(item.id === 'actions' || item.id === 'issues') && openIssuesCount > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 text-[9px] font-black bg-rose-500 text-white rounded-full leading-none py-0.5">
                    {openIssuesCount}
                  </span>
                )}
                {(item.id === 'products' || item.id === 'catalog') && (
                  <span className="absolute -top-1 -right-2 px-1 text-[9px] font-black bg-stone-200 text-stone-700 rounded-full leading-none py-0.5">
                    24
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-none">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 4. Add Products Modal */}
      <AddProductsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onScanUrl={handleScanUrl}
        onImportSample={handleImportSample}
      />

      {/* 4. Secondary Account Surface (Connections, Subscription, Settings) */}
      <MerchantAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialSection={accountSection}
      />

    </div>
  );
};
