import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Database, 
  Lock,
  Layers,
  Store
} from 'lucide-react';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

interface QuickStoreCheckSectionProps {
  url: string;
  onContinueToAudit: () => void;
  onNavigateHome: () => void;
  onReset: () => void;
}

export const QuickStoreCheckSection: React.FC<QuickStoreCheckSectionProps> = ({
  url,
  onContinueToAudit,
  onNavigateHome,
  onReset
}) => {
  // Extract domain safely
  let displayDomain: string = CANONICAL_MERCHANT.domain;
  try {
    if (url) {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      displayDomain = parsed.hostname;
    }
  } catch {
    displayDomain = CANONICAL_MERCHANT.domain;
  }

  return (
    <div id="quick-store-check" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md space-y-6">
        
        {/* 1. Header with Honest Provenance Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-orange-600" />
                <span>Quick Store Check</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
                Preview Mode · Deterministic Diagnostic
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Diagnostic Analysis: {displayDomain}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-mono break-all">
              {url || `https://${CANONICAL_MERCHANT.domain}`}
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Check Another Store</span>
          </button>
        </div>

        {/* 2. Honest Truth Boundary Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
          <Lock className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-bold">Honest Environment Notice:</span>
            <p className="text-amber-800/90 text-[11px]">
              No external credentials or third-party web crawlers are executed in preview mode. Results below represent canonical baseline diagnostic rules calibrated against verified catalog fixtures.
            </p>
          </div>
        </div>

        {/* 3. Diagnostic Scorecard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Catalog Data Readiness
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-stone-900">
                {CANONICAL_SYSTEM_KPIS.discoveryReadinessPct}%
              </span>
              <span className="text-xs text-stone-400 font-medium">baseline</span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1 leading-snug">
              Structured product clarity required before AI answer engines can accurately cite products.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              Attention Items Found
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-900">8</span>
              <span className="text-xs text-rose-700 font-medium">issues detected</span>
            </div>
            <p className="text-[11px] text-rose-700 pt-1 leading-snug">
              3 high-priority specs missing, 3 price discrepancies, and 2 return policy gaps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Catalog Products
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-900">
                {CANONICAL_SYSTEM_KPIS.totalCatalogProducts}
              </span>
              <span className="text-xs text-emerald-700 font-medium">SKUs cataloged</span>
            </div>
            <p className="text-[11px] text-emerald-700 pt-1 leading-snug">
              Canonical product model separated from seller commercial offers.
            </p>
          </div>
        </div>

        {/* 4. Action Gateway */}
        <div className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base sm:text-lg text-white">
              Ready to resolve catalog discrepancies?
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              Open the full store audit to inspect evidence provenance, approve AI-recommended attribute fixes, and sync with your channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onContinueToAudit}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-98"
            >
              <span>Full Store Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Merchant Console Home</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
