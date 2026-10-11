import React, { useState } from 'react';
import { 
  GitCompare, 
  DollarSign, 
  ArrowRight, 
  Info, 
  Clock, 
  Tag, 
  Building2,
  ChevronRight,
  ShieldCheck,
  Eye,
  AlertCircle
} from 'lucide-react';
import { ProductOfferGroup, CommercialOffer } from '../../types/offers';

interface PriceComparisonSectionProps {
  productGroups: ProductOfferGroup[];
  onSelectOffer: (offer: CommercialOffer) => void;
}

export const PriceComparisonSection: React.FC<PriceComparisonSectionProps> = ({
  productGroups,
  onSelectOffer
}) => {
  // Select first product with multiple offers by default
  const groupsWithMultipleOffers = productGroups.filter(g => g.offers.length > 1);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    groupsWithMultipleOffers[0]?.productId || productGroups[0]?.productId || ''
  );

  const currentGroup = productGroups.find(g => g.productId === selectedProductId) || groupsWithMultipleOffers[0];

  if (!currentGroup) return null;

  const minPrice = currentGroup.lowestPrice || 0;
  const maxPrice = currentGroup.highestPrice || 0;
  const spread = currentGroup.spread || 0;
  const priceRange = maxPrice - minPrice || 1;

  return (
    <div className="w-full bg-[#FAF8F5] border-b border-stone-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316]">
                <GitCompare className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                Product-Level Price Comparison & Offer Dispersion
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
              Inspect how commercial offers diverge for identical catalog items. Multiple sellers may offer the same canonical product under distinct conditions, channels, and prices.
            </p>
          </div>

          {/* Product Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-stone-500 shrink-0 font-medium">Select Product:</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="px-4 py-2 rounded-full bg-white border border-stone-200 text-xs text-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/40 shadow-2xs"
            >
              {groupsWithMultipleOffers.map((group) => (
                <option key={group.productId} value={group.productId}>
                  {group.productName} ({group.offers.length} offers · ${group.lowestPrice} - ${group.highestPrice})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Product Overview Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div>
              <div className="text-xs font-mono text-[#F97316] font-semibold uppercase tracking-wider">
                {currentGroup.brand} · {currentGroup.category}
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                {currentGroup.productName}
              </h3>
              <div className="text-xs font-mono text-stone-500 mt-0.5">
                GTIN: {currentGroup.gtin} · {currentGroup.offers.length} Observed Commercial Offers
              </div>
            </div>

            {/* Dispersion Stats Block */}
            <div className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <div className="text-[10px] uppercase font-mono text-stone-400 font-medium">Lowest Observed</div>
                <div className="text-base font-bold text-emerald-600 font-mono">
                  ${minPrice.toFixed(2)}
                </div>
              </div>
              <div className="text-stone-300 font-mono text-xs">→</div>
              <div>
                <div className="text-[10px] uppercase font-mono text-stone-400 font-medium">Highest Observed</div>
                <div className="text-base font-bold text-stone-800 font-mono">
                  ${maxPrice.toFixed(2)}
                </div>
              </div>
              <div className="pl-3 border-l border-stone-200">
                <div className="text-[10px] uppercase font-mono text-amber-600 font-medium">Observed Spread</div>
                <div className="text-base font-bold text-amber-600 font-mono">
                  ${spread.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Section 14: Visual Dispersion Scale */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-600 font-semibold">OBSERVED OFFER DISPERSION SPECTRUM</span>
              <span className="text-[10px] text-stone-400">
                Derived from observed offers · Preview data
              </span>
            </div>

            {/* Visual Bar Track */}
            <div className="relative h-14 bg-stone-50 rounded-2xl border border-stone-200 p-2 flex items-center shadow-2xs">
              {/* Range background strip */}
              <div className="absolute left-6 right-6 h-2.5 bg-gradient-to-r from-emerald-400 via-orange-300 to-amber-400 rounded-full opacity-70"></div>

              {/* Offer Pins */}
              {currentGroup.offers.map((offer) => {
                const price = offer.offerPrice ?? minPrice;
                const percentage = priceRange > 0 
                  ? Math.max(5, Math.min(95, ((price - minPrice) / priceRange) * 85 + 7))
                  : 50;

                return (
                  <button
                    key={offer.id}
                    type="button"
                    onClick={() => onSelectOffer(offer)}
                    style={{ left: `${percentage}%` }}
                    className="absolute -translate-x-1/2 flex flex-col items-center group cursor-pointer transition-all hover:z-20"
                  >
                    <div className="px-2.5 py-0.5 rounded-full bg-stone-900 text-[10px] font-mono font-bold text-white shadow-sm group-hover:scale-110 group-hover:bg-[#F97316] transition-all">
                      {offer.offerPrice !== null ? `$${offer.offerPrice.toFixed(2)}` : 'N/A'}
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] border-2 border-white shadow-sm mt-0.5"></div>
                    <span className="text-[9px] font-mono text-stone-500 group-hover:text-stone-900 truncate max-w-[80px] mt-0.5 font-medium">
                      {offer.seller}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-1">
              <span>Min: ${minPrice.toFixed(2)} USD</span>
              <span>Observed Spread: ${spread.toFixed(2)} USD ({minPrice > 0 ? ((spread / minPrice) * 100).toFixed(1) : '0'}% variance)</span>
              <span>Max: ${maxPrice.toFixed(2)} USD</span>
            </div>
          </div>

          {/* Individual Offers Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            {currentGroup.offers.map((offer) => (
              <div
                key={offer.id}
                onClick={() => onSelectOffer(offer)}
                className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 hover:shadow-xs transition-all cursor-pointer space-y-3 group shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900 group-hover:text-[#F97316] transition-colors">
                      {offer.seller}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                      {offer.sellerType}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-base font-extrabold text-stone-900">
                      {offer.offerPrice !== null ? `$${offer.offerPrice.toFixed(2)}` : 'N/A'}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {offer.currency}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                  <span className="text-stone-500">Stock: <strong className="text-emerald-700 font-semibold">{offer.availability}</strong></span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                    {offer.dominantEvidenceState}
                  </span>
                </div>

                {offer.promotion.hasPromotion && (
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span className="truncate">{offer.promotion.type}: ${offer.promotion.promotionalPrice?.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1">
                  <span>Detected: {offer.observedAt}</span>
                  <span className="text-[#F97316] font-semibold group-hover:underline flex items-center gap-0.5">
                    Inspect
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Boundary Footnote */}
          <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-200/70 text-xs text-stone-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-stone-800">Epistemic Scope:</strong> AIXSHOP can only reason about commercial offers for which it possesses empirical evidence. Do not interpret this dispersion as a comprehensive market scan or guaranteed lowest market price.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
