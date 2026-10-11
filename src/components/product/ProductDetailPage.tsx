import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Package, 
  Tag, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Wrench, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  DollarSign, 
  Truck, 
  RotateCcw, 
  Info,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { sampleWorkbenchProducts } from '../../data/sampleWorkbenchProducts';
import { sampleCommercialOffers } from '../../data/sampleOffersData';
import { IssueItem } from '../../types/issues';
import { CANONICAL_MERCHANT } from '../../data/canonicalCatalog';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onNavigateActions?: () => void;
  onNavigateProducts?: () => void;
  issues?: IssueItem[];
  onApproveIssue?: (issueId: string) => void;
  onRecheckProduct?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onBack,
  onNavigateActions,
  onNavigateProducts,
  issues = [],
  onApproveIssue,
  onRecheckProduct
}) => {
  // Find product in catalog
  const product = sampleWorkbenchProducts.find(p => p.id === productId) || sampleWorkbenchProducts[0];
  
  // Find commercial offers for this product (Strict architectural rule: PRODUCT != OFFER)
  const offers = sampleCommercialOffers.filter(
    o => o.productId === product.id || o.canonicalProductId === product.id
  );

  // Find open issues specifically for this product (Strict ID integrity: NEVER fallback across products)
  const productOpenIssues = issues.filter(
    i => i.productId === product.id && !i.isResolved && i.recoveryState !== 'Resolved'
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'offers' | 'ai-clarity' | 'evidence'>('overview');
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckSuccess, setRecheckSuccess] = useState(false);

  // Deterministic specifications list based on product
  const specifications = [
    { name: 'Brand', value: product.brand, status: 'Clear', note: 'Authoritative manufacturer declaration' },
    { name: 'Model SKU', value: product.sku, status: 'Clear', note: 'Unique merchant catalog identifier' },
    { name: 'GTIN / EAN Barcode', value: product.gtin, status: 'Clear', note: 'Valid GS1 checksum verified' },
    { name: 'Category', value: product.category, status: 'Clear', note: 'Standard Google Product Taxonomy' },
    { name: 'Upper Mesh Material', value: product.id.includes('prod-849201948172') ? 'Engineered Mesh (Mono-filament)' : 'Technical Breathable Fabric', status: productOpenIssues.some(i => i.id === 'iss-002') ? 'Inconsistent' : 'Clear', note: productOpenIssues.some(i => i.id === 'iss-002') ? 'Conflicts with external reseller feed (lists Synthetic Knit)' : 'Verified across merchant channels' },
    { name: 'Midsole Technology', value: 'Supercritical Nitrogen-Infused Foam', status: 'Clear', note: 'Declared in structured PDP microdata' },
    { name: 'Carbon Plate Geometry', value: 'Full-length curved propulsion plate', status: 'Clear', note: 'High confidence match for marathon queries' },
    { name: 'Heel-to-Toe Drop', value: '8 mm (38mm heel / 30mm forefoot)', status: 'Clear', note: 'Explicitly structured for runner queries' },
    { name: 'Product Weight', value: '210 grams (Men US 9)', status: 'Clear', note: 'Verified by technical spec feed' },
    { name: 'Return Policy Schema', value: 'MerchantReturnPolicy JSON-LD', status: productOpenIssues.some(i => i.id === 'iss-001') ? 'Missing' : 'Clear', note: productOpenIssues.some(i => i.id === 'iss-001') ? 'Missing structured return window on storefront PDP' : '30-day wear trial policy verified' }
  ];

  const handleRunRecheck = () => {
    setIsRechecking(true);
    setRecheckSuccess(false);

    // If there is an open issue for this product, approve it via the canonical handler
    if (productOpenIssues.length > 0 && onApproveIssue) {
      onApproveIssue(productOpenIssues[0].id);
    }
    if (onRecheckProduct) {
      onRecheckProduct();
    }

    setTimeout(() => {
      setIsRechecking(false);
      setRecheckSuccess(true);
      setTimeout(() => setRecheckSuccess(false), 4000);
    }, 900);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Breadcrumbs & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold px-2.5 py-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Products</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-bold truncate max-w-[240px] sm:max-w-md">
            {product.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunRecheck}
            disabled={isRechecking}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
            <span>{isRechecking ? 'Auditing Product...' : 'Re-check Product'}</span>
          </button>
        </div>
      </div>

      {/* Recheck Success Banner */}
      {recheckSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Product specifications re-checked successfully! Catalog readiness updated in real-time.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700">Verified at source</span>
        </div>
      )}

      {/* 2. Product Identity Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200/80">
                {product.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                SKU: {product.sku}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                GTIN: {product.gtin}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Canonical product model recognized in {CANONICAL_MERCHANT.name}&apos;s catalog. Evaluated across search engines, structured schema, and AI shopping assistants.
            </p>
          </div>

          {/* Readiness & Health Scorecard */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 min-w-[240px] space-y-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                AI Shopper Clarity
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                productOpenIssues.length === 0 || recheckSuccess
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {productOpenIssues.length === 0 || recheckSuccess ? 'Strong' : 'Needs more information'}
              </span>
            </div>

            <div className="text-2xl font-black text-stone-900">
              {productOpenIssues.length === 0 || recheckSuccess ? '95%' : `${product.intelligenceCoverage}%`}
            </div>
            
            <p className="text-[11px] text-stone-500">
              {productOpenIssues.length === 0 || recheckSuccess
                ? 'All core product facts are verified and understandable to AI shoppers.'
                : `${productOpenIssues.length} issue(s) require action at store source.`}
            </p>
          </div>
        </div>

        {/* Workspace Sub-tabs */}
        <div className="flex items-center gap-2 border-b border-stone-100 pt-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Canonical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('offers')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'offers'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Observed Offers</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600">
              {offers.length || 3}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai-clarity')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ai-clarity'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            AI Shopper Understanding
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'evidence'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Ground Truth Evidence
          </button>
        </div>
      </div>

      {/* 3. Tab Contents */}

      {/* TAB A: Canonical Specifications */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Action at Source Notice (if issues open) */}
          {productOpenIssues.length > 0 && !recheckSuccess && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Wrench className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Fix at Source: {productOpenIssues.length} Attention Item(s)</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                AI shoppers struggle to answer technical questions when specifications are omitted or inconsistent across feeds. Update the missing fields in your Shopify store admin, then click Re-check to confirm.
              </p>
              <div className="space-y-2 pt-1">
                {productOpenIssues.map(issue => (
                  <div key={issue.id} className="p-3 rounded-xl bg-white border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block">{issue.title}</span>
                      <span className="text-stone-500 text-[11px]">{issue.whyItMatters}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunRecheck}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shrink-0 cursor-pointer"
                    >
                      Resolve & Re-check
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Table */}
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Canonical Product Specifications
                </h3>
                <p className="text-xs text-stone-500">
                  Physical attributes that define this specific shoe model independent of commercial pricing.
                </p>
              </div>
              <span className="text-xs font-mono text-stone-400">
                10 Attributes Checked
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {specifications.map((spec, idx) => (
                <div key={idx} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-stone-50/70 transition-colors">
                  <div className="sm:w-1/4">
                    <span className="font-bold text-stone-900 block">{spec.name}</span>
                  </div>
                  <div className="sm:w-2/5">
                    <span className="font-mono text-stone-800 font-medium block">{spec.value}</span>
                    <span className="text-[11px] text-stone-400 mt-0.5 block">{spec.note}</span>
                  </div>
                  <div className="sm:w-1/4 flex sm:justify-end">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      spec.status === 'Clear'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                        : spec.status === 'Missing'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200/60'
                        : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                    }`}>
                      {spec.status === 'Clear' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {spec.status === 'Missing' && <AlertCircle className="w-3 h-3 text-rose-600" />}
                      {spec.status === 'Inconsistent' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                      <span>{spec.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB B: Observed Offers (Product != Offer Separation) */}
      {activeTab === 'offers' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-xs text-orange-950 flex items-start gap-3">
            <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-orange-900 font-bold mb-0.5">
                Product vs Offer Separation:
              </strong>
              A product represents what the item is (specifications, dimensions, GTIN). An offer represents who sells it, for what price, and under what shipping terms. AIXSHOP separates these so merchant product data is never overwritten by third-party marketplace listings.
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Observed Commercial Offers ({offers.length || 3})
                </h3>
                <p className="text-xs text-stone-500">
                  Live merchant listings detected across authorized channels and web crawlers.
                </p>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {offers.map((offer) => (
                <div key={offer.id} className="p-5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:bg-stone-50 transition-colors">
                  <div className="space-y-1 md:w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{offer.seller}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        offer.sellerType === 'Brand Direct' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {offer.sellerType}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 block truncate max-w-sm">
                      {offer.source}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 md:w-1/3">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Price</span>
                      <span className="font-bold text-stone-900 text-sm">
                        ${typeof offer.offerPrice === 'number' ? offer.offerPrice.toFixed(2) : '199.00'} {offer.currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Stock</span>
                      <span className="font-semibold text-emerald-700">
                        {offer.availability}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Shipping</span>
                      <span className="text-stone-600">
                        {offer.shipping?.cost || 'Free over $150'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end md:w-1/3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Merchant Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB C: AI Shopper Understanding */}
      {activeTab === 'ai-clarity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: What AI Shoppers Can Answer */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>What AI Shoppers Can Answer Confidently</span>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Marathon Race Suitability:</strong> Verified curved carbon plate and supercritical foam for sub-3 hour runners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Stack Height & Drop:</strong> 38mm heel / 30mm forefoot with 8mm drop explicitly understood.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Authenticity & Barcode:</strong> GS1 GTIN 00849201948172 verified for direct brand match.</span>
                </li>
              </ul>
            </div>

            {/* Card 2: What Causes AI Shoppers Confusion */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>What Causes Confusion or Gaps</span>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Upper Material Discrepancy:</strong> Reseller feeds declare &quot;Synthetic Knit&quot; while direct store declares &quot;Engineered Mesh&quot;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Return Policy Terms:</strong> AI cannot confirm free 30-day wear trials if JSON-LD MerchantReturnPolicy is missing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Urgent Cut-Off Times:</strong> Same-day shipping cut-off schedule is not published in structured format.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* TAB D: Ground Truth Evidence */}
      {activeTab === 'evidence' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-900">
              Ground Truth Observation Signals
            </h3>
            <p className="text-xs text-stone-500">
              Corroborated sources extracted from your storefront HTML, merchant feeds, and partner listings.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Shopify Storefront HTML Microdata</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  Schema.org Product microdata parsed from shop.aeropulse.com/products/vaporstride-carbon-elite
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-stone-200/80 text-stone-800 shrink-0">
                99% Confidence
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Google Merchant Center Feed (Content API v2.1)</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  Commercial price ($199.00 USD), availability (in_stock), and brand identity verified.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-stone-200/80 text-stone-800 shrink-0">
                96% Confidence
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
