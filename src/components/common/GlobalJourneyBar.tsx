import React from 'react';
import { Layers, ShoppingBag, Store, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export type UserJourney = 'shopper' | 'merchant' | 'admin' | 'landing';

interface GlobalJourneyBarProps {
  currentJourney: UserJourney;
  onSelectJourney: (journey: UserJourney) => void;
  onNavigateLanding?: () => void;
  onNavigatePricing?: () => void;
}

export const GlobalJourneyBar: React.FC<GlobalJourneyBarProps> = ({
  currentJourney,
  onSelectJourney,
  onNavigateLanding,
  onNavigatePricing
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single Text Element Wordmark */}
          <button
            type="button"
            onClick={onNavigateLanding || (() => onSelectJourney('landing'))}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-stone-900 font-sans group-hover:text-orange-600 transition-colors">
              AIXSHOP
            </span>
          </button>

          {/* Zone 2: Clean Navigation Links & Journey Switcher */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 p-1 rounded-2xl border border-stone-200/80 shadow-2xs">
            {/* Landing / Overview */}
            <button
              type="button"
              onClick={onNavigateLanding || (() => onSelectJourney('landing'))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                currentJourney === 'landing'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              Platform
            </button>

            {/* Shopper */}
            <button
              type="button"
              onClick={() => onSelectJourney('shopper')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                currentJourney === 'shopper'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shopper</span>
            </button>

            {/* Merchant */}
            <button
              type="button"
              onClick={() => onSelectJourney('merchant')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                currentJourney === 'merchant'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Merchant Console</span>
            </button>

            {/* Admin */}
            <button
              type="button"
              onClick={() => onSelectJourney('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                currentJourney === 'admin'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Tower</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2.5">
            {currentJourney === 'landing' ? (
              <>
                <a
                  href="#pricing"
                  className="hidden sm:inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  Pricing
                </a>
                <button
                  type="button"
                  onClick={() => onSelectJourney('merchant')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  Start Free (10 SKUs)
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onNavigateLanding || (() => onSelectJourney('landing'))}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer border border-stone-200"
              >
                Docs & Pricing
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
