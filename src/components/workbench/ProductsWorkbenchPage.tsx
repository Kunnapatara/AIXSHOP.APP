import React, { useState, useMemo } from 'react';
import { sampleWorkbenchProducts } from '../../data/sampleWorkbenchProducts';
import { CANONICAL_PRODUCT_ID } from '../../data/canonicalCatalog';
import { 
  WorkbenchProduct, 
  WorkbenchFiltersState, 
  WorkbenchSortField, 
  SortDirection,
  IntelligenceStatus,
  WorkbenchCategory,
  RemediationPriority
} from '../../types/workbench';
import { FuturePageBoundaryModal } from '../dashboard/FuturePageBoundaryModal';
import { WorkbenchHeader } from './WorkbenchHeader';
import { WorkbenchSummaryBar } from './WorkbenchSummaryBar';
import { WorkbenchFilters } from './WorkbenchFilters';
import { WorkbenchProductTable } from './WorkbenchProductTable';
import { ProductIntelligenceDrawer } from './ProductIntelligenceDrawer';
import { EvidenceCompositionModal } from './EvidenceCompositionModal';
import { BulkActionBar } from './BulkActionBar';
import { BulkReviewModal } from './BulkReviewModal';
import { BulkCompareModal } from './BulkCompareModal';
import { BulkExportModal } from './BulkExportModal';

interface ProductsWorkbenchPageProps {
  onBackToLanding: () => void;
  onNavigateAnalysis: () => void;
  onNavigateReport: () => void;
  onNavigateOverview: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onSelectProductDetail?: (productId: string) => void;
  hideNavShell?: boolean;
}

export const ProductsWorkbenchPage: React.FC<ProductsWorkbenchPageProps> = ({
  onBackToLanding,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateOverview,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onSelectProductDetail,
  hideNavShell = false
}) => {
  // All 24 representative products
  const allProducts = sampleWorkbenchProducts;

  // Filter State
  const [filters, setFilters] = useState<WorkbenchFiltersState>({
    searchQuery: '',
    intelligenceStatus: 'All',
    evidenceState: 'All',
    coverageRange: 'All',
    category: 'All',
    priority: 'All',
    discoveryStatus: 'All'
  });

  // Sort State
  const [sortField, setSortField] = useState<WorkbenchSortField>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // View Mode: Catalog View vs Priority View
  const [viewMode, setViewMode] = useState<'catalog' | 'priority'>('catalog');

  // Pagination State (12 items per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  // Selection State
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Drawer & Modals State
  const [activeDrawerProduct, setActiveDrawerProduct] = useState<WorkbenchProduct | null>(null);
  const [activeEvidenceModalProduct, setActiveEvidenceModalProduct] = useState<WorkbenchProduct | null>(null);
  const [isBulkReviewOpen, setIsBulkReviewOpen] = useState<boolean>(false);
  const [isBulkCompareOpen, setIsBulkCompareOpen] = useState<boolean>(false);
  const [isBulkExportOpen, setIsBulkExportOpen] = useState<boolean>(false);

  // Future Page Boundary Modal State
  const [futurePageModal, setFuturePageModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: '',
    description: ''
  });

  // Filter Handler
  const handleFilterChange = (key: keyof WorkbenchFiltersState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      intelligenceStatus: 'All',
      evidenceState: 'All',
      coverageRange: 'All',
      category: 'All',
      priority: 'All',
      discoveryStatus: 'All'
    });
    setCurrentPage(1);
  };

  // Sort Handler
  const handleSortChange = (field: WorkbenchSortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // View Mode Handler
  const handleViewModeChange = (mode: 'catalog' | 'priority') => {
    setViewMode(mode);
    if (mode === 'priority') {
      setSortField('priority');
      setSortDirection('desc');
    } else {
      setSortField('name');
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Filter and Sort Data
  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter(product => {
      // Search query across name, brand, model, SKU, GTIN, MPN, category
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesGtin = product.gtin.toLowerCase().includes(query);
        const matchesMpn = product.mpn.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesEvidence = product.evidenceSummary.toLowerCase().includes(query);
        const matchesIssues = product.topIssues.some(issue => issue.toLowerCase().includes(query));

        if (!matchesName && !matchesBrand && !matchesSku && !matchesGtin && !matchesMpn && !matchesCategory && !matchesEvidence && !matchesIssues) {
          return false;
        }
      }

      // Intelligence Status
      if (filters.intelligenceStatus !== 'All' && product.coverageStatus !== filters.intelligenceStatus) {
        return false;
      }

      // Evidence State
      if (filters.evidenceState !== 'All' && product.dominantEvidenceState !== filters.evidenceState) {
        return false;
      }

      // Coverage Range
      if (filters.coverageRange === '90%+' && product.intelligenceCoverage < 90) return false;
      if (filters.coverageRange === '70-89%' && (product.intelligenceCoverage < 70 || product.intelligenceCoverage >= 90)) return false;
      if (filters.coverageRange === 'Below 70%' && product.intelligenceCoverage >= 70) return false;

      // Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Priority
      if (filters.priority !== 'All' && product.priority !== filters.priority) {
        return false;
      }

      // Discovery Status
      if (filters.discoveryStatus !== 'All' && product.discoveryStatus !== filters.discoveryStatus) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'priority':
          comparison = b.priorityScore - a.priorityScore;
          break;
        case 'coverage':
          comparison = b.intelligenceCoverage - a.intelligenceCoverage;
          break;
        case 'conflicts':
          comparison = b.evidenceBreakdown.conflict - a.evidenceBreakdown.conflict;
          break;
        case 'gaps':
          comparison = b.evidenceBreakdown.missing - a.evidenceBreakdown.missing;
          break;
        case 'discovery':
          comparison = b.discoveryReadiness - a.discoveryReadiness;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'lastAnalyzed':
          comparison = a.id.localeCompare(b.id);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });

    return result;
  }, [allProducts, filters, sortField, sortDirection]);

  // Selection Handlers
  const handleToggleSelectProduct = (productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleToggleSelectAllVisible = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + pageSize);
    const currentIds = currentProducts.map(p => p.id);

    const isAllVisibleSelected = currentIds.every(id => selectedProductIds.includes(id));

    if (isAllVisibleSelected) {
      setSelectedProductIds(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      setSelectedProductIds(prev => Array.from(new Set([...prev, ...currentIds])));
    }
  };

  const handleClearSelection = () => {
    setSelectedProductIds([]);
  };

  const selectedProducts = useMemo(() => {
    return allProducts.filter(p => selectedProductIds.includes(p.id));
  }, [allProducts, selectedProductIds]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col pb-20">
      {/* Products Workbench Header */}
      <WorkbenchHeader
        onBackToOverview={onNavigateOverview}
        onAnalyzeProduct={onBackToLanding}
        totalProductsCount={allProducts.length}
      />

      {/* Main Workbench Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Catalog Summary Bar (6 consistent metrics matching Page 05) */}
        <WorkbenchSummaryBar
          totalCount={24}
          strongCount={10}
          needsAttentionCount={9}
          criticalCount={5}
          coveragePercentage={78}
          conflictsCount={6}
          onFilterByStatus={(status) => {
            handleFilterChange('intelligenceStatus', status);
          }}
          activeStatusFilter={filters.intelligenceStatus}
        />

        {/* Filters, Search, View Mode Toggle & Sorters */}
        <WorkbenchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          filteredCount={filteredAndSortedProducts.length}
          totalCount={allProducts.length}
        />

        {/* Product Table (Intelligence-Oriented Workbench) */}
        <WorkbenchProductTable
          products={filteredAndSortedProducts}
          selectedProductIds={selectedProductIds}
          onToggleSelectProduct={handleToggleSelectProduct}
          onToggleSelectAllVisible={handleToggleSelectAllVisible}
          onSelectProductRow={(product) => setActiveDrawerProduct(product)}
          onOpenEvidenceModal={(product) => setActiveEvidenceModalProduct(product)}
          onResetFilters={handleResetFilters}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>

      {/* Slide-Over Product Intelligence Preview Drawer */}
      <ProductIntelligenceDrawer
        product={activeDrawerProduct}
        isOpen={!!activeDrawerProduct}
        onClose={() => setActiveDrawerProduct(null)}
        onOpenReport={() => {
          if (activeDrawerProduct && onSelectProductDetail) {
            onSelectProductDetail(activeDrawerProduct.id);
          } else {
            onNavigateReport();
          }
        }}
        onOpenFixVerification={() => {
          if (onNavigateIssues) {
            onNavigateIssues();
          }
        }}
        onOpenVaporStrideReport={() => {
          if (onSelectProductDetail) {
            onSelectProductDetail(CANONICAL_PRODUCT_ID);
          } else {
            onNavigateReport();
          }
        }}
      />

      {/* Evidence Composition Modal */}
      <EvidenceCompositionModal
        product={activeEvidenceModalProduct}
        isOpen={!!activeEvidenceModalProduct}
        onClose={() => setActiveEvidenceModalProduct(null)}
        onOpenReport={onNavigateReport}
      />

      {/* Bulk Action Bar (Floating pill when items selected) */}
      <BulkActionBar
        selectedProducts={selectedProducts}
        onClearSelection={handleClearSelection}
        onReviewSelected={() => setIsBulkReviewOpen(true)}
        onCompareIntelligence={() => setIsBulkCompareOpen(true)}
        onExportPreview={() => setIsBulkExportOpen(true)}
      />

      {/* Bulk Review Modal */}
      <BulkReviewModal
        selectedProducts={selectedProducts}
        isOpen={isBulkReviewOpen}
        onClose={() => setIsBulkReviewOpen(false)}
        onInspectProduct={(p) => setActiveDrawerProduct(p)}
      />

      {/* Bulk Compare Modal */}
      <BulkCompareModal
        selectedProducts={selectedProducts}
        isOpen={isBulkCompareOpen}
        onClose={() => setIsBulkCompareOpen(false)}
        onInspectProduct={(p) => setActiveDrawerProduct(p)}
      />

      {/* Bulk Export Modal */}
      <BulkExportModal
        selectedProducts={selectedProducts}
        isOpen={isBulkExportOpen}
        onClose={() => setIsBulkExportOpen(false)}
      />

      {/* Future Page Boundary Modal (For unbuilt roadmap pages) */}
      <FuturePageBoundaryModal
        isOpen={futurePageModal.isOpen}
        onClose={() => setFuturePageModal(prev => ({ ...prev, isOpen: false }))}
        pageTitle={futurePageModal.title}
        pageDescription={futurePageModal.description}
      />
    </div>
  );
};
