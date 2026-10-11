import React from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  FileQuestion,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { PriorityActionItem } from '../../types/dashboard';

interface PriorityActionCenterProps {
  actions: PriorityActionItem[];
  onTriggerAction: (action: PriorityActionItem) => void;
}

export const PriorityActionCenter: React.FC<PriorityActionCenterProps> = ({
  actions,
  onTriggerAction
}) => {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-[#111C2E] via-[#0E1624] to-[#0A0F1A] border border-cyan-500/30 p-5 sm:p-6 shadow-xl shadow-cyan-950/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80 mb-5 relative">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Priority Actions
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30 font-semibold">
              Operational Queue
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Resolve the highest-impact intelligence gaps first. Prioritized by buyer journey friction and evidence confidence.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-rose-400 font-bold">4 High-Impact Items</span>
          <span className="text-slate-600">·</span>
          <span>Sorted by Epistemic Risk</span>
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-3.5 relative">
        {actions.map((item) => {
          const isCritical = item.severity === 'Critical';
          const isHigh = item.severity === 'High';

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                isCritical
                  ? 'bg-rose-950/15 border-rose-500/30 hover:border-rose-500/50'
                  : isHigh
                  ? 'bg-amber-950/15 border-amber-500/30 hover:border-amber-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left block: order, title, severity & tags */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700/80">
                      {item.orderNumber}
                    </span>

                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : isHigh
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      {item.severity}
                    </span>

                    <span className="text-xs font-semibold text-white tracking-wide">
                      {item.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-mono uppercase block">Why It Matters</span>
                      <p className="text-slate-300 leading-relaxed">{item.whyItMatters}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-0.5">
                      <span className="text-[10px] text-cyan-400 font-mono uppercase block">Recommended Next Step</span>
                      <p className="text-slate-200 font-medium leading-relaxed">{item.recommendedStep}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1 font-mono">
                    <div>
                      <span className="text-slate-500">Affected Dimension: </span>
                      <span className="text-slate-200 font-medium">{item.affectedDimension}</span>
                    </div>
                    <span className="text-slate-700">|</span>
                    <div>
                      <span className="text-slate-500">Impact Archetype: </span>
                      <span className="text-amber-300 font-medium">{item.impactArchetypes}</span>
                    </div>
                    <span className="text-slate-700">|</span>
                    <div>
                      <span className="text-slate-500">Products: </span>
                      <span className="text-white font-bold">{item.count} SKUs</span>
                    </div>
                  </div>
                </div>

                {/* Right button action */}
                <div className="flex flex-col sm:flex-row md:flex-col items-end justify-center shrink-0 pt-2 md:pt-0 gap-2">
                  <button
                    type="button"
                    onClick={() => onTriggerAction(item)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap ${
                      isCritical
                        ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 font-black shadow-rose-500/20'
                        : isHigh
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-amber-500/20'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-cyan-500/20'
                    }`}
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] font-mono text-slate-400">
                    Routes to {item.targetFuturePage}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
