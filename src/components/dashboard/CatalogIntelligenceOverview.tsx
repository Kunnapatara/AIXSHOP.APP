import React, { useState } from 'react';
import { Layers, Info, CheckCircle2, AlertTriangle, HelpCircle, ChevronRight, Shield } from 'lucide-react';
import { CatalogIntelligenceDimension } from '../../types/dashboard';

interface CatalogIntelligenceOverviewProps {
  dimensions: CatalogIntelligenceDimension[];
}

export const CatalogIntelligenceOverview: React.FC<CatalogIntelligenceOverviewProps> = ({
  dimensions
}) => {
  const [selectedDimensionId, setSelectedDimensionId] = useState<string>('dim-specs');

  const selectedDimension = dimensions.find(d => d.id === selectedDimensionId) || dimensions[0];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Strong':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Good':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Needs Attention':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 80) return 'bg-cyan-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="rounded-2xl bg-[#0F172A]/80 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">Catalog Intelligence</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            6 Dimensions
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono">Select a row to inspect diagnostic detail</span>
      </div>

      {/* Mandatory Philosophical Notice */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Catalog Truth Rule: </strong>
          Coverage indicates the proportion of modeled information currently supported by sufficient evidence. It does not represent search ranking or sales performance.
        </p>
      </div>

      {/* Interactive Table and Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
        {/* Table List */}
        <div className="lg:col-span-7 space-y-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="pb-2.5 pl-2 font-medium">Dimension</th>
                  <th className="pb-2.5 px-3 text-right font-medium">Coverage</th>
                  <th className="pb-2.5 px-3 text-center font-medium">Status</th>
                  <th className="pb-2.5 pr-2 text-right font-medium">Flagged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {dimensions.map((dim) => {
                  const isSelected = dim.id === selectedDimensionId;

                  return (
                    <tr
                      key={dim.id}
                      onClick={() => setSelectedDimensionId(dim.id)}
                      className={`transition-colors cursor-pointer group ${
                        isSelected 
                          ? 'bg-cyan-500/10 text-white font-semibold' 
                          : 'hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <td className="py-3 pl-2 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-transparent group-hover:bg-slate-600'}`}></span>
                        <span className="font-medium text-slate-100">{dim.dimensionName}</span>
                      </td>

                      <td className="py-3 px-3 text-right font-mono">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full ${getProgressBarColor(dim.coveragePercentage)} rounded-full`}
                              style={{ width: `${dim.coveragePercentage}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-white">{dim.coveragePercentage}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getStatusBadge(dim.status)}`}>
                          {dim.status}
                        </span>
                      </td>

                      <td className="py-3 pr-2 text-right font-mono text-slate-400">
                        {dim.affectedProductsCount > 0 ? (
                          <span className="text-amber-400 font-semibold">{dim.affectedProductsCount} SKUs</span>
                        ) : (
                          <span className="text-emerald-400">0 SKUs</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Dimension Detail Panel */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Selected Diagnostic Dimension
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getStatusBadge(selectedDimension.status)}`}>
                {selectedDimension.status}
              </span>
            </div>

            <h4 className="text-base font-bold text-white flex items-center gap-2">
              {selectedDimension.dimensionName}
              <span className="text-sm font-mono text-cyan-400 font-normal">
                ({selectedDimension.coveragePercentage}% Coverage)
              </span>
            </h4>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Coverage Rationale</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDimension.coverageRationale}
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-amber-400 uppercase font-mono block">Primary Observation</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDimension.keyObservation}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Affected Catalog Scope:</span>
            <span className="text-slate-200 font-bold">{selectedDimension.affectedProductsCount} of 24 SKUs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
