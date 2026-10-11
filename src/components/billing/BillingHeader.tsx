import React from 'react';
import { 
  CreditCard, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Calendar,
  ArrowRight,
  ExternalLink,
  Receipt
} from 'lucide-react';

interface BillingHeaderProps {
  onChangePlan: () => void;
  onViewHistory: () => void;
  onViewPrinciples: () => void;
}

export const BillingHeader: React.FC<BillingHeaderProps> = ({
  onChangePlan,
  onViewHistory,
  onViewPrinciples
}) => {
  return (
    <div className="bg-[#090E17] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            Page 14 · Billing & Subscription Intelligence
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            AeroPulse Athletics
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            24 Representative Products (Pro Tier)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Billing Preview · Simulation Mode
          </span>
        </div>

        {/* Header Title and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Billing & Subscription Intelligence
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 align-middle">
                Pro Plan · Active Preview
              </span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-400 max-w-2xl leading-relaxed">
              Manage your AIXSHOP product intelligence capacity, review Product headroom utilization, inspect representative billing history, and verify commercial transparency principles.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onViewPrinciples}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 text-xs font-medium transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Billing Principles</span>
            </button>
            <button
              type="button"
              onClick={onViewHistory}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 text-xs font-medium transition-colors cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5 text-slate-400" />
              <span>Billing History</span>
            </button>
            <button
              type="button"
              onClick={onChangePlan}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <span>Change Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
