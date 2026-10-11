// src/components/analytics/ConflictIssueRecoverySection.tsx
import React from 'react';
import { 
  GitCompare, 
  AlertCircle, 
  Workflow, 
  ArrowRight, 
  Filter, 
  Info
} from 'lucide-react';
import { 
  ConflictAnalyticsBreakdown, 
  IssueLifecycleDistribution, 
  RecoveryPerformanceMetrics, 
  ChangeDiagnosisConversion 
} from '../../types/analytics';

interface ConflictIssueRecoverySectionProps {
  conflicts: ConflictAnalyticsBreakdown;
  issueLifecycle: IssueLifecycleDistribution;
  recovery: RecoveryPerformanceMetrics;
  changeDiagnosis: ChangeDiagnosisConversion;
  onNavigateIssues: () => void;
  onNavigateMonitoring: () => void;
}

export const ConflictIssueRecoverySection: React.FC<ConflictIssueRecoverySectionProps> = ({
  conflicts,
  issueLifecycle,
  recovery,
  changeDiagnosis,
  onNavigateIssues,
  onNavigateMonitoring
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT COLUMN: Conflicts & Change Diagnosis Funnel */}
      <div className="space-y-6">
        {/* Intelligence Conflicts Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight">Intelligence Conflicts</h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Active discrepancies where sources provide contradictory facts.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-rose-600">{conflicts.totalConflicts}</span>
              <span className="text-[11px] text-stone-400 block font-mono">Total Conflicts</span>
            </div>
          </div>

          {/* Conflict Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
            <button
              type="button"
              onClick={onNavigateIssues}
              className="p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left transition-all cursor-pointer"
            >
              <div className="text-xs text-rose-800 font-bold">Critical</div>
              <div className="text-xl font-black font-mono text-rose-900 mt-0.5">{conflicts.criticalConflicts}</div>
              <div className="text-[10px] text-rose-600 mt-1">Direct Blockers</div>
            </button>

            <button
              type="button"
              onClick={onNavigateIssues}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-all cursor-pointer"
            >
              <div className="text-xs text-stone-700 font-bold">Variant GTIN</div>
              <div className="text-xl font-black font-mono text-stone-900 mt-0.5">{conflicts.variantConflicts}</div>
              <div className="text-[10px] text-stone-500 mt-1">Barcode Collisions</div>
            </button>

            <button
              type="button"
              onClick={onNavigateIssues}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-all cursor-pointer"
            >
              <div className="text-xs text-stone-700 font-bold">Attribute</div>
              <div className="text-xl font-black font-mono text-stone-900 mt-0.5">{conflicts.attributeConflicts}</div>
              <div className="text-[10px] text-stone-500 mt-1">Specs & Geometry</div>
            </button>

            <button
              type="button"
              onClick={onNavigateIssues}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-all cursor-pointer"
            >
              <div className="text-xs text-stone-700 font-bold">Offer Price</div>
              <div className="text-xl font-black font-mono text-stone-900 mt-0.5">{conflicts.offerConflicts}</div>
              <div className="text-[10px] text-stone-500 mt-1">Partner Discrepancies</div>
            </button>
          </div>

          {/* Rule of Truth Callout */}
          <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold text-stone-900">Rule of Truth: </span>
              {conflicts.rationale}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-200 flex justify-end">
            <button
              type="button"
              onClick={onNavigateIssues}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Arbitrate Conflicts in Issues</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Change Diagnosis Conversion (Change ≠ Issue) */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#F97316]" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight">Change Diagnosis Funnel</h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Separating non-breaking routine updates from actionable issues.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200">
              Change ≠ Issue
            </span>
          </div>

          {/* Funnel Flow Visual */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center font-mono text-xs font-bold text-[#F97316]">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Continuous Monitoring Events</div>
                  <div className="text-[11px] text-stone-500">Raw changes detected across feeds, APIs, and DOM</div>
                </div>
              </div>
              <div className="text-right font-mono font-black text-stone-900 text-base">
                {changeDiagnosis.changesDetected} Changes
              </div>
            </div>

            <div className="flex justify-center text-stone-300">
              <div className="w-0.5 h-3 bg-stone-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Actionable Issues</span>
                  <span className="text-lg font-black font-mono text-amber-700">{changeDiagnosis.diagnosedAsIssues}</span>
                </div>
                <p className="text-[10px] text-amber-800/80 mt-1">
                  Breaks schema syntax, creates conflicts, or degrades buyer intent.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Informational Logs</span>
                  <span className="text-lg font-black font-mono text-stone-700">{changeDiagnosis.remainedInformational}</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  Routine price updates, non-critical image hashes, or expected promotions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-200 flex justify-between items-center text-xs">
            <span className="text-[11px] text-stone-500">Diagnosis Rate: 66.7% Actionable</span>
            <button
              type="button"
              onClick={onNavigateMonitoring}
              className="text-[#F97316] hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View Monitoring Stream</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Issue Lifecycle & Recovery Performance */}
      <div className="space-y-6">
        {/* Issue Lifecycle Performance Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight">Issue Lifecycle Performance</h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Current status distribution across diagnosed catalog issues.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateIssues}
              className="text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Manage in Issues</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Lifecycle Status Horizontal Pipeline */}
          <div className="mt-4 space-y-2">
            {[
              { label: 'Open', count: issueLifecycle.open, color: 'text-amber-700', bg: 'bg-amber-500', desc: 'Newly diagnosed anomaly' },
              { label: 'Diagnosing', count: issueLifecycle.diagnosing, color: 'text-[#F97316]', bg: 'bg-[#F97316]', desc: 'Analyzing provenance and schema drift' },
              { label: 'Recovery Proposed', count: issueLifecycle.recoveryProposed, color: 'text-blue-700', bg: 'bg-blue-500', desc: 'Remediation rule formulated' },
              { label: 'Validation Required', count: issueLifecycle.validationRequired, color: 'text-purple-700', bg: 'bg-purple-500', desc: 'Synthetic schema test in progress' },
              { label: 'Merchant Verification', count: issueLifecycle.merchantVerification, color: 'text-emerald-700', bg: 'bg-emerald-500', desc: 'Operator attestation required' },
              { label: 'Resolved', count: issueLifecycle.resolved, color: 'text-emerald-800', bg: 'bg-emerald-600', desc: 'Remediated & locked against regression' },
              { label: 'Blocked', count: issueLifecycle.blocked, color: 'text-rose-700', bg: 'bg-rose-500', desc: 'External authority dependency' }
            ].map((state) => (
              <div 
                key={state.label}
                className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${state.bg}`} />
                  <span className="font-bold text-stone-800">{state.label}</span>
                  <span className="text-[10px] text-stone-500 hidden sm:inline">· {state.desc}</span>
                </div>
                <span className={`font-mono font-black text-sm ${state.color}`}>{state.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Performance Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight">Recovery Performance</h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Progress through deterministic recovery and verification workflows.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Deterministic Logic
            </span>
          </div>

          {/* Recovery Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-stone-500 font-medium">Issues Detected</div>
              <div className="text-lg font-black font-mono text-stone-900 mt-0.5">{recovery.issuesDetected}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Total Active Cohort</div>
            </div>

            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
              <div className="text-[#F97316] font-bold">Recovery Eligible</div>
              <div className="text-lg font-black font-mono text-orange-900 mt-0.5">{recovery.recoveryEligible}</div>
              <div className="text-[10px] text-orange-600 mt-0.5">Automated Rules Met</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-700 font-bold">Validation Passed</div>
              <div className="text-lg font-black font-mono text-emerald-900 mt-0.5">{recovery.validationPassed}</div>
              <div className="text-[10px] text-emerald-600 mt-0.5">Schema Tests Clear</div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
              <div className="text-purple-700 font-bold">Merchant Verification</div>
              <div className="text-lg font-black font-mono text-purple-900 mt-0.5">{recovery.merchantVerificationRequired}</div>
              <div className="text-[10px] text-purple-600 mt-0.5">Class B Gated</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-800 font-bold">Resolved</div>
              <div className="text-lg font-black font-mono text-emerald-900 mt-0.5">{recovery.resolved}</div>
              <div className="text-[10px] text-emerald-700 mt-0.5">50% Resolution Rate</div>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <div className="text-rose-700 font-bold">Blocked</div>
              <div className="text-lg font-black font-mono text-rose-900 mt-0.5">{recovery.blocked}</div>
              <div className="text-[10px] text-rose-600 mt-0.5">External Stalls</div>
            </div>
          </div>

          {/* Operational Clarification Notice */}
          <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 leading-relaxed">
            <span className="font-bold text-stone-900">Operational Boundary: </span>
            {recovery.operationalNotes}
          </div>
        </div>
      </div>
    </div>
  );
};
