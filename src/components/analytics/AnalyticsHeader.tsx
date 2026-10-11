// src/components/analytics/AnalyticsHeader.tsx
import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  HelpCircle, 
  ArrowLeft, 
  Package, 
  ShieldCheck 
} from 'lucide-react';
import { TimeRangeOption } from '../../types/analytics';
import { CANONICAL_PRODUCT_ID } from '../../data/canonicalCatalog';

interface AnalyticsHeaderProps {
  selectedRange: TimeRangeOption;
  onRangeChange: (range: TimeRangeOption) => void;
  selectedProductId: string;
  onProductChange: (productId: string) => void;
  onOpenExport: () => void;
  onOpenDefinitions: () => void;
  onNavigateOverview: () => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  selectedRange,
  onRangeChange,
  selectedProductId,
  onProductChange,
  onOpenExport,
  onOpenDefinitions,
  onNavigateOverview
}) => {
  return (
    <header className="relative w-full border-b border-stone-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Breadcrumb & Truth Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onNavigateOverview}
            className="flex items-center gap-1.5 text-stone-500 hover:text-[#F97316] transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <span className="text-stone-300">/</span>
          <span className="text-[#F97316] font-bold">Analytics & Performance</span>
        </div>

        {/* Mandatory Data Truth Banner */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-mono text-[#F97316]">
          <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
          <span className="font-bold">Analytics Preview · Representative Data</span>
          <span className="hidden md:inline text-orange-200">|</span>
          <span className="hidden md:inline text-stone-600 font-medium text-[10px]">Zero Unverified Claims Mandate</span>
        </div>
      </div>

      {/* Main Title Bar & Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-stone-900">Analytics</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-stone-100 text-stone-700 border border-stone-200">
                  P13 Workspace
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">
                Measure the quality, coverage, change, and recovery of your product intelligence.
              </p>
            </div>
          </div>

          {/* Contextual Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-50 text-stone-800 border border-stone-200">
              <Package className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="font-semibold text-stone-900">AeroPulse Athletics</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-50 text-stone-600 border border-stone-200 font-mono text-[11px]">
              <span>24 Representative Products</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-50 text-stone-600 border border-stone-200 font-mono text-[11px]">
              <span>68 Variants · 42 Offers</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Diagnostic Truth Model</span>
            </div>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Product Scope Selector */}
          <div className="relative">
            <label htmlFor="product-scope-select" className="sr-only">Product Scope</label>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800">
              <Package className="w-3.5 h-3.5 text-stone-400" />
              <select
                id="product-scope-select"
                value={selectedProductId}
                onChange={(e) => onProductChange(e.target.value)}
                className="bg-transparent text-stone-900 text-xs focus:outline-none cursor-pointer pr-1 font-medium"
              >
                <option value="all">All Products (24 Catalog SKUs)</option>
                <option value={CANONICAL_PRODUCT_ID}>AeroPulse VaporStride Carbon Elite (Primary)</option>
                <option value="prod-aerostride">AeroStride Pulse 2.0</option>
                <option value="prod-stratamesh">StrataMesh Carbon Racer</option>
                <option value="prod-apextrail">ApexTrail Pro GORE-TEX</option>
              </select>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="relative">
            <label htmlFor="time-range-select" className="sr-only">Time Range</label>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800">
              <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
              <select
                id="time-range-select"
                value={selectedRange}
                onChange={(e) => onRangeChange(e.target.value as TimeRangeOption)}
                className="bg-transparent text-stone-900 text-xs focus:outline-none cursor-pointer pr-1 font-medium"
              >
                <option value="representative">Representative Period (Preview)</option>
                <option value="7d">Last 7 Days (Simulated)</option>
                <option value="30d">Last 30 Days (Simulated)</option>
                <option value="90d">Last 90 Days (Simulated)</option>
              </select>
            </div>
          </div>

          {/* Definitions Guide Button */}
          <button
            type="button"
            onClick={onOpenDefinitions}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shadow-3xs"
            title="Open definitions and rules of truth for metrics"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Definitions</span>
          </button>

          {/* Export Preview Button */}
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            title="Export analytical metrics as CSV or JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Preview</span>
          </button>
        </div>
      </div>
    </header>
  );
};
