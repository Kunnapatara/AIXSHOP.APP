import React, { useState } from 'react';
import { Activity, Clock, CheckCircle2, AlertTriangle, Tag, ShieldCheck, ChevronRight, Layers } from 'lucide-react';
import { CatalogRecentEvent } from '../../types/dashboard';

interface RecentIntelligenceEventsProps {
  events: CatalogRecentEvent[];
}

export const RecentIntelligenceEvents: React.FC<RecentIntelligenceEventsProps> = ({
  events
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');

  const activeEvent = events.find(e => e.id === selectedEventId) || events[0];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'identity':
        return <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'conflict':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'offer':
        return <Tag className="w-3.5 h-3.5 text-indigo-400" />;
      case 'verification':
        return <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent Intelligence Events</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Catalog Activity Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 pt-0.5">
            Chronological audit of evidence changes, offer scrapes, and conflict alerts.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Preview Activity · Not Persistent</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
        {/* Events Timeline List */}
        <div className="lg:col-span-7 space-y-2">
          {events.map((evt) => {
            const isSelected = evt.id === selectedEventId;

            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-800 mt-0.5">
                      {getEventIcon(evt.type)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {evt.title}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/20">
                          {evt.target}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {evt.detail}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      {evt.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Detail Panel */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Event Detail
              </span>
              <span className="text-xs font-mono text-slate-400">
                {activeEvent.time}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">
                {activeEvent.title}
              </h4>
              <p className="text-xs text-cyan-300 font-mono mt-0.5">
                Target Entity: {activeEvent.target}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Logged Finding</span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeEvent.detail}
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-1 font-mono">
              <span className="text-[10px] uppercase text-slate-500 block">Provenance Engine</span>
              <span className="text-slate-300">{activeEvent.provenanceSource}</span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
            Note: Event stream is synthetic preview data. Persistent event journaling will be part of Page 09 Monitoring.
          </div>
        </div>
      </div>
    </div>
  );
};
