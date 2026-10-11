// src/components/issues/IssuesPage.tsx
// Page 10 — Issues & Recovery Intelligence Workspace

import React, { useState, useMemo } from 'react';
import { 
  sampleIssuesData, 
  sampleIssuesMetrics 
} from '../../data/sampleIssuesData';
import { deriveIssuesMetrics } from '../../data/telemetrySelectors';
import { 
  IssueItem, 
  IssuesFilterState, 
  IssuesSortField, 
  IssuesSortDirection, 
  IssueRecoveryState, 
  IssueSeverity 
} from '../../types/issues';
import { IssuesHeader } from './IssuesHeader';
import { IssuesSummaryBar } from './IssuesSummaryBar';
import { IssuesStateDistribution } from './IssuesStateDistribution';
import { IssuesPrinciplesBanner } from './IssuesPrinciplesBanner';
import { IssuesFiltersBar } from './IssuesFiltersBar';
import { IssuesQueueTable } from './IssuesQueueTable';
import { IssueIntelligenceDrawer } from './IssueIntelligenceDrawer';
import { IssuesCompareModal } from './IssuesCompareModal';
import { IssuesExportModal } from './IssuesExportModal';

interface IssuesPageProps {
  onNavigateHome: () => void;
  onNavigateAnalysis?: () => void;
  onNavigateReport?: () => void;
  onNavigateOverview?: () => void;
  onNavigateProducts: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateFixWorkflow?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  hideNavShell?: boolean;
  issues?: IssueItem[];
  onUpdateIssue?: (issueId: string, updates: Partial<IssueItem>) => void;
}

export const IssuesPage: React.FC<IssuesPageProps> = ({
  onNavigateHome,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateFixWorkflow,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  hideNavShell = false,
  issues: propIssues,
  onUpdateIssue
}) => {
  // Master issues state (allows interactive verification updates in preview model)
  const [localIssues, setLocalIssues] = useState<IssueItem[]>(sampleIssuesData);
  const issues = propIssues || localIssues;

  // Filter state
  const [filters, setFilters] = useState<IssuesFilterState>({
    issueType: 'ALL',
    severity: 'ALL',
    evidenceState: 'ALL',
    recoveryState: 'ALL',
    buyerImpact: 'ALL',
    recoveryEligibility: 'ALL',
    searchQuery: ''
  });

  // Sort state
  const [sortField, setSortField] = useState<IssuesSortField>('priority');
  const [sortDirection, setSortDirection] = useState<IssuesSortDirection>('desc');

  // Active summary bar metric filter
  const [activeSummaryMetric, setActiveSummaryMetric] = useState<string | null>(null);

  // Selected issues for bulk actions
  const [selectedIssueIds, setSelectedIssueIds] = useState<Set<string>>(new Set());

  // Deep inspection drawer
  const [activeDrawerIssue, setActiveDrawerIssue] = useState<IssueItem | null>(null);

  // Comparison and Export modals
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Boundary modal for future unbuilt pages (Pages 11-15)
  const [futurePageModal, setFuturePageModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    pageNumber: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    pageNumber: ''
  });

  // Severity ranking for sorting
  const severityRank: Record<IssueSeverity, number> = {
    Critical: 5,
    High: 4,
    Medium: 3,
    Low: 2,
    Informational: 1
  };

  // Handle Summary Bar Metric Click Filters
  const handleFilterByMetric = (metricKey: 'open' | 'critical' | 'blocked' | 'eligible' | 'merchant' | 'resolved') => {
    if (activeSummaryMetric === metricKey) {
      // Toggle off
      setActiveSummaryMetric(null);
      setFilters(prev => ({
        ...prev,
        severity: 'ALL',
        recoveryState: 'ALL',
        recoveryEligibility: 'ALL'
      }));
      return;
    }

    setActiveSummaryMetric(metricKey);

    switch (metricKey) {
      case 'open':
        setFilters(prev => ({
          ...prev,
          recoveryState: 'Open'
        }));
        break;
      case 'critical':
        setFilters(prev => ({
          ...prev,
          severity: 'Critical'
        }));
        break;
      case 'blocked':
        setFilters(prev => ({
          ...prev,
          recoveryState: 'Blocked'
        }));
        break;
      case 'eligible':
        setFilters(prev => ({
          ...prev,
          recoveryEligibility: 'Eligible'
        }));
        break;
      case 'merchant':
        setFilters(prev => ({
          ...prev,
          recoveryEligibility: 'Merchant Required'
        }));
        break;
      case 'resolved':
        setFilters(prev => ({
          ...prev,
          recoveryState: 'Resolved'
        }));
        break;
    }
  };

  // Update specific filter fields
  const handleUpdateFilters = (updates: Partial<IssuesFilterState>) => {
    setActiveSummaryMetric(null);
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setActiveSummaryMetric(null);
    setFilters({
      issueType: 'ALL',
      severity: 'ALL',
      evidenceState: 'ALL',
      recoveryState: 'ALL',
      buyerImpact: 'ALL',
      recoveryEligibility: 'ALL',
      searchQuery: ''
    });
  };

  const handleUpdateSort = (field: IssuesSortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Checkbox bulk toggles
  const handleToggleSelect = (id: string) => {
    setSelectedIssueIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filtered & Sorted issues computation
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = issue.title.toLowerCase().includes(q);
        const matchSku = issue.productSku.toLowerCase().includes(q);
        const matchProd = issue.productName.toLowerCase().includes(q);
        const matchNum = issue.issueNumber.toLowerCase().includes(q);
        const matchReason = issue.diagnosticReason.toLowerCase().includes(q);
        const matchWhy = issue.whyItMatters.toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchProd && !matchNum && !matchReason && !matchWhy) {
          return false;
        }
      }

      // Issue Type
      if (filters.issueType !== 'ALL' && issue.issueType !== filters.issueType) {
        return false;
      }

      // Severity
      if (filters.severity !== 'ALL' && issue.severity !== filters.severity) {
        return false;
      }

      // Evidence State
      if (filters.evidenceState !== 'ALL' && issue.evidenceState !== filters.evidenceState) {
        return false;
      }

      // Recovery State
      if (filters.recoveryState !== 'ALL' && issue.recoveryState !== filters.recoveryState) {
        return false;
      }

      // Buyer Impact
      if (filters.buyerImpact !== 'ALL') {
        const impact = issue.buyerImpacts[filters.buyerImpact];
        if (!impact || impact.status !== 'Affected') {
          return false;
        }
      }

      // Recovery Eligibility
      if (filters.recoveryEligibility !== 'ALL' && issue.recoveryEligibility !== filters.recoveryEligibility) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'priority':
          comparison = a.deterministicPriority.score - b.deterministicPriority.score;
          break;
        case 'severity':
          comparison = (severityRank[a.severity] || 0) - (severityRank[b.severity] || 0);
          break;
        case 'detected':
          comparison = a.detectedAtTimestamp - b.detectedAtTimestamp;
          break;
        case 'product':
          comparison = a.productName.localeCompare(b.productName);
          break;
        case 'recoveryState':
          comparison = a.recoveryState.localeCompare(b.recoveryState);
          break;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [issues, filters, sortField, sortDirection]);

  // Bulk selection helpers
  const handleSelectAllVisible = () => {
    setSelectedIssueIds(new Set(filteredIssues.map(i => i.id)));
  };

  const handleDeselectAll = () => {
    setSelectedIssueIds(new Set());
  };

  const allVisibleSelected = 
    filteredIssues.length > 0 && 
    filteredIssues.every(i => selectedIssueIds.has(i.id));

  // Selected issues objects
  const selectedIssuesList = useMemo(() => {
    return issues.filter(i => selectedIssueIds.has(i.id));
  }, [issues, selectedIssueIds]);

  // Update issue state from drawer
  const handleUpdateIssueState = (issueId: string, updates: Partial<IssueItem>) => {
    if (onUpdateIssue) {
      onUpdateIssue(issueId, updates);
    } else {
      setLocalIssues(prev => prev.map(item => {
        if (item.id === issueId) {
          return { ...item, ...updates };
        }
        return item;
      }));
    }
    if (activeDrawerIssue?.id === issueId) {
      setActiveDrawerIssue(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  // Recompute live summary metrics based on actual state of issues via canonical selector
  const currentMetrics = useMemo(() => {
    return deriveIssuesMetrics(issues);
  }, [issues]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-orange-500/20 selection:text-orange-900">
      
      {/* Page Header (Section 4) */}
        <IssuesHeader
          searchQuery={filters.searchQuery}
          onSearchChange={q => handleUpdateFilters({ searchQuery: q })}
          onNavigateOverview={onNavigateOverview}
          onNavigateMonitoring={onNavigateMonitoring}
          onNavigateFixWorkflow={onNavigateFixWorkflow}
          onNavigateProducts={onNavigateProducts}
          onNavigateOffers={onNavigateOffers}
        />

        <main className="flex-1 space-y-5 pb-16">
          
          {/* Diagnostic Summary Bar (Section 5) */}
          <IssuesSummaryBar
            metrics={currentMetrics}
            activeFilterType={activeSummaryMetric}
            onFilterMetric={handleFilterByMetric}
          />

          {/* Issue Health & State Distribution (Section 6) */}
          <IssuesStateDistribution
            distribution={currentMetrics.stateDistribution}
            activeStateFilter={filters.recoveryState}
            onSelectStateFilter={state => handleUpdateFilters({ recoveryState: state })}
          />

          {/* Foundational Principle Banner: Change ≠ Issue & Recovery Pipeline (Section 3 & 22) */}
          <IssuesPrinciplesBanner />

          {/* Queue Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            {/* Multi-dimensional Filters & Bulk Actions Toolbar (Section 10 & 20) */}
            <IssuesFiltersBar
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              sortField={sortField}
              sortDirection={sortDirection}
              onUpdateSort={handleUpdateSort}
              totalFilteredCount={filteredIssues.length}
              selectedIssueIds={selectedIssueIds}
              onSelectAllVisible={handleSelectAllVisible}
              onDeselectAll={handleDeselectAll}
              allVisibleSelected={allVisibleSelected}
              onBulkReview={() => {
                if (selectedIssuesList.length > 0) {
                  setActiveDrawerIssue(selectedIssuesList[0]);
                }
              }}
              onBulkCompare={() => setIsCompareModalOpen(true)}
              onBulkExport={() => setIsExportModalOpen(true)}
            />

            {/* Main Issues Queue Table (Section 7, 8, 9) */}
            <IssuesQueueTable
              issues={filteredIssues}
              selectedIssueIds={selectedIssueIds}
              onToggleSelect={handleToggleSelect}
              onSelectIssue={issue => setActiveDrawerIssue(issue)}
              onOpenProductReport={onNavigateReport}
              onOpenFixWorkflow={onNavigateFixWorkflow}
            />

          </div>
        </main>

        {/* Deep Intelligence Drawer (Section 11-19) */}
        <IssueIntelligenceDrawer
          issue={activeDrawerIssue}
          onClose={() => setActiveDrawerIssue(null)}
          onUpdateIssueState={handleUpdateIssueState}
          onNavigateFixWorkflow={onNavigateFixWorkflow}
          onOpenProductReport={onNavigateReport}
          onNavigateWorkbench={onNavigateProducts}
          onNavigateOffers={onNavigateOffers}
          onNavigateDiscovery={() => {
            setFuturePageModal({
              isOpen: true,
              title: 'Discovery Intelligence (Page 08)',
              description: 'AI answer engine synthesis audits, structured intent discovery queries, and visibility tracking.',
              pageNumber: 'Page 08'
            });
          }}
        />

        {/* Bulk Comparison Modal (Section 20) */}
        <IssuesCompareModal
          issues={selectedIssuesList}
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectIssue={issue => {
            setIsCompareModalOpen(false);
            setActiveDrawerIssue(issue);
          }}
        />

        {/* Export Preview Modal (Section 21) */}
        <IssuesExportModal
          issues={selectedIssuesList.length > 0 ? selectedIssuesList : filteredIssues}
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />

        {/* Future Page Boundary Modal */}
        {futurePageModal.isOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200">
                  {futurePageModal.pageNumber} Boundary
                </span>
                <button
                  type="button"
                  onClick={() => setFuturePageModal(prev => ({ ...prev, isOpen: false }))}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  {futurePageModal.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {futurePageModal.description}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
                You are currently in <strong className="text-[#F97316]">Issues Queue</strong>. Downstream integration connector and channel sync surfaces will be constructed in subsequent iterations.
              </div>
              <button
                type="button"
                onClick={() => setFuturePageModal(prev => ({ ...prev, isOpen: false }))}
                className="w-full py-2.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-3xs"
              >
                Return to Issues Queue
              </button>
            </div>
          </div>
        )}

      </div>
  );
};
