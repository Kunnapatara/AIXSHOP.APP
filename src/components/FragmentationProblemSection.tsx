import React from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Bot, 
  Share2, 
  Users, 
  Layers, 
  AlertTriangle, 
  Check, 
  ShieldAlert, 
  Clock, 
  ArrowDown, 
  Cpu
} from 'lucide-react';

export const FragmentationProblemSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 border-t border-stone-200/80 bg-[#FAF8F5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold mb-3">
            <span>The Commerce Reality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            One Real-World Product. Many Fragmented Representations.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Your products do not live in one place. They exist across your direct store, merchant feeds, retail marketplaces, and AI conversational search engines—often displaying conflicting specs, outdated prices, or missing vital data.
          </p>
        </div>

        {/* The Fragmentation Breakdown Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {/* Surface 1: Brand Website */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs relative group hover:border-orange-500 transition-all">
            <div className="flex items-center gap-2.5 mb-3 text-orange-600">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Brand Store</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mb-2">Primary Spec Sheet</p>
            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Full marketing imagery</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Official MSRP: $240</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Missing structured drop/stack</span>
              </li>
            </ul>
          </div>

          {/* Surface 2: Google Shopping */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs relative group hover:border-orange-500 transition-all">
            <div className="flex items-center gap-2.5 mb-3 text-blue-600">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Google Shopping</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mb-2">Merchant Feed</p>
            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>GTIN identifier verified</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-700">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Promotion lag (24h delay)</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Missing return policy schema</span>
              </li>
            </ul>
          </div>

          {/* Surface 3: Marketplaces */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs relative group hover:border-orange-500 transition-all">
            <div className="flex items-center gap-2.5 mb-3 text-amber-600">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Marketplaces</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mb-2">3rd Party Sellers</p>
            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Discount offer: $199</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-700">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Conflicting material claim</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Unverified final sale terms</span>
              </li>
            </ul>
          </div>

          {/* Surface 4: AI Engines */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs relative group hover:border-orange-500 transition-all">
            <div className="flex items-center gap-2.5 mb-3 text-purple-600">
              <Bot className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">AI Search & Chat</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mb-2">AI Answer Models</p>
            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Answers weight & carbon plate</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Cannot answer "flat feet"</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-700">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Cites outdated 2024 review</span>
              </li>
            </ul>
          </div>

          {/* Surface 5: The Shopper */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs relative group hover:border-orange-500 transition-all">
            <div className="flex items-center gap-2.5 mb-3 text-emerald-600">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">The Shopper</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mb-2">Buying Decision</p>
            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-1.5 text-stone-700">
                <span>"Which seller has stock?"</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-700">
                <span>"Is $199 the real price?"</span>
              </li>
              <li className="flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Uncertainty causes drop-off</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Transition indicator */}
        <div className="flex justify-center my-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200 text-orange-800 text-xs font-semibold shadow-xs">
            <ArrowDown className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
            <span>Harmonized through AIXSHOP Intelligence Layer</span>
          </div>
        </div>

        {/* AIXSHOP Intelligence Solution Layer */}
        <div className="rounded-3xl bg-white border border-stone-200/80 p-6 sm:p-8 relative overflow-hidden shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  AIXSHOP Canonical Intelligence Engine
                </h3>
                <p className="text-xs text-stone-500">
                  Conceptually sits between raw multi-channel data and modern commerce discovery
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
              Status: <span className="text-emerald-700 font-semibold">Continuous Sentinel</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-mono text-orange-700 font-bold block mb-1">01. IDENTITY RESOLUTION</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1.5">Canonical Product Model</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Connects MPNs, GTINs, and disparate listing URLs into a singular verified real-world item identity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-mono text-orange-700 font-bold block mb-1">02. PRODUCT ≠ OFFER</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1.5">Separate Offer Matrix</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Separates the physical item's intrinsic specifications from individual sellers' volatile prices and terms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-mono text-orange-700 font-bold block mb-1">03. EVIDENCE PROVENANCE</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1.5">Auditable Fact States</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Classifies every attribute as Observed, Derived, Verified, Missing, or Conflicting. Zero AI hallucination.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xs font-mono text-orange-700 font-bold block mb-1">04. DISCOVERY SENTINEL</span>
              <h4 className="text-sm font-bold text-stone-900 mb-1.5">Continuous Monitoring</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Detects schema breaks, price divergence, and answering gaps across search and AI systems over time.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-400">
            <span>* Conceptual architecture representation. No live platform scraping claims implied.</span>
            <span className="font-mono text-stone-500">One Product. Every Discovery Surface.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
