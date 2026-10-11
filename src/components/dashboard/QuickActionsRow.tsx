import React from 'react';
import { Sparkles, HelpCircle, AlertTriangle, Tag, Compass, ArrowRight } from 'lucide-react';

interface QuickActionsRowProps {
  onAnalyzeProduct: () => void;
  onReviewGaps: () => void;
  onReviewConflicts: () => void;
  onReviewOffers: () => void;
  onReviewDiscovery: () => void;
}

export const QuickActionsRow: React.FC<QuickActionsRowProps> = ({
  onAnalyzeProduct,
  onReviewGaps,
  onReviewConflicts,
  onReviewOffers,
  onReviewDiscovery
}) => {
  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
          <span>Quick Actions</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-mono">
            Direct & Roadmap Shortcuts
          </span>
        </h3>
        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
          Analyze Product is active · Other shortcuts open future milestone previews
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Analyze Product - DIRECTLY ACTIVE */}
        <button
          type="button"
          onClick={onAnalyzeProduct}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-[0.98] cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>Analyze a Product</span>
          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-950 text-cyan-300">Active</span>
        </button>

        {/* Review Evidence Gaps */}
        <button
          type="button"
          onClick={onReviewGaps}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Review Evidence Gaps</span>
        </button>

        {/* Review Conflicts */}
        <button
          type="button"
          onClick={onReviewConflicts}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Review Conflicts</span>
        </button>

        {/* Review Offers */}
        <button
          type="button"
          onClick={onReviewOffers}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all cursor-pointer"
        >
          <Tag className="w-3.5 h-3.5 text-indigo-400" />
          <span>Review Offers</span>
        </button>

        {/* Review Discovery */}
        <button
          type="button"
          onClick={onReviewDiscovery}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Review Discovery</span>
          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-500">P08</span>
        </button>
      </div>
    </div>
  );
};
