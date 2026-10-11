import React from 'react';
import { Shield, Eye, ShieldCheck, Sparkles, AlertTriangle, HelpCircle, Info } from 'lucide-react';
import { CatalogEvidenceHealthItem } from '../../types/dashboard';
import { EvidenceState } from '../../types/landing';

interface EvidenceHealthSectionProps {
  items: CatalogEvidenceHealthItem[];
  onSelectState: (state: EvidenceState) => void;
}

export const EvidenceHealthSection: React.FC<EvidenceHealthSectionProps> = ({
  items,
  onSelectState
}) => {
  const getIcon = (state: EvidenceState) => {
    switch (state) {
      case 'OBSERVED':
        return <Eye className="w-4 h-4 text-cyan-400" />;
      case 'MERCHANT_VERIFIED':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'DERIVED':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'CONFLICT':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'MISSING':
        return <HelpCircle className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">Evidence Health</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            5 Epistemic States
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono">Click any state for epistemic definition</span>
      </div>

      {/* Mandatory Philosophical Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Catalog Evidence Distribution: </strong>
          These percentages describe the provenance breakdown of modeled catalog facts across 5 epistemic states. 
          <span className="text-amber-400/90 font-medium"> They are not accuracy percentages</span>, nor subjective confidence ratings.
        </p>
      </div>

      {/* 5 States Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
        {items.map((item) => (
          <div
            key={item.state}
            onClick={() => onSelectState(item.state)}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer group space-y-2 flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectState(item.state);
            }}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="p-1 rounded-lg bg-slate-800/80">
                  {getIcon(item.state)}
                </div>
                <span className="text-lg font-mono font-bold text-white">
                  {item.percentage}%
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-200 block group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {item.count} catalog claims
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
              Rule: <span className="text-slate-300">{item.ruleOfTruth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
