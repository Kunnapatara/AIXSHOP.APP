import React, { useState } from 'react';
import { 
  sampleCanonicalProduct 
} from '../data/sampleIntelligence';
import { 
  EvidenceState, 
  ProductFact, 
  SellerOffer, 
  BuyerIntentItem 
} from '../types/landing';
import { 
  Shield, 
  Tag, 
  BrainCircuit, 
  Compass, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface ProductIntelligencePreviewProps {
  onNavigateShopper?: () => void;
}

export const ProductIntelligencePreview: React.FC<ProductIntelligencePreviewProps> = ({ onNavigateShopper }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'offers' | 'intent' | 'surfaces'>('specs');
  const [selectedFact, setSelectedFact] = useState<ProductFact>(sampleCanonicalProduct.facts[4]); // default to the conflict example to show evidence power!

  const product = sampleCanonicalProduct;

  const renderStateBadge = (state: EvidenceState) => {
    switch (state) {
      case 'OBSERVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
            <CheckCircle className="w-3 h-3" />
            OBSERVED
          </span>
        );
      case 'DERIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/80">
            <Clock className="w-3 h-3" />
            DERIVED
          </span>
        );
      case 'MERCHANT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
            <Shield className="w-3 h-3" />
            MERCHANT VERIFIED
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <AlertCircle className="w-3 h-3" />
            MISSING
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-rose-950/90 text-rose-400 border border-rose-800/90 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            CONFLICT
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="preview" className="py-20 bg-[#070A10] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Clear Example Labeling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                System Interface Inspection
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Example Data — Preview Mode
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Canonical Product Intelligence Card
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              What AIXSHOP generates when analyzing a product: unified identity, auditable fact evidence, separated seller offers, and intent diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Click any attribute to inspect source evidence</span>
            </div>

            {onNavigateShopper && (
              <button
                type="button"
                onClick={onNavigateShopper}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                <span>Shopper Surface (Page 11)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Master Glass Card Container */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Card Top: Canonical Identity Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Product Info & Visual */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 relative group">
                  <img 
                    src={product.heroImage} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 font-mono px-1 rounded text-slate-400">
                    HERO
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                      {product.brand}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                    <span>CANONICAL: <strong className="text-slate-200">{product.canonicalId}</strong></span>
                    <span>GTIN: <strong className="text-slate-200">{product.gtin}</strong></span>
                    <span>MPN: <strong className="text-slate-200">{product.mpn}</strong></span>
                  </div>
                </div>
              </div>

              {/* Product vs Offer Reality Callout */}
              <div className="lg:border-l lg:border-slate-800 lg:pl-8 flex flex-col justify-center">
                <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>COMMERCIAL STATE (PRODUCT ≠ OFFER)</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400">Lowest Observed Offer:</span>
                  <span className="text-2xl font-black text-white tracking-tight font-mono">
                    ${product.lowestObservedPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>MSRP: <strong className="text-slate-300 font-mono">${product.officialPrice.toFixed(2)}</strong></span>
                  <span>•</span>
                  <span>Available from <strong className="text-cyan-400">{product.totalOffers} verified sellers</strong></span>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Tabs for Product Intelligence Subsystems */}
          <div className="flex items-center overflow-x-auto px-4 sm:px-6 bg-slate-950/60 border-b border-slate-800/80 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'specs' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Specifications & Evidence ({product.facts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('offers')}
              className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'offers' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Seller Offers Matrix ({product.offers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('intent')}
              className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'intent' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Buyer Intent Coverage ({product.intents.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('surfaces')}
              className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'surfaces' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Discovery Signals ({product.surfaces.length})</span>
            </button>
          </div>

          {/* Tab 1: Dynamic Category Specifications & Auditable Evidence */}
          {activeTab === 'specs' && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Attribute List */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2">
                  <span>DYNAMIC CATEGORY ATTRIBUTE</span>
                  <span>EVIDENCE STATE</span>
                </div>

                {product.facts.map((fact) => (
                  <div
                    key={fact.id}
                    onClick={() => setSelectedFact(fact)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedFact.id === fact.id 
                        ? 'bg-slate-800/90 border-cyan-500/80 shadow-md shadow-cyan-500/10' 
                        : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                          {fact.category}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm font-bold text-white truncate">
                          {fact.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 truncate font-mono">
                        {fact.value}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {renderStateBadge(fact.state)}
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${selectedFact.id === fact.id ? 'rotate-90 text-cyan-400' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Evidence Inspector Side Panel */}
              <div className="lg:col-span-5 bg-slate-950/90 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                        Fact Provenance & Audit
                      </span>
                    </div>
                    {renderStateBadge(selectedFact.state)}
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-mono block mb-1">FACT SPECIFICATION</span>
                      <p className="text-sm font-bold text-white">{selectedFact.name}</p>
                      <p className="text-cyan-300 font-mono mt-0.5 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800">
                        {selectedFact.value}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-mono block mb-1">EVIDENCE SOURCE</span>
                      <p className="text-slate-200 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                        {selectedFact.source}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-400 font-mono block mb-1">DETECTED AT</span>
                        <p className="text-slate-300 font-mono">{selectedFact.detectedAt}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-mono block mb-1">CONFIDENCE</span>
                        <p className="text-slate-300 font-mono font-bold">
                          {selectedFact.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* Conflict specific disclosure */}
                    {selectedFact.state === 'CONFLICT' && selectedFact.conflictDetails && (
                      <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/80 space-y-2">
                        <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Unresolved Source Conflict
                        </span>
                        <div className="text-[11px] space-y-1">
                          <p className="text-slate-300">
                            <strong>{selectedFact.conflictDetails.sourceA.name}:</strong> "{selectedFact.conflictDetails.sourceA.value}"
                          </p>
                          <p className="text-slate-300">
                            <strong>{selectedFact.conflictDetails.sourceB.name}:</strong> "{selectedFact.conflictDetails.sourceB.value}"
                          </p>
                        </div>
                        <p className="text-[10px] text-rose-300 italic pt-1 border-t border-rose-900/60">
                          * AIXSHOP never silences conflicts by guessing. Merchant verification is required to update to Merchant Verified.
                        </p>
                      </div>
                    )}

                    {selectedFact.note && (
                      <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800 text-slate-400 italic">
                        "{selectedFact.note}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>AIXSHOP Rule #8</span>
                  <span>AI must not invent facts</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Distinct Seller Offers Matrix (Product ≠ Offer) */}
          {activeTab === 'offers' && (
            <div className="p-6">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 mb-6 flex items-start gap-3 text-xs text-cyan-200 leading-relaxed">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Core Architectural Law: Product ≠ Offer</strong>
                  The product is the item itself. Each offer is an ephemeral observation from an individual seller. The system never overwrites canonical product data with a retailer's localized price.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.offers.map((offer) => (
                  <div 
                    key={offer.id} 
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      offer.isOfficial 
                        ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg' 
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          offer.isOfficial ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {offer.sellerType}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {offer.detectedAt}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mb-2">
                        {offer.sellerName}
                      </h4>

                      <div className="mb-4">
                        <div className="text-2xl font-black text-white font-mono">
                          ${offer.price.toFixed(2)}{' '}
                          <span className="text-xs text-slate-400 font-normal font-sans">
                            {offer.currency}
                          </span>
                        </div>
                        <span className="inline-block mt-1 text-xs font-medium text-emerald-400">
                          {offer.availability}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300 py-3 border-t border-slate-800/80">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Shipping:</span>
                          <span className="font-medium text-slate-200">{offer.shipping}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Returns:</span>
                          <span className="font-medium text-slate-200">{offer.returnPolicy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Merchant Destination:</span>
                      <span className="text-cyan-400 font-mono text-xs flex items-center gap-1 hover:underline">
                        Store Link <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Buyer Intent Coverage Engine */}
          {activeTab === 'intent' && (
            <div className="p-6">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Buyer Intent Coverage Analysis
                  </h4>
                  <p className="text-xs text-slate-400">
                    Evaluating how thoroughly the product's structured intelligence answers genuine shopper purchasing queries.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                  <span className="text-slate-400">Intent Coverage:</span>
                  <span className="text-emerald-400 font-bold">4 of 6 Supported (66.7%)</span>
                </div>
              </div>

              <div className="space-y-3">
                {product.intents.map((intent) => (
                  <div 
                    key={intent.id}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {intent.archetype} Intent
                        </span>
                        <span className="text-sm font-semibold text-white font-mono">
                          "{intent.query}"
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {intent.diagnosticNote}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      {intent.isSupported ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Supported
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/80 text-rose-400 border border-rose-800 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Missing Attribute
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Discovery Surface Readiness Signals */}
          {activeTab === 'surfaces' && (
            <div className="p-6">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono mb-2">
                  <span>Diagnostic Signals Only · Not a Ranking Guarantee</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Cross-Surface Machine Readability & Completeness
                </h4>
                <p className="text-xs text-slate-400">
                  AIXSHOP enforces: Delivery ≠ Detection ≠ Visibility. These signals indicate whether your data can be cleanly ingested and parsed by discovery endpoints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.surfaces.map((surf) => (
                  <div key={surf.surfaceId} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">
                        {surf.name}
                      </span>
                      <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                        surf.readinessStatus === 'Ready' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                          : surf.readinessStatus === 'Gaps Detected'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {surf.readinessStatus}
                      </span>
                    </div>

                    <div className="my-3">
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>Schema Completeness</span>
                        <span>{surf.completenessPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            surf.completenessPercentage > 80 ? 'bg-cyan-400' : surf.completenessPercentage > 70 ? 'bg-amber-400' : 'bg-rose-400'
                          }`}
                          style={{ width: `${surf.completenessPercentage}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded border border-slate-800/80">
                      {surf.diagnosticFinding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer note in the preview card */}
          <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Continuous Sentinel active: tracking price, schema, and stock changes.</span>
            </div>
            <span className="font-mono text-slate-500">Evidence Provenance: 100% Traceable</span>
          </div>

        </div>
      </div>
    </section>
  );
};
