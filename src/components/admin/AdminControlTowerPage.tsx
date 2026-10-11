// src/components/admin/AdminControlTowerPage.tsx
import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { SystemStatusBanner } from './SystemStatusBanner';
import { AdminKpiBar } from './AdminKpiBar';
import { SystemPipelineView } from './SystemPipelineView';
import { SourceRegistrySection } from './SourceRegistrySection';
import { EvidenceConsoleSection } from './EvidenceConsoleSection';
import { EvidenceInspectionDrawer } from './EvidenceInspectionDrawer';
import { ConflictControlCenter } from './ConflictControlCenter';
import { ProductIdentityAndOfferSection } from './ProductIdentityAndOfferSection';
import { ObservationLedgerSection } from './ObservationLedgerSection';
import { IssueAndRecoverySection } from './IssueAndRecoverySection';
import { BuyerIntentAndDiscoverySection } from './BuyerIntentAndDiscoverySection';
import { DataQualityFunnelAndRiskSection } from './DataQualityFunnelAndRiskSection';
import { AuditTrailAndSecuritySection } from './AuditTrailAndSecuritySection';
import { ContractAndGovernanceFooter } from './ContractAndGovernanceFooter';
import { AdminBoundaryModal } from './AdminBoundaryModal';
import { ExportPackageModal } from './ExportPackageModal';
import { AdminEvidenceRecord } from '../../types/admin';

interface AdminControlTowerPageProps {
  onNavigateOverview: () => void;
  onNavigateProducts: () => void;
  onNavigateOffers: () => void;
  onNavigateIssues: () => void;
  onNavigateMonitoring: () => void;
  onNavigateIntegrations: () => void;
  onNavigateAnalytics: () => void;
  onNavigateBilling: () => void;
  onNavigateShopper: () => void;
  hideHeader?: boolean;
}

export const AdminControlTowerPage: React.FC<AdminControlTowerPageProps> = ({
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateIssues,
  onNavigateMonitoring,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onNavigateShopper,
  hideHeader = false
}) => {
  // Modal states
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [boundaryModalConfig, setBoundaryModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    title: '',
    description: ''
  });

  // Selected Evidence Record Drawer
  const [inspectedEvidence, setInspectedEvidence] = useState<AdminEvidenceRecord | null>(null);

  // Trigger Boundary Modal Helper
  const triggerBoundaryModal = (actionTitle: string, actionDesc?: string) => {
    setBoundaryModalConfig({
      isOpen: true,
      title: actionTitle,
      description: actionDesc
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-orange-500/20 selection:text-orange-950">
      {/* 1. Header with Jump Navigation, Badges & Truth Indicator */}
      {!hideHeader && (
        <AdminHeader
          onNavigateOverview={onNavigateOverview}
          onNavigateProducts={onNavigateProducts}
          onNavigateOffers={onNavigateOffers}
          onNavigateIssues={onNavigateIssues}
          onNavigateMonitoring={onNavigateMonitoring}
          onNavigateIntegrations={onNavigateIntegrations}
          onNavigateAnalytics={onNavigateAnalytics}
          onNavigateBilling={onNavigateBilling}
          onNavigateShopper={onNavigateShopper}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenPolicyModal={() => {
            // Scroll or trigger conflict policy focus
            const el = document.getElementById('conflict-center');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Workspace Surface */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* 2. High-Visibility System Integrity Panel (Section 6) */}
        <SystemStatusBanner />

        {/* 3. Control Tower KPI Diagnostics (Section 7) */}
        <AdminKpiBar
          onFilterByConflict={() => {
            const el = document.getElementById('conflict-center');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onFilterByIssues={() => {
            const el = document.getElementById('issues-recovery-section') || document.getElementById('issues-governance');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onFilterByEvidence={() => {
            const el = document.getElementById('evidence-console-section') || document.getElementById('evidence-console');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onFilterBySources={() => {
            const el = document.getElementById('source-registry-section') || document.getElementById('source-registry');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Visual Pipeline View (Section 8) */}
        <div id="pipeline-section">
          <SystemPipelineView />
        </div>

        {/* 5. Source Registry & Authority Hierarchy (Sections 9 & 10) */}
        <div id="source-registry-section">
          <SourceRegistrySection onTriggerBoundaryModal={triggerBoundaryModal} />
        </div>

        {/* 6. Evidence Console (Section 11) */}
        <div id="evidence-console-section">
          <EvidenceConsoleSection
            onSelectRecord={(rec) => setInspectedEvidence(rec)}
            onTriggerBoundaryModal={triggerBoundaryModal}
          />
        </div>

        {/* 7. Conflict Control Center (Sections 13 & 14) */}
        <div id="conflict-center">
          <ConflictControlCenter onTriggerBoundaryModal={triggerBoundaryModal} />
        </div>

        {/* 8. Product Identity Resolution & Product ≠ Offer Separation (Sections 15 & 16) */}
        <div id="identity-section">
          <ProductIdentityAndOfferSection onTriggerBoundaryModal={triggerBoundaryModal} />
        </div>

        {/* 9. Observation Ledger (Section 17: Change ≠ Issue) */}
        <div id="observation-ledger-section">
          <ObservationLedgerSection />
        </div>

        {/* 10. Issue Governance & Recovery Classes (Sections 18 & 19) */}
        <div id="issues-recovery-section">
          <IssueAndRecoverySection
            onTriggerBoundaryModal={triggerBoundaryModal}
            onNavigateIssues={onNavigateIssues}
          />
        </div>

        {/* 11. Buyer Intent & Discovery Surface Integrity (Sections 20 & 21) */}
        <div id="discovery-telemetry-section">
          <BuyerIntentAndDiscoverySection />
        </div>

        {/* 12. Data Quality Funnel & Intelligence Risk Register (Sections 22 & 23) */}
        <div id="data-quality-section">
          <DataQualityFunnelAndRiskSection onTriggerBoundaryModal={triggerBoundaryModal} />
        </div>

        {/* 13. Audit Trail & Security Enforcements (Sections 24 & 25) */}
        <div id="audit-trail-section">
          <AuditTrailAndSecuritySection onTriggerBoundaryModal={triggerBoundaryModal} />
        </div>

        {/* 14. The AIXSHOP Intelligence Contract (Section 26) */}
        <ContractAndGovernanceFooter />
      </main>

      {/* Slide-over Evidence Inspection Drawer (Section 12) */}
      <EvidenceInspectionDrawer
        isOpen={!!inspectedEvidence}
        onClose={() => setInspectedEvidence(null)}
        record={inspectedEvidence}
        onTriggerBoundaryModal={triggerBoundaryModal}
      />

      {/* Production Boundary Modal (Sections 27 & 28) */}
      <AdminBoundaryModal
        isOpen={boundaryModalConfig.isOpen}
        onClose={() => setBoundaryModalConfig(prev => ({ ...prev, isOpen: false }))}
        actionTitle={boundaryModalConfig.title}
        actionDescription={boundaryModalConfig.description}
      />

      {/* Export Evidence Package Modal (Section 29) */}
      <ExportPackageModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
