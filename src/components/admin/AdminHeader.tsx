// src/components/admin/AdminHeader.tsx
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Download, 
  BookOpen, 
  Server, 
  Info, 
  Terminal, 
  ExternalLink,
  ChevronDown,
  LayoutDashboard,
  Box,
  Layers,
  AlertCircle
} from 'lucide-react';

interface AdminHeaderProps {
  onNavigateOverview: () => void;
  onNavigateProducts: () => void;
  onNavigateOffers: () => void;
  onNavigateIssues: () => void;
  onNavigateMonitoring: () => void;
  onNavigateIntegrations: () => void;
  onNavigateAnalytics: () => void;
  onNavigateBilling: () => void;
  onNavigateShopper: () => void;
  onOpenExportModal: () => void;
  onOpenPolicyModal: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateIssues,
  onNavigateMonitoring,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onNavigateShopper,
  onOpenExportModal,
  onOpenPolicyModal
}) => {
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [showIntegrityTooltip, setShowIntegrityTooltip] = useState(false);

  return (
    <header className="relative w-full border-b border-stone-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-5 shadow-3xs">
      {/* Top Banner: Truth Mode & Merchant Separation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          {/* Back to Merchant Overview */}
          <button
            type="button"
            onClick={onNavigateOverview}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#F97316] transition-colors cursor-pointer py-1 px-2.5 rounded-xl hover:bg-stone-100 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Merchant Overview (P05)</span>
          </button>

          <span className="text-stone-300">|</span>

          {/* Separation Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-stone-100 text-stone-700 border border-stone-200 shadow-3xs">
            <Terminal className="w-3 h-3 text-stone-500" />
            Internal Governance Surface · Admin Only
          </div>
        </div>

        {/* Status indicator with strict disclaimer */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowIntegrityTooltip(true)}
              onMouseLeave={() => setShowIntegrityTooltip(false)}
              onClick={() => setShowIntegrityTooltip(!showIntegrityTooltip)}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer shadow-3xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM INTEGRITY · PREVIEW
              <Info className="w-3 h-3 text-emerald-600 ml-0.5" />
            </button>

            {/* Tooltip */}
            {showIntegrityTooltip && (
              <div className="absolute right-0 top-full mt-2 w-72 p-3.5 bg-white border border-stone-200 rounded-2xl text-xs text-stone-700 shadow-xl z-40">
                <p className="font-bold text-stone-900 mb-1">Representative System State</p>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  Production infrastructure telemetry is not connected in this environment. Values reflect canonical governance benchmarks.
                </p>
              </div>
            )}
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 font-medium shadow-3xs">
            Simulation Mode
          </span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-2xl text-[#F97316] shadow-3xs">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 font-sans">
                  Admin Control Tower
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase rounded-full bg-stone-100 text-stone-700 border border-stone-200 shadow-3xs">
                  Page 15
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold shadow-3xs">
                  AIXSHOP System
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                System-wide intelligence integrity, evidence provenance, and operational governance.
              </p>
            </div>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Fast Navigation to other pages */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 rounded-xl border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shadow-3xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Jump to Page...</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {isNavDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl p-2 z-30 space-y-0.5 text-xs text-stone-700"
                onMouseLeave={() => setIsNavDropdownOpen(false)}
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase text-stone-400 border-b border-stone-200 mb-1">
                  Merchant Workspace Pages
                </div>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateOverview(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P05 Merchant Overview</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateProducts(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P06 Products Workbench</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateOffers(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P07 Offers & Pricing</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateMonitoring(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P09 Continuous Monitoring</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateIssues(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P10 Issues & Recovery</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateIntegrations(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P12 Ingestion & Sources</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateAnalytics(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P13 Intelligence Analytics</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateBilling(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P14 Billing & Quotas</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsNavDropdownOpen(false); onNavigateShopper(); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-stone-100 hover:text-[#F97316] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>P11 Shopper View</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </button>
              </div>
            )}
          </div>

          {/* View Conflict Policy */}
          <button
            type="button"
            onClick={onOpenPolicyModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 rounded-xl border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shadow-3xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Conflict Policy</span>
          </button>

          {/* Export Evidence Package */}
          <button
            type="button"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Evidence Package</span>
          </button>
        </div>
      </div>
    </header>
  );
};
