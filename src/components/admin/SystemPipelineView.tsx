// src/components/admin/SystemPipelineView.tsx
import React, { useState } from 'react';
import { 
  GitCommit, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Radio,
  FileCode,
  Tag,
  Search,
  Eye,
  Activity,
  Wrench
} from 'lucide-react';
import { samplePipelineStages } from '../../data/sampleAdminData';
import { SystemPipelineStage } from '../../types/admin';

export const SystemPipelineView: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<SystemPipelineStage>(samplePipelineStages[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSelectStage = (stage: SystemPipelineStage) => {
    setSelectedStage(stage);
    setIsDetailOpen(true);
  };

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              System Pipeline Architecture
              <span className="text-xs font-normal text-stone-500 font-mono">
                (11 Deterministic Stages)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Interactive data provenance pipeline from raw observation through verified discovery. Click any stage to inspect local governance rules.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 font-bold shadow-3xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            10 Operational
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 font-bold shadow-3xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            1 Review Required
          </span>
        </div>
      </div>

      {/* Visual Pipeline Flow (Horizontal scroll on smaller screens) */}
      <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-stone-300">
        <div className="flex items-stretch gap-2 min-w-[1100px]">
          {samplePipelineStages.map((stage, idx) => {
            const isSelected = selectedStage.id === stage.id;
            const isReview = stage.state === 'REVIEW_REQUIRED';

            return (
              <React.Fragment key={stage.id}>
                <button
                  type="button"
                  onClick={() => handleSelectStage(stage)}
                  className={`flex-1 p-3.5 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer group shadow-3xs ${
                    isSelected
                      ? 'bg-orange-50/70 border-[#F97316] shadow-xs'
                      : isReview
                      ? 'bg-amber-50/70 border-amber-200 hover:border-amber-300'
                      : 'bg-stone-50 border-stone-200 hover:border-orange-200 hover:bg-stone-100/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-stone-400 font-bold">0{idx + 1}</span>
                      {isReview ? (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-stone-900 tracking-tight group-hover:text-[#F97316] transition-colors font-sans">
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-snug">
                      {stage.shortDesc}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200 space-y-1 text-[10px] font-mono">
                    <div className="flex justify-between text-stone-500">
                      <span>Records:</span>
                      <span className="text-stone-900 font-bold">{stage.recordsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Unresolved:</span>
                      <span className={stage.unresolvedCount > 0 ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}>
                        {stage.unresolvedCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Confidence:</span>
                      <span className="text-[#F97316] font-bold">{stage.confidenceScore}%</span>
                    </div>
                  </div>
                </button>

                {idx < samplePipelineStages.length - 1 && (
                  <div className="flex items-center text-stone-300 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Local Inspection Drawer / Card */}
      {isDetailOpen && selectedStage && (
        <div className="mt-4 p-5 bg-stone-50 border border-orange-200 rounded-2xl animate-in fade-in duration-150 shadow-3xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-100 text-[#F97316] border border-orange-200 shadow-3xs">
                STAGE INSPECTOR
              </span>
              <h3 className="text-sm font-extrabold text-stone-900 font-sans">
                {selectedStage.name}
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold shadow-3xs ${
                selectedStage.state === 'REVIEW_REQUIRED' 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {selectedStage.state}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDetailOpen(false)}
              className="text-stone-500 hover:text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-xl hover:bg-stone-200/60 cursor-pointer transition-colors"
            >
              Hide Inspector
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3.5">
            {/* Description & Status */}
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase font-mono mb-1">
                Subsystem Mission
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {selectedStage.details.description}
              </p>
              <div className="mt-2 text-[11px] text-stone-500 font-mono">
                Last Simulated Event: <span className="text-[#F97316] font-bold">{selectedStage.lastSimulatedEvent}</span>
              </div>
            </div>

            {/* Diagnostic Metrics */}
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase font-mono mb-1">
                Subsystem Diagnostics
              </div>
              <div className="space-y-1.5 bg-white p-3 rounded-xl border border-stone-200 text-xs font-mono shadow-3xs">
                {selectedStage.details.metrics.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-stone-500">{m.label}:</span>
                    <span className="text-stone-900 font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Rule Constraint */}
            <div>
              <div className="text-[11px] font-bold text-stone-400 uppercase font-mono mb-1">
                Enforced Governance Rule
              </div>
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-xs text-orange-950 leading-snug flex items-start gap-2 shadow-3xs">
                <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span>{selectedStage.details.governanceRule}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
