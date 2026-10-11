// src/components/admin/ConflictControlCenter.tsx
import React, { useState } from 'react';
import { 
  GitFork, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  ArrowRight,
  Info,
  CheckCircle2,
  Lock,
  Scale
} from 'lucide-react';
import { sampleAdminConflicts, aixshopConflictPolicyRules } from '../../data/sampleAdminData';
import { AdminConflictRecord } from '../../types/admin';

interface ConflictControlCenterProps {
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const ConflictControlCenter: React.FC<ConflictControlCenterProps> = ({
  onTriggerBoundaryModal
}) => {
  const [selectedConflict, setSelectedConflict] = useState<AdminConflictRecord | null>(sampleAdminConflicts[0]);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-3xs shrink-0">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              Conflict Control Center
              <span className="text-xs font-normal text-stone-500 font-mono">
                (6 Open Unmerged Conflicts)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Preserved multi-source truth disagreements. Conflicts are isolated and never averaged to fabricate artificial certainty.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowPolicyModal(!showPolicyModal)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer shadow-3xs"
        >
          <Scale className="w-3.5 h-3.5 text-[#F97316]" />
          <span>{showPolicyModal ? 'Hide Governance Contract' : 'View Conflict Policy (10 Rules)'}</span>
        </button>
      </div>

      {/* AIXSHOP Conflict Policy (Expandable / Toggleable) */}
      {showPolicyModal && (
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3.5 animate-in fade-in duration-150 shadow-3xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#F97316] uppercase">
              <BookOpen className="w-4 h-4 text-[#F97316]" />
              AIXSHOP Conflict Policy — 10 Governance Invariants
            </div>
            <span className="text-[10px] font-mono text-stone-500 font-semibold">
              Architectural Constitution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {aixshopConflictPolicyRules.map((rule) => (
              <div key={rule.id} className="p-3 bg-white rounded-xl border border-stone-200 space-y-1 shadow-3xs">
                <div className="font-bold text-stone-900 font-sans flex items-center gap-1.5 text-[11px]">
                  <span className="text-[#F97316] font-bold font-mono">Rule {rule.id < 10 ? `0${rule.id}` : rule.id}:</span>
                  {rule.rule}
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {rule.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conflicts Layout: Master List + Deep Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Master List of 6 Conflicts */}
        <div className="space-y-2 lg:col-span-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase font-mono mb-1">
            Active Disagreement Queue
          </div>
          {sampleAdminConflicts.map((conf) => {
            const isSelected = selectedConflict?.id === conf.id;
            return (
              <button
                key={conf.id}
                type="button"
                onClick={() => setSelectedConflict(conf)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex flex-col justify-between cursor-pointer shadow-3xs ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-[#F97316] font-bold">{conf.id}</span>
                  <span className="text-stone-500 font-medium">{conf.category}</span>
                </div>
                <div className="text-xs font-bold text-stone-900 tracking-tight font-sans">
                  {conf.attribute}
                </div>
                <div className="text-[11px] text-stone-500 truncate mt-0.5">
                  {conf.productName}
                </div>
                <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-stone-500">State:</span>
                  <span className="text-amber-800 font-bold">{conf.resolutionState}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Conflict Inspector */}
        <div className="lg:col-span-2 bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-3xs">
          {selectedConflict ? (
            <div className="space-y-4">
              {/* Conflict Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 pb-3.5 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200 shadow-3xs">
                      {selectedConflict.id}
                    </span>
                    <span className="text-xs font-mono text-stone-500 font-medium">
                      {selectedConflict.category}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900 font-sans">
                    {selectedConflict.attribute}
                  </h3>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Target Entity: <span className="text-stone-900 font-semibold">{selectedConflict.productName}</span> ({selectedConflict.productId})
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200 shadow-3xs">
                  {selectedConflict.resolutionState}
                </span>
              </div>

              {/* Source A vs Source B Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Source A */}
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 shadow-3xs">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#F97316] font-bold">CLAIM SOURCE A</span>
                    <span className="text-stone-500 font-medium">Tier 0{selectedConflict.sourceA.authorityLevel}</span>
                  </div>
                  <div className="text-xs font-bold text-stone-900 font-sans">
                    {selectedConflict.sourceA.name}
                  </div>
                  <div className="p-2.5 bg-orange-50/50 rounded-xl border border-orange-200 font-mono text-sm font-bold text-[#F97316]">
                    "{selectedConflict.sourceA.value}"
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-stone-500 pt-1">
                    <span>Confidence: {selectedConflict.sourceA.confidence}%</span>
                    <span>Observed: {selectedConflict.sourceA.timestamp}</span>
                  </div>
                </div>

                {/* Source B */}
                <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 shadow-3xs">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-700 font-bold">CLAIM SOURCE B</span>
                    <span className="text-stone-500 font-medium">Tier 0{selectedConflict.sourceB.authorityLevel}</span>
                  </div>
                  <div className="text-xs font-bold text-stone-900 font-sans">
                    {selectedConflict.sourceB.name}
                  </div>
                  <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200 font-mono text-sm font-bold text-amber-900">
                    "{selectedConflict.sourceB.value}"
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-stone-500 pt-1">
                    <span>Confidence: {selectedConflict.sourceB.confidence}%</span>
                    <span>Observed: {selectedConflict.sourceB.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Why Not Auto-Merged Governance Note */}
              <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-950 flex items-start gap-2.5 shadow-3xs">
                <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-orange-900 font-bold">Deterministic Preservation Rationale:</strong> {selectedConflict.whyNotAutoMerged}
                </div>
              </div>

              {/* Dependencies Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-3xs">
                  <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">Affected Buyer Intents:</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {selectedConflict.affectedBuyerIntents.map((i, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-100 text-stone-700 font-medium">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-3xs">
                  <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold">Affected Discovery Surfaces:</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {selectedConflict.affectedDiscoverySurfaces.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-100 text-stone-700 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-500">
                  Status: <strong className="text-amber-800 font-bold">{selectedConflict.resolutionState}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onTriggerBoundaryModal(`Resolve Conflict: ${selectedConflict.id}`, 'Manual conflict arbitration requires verified merchant credentials and will generate an immutable audit trace.')}
                    className="px-4 py-2 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Resolve Conflict (Preview)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-xs font-mono">
              Select a conflict from the left column to inspect evidence claims.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
