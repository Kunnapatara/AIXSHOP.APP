import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PriorityMatrixQuadrant, MatrixQuadrantId } from '../../types/dashboard';

interface CatalogPriorityMatrixProps {
  quadrants: PriorityMatrixQuadrant[];
}

export const CatalogPriorityMatrix: React.FC<CatalogPriorityMatrixProps> = ({
  quadrants
}) => {
  const [selectedQuadrantId, setSelectedQuadrantId] = useState<MatrixQuadrantId>('high-impact-low-conf');

  const selectedQuadrant = quadrants.find(q => q.id === selectedQuadrantId) || quadrants[0];

  const getQuadrantClasses = (id: MatrixQuadrantId, isSelected: boolean) => {
    switch (id) {
      case 'high-impact-low-conf':
        return isSelected 
          ? 'bg-rose-950/30 border-rose-500 shadow-rose-950/50 shadow-lg' 
          : 'bg-rose-950/15 border-rose-500/30 hover:border-rose-500/60';
      case 'high-impact-high-conf':
        return isSelected 
          ? 'bg-emerald-950/30 border-emerald-500 shadow-emerald-950/50 shadow-lg' 
          : 'bg-emerald-950/15 border-emerald-500/30 hover:border-emerald-500/60';
      case 'low-impact-low-conf':
        return isSelected 
          ? 'bg-amber-950/30 border-amber-500 shadow-amber-950/50 shadow-lg' 
          : 'bg-amber-950/15 border-amber-500/30 hover:border-amber-500/60';
      case 'low-impact-high-conf':
        return isSelected 
          ? 'bg-slate-900 border-cyan-500 shadow-cyan-950/50 shadow-lg' 
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700';
    }
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Catalog Priority Matrix</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold">
              Where Should You Act First?
            </span>
          </div>
          <p className="text-xs text-slate-400 pt-0.5">
            2×2 Decision Grid: Balancing Shopper Journey Impact against Ground-Truth Evidence Confidence.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono">Select a quadrant to view operational triage</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
        {/* 2x2 Matrix Visual */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>↑ High Buyer Impact</span>
            <span>Low Confidence ← | → High Confidence</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quadrants.map((quad) => {
              const isSelected = quad.id === selectedQuadrantId;

              return (
                <div
                  key={quad.id}
                  onClick={() => setSelectedQuadrantId(quad.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 relative ${getQuadrantClasses(quad.id, isSelected)}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedQuadrantId(quad.id);
                  }}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-white leading-tight">
                      {quad.label}
                    </span>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 shrink-0">
                      {quad.representativeItemsCount}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-300 block">
                    {quad.subtitle}
                  </span>

                  <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                    {quad.recommendedAction}
                  </p>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-500/20"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-400 px-1">
            ↓ Low Buyer Impact
          </div>
        </div>

        {/* Quadrant Detail Panel */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Selected Strategy Quadrant
              </span>
              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {selectedQuadrant.representativeItemsCount} Catalog Items
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                {selectedQuadrant.label}
              </h4>
              <p className="text-xs text-amber-300 font-mono mt-0.5">
                {selectedQuadrant.subtitle}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-400 block">Recommended Action</span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedQuadrant.recommendedAction}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Representative Sample Findings</span>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedQuadrant.sampleItems.map((sample, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 text-xs mt-0.5">•</span>
                    <span>{sample}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              <strong className="text-slate-300">Rationale: </strong>
              {selectedQuadrant.rationale}
            </p>
          </div>

          <div className="text-[10px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
            Impact: {selectedQuadrant.impact} · Confidence: {selectedQuadrant.confidence}
          </div>
        </div>
      </div>
    </div>
  );
};
