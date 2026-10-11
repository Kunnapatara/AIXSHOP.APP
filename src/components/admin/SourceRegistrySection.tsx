// src/components/admin/SourceRegistrySection.tsx
import React, { useState } from 'react';
import { 
  Radio, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Info,
  Sliders,
  PowerOff,
  ChevronRight
} from 'lucide-react';
import { sampleAdminSources, sourceAuthorityTiers } from '../../data/sampleAdminData';
import { AdminSourceItem } from '../../types/admin';

interface SourceRegistrySectionProps {
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const SourceRegistrySection: React.FC<SourceRegistrySectionProps> = ({
  onTriggerBoundaryModal
}) => {
  const [selectedSource, setSelectedSource] = useState<AdminSourceItem | null>(null);

  return (
    <div className="w-full bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 font-sans tracking-tight flex items-center gap-2">
              Source Registry & Authority Hierarchy
              <span className="text-xs font-normal text-stone-500 font-mono">
                (4 Representative Ingestors)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Administrative source monitoring and contextual credibility model. Read-only permissions enforced across all connectors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-stone-100 border border-stone-200 text-stone-700 font-semibold shadow-3xs">
            Least-Privilege Active
          </span>
          <button
            type="button"
            onClick={() => onTriggerBoundaryModal('Add New External Source', 'Registering new ingestion endpoints requires administrator credentials and API token provisioning.')}
            className="px-3.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-3xs"
          >
            + Register Source (Preview)
          </button>
        </div>
      </div>

      {/* Sources Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-3xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-stone-500 font-mono text-[11px] uppercase tracking-wider border-b border-stone-200">
            <tr>
              <th className="px-4 py-3 font-semibold">Source ID & Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Acquisition & Permissions</th>
              <th className="px-4 py-3 font-semibold">Coverage & Evidence</th>
              <th className="px-4 py-3 font-semibold">Health & Freshness</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 font-sans">
            {sampleAdminSources.map((source) => (
              <tr key={source.id} className="hover:bg-stone-50/70 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="font-bold text-stone-900 tracking-tight flex items-center gap-2 font-sans">
                    {source.name}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                      Tier {source.defaultAuthorityLevel}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#F97316] font-semibold mt-0.5">
                    {source.id}
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] bg-stone-100 text-stone-700 border border-stone-200 font-medium">
                    {source.category}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="text-stone-800 font-semibold">{source.acquisitionMethod}</div>
                  <div className="text-[10px] font-mono text-stone-500 mt-0.5">{source.permissionModel}</div>
                </td>

                <td className="px-4 py-3.5">
                  <div className="text-stone-900 font-mono font-bold">{source.evidenceContribution} facts contributed</div>
                  <div className="text-[11px] text-stone-500">{source.coverage}</div>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {source.health.includes('Healthy') || source.health.includes('Synchronized') ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    )}
                    <span className={source.health.includes('Review') ? 'text-amber-800 font-bold' : 'text-emerald-800 font-semibold'}>
                      {source.health}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-stone-500 mt-0.5">
                    {source.freshness}
                  </div>
                </td>

                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSource(source)}
                      className="px-3 py-1 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer shadow-3xs"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => onTriggerBoundaryModal(`Disable Source: ${source.name}`, 'Severing an ingestion connector requires tenant administrative credentials and will halt hourly drift updates.')}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Disable Source"
                    >
                      <PowerOff className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Source Inspection Modal */}
      {selectedSource && (
        <div className="p-4.5 bg-stone-50 border border-orange-200 rounded-2xl space-y-3 shadow-3xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#F97316] uppercase">SOURCE INSPECTION:</span>
              <span className="text-sm font-extrabold text-stone-900 font-sans">{selectedSource.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSource(null)}
              className="text-xs text-stone-500 hover:text-stone-900 px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl font-semibold cursor-pointer transition-colors shadow-3xs"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-stone-500">Permissions:</span>
              <p className="text-stone-900 font-mono font-semibold mt-0.5">{selectedSource.permissionModel}</p>
            </div>
            <div>
              <span className="text-stone-500">Acquisition Mechanism:</span>
              <p className="text-stone-900 font-mono font-semibold mt-0.5">{selectedSource.acquisitionMethod}</p>
            </div>
            <div>
              <span className="text-stone-500">Last Observation:</span>
              <p className="text-[#F97316] font-mono font-bold mt-0.5">{selectedSource.lastObservation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Source Authority & Trust Hierarchy Panel */}
      <div className="mt-6 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F97316]" />
            <h3 className="text-sm font-extrabold text-stone-900 font-sans tracking-tight">
              Source Authority Model (Contextual Hierarchy)
            </h3>
          </div>
          <span className="text-[11px] text-orange-800 font-mono font-bold">
            Authority is Contextual (Attribute-Dependent)
          </span>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4 text-xs text-orange-950 flex items-start gap-3 shadow-3xs">
          <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-orange-900 font-bold">Contextual Rule:</strong> Source authority is not absolute. A marketplace source may be authoritative for live offer pricing and inventory, yet weak for technical engineering specifications. AIXSHOP resolves conflicts using attribute-specific authority vectors rather than blunt domain rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sourceAuthorityTiers.map((tier) => (
            <div key={tier.level} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2 shadow-3xs hover:border-orange-200 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-100 text-[#F97316] border border-orange-200">
                  Level 0{tier.level}
                </span>
                <span className="text-[10px] font-mono text-stone-500 font-semibold">
                  {tier.authority}
                </span>
              </div>

              <div className="text-xs font-bold text-stone-900 font-sans">
                {tier.title}
              </div>

              <p className="text-[11px] text-stone-600 leading-relaxed">
                {tier.description}
              </p>

              <div className="pt-2 border-t border-stone-200 text-[10px] font-mono text-stone-700">
                <span className="text-stone-400">Ex:</span> {tier.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
