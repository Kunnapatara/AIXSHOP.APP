import React, { useState } from 'react';
import { 
  Check, 
  Minus, 
  Sparkles, 
  ShieldAlert, 
  Building2, 
  ArrowRight,
  HelpCircle,
  Zap,
  Info
} from 'lucide-react';
import { BillingPlan, BillingPlanTier } from '../../types/billing';
import { canonicalPlans } from '../../data/sampleBillingData';

interface PlanComparisonSectionProps {
  currentPlanId: BillingPlanTier;
  onSelectPlan: (plan: BillingPlan) => void;
  onRequestEnterprise: () => void;
}

export const PlanComparisonSection: React.FC<PlanComparisonSectionProps> = ({
  currentPlanId,
  onSelectPlan,
  onRequestEnterprise
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const capabilities = [
    { key: 'productCapacity', label: 'Catalog Product Capacity', desc: 'Monitored parent product seats continuously reconciled' },
    { key: 'productIntelligence', label: 'Product Intelligence Engine', desc: 'Normalized canonical identity, specs, dimensions, barcodes' },
    { key: 'evidenceIntelligence', label: 'Evidence & Provenance Tracking', desc: 'Observed, Derived, Merchant Verified fact verification' },
    { key: 'offerIntelligence', label: 'Multi-Seller Offer Intelligence', desc: 'Cross-retailer price, availability, condition tracking' },
    { key: 'buyerIntent', label: 'Buyer Intent Grounding', desc: '7 intent archetypes (problem, comparison, spec, etc.)' },
    { key: 'discoveryIntelligence', label: 'Discovery Engine Readiness', desc: 'Google SGE, Perplexity, feed acceptance scoring' },
    { key: 'monitoring', label: 'Autonomous Monitoring Cadence', desc: 'Drift detection frequency and alert escalation' },
    { key: 'recoveryIntelligence', label: 'Arbitration & Recovery', desc: 'One-click schema fixes and dispute resolution' },
    { key: 'sourceConnections', label: 'Authorized Ingestion Sources', desc: 'E-commerce platforms, GDSN feeds, data connectors' },
    { key: 'apiInfrastructure', label: 'Headless API & Webhooks', desc: 'Enterprise programmatic endpoints & direct ERP pipelines' },
  ];

  return (
    <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
      {/* Header & Billing Cycle Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Subscription Plans & Capacity Comparison
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Transparent pricing anchored directly to catalog product capacity. All tiers include full evidence and offer intelligence.
          </p>
        </div>

        {/* Cycle Toggle & Simulation Tag */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Representative Pricing Preview
          </span>

          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-750">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono font-bold ${
                billingCycle === 'annual' ? 'bg-slate-950 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plan Cards Matrix */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {canonicalPlans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const displayPrice = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`rounded-xl p-5 flex flex-col justify-between transition-all relative ${
                isCurrent
                  ? 'bg-[#0E192B] border-2 border-cyan-500/80 shadow-lg shadow-cyan-950/40'
                  : 'bg-[#0A101C] border border-slate-800 hover:border-slate-700'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold tracking-wider uppercase shadow-sm">
                  Active Subscription
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white tracking-tight">{plan.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {plan.badge}
                  </span>
                </div>

                <div className="mt-3">
                  {displayPrice !== null ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-white font-mono">
                        {displayPrice === 0 ? 'Free' : `$${displayPrice}`}
                      </span>
                      {displayPrice !== 0 && <span className="text-xs text-slate-400">/ month</span>}
                      {billingCycle === 'annual' && displayPrice !== 0 && (
                        <span className="text-[10px] text-slate-500 font-mono ml-1">
                          (billed ${displayPrice * 12}/yr)
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-white">Custom Tier</span>
                      <span className="text-xs text-slate-400">volume based</span>
                    </div>
                  )}
                </div>

                {plan.pricingNote && (
                  <p className="text-[11px] text-cyan-400/90 font-mono mt-1">
                    {plan.pricingNote}
                  </p>
                )}

                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed min-h-[38px]">
                  {plan.description}
                </p>

                {/* Capacity Callout */}
                <div className="mt-4 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-400">Product Capacity:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {typeof plan.productCapacity === 'number' 
                      ? `${plan.productCapacity.toLocaleString()} Products` 
                      : `${plan.productCapacity} Products`}
                  </span>
                </div>

                {/* Key Plan Bullets */}
                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Product & Evidence Intelligence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Offer & Pricing Reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Buyer Intent & Discovery Scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{plan.features.monitoring}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{plan.features.sourceConnections}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {plan.features.apiInfrastructure ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    )}
                    <span className={plan.features.apiInfrastructure ? 'text-slate-200' : 'text-slate-500'}>
                      API & Headless Infrastructure
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                {isCurrent ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold text-center cursor-default"
                  >
                    Current Active Plan
                  </button>
                ) : plan.id === 'paid_1000_plus' || plan.id === 'enterprise' ? (
                  <button
                    type="button"
                    onClick={onRequestEnterprise}
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Contact Enterprise Sales
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Switch to {plan.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Capability Table */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Detailed Capability Breakdown Across Tiers
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border border-slate-800/90 rounded-lg overflow-hidden">
            <thead className="bg-[#0B121E] text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3 font-semibold text-white">Capability</th>
                {canonicalPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`p-3 font-semibold text-center whitespace-nowrap ${
                      plan.id === currentPlanId
                        ? 'bg-cyan-950/30 text-cyan-300 border-x border-cyan-500/20'
                        : ''
                    }`}
                  >
                    {plan.name} ({typeof plan.productCapacity === 'number' ? `${plan.productCapacity} SKUs` : plan.productCapacity})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {capabilities.map((cap) => (
                <tr key={cap.key} className="hover:bg-slate-900/40">
                  <td className="p-3 font-sans">
                    <div className="font-medium text-slate-200">{cap.label}</div>
                    <div className="text-[10px] text-slate-500 font-sans">{cap.desc}</div>
                  </td>
                  {canonicalPlans.map((plan) => {
                    const val = plan.features[cap.key as keyof typeof plan['features']];
                    const isCurrent = plan.id === currentPlanId;
                    return (
                      <td
                        key={plan.id}
                        className={`p-3 text-center ${
                          isCurrent ? 'bg-cyan-950/20 border-x border-cyan-500/20 font-semibold text-cyan-200' : ''
                        }`}
                      >
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check className={`w-4 h-4 mx-auto ${isCurrent ? 'text-cyan-400' : 'text-emerald-400'}`} />
                          ) : (
                            <Minus className="w-4 h-4 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className={isCurrent ? 'text-cyan-200' : 'text-slate-300'}>{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
