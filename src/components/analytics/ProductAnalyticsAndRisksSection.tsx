// src/components/analytics/ProductAnalyticsAndRisksSection.tsx
import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Package, 
  ArrowRight, 
  Search, 
  ArrowUpDown
} from 'lucide-react';
import { 
  IntelligenceRiskItem, 
  ProductAnalyticsRow 
} from '../../types/analytics';

interface ProductAnalyticsAndRisksSectionProps {
  risks: IntelligenceRiskItem[];
  products: ProductAnalyticsRow[];
  onNavigateIssues: () => void;
  onNavigateProducts: () => void;
  onNavigateReport: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const ProductAnalyticsAndRisksSection: React.FC<ProductAnalyticsAndRisksSectionProps> = ({
  risks,
  products,
  onNavigateIssues,
  onNavigateProducts,
  onNavigateReport,
  onSelectProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ProductAnalyticsRow>('issuesCount');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter and sort products
  const filteredProducts = products.filter(p => {
    const pName = p.name || p.productName || '';
    const sku = p.sku || '';
    return pName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return 0;
  });

  const handleSort = (field: keyof ProductAnalyticsRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Intelligence Risks Panel */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Top Intelligence Risks</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Ranked threats to catalog visibility and buyer confidence. Direct remediation in Issues.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateIssues}
            className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Issues Workspace</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {risks.map((risk) => (
            <div 
              key={risk.id}
              className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100/90 border border-stone-200 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center font-mono font-bold text-[10px]">
                      {risk.rank ?? 1}
                    </span>
                    <span className="font-bold text-xs text-stone-900">{risk.title || risk.dimension}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${
                    (risk.severity as string).toUpperCase() === 'CRITICAL' 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {risk.severity}
                  </span>
                </div>

                <div className="text-[11px] text-stone-500 font-mono mb-1">
                  Affects: <span className="text-stone-800 font-medium">{risk.affectedTarget || risk.affectedProductTitle}</span>
                </div>

                <div className="text-xs text-stone-600 leading-relaxed mb-2">
                  {risk.impactDescription || risk.issueSummary}
                </div>
              </div>

              <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#F97316] font-bold">{risk.category || risk.impactArchetypes}</span>
                <button
                  type="button"
                  onClick={onNavigateIssues}
                  className="text-[#F97316] hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Resolve in Issues</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product-Level Analytics Table */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Product-Level Intelligence Analytics</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Deterministic metrics per catalog model. Select a product to view or inspect in other workspaces.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search 24 products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#F97316] font-medium"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] font-mono text-stone-500">
                <th className="py-2.5 px-3">
                  <button 
                    type="button"
                    onClick={() => handleSort('productName')}
                    className="flex items-center gap-1 font-bold uppercase hover:text-stone-900"
                  >
                    <span>Product & SKU</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3 font-bold uppercase">Variants</th>
                <th className="py-2.5 px-3">
                  <button 
                    type="button"
                    onClick={() => handleSort('intelligenceCoveragePercentage')}
                    className="flex items-center gap-1 font-bold uppercase hover:text-stone-900"
                  >
                    <span>Coverage</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3">
                  <button 
                    type="button"
                    onClick={() => handleSort('evidenceCompletenessPercentage')}
                    className="flex items-center gap-1 font-bold uppercase hover:text-stone-900"
                  >
                    <span>Evidence</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3">
                  <button 
                    type="button"
                    onClick={() => handleSort('issuesCount')}
                    className="flex items-center gap-1 font-bold uppercase hover:text-stone-900"
                  >
                    <span>Issues</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3">
                  <button 
                    type="button"
                    onClick={() => handleSort('conflictsCount')}
                    className="flex items-center gap-1 font-bold uppercase hover:text-stone-900"
                  >
                    <span>Conflicts</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3">
                  <button 
                    type="button"
                    onClick={() => handleSort('discoveryReadinessPercentage')}
                    className="flex items-center gap-1 font-bold uppercase hover:text-stone-900"
                  >
                    <span>Discovery</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-3 text-right font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => (
                <tr 
                  key={p.productId} 
                  className="hover:bg-orange-50/40 transition-colors cursor-pointer group"
                  onClick={() => onSelectProduct?.(p.productId)}
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-900 group-hover:text-[#F97316] transition-colors">
                      {p.productName}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400">
                      SKU: {p.sku}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-600 font-medium">
                    {p.variantsCount}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 w-8">{p.intelligenceCoveragePercentage}%</span>
                      <div className="w-16 h-1.5 rounded-full bg-stone-200 overflow-hidden">
                        <div 
                          className="h-full bg-[#F97316] rounded-full" 
                          style={{ width: `${p.intelligenceCoveragePercentage}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-blue-700">{p.evidenceCompletenessPercentage}%</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono font-bold ${(p.issuesCount ?? p.openIssuesCount ?? 0) > 0 ? 'text-amber-700' : 'text-stone-400'}`}>
                      {p.issuesCount ?? p.openIssuesCount ?? 0}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono font-bold ${(p.conflictsCount ?? 0) > 0 ? 'text-rose-700' : 'text-stone-400'}`}>
                      {p.conflictsCount ?? 0}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-emerald-700">{p.discoveryReadinessPercentage}%</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={onNavigateReport}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-[11px] font-medium transition-colors border border-stone-200 shadow-3xs"
                        title="View Intelligence Report"
                      >
                        Report
                      </button>
                      <button
                        type="button"
                        onClick={onNavigateProducts}
                        className="px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] text-[11px] font-bold transition-colors border border-orange-200"
                        title="Inspect in Catalog"
                      >
                        Product
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
