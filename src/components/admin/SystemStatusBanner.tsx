// src/components/admin/SystemStatusBanner.tsx
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Database, 
  Split, 
  RefreshCw,
  Info
} from 'lucide-react';

export const SystemStatusBanner: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const statusComponents = [
    {
      id: 'intelligence',
      name: 'Intelligence Pipeline',
      status: 'Operational · Preview',
      isHealthy: true,
      description: 'Canonical attribute fusion operating within established certainty thresholds.',
      icon: Activity
    },
    {
      id: 'evidence',
      name: 'Evidence Pipeline',
      status: 'Operational · Preview',
      isHealthy: true,
      description: 'Multi-source fact extraction and cryptographic provenance hashing active.',
      icon: Database
    },
    {
      id: 'identity',
      name: 'Identity Resolution',
      status: 'Operational · Preview',
      isHealthy: true,
      description: 'Parent-variant relationship clustering stable across canonical catalog.',
      icon: Layers
    },
    {
      id: 'offer',
      name: 'Offer Separation',
      status: 'Operational · Preview',
      isHealthy: true,
      description: 'Architectural wall active: seller offers strictly isolated from product specs.',
      icon: Split
    },
    {
      id: 'monitoring',
      name: 'Monitoring Engine',
      status: 'Operational · Preview',
      isHealthy: true,
      description: 'Autonomous drift detection cycling across 24 products hourly.',
      icon: RefreshCw
    },
    {
      id: 'recovery',
      name: 'Recovery Engine',
      status: 'Operational · Preview',
      isHealthy: true,
      description: 'Deterministic Class A rules and Class B evidence gates active.',
      icon: ShieldCheck
    },
    {
      id: 'source',
      name: 'Source Acquisition',
      status: 'Review Required · Preview',
      isHealthy: false,
      description: 'Google Merchant Center syndication feed contains 1 conflicting variant barcode.',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Top micro-bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-stone-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-stone-900 font-bold tracking-wide uppercase text-[11px]">
            Global System Integrity Diagnostic
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-stone-500 text-[11px] font-medium">
            7 Core Intelligence Subsystems
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
          <Info className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Notice: Production telemetry is not connected. Metrics reflect simulated governance state.</span>
        </div>
      </div>

      {/* Grid of Subsystems */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {statusComponents.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative rounded-2xl p-3.5 border transition-all duration-200 cursor-default shadow-3xs ${
                item.isHealthy
                  ? 'bg-stone-50 border-stone-200 hover:border-orange-200 hover:bg-stone-100/60'
                  : 'bg-amber-50/70 border-amber-200 hover:border-amber-300'
              }`}
              onMouseEnter={() => setActiveTooltip(item.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  item.isHealthy ? 'bg-orange-50 text-[#F97316]' : 'bg-amber-100 text-amber-800'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {item.isHealthy ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                )}
              </div>

              <div className="text-[11px] font-bold text-stone-900 tracking-tight truncate font-sans">
                {item.name}
              </div>

              <div className={`text-[10px] font-mono mt-1 ${item.isHealthy ? 'text-emerald-800 font-semibold' : 'text-amber-800 font-bold'}`}>
                {item.status}
              </div>

              {/* Hover Tooltip */}
              {activeTooltip === item.id && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-60 p-3 bg-white border border-stone-200 rounded-2xl shadow-xl text-[11px] text-stone-700 z-40 pointer-events-none animate-in fade-in">
                  <p className="font-bold text-stone-900 mb-0.5 font-sans">{item.name}</p>
                  <p className="text-stone-500 leading-snug">{item.description}</p>
                  <div className="mt-2 pt-2 border-t border-stone-200 text-[10px] text-orange-800 font-mono">
                    Representative system state. Production infrastructure telemetry is not connected.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
