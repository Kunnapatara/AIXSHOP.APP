// src/components/admin/AdminKpiBar.tsx
import React from 'react';
import { 
  Building2, 
  Package, 
  Radio, 
  Database, 
  GitFork, 
  AlertCircle, 
  ShieldAlert, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { sampleControlTowerKPIs } from '../../data/sampleAdminData';

interface AdminKpiBarProps {
  onFilterByConflict?: () => void;
  onFilterByIssues?: () => void;
  onFilterByEvidence?: () => void;
  onFilterBySources?: () => void;
}

export const AdminKpiBar: React.FC<AdminKpiBarProps> = ({
  onFilterByConflict,
  onFilterByIssues,
  onFilterByEvidence,
  onFilterBySources
}) => {
  const kpis = [
    {
      id: 'merchants',
      label: 'Merchants Observed',
      value: sampleControlTowerKPIs.merchantsObserved,
      subtext: sampleControlTowerKPIs.merchantName,
      badge: 'Preview Scope',
      icon: Building2,
      accent: 'cyan'
    },
    {
      id: 'products',
      label: 'Products in Graph',
      value: sampleControlTowerKPIs.productsInGraph,
      subtext: '68 Canonical Variants',
      badge: 'Canonical',
      icon: Package,
      accent: 'cyan'
    },
    {
      id: 'sources',
      label: 'Active Sources',
      value: sampleControlTowerKPIs.activeSources,
      subtext: 'Read-Only Pull Mode',
      badge: 'Authorized',
      icon: Radio,
      accent: 'indigo',
      onClick: onFilterBySources
    },
    {
      id: 'evidence',
      label: 'Evidence Records',
      value: sampleControlTowerKPIs.evidenceRecords,
      subtext: 'Verifiable Provenance',
      badge: 'Preview',
      icon: Database,
      accent: 'indigo',
      onClick: onFilterByEvidence
    },
    {
      id: 'conflicts',
      label: 'Open Conflicts',
      value: sampleControlTowerKPIs.openConflicts,
      subtext: 'Unmerged Truth Divergence',
      badge: 'Action Required',
      icon: GitFork,
      accent: 'amber',
      onClick: onFilterByConflict
    },
    {
      id: 'issues',
      label: 'Open Intelligence Issues',
      value: sampleControlTowerKPIs.openIssues,
      subtext: 'Triaged in Governance Queue',
      badge: 'Triage Queue',
      icon: AlertCircle,
      accent: 'amber',
      onClick: onFilterByIssues
    },
    {
      id: 'recovery',
      label: 'Recovery Workflows',
      value: sampleControlTowerKPIs.recoveryWorkflows,
      subtext: 'Class A/B/C remediations',
      badge: 'Preview Only',
      icon: ShieldAlert,
      accent: 'emerald'
    },
    {
      id: 'blocked',
      label: 'Evidence-Blocked Items',
      value: sampleControlTowerKPIs.evidenceBlockedItems,
      subtext: 'Awaiting Merchant Ground Truth',
      badge: 'Locked',
      icon: Lock,
      accent: 'rose'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isClickable = !!kpi.onClick;

          return (
            <div
              key={kpi.id}
              onClick={kpi.onClick}
              className={`p-3.5 rounded-2xl border transition-all duration-150 flex flex-col justify-between shadow-3xs ${
                kpi.accent === 'amber'
                  ? 'bg-amber-50/70 border-amber-200 hover:border-amber-300'
                  : kpi.accent === 'rose'
                  ? 'bg-rose-50/70 border-rose-200 hover:border-rose-300'
                  : kpi.accent === 'emerald'
                  ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-300'
                  : 'bg-white border-stone-200 hover:border-orange-200'
              } ${isClickable ? 'cursor-pointer hover:shadow-xs hover:-translate-y-0.5' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold truncate">
                    {kpi.label}
                  </span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    kpi.accent === 'amber' ? 'text-amber-700' :
                    kpi.accent === 'rose' ? 'text-rose-700' :
                    kpi.accent === 'emerald' ? 'text-emerald-700' :
                    'text-[#F97316]'
                  }`} />
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 font-mono tracking-tight">
                  {kpi.value}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between text-[10px]">
                <span className="text-stone-500 truncate max-w-[85%]">{kpi.subtext}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono uppercase font-bold ${
                  kpi.accent === 'amber' ? 'bg-amber-100 text-amber-800' :
                  kpi.accent === 'rose' ? 'bg-rose-100 text-rose-800' :
                  'bg-stone-100 text-stone-700'
                }`}>
                  {kpi.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
