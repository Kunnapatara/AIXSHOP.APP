// src/components/analytics/AnalyticsPage.tsx
import React, { useState } from 'react';
import { AnalyticsHeader } from './AnalyticsHeader';
import { AnalyticsKpiBar } from './AnalyticsKpiBar';
import { IntelligenceCoverageCard } from './IntelligenceCoverageCard';
import { EvidenceAnalyticsCard } from './EvidenceAnalyticsCard';
import { ConflictIssueRecoverySection } from './ConflictIssueRecoverySection';
import { OffersAndMonitoringSection } from './OffersAndMonitoringSection';
import { IntentAndDiscoverySection } from './IntentAndDiscoverySection';
import { SourceContributionAndFunnelSection } from './SourceContributionAndFunnelSection';
import { ProductAnalyticsAndRisksSection } from './ProductAnalyticsAndRisksSection';
import { ExportPreviewModal } from './ExportPreviewModal';
import { DefinitionsGuideModal } from './DefinitionsGuideModal';

import { sampleAnalyticsData } from '../../data/sampleAnalyticsData';
import { TimeRangeOption } from '../../types/analytics';
import { EvidenceState } from '../../types/landing';

interface AnalyticsPageProps {
  onNavigateOverview: () => void;
  onNavigateProducts: () => void;
  onNavigateOffers: () => void;
  onNavigateMonitoring: () => void;
  onNavigateIssues: () => void;
  onNavigateIntegrations: () => void;
  onNavigateReport: () => void;
  onNavigateWorkbench: () => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateIntegrations,
  onNavigateReport,
  onNavigateWorkbench
}) => {
  // Page Local State
  const [selectedRange, setSelectedRange] = useState<TimeRangeOption>('representative');
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isDefinitionsOpen, setIsDefinitionsOpen] = useState<boolean>(false);
  const [activeFilterNotice, setActiveFilterNotice] = useState<string | null>(null);

  // Filter handlers
  const handleFilterByKpi = (kpiKey: string) => {
    if (kpiKey === 'coverage') {
      setActiveFilterNotice('Filtered: Highlighting Intelligence Coverage dimensions below.');
    } else if (kpiKey === 'evidence') {
      setActiveFilterNotice('Filtered: Highlighting Grounded Evidence distribution below.');
    }
    setTimeout(() => setActiveFilterNotice(null), 4000);
  };

  const handleSelectEvidenceState = (state: EvidenceState) => {
    setActiveFilterNotice(`Filtered: Showing details for evidence state "${state}".`);
    setTimeout(() => setActiveFilterNotice(null), 4000);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveFilterNotice(`Focusing metrics on product: ${productId}`);
    setTimeout(() => setActiveFilterNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-orange-500/20 selection:text-[#F97316]">
      {/* 1. Header with Controls and Representative Badging */}
      <AnalyticsHeader
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        selectedProductId={selectedProductId}
        onProductChange={setSelectedProductId}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenDefinitions={() => setIsDefinitionsOpen(true)}
        onNavigateOverview={onNavigateOverview}
      />

      {/* 2. Top Summary KPI Bar (6 Core Metrics) */}
      <AnalyticsKpiBar
        kpis={sampleAnalyticsData.summaryKPIs}
        onFilterByKpi={handleFilterByKpi}
        onNavigateIssues={onNavigateIssues}
        onNavigateProducts={onNavigateProducts}
        onOpenDefinitions={() => setIsDefinitionsOpen(true)}
      />

      {/* Temporary Filter Notice if active */}
      {activeFilterNotice && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 sm:px-6 py-2 text-xs text-stone-800 flex items-center justify-between animate-in fade-in">
          <span className="font-medium text-[#F97316]">{activeFilterNotice}</span>
          <button 
            type="button"
            onClick={() => setActiveFilterNotice(null)}
            className="text-[11px] font-bold text-stone-500 hover:text-stone-900 underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Row 1: Intelligence Coverage & Evidence Health */}
        <section aria-label="Coverage and Evidence Health">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IntelligenceCoverageCard
              progression={sampleAnalyticsData.coverageProgression}
              dimensions={sampleAnalyticsData.coverageDimensions}
              onNavigateProducts={onNavigateProducts}
            />

            <EvidenceAnalyticsCard
              distribution={sampleAnalyticsData.evidenceDistribution}
              trend={sampleAnalyticsData.evidenceTrend}
              onSelectState={handleSelectEvidenceState}
              onNavigateIssues={onNavigateIssues}
              onNavigateReport={onNavigateReport}
            />
          </div>
        </section>

        {/* Row 2: Intelligence Conflicts, Change Diagnosis, Issue Lifecycle, and Recovery */}
        <section aria-label="Conflicts and Recovery Workflows">
          <ConflictIssueRecoverySection
            conflicts={sampleAnalyticsData.conflicts}
            issueLifecycle={sampleAnalyticsData.issueLifecycle}
            recovery={sampleAnalyticsData.recovery}
            changeDiagnosis={sampleAnalyticsData.changeDiagnosis}
            onNavigateIssues={onNavigateIssues}
            onNavigateMonitoring={onNavigateMonitoring}
          />
        </section>

        {/* Row 3: Offers Intelligence & Continuous Monitoring Activity */}
        <section aria-label="Offers and Monitoring">
          <OffersAndMonitoringSection
            offers={sampleAnalyticsData.offers}
            monitoringCategories={sampleAnalyticsData.monitoringCategories}
            onNavigateOffers={onNavigateOffers}
            onNavigateMonitoring={onNavigateMonitoring}
          />
        </section>

        {/* Row 4: Buyer Intent Coverage & Discovery Readiness */}
        <section aria-label="Intent and Discovery Readiness">
          <IntentAndDiscoverySection
            intents={sampleAnalyticsData.buyerIntents}
            intentGaps={sampleAnalyticsData.intentGaps}
            discoverySurfaces={sampleAnalyticsData.discoverySurfaces}
            discoveryTrend={sampleAnalyticsData.discoveryTrend}
            onNavigateReport={onNavigateReport}
            onNavigateIssues={onNavigateIssues}
            onNavigateWorkbench={onNavigateWorkbench}
          />
        </section>

        {/* Row 5: Data Quality Funnel & Integration Source Contribution */}
        <section aria-label="Data Pipeline and Sources">
          <SourceContributionAndFunnelSection
            funnel={sampleAnalyticsData.dataQualityFunnel}
            sources={sampleAnalyticsData.sourceContributions}
            sourceHealth={sampleAnalyticsData.sourceHealth}
            onNavigateIntegrations={onNavigateIntegrations}
          />
        </section>

        {/* Row 6: Intelligence Risks & Product-Level Table */}
        <section aria-label="Product Analytics and Intelligence Risks">
          <ProductAnalyticsAndRisksSection
            risks={sampleAnalyticsData.intelligenceRisks}
            products={sampleAnalyticsData.productAnalytics}
            onNavigateIssues={onNavigateIssues}
            onNavigateProducts={onNavigateProducts}
            onNavigateReport={onNavigateReport}
            onSelectProduct={handleSelectProduct}
          />
        </section>
      </main>

      {/* Modals */}
      <ExportPreviewModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <DefinitionsGuideModal
        isOpen={isDefinitionsOpen}
        onClose={() => setIsDefinitionsOpen(false)}
      />
    </div>
  );
};
