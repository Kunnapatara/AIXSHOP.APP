import React from 'react';
import { 
  X, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  ExternalLink,
  Tag,
  Compass,
  DollarSign,
  Barcode,
  Wrench,
  FileCheck,
  AlertOctagon,
  Scale,
  BrainCircuit
} from 'lucide-react';
import { WorkbenchProduct } from '../../types/workbench';

interface ProductIntelligenceDrawerProps {
  product: WorkbenchProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReport: () => void;
  onOpenFixVerification: (productName: string) => void;
  onOpenVaporStrideReport: () => void;
}

export const ProductIntelligenceDrawer: React.FC<ProductIntelligenceDrawerProps> = ({
  product,
  isOpen,
  onClose,
  onOpenReport,
  onOpenFixVerification,
  onOpenVaporStrideReport
}) => {
  if (!isOpen || !product) return null;

  const intentArchetypes = [
    { key: 'discovery', label: 'Discovery Intent', score: product.buyerIntentScores.discovery },
    { key: 'problem', label: 'Problem Solving', score: product.buyerIntentScores.problem },
    { key: 'comparison', label: 'Direct Comparison', score: product.buyerIntentScores.comparison },
    { key: 'specification', label: 'Technical Spec', score: product.buyerIntentScores.specification },
    { key: 'purchase', label: 'Purchase Timing', score: product.buyerIntentScores.purchase },
    { key: 'useCase', label: 'Use-Case Suitability', score: product.buyerIntentScores.useCase },
    { key: 'trust', label: 'Merchant Trust / Policy', score: product.buyerIntentScores.trust },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-y-0 right-0 max-w-2xl w-full bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col text-stone-900 z-50 transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header */}
        <div className="p-6 border-b border-stone-200/80 bg-white shrink-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-medium">
                Product Intelligence Preview
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {product.category}
              </span>
              {product.isPrimaryExample && (
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  ★ Primary Modeled Product
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-tight">
            {product.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-500 font-mono">
            <span>Brand: <strong className="text-stone-800">{product.brand}</strong></span>
            <span>•</span>
            <span>SKU: <strong className="text-stone-800">{product.sku}</strong></span>
            <span>•</span>
            <span>GTIN: <strong className="text-stone-800">{product.gtin}</strong></span>
            <span>•</span>
            <span>Variants: <strong className="text-stone-800">{product.variantCount}</strong></span>
          </div>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Identity & Priority Banner */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-2xl border shadow-xs ${
              product.identityStatus === 'Resolved' 
                ? 'bg-emerald-50/60 border-emerald-200' 
                : 'bg-amber-50/60 border-amber-200'
            }`}>
              <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[10px] uppercase mb-1">
                <Barcode className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Identity Status</span>
              </div>
              <div className={`text-sm font-bold font-mono ${
                product.identityStatus === 'Resolved' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {product.identityStatus}
              </div>
              <p className="text-[11px] text-stone-600 mt-1 leading-normal">
                {product.identityDetail}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border shadow-xs ${
              product.priority === 'Critical'
                ? 'bg-rose-50/60 border-rose-200'
                : product.priority === 'High'
                ? 'bg-amber-50/60 border-amber-200'
                : 'bg-white border-stone-200/80'
            }`}>
              <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[10px] uppercase mb-1">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                <span>Remediation Priority</span>
              </div>
              <div className={`text-sm font-bold font-mono ${
                product.priority === 'Critical' ? 'text-rose-700' : product.priority === 'High' ? 'text-amber-700' : 'text-stone-800'
              }`}>
                {product.priority}
              </div>
              <p className="text-[11px] text-stone-600 mt-1 leading-normal">
                {product.priorityRationale}
              </p>
            </div>
          </div>

          {/* Core Grounding Section: What AIXSHOP Knows vs Cannot Verify */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Ground Truth Diagnostics</span>
            </h3>

            {/* What AIXSHOP Knows */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>What AIXSHOP Knows (Observed / Verified)</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed pl-6">
                {product.whatAIXShopKnows}
              </p>
            </div>

            {/* What AIXSHOP Cannot Verify */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>What AIXSHOP Cannot Verify (Evidence Gaps / Conflicts)</span>
              </div>
              <ul className="space-y-1.5 pl-6 text-stone-700 text-xs">
                {product.whatAIXShopCannotVerify.length > 0 ? (
                  product.whatAIXShopCannotVerify.map((gap, i) => (
                    <li key={i} className="list-disc list-outside text-stone-700">
                      {gap}
                    </li>
                  ))
                ) : (
                  <li className="text-emerald-700 font-medium">Zero active verification gaps detected.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Why It Matters & Recommended Step */}
          <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-200 shadow-xs space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200 inline-block mb-1.5 font-medium">
                Impact Dimension: {product.whyItMatters.category}
              </span>
              <h4 className="text-xs font-bold text-stone-900">Why This Matters in AI Discovery</h4>
              <p className="text-stone-700 text-xs leading-relaxed mt-1">
                {product.whyItMatters.explanation}
              </p>
            </div>

            <div className="pt-2 border-t border-orange-200/80 flex items-start gap-2 text-xs">
              <Wrench className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900">Recommended Remediation: </span>
                <span className="text-orange-950">{product.recommendedNextStep}</span>
              </div>
            </div>
          </div>

          {/* Epistemic Evidence Snapshot */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Evidence Health ({product.intelligenceCoverage}% Coverage)</span>
              </h3>
              <span className="text-[11px] font-mono text-stone-500">
                Dominant: <strong className="text-stone-800">{product.dominantEvidenceState}</strong>
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-[10px] text-stone-500">Verified</div>
                <div className="font-bold text-emerald-700 text-sm mt-0.5">{product.evidenceBreakdown.verified}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-[10px] text-stone-500">Observed</div>
                <div className="font-bold text-blue-700 text-sm mt-0.5">{product.evidenceBreakdown.observed}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                <div className="text-[10px] text-stone-500">Derived</div>
                <div className="font-bold text-purple-700 text-sm mt-0.5">{product.evidenceBreakdown.derived}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <div className="text-[10px] text-stone-500">Conflict</div>
                <div className="font-bold text-rose-700 text-sm mt-0.5">{product.evidenceBreakdown.conflict}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-[10px] text-stone-500">Missing</div>
                <div className="font-bold text-amber-700 text-sm mt-0.5">{product.evidenceBreakdown.missing}</div>
              </div>
            </div>
          </div>

          {/* Offers Snapshot & PRODUCT != OFFER Rule */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Commercial Offer Snapshot</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                Snapshot Only
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-stone-500">Observed Offers Across Surfaces:</span>
              <span className="font-bold font-mono text-stone-900">{product.observedOffersCount} Offers</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-t border-stone-100">
              <span className="text-stone-500">Observed Price Range:</span>
              <span className="font-bold font-mono text-emerald-700">
                {product.observedPriceMin !== null && product.observedPriceMax !== null
                  ? `$${product.observedPriceMin.toFixed(2)} – $${product.observedPriceMax.toFixed(2)} ${product.currency}`
                  : 'No pricing observed'}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 italic">
              <strong>Rule of Separation: </strong>Product specs represent immutable canonical truth. Offers represent fluid commercial marketplace conditions. AIXSHOP does not confuse products with offers.
            </div>
          </div>

          {/* Buyer Intent Coverage Meters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Buyer Intent Readiness (7 Archetypes)</span>
              </h3>
              <span className="text-[11px] font-mono text-[#F97316] font-semibold">
                Discovery Readiness: {product.discoveryReadiness}%
              </span>
            </div>

            <div className="space-y-2">
              {intentArchetypes.map((intent) => (
                <div key={intent.key} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-600">{intent.label}</span>
                    <span className="font-mono font-bold text-stone-800">{intent.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        intent.score >= 80 
                          ? 'bg-emerald-500' 
                          : intent.score >= 65 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${intent.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-stone-200/80 bg-white shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenFixVerification(product.name)}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            <span>Review in Fix & Verification</span>
          </button>

          {product.isPrimaryExample ? (
            <button
              type="button"
              onClick={onOpenReport}
              className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open Product Intelligence Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenVaporStrideReport}
              className="px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] text-xs font-semibold border border-orange-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              title="View full deep report modeled for VaporStride Carbon Elite"
            >
              <span>View Modeled Report (VaporStride)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
