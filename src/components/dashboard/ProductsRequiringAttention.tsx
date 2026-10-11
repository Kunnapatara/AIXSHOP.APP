import React from 'react';
import { 
  AlertOctagon, 
  ExternalLink, 
  Eye, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  ChevronRight,
  Package
} from 'lucide-react';
import { RepresentativeProductItem } from '../../types/dashboard';

interface ProductsRequiringAttentionProps {
  products: RepresentativeProductItem[];
  onSelectProduct: (product: RepresentativeProductItem) => void;
  onNavigateToReport: () => void;
  onNavigateProducts?: () => void;
}

export const ProductsRequiringAttention: React.FC<ProductsRequiringAttentionProps> = ({
  products,
  onSelectProduct,
  onNavigateToReport,
  onNavigateProducts
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Needs Attention':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const getEvidenceBadge = (state: string) => {
    switch (state) {
      case 'CONFLICT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'MISSING':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'MERCHANT_VERIFIED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Products Requiring Attention</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30 font-semibold">
              Top 5 Triage SKUs
            </span>
          </div>
          <p className="text-xs text-slate-400 pt-0.5">
            Representative products with unresolved conflicts or incomplete specification evidence.
          </p>
        </div>

        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/20">
          Representative Preview Data
        </span>
      </div>

      {/* Table / List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="pb-2.5 pl-2 font-medium">Product SKU & Name</th>
              <th className="pb-2.5 px-3 font-medium">Status</th>
              <th className="pb-2.5 px-3 font-medium">Main Issue</th>
              <th className="pb-2.5 px-3 text-center font-medium">Coverage</th>
              <th className="pb-2.5 px-3 text-center font-medium">Evidence State</th>
              <th className="pb-2.5 pr-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {products.map((prod) => {
              const isPrimary = prod.isPrimaryExample;

              return (
                <tr
                  key={prod.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  {/* Product Title & Brand */}
                  <td className="py-3.5 pl-2 pr-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {prod.name}
                        </span>
                        {isPrimary && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-bold">
                            Modeled in P03
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span>{prod.sku}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400 font-sans">{prod.category}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getStatusBadge(prod.status)}`}>
                      {prod.status}
                    </span>
                  </td>

                  {/* Main Issue */}
                  <td className="py-3.5 px-3 max-w-xs text-slate-300">
                    <p className="line-clamp-2 leading-relaxed text-xs">
                      {prod.mainIssue}
                    </p>
                  </td>

                  {/* Coverage */}
                  <td className="py-3.5 px-3 text-center font-mono whitespace-nowrap">
                    <span className="font-bold text-white text-xs">{prod.intelligenceCoverage}%</span>
                  </td>

                  {/* Evidence State */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getEvidenceBadge(prod.evidenceState)}`}>
                      {prod.evidenceState}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 pr-2 text-right whitespace-nowrap">
                    {isPrimary ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToReport();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                        title="View Full Product Intelligence Report"
                      >
                        <span>Inspect Report</span>
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(prod);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                      >
                        <span>Preview</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 font-mono border-t border-slate-800/80">
        <span>Displaying 5 of 8 high-priority products</span>
        {onNavigateProducts ? (
          <button
            type="button"
            onClick={onNavigateProducts}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View All 24 Products in Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span>Additional SKU batch triage available in Products Workbench</span>
        )}
      </div>
    </div>
  );
};
