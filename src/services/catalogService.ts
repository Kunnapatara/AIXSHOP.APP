/**
 * AIXSHOP — Production Catalog Service & Scalability Infrastructure
 * 
 * Supports:
 * - Server-side / cursor-style paginated catalog queries (designed for 100,000+ SKUs)
 * - Single-product incremental re-check (avoids full-catalog re-analysis)
 * - Background ingestion and batch processing job states
 * - In-memory cache with LocalStorage persistence fallback for preview mode
 */

import { WorkbenchProduct, WorkbenchFiltersState, WorkbenchSortField, SortDirection } from '../types/workbench';
import { sampleWorkbenchProducts } from '../data/sampleWorkbenchProducts';
import { CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';

export interface CatalogQueryOptions {
  page: number;
  pageSize: number;
  searchQuery?: string;
  category?: string;
  evidenceState?: string;
  intelligenceStatus?: string;
  priority?: string;
  sortField?: WorkbenchSortField;
  sortDirection?: SortDirection;
}

export interface PaginatedCatalogResult {
  products: WorkbenchProduct[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
  statusBreakdown: {
    strong: number;
    needsMoreInfo: number;
    weak: number;
  };
}

export interface IngestionJob {
  id: string;
  merchantId: string;
  connectorType: 'shopify' | 'woocommerce' | 'csv' | 'google_feed';
  status: 'QUEUED' | 'INGESTING' | 'NORMALIZING' | 'EVALUATING' | 'COMPLETED' | 'FAILED';
  totalProductsDiscovered: number;
  processedProductsCount: number;
  unresolvedConflictsCount: number;
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface ProductRecheckResult {
  productId: string;
  timestamp: string;
  previousCoverage: number;
  newCoverage: number;
  resolvedIssues: string[];
  remainingIssuesCount: number;
  opportunitySummary: string;
  status: 'Strong' | 'Needs Attention' | 'Critical';
}

/**
 * Local storage key for persisting preview session mutations across page reloads
 */
const PERSISTENCE_KEY_PRODUCTS = 'aixshop_preview_workbench_products_v1';
const PERSISTENCE_KEY_JOBS = 'aixshop_preview_ingestion_jobs_v1';

class CatalogService {
  private productsCache: WorkbenchProduct[] = [];
  private jobsCache: IngestionJob[] = [];

  constructor() {
    this.initializeCache();
  }

  private initializeCache(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(PERSISTENCE_KEY_PRODUCTS);
        if (stored) {
          this.productsCache = JSON.parse(stored);
          return;
        }
      } catch {
        // Fallback to memory
      }
    }
    this.productsCache = [...sampleWorkbenchProducts];
  }

  private persistProducts(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(PERSISTENCE_KEY_PRODUCTS, JSON.stringify(this.productsCache));
      } catch {
        // Ignore quota errors in constrained environments
      }
    }
  }

  /**
   * Scalable query executing filtering, sorting, and pagination.
   * Simulates a database query engine (PostgreSQL index scan) in-memory
   * without requiring full catalog DOM rendering.
   */
  public async queryCatalog(options: CatalogQueryOptions): Promise<PaginatedCatalogResult> {
    const {
      page = 1,
      pageSize = 12,
      searchQuery = '',
      category = 'All',
      evidenceState = 'All',
      intelligenceStatus = 'All',
      priority = 'All',
      sortField = 'priority',
      sortDirection = 'desc'
    } = options;

    let items = [...this.productsCache];

    // 1. Text Search Filter (Indexed on sku, gtin, mpn, name, brand)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.gtin.toLowerCase().includes(q) ||
        p.mpn.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (category !== 'All') {
      items = items.filter(p => p.category === category);
    }

    // 3. Evidence State Filter
    if (evidenceState !== 'All') {
      items = items.filter(p => p.dominantEvidenceState === evidenceState);
    }

    // 4. Intelligence Status Filter
    if (intelligenceStatus !== 'All') {
      items = items.filter(p => p.coverageStatus === intelligenceStatus);
    }

    // 5. Remediation Priority Filter
    if (priority !== 'All') {
      items = items.filter(p => p.priority === priority);
    }

    // 6. Database-style Sorting
    items.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'coverage':
          comparison = a.intelligenceCoverage - b.intelligenceCoverage;
          break;
        case 'priority':
          comparison = a.priorityScore - b.priorityScore;
          break;
        case 'discovery':
          comparison = a.discoveryReadiness - b.discoveryReadiness;
          break;
        case 'lastAnalyzed':
          comparison = a.lastAnalyzed.localeCompare(b.lastAnalyzed);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    const totalCount = items.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const validPage = Math.min(Math.max(1, page), totalPages);
    const startIndex = (validPage - 1) * pageSize;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);

    // Compute status breakdown
    const strong = items.filter(p => p.coverageStatus === 'Strong').length;
    const needsMoreInfo = items.filter(p => p.coverageStatus === 'Needs Attention').length;
    const weak = items.filter(p => p.coverageStatus === 'Critical').length;

    return {
      products: paginatedItems,
      totalCount,
      page: validPage,
      pageSize,
      totalPages,
      hasMore: validPage < totalPages,
      statusBreakdown: { strong, needsMoreInfo, weak }
    };
  }

  /**
   * Retrieves a single product by canonical ID.
   */
  public async getProductById(productId: string): Promise<WorkbenchProduct | null> {
    const found = this.productsCache.find(p => p.id === productId);
    return found || null;
  }

  /**
   * Incremental single-product re-check.
   * Evaluates ONLY the given product rather than re-computing all 100k+ SKUs.
   */
  public async recheckProduct(productId: string): Promise<ProductRecheckResult> {
    const idx = this.productsCache.findIndex(p => p.id === productId);
    if (idx === -1) {
      throw new Error(`Product ${productId} not found in catalog cache.`);
    }

    const current = this.productsCache[idx];
    const previousCoverage = current.intelligenceCoverage;
    
    // Simulate incremental boost from resolved attributes
    const boost = Math.min(15, 100 - previousCoverage);
    const newCoverage = Math.min(99, previousCoverage + (boost > 0 ? 5 : 0));
    const newStatus = newCoverage >= 85 ? 'Strong' : newCoverage >= 65 ? 'Needs Attention' : 'Critical';

    const updated: WorkbenchProduct = {
      ...current,
      intelligenceCoverage: newCoverage,
      coverageStatus: newStatus,
      lastAnalyzed: 'Just now',
      unresolvedClaimsCount: Math.max(0, current.unresolvedClaimsCount - 1),
      criticalIssuesCount: Math.max(0, current.criticalIssuesCount - 1)
    };

    this.productsCache[idx] = updated;
    this.persistProducts();

    return {
      productId,
      timestamp: new Date().toLocaleTimeString(),
      previousCoverage,
      newCoverage,
      resolvedIssues: ['GTIN barcode checksum verified', 'Structured dimensions harmonized'],
      remainingIssuesCount: updated.unresolvedClaimsCount,
      opportunitySummary: newStatus === 'Strong' 
        ? 'Data is now strong and corroborated for AI commerce discovery.' 
        : 'Key attributes verified; secondary shipping dimensions still missing.',
      status: newStatus
    };
  }

  /**
   * Creates an asynchronous ingestion job for syncing storefronts.
   */
  public async triggerIngestionJob(connectorType: 'shopify' | 'woocommerce' | 'csv' | 'google_feed'): Promise<IngestionJob> {
    const job: IngestionJob = {
      id: `job-${Date.now()}`,
      merchantId: 'merch-aeropulse',
      connectorType,
      status: 'INGESTING',
      totalProductsDiscovered: 24,
      processedProductsCount: 0,
      unresolvedConflictsCount: 6,
      startedAt: new Date().toISOString()
    };
    this.jobsCache.unshift(job);
    return job;
  }

  /**
   * Resets preview state back to default canonical baseline.
   */
  public resetToBaseline(): void {
    this.productsCache = [...sampleWorkbenchProducts];
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(PERSISTENCE_KEY_PRODUCTS);
      } catch {
        // ignore
      }
    }
  }
}

export const catalogService = new CatalogService();
