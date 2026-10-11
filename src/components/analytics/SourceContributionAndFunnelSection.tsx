// src/components/analytics/SourceContributionAndFunnelSection.tsx
import React from 'react';
import { 
  Workflow, 
  Layers, 
  ArrowRight, 
  Activity, 
  Info
} from 'lucide-react';
import { 
  DataQualityFunnelStage, 
  SourceCategoryContribution, 
  SourceHealthDimensionItem 
} from '../../types/analytics';

interface SourceContributionAndFunnelSectionProps {
  funnel: DataQualityFunnelStage[];
  sources: SourceCategoryContribution[];
  sourceHealth: SourceHealthDimensionItem[];
  onNavigateIntegrations: () => void;
}

export const SourceContributionAndFunnelSection: React.FC<SourceContributionAndFunnelSectionProps> = ({
  funnel,
  sources,
  sourceHealth,
  onNavigateIntegrations
}) => {
  return (
    <div className="space-y-6">
      {/* SECTION 1: Data Quality Funnel (Full Width) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Product Intelligence Data Flow Funnel</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              The continuous pipeline from external multi-source observations to validated catalog recovery.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200">
            Representative Data Flow · Diagnostic Funnel
          </span>
        </div>

        {/* Funnel Pipeline Steps */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
          {funnel.map((stage, idx) => {
            const isLast = idx === funnel.length - 1;

            return (
              <div
                key={stage.step}
                className={`relative p-3.5 rounded-2xl border flex flex-col justify-between ${
                  isLast
                    ? 'bg-emerald-50 border-emerald-300 shadow-3xs'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center font-mono font-bold text-[10px] text-[#F97316] shadow-3xs">
                      {stage.step}
                    </span>
                    {stage.conversionRateFromPrevious && (
                      <span className="text-[10px] font-mono text-stone-500 font-medium">
                        {stage.conversionRateFromPrevious}% yield
                      </span>
                    )}
                  </div>

                  <div className="text-xl font-black font-mono text-stone-900 mt-1">
                    {stage.count}
                  </div>

                  <div className="text-xs font-bold text-stone-900 mt-0.5">
                    {stage.label}
                  </div>

                  <div className="text-[10px] text-[#F97316] font-mono font-bold">
                    {stage.unit}
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 mt-2 pt-2 border-t border-stone-200 leading-relaxed">
                  {stage.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Source Contribution & Source Health (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Contribution Table */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight">Source Category Contribution</h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Volume of modeled records contributed by integration source category.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateIntegrations}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Integrations (P12)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Critical Truth Callout */}
          <div className="my-3.5 p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>
              <strong className="text-stone-900">Rule of Truth: </strong>
              Source contribution ≠ source authority. Ingestion volume does not grant unilateral credibility without arbitration.
            </span>
          </div>

          {/* Sources List */}
          <div className="space-y-2.5">
            {sources.map((src) => (
              <div 
                key={src.id}
                className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{src.categoryName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-white text-stone-600 border border-stone-200">
                      {src.connectionMethod}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">{src.sourcesCount} connected</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 text-[11px] font-mono text-center mt-2 pt-2 border-t border-stone-200">
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200 shadow-3xs">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Products</span>
                    <span className="text-stone-900 font-black">{src.productRecordsCount}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200 shadow-3xs">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Variants</span>
                    <span className="text-stone-900 font-black">{src.variantRecordsCount}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200 shadow-3xs">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Offers</span>
                    <span className="text-[#F97316] font-black">{src.offerObservationsCount}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200 shadow-3xs">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Evidence</span>
                    <span className="text-blue-700 font-black">{src.evidenceRecordsCount}</span>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-stone-200 shadow-3xs">
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Conflicts</span>
                    <span className={`font-black ${src.conflictsContributedCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {src.conflictsContributedCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Health Diagnostics */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#F97316]" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight">Source Health Dimensions</h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Deterministic operational telemetry across connected pipeline channels.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              5 of 6 Healthy
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {sourceHealth.map((dim) => {
              const isHealthy = dim.status === 'Healthy';

              return (
                <div 
                  key={dim.dimensionName}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between text-xs"
                >
                  <div className="pr-3">
                    <div className="font-bold text-stone-900">{dim.dimensionName}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{dim.description}</div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${
                    isHealthy 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {dim.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
            <span className="text-[11px] text-stone-500">Read-Only Least Privilege Protocol Enforced</span>
            <button
              type="button"
              onClick={onNavigateIntegrations}
              className="text-[#F97316] hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Sources (P12)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
