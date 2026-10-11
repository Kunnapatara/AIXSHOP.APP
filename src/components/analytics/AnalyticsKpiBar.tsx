// src/components/analytics/AnalyticsKpiBar.tsx
import React, { useState } from 'react';
import { 
  Package, 
  Layers, 
  ShieldCheck, 
  AlertCircle, 
  GitCompare, 
  CheckCircle2, 
  Info,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import { AnalyticsSummaryKPIs } from '../../types/analytics';

interface AnalyticsKpiBarProps {
  kpis: AnalyticsSummaryKPIs;
  onFilterByKpi?: (kpiKey: string) => void;
  onNavigateIssues: () => void;
  onNavigateProducts: () => void;
  onOpenDefinitions: () => void;
}

export const AnalyticsKpiBar: React.FC<AnalyticsKpiBarProps> = ({
  kpis,
  onFilterByKpi,
  onNavigateIssues,
  onNavigateProducts,
  onOpenDefinitions
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const kpiItems = [
    {
      id: 'products',
      label: 'Products Analyzed',
      value: kpis.productsAnalyzed.toString(),
      subtext: '68 SKU variants modeled',
      badge: 'Catalog Base',
      badgeColor: 'bg-stone-100 text-stone-700 border-stone-200',
      icon: Package,
      iconColor: 'text-[#F97316]',
      explanation: 'Total distinct product models in the catalog currently indexed and monitored by the AIXSHOP intelligence engine.',
      onClick: onNavigateProducts
    },
    {
      id: 'coverage',
      label: 'Intelligence Coverage',
      value: `${kpis.intelligenceCoveragePercentage}%`,
      subtext: '+6% over 4 weeks',
      badge: 'Grounded Model',
      badgeColor: 'bg-orange-50 text-[#F97316] border-orange-200',
      icon: Layers,
      iconColor: 'text-[#F97316]',
      explanation: 'Representative proportion of modeled product intelligence dimensions currently populated with usable, machine-readable evidence.',
      onClick: () => onFilterByKpi?.('coverage')
    },
    {
      id: 'completeness',
      label: 'Evidence Completeness',
      value: `${kpis.evidenceCompletenessPercentage}%`,
      subtext: '166 verified facts',
      badge: 'Provenanced',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ShieldCheck,
      iconColor: 'text-blue-600',
      explanation: 'Proportion of product assertions backed by OBSERVED, DERIVED, or MERCHANT VERIFIED provenance records. Missing states do not contribute.',
      onClick: () => onFilterByKpi?.('evidence')
    },
    {
      id: 'issues',
      label: 'Open Issues',
      value: kpis.openIssuesCount.toString(),
      subtext: '3 critical blockers',
      badge: 'Requires Action',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle,
      iconColor: 'text-amber-600',
      explanation: 'Diagnosed catalog anomalies that degrade discovery readiness or produce buyer confusion. Change ≠ Issue.',
      onClick: onNavigateIssues
    },
    {
      id: 'conflicts',
      label: 'Conflicts',
      value: kpis.conflictsCount.toString(),
      subtext: '2 variant · 3 attribute · 1 offer',
      badge: 'Discrepant Sources',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: GitCompare,
      iconColor: 'text-rose-600',
      explanation: 'Count of active discrepancies where two or more authoritative sources provide incompatible factual values.',
      onClick: onNavigateIssues
    },
    {
      id: 'recovery',
      label: 'Recovery Resolution',
      value: `${kpis.recoveryResolutionPercentage}%`,
      subtext: '4 of 8 resolved',
      badge: 'Workflow Metric',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      explanation: 'Proportion of detected issues that have advanced to validated resolution or merchant-confirmed recovery. Measures intelligence workflows, not merchant backend changes.',
      onClick: onNavigateIssues
    }
  ];

  return (
    <div className="w-full bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-900 tracking-wide uppercase">Core Intelligence Metrics</span>
          <span className="text-[11px] text-stone-400 font-mono">· Representative Diagnostic Baseline</span>
        </div>
        <button
          type="button"
          onClick={onOpenDefinitions}
          className="text-xs font-bold text-[#F97316] hover:text-orange-700 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Metric Definitions Guide</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiItems.map((item) => {
          const Icon = item.icon;
          const isTooltipActive = activeTooltip === item.id;

          return (
            <div
              key={item.id}
              className="relative group bg-stone-50 hover:bg-stone-100/90 border border-stone-200 hover:border-orange-300 rounded-2xl p-3.5 transition-all cursor-pointer shadow-3xs"
              onClick={item.onClick}
              onMouseEnter={() => setActiveTooltip(item.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  item.onClick();
                }
              }}
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              {/* Metric Value */}
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-black font-mono tracking-tight text-stone-900">
                  {item.value}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#F97316] transition-colors" />
              </div>

              {/* Metric Label & Subtext */}
              <div className="mt-1">
                <div className="text-xs font-bold text-stone-800 group-hover:text-stone-950 transition-colors">
                  {item.label}
                </div>
                <div className="text-[11px] text-stone-500 font-mono mt-0.5 truncate">
                  {item.subtext}
                </div>
              </div>

              {/* Hover / Focus Diagnostic Explanation */}
              {isTooltipActive && (
                <div className="absolute z-30 bottom-full left-0 mb-2 w-64 p-3 rounded-2xl bg-stone-900 border border-stone-800 text-left text-[11px] text-stone-200 shadow-xl pointer-events-none">
                  <div className="font-bold text-[#F97316] mb-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>{item.label}</span>
                  </div>
                  <p className="leading-relaxed text-stone-300">{item.explanation}</p>
                  <div className="mt-2 pt-1.5 border-t border-stone-800 text-[10px] text-stone-400 italic">
                    Click card to drill down or navigate to associated workspace
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
