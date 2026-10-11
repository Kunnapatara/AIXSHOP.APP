import React from 'react';
import { 
  Link2, 
  SearchCode, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Lock,
  Zap
} from 'lucide-react';

interface MerchantWorkflowSectionProps {
  onAnalyzeClick: () => void;
}

export const MerchantWorkflowSection: React.FC<MerchantWorkflowSectionProps> = ({ onAnalyzeClick }) => {
  const steps = [
    {
      num: '01',
      icon: Link2,
      title: 'Paste One Product URL',
      desc: 'Start with a single SKU. No registration, no credit card, and no complex configuration required to experience value.'
    },
    {
      num: '02',
      icon: SearchCode,
      title: 'Instant Gap & Spec Diagnosis',
      desc: 'AIXSHOP identifies missing GTINs, untracked attributes, broken schemas, conflicting specifications, and buyer intent gaps.'
    },
    {
      num: '03',
      icon: ShieldCheck,
      title: 'AI Extracts · You Verify',
      desc: 'Never fill out endless 100-field forms. The AI extracts and normalizes the product graph first; you only confirm uncertain items.'
    },
    {
      num: '04',
      icon: Activity,
      title: 'Continuous Sentinel & Recovery',
      desc: 'Keep catalogs healthy across Google, AI engines, and marketplaces. Detect price drifts and schema breakage with automated recovery.'
    }
  ];

  return (
    <section id="merchants" className="py-20 bg-[#FAF8F5] border-t border-stone-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-3">
            <span>Built for Modern Ecommerce</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Radical Simplicity for Merchants.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Managing product visibility across dozens of disparate discovery surfaces should not require an enterprise data team.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-orange-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                      STEP {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-stone-400" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Banner */}
        <div className="rounded-3xl bg-white border border-stone-200/80 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-700">
              <Lock className="w-3.5 h-3.5" />
              <span>Least-Privilege Security Guaranteed</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              You own the sale. AIXSHOP owns the intelligence.
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              We never take custody of payments, interfere with checkouts, or touch customer data. We simply make sure your products are accurately understood and discovered by every buyer and AI agent.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={onAnalyzeClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Analyze Your First Product</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
