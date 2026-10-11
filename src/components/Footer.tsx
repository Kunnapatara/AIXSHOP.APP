import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-stone-200/80 py-12 text-stone-500 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-200">
          
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-wider text-stone-900">AIXSHOP.APP</span>
            </div>
            <p className="text-stone-500 text-xs max-w-md leading-relaxed">
              AI Commerce Visibility & Product Intelligence Infrastructure. Connecting merchant catalogs to modern search, AI agents, and commerce discovery surfaces.
            </p>
          </div>

          {/* Quick Anchor Navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600 font-medium">
            <a href="#value-chain" className="hover:text-orange-600 transition-colors">
              Value Chain
            </a>
            <a href="#pricing" className="hover:text-orange-600 transition-colors">
              Catalog Pricing
            </a>
            <a href="#preview" className="hover:text-orange-600 transition-colors">
              Product Intelligence
            </a>
            <a href="#how-it-works" className="hover:text-orange-600 transition-colors">
              How It Works
            </a>
            <a href="#principles" className="hover:text-orange-600 transition-colors">
              Trust & Principles
            </a>
            <a href="#merchants" className="hover:text-orange-600 transition-colors">
              For Merchants
            </a>
          </div>
        </div>

        {/* Bottom Ethics & Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Built on strict evidence architecture: Observed · Derived · Verified · Missing · Conflict</span>
          </div>
          <div className="font-mono text-stone-400">
            One Product. Every Discovery Surface.
          </div>
        </div>
      </div>
    </footer>
  );
};
