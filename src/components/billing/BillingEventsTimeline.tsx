import React from 'react';
import { 
  Activity, 
  Sparkles, 
  Clock, 
  Calendar, 
  FileText, 
  Workflow, 
  Package, 
  ShieldCheck 
} from 'lucide-react';
import { sampleBillingEvents } from '../../data/sampleBillingData';

export const BillingEventsTimeline: React.FC = () => {
  return (
    <div className="rounded-xl bg-[#090E17] border border-slate-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Commercial Audit & Billing Events
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Immutable log of subscription lifecycle transitions, connector activations, and quota audits.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
          Representative Preview Events
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {sampleBillingEvents.map((evt, idx) => (
          <div key={evt.id} className="flex items-start gap-4 p-3.5 rounded-lg bg-[#0A101C] border border-slate-800/90 text-xs">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-750 text-cyan-400 shrink-0 mt-0.5">
              <Activity className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white tracking-tight">{evt.title}</h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {evt.badge}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {new Date(evt.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })} · {new Date(evt.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC
                </span>
              </div>

              <p className="mt-1.5 text-slate-300 leading-relaxed">
                {evt.description}
              </p>

              <div className="mt-2 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                <span>Audit Ref: {evt.id} · Verified in demo simulation</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
