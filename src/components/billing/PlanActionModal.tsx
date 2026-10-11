import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  Layers,
  Info
} from 'lucide-react';
import { BillingPlan, BillingCycle } from '../../types/billing';
import { canonicalPlans } from '../../data/sampleBillingData';

export type PlanModalMode = 'change_plan' | 'update_cycle' | 'cancel_subscription' | 'enterprise_inquiry' | null;

interface PlanActionModalProps {
  mode: PlanModalMode;
  targetPlan?: BillingPlan | null;
  currentCycle: BillingCycle;
  onClose: () => void;
}

export const PlanActionModal: React.FC<PlanActionModalProps> = ({
  mode,
  targetPlan,
  currentCycle,
  onClose
}) => {
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(currentCycle);

  if (!mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0B121E] border border-cyan-500/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#080D16] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode === 'cancel_subscription' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            ) : mode === 'enterprise_inquiry' ? (
              <Sparkles className="w-5 h-5 text-purple-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-cyan-400" />
            )}
            <span className="text-sm font-bold text-white tracking-wide">
              {mode === 'change_plan' && 'Subscription Plan Change Preview'}
              {mode === 'update_cycle' && 'Update Billing Frequency Preview'}
              {mode === 'cancel_subscription' && 'Cancellation Preview'}
              {mode === 'enterprise_inquiry' && 'Enterprise Infrastructure Inquiry'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          
          {/* Mode 1: Change Plan */}
          {mode === 'change_plan' && targetPlan && (
            <>
              <div className="p-4 rounded-xl bg-[#080E18] border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wide">Requested Tier</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {targetPlan.priceMonthly === 0 
                      ? 'Free' 
                      : targetPlan.priceMonthly !== null 
                        ? `$${targetPlan.priceMonthly} USD / month` 
                        : 'Custom Tier'}
                  </span>
                </div>
                <div className="text-sm font-bold text-white mt-1">{targetPlan.name} Plan</div>
                <p className="mt-1.5 text-slate-400 leading-relaxed">
                  {targetPlan.description}
                </p>
                <div className="mt-3 text-[11px] font-mono text-cyan-300">
                  New Product Limit: {targetPlan.productCapacity} Products
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <strong className="text-white block mb-1">Billing Simulation Boundary:</strong>
                In production, subscription changes are executed via your connected merchant billing provider (e.g., Stripe Billing) with prorated credit calculations. In this preview environment, no subscription or card changes are processed.
              </div>
            </>
          )}

          {/* Mode 2: Update Billing Cycle */}
          {mode === 'update_cycle' && (
            <>
              <p className="text-slate-400">
                Choose your billing recurrence schedule for the Pro Tier ($299/mo). Annual prepayment includes a 20% discount.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div 
                  onClick={() => setSelectedCycle('monthly')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedCycle === 'monthly'
                      ? 'bg-cyan-950/30 border-cyan-500/60 shadow-sm'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="font-bold text-white">Monthly</div>
                  <div className="text-xs font-mono text-cyan-300 mt-1">$299.00 / mo</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Billed each month</div>
                </div>

                <div 
                  onClick={() => setSelectedCycle('annual')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all relative ${
                    selectedCycle === 'annual'
                      ? 'bg-cyan-950/30 border-cyan-500/60 shadow-sm'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <span className="absolute -top-2 right-2 text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Save 20%
                  </span>
                  <div className="font-bold text-white">Annual Prepay</div>
                  <div className="text-xs font-mono text-cyan-300 mt-1">$239.00 / mo</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">$2,868 billed annually</div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 mt-4">
                <strong className="text-white block mb-1">Billing Simulation Boundary:</strong>
                Cycle updates require live payment processor authorization. No actual charges or renewal schedule updates were performed.
              </div>
            </>
          )}

          {/* Mode 3: Cancel Subscription */}
          {mode === 'cancel_subscription' && (
            <>
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <div className="text-sm font-bold text-rose-300 mb-1">
                  Cancellation Preview Mode
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  In production, cancellation would be processed through the billing system. No subscription has been changed in this preview environment.
                </p>
              </div>

              <div className="space-y-2 p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  What happens upon cancellation in production:
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Active Pro tier access continues until end of current period (October 15, 2026).</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Autonomous hourly monitoring pauses at expiration; catalog falls back to free read-only viewing.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Zero automated cancellation penalty fees or hidden termination costs.</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                Current Status: <strong>PRO Plan remains Active · Preview</strong>.
              </div>
            </>
          )}

          {/* Mode 4: Enterprise Inquiry */}
          {mode === 'enterprise_inquiry' && (
            <>
              <div className="p-4 rounded-xl bg-[#080E18] border border-purple-500/30">
                <div className="text-sm font-bold text-white mb-1">Enterprise Architecture Scale</div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  For catalogs exceeding 2,000 Products, international multi-currency pricing, direct SAP/Oracle ERP integrations, and custom SLA agreements.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <strong className="text-white block mb-1">Enterprise Boundary:</strong>
                Enterprise custom contracting requires manual technical catalog sizing and bespoke connector provisioning.
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#080D16] border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
