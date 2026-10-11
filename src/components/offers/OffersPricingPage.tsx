import React, { useState, useMemo } from 'react';
import { DashboardNavigationShell } from '../dashboard/DashboardNavigationShell';
import { FuturePageBoundaryModal } from '../dashboard/FuturePageBoundaryModal';
import { OffersHeader } from './OffersHeader';
import { OffersSummaryBar } from './OffersSummaryBar';
import { PriceIntelligenceModelBanner } from './PriceIntelligenceModelBanner';
import { PriceComparisonSection } from './PriceComparisonSection';
import { OfferConflictsSection } from './OfferConflictsSection';
import { OffersFiltersBar } from './OffersFiltersBar';
import { OffersTable } from './OffersTable';
import { OfferEvidenceHealthSection } from './OfferEvidenceHealthSection';
import { OfferDetailDrawer } from './OfferDetailDrawer';
import { ExportOffersModal } from './ExportOffersModal';

import { 
  sampleCommercialOffers, 
  sampleProductOfferGroups,
  offersSummaryMetrics 
} from '../../data/sampleOffersData';
import { 
  CommercialOffer, 
  ProductOfferGroup,
  OfferFiltersState, 
  OfferSortField, 
  OfferSortDirection 
} from '../../types/offers';

interface OffersPricingPageProps {
  onNavigateLanding: () => void;
  onNavigateAnalysis: () => void;
  onNavigateReport: () => void;
  onNavigateFixWorkflow: () => void;
  onNavigateDashboard: () => void;
  onNavigateWorkbench: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  hideNavShell?: boolean;
}

export const OffersPricingPage: React.FC<OffersPricingPageProps> = ({
  onNavigateLanding,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateFixWorkflow,
  onNavigateDashboard,
  onNavigateWorkbench,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  hideNavShell = false
}) => {
  // Modal for future page boundaries (Pages 08–15)
  const [boundaryModalInfo, setBoundaryModalInfo] = useState<{
    isOpen: boolean;
    pageId: string;
    pageName: string;
    description: string;
  }>({
    isOpen: false,
    pageId: '',
    pageName: '',
    description: ''
  });

  // Export Modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Selected offer for Slide-over detail drawer
  const [selectedOffer, setSelectedOffer] = useState<CommercialOffer | null>(null);

  // View mode: 'grouped' (default) vs 'flat'
  const [viewMode, setViewMode] = useState<'grouped' | 'flat'>('grouped');

  // Filter state
  const [filters, setFilters] = useState<OfferFiltersState>({
    searchQuery: '',
    seller: 'All',
    offerState: 'All',
    availability: 'All',
    priceCondition: 'All',
    confidence: 'All',
    issueStatus: 'All',
    onlyPromotions: false,
    onlyConflicts: false
  });

  // Sorting state
  const [sortField, setSortField] = useState<OfferSortField>('observedAt');
  const [sortDirection, setSortDirection] = useState<OfferSortDirection>('desc');

  // Handle future boundary clicks from global navigation
  const handleBoundaryClick = (pageId: string, pageName: string, description: string) => {
    setBoundaryModalInfo({
      isOpen: true,
      pageId,
      pageName,
      description
    });
  };

  // Quick filter from summary cards
  const handleFilterBySummary = (type: 'all' | 'conflicts' | 'missing' | 'promotions' | 'products') => {
    if (type === 'all') {
      setFilters({
        searchQuery: '',
        seller: 'All',
        offerState: 'All',
        availability: 'All',
        priceCondition: 'All',
        confidence: 'All',
        issueStatus: 'All',
        onlyPromotions: false,
        onlyConflicts: false
      });
    } else if (type === 'conflicts') {
      setFilters(prev => ({ ...prev, onlyConflicts: true, onlyPromotions: false }));
    } else if (type === 'missing') {
      setFilters(prev => ({ ...prev, offerState: 'MISSING', onlyConflicts: false }));
    } else if (type === 'promotions') {
      setFilters(prev => ({ ...prev, onlyPromotions: true, onlyConflicts: false }));
    } else if (type === 'products') {
      setViewMode('grouped');
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      seller: 'All',
      offerState: 'All',
      availability: 'All',
      priceCondition: 'All',
      confidence: 'All',
      issueStatus: 'All',
      onlyPromotions: false,
      onlyConflicts: false
    });
  };

  const handleSort = (field: OfferSortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtered offers list
  const filteredOffers = useMemo(() => {
    return sampleCommercialOffers.filter((offer) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          offer.productName.toLowerCase().includes(query) ||
          offer.brand.toLowerCase().includes(query) ||
          offer.sku.toLowerCase().includes(query) ||
          offer.gtin.toLowerCase().includes(query) ||
          offer.seller.toLowerCase().includes(query) ||
          offer.sellerType.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Seller
      if (filters.seller !== 'All') {
        if (filters.seller === 'Authorized Retailer') {
          if (offer.sellerType !== 'Authorized Retailer') return false;
        } else if (filters.seller === 'Marketplace Seller') {
          if (offer.sellerType !== 'Marketplace Seller') return false;
        } else if (filters.seller === 'Third-Party Reseller') {
          if (offer.sellerType !== 'Third-Party Reseller') return false;
        } else if (offer.seller !== filters.seller) {
          return false;
        }
      }

      // Offer State
      if (filters.offerState !== 'All' && offer.dominantEvidenceState !== filters.offerState) {
        return false;
      }

      // Availability
      if (filters.availability !== 'All' && offer.availability !== filters.availability) {
        return false;
      }

      // Price Condition
      if (filters.priceCondition !== 'All') {
        if (filters.priceCondition === 'Promotional' && !offer.promotion.hasPromotion) return false;
        if (filters.priceCondition === 'Normal' && offer.priceCondition !== 'Normal') return false;
      }

      // Confidence
      if (filters.confidence !== 'All' && offer.confidence !== filters.confidence) {
        return false;
      }

      // Issue Status
      if (filters.issueStatus !== 'All') {
        if (filters.issueStatus === 'No Issue' && offer.issues.length > 0) return false;
        if (filters.issueStatus === 'Needs Review' && offer.issues.length === 0) return false;
        if (filters.issueStatus === 'Conflict' && offer.dominantEvidenceState !== 'CONFLICT') return false;
        if (filters.issueStatus === 'Missing Evidence' && offer.dominantEvidenceState !== 'MISSING') return false;
      }

      // Quick Toggles
      if (filters.onlyPromotions && !offer.promotion.hasPromotion) return false;
      if (filters.onlyConflicts && offer.dominantEvidenceState !== 'CONFLICT' && offer.issues.length === 0) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'product':
          comparison = a.productName.localeCompare(b.productName);
          break;
        case 'seller':
          comparison = a.seller.localeCompare(b.seller);
          break;
        case 'price':
          comparison = (a.offerPrice || 0) - (b.offerPrice || 0);
          break;
        case 'availability':
          comparison = a.availability.localeCompare(b.availability);
          break;
        case 'confidence':
          comparison = a.confidence.localeCompare(b.confidence);
          break;
        case 'observedAt':
          comparison = a.observedAt.localeCompare(b.observedAt);
          break;
        case 'issueSeverity':
          comparison = b.issues.length - a.issues.length;
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filters, sortField, sortDirection]);

  // Grouped offers by product based on filteredOffers
  const filteredProductGroups = useMemo<ProductOfferGroup[]>(() => {
    // Map existing groups filtered by the remaining offers
    const offerIdsSet = new Set(filteredOffers.map(o => o.id));

    const result: ProductOfferGroup[] = [];
    for (const group of sampleProductOfferGroups) {
      const matchingOffers = group.offers.filter(o => offerIdsSet.has(o.id));
      if (matchingOffers.length === 0) continue;

      const validPrices = matchingOffers
        .map(o => o.offerPrice)
        .filter((p): p is number => typeof p === 'number' && !isNaN(p));
      const lowest = validPrices.length > 0 ? Math.min(...validPrices) : null;
      const highest = validPrices.length > 0 ? Math.max(...validPrices) : null;
      const spread = (lowest !== null && highest !== null) ? highest - lowest : null;

      result.push({
        ...group,
        offers: matchingOffers,
        observedOffersCount: matchingOffers.length,
        lowestPrice: lowest,
        highestPrice: highest,
        spread: spread
      });
    }
    return result;
  }, [filteredOffers]);

  return (
    <DashboardNavigationShell
      currentPage="offers"
      hideNavShell={hideNavShell}
      onNavigateLanding={onNavigateLanding}
      onNavigateAnalysis={onNavigateAnalysis}
      onNavigateReport={onNavigateReport}
      onNavigateFixWorkflow={onNavigateFixWorkflow}
      onNavigateDashboard={onNavigateDashboard}
      onNavigateWorkbench={onNavigateWorkbench}
      onNavigateOffers={() => {}}
      onNavigateDiscovery={onNavigateDiscovery}
      onNavigateMonitoring={onNavigateMonitoring}
      onNavigateIssues={onNavigateIssues}
      onNavigateShopper={onNavigateShopper}
      onNavigateIntegrations={onNavigateIntegrations}
      onNavigateAnalytics={onNavigateAnalytics}
      onBoundaryClick={handleBoundaryClick}
    >
      <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-orange-500/20 selection:text-orange-900">
        
        {/* Page 07 Header */}
        <OffersHeader
          onBackToOverview={onNavigateDashboard}
          onNavigateProducts={onNavigateWorkbench}
          onAnalyzeProduct={onNavigateAnalysis}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          totalOffersCount={sampleCommercialOffers.length}
          totalProductsCount={sampleProductOfferGroups.length}
        />

        {/* Diagnostic Metric Summary Bar */}
        <OffersSummaryBar
          onFilterByStatus={handleFilterBySummary}
          activeQuickFilter={filters.onlyConflicts ? 'conflicts' : filters.onlyPromotions ? 'promotions' : filters.offerState === 'MISSING' ? 'missing' : undefined}
        />

        {/* Educational Foundation: Time-Dependency & Product != Offer Law */}
        <PriceIntelligenceModelBanner />

        {/* Product-Level Price Comparison & Dispersion Analyzer */}
        <PriceComparisonSection
          productGroups={sampleProductOfferGroups}
          onSelectOffer={(offer) => setSelectedOffer(offer)}
        />

        {/* Intelligence Conflicts & Evidence Gaps */}
        <OfferConflictsSection
          offers={sampleCommercialOffers}
          onInspectOffer={(offer) => setSelectedOffer(offer)}
        />

        {/* Filter and Control Bar */}
        <OffersFiltersBar
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalOffers={sampleCommercialOffers.length}
          filteredOffersCount={filteredOffers.length}
          filteredProductsCount={filteredProductGroups.length}
        />

        {/* Main Intelligence Table (Grouped or Flat) */}
        <OffersTable
          offers={filteredOffers}
          productGroups={filteredProductGroups}
          viewMode={viewMode}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectOffer={(offer) => setSelectedOffer(offer)}
          onNavigateReport={onNavigateReport}
        />

        {/* Evidence Health Proportion & Diagnostic Insights */}
        <OfferEvidenceHealthSection />

        {/* Slide-over Offer Detail Drawer */}
        <OfferDetailDrawer
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onNavigateReport={onNavigateReport}
          onNavigateFixWorkflow={() => {
            setSelectedOffer(null);
            onNavigateFixWorkflow();
          }}
        />

        {/* Export Payload Modal */}
        <ExportOffersModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          offers={sampleCommercialOffers}
        />

        {/* Future Page Boundary Modal (Pages 08–15) */}
        <FuturePageBoundaryModal
          isOpen={boundaryModalInfo.isOpen}
          onClose={() => setBoundaryModalInfo(prev => ({ ...prev, isOpen: false }))}
          pageId={boundaryModalInfo.pageId}
          pageName={boundaryModalInfo.pageName}
          description={boundaryModalInfo.description}
          onNavigateBack={() => setBoundaryModalInfo(prev => ({ ...prev, isOpen: false }))}
        />

      </div>
    </DashboardNavigationShell>
  );
};
