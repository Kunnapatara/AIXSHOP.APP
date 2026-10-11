import React from 'react';
import { 
  Package, 
  Layers, 
  Tag, 
  Database, 
  HelpCircle, 
  CheckCircle, 
  ArrowUpRight, 
  AlertCircle,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { CurrentSubscriptionState } from '../../types/billing';

interface CapacityUtilizationCardProps {
  subscription: CurrentSubscriptionState;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
  onNavigateWorkbench?: () => void;
}

export const CapacityUtilizationCard: React.FC<CapacityUtilizationCardProps> = ({
  subscription,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateWorkbench
}) => {
  const usagePercentage = ((subscription.usedProducts / subscription.productCapacity) * 100).toFixed(1);
  const remaining = subscription.productCapacity - subscription.usedProducts;

  return (
    <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Product Intelligence Capacity & Headroom
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Real-time metering of your monied product seats, variant coverage, and multi-channel offer intelligence volume.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium">
            Status: Nominal · 98.8% Headroom
          </span>
        </div>
      </div>

      {/* Main Meter & Dimension Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric 1: Billable SKUs */}
        <div className="p-4 rounded-xl bg-[#0B1320] border border-cyan-500/30 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-cyan-400" />
              Billable Products
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              Primary Metric
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{subscription.usedProducts}</span>
            <span className="text-slate-400 text-sm font-mono">/ {subscription.productCapacity.toLocaleString()}</span>
          </div>

          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>{usagePercentage}% Capacity Utilized</span>
            <span className="text-emerald-400 font-mono font-medium">{remaining.toLocaleString()} Available</span>
          </div>

          {/* Mini progress bar */}
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-cyan-400 h-full rounded-full" 
              style={{ width: `${Math.max(Number(usagePercentage), 2)}%` }}
            />
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Representative Catalog</span>
            {onNavigateProducts && (
              <button
                type="button"
                onClick={onNavigateProducts}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium cursor-pointer transition-colors"
              >
                <span>View Products</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Metric 2: Variants (Non-billable unit) */}
        <div className="p-4 rounded-xl bg-[#0B121E] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Variants Observed
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Non-Billable
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{subscription.observedVariants}</span>
            <span className="text-slate-500 text-xs font-mono">across {subscription.usedProducts} products</span>
          </div>

          <div className="mt-2 text-xs text-slate-400">
            Average 2.83 variants per parent product. Colorways, sizes, and width profiles tracked under parent.
          </div>

          <div className="mt-5 pt-2.5 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">No variant surcharge</span>
            <span className="text-[11px] text-slate-400 font-mono">Included in tier</span>
          </div>
        </div>

        {/* Metric 3: Observed Market Offers (Non-billable unit) */}
        <div className="p-4 rounded-xl bg-[#0B121E] border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Offers Observed
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Non-Billable
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{subscription.observedOffers}</span>
            <span className="text-slate-500 text-xs font-mono">across 18 products</span>
          </div>

          <div className="mt-2 text-xs text-slate-400">
            Merchant Direct, Fleet Feet, Road Runner, Running Warehouse, and authorized distributor prices.
          </div>

          <div className="mt-5 pt-2.5 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Multi-seller coverage</span>
            {onNavigateOffers && (
              <button
                type="button"
                onClick={onNavigateOffers}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium cursor-pointer transition-colors"
              >
                <span>View Offers & Pricing</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Critical Principle Clarification Notice */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Commercial Clarity Rule:</strong> Billing capacity is measured strictly by <strong>parent products</strong>. Variants (size, color, packaging) and observed multi-seller retail offers are intelligence dimensions associated with those products. They do <em>not</em> consume separate paid product capacity seats.
        </div>
      </div>
    </div>
  );
};
