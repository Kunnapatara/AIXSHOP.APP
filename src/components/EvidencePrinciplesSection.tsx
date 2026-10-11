import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Eye, 
  FileCheck2, 
  AlertOctagon, 
  Clock3 
} from 'lucide-react';

export const EvidencePrinciplesSection: React.FC = () => {
  const principles = [
    {
      icon: Scale,
      title: 'Product ≠ Offer',
      subtitle: 'The item is distinct from the seller',
      description: 'A product has intrinsic properties (materials, dimensions, specifications). An offer is an ephemeral proposition by a specific seller (price, stock, warranty). AIXSHOP never collapses these into a single fabricated price.'
    },
    {
      icon: Eye,
      title: 'Observed ≠ Derived',
      subtitle: 'Raw evidence vs calculated inference',
      description: 'Facts directly extracted from authoritative source microdata are labeled OBSERVED. Machine classifications are labeled DERIVED with explicit confidence scores. We never blur the line.'
    },
    {
      icon: FileCheck2,
      title: 'Delivery ≠ Detection ≠ Visibility',
      subtitle: 'Submitted is not ranked',
      description: 'Submitting a feed (Delivery) is not crawl confirmation (Detection), and detection is not proof of organic citation or ranking (Visibility). AIXSHOP provides diagnostic readiness, never hollow guarantees.'
    },
    {
      icon: AlertOctagon,
      title: 'Missing ≠ Guess · Conflict ≠ Guess',
      subtitle: 'AI must not invent facts',
      description: 'If an ingredient, certification, or warranty is unknown, we display MISSING. If sources conflict (e.g. 320g vs 310g), we display CONFLICT. AIXSHOP empowers the merchant to verify what AI cannot reliably know.'
    },
    {
      icon: Clock3,
      title: 'Price is Time-Dependent',
      subtitle: 'Continuous observation vs static truth',
      description: 'Prices fluctuate hourly with promotions, member coupons, and flash sales. AIXSHOP maintains temporal observation histories rather than treating today’s price as permanent canon.'
    },
    {
      icon: ShieldCheck,
      title: 'Least-Privilege Integration',
      subtitle: 'Product data only. Zero customer PII.',
      description: 'When merchants connect, AIXSHOP reads catalog specifications and inventory only. We strictly never access customer identities, personal orders, or payment gateways.'
    }
  ];

  return (
    <section id="principles" className="py-20 border-t border-stone-200/80 bg-[#FAF8F5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-3">
            <span>Foundational Trust Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Evidence Over Persuasion. Accuracy Over Fluff.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            In commerce, hallucinated specifications or false promises cause chargebacks, platform bans, and lost consumer trust. AIXSHOP is engineered upon strict architectural laws.
          </p>
        </div>

        {/* 6 Grid of Immutable Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-orange-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-orange-700 block mb-3">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-stone-400">
                  <span>LAW 0{idx + 1}</span>
                  <span className="font-semibold text-stone-500">ENFORCED BY ENGINE</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
