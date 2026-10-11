// src/components/admin/BuyerIntentAndDiscoverySection.tsx
import React, { useState } from 'react';
import { 
  Compass, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Bot, 
  ShoppingBag, 
  Eye, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { sampleBuyerIntentDependencies, sampleDiscoverySurfaces } from '../../data/sampleAdminData';

export const BuyerIntentAndDiscoverySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'intents' | 'surfaces'>('intents');

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              Buyer Intent & Discovery Surface Integrity
            </h2>
            <p className="text-xs text-stone-500">
              Downstream answerability depends strictly on upstream fact completeness.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-mono font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('intents')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'intents'
                ? 'bg-white text-[#F97316] font-bold border border-stone-200 shadow-3xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Buyer Intents (7)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('surfaces')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'surfaces'
                ? 'bg-white text-[#F97316] font-bold border border-stone-200 shadow-3xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Discovery Surfaces (4)
          </button>
        </div>
      </div>

      {/* Surface Integrity Disclaimer (Section 21) */}
      <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-orange-950 flex items-start gap-2.5 shadow-3xs">
        <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
        <div>
          <strong className="text-orange-900 font-bold">Answerability vs Ranking Disclaimer:</strong> AIXSHOP provides deterministic evidence infrastructure that enables complete and accurate answers on external discovery surfaces. AIXSHOP does NOT promise or guarantee artificial SEO rankings or commercial algorithm placement.
        </div>
      </div>

      {/* Tab Content: Buyer Intents */}
      {activeTab === 'intents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {sampleBuyerIntentDependencies.map((intent) => (
            <div key={intent.id} className="p-4.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3 flex flex-col justify-between shadow-3xs hover:border-orange-300 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white text-[#F97316] border border-stone-200 shadow-3xs">
                    {intent.id}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-3xs ${
                    intent.readiness === 'HIGH' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    intent.readiness === 'MEDIUM' ? 'bg-stone-200 text-stone-800 border border-stone-300' :
                    'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {intent.readiness} READINESS
                  </span>
                </div>

                <div className="text-xs font-bold text-stone-900 mt-2 font-sans">
                  {intent.name}
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>Evidence Coverage:</span>
                    <span className="text-stone-900 font-bold">{intent.coverage}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        intent.coverage >= 90 ? 'bg-emerald-500' :
                        intent.coverage >= 80 ? 'bg-[#F97316]' :
                        'bg-amber-500'
                      }`}
                      style={{ width: `${intent.coverage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px]">
                  <div className="text-stone-500 font-medium text-[10px]">Key Evidence Required:</div>
                  <div className="flex flex-wrap gap-1">
                    {intent.requiredEvidence.map((e, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white text-stone-700 rounded-lg font-mono text-[10px] border border-stone-200 shadow-3xs">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-stone-200 text-[10px] font-mono flex justify-between">
                <span className="text-stone-500">Missing Facts: <strong className={intent.missingEvidenceCount > 0 ? 'text-amber-800 font-bold' : 'text-stone-700'}>{intent.missingEvidenceCount}</strong></span>
                <span className="text-stone-500">Conflicts: <strong className={intent.conflictCount > 0 ? 'text-amber-800 font-bold' : 'text-stone-700'}>{intent.conflictCount}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Discovery Surfaces */}
      {activeTab === 'surfaces' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleDiscoverySurfaces.map((surf) => {
            const surfId = surf.id || '';
            const Icon = surfId.includes('traditional') ? Search :
                         surfId.includes('ai_search') ? Bot :
                         surfId.includes('commerce_feeds') ? ShoppingBag : Eye;
            const blockerCount = surf.blockerCount ?? 0;
            const keyDeps = surf.keyDependencies || [];

            return (
              <div key={surf.id || surf.name} className="p-4.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3 flex flex-col justify-between shadow-3xs hover:border-orange-300 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-extrabold text-stone-900">
                      {surf.readinessScore}% Ready
                    </span>
                  </div>

                  <div className="text-xs font-bold text-stone-900 mt-2.5 font-sans">
                    {surf.name}
                  </div>

                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed font-sans">
                    {surf.targetAudience}
                  </p>

                  <div className="mt-3 space-y-1.5 text-[11px]">
                    <div className="text-stone-500 text-[10px] uppercase font-mono font-bold">Structural Needs:</div>
                    <div className="flex flex-wrap gap-1">
                      {keyDeps.map((dep, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-white text-stone-700 font-mono text-[10px] border border-stone-200 shadow-3xs">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-stone-500">Blockers:</span>
                  <span className={blockerCount > 0 ? 'text-amber-800 font-bold' : 'text-emerald-700 font-bold'}>
                    {blockerCount} Unresolved
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
