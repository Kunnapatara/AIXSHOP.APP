// src/components/analytics/DefinitionsGuideModal.tsx
import React from 'react';
import { 
  X, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  DollarSign, 
  Eye
} from 'lucide-react';

interface DefinitionsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DefinitionsGuideModal: React.FC<DefinitionsGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-[#F97316] border border-orange-200 shadow-3xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Metric Definitions & Rules of Truth</h3>
              <p className="text-xs text-stone-500">
                Core principles governing AIXSHOP intelligence measurement and reporting.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700">
          {/* Rule 1: Representative Data */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
            <div className="font-bold text-[#F97316] text-sm mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Data Truth Rule (Zero Fake Telemetry)</span>
            </div>
            <p className="leading-relaxed text-stone-700">
              Page 13 displays representative diagnostic metrics for the AeroPulse Athletics catalog (24 canonical products). It must never imply that simulated or modeled intelligence metrics are real production website visits, consumer clicks, or search query volumes.
            </p>
          </div>

          {/* Rule 2: Coverage vs Completeness */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F97316]" />
              <span>2. Intelligence Coverage vs. Evidence Completeness</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-3xs">
                <span className="font-bold text-stone-900 block mb-0.5">Intelligence Coverage:</span>
                <span className="text-stone-600 text-[11px]">
                  The percentage of modeled schema dimensions populated with structured values (e.g. drop, weight, carbon plate).
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-3xs">
                <span className="font-bold text-stone-900 block mb-0.5">Evidence Completeness:</span>
                <span className="text-stone-600 text-[11px]">
                  The proportion of those values backed by explicit provenance records (OBSERVED, DERIVED, or MERCHANT VERIFIED).
                </span>
              </div>
            </div>
          </div>

          {/* Rule 3: Evidence States */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>3. Grounded Evidence States</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">OBSERVED:</span>
                <span className="text-stone-700">Fact directly extracted from an authoritative source (e.g. Shopify JSON, DOM, manufacturer feed).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">DERIVED:</span>
                <span className="text-stone-700">Synthesized through deterministic rules or standardized conversions (e.g. converting ounces to grams).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">MERCHANT VERIFIED:</span>
                <span className="text-stone-700">Explicitly reviewed, affirmed, and signed by an authorized human operator.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">MISSING:</span>
                <span className="text-stone-700">Expected catalog attribute has zero available assertions across all connected feeds.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">CONFLICT:</span>
                <span className="text-stone-700">Two or more connected sources provide incompatible assertions without an established arbitration resolution.</span>
              </div>
            </div>
          </div>

          {/* Rule 4: Product != Offer */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>4. Architectural Boundary: Product ≠ Offer</span>
            </div>
            <p className="leading-relaxed text-stone-600 text-[11px]">
              Products and Variants define canonical physical truth (what a shoe is: materials, geometry, GTIN). Offers define commercial transaction terms (price, merchant, in-stock condition, shipping). These datasets are decoupled to prevent pricing fluctuations from corrupting product identity.
            </p>
          </div>

          {/* Rule 5: Change != Issue */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>5. Change ≠ Issue</span>
            </div>
            <p className="leading-relaxed text-stone-600 text-[11px]">
              A detected change in continuous monitoring is an unverified delta. Only changes that degrade discovery readiness, create schema syntax errors, or generate factual conflicts are diagnosed as actionable issues.
            </p>
          </div>

          {/* Rule 6: Discovery Readiness vs Ranking */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>6. Discovery Readiness vs. Search Rankings</span>
            </div>
            <p className="leading-relaxed text-stone-600 text-[11px]">
              Discovery Readiness measures structural readiness (schema completeness, feed validity, semantic clarity) for algorithmic indexing. AIXSHOP does not simulate or claim search engine ranking positions or chatbot recommendation frequencies.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold transition-colors cursor-pointer shadow-3xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
