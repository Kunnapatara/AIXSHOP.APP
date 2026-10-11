// src/components/admin/ObservationLedgerSection.tsx
import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  ShieldCheck,
  Search
} from 'lucide-react';
import { sampleAdminObservations } from '../../data/sampleAdminData';
import { AdminObservationLedgerItem } from '../../types/admin';

export const ObservationLedgerSection: React.FC = () => {
  const [filterIssueOnly, setFilterIssueOnly] = useState(false);

  const displayedObservations = filterIssueOnly
    ? sampleAdminObservations.filter((o) => o.isIssueTriggered)
    : sampleAdminObservations;

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              Observation Ledger
              <span className="text-xs font-normal text-stone-500 font-sans">
                (Continuous Monitoring Telemetry)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Immutable ledger of detected external source drifts. Demonstrates the core principle: <strong className="text-[#F97316]">Change ≠ Issue</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => setFilterIssueOnly(false)}
            className={`px-3.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              !filterIssueOnly
                ? 'bg-white text-[#F97316] border-stone-200 shadow-3xs font-bold'
                : 'bg-transparent text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            All Observations ({sampleAdminObservations.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterIssueOnly(true)}
            className={`px-3.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              filterIssueOnly
                ? 'bg-white text-amber-800 border-stone-200 shadow-3xs font-bold'
                : 'bg-transparent text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            Issues Triggered Only (3)
          </button>
        </div>
      </div>

      {/* Principle Callout */}
      <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-orange-950 flex items-start gap-2.5 shadow-3xs">
        <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
        <div>
          <strong className="text-orange-900 font-bold">The Change vs. Issue Distinction:</strong> Not all observed catalog drifts represent defects. For example, a third-party retailer lowering their price from $249 to $219 is an observed commercial event (logged in the Offer Graph), whereas a barcode collision on a size variant is a critical defect (triaged to Issue Governance).
        </div>
      </div>

      {/* Observations Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-3xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider border-b border-stone-200">
            <tr>
              <th className="px-4 py-3">Timestamp & ID</th>
              <th className="px-4 py-3">Source & Entity</th>
              <th className="px-4 py-3">Observation Description</th>
              <th className="px-4 py-3">Drift (Old → New)</th>
              <th className="px-4 py-3">Evidence State</th>
              <th className="px-4 py-3">Impact & Issue Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 bg-white font-sans">
            {displayedObservations.map((obs) => (
              <tr key={obs.id} className="hover:bg-stone-50/70 transition-colors">
                <td className="px-4 py-3.5 font-mono text-[11px]">
                  <div className="font-bold text-[#F97316]">{obs.id}</div>
                  <div className="text-stone-400 text-[10px] mt-0.5">{obs.timestamp}</div>
                </td>

                <td className="px-4 py-3.5">
                  <div className="font-bold text-stone-900 tracking-tight font-sans">{obs.entity}</div>
                  <div className="text-[10px] font-mono text-[#F97316] mt-0.5">{obs.source}</div>
                </td>

                <td className="px-4 py-3.5 text-stone-700 font-sans text-xs">
                  {obs.observation}
                </td>

                <td className="px-4 py-3.5 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 line-through">{obs.previousValue}</span>
                    <ArrowRight className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="text-stone-900 font-bold">{obs.newValue}</span>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-3xs ${
                    obs.evidenceState === 'MERCHANT_VERIFIED'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : obs.evidenceState === 'CONFLICT'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : obs.evidenceState === 'MISSING'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}>
                    {obs.evidenceState.replace('_', ' ')}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-3xs ${
                      obs.impact === 'Critical'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : obs.impact === 'High'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : obs.impact === 'Medium'
                        ? 'bg-stone-200 text-stone-800 border border-stone-300'
                        : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}>
                      {obs.impact} Impact
                    </span>

                    {obs.isIssueTriggered ? (
                      <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shadow-3xs">
                        Issue Triggered
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-stone-400">
                        Logged Only
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
