import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Database, 
  Activity, 
  Info,
  Check
} from 'lucide-react';
import { IntegrationSource } from '../../types/integrations';
import { sampleIntegrationSources } from '../../data/sampleIntegrationsData';

interface ConnectionFlowModalProps {
  initialSource?: IntegrationSource | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteConnect: (sourceId: string) => void;
}

export const ConnectionFlowModal: React.FC<ConnectionFlowModalProps> = ({
  initialSource,
  isOpen,
  onClose,
  onCompleteConnect
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSource, setSelectedSource] = useState<IntegrationSource>(
    initialSource || sampleIntegrationSources[0]
  );
  const [storeDomain, setStoreDomain] = useState<string>('shop.aeropulse.com');
  const [agreedToZeroPii, setAgreedToZeroPii] = useState<boolean>(true);

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteConnect(selectedSource.id);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 space-y-6 z-10">
        
        {/* Header with Step Progress */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 shadow-3xs">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs font-mono text-stone-400">
                Authorization Flow Preview
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-stone-900 font-sans">
              {currentStep === 1 && 'Select Product Data Origin'}
              {currentStep === 2 && 'Inspect Least-Privilege Permissions'}
              {currentStep === 3 && 'Define Catalog Scope & Handshake'}
              {currentStep === 4 && 'Ingestion Preview & Sentinel Activation'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="grid grid-cols-4 gap-2">
          {['Source', 'Permissions', 'Scope', 'Ingest & Activate'].map((label, idx) => (
            <div key={idx} className="space-y-1">
              <div className={`h-1.5 rounded-full transition-all ${
                currentStep >= idx + 1 ? 'bg-[#F97316]' : 'bg-stone-200'
              }`} />
              <div className={`text-[10px] font-mono truncate ${
                currentStep === idx + 1 ? 'text-orange-800 font-bold' : 'text-stone-400'
              }`}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* STEP 1: Select Source */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-stone-500">
              Choose which commercial platform or structured feed to connect. AIXSHOP communicates directly with 
              authenticated APIs and structured formats.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {sampleIntegrationSources.map(src => (
                <div
                  key={src.id}
                  onClick={() => setSelectedSource(src)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedSource.id === src.id
                      ? 'bg-orange-50/70 border-orange-400 shadow-3xs'
                      : 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#F97316] uppercase font-bold">
                      {src.categoryLabel}
                    </span>
                    {selectedSource.id === src.id && (
                      <Check className="w-4 h-4 text-[#F97316]" />
                    )}
                  </div>
                  <div className="font-bold text-stone-900 text-xs">{src.name}</div>
                  <div className="text-[11px] text-stone-500 leading-tight mt-1 truncate">
                    {src.provider}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Permissions Review */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Customer PII Policy Guaranteed</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                No customer names, email addresses, order shipping addresses, or credit card records will ever be requested.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-stone-400 font-bold">
                Requested Scopes for {selectedSource.name}:
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {selectedSource.readPermissions.map((perm, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-800 font-medium">{perm.name}</span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-orange-50 text-orange-800 border border-orange-200 font-bold shadow-3xs">
                      READ ONLY
                    </span>
                  </div>
                ))}
                <div className="p-2.5 rounded-xl bg-stone-50/60 border border-stone-200 flex items-center justify-between text-xs opacity-75">
                  <span className="text-stone-500 font-medium">Write / Mutate Catalog Listings</span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-stone-200 text-stone-600 font-medium">
                    DISABLED (OFF)
                  </span>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-stone-700 pt-1 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToZeroPii} 
                onChange={e => setAgreedToZeroPii(e.target.checked)}
                className="rounded border-stone-300 text-[#F97316] focus:ring-orange-500 cursor-pointer"
              />
              <span>Acknowledge least-privilege read access and zero customer data policy.</span>
            </label>
          </div>
        )}

        {/* STEP 3: Define Scope */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <p className="text-stone-500">
              Confirm the domain endpoint and product catalog namespace to bind for this representative integration.
            </p>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-stone-400 uppercase font-semibold">Primary Store Domain</label>
              <input
                type="text"
                value={storeDomain}
                onChange={e => setStoreDomain(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 font-mono text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 font-mono text-[11px]">
              <div className="text-stone-400 uppercase text-[10px] font-semibold">Catalog Namespace Preview:</div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Target Merchant:</span>
                <span className="text-stone-900 font-bold">AeroPulse Athletics</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Catalog Size:</span>
                <span className="text-orange-800 font-bold">24 Representative Products (68 Variants)</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Canonical Anchor:</span>
                <span className="text-emerald-700 font-bold">GS1 Universal GTIN Barcodes</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 text-[11px] text-orange-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
              <span>
                <strong>Preview Handshake:</strong> No external network credentials are required. Clicking Continue will simulate the initial catalog ingestion.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: Ingestion Preview & Activate */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono uppercase text-stone-400 text-[10px] font-bold">
                  Simulated Ingestion Results
                </span>
                <span className="text-emerald-700 font-mono font-bold text-[10px]">
                  ALL CHECKS PASSED
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Products</div>
                  <div className="text-sm font-bold text-stone-900">24</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Variants</div>
                  <div className="text-sm font-bold text-stone-900">68</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Offers</div>
                  <div className="text-sm font-bold text-blue-700">42</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Evidence</div>
                  <div className="text-sm font-bold text-emerald-700">183</div>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-2 space-y-1.5 font-mono text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GTIN GS1 identity resolved for all items</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                  <Activity className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Continuous ground-truth sentinel activated (15m interval)</span>
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-xs">
              Activating this connection will transition {selectedSource.name} to <strong className="text-stone-800">CONNECTED</strong> in the integrations workspace.
            </p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
              currentStep === 1 
                ? 'opacity-30 cursor-not-allowed text-stone-400' 
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <span>{currentStep === totalSteps ? 'Activate Connection Preview' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
