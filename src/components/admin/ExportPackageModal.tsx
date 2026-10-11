// src/components/admin/ExportPackageModal.tsx
import React, { useState } from 'react';
import { Download, X, FileJson, FileSpreadsheet, Check, Copy } from 'lucide-react';
import { sampleAdminEvidenceRecords, sampleAdminConflicts, sampleAdminSources } from '../../data/sampleAdminData';
import { CANONICAL_PRODUCT_ID } from '../../data/canonicalCatalog';

interface ExportPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportPackageModal: React.FC<ExportPackageModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeFormat, setActiveFormat] = useState<'json' | 'csv'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const previewPackage = {
    metadata: {
      generated_at: new Date().toISOString(),
      system: 'AIXSHOP Control Tower Evidence Console',
      data_state: 'REPRESENTATIVE_PREVIEW',
      merchant_canonical_id: 'MER-AEROPULSE-001',
      merchant_name: 'AeroPulse Athletics, Inc.',
      export_scope: 'Evidence Records + Active Sources + Preserved Conflicts',
      integrity_signature: 'sha256:d82f7c00e19a4f21'
    },
    sources_summary: sampleAdminSources.map(s => ({ id: s.id, name: s.name, state: s.state, authority: s.defaultAuthorityLevel })),
    evidence_records_sample: sampleAdminEvidenceRecords.map(e => ({
      id: e.id,
      product_id: e.productId,
      attribute: e.attribute,
      value: e.value,
      source: e.sourceName,
      state: e.state,
      confidence: e.confidence,
      authority_level: e.authorityLevel
    })),
    conflicts_summary: sampleAdminConflicts.map(c => ({
      id: c.id,
      category: c.category,
      product: c.productName,
      attribute: c.attribute,
      sourceA: c.sourceA.value,
      sourceB: c.sourceB.value,
      state: c.resolutionState
    }))
  };

  const jsonString = JSON.stringify(previewPackage, null, 2);

  const csvString = `data_state,evidence_id,product_id,attribute,value,source,state,confidence,authority_level
REPRESENTATIVE_PREVIEW,EVD-9841,${CANONICAL_PRODUCT_ID},Heel-to-Toe Drop,8 mm,Merchant Ground Truth,MERCHANT_VERIFIED,99,1
REPRESENTATIVE_PREVIEW,EVD-9842,${CANONICAL_PRODUCT_ID},Product Weight (Men US 9),198 g,Shopify Storefront,OBSERVED,92,2
REPRESENTATIVE_PREVIEW,EVD-9843,${CANONICAL_PRODUCT_ID},Cushioning Classification,Maximum Responsive,AIXSHOP Derived Engine,DERIVED,84,6
REPRESENTATIVE_PREVIEW,EVD-9844,${CANONICAL_PRODUCT_ID},GTIN-13 Barcode,Disagreement,Google Merchant Feed,CONFLICT,45,3
REPRESENTATIVE_PREVIEW,EVD-9845,${CANONICAL_PRODUCT_ID},Merchant Return Policy Window,Missing / Unspecified,Google Merchant Feed,MISSING,10,3`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFormat === 'json' ? jsonString : csvString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFormat === 'json' ? jsonString : csvString], { 
      type: activeFormat === 'json' ? 'application/json' : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aixshop_evidence_package_preview.${activeFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 text-stone-900 flex flex-col max-h-[90vh]">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#F97316] rounded-t-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-50 text-[#F97316] border border-orange-200 shadow-3xs mb-1.5">
              <Download className="w-3 h-3" />
              Evidence Provenance Export
            </div>
            <h3 className="text-lg font-extrabold text-stone-900 font-sans tracking-tight">
              Export Evidence Package (Preview)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured machine-readable snapshot containing data state: <code className="text-[#F97316] font-mono font-semibold">REPRESENTATIVE_PREVIEW</code>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setActiveFormat('json')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFormat === 'json'
                  ? 'bg-white text-[#F97316] border border-stone-200 shadow-3xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              JSON Package
            </button>
            <button
              type="button"
              onClick={() => setActiveFormat('csv')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFormat === 'csv'
                  ? 'bg-white text-[#F97316] border border-stone-200 shadow-3xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              CSV Dataset
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-3xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Payload'}
          </button>
        </div>

        {/* Code Preview Box */}
        <div className="mt-3.5 flex-1 overflow-auto bg-stone-900 border border-stone-800 rounded-2xl p-4 font-mono text-[11px] text-stone-200 leading-relaxed max-h-72 select-all shadow-inner">
          <pre>{activeFormat === 'json' ? jsonString : csvString}</pre>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
          <div className="text-[11px] text-stone-500">
            Audit Hash: <span className="font-mono text-[#F97316] font-semibold">sha256:d82f7c00e19a4f21</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-500 hover:text-stone-800 font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4.5 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download {activeFormat.toUpperCase()} Snapshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
