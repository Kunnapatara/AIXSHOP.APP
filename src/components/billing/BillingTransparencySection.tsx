import React from 'react';
import { 
  ShieldCheck, 
  Coins, 
  Package, 
  GitBranch, 
  FileCheck, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { sampleBillingPrinciples, sampleCapacityPolicyTiers } from '../../data/sampleBillingData';

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert: AlertTriangle,
  Coins: Coins,
  Package: Package,
  GitBranch: GitBranch,
  FileCheck: FileCheck,
  Lock: Lock
};

export const BillingTransparencySection: React.FC = () => {
  return (
    <div className="space-y-6" id="billing-principles-section">
      
      {/* 1. What You're Paying For */}
      <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                What You're Paying For
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              AIXSHOP provides a continuous product intelligence infrastructure layer that actively organizes, validates, observes, and monitors your catalog data.
            </p>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            Infrastructure Pricing Model
          </span>
        </div>

        {/* Highlight Banner: No Token Charges */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-slate-900 border border-cyan-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                AIXSHOP does not charge merchants for individual AI questions or LLM prompt tokens.
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Your subscription covers ongoing catalog intelligence capacity and autonomous monitoring pipelines, not ephemeral chat requests.
              </p>
            </div>
          </div>
          <span className="hidden md:inline-block text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 whitespace-nowrap">
            Fixed Product Quota
          </span>
        </div>

        {/* 8 Core Inclusions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">01. Product Intelligence</span>
            <span className="text-slate-300 font-medium">Product Intelligence Capacity</span>
            <p className="text-[11px] text-slate-400 mt-1">Continuous normalization of barcodes, attributes, specs, and parent-child variations.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">02. Provenance Pipeline</span>
            <span className="text-slate-300 font-medium">Evidence Processing</span>
            <p className="text-[11px] text-slate-400 mt-1">Multi-tier fact verification (Observed, Derived, Merchant Verified) across sources.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">03. Market Visibility</span>
            <span className="text-slate-300 font-medium">Offer Intelligence</span>
            <p className="text-[11px] text-slate-400 mt-1">Real-time observation of seller prices, stock availability, and distributor listings.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">04. AI Engine Grounding</span>
            <span className="text-slate-300 font-medium">Discovery Intelligence</span>
            <p className="text-[11px] text-slate-400 mt-1">LLM citation readiness and structured Schema.org compliance for search agents.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">05. Drift Prevention</span>
            <span className="text-slate-300 font-medium">Monitoring Capacity</span>
            <p className="text-[11px] text-slate-400 mt-1">Autonomous hourly catalog scans checking for third-party drift and spec changes.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">06. Auditable Timeline</span>
            <span className="text-slate-300 font-medium">Intelligence History</span>
            <p className="text-[11px] text-slate-400 mt-1">Immutable change logs capturing when attributes modified and what source triggered it.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">07. Conflict Resolution</span>
            <span className="text-slate-300 font-medium">Recovery Workflows</span>
            <p className="text-[11px] text-slate-400 mt-1">One-click merchant arbitration tools and automated merchant-attested gap closures.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="font-mono text-cyan-400 font-bold block mb-1">08. Feed Ingestion</span>
            <span className="text-slate-300 font-medium">Source Infrastructure</span>
            <p className="text-[11px] text-slate-400 mt-1">Managed read-only connectors for Shopify, Google Merchant Center, and GS1 GDSN.</p>
          </div>
        </div>
      </div>

      {/* 2. What Happens When Capacity Is Reached? */}
      <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                What Happens When Capacity Is Reached?
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Clear, transparent operational guarantees. AIXSHOP strictly will not silently create additional billable capacity.
            </p>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            No Surprise Invoicing
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleCapacityPolicyTiers.map((tier) => (
            <div key={tier.id} className="p-4 rounded-xl bg-[#0A101C] border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-white tracking-tight">{tier.title}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tier.badgeColor}`}>
                    {tier.threshold}
                  </span>
                </div>
                
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {tier.behavior}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-200 block mb-0.5">Policy Action:</strong>
                {tier.actionRequired}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Commercial Trust Panel: Billing Principles */}
      <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Billing Principles & Commercial Trust Contract
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Our non-negotiable architectural commitments for billing transparency and predictability.
            </p>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Auditable Guarantees
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleBillingPrinciples.map((prin) => {
            const Icon = iconMap[prin.iconName] || ShieldCheck;

            return (
              <div key={prin.id} className="p-4 rounded-xl bg-[#0A101C] border border-slate-800 hover:border-slate-750 transition-colors">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white tracking-tight">{prin.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prin.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
