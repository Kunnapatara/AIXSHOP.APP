// src/components/analytics/IntelligenceCoverageCard.tsx
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  Info, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { 
  IntelligenceCoverageProgressionPoint, 
  CoverageDimensionItem 
} from '../../types/analytics';

interface IntelligenceCoverageCardProps {
  progression: IntelligenceCoverageProgressionPoint[];
  dimensions: CoverageDimensionItem[];
  onSelectDimension?: (dimensionId: string) => void;
  onNavigateProducts: () => void;
}

export const IntelligenceCoverageCard: React.FC<IntelligenceCoverageCardProps> = ({
  progression,
  dimensions,
  onSelectDimension,
  onNavigateProducts
}) => {
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(progression.length - 1);
  const activePoint = progression[selectedPointIndex] || progression[progression.length - 1];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
      {/* Header with Representative Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#F97316]" />
              <span>Intelligence Coverage</span>
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200">
              Representative Trend · Preview Mode
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tracking the proportion of product facts grounded in usable, machine-readable evidence across the catalog.
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black font-mono text-[#F97316]">
            {activePoint.coveragePercentage}%
          </div>
          <div className="text-[11px] text-stone-400 font-mono">
            {activePoint.period}
          </div>
        </div>
      </div>

      {/* Progression Timeline / Trend */}
      <div className="my-5 p-4 rounded-2xl bg-stone-50 border border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#F97316]" />
            <span>Coverage Progression History</span>
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            Interactive Progression Points
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {progression.map((pt, idx) => {
            const isSelected = idx === selectedPointIndex;
            return (
              <button
                key={pt.period}
                type="button"
                onClick={() => setSelectedPointIndex(idx)}
                className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-50 border-orange-300 shadow-3xs'
                    : 'bg-white hover:bg-stone-100 border-stone-200'
                }`}
              >
                <div className={`text-sm sm:text-base font-bold font-mono ${isSelected ? 'text-[#F97316]' : 'text-stone-700'}`}>
                  {pt.coveragePercentage}%
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5 truncate w-full">
                  {pt.period}
                </div>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Progression Explanation */}
        <div className="mt-3.5 p-3 rounded-xl bg-white border border-stone-200 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900">What changed in {activePoint.period}: </span>
            <span className="text-stone-600">{activePoint.changeRationale}</span>
          </div>
        </div>
      </div>

      {/* Coverage Dimensions Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Coverage by Deterministic Dimension</h3>
            <p className="text-[11px] text-stone-500">
              Deterministic measurements across structural product properties. No opaque single scores.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateProducts}
            className="text-xs font-bold text-[#F97316] hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Inspect in Catalog</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {dimensions.map((dim) => {
            const isStrong = dim.coveragePercentage >= 80;
            const isGood = dim.coveragePercentage >= 70 && dim.coveragePercentage < 80;

            const barColor = isStrong 
              ? 'bg-emerald-500' 
              : isGood 
                ? 'bg-orange-500' 
                : 'bg-amber-500';

            return (
              <div 
                key={dim.id}
                onClick={() => onSelectDimension?.(dim.id)}
                className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{dim.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.2 rounded-full border ${
                      isStrong 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : isGood 
                          ? 'bg-orange-50 text-[#F97316] border-orange-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {dim.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-stone-500 font-mono">
                      {dim.groundedElementsCount}/{dim.modeledElementsCount} grounded
                    </span>
                    <span className="font-mono font-bold text-stone-900 text-xs w-10 text-right">
                      {dim.coveragePercentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${Math.min(100, dim.coveragePercentage)}%` }}
                  />
                </div>

                <div className="text-[11px] text-stone-500 mt-1.5 flex items-center justify-between">
                  <span>{dim.rationale}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why This Matters Panel */}
      <div className="mt-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
        <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Why Intelligence Coverage Matters</span>
        </div>
        <p className="text-stone-600 leading-relaxed text-[11px]">
          Grounded product coverage directly dictates how generative AI shopping assistants and search engines represent your catalog. When specifications rely on unparsed marketing copy, AI models either hallucinate or omit products from comparative answer engines.
        </p>
      </div>
    </div>
  );
};
