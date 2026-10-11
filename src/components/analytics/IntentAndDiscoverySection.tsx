// src/components/analytics/IntentAndDiscoverySection.tsx
import React from 'react';
import { 
  Compass, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Info
} from 'lucide-react';
import { 
  BuyerIntentAnalyticsItem, 
  IntentGapItem, 
  DiscoverySurfaceAnalyticsItem, 
  DiscoveryReadinessTrendPoint 
} from '../../types/analytics';

interface IntentAndDiscoverySectionProps {
  intents: BuyerIntentAnalyticsItem[];
  intentGaps: IntentGapItem[];
  discoverySurfaces: DiscoverySurfaceAnalyticsItem[];
  discoveryTrend: DiscoveryReadinessTrendPoint[];
  onNavigateReport: () => void;
  onNavigateIssues: () => void;
  onNavigateWorkbench: () => void;
}

export const IntentAndDiscoverySection: React.FC<IntentAndDiscoverySectionProps> = ({
  intents,
  intentGaps,
  discoverySurfaces,
  discoveryTrend,
  onNavigateReport,
  onNavigateIssues,
  onNavigateWorkbench
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Buyer Intent Analytics & Gaps */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Buyer Intent Coverage</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Coverage across 7 deterministic buyer archetypes. Not search volume.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            7/7 Modeled Archetypes
          </span>
        </div>

        {/* Diagnostic Intent Grid */}
        <div className="mt-4 space-y-2.5">
          {intents.map((item) => {
            const isHigh = item.coveragePercentage >= 80;
            const isMedium = item.coveragePercentage >= 70 && item.coveragePercentage < 80;
            const barColor = isHigh ? 'bg-emerald-500' : isMedium ? 'bg-[#F97316]' : 'bg-amber-500';

            return (
              <div 
                key={item.archetype}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{item.archetype}</span>
                    <span className="text-[10px] font-mono text-stone-500 font-medium">({item.buyerJourneyPhase})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-stone-500">
                      {item.groundedDimensionsCount}/{item.modeledDimensionsCount} dimensions
                    </span>
                    <span className="font-mono font-black text-stone-900 text-xs">{item.coveragePercentage}%</span>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
                    style={{ width: `${item.coveragePercentage}%` }}
                  />
                </div>

                <div className="text-[10px] text-stone-500 mt-1 truncate">
                  Primary Gap: <span className="text-stone-800 font-medium">{item.topGap}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highest Intelligence Gaps Subpanel */}
        <div className="mt-5 pt-4 border-t border-stone-200">
          <div className="text-xs font-bold text-stone-900 mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Highest-Impact Intelligence Gaps</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">Ranked by intent drop-off risk</span>
          </div>

          <div className="space-y-2">
            {intentGaps.map((gap) => (
              <div 
                key={gap.id}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 pr-2">
                  <span className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center font-mono font-bold text-[10px] text-stone-600 flex-shrink-0 shadow-3xs">
                    {gap.rank}
                  </span>
                  <div>
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{gap.title}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-orange-50 text-[#F97316] border border-orange-200">
                        {gap.archetype}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{gap.issueDescription}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (gap.targetView === 'issues') onNavigateIssues();
                    else if (gap.targetView === 'report') onNavigateReport();
                    else onNavigateWorkbench();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-[#F97316] hover:text-orange-700 border border-stone-200 text-[11px] font-bold whitespace-nowrap transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer shadow-3xs"
                >
                  <span>{gap.recommendedPage}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Discovery Readiness & Surfaces */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Discovery Readiness Breakdown</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Readiness across 4 target surfaces. No fake search rankings.
            </p>
          </div>
          <span className="text-2xl font-black font-mono text-[#F97316]">79%</span>
        </div>

        {/* Explicit Anti-Slop Truth Notice */}
        <div className="my-4 p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-xs text-stone-800 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold text-stone-900">Integrity Guardrail: </span>
            Discovery readiness reflects structural schema conformance and evidence completeness. It does NOT claim search engine positions, Google ranks, ChatGPT shares, or Perplexity ranking percentages.
          </div>
        </div>

        {/* 4 Surfaces Cards */}
        <div className="space-y-2.5">
          {discoverySurfaces.map((surf) => (
            <div 
              key={surf.id}
              className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">{surf.surfaceName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-white text-stone-600 border border-stone-200 font-medium">
                    {surf.modeledStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-400">{surf.testedSignalsCount} signals tested</span>
                  <span className="font-mono font-black text-[#F97316] text-sm">{surf.readinessPercentage}%</span>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 flex items-start gap-1 mt-1">
                <span className="text-stone-700 font-semibold">Constraint:</span>
                <span className="text-stone-600">{surf.topConstraint}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Discovery Trend */}
        <div className="mt-5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#F97316]" />
              <span>Discovery Readiness Trend · Representative</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#F97316]">71% → 79%</span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {discoveryTrend.map((t, idx) => {
              const isLatest = idx === discoveryTrend.length - 1;
              return (
                <div 
                  key={t.period}
                  className={`p-2 rounded-xl border ${
                    isLatest 
                      ? 'bg-orange-50 border-orange-300 text-[#F97316] font-bold shadow-3xs' 
                      : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="text-[10px] text-stone-400 font-mono">{t.period}</div>
                  <div className="text-sm font-mono mt-0.5 font-bold">{t.readinessPercentage}%</div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-stone-500 mt-2.5 leading-relaxed">
            Diagnostic readiness is based on product intelligence completeness, evidence grounding, variant clarity, offer clarity, intent coverage, and discovery signals.
          </p>
        </div>
      </div>
    </div>
  );
};
