// src/components/analytics/ExportPreviewModal.tsx
import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Code2, 
  ShieldCheck 
} from 'lucide-react';
import { sampleAnalyticsData } from '../../data/sampleAnalyticsData';

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportPreviewModal: React.FC<ExportPreviewModalProps> = ({
  isOpen,
  onClose
}) => {
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate formatted export content
  const jsonContent = JSON.stringify({
    metadata: {
      generatedAt: new Date().toISOString(),
      merchant: 'AeroPulse Athletics',
      mode: 'PREVIEW_REPRESENTATIVE_DATA',
      schemaVersion: '1.0.0'
    },
    summaryKPIs: sampleAnalyticsData.summaryKPIs,
    coverageProgression: sampleAnalyticsData.coverageProgression,
    evidenceDistribution: sampleAnalyticsData.evidenceDistribution,
    conflicts: sampleAnalyticsData.conflicts,
    issueLifecycle: sampleAnalyticsData.issueLifecycle,
    recovery: sampleAnalyticsData.recovery,
    offers: sampleAnalyticsData.offers,
    buyerIntents: sampleAnalyticsData.buyerIntents,
    discoverySurfaces: sampleAnalyticsData.discoverySurfaces,
    productAnalytics: sampleAnalyticsData.productAnalytics
  }, null, 2);

  const csvHeader = 'ProductID,ProductName,SKU,Variants,CoveragePct,EvidencePct,Issues,Conflicts,DiscoveryPct\n';
  const csvRows = sampleAnalyticsData.productAnalytics.map(p => 
    `"${p.productId}","${p.productName}","${p.sku}",${p.variantsCount},${p.intelligenceCoveragePercentage},${p.evidenceCompletenessPercentage},${p.issuesCount},${p.conflictsCount},${p.discoveryReadinessPercentage}`
  ).join('\n');
  const csvContent = csvHeader + csvRows;

  const currentExportText = format === 'json' ? jsonContent : csvContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentExportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentExportText], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aeropulse-analytics-export.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-[#F97316] border border-orange-200 shadow-3xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Export Analytics Preview</h3>
              <p className="text-xs text-stone-500">
                Representative intelligence data formatted for downstream consumption.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Select & Warning Banner */}
        <div className="px-6 py-3 bg-stone-50/60 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFormat('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                format === 'json'
                  ? 'bg-[#F97316] text-white font-bold shadow-xs'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>JSON Payload</span>
            </button>
            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                format === 'csv'
                  ? 'bg-[#F97316] text-white font-bold shadow-xs'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CSV Spreadsheet</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#F97316] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Representative Telemetry</span>
          </div>
        </div>

        {/* Code / Content Preview Window */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-stone-900 text-stone-200">
          <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 overflow-x-auto whitespace-pre leading-relaxed selection:bg-orange-500/30 selection:text-[#F97316]">
            {currentExportText}
          </pre>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 bg-stone-50">
          <span className="text-[11px] text-stone-500 font-medium">
            {format === 'json' ? 'Full nested schema' : '4 representative product rows'}
          </span>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold transition-colors cursor-pointer shadow-3xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
