// src/components/analytics/OffersAndMonitoringSection.tsx
import React from 'react';
import { 
  DollarSign, 
  Activity, 
  ArrowRight, 
  Info
} from 'lucide-react';
import { 
  OfferAnalyticsSummary, 
  MonitoringCategoryItem 
} from '../../types/analytics';

interface OffersAndMonitoringSectionProps {
  offers: OfferAnalyticsSummary;
  monitoringCategories: MonitoringCategoryItem[];
  onNavigateOffers: () => void;
  onNavigateMonitoring: () => void;
}

export const OffersAndMonitoringSection: React.FC<OffersAndMonitoringSectionProps> = ({
  offers,
  monitoringCategories,
  onNavigateOffers,
  onNavigateMonitoring
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Offer Intelligence & Product ≠ Offer Separation */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Offer Intelligence Performance</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Multi-seller commercial dispersion and offer integrity tracking.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateOffers}
            className="text-xs text-[#F97316] hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Offers Workspace</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mandatory Architectural Boundary: Product ≠ Offer */}
        <div className="my-4 p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 text-xs">
          <div className="flex items-center justify-between font-mono font-bold text-[#F97316] text-xs mb-1.5">
            <span>STRICT BOUNDARY: Product ≠ Offer</span>
            <span>24 Products vs 42 Offers</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
              <span className="font-bold text-stone-900 block">Product Canonical Base:</span>
              <span>24 catalog products · 68 physical variants</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
              <span className="font-bold text-stone-900 block">Commercial Offers:</span>
              <span>42 observed seller listings across 18 products</span>
            </div>
          </div>
          <p className="text-[10px] text-stone-600 mt-2">
            A single shoe model (Product) is sold by 5 distinct retailers (Offers) under independent prices, tax policies, and return conditions. Datasets remain strictly decoupled.
          </p>
        </div>

        {/* Offer Diagnostic Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[11px] text-stone-500 font-medium">Observed Offers</div>
            <div className="text-xl font-black font-mono text-stone-900 mt-0.5">{offers.observedOffersCount}</div>
            <div className="text-[10px] text-stone-400 mt-0.5">{offers.distinctSellersCount} distinct sellers</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[11px] text-stone-500 font-medium">Products with Offers</div>
            <div className="text-xl font-black font-mono text-[#F97316] mt-0.5">{offers.productsWithOffersCount} / 24</div>
            <div className="text-[10px] text-stone-400 mt-0.5">75% catalog coverage</div>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
            <div className="text-[11px] text-rose-700 font-bold">Price Conflicts</div>
            <div className="text-xl font-black font-mono text-rose-900 mt-0.5">{offers.priceConflictsCount}</div>
            <div className="text-[10px] text-rose-600 mt-0.5">Seller discrepancies</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-[11px] text-amber-800 font-bold">Availability Conflicts</div>
            <div className="text-xl font-black font-mono text-amber-900 mt-0.5">{offers.availabilityConflictsCount}</div>
            <div className="text-[10px] text-amber-700 mt-0.5">Stock collisions</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
            <div className="text-[11px] text-stone-500 font-medium">Missing Offer Evidence</div>
            <div className="text-xl font-black font-mono text-amber-700 mt-0.5">{offers.missingOfferEvidenceCount}</div>
            <div className="text-[10px] text-stone-400 mt-0.5">Shipping/tax ungrounded</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-bold">Active Promotions</div>
            <div className="text-xl font-black font-mono text-emerald-900 mt-0.5">{offers.promotionsDetectedCount}</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Verified discount claims</div>
          </div>
        </div>

        {/* Pricing Range Snapshot */}
        <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium">Catalog Price Dispersion:</span>
          <div className="flex items-center gap-3 font-mono">
            <span className="text-stone-700">Low: ${offers.lowestPriceUsd.toFixed(2)}</span>
            <span className="text-stone-300">|</span>
            <span className="text-[#F97316] font-bold">Median: ${offers.medianPriceUsd.toFixed(2)}</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-700">High: ${offers.highestPriceUsd.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Monitoring Activity Analytics */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">Monitoring Activity Distribution</h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Breakdown of 12 detected catalog changes.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateMonitoring}
            className="text-xs text-[#F97316] hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Continuous Monitoring</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Notice on Monitoring Scope */}
        <div className="my-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold text-stone-900">Product Intelligence Monitoring: </span>
            This workspace monitors structural schema integrity, GTIN stability, and evidence drift. It does not monitor website traffic, HTTP page views, or marketing bounce rates.
          </div>
        </div>

        {/* Monitoring Categories List */}
        <div className="space-y-2.5">
          {monitoringCategories.map((cat) => (
            <div 
              key={cat.category}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-stone-900">{cat.label}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">{cat.description}</div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black font-mono text-[#F97316]">{cat.count}</span>
                <span className="text-[10px] text-stone-400 block font-mono">Events</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Monitoring Context Callout */}
        <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500">Total Monitored Changes:</span>
          <span className="font-mono font-black text-stone-900 text-sm">12 Events (4 High-Priority)</span>
        </div>
      </div>
    </div>
  );
};
