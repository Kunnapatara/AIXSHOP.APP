import React from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  ExternalLink,
  Info 
} from 'lucide-react';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0B121E] border border-cyan-500/40 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#080D16] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white tracking-wide">
              Payment Provider Connection
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Production Boundary:</strong>
              Payment provider connection is not enabled in this preview environment. Production payment-method management will be handled by the connected billing provider (e.g., Stripe Customer Portal).
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-2 text-[11px] text-slate-400">
            <div className="text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
              Security Architecture Separation:
            </div>
            <p>
              AIXSHOP adheres to strict PCI-DSS scope minimization. We never process, inspect, or store raw primary account numbers (PAN) or CVVs on application servers.
            </p>
            <p>
              When production billing is connected, your team will be redirected to an authenticated, encrypted payment portal hosted by the authorized gateway.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#080D16] border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
