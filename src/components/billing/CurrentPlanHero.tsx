import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight, 
  RefreshCw, 
  AlertTriangle,
  Info,
  Layers,
  Database,
  Eye,
  Activity
} from 'lucide-react';
import { CurrentSubscriptionState } from '../../types/billing';

interface CurrentPlanHeroProps {
  subscription: CurrentSubscriptionState;
  onChangePlan: () => void;
  onUpdateCycle: () => void;
  onCancelPreview: () => void;
  onNavigateProducts?: () => void;
  onNavigateAnalytics?: () => void;
}

export const CurrentPlanHero: React.FC<CurrentPlanHeroProps> = ({
  subscription,
  onChangePlan,
  onUpdateCycle,
  onCancelPreview,
  onNavigateProducts,
  onNavigateAnalytics
}) => {
  const usagePercentage = ((subscription.usedProducts / subscription.productCapacity) * 100).toFixed(1);
  const remainingProducts = subscription.productCapacity - subscription.usedProducts;

  return (
    <div className="rounded-xl bg-gradient-to-b from-[#0E1726] to-[#0A101C] border border-cyan-500/30 p-6 shadow-xl relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase tracking-wider">
            Current Plan
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {subscription.statusLabel}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Cycle: <strong className="text-slate-200 capitalize">{subscription.billingCycle}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next Billing Date: <strong className="text-slate-200">October 15, 2026</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-semibold">$299.00 USD</span>
        </div>
      </div>

      {/* Main Grid: Left Pricing & Tier, Right Capacity Gauge & Included Highlights */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Plan Tier & Cost */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                PRO PLAN
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                Tier 2
              </span>
            </div>
            
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                ${subscription.amount}
              </span>
              <span className="text-slate-400 text-sm font-medium">
                / month (billed monthly)
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Designed for high-growth omnichannel brands requiring continuous multi-source evidence reconciliation, expanded monitoring, and up to 2,000 active Product seats.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Representative Subscription State:</strong> This account is operating in simulated demo mode with full Pro intelligence features unlocked.
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onChangePlan}
              className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              Change Subscription Plan
            </button>
            <button
              type="button"
              onClick={onUpdateCycle}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              Update Billing Cycle
            </button>
            <button
              type="button"
              onClick={onCancelPreview}
              className="px-2.5 py-2 text-xs text-rose-400/80 hover:text-rose-300 transition-colors cursor-pointer ml-auto"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Right: Product Capacity & Core Capabilities */}
        <div className="lg:col-span-7 bg-[#070D18] rounded-xl border border-slate-800/90 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Product Intelligence Capacity
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {subscription.usedProducts} of {subscription.productCapacity.toLocaleString()} Products Used ({usagePercentage}%)
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 shadow-sm" 
                style={{ width: `${Math.max(Number(usagePercentage), 2)}%` }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Used: <strong className="text-white font-bold">{subscription.usedProducts} products</strong></span>
              <span className="text-emerald-400 font-medium">{remainingProducts.toLocaleString()} Products Available Headroom (98.8%)</span>
              <span>Capacity Cap: <strong>{subscription.productCapacity.toLocaleString()}</strong></span>
            </div>

            {/* Included Intelligence Features Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-medium text-slate-300 mb-2.5">
                Included in your Pro Subscription:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>2,000 Monitored Active Products</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Hourly Autonomous Monitoring</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Multi-Source Evidence Reconciliation</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Discovery & AI Engine Auditing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Arbitration & Recovery Workflows</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Expanded Ingestion Connectors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Deep Link Row */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-[11px]">
              Active Catalog: <strong>24 Products</strong> · <strong>68 Variants</strong> · <strong>42 Offers</strong>
            </span>
            <div className="flex items-center gap-3">
              {onNavigateProducts && (
                <button
                  type="button"
                  onClick={onNavigateProducts}
                  className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Inspect Catalog</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
              {onNavigateAnalytics && (
                <button
                  type="button"
                  onClick={onNavigateAnalytics}
                  className="text-slate-400 hover:text-slate-200 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Intelligence Analytics</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
