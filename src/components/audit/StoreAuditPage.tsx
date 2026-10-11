import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  ExternalLink, 
  Wrench, 
  Sparkles, 
  Layers, 
  Compass, 
  Package, 
  ChevronRight,
  Info
} from 'lucide-react';
import { StoreAuditHero } from '../merchant/StoreAuditHero';
import { StoreFindingsSection } from '../merchant/StoreFindingsSection';
import { ProductAuditModal } from '../merchant/ProductAuditModal';
import { IssueItem } from '../../types/issues';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS, CANONICAL_CATALOG_PRODUCTS } from '../../data/canonicalCatalog';

interface StoreAuditPageProps {
  onNavigateHome?: () => void;
  onNavigateProducts?: () => void;
  onNavigateActions?: () => void;
  onInspectProduct?: (productId: string, productName: string) => void;
  issues?: IssueItem[];
  onApproveIssue?: (issueId: string) => void;
  onDismissIssue?: (issueId: string) => void;
  readinessScore?: number;
  onRecheckStore?: () => void;
  isRechecking?: boolean;
}

export const StoreAuditPage: React.FC<StoreAuditPageProps> = ({
  onNavigateHome,
  onNavigateProducts,
  onNavigateActions,
  onInspectProduct,
  issues = [],
  onApproveIssue,
  onDismissIssue,
  readinessScore = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct,
  onRecheckStore,
  isRechecking = false
}) => {
  const [selectedAuditTab, setSelectedAuditTab] = useState<'all' | 'critical' | 'improvement'>('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProductAudit, setSelectedProductAudit] = useState<{ id: string; name: string; issueIds: string[] }>({
    id: CANONICAL_CATALOG_PRODUCTS[0].id,
    name: CANONICAL_CATALOG_PRODUCTS[0].name,
    issueIds: ['iss-001']
  });

  const openIssuesCount = issues.filter(i => !i.isResolved && i.recoveryState !== 'Resolved').length;

  const handleInspectProduct = (productId: string, productName: string) => {
    if (onInspectProduct) {
      onInspectProduct(productId, productName);
      return;
    }
    const matchingIssues = issues.filter(i => i.productId === productId && !i.isResolved);
    const issueIds = matchingIssues.map(i => i.id);
    setSelectedProductAudit({ id: productId, name: productName, issueIds });
    setIsProductModalOpen(true);
  };

  const handleAuditStore = () => {
    if (onRecheckStore) {
      onRecheckStore();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header & Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-orange-600" />
                <span>Store Audit</span>
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {CANONICAL_MERCHANT.domain}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              AI Commerce Store Audit
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Comprehensive diagnostic of your catalog data clarity, barcode accuracy, return policy microdata, and commercial offer consistency.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAuditStore}
              disabled={isRechecking}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
              <span>{isRechecking ? 'Auditing Catalog...' : 'Re-check Store Audit'}</span>
            </button>
          </div>
        </div>

        {/* Audit Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Catalog Readiness Score
            </span>
            <span className="text-2xl font-black text-stone-900 mt-1 block">
              {readinessScore}%
            </span>
            <span className="text-[11px] text-stone-500 mt-0.5 block">
              Prerequisites for AI commerce visibility
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block">
              Open Attention Items
            </span>
            <span className="text-2xl font-black text-rose-900 mt-1 block">
              {openIssuesCount} Items
            </span>
            <span className="text-[11px] text-rose-700 mt-0.5 block">
              Impacting AI shopper answers
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              Total Catalog SKUs
            </span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} Products
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">
              Shopify storefront connected
            </span>
          </div>
        </div>
      </div>

      {/* 2. Store Audit Hero (Recheck & Diagnostic) */}
      <StoreAuditHero
        openIssuesCount={openIssuesCount}
        readinessScore={readinessScore}
        onAuditStore={handleAuditStore}
        onStartFixing={() => {
          const el = document.getElementById('findings-container');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onRecheckStore={onRecheckStore}
        isRechecking={isRechecking}
      />

      {/* 3. Detailed Store Findings Section */}
      <div id="findings-container">
        <StoreFindingsSection
          issues={issues}
          onInspectProduct={handleInspectProduct}
          onOpenActionCenter={onNavigateActions}
          onResolveIssue={onApproveIssue}
        />
      </div>

      {/* Product Audit Modal */}
      <ProductAuditModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productId={selectedProductAudit.id}
        productName={selectedProductAudit.name}
        issueIds={selectedProductAudit.issueIds}
        onRecheckProduct={() => {
          if (selectedProductAudit.issueIds.length > 0 && onApproveIssue) {
            onApproveIssue(selectedProductAudit.issueIds[0]);
          }
          if (onRecheckStore) {
            onRecheckStore();
          }
        }}
      />

    </div>
  );
};
