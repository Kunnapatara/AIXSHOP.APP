import React from 'react';
import { CANONICAL_PRODUCT_ID } from '../../data/canonicalCatalog';
import { X, ExternalLink, ShieldCheck, AlertTriangle, HelpCircle, Layers, Tag } from 'lucide-react';
import { RepresentativeProductItem } from '../../types/dashboard';

interface ProductDetailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: RepresentativeProductItem | null;
  onNavigateToReport?: () => void;
}

export const ProductDetailPreviewModal: React.FC<ProductDetailPreviewModalProps> = ({
  isOpen,
  onClose,
  product,
  onNavigateToReport
}) => {
  if (!isOpen || !product) return null;

  const isVaporStride = product.id === CANONICAL_PRODUCT_ID;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#0F172A] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 p-6 text-slate-100 relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20 font-semibold">
                Representative Preview Product
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border font-semibold ${
                product.status === 'Critical' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : product.status === 'Needs Attention'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {product.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{product.name}</h3>
            <p className="text-xs text-slate-400">{product.brand} · {product.category}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Catalog SKU</span>
              <span className="font-mono text-slate-200 font-semibold">{product.sku}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Canonical ID</span>
              <span className="font-mono text-cyan-300 font-semibold truncate block">{product.canonicalId || 'Pending'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Coverage</span>
              <span className="font-mono text-emerald-400 font-semibold">{product.intelligenceCoverage}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Evidence State</span>
              <span className={`font-mono font-semibold ${
                product.evidenceState === 'CONFLICT' ? 'text-amber-400' : 'text-rose-400'
              }`}>{product.evidenceState}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary Unresolved Intelligence Finding</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {product.mainIssue}
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-slate-400">
              <strong className="text-slate-300">Recommended Next Step:</strong> {product.suggestedAction}
            </div>
          </div>

          {isVaporStride ? (
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-cyan-300 block">Full Report Available</span>
                <span className="text-slate-400 text-[11px]">
                  VaporStride Carbon Elite is fully modeled in Page 03 Product Intelligence Report.
                </span>
              </div>
              {onNavigateToReport && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToReport();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <span>Open Page 03</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
              <em>Note:</em> This representative product demonstrates catalog-wide aggregation metrics on Page 05. Detailed multi-tab attribute editing for all 24 products will be part of the future <strong>Page 06 — Products Management</strong>.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
