import React, { useState } from 'react';
import { Compass, Info, CheckCircle2, HelpCircle, ChevronRight, Search } from 'lucide-react';
import { CatalogBuyerIntentCoverageItem } from '../../types/dashboard';

interface BuyerIntentCoverageSectionProps {
  intents: CatalogBuyerIntentCoverageItem[];
}

export const BuyerIntentCoverageSection: React.FC<BuyerIntentCoverageSectionProps> = ({
  intents
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<string>('Trust');

  const activeItem = intents.find(i => i.archetype === selectedArchetype) || intents[0];

  const getBarColor = (pct: number) => {
    if (pct >= 85) return 'bg-emerald-500';
    if (pct >= 70) return 'bg-cyan-500';
    if (pct >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Buyer Intent Coverage</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              7 Archetypes
            </span>
          </div>
          <p className="text-xs text-slate-400 pt-0.5">
            Evaluates whether catalog product facts answer natural language shopper query modalities.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono">Select an archetype to inspect query gaps</span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Diagnostic Coverage Notice: </strong>
          Coverage percentages indicate factual readiness to answer buyer questions. 
          <span className="text-rose-400 font-medium"> They do not represent search volume, AI ranking position, or conversion rates</span>.
        </p>
      </div>

      {/* Main Grid: 7 Archetypes + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
        {/* Archetypes Bars */}
        <div className="lg:col-span-7 space-y-2.5">
          {intents.map((item) => {
            const isSelected = item.archetype === selectedArchetype;

            return (
              <div
                key={item.archetype}
                onClick={() => setSelectedArchetype(item.archetype)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-slate-600'}`}></span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      {item.archetype}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      ({item.buyerJourneyPhase})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">
                      {item.coveragePercentage}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({item.supportedQueriesCount}/{item.testedQueriesCount})
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${getBarColor(item.coveragePercentage)} rounded-full transition-all`}
                    style={{ width: `${item.coveragePercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Archetype Diagnostic Detail */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Archetype Diagnostic
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                {activeItem.coveragePercentage}% Grounded
              </span>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-white">
                {activeItem.archetype} Intent
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Shopper Journey: {activeItem.buyerJourneyPhase}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Query Grounding Scope</span>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {activeItem.supportedQueriesCount} of {activeItem.testedQueriesCount} synthetic buyer query templates currently receive verified attribute grounding.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 block">Primary Observed Gap</span>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {activeItem.primaryGapExample}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-800/80">
            Remediation Priority: {activeItem.coveragePercentage < 70 ? 'High (Impacts Conversion)' : 'Medium (Stable)'}
          </div>
        </div>
      </div>
    </div>
  );
};
