// src/components/admin/EvidenceConsoleSection.tsx
import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { sampleAdminEvidenceRecords } from '../../data/sampleAdminData';
import { AdminEvidenceRecord } from '../../types/admin';
import { EvidenceState } from '../../types/landing';

interface EvidenceConsoleSectionProps {
  onSelectRecord: (record: AdminEvidenceRecord) => void;
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const EvidenceConsoleSection: React.FC<EvidenceConsoleSectionProps> = ({
  onSelectRecord,
  onTriggerBoundaryModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState<'ALL' | EvidenceState>('ALL');
  const [authorityFilter, setAuthorityFilter] = useState<string>('ALL');

  const filteredRecords = useMemo(() => {
    return sampleAdminEvidenceRecords.filter((rec) => {
      // State Filter
      if (stateFilter !== 'ALL' && rec.state !== stateFilter) return false;

      // Authority Filter
      if (authorityFilter !== 'ALL' && rec.authorityLevel.toString() !== authorityFilter) return false;

      // Search query
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesProduct = rec.productName.toLowerCase().includes(query) || rec.productId.toLowerCase().includes(query);
        const matchesAttr = rec.attribute.toLowerCase().includes(query);
        const matchesVal = rec.value.toLowerCase().includes(query);
        const matchesId = rec.id.toLowerCase().includes(query);
        const matchesSource = rec.sourceName.toLowerCase().includes(query);
        if (!matchesProduct && !matchesAttr && !matchesVal && !matchesId && !matchesSource) return false;
      }

      return true;
    });
  }, [searchTerm, stateFilter, authorityFilter]);

  const getStateBadge = (state: EvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-3xs">
            <CheckCircle2 className="w-2.5 h-2.5" />
            MERCHANT VERIFIED
          </span>
        );
      case 'OBSERVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-50 text-[#F97316] border border-orange-200 shadow-3xs">
            OBSERVED
          </span>
        );
      case 'DERIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-stone-100 text-stone-700 border border-stone-200 shadow-3xs">
            DERIVED
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-3xs animate-pulse">
            <AlertTriangle className="w-2.5 h-2.5" />
            CONFLICT
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 shadow-3xs">
            MISSING
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              Evidence Console
              <span className="text-xs font-normal text-stone-500 font-mono">
                (System Fact Provenance & Verifiability)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              The cryptographic single-truth ledger. Every attribute links to an immutable source citation.
            </p>
          </div>
        </div>

        <div className="text-xs text-stone-500 font-mono">
          Showing <span className="text-stone-900 font-bold">{filteredRecords.length}</span> of 194 facts
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-stone-50 p-3.5 rounded-2xl border border-stone-200 shadow-3xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search attributes, products, values..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 font-mono shadow-3xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* State Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 text-[11px] font-mono overflow-x-auto shadow-3xs">
            {(['ALL', 'OBSERVED', 'DERIVED', 'MERCHANT_VERIFIED', 'CONFLICT', 'MISSING'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStateFilter(st)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  stateFilter === st
                    ? 'bg-orange-50 text-[#F97316] font-bold border border-orange-200 shadow-3xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Authority Filter */}
          <select
            value={authorityFilter}
            onChange={(e) => setAuthorityFilter(e.target.value)}
            className="bg-white border border-stone-200 text-stone-700 rounded-xl text-[11px] font-mono px-3 py-1.5 focus:outline-none focus:border-orange-500 shadow-3xs font-medium"
          >
            <option value="ALL">All Authority Tiers</option>
            <option value="1">Tier 1: Merchant Verified</option>
            <option value="2">Tier 2: Official Brand</option>
            <option value="3">Tier 3: Structured Feed</option>
            <option value="5">Tier 5: Public Observation</option>
            <option value="6">Tier 6: Derived Intelligence</option>
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-3xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-500 font-mono text-[11px] uppercase tracking-wider border-b border-stone-200">
            <tr>
              <th className="px-4 py-3 font-semibold">Evidence ID</th>
              <th className="px-4 py-3 font-semibold">Product & Attribute</th>
              <th className="px-4 py-3 font-semibold">Recorded Value</th>
              <th className="px-4 py-3 font-semibold">Source & Tier</th>
              <th className="px-4 py-3 font-semibold">State & Confidence</th>
              <th className="px-4 py-3 font-semibold">Detected At</th>
              <th className="px-4 py-3 text-right font-semibold">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 font-sans">
            {filteredRecords.map((rec) => (
              <tr 
                key={rec.id} 
                onClick={() => onSelectRecord(rec)}
                className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
              >
                <td className="px-4 py-3.5 font-mono text-[#F97316] font-bold text-[11px]">
                  {rec.id}
                </td>

                <td className="px-4 py-3.5">
                  <div className="font-bold text-stone-900 tracking-tight group-hover:text-[#F97316] transition-colors font-sans">
                    {rec.attribute}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate max-w-xs">
                    {rec.productName}
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <div className="font-mono font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200 inline-block shadow-3xs">
                    {rec.value}
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <div className="text-stone-800 font-semibold">{rec.sourceName}</div>
                  <div className="text-[10px] font-mono text-stone-500 mt-0.5">
                    Tier 0{rec.authorityLevel} Authority
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    {getStateBadge(rec.state)}
                    <span className="text-[11px] font-mono text-stone-500 font-semibold">
                      {rec.confidence}%
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1 truncate max-w-[200px]">
                    {rec.lastChange}
                  </div>
                </td>

                <td className="px-4 py-3.5 text-[11px] font-mono text-stone-500 whitespace-nowrap">
                  {rec.detectedAt}
                </td>

                <td className="px-4 py-3.5 text-right">
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#F97316] inline-block transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
