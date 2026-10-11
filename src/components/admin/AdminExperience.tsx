import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Database, 
  Fingerprint, 
  FileCheck2, 
  ScrollText, 
  Compass, 
  AlertOctagon, 
  Lock, 
  FileSpreadsheet,
  Download,
  Terminal,
  Layers,
  ChevronRight
} from 'lucide-react';
import { AdminControlTowerPage } from './AdminControlTowerPage';

interface AdminExperienceProps {
  onNavigateMerchant?: () => void;
  onNavigateShopper?: () => void;
}

export const AdminExperience: React.FC<AdminExperienceProps> = ({
  onNavigateMerchant,
  onNavigateShopper
}) => {
  const [activeSection, setActiveSection] = useState<string>('all');

  const adminTabs = [
    { id: 'all', label: 'All Modules', icon: Layers },
    { id: 'pipeline', label: 'Pipeline', icon: Activity, badge: '8 Stages' },
    { id: 'sources', label: 'Sources', icon: Database, badge: '3 Connected' },
    { id: 'identity', label: 'Identity', icon: Fingerprint, badge: '24 SKUs' },
    { id: 'evidence', label: 'Evidence', icon: FileCheck2, badge: '194' },
    { id: 'observations', label: 'Observations', icon: ScrollText, badge: '384 Raw' },
    { id: 'discovery', label: 'Discovery', icon: Compass, badge: '79%' },
    { id: 'issues', label: 'Issues & Recovery', icon: AlertOctagon, badge: '8' },
    { id: 'audit', label: 'Security & Audit', icon: Lock, badge: 'Zero-Write' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveSection(tabId);
    if (tabId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetMap: Record<string, string> = {
      pipeline: 'pipeline-section',
      sources: 'source-registry-section',
      identity: 'identity-section',
      evidence: 'evidence-console-section',
      observations: 'observation-ledger-section',
      discovery: 'discovery-telemetry-section',
      issues: 'issues-recovery-section',
      audit: 'audit-trail-section'
    };
    const elId = targetMap[tabId];
    if (elId) {
      const el = document.getElementById(elId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Admin Top Control Bar (QRxMENU Rounded Pill Floating Format) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-100 text-orange-800 border border-orange-200">
                  ADMIN CONTROL TOWER (P15)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Pipeline: Healthy
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-800 bg-amber-50 border border-amber-200">
                  Zero-Write Mode Active
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-sans">
                System Governance & Observation Ledger
              </h1>
              <p className="text-xs text-stone-500 font-normal">
                Authoritative Multi-Source Corroboration Engine · Ingestion & Truth Ledger
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs">
              <div className="p-2.5 px-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-right">
                <span className="text-[10px] text-stone-400 block font-sans">Raw Signals</span>
                <span className="text-orange-600 font-bold">384 Obs</span>
              </div>
              <div className="p-2.5 px-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-right">
                <span className="text-[10px] text-stone-400 block font-sans">Corroborated</span>
                <span className="text-emerald-700 font-bold">194 Evid</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Admin Pill Sub-Navigation Bar */}
        <div className="mt-4 bg-white rounded-2xl p-2 border border-stone-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {adminTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. Main Admin Workspace View */}
      <main className="flex-1 pb-16">
        <AdminControlTowerPage
          hideHeader={true}
          onNavigateOverview={onNavigateMerchant || (() => {})}
          onNavigateProducts={onNavigateMerchant || (() => {})}
          onNavigateOffers={onNavigateMerchant || (() => {})}
          onNavigateIssues={onNavigateMerchant || (() => {})}
          onNavigateMonitoring={onNavigateMerchant || (() => {})}
          onNavigateIntegrations={onNavigateMerchant || (() => {})}
          onNavigateAnalytics={onNavigateMerchant || (() => {})}
          onNavigateBilling={onNavigateMerchant || (() => {})}
          onNavigateShopper={onNavigateShopper || (() => {})}
        />
      </main>

    </div>
  );
};
