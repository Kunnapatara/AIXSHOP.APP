// src/components/admin/ProductIdentityAndOfferSection.tsx
import React, { useState } from 'react';
import { 
  Layers, 
  Split, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  GitMerge, 
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';
import { sampleAdminIdentities } from '../../data/sampleAdminData';
import { AdminProductIdentityRecord } from '../../types/admin';

interface ProductIdentityAndOfferSectionProps {
  onTriggerBoundaryModal: (actionTitle: string, actionDesc?: string) => void;
}

export const ProductIdentityAndOfferSection: React.FC<ProductIdentityAndOfferSectionProps> = ({
  onTriggerBoundaryModal
}) => {
  const [selectedIdentity, setSelectedIdentity] = useState<AdminProductIdentityRecord>(sampleAdminIdentities[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Product Identity Resolution Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
                  Product Identity Resolution
                </h3>
                <p className="text-xs text-stone-500">
                  Parent-child clustering across 24 products & 68 variants
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTriggerBoundaryModal('Rebuild Identity Resolution Graph', 'Rebuilding the canonical identity graph recalculates all cryptographic variant hashes.')}
              className="px-3.5 py-1.5 text-xs font-mono font-bold bg-white hover:bg-stone-50 text-stone-700 rounded-xl border border-stone-200 shadow-3xs transition-colors cursor-pointer"
            >
              Rebuild Graph (Boundary)
            </button>
          </div>

          {/* Identity Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-4 text-center font-mono">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 shadow-3xs">
              <span className="text-[10px] text-stone-500 uppercase font-sans">Resolved Products</span>
              <div className="text-lg font-bold text-emerald-700 mt-0.5 font-mono">24 / 24</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 shadow-3xs">
              <span className="text-[10px] text-stone-500 uppercase font-sans">Resolved Variants</span>
              <div className="text-lg font-bold text-[#F97316] mt-0.5 font-mono">68 SKUs</div>
            </div>
            <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 shadow-3xs">
              <span className="text-[10px] text-amber-800 uppercase font-sans font-semibold">Review Required</span>
              <div className="text-lg font-bold text-amber-800 mt-0.5 font-mono">1 Collision</div>
            </div>
          </div>

          {/* Representative Identity Records */}
          <div className="space-y-2 mt-4">
            {sampleAdminIdentities.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedIdentity(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-3xs ${
                  selectedIdentity.id === item.id
                    ? 'bg-orange-50/40 border-[#F97316]/50 shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-[#F97316] font-bold">{item.canonicalId}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-3xs ${
                    item.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {item.status} ({item.confidence}%)
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-900 tracking-tight font-sans">
                  {item.productName}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 font-sans">
                  {item.statusReason}
                </div>

                {/* Sub-variant agreement preview */}
                <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-stone-500">Child Variants: {item.variantCount}</span>
                  <div className="flex items-center gap-1.5">
                    {item.variants.map((v) => (
                      <span
                        key={v.variantId}
                        className={`w-2 h-2 rounded-full ${v.gtinAgreement ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}
                        title={`${v.sku} - ${v.gtinAgreement ? 'GTIN Agreed' : 'GTIN Conflict'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Identity Footer Contract */}
        <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 font-mono shadow-3xs">
          Identity Invariant: Variants map deterministically to one parent canonical ID. Duplicate candidates: <span className="text-emerald-700 font-bold">0</span>.
        </div>
      </div>

      {/* 2. Product ≠ Offer Separation Governance Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shadow-3xs shrink-0">
                <Split className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-sans tracking-tight">
                  Product ≠ Offer Separation
                </h3>
                <p className="text-xs text-stone-500">
                  Architectural isolation between intrinsic facts & transient market listings
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-50 text-[#F97316] border border-orange-200 shadow-3xs">
              ARCHITECTURAL WALL ACTIVE
            </span>
          </div>

          {/* Core Governance Mandate */}
          <div className="mt-4 p-3.5 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-orange-950 flex items-start gap-2.5 shadow-3xs">
            <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <strong className="text-orange-900 font-bold">Absolute Invariant:</strong> A seller's price or temporary discount does not become a permanent product attribute. Product specifications and seller offers exist in separate database graphs.
            </div>
          </div>

          {/* The Two Graph Architecture */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
            {/* Graph 1: Product Graph */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 shadow-3xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-900 font-bold uppercase">1. Product Graph</span>
                <span className="text-[10px] text-[#F97316] font-bold">Intrinsic Spec</span>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-700 font-sans text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  Canonical Identity (MPN, Brand)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  Physical Specifications (Drop, Stack)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  Material Composition (Carbon, Foam)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  Child Variants & Sizing Geometry
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  Verifiable Evidence Provenance
                </li>
              </ul>
              <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-500 italic">
                Scope: Brand Owner / Manufacturer Truth
              </div>
            </div>

            {/* Graph 2: Offer Graph */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5 shadow-3xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-900 font-bold uppercase">2. Offer Graph</span>
                <span className="text-[10px] text-stone-500 font-bold">Commercial Snapshot</span>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-700 font-sans text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  Seller Identity (Official vs Authorized)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  Current Selling Price & Currency
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  Live Stock Availability & Lead Time
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  Shipping Speed & Return Policy Window
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  Observed Timestamp & Snapshot Freshness
                </li>
              </ul>
              <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-500 italic">
                Scope: 42 Observed Seller Listings
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Page Reference */}
        <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between shadow-3xs">
          <span>Cross-Page Alignment:</span>
          <span className="text-[#F97316] font-mono font-bold">Enforced across P03, P07, P11 & P14</span>
        </div>
      </div>
    </div>
  );
};
