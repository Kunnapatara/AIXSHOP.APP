// src/components/admin/DataQualityFunnelAndRiskSection.tsx
import React, { useState } from 'react';
import { 
  Filter, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowDown, 
  Layers, 
  TrendingDown,
  Info
} from 'lucide-react';
import { sampleDataQualityStages, sampleIntelligenceRisks } from '../../data/sampleAdminData';

interface DataQualityFunnelAndRiskSectionProps {
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const DataQualityFunnelAndRiskSection: React.FC<DataQualityFunnelAndRiskSectionProps> = ({
  onTriggerBoundaryModal
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Data Quality Funnel */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
                  Data Quality & Completeness Funnel
                </h3>
                <p className="text-xs text-stone-500">
                  7-Stage Progressive Filtering from Raw Signal to Discovery Readiness
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-stone-100 border border-stone-200 text-stone-600 font-bold shadow-3xs">
              Deterministic Filters
            </span>
          </div>

          {/* Funnel Visualization */}
          <div className="space-y-2 mt-4">
            {sampleDataQualityStages.map((stage, idx) => {
              const widthPct = Math.max(45, Math.round((stage.count / 194) * 100));

              return (
                <div key={stage.stage} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 shadow-3xs">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#F97316]">
                        0{stage.stage}
                      </span>
                      <span className="font-bold text-stone-900 font-sans">
                        {stage.name}
                      </span>
                    </div>

                    <div className="font-mono font-bold text-stone-900 text-xs">
                      {stage.count} <span className="text-[10px] text-stone-500 font-normal">facts ({stage.percentage}%)</span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        idx === 6 ? 'bg-emerald-500' : 'bg-[#F97316]'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  {/* Drop-off Note */}
                  <div className="text-[10px] text-stone-500 font-mono pt-0.5 flex items-center justify-between">
                    <span>Drop Reason: {stage.dropOffNote}</span>
                    {idx < sampleDataQualityStages.length - 1 && (
                      <span className="text-amber-800 font-bold">-{sampleDataQualityStages[idx].count - sampleDataQualityStages[idx + 1].count} filtered</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 font-mono shadow-3xs">
          Final Discovery Ready: <strong className="text-emerald-700 font-bold">158 Facts (81%)</strong> mathematically vetted.
        </div>
      </div>

      {/* Right: Intelligence Risk Register */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-3xs shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
                  Intelligence Risk Register
                </h3>
                <p className="text-xs text-stone-500">
                  Prioritized by Deterministic Risk Vectors & Buyer Impact
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 font-bold shadow-3xs">
              4 Prioritized Risks
            </span>
          </div>

          {/* Risk Cards */}
          <div className="space-y-3 mt-4">
            {sampleIntelligenceRisks.map((risk) => (
              <div key={risk.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 shadow-3xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono mb-1">
                      <span className="text-[#F97316] font-bold">{risk.id}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold shadow-3xs ${
                        risk.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                        risk.severity === 'HIGH' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-stone-200 text-stone-800 border border-stone-300'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-stone-900 tracking-tight font-sans">
                      {risk.title}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onTriggerBoundaryModal(`Mitigate Risk: ${risk.id}`, 'Remediation protocols require authorized merchant sign-off in this preview mode.')}
                    className="px-3 py-1.5 text-[10px] font-mono font-bold bg-white hover:bg-stone-50 text-[#F97316] rounded-xl border border-stone-200 shadow-3xs transition-colors cursor-pointer"
                  >
                    Mitigate
                  </button>
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                  {risk.description}
                </p>

                <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-500">
                  <div>
                    <span>Affected Products:</span> <span className="text-stone-900 font-bold">{risk.affectedProductsCount}</span>
                  </div>
                  <div>
                    <span>Confidence Gap:</span> <span className="text-amber-800 font-bold">{risk.confidenceScore}%</span>
                  </div>
                  <div className="col-span-2">
                    <span>Buyer Impact:</span> <span className="text-stone-700 font-sans">{risk.buyerImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 p-3.5 bg-amber-50/50 border border-amber-200 rounded-2xl text-[11px] text-amber-950 font-sans shadow-3xs leading-relaxed">
          <strong className="font-bold text-amber-900">Deterministic Rule:</strong> High-severity risks automatically demote downstream discovery readiness until resolved.
        </div>
      </div>
    </div>
  );
};
