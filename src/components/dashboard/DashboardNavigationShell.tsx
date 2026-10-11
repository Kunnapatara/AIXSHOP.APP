import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  Compass, 
  Activity, 
  AlertCircle, 
  Workflow, 
  BarChart3, 
  CreditCard,
  Building2,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Server
} from 'lucide-react';

interface DashboardNavigationShellProps {
  onSelectFuturePage?: (pageName: string, description: string, pageId?: string) => void;
  onBoundaryClick?: (pageId: string, pageName: string, description: string) => void;
  onNavigateHome?: () => void;
  onNavigateLanding?: () => void;
  onNavigateAnalysis: () => void;
  onNavigateReport: () => void;
  onNavigateOverview?: () => void;
  onNavigateDashboard?: () => void;
  onNavigateProducts?: () => void;
  onNavigateWorkbench?: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateFixWorkflow?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateBilling?: () => void;
  onNavigateAdmin?: () => void;
  activeTab?: 'overview' | 'products' | 'offers' | 'discovery' | 'monitoring' | 'issues' | 'integrations' | 'analytics' | 'billing' | 'admin';
  currentPage?: 'overview' | 'products' | 'offers' | 'discovery' | 'monitoring' | 'issues' | 'integrations' | 'analytics' | 'billing' | 'admin';
  currentActive?: 'overview' | 'products' | 'offers' | 'discovery' | 'monitoring' | 'issues' | 'integrations' | 'analytics' | 'billing' | 'admin';
  hideNavShell?: boolean;
  children?: React.ReactNode;
}

export const DashboardNavigationShell: React.FC<DashboardNavigationShellProps> = ({
  onSelectFuturePage,
  onBoundaryClick,
  onNavigateHome,
  onNavigateLanding,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateOverview,
  onNavigateDashboard,
  onNavigateProducts,
  onNavigateWorkbench,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateFixWorkflow,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onNavigateAdmin,
  activeTab,
  currentPage,
  currentActive: currentActiveProp,
  hideNavShell = false,
  children
}) => {
  if (hideNavShell) {
    return <>{children}</>;
  }

  const currentActive = currentActiveProp || currentPage || activeTab || 'overview';
  const handleHome = onNavigateLanding || onNavigateHome || (() => {});
  const handleOverview = onNavigateDashboard || onNavigateOverview;
  const handleProducts = onNavigateWorkbench || onNavigateProducts;

  const triggerFutureBoundary = (pageName: string, description: string, pageId: string) => {
    if (onBoundaryClick) {
      onBoundaryClick(pageId, pageName, description);
    } else if (onSelectFuturePage) {
      onSelectFuturePage(pageName, description, pageId);
    }
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Home',
      icon: LayoutDashboard,
      status: currentActive === 'overview' ? 'active' : 'ready',
      badge: currentActive === 'overview' ? 'Active' : 'Ready'
    },
    {
      id: 'products',
      label: 'Catalog',
      icon: Package,
      status: currentActive === 'products' ? 'active' : 'ready',
      badge: currentActive === 'products' ? 'Active' : 'Ready',
      desc: 'Catalog-wide multi-product specification editor, GS1 barcode manager, and variant inheritance rules.'
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: AlertCircle,
      status: currentActive === 'issues' ? 'active' : 'ready',
      badge: currentActive === 'issues' ? 'Active' : 'Ready',
      desc: 'Centralized evidence gap triage, merchant arbitration queue, and automated Schema.org remediation.'
    },
    {
      id: 'discovery',
      label: 'Readiness',
      icon: Compass,
      status: currentActive === 'discovery' ? 'active' : 'ready',
      badge: currentActive === 'discovery' ? 'Active' : '79%',
      desc: 'Autonomous AI answer engine readiness, structured feed audits, and buyer intent query simulations.'
    },
    {
      id: 'offers',
      label: 'Offers & Pricing',
      icon: DollarSign,
      status: currentActive === 'offers' ? 'active' : 'ready',
      badge: currentActive === 'offers' ? 'Active' : 'Ready',
      desc: 'Multi-seller commercial offer intelligence, time-dependent pricing, availability tracking, and dispersion analysis.'
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: Activity,
      status: currentActive === 'monitoring' ? 'active' : 'ready',
      badge: currentActive === 'monitoring' ? 'Active' : 'Ready',
      desc: 'Continuous ground-truth drift detection, schema regression alerts, and unauthorized seller notifications.'
    },
    {
      id: 'shopper',
      label: 'Shopper View',
      icon: ExternalLink,
      status: 'ready',
      badge: 'Public Surface',
      desc: 'Public-facing evidence-grounded Shopper Product Intelligence Page with multi-seller offers and conflict transparency.'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Workflow,
      status: currentActive === 'integrations' ? 'active' : 'ready',
      badge: currentActive === 'integrations' ? 'Active' : 'Ready',
      desc: 'Authorized data connections, least-privilege permission models, and structured feed ingestors.'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      status: currentActive === 'analytics' ? 'active' : 'ready',
      badge: currentActive === 'analytics' ? 'Active' : 'Ready',
      desc: 'Measure the quality, coverage, change, and recovery of your product intelligence.'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      status: currentActive === 'billing' ? 'active' : 'ready',
      badge: currentActive === 'billing' ? 'Active' : 'Ready',
      desc: 'Merchant subscription tiers, catalog SKU quota controls, and representative billing records.'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-stone-200/80 text-stone-800 shadow-xs">
      {/* Upper Merchant Identity Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200/80">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-stone-900 tracking-wide">AeroPulse Athletics</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
              Representative Merchant
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-[11px]">Catalog Synced · Multi-Channel Ground Truth</span>
          </div>
        </div>

        {/* Global Page Switcher for Smooth Testing */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-stone-400 text-[11px] mr-1 hidden md:inline">Jump to:</span>
          <button
            type="button"
            onClick={handleHome}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Landing
          </button>
          <button
            type="button"
            onClick={onNavigateAnalysis}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Analysis
          </button>
          <button
            type="button"
            onClick={onNavigateReport}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Report
          </button>
          {currentActive === 'overview' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Overview
            </span>
          ) : (
            <button
              type="button"
              onClick={handleOverview}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Overview
            </button>
          )}
          {currentActive === 'products' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Products
            </span>
          ) : (
            <button
              type="button"
              onClick={handleProducts}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Products
            </button>
          )}
          {currentActive === 'offers' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Offers
            </span>
          ) : (
            <button
              type="button"
              onClick={onNavigateOffers}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Offers
            </button>
          )}
          {currentActive === 'discovery' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Discovery
            </span>
          ) : onNavigateDiscovery ? (
            <button
              type="button"
              onClick={onNavigateDiscovery}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Discovery
            </button>
          ) : null}
          {currentActive === 'monitoring' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Monitoring
            </span>
          ) : (
            <button
              type="button"
              onClick={onNavigateMonitoring}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Monitoring
            </button>
          )}
          {currentActive === 'issues' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Issues
            </span>
          ) : (
            <button
              type="button"
              onClick={onNavigateIssues}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Issues
            </button>
          )}
          {onNavigateShopper && (
            <button
              type="button"
              onClick={onNavigateShopper}
              className="px-2.5 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-200/80 text-[11px] font-bold transition-colors cursor-pointer"
            >
              Shopper
            </button>
          )}
          {currentActive === 'integrations' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Integrations
            </span>
          ) : onNavigateIntegrations ? (
            <button
              type="button"
              onClick={onNavigateIntegrations}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Integrations
            </button>
          ) : null}
          {currentActive === 'analytics' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Analytics
            </span>
          ) : onNavigateAnalytics ? (
            <button
              type="button"
              onClick={onNavigateAnalytics}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Analytics
            </button>
          ) : null}
          {currentActive === 'billing' ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#F97316] text-white text-[11px] font-bold shadow-xs">
              Billing
            </span>
          ) : onNavigateBilling ? (
            <button
              type="button"
              onClick={onNavigateBilling}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Billing
            </button>
          ) : null}
          {onNavigateAdmin && (
            <button
              type="button"
              onClick={onNavigateAdmin}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <Server className="w-3 h-3 text-orange-400" />
              <span>Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Merchant Navigation Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-1 overflow-x-auto py-2 scrollbar-none" aria-label="Merchant Navigation">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.status === 'active';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'overview' && handleOverview) {
                      handleOverview();
                    } else if (item.id === 'products' && handleProducts) {
                      handleProducts();
                    } else if (item.id === 'offers' && onNavigateOffers) {
                      onNavigateOffers();
                    } else if (item.id === 'discovery' && onNavigateDiscovery) {
                      onNavigateDiscovery();
                    } else if (item.id === 'monitoring' && onNavigateMonitoring) {
                      onNavigateMonitoring();
                    } else if (item.id === 'issues' && onNavigateIssues) {
                      onNavigateIssues();
                    } else if (item.id === 'shopper' && onNavigateShopper) {
                      onNavigateShopper();
                    } else if (item.id === 'integrations' && onNavigateIntegrations) {
                      onNavigateIntegrations();
                    } else if (item.id === 'analytics' && onNavigateAnalytics) {
                      onNavigateAnalytics();
                    } else if (item.id === 'billing' && onNavigateBilling) {
                      onNavigateBilling();
                    } else if (!isActive) {
                      triggerFutureBoundary(item.label, item.desc || '', item.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F97316] text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent'
                  }`}
                  title={isActive ? 'Current View' : `${item.label} — ${item.badge}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Separated System Administrative Link */}
          {onNavigateAdmin && (
            <div className="pl-3 border-l border-stone-200 shrink-0">
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-black text-white transition-all cursor-pointer shadow-xs"
                title="Open Admin Control Tower & Evidence Console (System Level)"
              >
                <Server className="w-3.5 h-3.5 text-orange-400" />
                <span>Admin Control Tower</span>
              </button>
            </div>
          )}
        </nav>
      </div>
      {children}
    </div>
  );
};
