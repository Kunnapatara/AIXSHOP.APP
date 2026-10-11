import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileCheck2, 
  RotateCcw, 
  Database,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ConnectionPrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionPrinciplesModal: React.FC<ConnectionPrinciplesModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const principles = [
    {
      num: '01',
      title: 'Least Privilege by Design',
      icon: Lock,
      color: 'text-orange-600',
      summary: 'Only requested scopes necessary for product intelligence are accessed.',
      details: 'AIXSHOP requests only read access to product titles, variants, attributes, media, stock availability, and commercial offer pricing. Administrative, billing, and server configuration permissions are completely excluded.'
    },
    {
      num: '02',
      title: 'Zero Customer PII Policy',
      icon: EyeOff,
      color: 'text-emerald-400',
      summary: 'Customer identities, emails, addresses, and payments are strictly prohibited.',
      details: 'AIXSHOP is an intelligence layer for products, not an order processor. The connection handshake drops customer endpoints entirely. No customer personally identifiable information ever enters our ingestion boundary.'
    },
    {
      num: '03',
      title: 'Explicit Authorization First',
      icon: ShieldCheck,
      color: 'text-blue-400',
      summary: 'Data acquisition adheres to strict official APIs and permitted standards.',
      details: 'We reject dark-pattern scraping. Data is acquired via authorized OAuth, structured merchant feeds, permitted public microdata compliant with robots.txt, or direct merchant operator arbitration.'
    },
    {
      num: '04',
      title: 'No Silent External Write-Back',
      icon: FileCheck2,
      color: 'text-purple-400',
      summary: 'AIXSHOP never overwrites your live store or feeds silently.',
      details: 'All diagnostics and suggested remediations are presented as actionable recommendations or Schema.org proposals. Write access is disabled by default and requires explicit merchant arbitration.'
    },
    {
      num: '05',
      title: 'Immutable Evidence Preservation',
      icon: Database,
      color: 'text-amber-400',
      summary: 'Every observation is stamped with SHA-256 cryptographic provenance.',
      details: 'Observations are frozen as historical records with timestamps, endpoint URLs, and source payloads. If a retailer modifies their listing, the audit trail preserves what was observed and when.'
    },
    {
      num: '06',
      title: 'Instant & Unconditional Revocability',
      icon: RotateCcw,
      color: 'text-rose-400',
      summary: 'Disconnecting any source immediately terminates scheduled data acquisition.',
      details: 'Merchants retain complete sovereignty over connected data pipes. Disconnecting immediately cuts access tokens and halts background sentinels, while preserving historical audit logs under retention policy.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Dialog */}
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1 shadow-3xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Security & Trust Framework
              </span>
              <span className="text-xs font-mono text-stone-400">
                Ethical Data Stewardship
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-sans">
              The 6 AIXSHOP Connection Principles
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-xl leading-relaxed">
              How AIXSHOP guarantees enterprise data security, zero customer privacy exposure, 
              and cryptographic evidence integrity across all connected platforms.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map(p => {
            const Icon = p.icon;
            return (
              <div 
                key={p.num}
                className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-orange-200 transition-colors space-y-2 text-xs shadow-3xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white border border-stone-200 text-[#F97316] shadow-3xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-stone-400 font-bold">{p.num}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-bold shadow-3xs">
                    ENFORCED
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 pt-1">
                  {p.title}
                </h3>
                
                <p className="text-orange-800 font-bold text-[11px] leading-snug">
                  {p.summary}
                </p>

                <p className="text-stone-600 text-[11px] leading-relaxed pt-1">
                  {p.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs">
          <span className="font-mono text-[11px] text-stone-400">
            Cryptographic Provenance Model · ISO/IEC 27001 & SOC-2 Compliant Architecture
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
