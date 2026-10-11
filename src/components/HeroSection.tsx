import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Layers, 
  Tag, 
  BrainCircuit, 
  Compass, 
  CheckCircle2, 
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

interface HeroSectionProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onStartAnalysis: (url: string) => void;
  onNavigateDashboard?: () => void;
  onNavigateReport?: () => void;
  onNavigatePricing?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  inputRef, 
  onStartAnalysis,
  onNavigateDashboard,
  onNavigateReport,
  onNavigatePricing 
}) => {
  const [url, setUrl] = useState('https://shop.aeropulse.com/products/vaporstride-carbon-elite');

  const sampleUrls = [
    { label: 'AeroPulse VaporStride', url: 'https://shop.aeropulse.com/products/vaporstride-carbon-elite' },
    { label: 'Nike Road Racing', url: 'https://nike.com/t/air-max-x-road-racing-mens-shoes' },
    { label: 'Lumina Barrier Cream', url: 'https://lumina-skincare.co/products/hydra-barrier-cream-50ml' }
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onStartAnalysis(url.trim());
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Editorial Domain Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 bg-orange-50/90 border border-orange-200/80 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span>Product Catalog Intelligence & AI Commerce Readiness</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.12] text-balance">
          Make your product catalog ready for AI commerce.
        </h1>

        {/* Plain Language Supporting Sentence */}
        <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed text-balance">
          AIXSHOP helps merchants understand what AI commerce systems can understand about their products — and shows them exactly what needs to be fixed.
        </p>

        {/* Supporting Context Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Audit canonical attributes & barcodes</span>
          </div>
          <span className="hidden sm:inline text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Reconcile conflicting seller prices</span>
          </div>
          <span className="hidden sm:inline text-stone-300">·</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Generate verified AI discovery feeds</span>
          </div>
        </div>

        {/* Primary URL Input Form — "Paste a product URL. See what the world sees." */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="text-left mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700">
              Paste a product URL. See what the world sees.
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              Instant diagnostic analysis
            </span>
          </div>

          <form 
            onSubmit={handleAnalyze}
            className="relative flex flex-col sm:flex-row items-stretch p-2 rounded-2xl bg-white border border-stone-200/90 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all gap-2"
          >
            <div className="relative flex-1 flex items-center pl-3">
              <Search className="w-5 h-5 text-stone-400 ml-1 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/products/product-name"
                className="w-full bg-transparent px-3.5 py-3 text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none font-mono"
              />
              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="p-1 text-stone-400 hover:text-stone-600 mr-2 cursor-pointer"
                  aria-label="Clear URL"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!url.trim()}
              className="inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-sm sm:text-base shadow-xs active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              <span>Analyze Product</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          {/* Quick sample URLs */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
            <span className="text-stone-400">Try sample catalog SKU:</span>
            {sampleUrls.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(sample.url)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 transition-colors text-[11px] font-medium cursor-pointer shadow-2xs"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Free Tier + Console */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onNavigatePricing && (
            <button
              type="button"
              onClick={onNavigatePricing}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
            >
              Start Free (10 Products)
            </button>
          )}

          {onNavigateDashboard && (
            <button
              type="button"
              onClick={onNavigateDashboard}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-xs sm:text-sm border border-stone-200 transition-all cursor-pointer shadow-2xs"
            >
              Open Merchant Console
            </button>
          )}

          <a
            href="#value-chain"
            className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-semibold text-xs sm:text-sm transition-colors"
          >
            Explore 9-Stage Value Chain ↓
          </a>
        </div>

        {/* 6 Capabilities Cards */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1.5">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">1. Identity</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Canonical GTIN, MPN, brand & model</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">2. Specs</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Structured category attributes</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1.5">
                <Tag className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">3. Offers</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Product ≠ Offer: prices by seller</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1.5">
                <BrainCircuit className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">4. Intent</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">7 purchasing query archetypes</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1.5">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">5. Readiness</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Google & AI feed acceptance</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">6. Evidence</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Zero hallucinated specifications</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
