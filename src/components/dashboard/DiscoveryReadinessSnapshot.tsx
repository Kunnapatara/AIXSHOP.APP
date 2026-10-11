import React from 'react';
import { Sparkles, Search, Bot, ShoppingCart, Zap, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CatalogDiscoverySurface } from '../../types/dashboard';

interface DiscoveryReadinessSnapshotProps {
  surfaces: CatalogDiscoverySurface[];
  onSelectSurface: (surface: CatalogDiscoverySurface) => void;
}

export const DiscoveryReadinessSnapshot: React.FC<DiscoveryReadinessSnapshotProps> = ({
  surfaces,
  onSelectSurface
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Search':
        return <Search className="w-4 h-4 text-cyan-400" />;
      case 'AI':
        return <Bot className="w-4 h-4 text-indigo-400" />;
      case 'Commerce':
        return <ShoppingCart className="w-4 h-4 text-emerald-400" />;
      case 'AIXSHOP':
        return <Zap className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Needs Attention':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Discovery Readiness</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              4 Surface Types
            </span>
          </div>
          <p className="text-xs text-slate-400 pt-0.5">
            Audit of machine-readable schema compliance and attribute consensus across external consumption surfaces.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono">Click a surface card to inspect diagnostic</span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Mandatory Diagnostic Disclaimer: </strong>
          These are machine-readability and schema compliance diagnostic signals, <strong>not ranking or visibility guarantees</strong>. 
          AIXSHOP does not guarantee placement or recommendations on Google, Perplexity, Gemini, ChatGPT, or shopping marketplaces.
        </p>
      </div>

      {/* 4 Surfaces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {surfaces.map((surf) => {
          return (
            <div
              key={surf.surfaceId}
              onClick={() => onSelectSurface(surf)}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer group space-y-3 flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectSurface(surf);
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {getIcon(surf.surfaceType)}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getStatusBadge(surf.readinessStatus)}`}>
                    {surf.readinessStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {surf.surfaceName}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-mono font-bold text-white">{surf.readinessPercentage}%</span>
                    <span className="text-[10px] text-slate-400 font-mono">Schema Readability</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Major Diagnostic Gap</span>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {surf.majorGap}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Affected Catalog:</span>
                <span className="text-amber-400 font-bold">{surf.affectedProductCount} SKUs</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
