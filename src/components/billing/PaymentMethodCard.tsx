import React from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  AlertCircle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { CurrentSubscriptionState } from '../../types/billing';

interface PaymentMethodCardProps {
  subscription: CurrentSubscriptionState;
  onUpdatePaymentMethod: () => void;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  subscription,
  onUpdatePaymentMethod
}) => {
  const { paymentMethod } = subscription;

  return (
    <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Payment Method & Merchant Billing Entity
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Payment instrument and commercial billing details on file.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          Representative Payment Method
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card Mockup Visual */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#101A2C] to-[#0A1220] border border-slate-750 flex flex-col justify-between h-44 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                AIXSHOP COMMERCIAL
              </span>
            </div>
            <span className="text-sm font-black italic tracking-widest text-white/90">
              {paymentMethod.brand.toUpperCase()}
            </span>
          </div>

          <div>
            <div className="text-lg font-mono tracking-widest text-slate-200">
              •••• •••• •••• <strong className="text-white">{paymentMethod.last4}</strong>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Cardholder</span>
                <span className="text-slate-200">AeroPulse Athletics Inc.</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Expires</span>
                <span className="text-slate-200">{paymentMethod.expMonth}/{paymentMethod.expYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Entity & Security Box */}
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div className="text-slate-400 text-[11px]">Commercial Entity</div>
              <div className="mt-0.5 font-bold text-white flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                AeroPulse Athletics, Inc.
              </div>
              <div className="mt-1 text-[11px] text-slate-400 font-mono">
                1200 NW Naito Parkway, Portland, OR 97209
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div className="text-slate-400 text-[11px]">Billing Inquiries & Receipts</div>
              <div className="mt-0.5 font-mono text-cyan-300">
                {paymentMethod.billingEmail}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>PCI DSS Level 1 Provider Shielded</span>
            </div>

            <button
              type="button"
              onClick={onUpdatePaymentMethod}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              Update Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
