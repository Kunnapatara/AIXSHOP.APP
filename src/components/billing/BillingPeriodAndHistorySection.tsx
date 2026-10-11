import React from 'react';
import { 
  Calendar, 
  Clock, 
  Receipt, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { CurrentSubscriptionState, BillingHistoryRecord } from '../../types/billing';
import { sampleBillingHistory } from '../../data/sampleBillingData';

interface BillingPeriodAndHistorySectionProps {
  subscription: CurrentSubscriptionState;
  onViewReceipt: (record: BillingHistoryRecord) => void;
}

export const BillingPeriodAndHistorySection: React.FC<BillingPeriodAndHistorySectionProps> = ({
  subscription,
  onViewReceipt
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Current Billing Period Timeline Panel */}
      <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Current Billing Period & Timeline
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Active monthly subscription window and next scheduled commercial reconciliation.
            </p>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Representative Billing Timeline
          </span>
        </div>

        {/* Timeline Visualization */}
        <div className="mt-6 p-5 rounded-xl bg-[#0A101C] border border-slate-800/90">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-medium">Cycle Span:</span>
              <strong className="text-white font-mono">September 15, 2026</strong>
              <span className="text-slate-500">→</span>
              <strong className="text-white font-mono">October 15, 2026</strong>
            </div>

            <div className="text-xs font-mono text-cyan-400">
              Status: Day 1 of 30 · Current Cycle Active
            </div>
          </div>

          {/* Timeline Bar */}
          <div className="relative w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full w-[6%]" />
          </div>

          {/* Period Details Cards */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Subscribed Tier</div>
              <div className="mt-1 font-bold text-white">Pro Plan (Monthly)</div>
              <div className="mt-0.5 text-[10px] text-cyan-400 font-mono">$299.00 USD / mo</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Monitored Products</div>
              <div className="mt-1 font-bold text-white">24 Products Active</div>
              <div className="mt-0.5 text-[10px] text-emerald-400 font-mono">1,976 Headroom</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Next Billing Event</div>
              <div className="mt-1 font-bold text-white">October 15, 2026</div>
              <div className="mt-0.5 text-[10px] text-slate-400 font-mono">Automatic Preview</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Estimated Next Charge</div>
              <div className="mt-1 font-bold text-white">$299.00 USD</div>
              <div className="mt-0.5 text-[10px] text-slate-400 font-mono">Zero Overages</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Billing History Table */}
      <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6" id="billing-history-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Billing & Statement History
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Auditable archive of past monthly subscription periods and representative statements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              4 Representative Records
            </span>
          </div>
        </div>

        {/* History Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
            <thead className="bg-[#0A101C] text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3 font-semibold text-slate-300">Billing Date</th>
                <th className="p-3 font-semibold text-slate-300">Description</th>
                <th className="p-3 font-semibold text-slate-300">Plan Tier</th>
                <th className="p-3 font-semibold text-slate-300 font-mono text-right">Amount</th>
                <th className="p-3 font-semibold text-slate-300 text-center">Status</th>
                <th className="p-3 font-semibold text-slate-300 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {sampleBillingHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3 font-mono text-white font-medium">
                    {item.date}
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-slate-200">{item.description}</div>
                    <div className="text-[10px] font-mono text-slate-500">
                      Period: {item.periodStart} to {item.periodEnd}
                    </div>
                  </td>
                  <td className="p-3 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                      {item.planName}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-white text-right">
                    ${item.amount.toFixed(2)} USD
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item.statusLabel}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => onViewReceipt(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-700 text-xs font-mono font-medium transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Receipt Preview</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* History Transparency Note */}
        <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong>Representative Historical Simulation:</strong> No financial charges have occurred. In production, this table connects to your authorized merchant payment processor (e.g. Stripe, Adyen) with downloadable tax invoices and PDF receipts.
          </div>
        </div>
      </div>
    </div>
  );
};
