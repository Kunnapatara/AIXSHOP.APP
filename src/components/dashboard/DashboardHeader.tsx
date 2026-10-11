import React from 'react';
import { Sparkles, Clock, AlertTriangle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onAnalyzeClick: () => void;
  onViewIssuesClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onAnalyzeClick,
  onViewIssuesClick
}) => {
  return (
    <div className="relative border-b border-slate-800 bg-gradient-to-b from-[#0F172A]/70 via-[#0B111D]/90 to-[#090D14] pt-8 pb-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Title & Status */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Merchant Overview
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Representative Merchant · Preview Mode
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
              See what your product catalog knows, what it cannot verify, and what needs attention.
            </p>

            {/* Last Catalog Analysis Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Last Catalog Analysis:</span>
                <span className="text-slate-200 font-semibold">Today at 08:42 AM UTC</span>
                <span className="text-slate-600">·</span>
                <span className="text-amber-400/90 font-sans">Snapshot Preview (No live sync)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
                <span>Scope: 24 Representative SKUs</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onViewIssuesClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>View Issues</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                8 Attention
              </span>
            </button>

            <button
              type="button"
              onClick={onAnalyzeClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Analyze a Product</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
