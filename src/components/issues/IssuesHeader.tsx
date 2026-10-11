// src/components/issues/IssuesHeader.tsx
// Header for Page 10 — Issues & Recovery Intelligence Workspace

import React from 'react';
import { 
  AlertOctagon, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  Wrench
} from 'lucide-react';

interface IssuesHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateOverview?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateFixWorkflow?: () => void;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
}

export const IssuesHeader: React.FC<IssuesHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onNavigateOverview,
  onNavigateMonitoring,
  onNavigateFixWorkflow,
  onNavigateProducts,
  onNavigateOffers
}) => {
  return (
    <div className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateOverview}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer border border-stone-200 font-medium text-xs shadow-3xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-stone-800 font-semibold">Issues</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] text-[11px] font-medium font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
              Preview Mode · Representative Timestamps
            </span>
            <span className="text-stone-500 text-[11px] hidden sm:inline">
              Merchant: <strong className="text-stone-800 font-medium">AeroPulse Athletics</strong> (24 Products)
            </span>
          </div>
        </div>

        {/* Main Title, Subtitle, and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 flex items-center gap-3">
                Issues & Recovery
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                  Intelligence Triage
                </span>
              </h1>
            </div>
            <p className="text-sm text-stone-500 max-w-3xl">
              Diagnose intelligence problems, review evidence, and recover product trust without guessing.
            </p>
          </div>

          {/* Search and Fast Nav */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search issues, SKUs, attributes..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            {onNavigateMonitoring && (
              <button
                type="button"
                onClick={onNavigateMonitoring}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-orange-300 text-stone-700 hover:text-[#F97316] text-xs font-semibold transition-colors cursor-pointer shadow-3xs"
                title="View Continuous Monitoring Events"
              >
                <Activity className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Continuous Monitoring</span>
              </button>
            )}

            {onNavigateFixWorkflow && (
              <button
                type="button"
                onClick={onNavigateFixWorkflow}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-100 text-[#F97316] text-xs font-bold transition-colors cursor-pointer shadow-3xs"
                title="Execute structured fixes in Fix & Verification"
              >
                <Wrench className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Fix & Verification (P04)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
