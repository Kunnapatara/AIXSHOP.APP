import React from 'react';
import { 
  Package, 
  Layers, 
  Tag, 
  FileCheck, 
  Activity, 
  Compass, 
  AlertCircle, 
  Workflow, 
  BarChart3, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CurrentSubscriptionState } from '../../types/billing';

interface UsageBreakdownSectionProps {
  subscription: CurrentSubscriptionState;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
}

export const UsageBreakdownSection: React.FC<UsageBreakdownSectionProps> = ({
  subscription,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateIntegrations,
  onNavigateAnalytics
}) => {
  const usageItems = [
    {
      id: 'products',
      name: 'Monitored Parent Products',
      current: '24',
      capacity: '2,000 max',
      percentage: 1.2,
      isBillableUnit: true,
      unitNote: 'Sole Billable Capacity Unit',
      desc: 'Active parent products in the canonical AeroPulse catalog.',
      actionLabel: 'View Catalog',
      onAction: onNavigateProducts,
      icon: Package,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'variants',
      name: 'Observed Product Variants',
      current: '68',
      capacity: 'Included with Product',
      percentage: null,
      isBillableUnit: false,
      unitNote: 'Non-billable dimension',
      desc: 'Child variants (size, color, width) reconciled to parent products.',
      actionLabel: 'View Catalog',
      onAction: onNavigateProducts,
      icon: Layers,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      id: 'offers',
      name: 'Observed Market Offers',
      current: '42',
      capacity: 'Included across 18 items',
      percentage: null,
      isBillableUnit: false,
      unitNote: 'Non-billable dimension',
      desc: 'Multi-seller listings across direct D2C and authorized dealers.',
      actionLabel: 'View Offers',
      onAction: onNavigateOffers,
      icon: Tag,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/30'
    },
    {
      id: 'evidence',
      name: 'Evidence & Fact Records',
      current: '190+',
      capacity: 'Continuous stream',
      percentage: null,
      isBillableUnit: false,
      unitNote: 'Non-billable dimension',
      desc: 'Observed, Derived, and Merchant Verified attribute facts.',
      actionLabel: 'View Analytics',
      onAction: onNavigateAnalytics,
      icon: FileCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'monitoring',
      name: 'Autonomous Monitoring Scope',
      current: '24',
      capacity: '100% of catalog',
      percentage: 100,
      isBillableUnit: false,
      unitNote: 'Included in Pro Plan',
      desc: 'Hourly automated drift detection across 4 feed categories.',
      actionLabel: 'View Monitoring',
      onAction: onNavigateMonitoring,
      icon: Activity,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/30'
    },
    {
      id: 'discovery',
      name: 'Discovery Coverage Readiness',
      current: '24',
      capacity: '79% composite score',
      percentage: 79,
      isBillableUnit: false,
      unitNote: 'Included in Pro Plan',
      desc: 'Search, AI answers, and commerce feed structured compliance.',
      actionLabel: 'View Analytics',
      onAction: onNavigateAnalytics,
      icon: Compass,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/30'
    },
    {
      id: 'issues',
      name: 'Active Issues & Recovery',
      current: '8',
      capacity: '6 conflicts · 2 gaps',
      percentage: null,
      isBillableUnit: false,
      unitNote: 'Included in Pro Plan',
      desc: 'Triaged evidence gaps and cross-source GTIN/attribute conflicts.',
      actionLabel: 'View Issues',
      onAction: onNavigateIssues,
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'connectors',
      name: 'Authorized Ingestion Sources',
      current: '4',
      capacity: 'Expanded Connectors',
      percentage: null,
      isBillableUnit: false,
      unitNote: 'Included in Pro Plan',
      desc: 'Shopify Direct, Google Merchant Center, GS1 GDSN, RunRepeat.',
      actionLabel: 'View Integrations (P12)',
      onAction: onNavigateIntegrations,
      icon: Workflow,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30'
    }
  ];

  return (
    <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Intelligence Capacity Usage
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Audit how your catalog dimensions map to your Pro subscription tier and connected intelligence pipelines.
          </p>
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          Catalog Size: <strong className="text-white">24 Products</strong> (1,976 Headroom)
        </div>
      </div>

      {/* Grid of 8 usage dimensions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {usageItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                item.isBillableUnit
                  ? 'bg-[#0C1524] border-cyan-500/50 shadow-sm shadow-cyan-950/20'
                  : 'bg-[#0B121E] border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className={`p-1.5 rounded-lg border ${item.bg}`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    item.isBillableUnit
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-slate-800/80 text-slate-400 border border-slate-750'
                  }`}>
                    {item.unitNote}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-semibold text-white tracking-tight">{item.name}</h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white font-mono">{item.current}</span>
                    <span className="text-xs text-slate-400 font-mono">/ {item.capacity}</span>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {item.onAction ? (
                  <button
                    type="button"
                    onClick={item.onAction}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium cursor-pointer transition-colors"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500">Active</span>
                )}
                {item.isBillableUnit && (
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">1.2% Used</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
