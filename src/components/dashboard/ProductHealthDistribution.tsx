import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { ProductHealthDistribution as HealthDistType } from '../../types/dashboard';

interface ProductHealthDistributionProps {
  distribution: HealthDistType;
}

export const ProductHealthDistribution: React.FC<ProductHealthDistributionProps> = ({
  distribution
}) => {
  const strongPct = Math.round((distribution.strongCount / distribution.totalCatalogCount) * 100);
  const needsAttentionPct = Math.round((distribution.needsAttentionCount / distribution.totalCatalogCount) * 100);
  const criticalPct = Math.round((distribution.criticalCount / distribution.totalCatalogCount) * 100);

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">Product Health Distribution</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {distribution.totalCatalogCount} Products
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono">Catalog Integrity Segmentation</span>
      </div>

      {/* Horizontal Segmented Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Catalog Health Breakdown</span>
          <span>100% of Catalog Evaluated</span>
        </div>

        <div className="h-3.5 w-full rounded-full bg-slate-900 border border-slate-800 flex overflow-hidden p-0.5 gap-0.5">
          <div 
            className="h-full bg-emerald-500 rounded-l-full transition-all" 
            style={{ width: `${strongPct}%` }}
            title={`Strong: ${distribution.strongCount} products (${strongPct}%)`}
          ></div>
          <div 
            className="h-full bg-amber-500 transition-all" 
            style={{ width: `${needsAttentionPct}%` }}
            title={`Needs Attention: ${distribution.needsAttentionCount} products (${needsAttentionPct}%)`}
          ></div>
          <div 
            className="h-full bg-rose-500 rounded-r-full transition-all" 
            style={{ width: `${criticalPct}%` }}
            title={`Critical: ${distribution.criticalCount} products (${criticalPct}%)`}
          ></div>
        </div>
      </div>

      {/* 3 Categories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Strong */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-emerald-400">Strong</span>
            </div>
            <span className="text-sm font-mono font-bold text-white">
              {distribution.strongCount} <span className="text-[11px] text-slate-500 font-normal">({strongPct}%)</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Product intelligence mostly complete. Multi-source verified attributes and established global identifiers.
          </p>
        </div>

        {/* Needs Attention */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-xs font-bold text-amber-400">Needs Attention</span>
            </div>
            <span className="text-sm font-mono font-bold text-white">
              {distribution.needsAttentionCount} <span className="text-[11px] text-slate-500 font-normal">({needsAttentionPct}%)</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            One or more meaningful evidence gaps (e.g. missing return policy schema, unverified heel drop specs).
          </p>
        </div>

        {/* Critical */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <span className="text-xs font-bold text-rose-400">Critical</span>
            </div>
            <span className="text-sm font-mono font-bold text-white">
              {distribution.criticalCount} <span className="text-[11px] text-slate-500 font-normal">({criticalPct}%)</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Important unresolved conflicts or missing identity elements (e.g. variant GTIN conflicts, material discrepancies).
          </p>
        </div>
      </div>
    </div>
  );
};
