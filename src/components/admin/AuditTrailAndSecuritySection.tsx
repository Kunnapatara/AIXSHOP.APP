// src/components/admin/AuditTrailAndSecuritySection.tsx
import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  CheckCircle2, 
  KeyRound, 
  Database,
  Hash
} from 'lucide-react';
import { sampleAuditLogs, sampleSecurityGuards } from '../../data/sampleAdminData';

interface AuditTrailAndSecuritySectionProps {
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const AuditTrailAndSecuritySection: React.FC<AuditTrailAndSecuritySectionProps> = ({
  onTriggerBoundaryModal
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Audit Trail (2 Cols) */}
      <div className="lg:col-span-2 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
                  Administrative Audit Trail
                </h3>
                <p className="text-xs text-stone-500">
                  Immutable cryptographic ledger of administrative and system operations
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTriggerBoundaryModal('Clear Audit Trail', 'Cryptographic audit logs are append-only and cannot be purged or truncated by any administrative role.')}
              className="p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              title="Purge Audit Logs (Restricted)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Audit Logs Table */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200 mt-4 shadow-3xs">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-50 text-stone-500 text-[10px] uppercase font-bold border-b border-stone-200">
                <tr>
                  <th className="px-3.5 py-3">Trace Hash & Time</th>
                  <th className="px-3.5 py-3">Actor & Scope</th>
                  <th className="px-3.5 py-3">Action Executed</th>
                  <th className="px-3.5 py-3">Target Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white text-[11px]">
                {sampleAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-3.5 py-3">
                      <div className="text-[#F97316] font-bold">{log.id}</div>
                      <div className="text-stone-400 text-[10px]">{log.timestamp}</div>
                    </td>

                    <td className="px-3.5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-3xs ${
                        log.actorType === 'SYSTEM' ? 'bg-orange-50 text-[#F97316] border border-orange-200' :
                        log.actorType === 'ADMIN' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        log.actorType === 'MERCHANT' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-stone-100 text-stone-700 border border-stone-200'
                      }`}>
                        {log.actorType}: {log.actor}
                      </span>
                    </td>

                    <td className="px-3.5 py-3 text-stone-800">
                      <div className="font-bold text-stone-900 font-sans">{log.action}</div>
                      <div className="text-stone-500 text-[10px] font-sans truncate max-w-xs">{log.detail}</div>
                    </td>

                    <td className="px-3.5 py-3 text-stone-700 font-mono text-[10px]">
                      {log.targetEntity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[10px] text-stone-500 font-mono flex items-center justify-between shadow-3xs">
          <span>Cryptographic Hash Standard: SHA-256</span>
          <span className="text-emerald-700 font-bold">Ledger Integrity: 100% Verified</span>
        </div>
      </div>

      {/* Security & Data Isolation Principles (1 Col) */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-3xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
                Security & Isolation
              </h3>
              <p className="text-xs text-stone-500">
                Governance Boundary Enforcements
              </p>
            </div>
          </div>

          {/* Security Cards */}
          <div className="space-y-3 mt-4">
            {sampleSecurityGuards.map((guard, idx) => (
              <div key={idx} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 shadow-3xs">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-stone-900 font-sans">
                    {guard.title}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-3xs">
                    {guard.status}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                  {guard.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-950 font-sans shadow-3xs leading-relaxed">
          <strong className="font-bold text-emerald-900">Strict Privacy Rule:</strong> AIXSHOP processes product specifications and merchant offers. Customer personal identifiers are never ingested.
        </div>
      </div>
    </div>
  );
};
