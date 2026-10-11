// src/components/admin/IssueAndRecoverySection.tsx
import React, { useState } from 'react';
import { 
  AlertCircle, 
  ShieldAlert, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { sampleAdminIssues, recoveryClassGovernance } from '../../data/sampleAdminData';
import { AdminIssueRecord } from '../../types/admin';

interface IssueAndRecoverySectionProps {
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
  onNavigateIssues: () => void;
}

export const IssueAndRecoverySection: React.FC<IssueAndRecoverySectionProps> = ({
  onTriggerBoundaryModal,
  onNavigateIssues
}) => {
  const [selectedIssue, setSelectedIssue] = useState<AdminIssueRecord | null>(sampleAdminIssues[0]);

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              Issue Governance & Recovery Classes
              <span className="text-xs font-normal text-stone-500 font-sans">
                (8 Open Intelligence Issues)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Deterministic remediation governance aligned with Page 10. Execution gates enforce strict validation before catalog writes.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNavigateIssues}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 rounded-xl border border-stone-200 text-xs font-semibold shadow-3xs transition-colors cursor-pointer"
        >
          <span>Open Merchant Issues (P10)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Recovery Governance Classes (Class A, Class B, Class C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {recoveryClassGovernance.map((cls) => (
          <div key={cls.class} className="p-4.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 flex flex-col justify-between shadow-3xs hover:border-orange-300 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white text-[#F97316] border border-stone-200 shadow-3xs">
                  {cls.name}
                </span>
                <span className="text-[10px] font-mono text-stone-500">
                  {cls.activeCount} Workflows
                </span>
              </div>
              <div className="text-xs font-bold text-stone-900 mt-2 font-sans">
                {cls.permissionRequirement}
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed mt-1 font-sans">
                {cls.description}
              </p>
            </div>

            <div className="pt-2.5 border-t border-stone-200 text-[10px] font-mono text-stone-500">
              Gate: <span className="text-emerald-700 font-bold">{cls.executionMechanism}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Issues Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-3xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider border-b border-stone-200">
            <tr>
              <th className="px-4 py-3">Issue ID & Severity</th>
              <th className="px-4 py-3">Title & Entity</th>
              <th className="px-4 py-3">Category & Pipeline Stage</th>
              <th className="px-4 py-3">Recovery Class</th>
              <th className="px-4 py-3">Governance State</th>
              <th className="px-4 py-3 text-right">Execute Remediate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 bg-white font-sans">
            {sampleAdminIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-stone-50/70 transition-colors">
                <td className="px-4 py-3.5 font-mono text-[11px]">
                  <div className="font-bold text-[#F97316]">{issue.id}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold shadow-3xs ${
                    issue.severity === 'Critical' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                    issue.severity === 'High' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-stone-200 text-stone-800 border border-stone-300'
                  }`}>
                    {issue.severity}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="font-bold text-stone-900 tracking-tight font-sans">{issue.title}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 font-sans">{issue.productName}</div>
                </td>

                <td className="px-4 py-3.5">
                  <span className="text-stone-800 font-medium">{issue.evidenceState}</span>
                  <div className="text-[10px] font-mono text-stone-500 mt-0.5 truncate max-w-xs" title={issue.rootCause}>
                    {issue.rootCause}
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-stone-800 border border-stone-200 shadow-3xs">
                    {issue.recoveryClass}
                  </span>
                  <div className="text-[10px] text-stone-500 mt-0.5 font-mono">
                    Eligibility: {issue.recoveryEligibility}
                  </div>
                </td>

                <td className="px-4 py-3.5 font-mono text-[11px]">
                  <span className="text-amber-800 font-bold">{issue.currentState}</span>
                  <div className="text-[10px] text-stone-500 mt-0.5">Assigned: Merchant / System</div>
                </td>

                <td className="px-4 py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => onTriggerBoundaryModal(
                      `Execute Recovery: ${issue.id}`,
                      'Remediation write-back requires verified merchant API credentials and authenticated store authorization.'
                    )}
                    className="px-3 py-1.5 bg-white hover:bg-orange-50 text-[#F97316] rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border border-stone-200 shadow-3xs"
                  >
                    Execute Recovery
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
