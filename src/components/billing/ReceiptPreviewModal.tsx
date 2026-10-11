import React from 'react';
import { 
  X, 
  Receipt, 
  Building2, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  Copy, 
  Info,
  ShieldCheck,
  Download
} from 'lucide-react';
import { BillingHistoryRecord } from '../../types/billing';

interface ReceiptPreviewModalProps {
  record: BillingHistoryRecord | null;
  onClose: () => void;
}

export const ReceiptPreviewModal: React.FC<ReceiptPreviewModalProps> = ({
  record,
  onClose
}) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0B121E] border border-cyan-500/40 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#080D16] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-white tracking-wide">
              Representative Receipt Preview
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

        {/* Receipt Body */}
        <div className="p-6 space-y-6 text-xs text-slate-300">
          
          {/* Company & Statement Identity */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-5">
            <div>
              <div className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="text-cyan-400">AIXSHOP</span>
                <span className="text-xs font-mono font-normal text-slate-400">Product Intelligence</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                AIXSHOP Technologies, Inc.
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                VAT ID: US-94029412-SIM
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-mono font-bold text-white">{record.invoiceNumber}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Date: {record.date}</div>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {record.statusLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Billed To / Merchant Info */}
          <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Billed To</div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                AeroPulse Athletics, Inc.
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                1200 NW Naito Parkway
              </div>
              <div className="text-[11px] text-slate-400">
                Portland, OR 97209 USA
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Payment Method</div>
              <div className="flex items-center gap-1.5 text-white font-mono">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                Visa ending in 4242
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Coverage Span: {record.periodStart} to {record.periodEnd}
              </div>
              <div className="text-[10px] font-mono text-cyan-300 mt-0.5">
                Capacity: 24 active products
              </div>
            </div>
          </div>

          {/* Itemized Line Items Table */}
          <div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Subscription Charges
            </div>
            <table className="w-full text-left border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-[#080D16] text-[10px] font-mono text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Item Description</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Unit Price</th>
                  <th className="p-2.5 text-right font-mono">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                {record.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-sans">
                      <div className="font-medium text-white">{item.description}</div>
                      <div className="text-[10px] text-slate-500 font-sans">
                        Full intelligence coverage, autonomous monitoring & arbitration
                      </div>
                    </td>
                    <td className="p-2.5 text-center text-slate-300">{item.quantity}</td>
                    <td className="p-2.5 text-right text-slate-300">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-2.5 text-right font-bold text-white">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal & Total */}
          <div className="flex justify-end pt-2">
            <div className="w-56 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${record.amount.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sales Tax (0.00%)</span>
                <span>$0.00 USD</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                <span>Total Simulated</span>
                <span className="text-cyan-400">${record.amount.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          {/* Honest Simulation Disclaimer Notice */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-white">Representative Simulation Notice:</strong> Production billing documents and signed PDF receipts require a connected payment provider (e.g., Stripe Billing). No actual currency was charged for this statement.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#080D16] border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            Statement ID: {record.id}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Receipt
          </button>
        </div>

      </div>
    </div>
  );
};
