import React from 'react';
import { 
  Package, 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  Tag, 
  AlertCircle,
  Info
} from 'lucide-react';
import { CatalogSnapshotMetrics } from '../../types/dashboard';
import { MetricExplanation } from './MetricExplanationModal';

interface CatalogSnapshotCardsProps {
  metrics: CatalogSnapshotMetrics;
  onOpenMetricExplanation: (metric: MetricExplanation) => void;
}

export const CatalogSnapshotCards: React.FC<CatalogSnapshotCardsProps> = ({
  metrics,
  onOpenMetricExplanation
}) => {
  const cards = [
    {
      id: 'products',
      title: 'Products',
      value: metrics.totalProducts,
      sublabel: 'Representative products',
      icon: Package,
      color: 'cyan',
      borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      explanation: {
        title: 'Representative Products',
        value: metrics.totalProducts,
        subtitle: 'Sample catalog scope for merchant intelligence preview',
        whatItMeans: 'The total count of representative product items currently ingested and modeled in this client-side preview catalog.',
        whatItIsNot: 'Not a live count of your actual store inventory. This is a synthetic preview dataset built from the AeroPulse Athletics product family.',
        methodology: 'Count of canonical product records modeled in the client-side catalog dataset.'
      }
    },
    {
      id: 'coverage',
      title: 'Intelligence Coverage',
      value: `${metrics.intelligenceCoveragePercentage}%`,
      sublabel: 'Supported product attributes',
      icon: ShieldCheck,
      color: 'emerald',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      explanation: {
        title: 'Intelligence Coverage',
        value: `${metrics.intelligenceCoveragePercentage}%`,
        subtitle: 'Proportion of modeled attributes with verified or corroborated evidence',
        whatItMeans: 'Percentage of modeled product attributes across all 24 catalog products currently supported by sufficient ground-truth evidence (Observed, Derived, or Merchant Verified).',
        whatItIsNot: 'CRITICAL: This is NOT an "SEO Score", not a "Product Quality Score", and not a search ranking indicator. It measures factual grounding, not marketing quality.',
        methodology: 'Sum of grounded attributes divided by total modeled schema slots across all catalog products: (Ground-Truth Facts / Total Target Attribute Schema) × 100.'
      }
    },
    {
      id: 'gaps',
      title: 'Evidence Gaps',
      value: metrics.evidenceGapsCount,
      sublabel: 'Missing or unresolved items',
      icon: HelpCircle,
      color: 'rose',
      borderColor: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400',
      explanation: {
        title: 'Evidence Gaps',
        value: metrics.evidenceGapsCount,
        subtitle: 'Unfilled ground-truth specification or policy attributes',
        whatItMeans: 'The total number of required consumer-decision or machine-readability attributes across the catalog where no public evidence was detected.',
        whatItIsNot: 'Not an error or bug count. AIXSHOP adheres to "Unknown remains Unknown" — it identifies what needs verification rather than hallucinating answers.',
        methodology: 'Count of schema properties flagged as MISSING across the representative catalog.'
      }
    },
    {
      id: 'conflicts',
      title: 'Conflicts',
      value: metrics.conflictsCount,
      sublabel: 'Source disagreements detected',
      icon: AlertTriangle,
      color: 'amber',
      borderColor: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400',
      explanation: {
        title: 'Evidence Conflicts',
        value: metrics.conflictsCount,
        subtitle: 'Mutually incompatible claims across public sources',
        whatItMeans: 'Representative product attributes where available public sources (e.g. manufacturer spec sheets vs authorized retailer listings) report conflicting values.',
        whatItIsNot: 'Not an AI confusion error. AIXSHOP strictly refuses to guess or average conflicting numbers; it keeps both isolated for merchant arbitration.',
        methodology: 'Count of attributes where Source A value != Source B value and confidence threshold mandates human verification.'
      }
    },
    {
      id: 'offers',
      title: 'Offers Observed',
      value: metrics.offersObservedCount,
      sublabel: 'Observed seller offers',
      icon: Tag,
      color: 'indigo',
      borderColor: 'border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/10 text-indigo-400',
      explanation: {
        title: 'Observed Seller Offers',
        value: metrics.offersObservedCount,
        subtitle: 'Commercial condition snapshots decoupled from product identity',
        whatItMeans: 'Total number of seller-specific commercial offers (price, currency, stock status, seller identity) observed across the representative catalog.',
        whatItIsNot: 'PRODUCT ≠ OFFER. These are point-in-time commercial observations, NOT intrinsic product attributes. They do not alter canonical specifications.',
        methodology: 'Aggregated count of active seller offer records detected across the 24 representative products.'
      }
    },
    {
      id: 'attention',
      title: 'Requires Attention',
      value: metrics.productsRequiringAttentionCount,
      sublabel: 'High-priority unresolved issues',
      icon: AlertCircle,
      color: 'purple',
      borderColor: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400',
      explanation: {
        title: 'Products Requiring Attention',
        value: metrics.productsRequiringAttentionCount,
        subtitle: 'SKUs with critical conflicts or high-impact missing attributes',
        whatItMeans: 'Representative products containing high-severity issues (e.g. variant barcode discrepancies, missing return policies, or material conflicts) that disrupt commerce discovery.',
        whatItIsNot: 'Does not imply products cannot be purchased. It highlights where machine discovery agents encounter hesitation or ambiguity.',
        methodology: 'Products with at least one CRITICAL severity finding or more than two active CONFLICT states.'
      }
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
          <span>Catalog Intelligence Snapshot</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-mono">
            6 Diagnostic Dimensions
          </span>
        </h2>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Click any card for calculation methodology
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onOpenMetricExplanation(card.explanation)}
              className={`p-4 rounded-xl bg-slate-900/80 border ${card.borderColor} transition-all duration-200 cursor-pointer group hover:bg-slate-900 relative shadow-sm`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenMetricExplanation(card.explanation);
                }
              }}
              title={`Click to view methodology for ${card.title}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                  {card.title}
                </span>
                <div className={`p-1.5 rounded-lg ${card.iconBg}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  {card.value}
                </span>
              </div>

              <p className="text-[10px] text-slate-400 truncate flex items-center justify-between">
                <span>{card.sublabel}</span>
                <Info className="w-2.5 h-2.5 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 ml-1" />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
