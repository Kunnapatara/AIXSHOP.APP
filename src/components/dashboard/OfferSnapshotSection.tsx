import React from 'react';
import { Tag, DollarSign, AlertTriangle, ArrowUpDown, PackageX, Info, Clock } from 'lucide-react';
import { CatalogOfferSnapshot } from '../../types/dashboard';

interface OfferSnapshotSectionProps {
  snapshot: CatalogOfferSnapshot;
  onSelectMetric: (title: string, value: string, explanation: string) => void;
}

export const OfferSnapshotSection: React.FC<OfferSnapshotSectionProps> = ({
  snapshot,
  onSelectMetric
}) => {
  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Tag className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Offer Intelligence Snapshot</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold">
              42 Observed Offers
            </span>
          </div>
          <p className="text-xs text-slate-400 pt-0.5">
            Commercial marketplace conditions observed across authorized and secondary seller channels.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono bg-amber-950/30 px-2.5 py-1 rounded border border-amber-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>Point-in-Time Snapshot · Not Real-Time</span>
        </div>
      </div>

      {/* Foundational Law: PRODUCT ≠ OFFER Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-start gap-3">
        <div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 font-mono text-[10px] font-extrabold text-indigo-400 shrink-0 uppercase tracking-wider">
          AIXSHOP Law
        </div>
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-white">PRODUCT ≠ OFFER. </strong>
          Offers are transient, seller-specific commercial terms (price, shipping, stock). They never mutate the canonical product identity or intrinsic physical specifications.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        {/* Total Offers */}
        <div 
          onClick={() => onSelectMetric(
            'Observed Offers',
            `${snapshot.observedOffersCount} Offers`,
            'Total merchant offers observed across 18 public merchant websites and retail distributors for the representative catalog.'
          )}
          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1"
        >
          <span className="text-[10px] font-mono uppercase text-slate-400 block group-hover:text-slate-300">
            Observed Offers
          </span>
          <span className="text-xl font-mono font-black text-white block">
            {snapshot.observedOffersCount}
          </span>
          <span className="text-[10px] text-slate-500 block">Across 18 sellers</span>
        </div>

        {/* Lowest Price */}
        <div 
          onClick={() => onSelectMetric(
            'Lowest Observed Price',
            `$${snapshot.lowestPrice.toFixed(2)}`,
            'Minimum valid seller price captured during the last catalog observation run. Time-dependent and seller-specific.'
          )}
          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1"
        >
          <span className="text-[10px] font-mono uppercase text-slate-400 block group-hover:text-slate-300">
            Lowest Observed
          </span>
          <span className="text-xl font-mono font-black text-emerald-400 block">
            ${snapshot.lowestPrice.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-500 block">Authorized direct offer</span>
        </div>

        {/* Highest Price */}
        <div 
          onClick={() => onSelectMetric(
            'Highest Observed Price',
            `$${snapshot.highestPrice.toFixed(2)}`,
            'Maximum seller price detected, typically on secondary reseller marketplaces with low inventory availability.'
          )}
          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1"
        >
          <span className="text-[10px] font-mono uppercase text-slate-400 block group-hover:text-slate-300">
            Highest Observed
          </span>
          <span className="text-xl font-mono font-black text-slate-200 block">
            ${snapshot.highestPrice.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-500 block">Marketplace markup</span>
        </div>

        {/* Out-of-Stock */}
        <div 
          onClick={() => onSelectMetric(
            'Out-of-Stock Offers',
            `${snapshot.outOfStockOffersCount} Offers`,
            'Seven offers detected from retailers where product inventory was marked sold out or temporarily unavailable.'
          )}
          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1"
        >
          <span className="text-[10px] font-mono uppercase text-rose-400 block group-hover:text-rose-300">
            Out-of-Stock
          </span>
          <span className="text-xl font-mono font-black text-rose-400 block">
            {snapshot.outOfStockOffersCount}
          </span>
          <span className="text-[10px] text-slate-500 block">Across 4 sellers</span>
        </div>

        {/* Offer Conflicts */}
        <div 
          onClick={() => onSelectMetric(
            'Offer Microdata Conflicts',
            `${snapshot.sellerDiscrepanciesCount} Conflicts`,
            'Discrepancies where the HTML visible price contradicts the embedded JSON-LD Product Offer schema on partner sites.'
          )}
          className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group space-y-1"
        >
          <span className="text-[10px] font-mono uppercase text-amber-400 block group-hover:text-amber-300">
            Offer Conflicts
          </span>
          <span className="text-xl font-mono font-black text-amber-400 block">
            {snapshot.sellerDiscrepanciesCount}
          </span>
          <span className="text-[10px] text-slate-500 block">Markup vs page text</span>
        </div>
      </div>
    </div>
  );
};
