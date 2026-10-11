import React from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { sampleIntegrationSources } from '../../data/sampleIntegrationsData';
import { HealthStatus } from '../../types/integrations';

export const ConnectionHealthPanel: React.FC = () => {
  const connectedSources = sampleIntegrationSources.filter(s => s.status === 'CONNECTED');

  const renderHealthPill = (status: HealthStatus) => {
    switch (status) {
      case 'Healthy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-3xs">
            <CheckCircle2 className="w-3 h-3" />
            Healthy
          </span>
        );
      case 'Needs Attention':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-3xs">
            <AlertTriangle className="w-3 h-3" />
            Needs Attention
          </span>
        );
      case 'Partial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200 shadow-3xs">
            Partial
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-stone-100 text-stone-600 border border-stone-200 shadow-3xs">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl bg-white border border-stone-200/80 p-6 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-[#F97316] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 flex items-center gap-1 shadow-3xs">
                <Activity className="w-3.5 h-3.5 text-[#F97316]" />
                Connection Health & Diagnostic Dimensions
              </span>
              <span className="text-xs font-mono text-stone-400">
                Discrete Operational Dimensions
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 font-sans">
              7-Dimension Connection Health Assessment
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
              AIXSHOP rejects arbitrary blended "health percentages". Health is monitored across 7 discrete operational 
              dimensions to isolate token expiration, schema drift, and feed truncation independently.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200 shrink-0 shadow-3xs">
            <Info className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Active Sentinels: 3 Sources</span>
          </div>
        </div>

        {/* Source Health Dimension Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {connectedSources.map(source => (
            <div 
              key={source.id} 
              className={`rounded-2xl border p-4.5 flex flex-col justify-between shadow-3xs ${
                source.healthState === 'Needs Attention' 
                  ? 'bg-amber-50/40 border-amber-200' 
                  : 'bg-stone-50/80 border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-stone-900 truncate max-w-[180px]">
                    {source.name}
                  </span>
                  {renderHealthPill(source.healthState)}
                </div>

                <div className="text-[11px] font-mono text-stone-500 mb-3 font-medium">
                  Scope: {source.scope}
                </div>

                {/* Dimension Rows */}
                <div className="space-y-2.5 border-t border-stone-200 pt-3">
                  {source.healthDimensions.map((dim, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                      <div>
                        <div className="text-stone-800 font-semibold">{dim.name}</div>
                        <div className="text-[10px] text-stone-500 max-w-[200px] leading-tight mt-0.5">{dim.detail}</div>
                      </div>
                      <div className="shrink-0">
                        {renderHealthPill(dim.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>Observed: {source.lastObservation}</span>
                <span className="text-emerald-700 font-bold">Zero Error Retries</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
