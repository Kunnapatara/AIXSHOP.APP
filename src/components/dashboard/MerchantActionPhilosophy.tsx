import React from 'react';
import { Scale, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const MerchantActionPhilosophy: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0D1525] to-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 relative overflow-hidden shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
              Merchant Action Philosophy
            </span>
            <p className="text-white font-bold text-sm sm:text-base">
              Fix what matters first.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
              AIXSHOP prioritizes unresolved product intelligence according to buyer impact, evidence quality, and remediation confidence — not simply the count of empty form fields.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-slate-400 text-xs font-mono shrink-0 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Epistemic Integrity Over Vanity Completeness</span>
        </div>
      </div>
    </div>
  );
};
