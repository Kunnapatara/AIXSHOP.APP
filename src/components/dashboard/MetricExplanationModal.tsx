import React from 'react';
import { X, Info, ShieldAlert } from 'lucide-react';

export interface MetricExplanation {
  title: string;
  value: string | number;
  subtitle: string;
  whatItMeans: string;
  whatItIsNot: string;
  methodology: string;
}

interface MetricExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: MetricExplanation | null;
}

export const MetricExplanationModal: React.FC<MetricExplanationModalProps> = ({
  isOpen,
  onClose,
  metric
}) => {
  if (!isOpen || !metric) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 p-6 text-slate-100 relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">{metric.title}</span>
              <span className="text-sm font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-semibold">
                {metric.value}
              </span>
            </div>
            <p className="text-xs text-slate-400">{metric.subtitle}</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-300 mb-6">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider block font-mono">What It Measures</span>
            <p className="leading-relaxed text-slate-300">{metric.whatItMeans}</p>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
            <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block font-mono">What It Does NOT Mean</span>
            <p className="leading-relaxed text-rose-200/90">{metric.whatItIsNot}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block font-mono">Calculation Methodology</span>
            <p className="leading-relaxed text-slate-400">{metric.methodology}</p>
          </div>
        </div>

        <div className="flex items-center justify-end pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
