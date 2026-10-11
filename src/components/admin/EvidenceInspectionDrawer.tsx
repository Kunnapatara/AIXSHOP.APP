// src/components/admin/EvidenceInspectionDrawer.tsx
import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Layers, 
  HelpCircle, 
  Share2,
  Lock,
  GitFork,
  Compass
} from 'lucide-react';
import { AdminEvidenceRecord } from '../../types/admin';

interface EvidenceInspectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  record: AdminEvidenceRecord | null;
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const EvidenceInspectionDrawer: React.FC<EvidenceInspectionDrawerProps> = ({
  isOpen,
  onClose,
  record,
  onTriggerBoundaryModal
}) => {
  if (!isOpen || !record) return null;

  const getStateColor = (state: string) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'OBSERVED':
        return 'bg-orange-50 text-[#F97316] border-orange-200';
      case 'DERIVED':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      case 'CONFLICT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'MISSING':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl h-full bg-white border-l border-stone-200 shadow-2xl p-6 text-stone-900 flex flex-col overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-50 text-[#F97316] border border-orange-200 shadow-3xs">
                EVIDENCE RECORD INSPECTION
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-3xs ${getStateColor(record.state)}`}>
                {record.state.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 font-sans tracking-tight">
              {record.attribute}
            </h2>
            <div className="text-xs text-stone-500 mt-0.5">
              Product: <span className="text-stone-900 font-semibold">{record.productName}</span> ({record.productId})
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fundamental Integrity Guard */}
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-orange-950 flex items-start gap-3 shadow-3xs">
          <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-orange-900">AIXSHOP Core Invariant:</span> AIXSHOP does not invent missing facts. Every attribute displayed in downstream discovery is mathematically backed by raw provenance.
          </div>
        </div>

        {/* Section 1: Observed Value & Confidence */}
        <div className="mt-5 space-y-4">
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl shadow-3xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="uppercase font-mono text-[10px] font-bold">Current Recorded Value</span>
              <span className="font-mono text-[#F97316] font-semibold">{record.id}</span>
            </div>
            <div className="text-xl font-black text-stone-900 font-mono tracking-tight">
              {record.value}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-500">Confidence Score:</span>
                <span className="font-mono font-bold text-stone-900 bg-white border border-stone-200 px-2.5 py-0.5 rounded-lg shadow-3xs">
                  {record.confidence}%
                </span>
              </div>
              <div className="text-stone-500 font-mono text-[11px]">
                Valid: {record.validUntil}
              </div>
            </div>
            <p className="text-[11px] text-stone-500 mt-2 italic">
              Confidence Basis: {record.confidenceReason}
            </p>
          </div>

          {/* Section 2: Source Provenance & Authority */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 shadow-3xs">
            <div className="text-[11px] font-bold text-stone-600 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#F97316]" />
              Ingestion Provenance
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-3xs">
                <span className="text-stone-500 text-[10px] font-semibold">SOURCE IDENTIFIER:</span>
                <p className="text-stone-900 font-bold mt-0.5 font-sans">{record.sourceName}</p>
                <p className="text-stone-500 text-[10px]">{record.sourceId}</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-3xs">
                <span className="text-stone-500 text-[10px] font-semibold">AUTHORITY RANKING:</span>
                <p className="text-[#F97316] font-bold mt-0.5">Tier 0{record.authorityLevel}</p>
                <p className="text-stone-500 text-[10px]">Contextual Credibility</p>
              </div>
            </div>

            <div className="text-[11px] text-stone-600">
              <span className="font-bold text-stone-800">Authority Rationale:</span> {record.authorityReason}
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              Observed At: <span className="text-stone-800 font-semibold">{record.detectedAt}</span>
            </div>
          </div>

          {/* Section 3: Related Conflict (if applicable) */}
          {record.conflictId && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 shadow-3xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 font-mono uppercase">
                <GitFork className="w-4 h-4 text-amber-700" />
                Active Conflict Association: {record.conflictId}
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                This evidence item has conflicting observations from another authoritative feed. In accordance with AIXSHOP Conflict Policy Rule 1, both claims are preserved and isolated from automated overwrite.
              </p>
            </div>
          )}

          {/* Section 4: Buyer Intent Dependencies */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 shadow-3xs">
            <div className="text-[11px] font-bold text-stone-600 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#F97316]" />
              Dependent Buyer Intent Archetypes
            </div>
            <div className="flex flex-wrap gap-1.5">
              {record.relatedBuyerIntents.map((intent, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-stone-200 text-stone-700 font-medium shadow-3xs">
                  {intent} Intent
                </span>
              ))}
            </div>
          </div>

          {/* Section 5: Discovery Surfaces Impact */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 shadow-3xs">
            <div className="text-[11px] font-bold text-stone-600 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#F97316]" />
              Influenced Discovery Surfaces
            </div>
            <div className="flex flex-wrap gap-1.5">
              {record.relatedDiscoverySurfaces.map((surf, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-stone-200 text-stone-700 font-medium shadow-3xs">
                  {surf}
                </span>
              ))}
            </div>
          </div>

          {/* Section 6: Historical Observation Trail */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 shadow-3xs">
            <div className="text-[11px] font-bold text-stone-600 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              Provenance Observation History
            </div>

            {record.changeHistory.length > 0 ? (
              <div className="space-y-2">
                {record.changeHistory.map((h, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-stone-200 text-xs font-mono space-y-1 shadow-3xs">
                    <div className="flex justify-between text-stone-500 text-[10px]">
                      <span>{h.timestamp}</span>
                      <span className="text-[#F97316] font-semibold">{h.source}</span>
                    </div>
                    <div className="text-stone-800">
                      <span className="text-rose-500 line-through mr-2">{h.previousValue}</span>
                      <span className="text-emerald-700 font-bold">{h.newValue}</span>
                    </div>
                    <div className="text-[10px] text-stone-500">Trigger: {h.trigger}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-stone-500 font-mono italic">
                Initial baseline observation. No historical drift detected.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onTriggerBoundaryModal('Delete Evidence Record', 'Evidence deletion requires authenticated cryptographic authority and would breach verifiable provenance requirements.')}
            className="px-3.5 py-2 text-xs text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors cursor-pointer font-semibold shadow-3xs"
          >
            Delete Evidence (Boundary)
          </button>

          <button
            type="button"
            onClick={() => onTriggerBoundaryModal('Arbitrate Evidence Value', 'Direct evidence override requires verified Merchant Attestation (Tier 1) credentials.')}
            className="px-4.5 py-2 text-xs font-bold bg-[#F97316] hover:bg-orange-600 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Arbitrate Value
          </button>
        </div>
      </div>
    </div>
  );
};
