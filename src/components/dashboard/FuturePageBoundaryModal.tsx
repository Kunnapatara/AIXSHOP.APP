import React from 'react';
import { X, ShieldAlert, ArrowRight, Layers } from 'lucide-react';

interface FuturePageBoundaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPageName?: string;
  scopeSummary?: string;
  suggestedAction?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageId?: string;
  pageName?: string;
  description?: string;
  onNavigateBack?: () => void;
}

export const FuturePageBoundaryModal: React.FC<FuturePageBoundaryModalProps> = ({
  isOpen,
  onClose,
  targetPageName,
  scopeSummary,
  suggestedAction,
  pageTitle,
  pageDescription,
  pageId,
  pageName,
  description,
  onNavigateBack
}) => {
  if (!isOpen) return null;

  const displayName = targetPageName || pageTitle || pageName || 'Future Milestone';
  const displaySummary = scopeSummary || pageDescription || description;


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
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{displayName}</h3>
            <p className="text-xs font-mono text-cyan-400">Future Roadmap Milestone · Scope Boundary</p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Scope Boundary Notice</span>
            </div>
            <p className="text-slate-400">
              You clicked an action routed to <strong>{displayName}</strong>. Under strict phase discipline, pages 01 through 07 are currently active.
            </p>
            {displaySummary && (
              <p className="text-slate-300 pt-1 border-t border-slate-800/80">
                {displaySummary}
              </p>
            )}
            {suggestedAction && (
              <p className="text-cyan-400 font-medium">
                Next step: {suggestedAction}
              </p>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
            <strong>Data Honesty Mandate:</strong> In compliance with AIXSHOP principles, future modules (such as multi-product catalog editors, live webhook monitors, or automated issue recovery) are never simulated as functional until formally constructed.
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Close & Stay on Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
