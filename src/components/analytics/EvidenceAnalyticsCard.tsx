// src/components/analytics/EvidenceAnalyticsCard.tsx
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Cpu, 
  UserCheck, 
  HelpCircle, 
  AlertTriangle, 
  TrendingDown, 
  Info,
  ArrowRight
} from 'lucide-react';
import { 
  EvidenceDistributionItem, 
  EvidenceTrendPoint 
} from '../../types/analytics';
import { EvidenceState } from '../../types/landing';

interface EvidenceAnalyticsCardProps {
  distribution: EvidenceDistributionItem[];
  trend: EvidenceTrendPoint[];
  onSelectState?: (state: EvidenceState) => void;
  onNavigateIssues: () => void;
  onNavigateReport: () => void;
}

export const EvidenceAnalyticsCard: React.FC<EvidenceAnalyticsCardProps> = ({
  distribution,
  trend,
  onSelectState,
  onNavigateIssues,
  onNavigateReport
}) => {
  const [selectedState, setSelectedState] = useState<EvidenceState | null>(null);

  const totalEvidenceRecords = distribution.reduce((sum, item) => sum + item.count, 0);

  const getStateIcon = (state: EvidenceState) => {
    switch (state) {
      case 'OBSERVED':
        return Eye;
      case 'DERIVED':
        return Cpu;
      case 'MERCHANT_VERIFIED':
        return UserCheck;
      case 'MISSING':
        return HelpCircle;
      case 'CONFLICT':
        return AlertTriangle;
      default:
        return Eye;
    }
  };

  const activeDistributionItem = distribution.find(d => d.state === selectedState) || null;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Evidence Health</span>
            </h2>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Provenance Architecture
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Distribution of evidence states grounding {totalEvidenceRecords} modeled catalog assertions.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-stone-400 font-mono">Total Tracked Provenance</div>
          <div className="text-xl font-black font-mono text-stone-900">{totalEvidenceRecords} Records</div>
        </div>
      </div>

      {/* Mandatory State Clarity Notice */}
      <div className="mt-4 p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-xs text-stone-800 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <span className="font-bold text-stone-900">Rule of Truth: </span>
          Evidence states describe how AIXSHOP currently represents information. They are not a universal measure of source quality. Missing states indicate required dimensions with zero verified machine-readable assertions.
        </div>
      </div>

      {/* Evidence States Distribution Breakdown */}
      <div className="mt-5">
        <div className="text-xs font-bold text-stone-800 mb-2.5 flex items-center justify-between">
          <span>Current Provenance States Breakdown</span>
          <span className="text-[11px] text-stone-400 font-mono">Click card to filter state details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {distribution.map((item) => {
            const Icon = getStateIcon(item.state);
            const isSelected = selectedState === item.state;

            return (
              <button
                key={item.state}
                type="button"
                onClick={() => {
                  const nextState = isSelected ? null : item.state;
                  setSelectedState(nextState);
                  if (nextState) onSelectState?.(nextState);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-50 border-[#F97316] ring-1 ring-[#F97316] shadow-3xs'
                    : 'bg-stone-50 hover:bg-stone-100/90 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-1.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                    <Icon className="w-3.5 h-3.5 text-stone-700" />
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-900">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>

                <div className="text-xl font-black font-mono text-stone-900">
                  {item.count}
                </div>

                <div className="text-[11px] font-bold text-stone-800 mt-0.5 truncate">
                  {item.state}
                </div>

                <div className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                  {item.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected State Detail Callout if active */}
      {activeDistributionItem && (
        <div className="mt-4 p-3.5 rounded-2xl bg-stone-50 border border-orange-200 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#F97316]">
              State Detail: {activeDistributionItem.state} ({activeDistributionItem.count} Records)
            </span>
            <button
              type="button"
              onClick={() => setSelectedState(null)}
              className="text-[10px] text-stone-500 hover:text-stone-900 font-bold"
            >
              Clear
            </button>
          </div>
          <p className="text-stone-600 text-[11px]">{activeDistributionItem.ruleOfTruth}</p>
          <div className="mt-2 flex gap-2">
            {activeDistributionItem.state === 'MISSING' || activeDistributionItem.state === 'CONFLICT' ? (
              <button
                type="button"
                onClick={onNavigateIssues}
                className="text-[11px] font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Triage {activeDistributionItem.count} items in Issues</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onNavigateReport}
                className="text-[11px] font-bold text-[#F97316] hover:text-orange-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect in Intelligence Report (P03)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Evidence Trend Section */}
      <div className="mt-6 p-4 rounded-2xl bg-stone-50 border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>Evidence Trend (Gap & Conflict Reduction)</span>
            </h3>
            <span className="text-[10px] font-mono text-stone-400">
              Representative Trend · Preview Mode
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono font-medium">
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Missing: 17 → 10
            </span>
            <span className="flex items-center gap-1 text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Conflicts: 6 → 4
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Verified: 12 → 24
            </span>
          </div>
        </div>

        {/* Trend Data Grid */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {trend.map((t, idx) => {
            const isLatest = idx === trend.length - 1;
            return (
              <div 
                key={t.period}
                className={`p-2.5 rounded-xl border ${
                  isLatest 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                    : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                <div className="text-[10px] font-mono text-stone-400 mb-1">{t.period}</div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="text-amber-700 font-bold">Missing: {t.missing}</div>
                  <div className="text-rose-700 font-bold">Conflicts: {t.conflicts}</div>
                  <div className="text-emerald-700 font-bold">Verified: {t.merchantVerified}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why This Matters Panel */}
      <div className="mt-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
        <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Why Evidence Completeness Matters</span>
        </div>
        <p className="text-stone-600 leading-relaxed text-[11px]">
          Better evidence coverage reduces the amount of product information that must remain Unknown or in Conflict. In modern AI discovery, answer engines strictly deprioritize products with conflicting attributes or unprovenanced claims.
        </p>
      </div>
    </div>
  );
};
