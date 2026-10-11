import React, { useState } from 'react';
import { DashboardNavigationShell } from '../dashboard/DashboardNavigationShell';
import { BillingHeader } from './BillingHeader';
import { CurrentPlanHero } from './CurrentPlanHero';
import { CapacityUtilizationCard } from './CapacityUtilizationCard';
import { PlanComparisonSection } from './PlanComparisonSection';
import { UsageBreakdownSection } from './UsageBreakdownSection';
import { BillingPeriodAndHistorySection } from './BillingPeriodAndHistorySection';
import { PaymentMethodCard } from './PaymentMethodCard';
import { BillingTransparencySection } from './BillingTransparencySection';
import { BillingEventsTimeline } from './BillingEventsTimeline';
import { ReceiptPreviewModal } from './ReceiptPreviewModal';
import { PlanActionModal, PlanModalMode } from './PlanActionModal';
import { PaymentMethodModal } from './PaymentMethodModal';
import { currentSubscriptionData, canonicalPlans } from '../../data/sampleBillingData';
import { BillingPlan, BillingHistoryRecord } from '../../types/billing';

interface BillingPageProps {
  onNavigateHome?: () => void;
  onNavigateLanding?: () => void;
  onNavigateAnalysis?: () => void;
  onNavigateReport?: () => void;
  onNavigateOverview?: () => void;
  onNavigateDashboard?: () => void;
  onNavigateProducts?: () => void;
  onNavigateWorkbench?: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateFixWorkflow?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateBilling?: () => void;
  onSelectFuturePage?: (pageName: string, description: string) => void;
  onBoundaryClick?: (pageId: string, pageName: string, description: string) => void;
  hideNavShell?: boolean;
}

export const BillingPage: React.FC<BillingPageProps> = ({
  onNavigateHome,
  onNavigateLanding,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateOverview,
  onNavigateDashboard,
  onNavigateProducts,
  onNavigateWorkbench,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateFixWorkflow,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onSelectFuturePage,
  onBoundaryClick,
  hideNavShell = false
}) => {
  // Modal states
  const [selectedReceipt, setSelectedReceipt] = useState<BillingHistoryRecord | null>(null);
  const [planModalMode, setPlanModalMode] = useState<PlanModalMode>(null);
  const [targetPlan, setTargetPlan] = useState<BillingPlan | null>(null);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);

  // Handlers
  const handleOpenChangePlan = (plan?: BillingPlan) => {
    setTargetPlan(plan || canonicalPlans[0]); // default to Starter for change simulation if none selected
    setPlanModalMode('change_plan');
  };

  const handleOpenEnterpriseInquiry = () => {
    setPlanModalMode('enterprise_inquiry');
  };

  const handleOpenUpdateCycle = () => {
    setPlanModalMode('update_cycle');
  };

  const handleOpenCancelPreview = () => {
    setPlanModalMode('cancel_subscription');
  };

  const handleClosePlanModal = () => {
    setPlanModalMode(null);
    setTargetPlan(null);
  };

  const handleScrollToHistory = () => {
    const el = document.getElementById('billing-history-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPrinciples = () => {
    const el = document.getElementById('billing-principles-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col">
      {/* 1. Dashboard Navigation Shell */}
      <DashboardNavigationShell
        currentActive="billing"
        hideNavShell={hideNavShell}
        onNavigateHome={onNavigateHome}
        onNavigateLanding={onNavigateLanding}
        onNavigateAnalysis={onNavigateAnalysis || (() => {})}
        onNavigateReport={onNavigateReport || (() => {})}
        onNavigateOverview={onNavigateOverview}
        onNavigateDashboard={onNavigateDashboard}
        onNavigateProducts={onNavigateProducts}
        onNavigateWorkbench={onNavigateWorkbench}
        onNavigateOffers={onNavigateOffers}
        onNavigateDiscovery={onNavigateDiscovery}
        onNavigateMonitoring={onNavigateMonitoring}
        onNavigateIssues={onNavigateIssues}
        onNavigateFixWorkflow={onNavigateFixWorkflow}
        onNavigateShopper={onNavigateShopper}
        onNavigateIntegrations={onNavigateIntegrations}
        onNavigateAnalytics={onNavigateAnalytics}
        onNavigateBilling={onNavigateBilling}
        onSelectFuturePage={onSelectFuturePage}
        onBoundaryClick={onBoundaryClick}
      />

      {/* 2. Billing Header */}
      <BillingHeader
        onChangePlan={() => handleOpenChangePlan(canonicalPlans[0])}
        onViewHistory={handleScrollToHistory}
        onViewPrinciples={handleScrollToPrinciples}
      />

      {/* 3. Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top: Current Plan Hero */}
        <CurrentPlanHero
          subscription={currentSubscriptionData}
          onChangePlan={() => handleOpenChangePlan(canonicalPlans[0])}
          onUpdateCycle={handleOpenUpdateCycle}
          onCancelPreview={handleOpenCancelPreview}
          onNavigateProducts={onNavigateProducts}
          onNavigateAnalytics={onNavigateAnalytics}
        />

        {/* Capacity Utilization Card */}
        <CapacityUtilizationCard
          subscription={currentSubscriptionData}
          onNavigateProducts={onNavigateProducts}
          onNavigateOffers={onNavigateOffers}
          onNavigateWorkbench={onNavigateWorkbench}
        />

        {/* Plan Comparison Section */}
        <PlanComparisonSection
          currentPlanId={currentSubscriptionData.planId}
          onSelectPlan={(plan) => handleOpenChangePlan(plan)}
          onRequestEnterprise={handleOpenEnterpriseInquiry}
        />

        {/* Usage Breakdown (8 Dimensions) */}
        <UsageBreakdownSection
          subscription={currentSubscriptionData}
          onNavigateProducts={onNavigateProducts}
          onNavigateOffers={onNavigateOffers}
          onNavigateMonitoring={onNavigateMonitoring}
          onNavigateIssues={onNavigateIssues}
          onNavigateIntegrations={onNavigateIntegrations}
          onNavigateAnalytics={onNavigateAnalytics}
        />

        {/* Billing Period Timeline & History Records */}
        <BillingPeriodAndHistorySection
          subscription={currentSubscriptionData}
          onViewReceipt={(record) => setSelectedReceipt(record)}
        />

        {/* Two-Column: Payment Method + Billing Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6">
            <PaymentMethodCard
              subscription={currentSubscriptionData}
              onUpdatePaymentMethod={() => setIsPaymentMethodModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-6">
            <BillingEventsTimeline />
          </div>
        </div>

        {/* Billing Transparency & Commercial Trust Section */}
        <BillingTransparencySection />

      </main>

      {/* Modals */}
      <ReceiptPreviewModal
        record={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      <PlanActionModal
        mode={planModalMode}
        targetPlan={targetPlan}
        currentCycle={currentSubscriptionData.billingCycle}
        onClose={handleClosePlanModal}
      />

      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
      />
    </div>
  );
};
