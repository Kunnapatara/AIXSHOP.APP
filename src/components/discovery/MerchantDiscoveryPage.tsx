import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  Bot, 
  Code2, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  RefreshCw, 
  ExternalLink, 
  HelpCircle, 
  SlidersHorizontal, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  DollarSign, 
  ArrowLeft,
  X,
  FileText,
  Activity
} from 'lucide-react';
import { IssueItem } from '../../types/issues';
import { CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';
import { READINESS_TRUTH_BOUNDARIES } from '../../state/canonicalReadiness';

interface MerchantDiscoveryPageProps {
  onNavigateIssues: () => void;
  onNavigateProducts?: () => void;
  onNavigateOverview?: () => void;
  onNavigateOffers?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateReport?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateBilling?: () => void;
  onNavigateShopper?: () => void;
  readinessScore?: number;
  issues?: IssueItem[];
}

interface DiscoverySurfaceDetail {
  id: string;
  name: string;
  readiness: number;
  status: 'Ready' | 'Needs Attention' | 'Critical';
  icon: React.ElementType;
  description: string;
  color: 'emerald' | 'amber' | 'rose';
  feedType: string;
  lastAudit: string;
  validatedSkus: string;
  dimensionsChecked: number;
  dimensionsPassed: number;
  primaryBlocker: string;
  impactedSkus: string;
  diagnosticNotes: string[];
}

export const MerchantDiscoveryPage: React.FC<MerchantDiscoveryPageProps> = ({
  onNavigateIssues,
  onNavigateProducts,
  onNavigateOverview,
  onNavigateOffers,
  onNavigateMonitoring,
  onNavigateReport,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onNavigateShopper,
  readinessScore = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct,
  issues
}) => {
  // Active Filter / Tab
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'search' | 'schema' | 'marketplaces'>('all');
  const [selectedSurfaceId, setSelectedSurfaceId] = useState<string | null>(null);
  const [selectedSimQueryId, setSelectedSimQueryId] = useState<string>('query-1');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  // Derived open issues count if canonical issues passed
  const openCount = useMemo(() => {
    if (!issues) return 8;
    return issues.filter(i => !i.isResolved && i.recoveryState !== 'Resolved').length;
  }, [issues]);

  // 4 Canonical Discovery Surfaces
  const canonicalSurfaces: DiscoverySurfaceDetail[] = [
    {
      id: 'google-shopping',
      name: 'Google Shopping',
      readiness: 84,
      status: 'Ready',
      icon: Search,
      description: 'Merchant Center product feeds and structured offer microdata compliance.',
      color: 'emerald',
      feedType: 'Google Merchant Center XML / Content API v2.1',
      lastAudit: '18 minutes ago',
      validatedSkus: '24 of 24 SKUs',
      dimensionsChecked: 32,
      dimensionsPassed: 27,
      primaryBlocker: 'Minor missing shipping dimension on 2 secondary colorways.',
      impactedSkus: '2 SKUs',
      diagnosticNotes: [
        'GTIN-14 barcodes validated against GS1 registry for 22 of 24 SKUs.',
        'High-resolution imagery matches Google Shopping minimum 800x800 white background specification.',
        'Price and availability microdata corroborated against live checkout payload.'
      ]
    },
    {
      id: 'ai-answer-engines',
      name: 'AI Answer Engines',
      readiness: 68,
      status: 'Needs Attention',
      icon: Bot,
      description: 'Perplexity, ChatGPT, and Gemini conversational synthesis & citation readiness.',
      color: 'amber',
      feedType: 'Autonomous AI Indexing & Semantic Grounding Graph',
      lastAudit: '24 minutes ago',
      validatedSkus: '24 of 24 SKUs',
      dimensionsChecked: 28,
      dimensionsPassed: 19,
      primaryBlocker: 'Conflicting upper material claims between manufacturer and retailer catalog.',
      impactedSkus: 'VaporStride Carbon Elite + 8 other SKUs',
      diagnosticNotes: [
        'Upper Material specification conflict: Brand lists Engineered Mesh while Retailer lists Synthetic Textile.',
        'Missing MerchantReturnPolicy microdata prevents AI shopping agents from answering return window queries.',
        'Stack height and heel-to-toe drop have 96% confidence score across all conversational models.'
      ]
    },
    {
      id: 'schema-org',
      name: 'Schema.org',
      readiness: 88,
      status: 'Ready',
      icon: Code2,
      description: 'JSON-LD Product, Brand, Offer, and AggregateOffer structured semantic tags.',
      color: 'emerald',
      feedType: 'JSON-LD Microdata Embedded on Canonical PDPs',
      lastAudit: '42 minutes ago',
      validatedSkus: '24 of 24 SKUs',
      dimensionsChecked: 35,
      dimensionsPassed: 31,
      primaryBlocker: 'Missing aggregateRating schema on 4 newly introduced seasonal SKUs.',
      impactedSkus: '4 SKUs',
      diagnosticNotes: [
        'Full Product, Brand, Offer, and ItemAvailability JSON-LD trees present.',
        'High-confidence entity resolution between schema.org/Product and manufacturer GTIN.',
        'Rich Results test: 0 critical errors, 4 non-critical warnings.'
      ]
    },
    {
      id: 'marketplace-search',
      name: 'Marketplace Search',
      readiness: 76,
      status: 'Ready',
      icon: ShoppingBag,
      description: 'Amazon, Walmart, and regional partner marketplace catalog indexability.',
      color: 'emerald',
      feedType: 'Amazon SP-API / Multi-seller Syndication Feed',
      lastAudit: '1 hour ago',
      validatedSkus: '24 of 24 SKUs',
      dimensionsChecked: 30,
      dimensionsPassed: 23,
      primaryBlocker: '6 secondary variant colorways feature GTIN checksum disparities.',
      impactedSkus: '6 Variant SKUs',
      diagnosticNotes: [
        'Brand Registry verification active across AeroPulse trademark classes.',
        'Category specific mandatory attributes (e.g. cushioning density, closure type) 100% complete.',
        'Variant parent-child ASIN relationships mapped for all core shoe sizes.'
      ]
    }
  ];

  // Filtered surfaces
  const filteredSurfaces = canonicalSurfaces.filter(s => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return s.id === 'ai-answer-engines';
    if (activeFilter === 'search') return s.id === 'google-shopping';
    if (activeFilter === 'schema') return s.id === 'schema-org';
    if (activeFilter === 'marketplaces') return s.id === 'marketplace-search';
    return true;
  });

  const selectedSurface = canonicalSurfaces.find(s => s.id === selectedSurfaceId);

  // Simulated AI Buyer Intent Queries
  const simulatedQueries = [
    {
      id: 'query-1',
      query: 'Is the AeroPulse VaporStride Carbon Elite suitable for a sub-3 marathon?',
      model: 'ChatGPT 4o / Perplexity Pro',
      readiness: 92,
      status: 'Authoritative Consensus',
      statusColor: 'emerald',
      synthesis: 'Yes. The AeroPulse VaporStride Carbon Elite is engineered specifically for competitive marathon racing, featuring a full-length curved carbon fiber plate and supercritical nitrogen-infused foam with a 38mm heel stack.',
      sources: ['AeroPulse Official Specifications (Verified)', 'World Athletics Shoe Approval Database'],
      conflictFlag: null
    },
    {
      id: 'query-2',
      query: 'What is the exact upper material of the VaporStride Carbon Elite?',
      model: 'Perplexity / Gemini 1.5 Pro',
      readiness: 61,
      status: 'Hesitant Synthesis (Conflict)',
      statusColor: 'amber',
      synthesis: 'Specifications differ depending on the retailer: AeroPulse officially specifies single-layer breathable Engineered Mesh, whereas authorized retailer FleetFeet lists the shoe with Dual-Layer Poly Mesh. Further corroboration is advised.',
      sources: ['AeroPulse Brand Catalog', 'FleetFeet Commercial Feed'],
      conflictFlag: 'Material Disagreement: Engineered Mesh vs Dual-Layer Poly Mesh'
    },
    {
      id: 'query-3',
      query: 'What is the return window if I purchase the VaporStride directly?',
      model: 'Google Search Generative AI',
      readiness: 54,
      status: 'Missing Microdata',
      statusColor: 'amber',
      synthesis: 'While AeroPulse typically offers standard athletic footwear guarantees, specific return duration and restocking fee terms were not deterministically found in the structured schema data.',
      sources: ['AeroPulse PDP (Partial Schema)'],
      conflictFlag: 'Missing MerchantReturnPolicy structured data tag'
    },
    {
      id: 'query-4',
      query: 'Where can I find the AeroPulse VaporStride in stock at the lowest price?',
      model: 'ChatGPT Search / Shopping Graph',
      readiness: 88,
      status: 'Live Multi-Offer Resolved',
      statusColor: 'emerald',
      synthesis: 'Currently available at $189.00 from MarathonSports (verified in stock), compared to the $199.00 MSRP on AeroPulse direct and $199.00 on FleetFeet.',
      sources: ['Google Merchant Center Verified Feed', 'MarathonSports Feed', 'AeroPulse Direct'],
      conflictFlag: null
    }
  ];

  const activeSimQuery = simulatedQueries.find(q => q.id === selectedSimQueryId) || simulatedQueries[0];

  // Handler for manual audit simulation
  const handleTriggerAudit = () => {
    setIsAuditing(true);
    setAuditSuccess(false);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditSuccess(true);
      setTimeout(() => setAuditSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Header & Context Banner (QRxMENU Theme) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
          {/* Breadcrumb & Subtitle */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
            {onNavigateOverview && (
              <button
                type="button"
                onClick={onNavigateOverview}
                className="hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            )}
            <span>/</span>
            <span className="text-orange-600 font-bold">AI & Channel Readiness</span>
          </div>

          {/* Quick Nav Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {onNavigateProducts && (
              <button
                type="button"
                onClick={onNavigateProducts}
                className="px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5 text-stone-400" />
                <span>Catalog (24)</span>
              </button>
            )}
            {onNavigateOffers && (
              <button
                type="button"
                onClick={onNavigateOffers}
                className="px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-stone-400" />
                <span>Offers (42)</span>
              </button>
            )}
            {onNavigateIssues && (
              <button
                type="button"
                onClick={onNavigateIssues}
                className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/80 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                <span>Issues Queue ({openCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Title, Subtitle, and Big Score Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/80 tracking-wide flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-orange-600" />
                <span>CATALOG DISCOVERY INTELLIGENCE</span>
              </span>
              <span className="text-xs text-stone-400 font-mono">4 Canonical Surfaces Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Discovery Readiness
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Deterministic machine readability and answerability score across search engines, conversational AI answer engines, commerce feeds, and semantic microdata.
            </p>
            <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>{READINESS_TRUTH_BOUNDARIES.previewModel}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-400">{READINESS_TRUTH_BOUNDARIES.externalUnchanged}</span>
            </div>
          </div>

          {/* Big Score Hero Card */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex items-center gap-4 shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex flex-col items-center justify-center text-white shadow-xs">
              <span className="text-2xl font-black leading-none">{readinessScore}%</span>
              <span className="text-[10px] font-medium tracking-tight uppercase mt-0.5">Overall</span>
            </div>
            <div>
              <span className="text-xs text-stone-500 font-medium block">Catalog Readiness</span>
              <span className="text-base font-extrabold text-stone-900 block">
                {readinessScore >= 95 ? 'Optimized' : readinessScore >= 80 ? 'Strong Baseline' : 'Needs Review'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${openCount === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                <span className={`text-xs font-semibold ${openCount === 0 ? 'text-emerald-800' : 'text-amber-800'}`}>
                  {openCount === 0 ? 'All surfaces verified in preview model' : `${openCount} issues open in preview model`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="pt-6 mt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              All Surfaces (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ai')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === 'ai'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              AI Answer Engines
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('search')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === 'search'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Google Shopping
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('schema')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === 'schema'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Schema.org
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('marketplaces')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === 'marketplaces'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              Marketplaces
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerAudit}
              disabled={isAuditing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-orange-600' : 'text-stone-500'}`} />
              <span>{isAuditing ? 'Running Diagnostic...' : 'Audit Catalog Feeds'}</span>
            </button>

            <button
              type="button"
              onClick={onNavigateIssues}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Resolve Gaps (8)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Audit feedback notification */}
        {auditSuccess && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diagnostic completed: 4 discovery surfaces audited across 24 catalog SKUs. Integrity baseline confirmed.</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-700">0s ago</span>
          </div>
        )}
      </div>

      {/* 2. The 4 Canonical Discovery Surfaces Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredSurfaces.map((surface) => {
          const Icon = surface.icon;
          const isWarning = surface.status === 'Needs Attention';
          const isSelected = selectedSurfaceId === surface.id;

          return (
            <div
              key={surface.id}
              onClick={() => setSelectedSurfaceId(isSelected ? null : surface.id)}
              className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected 
                  ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20' 
                  : 'border-stone-200/80 shadow-xs hover:border-stone-300 hover:shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    isWarning ? 'bg-amber-100 text-amber-800' : 'bg-orange-50 text-orange-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    isWarning
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {surface.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-stone-900">{surface.name}</h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                    {surface.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Readiness Index</span>
                  <span className="font-extrabold text-stone-900 text-sm">{surface.readiness}%</span>
                </div>

                <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${surface.readiness}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium pt-1">
                  <span>{surface.dimensionsPassed}/{surface.dimensionsChecked} Dimensions</span>
                  <span className="text-orange-600 font-semibold flex items-center gap-0.5">
                    {isSelected ? 'Hide detail' : 'Inspect'} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Surface Detail Inspection Drawer (if selected) */}
      {selectedSurface && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/90 shadow-sm space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <selectedSurface.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-stone-900">{selectedSurface.name} Diagnostic</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedSurface.status === 'Needs Attention'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {selectedSurface.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">{selectedSurface.feedType} · Audited {selectedSurface.lastAudit}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNavigateIssues}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Resolve Surface Gaps in Issues →
              </button>
              <button
                type="button"
                onClick={() => setSelectedSurfaceId(null)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="text-[11px] text-stone-500 font-medium">Primary Blocker</span>
              <p className="text-xs font-bold text-stone-900">{selectedSurface.primaryBlocker}</p>
              <span className="text-[11px] text-amber-700 font-semibold block pt-1">Impact: {selectedSurface.impactedSkus}</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="text-[11px] text-stone-500 font-medium">Coverage Parity</span>
              <p className="text-xs font-bold text-stone-900">{selectedSurface.validatedSkus}</p>
              <span className="text-[11px] text-emerald-700 font-semibold block pt-1">{selectedSurface.dimensionsPassed} of {selectedSurface.dimensionsChecked} attributes conform</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="text-[11px] text-stone-500 font-medium">Machine Discoverability</span>
              <p className="text-xs font-bold text-stone-900">{selectedSurface.readiness}% Index Ready</p>
              <span className="text-[11px] text-stone-600 block pt-1">Deterministic schema validated</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Diagnostic Audit Points</h4>
            <div className="space-y-2">
              {selectedSurface.diagnosticNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50/60 border border-stone-200/60 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Action Block: Why is AI readiness 68%? (Root-cause remediation) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                Why is AI readiness 68%?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Conversational answer engines (ChatGPT, Perplexity, Gemini) refuse to provide confident answers when catalog specifications conflict or critical schema is missing.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateIssues}
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs hover:shadow transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>Fix Issues</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Core Root-Cause Blockers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Upper Material Conflict</span>
              </div>
              <p className="text-xs text-amber-950/80 leading-relaxed">
                Brand lists Engineered Mesh while retailer lists Synthetic Textile. AI answer engines suppress authoritative specifications when conflicting claims are detected.
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
              <span className="text-amber-800 font-semibold">VaporStride Carbon Elite</span>
              <button 
                type="button" 
                onClick={onNavigateIssues}
                className="text-orange-600 font-bold hover:underline cursor-pointer"
              >
                Resolve →
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Missing Return Policy Schema</span>
              </div>
              <p className="text-xs text-amber-950/80 leading-relaxed">
                9 catalog products lack merchant return duration and restocking fee microdata, dropping buyer confidence signals in AI shopping summaries.
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
              <span className="text-amber-800 font-semibold">9 Catalog SKUs</span>
              <button 
                type="button" 
                onClick={onNavigateIssues}
                className="text-orange-600 font-bold hover:underline cursor-pointer"
              >
                Attach →
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>GTIN-13/14 Variant Parity</span>
              </div>
              <p className="text-xs text-amber-950/80 leading-relaxed">
                6 secondary colorways feature barcode checksum discrepancies between Shopify feeds and Google Merchant Center feeds.
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
              <span className="text-amber-800 font-semibold">6 Variant SKUs</span>
              <button 
                type="button" 
                onClick={onNavigateIssues}
                className="text-orange-600 font-bold hover:underline cursor-pointer"
              >
                Harmonize →
              </button>
            </div>
          </div>

        </div>

        {/* Reassurance Footer Banner */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>Resolving these 3 root causes will lift catalog AI Answer Readiness from <strong>68%</strong> to <strong>89%</strong>.</span>
          </div>
          <button
            type="button"
            onClick={onNavigateIssues}
            className="text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer self-start sm:self-auto"
          >
            Review Issues Workspace →
          </button>
        </div>
      </div>

      {/* 5. Interactive Buyer Intent Query Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
                AI Answer Engine Query Simulation
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Simulate how conversational models answer real shopper questions based on your catalog's current evidence.
            </p>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold self-start sm:self-auto">
            Live Evidence Testing
          </span>
        </div>

        {/* Query selection buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {simulatedQueries.map((item) => {
            const isSelected = item.id === activeSimQuery.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedSimQueryId(item.id)}
                className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-start justify-between gap-3 border ${
                  isSelected
                    ? 'bg-orange-50/80 border-orange-300 shadow-3xs'
                    : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200/80'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-stone-500 font-medium block">
                    {item.model}
                  </span>
                  <p className="text-xs font-bold text-stone-900 leading-snug">
                    "{item.query}"
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  item.statusColor === 'emerald'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.readiness}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Simulation Output Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-mono font-bold text-stone-800">{activeSimQuery.model} Response Simulation</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              activeSimQuery.statusColor === 'emerald'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                : 'bg-amber-100 text-amber-900 border border-amber-200'
            }`}>
              {activeSimQuery.status}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-normal shadow-3xs">
            "{activeSimQuery.synthesis}"
          </div>

          {activeSimQuery.conflictFlag && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">Downstream Ambiguity Detected:</span>
                <p>{activeSimQuery.conflictFlag}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-stone-500">
              <span className="font-medium">Corroborated Sources:</span>
              {activeSimQuery.sources.map((src, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700 font-mono text-[10px]">
                  {src}
                </span>
              ))}
            </div>

            {activeSimQuery.conflictFlag && (
              <button
                type="button"
                onClick={onNavigateIssues}
                className="text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer"
              >
                Resolve Conflict in Issues Queue →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 6. Feed & Schema Diagnostic Summary Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
              Feed & Schema Audit Status
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Current ingestion and syndication health across canonical commerce pipelines.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateIssues}
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>View all 8 open issues</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-mono uppercase text-[10px]">
                <th className="pb-3 font-semibold">Feed / Pipeline</th>
                <th className="pb-3 font-semibold">Format</th>
                <th className="pb-3 font-semibold">SKUs Monitored</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Last Checked</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-3 font-bold text-stone-900">Google Merchant Center Primary Feed</td>
                <td className="py-3 font-mono text-stone-600">XML / Content API</td>
                <td className="py-3 text-stone-700">24 of 24 SKUs</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Compliant (84%)
                  </span>
                </td>
                <td className="py-3 text-stone-500">18 min ago</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedSurfaceId('google-shopping')}
                    className="text-orange-600 font-bold hover:underline cursor-pointer"
                  >
                    Inspect
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-3 font-bold text-stone-900">AI Citation Grounding Graph</td>
                <td className="py-3 font-mono text-stone-600">Semantic Vector Map</td>
                <td className="py-3 text-stone-700">24 of 24 SKUs</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    1 Conflict Gated (68%)
                  </span>
                </td>
                <td className="py-3 text-stone-500">24 min ago</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={onNavigateIssues}
                    className="text-orange-600 font-bold hover:underline cursor-pointer"
                  >
                    Fix Conflict
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-3 font-bold text-stone-900">Schema.org JSON-LD Microdata</td>
                <td className="py-3 font-mono text-stone-600">application/ld+json</td>
                <td className="py-3 text-stone-700">24 of 24 SKUs</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Valid (88%)
                  </span>
                </td>
                <td className="py-3 text-stone-500">42 min ago</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedSurfaceId('schema-org')}
                    className="text-orange-600 font-bold hover:underline cursor-pointer"
                  >
                    Inspect
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-stone-50/60 transition-colors">
                <td className="py-3 font-bold text-stone-900">Amazon Marketplace SP-API Feed</td>
                <td className="py-3 font-mono text-stone-600">JSON Feeds v2021-06-30</td>
                <td className="py-3 text-stone-700">24 of 24 SKUs</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    6 GTIN Warnings (76%)
                  </span>
                </td>
                <td className="py-3 text-stone-500">1 hour ago</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={onNavigateIssues}
                    className="text-orange-600 font-bold hover:underline cursor-pointer"
                  >
                    Harmonize
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
