import { EvidenceState, IntentArchetype } from './landing';

export type IntelligenceStatus = 'Strong' | 'Needs Attention' | 'Critical';
export type WorkbenchCategory = 'Running' | 'Training' | 'Outdoor' | 'Apparel' | 'Accessories';
export type RemediationPriority = 'Critical' | 'High' | 'Medium' | 'Low' | 'None';

export interface EvidenceBreakdown {
  observed: number;
  verified: number;
  derived: number;
  conflict: number;
  missing: number;
}

export interface BuyerIntentArchetypeScores {
  discovery: number;
  problem: number;
  comparison: number;
  specification: number;
  purchase: number;
  useCase: number;
  trust: number;
}

export interface WorkbenchProduct {
  id: string;
  name: string;
  brand: string;
  category: WorkbenchCategory;
  sku: string;
  gtin: string;
  mpn: string;
  modelNumber: string;
  variantCount: number;
  
  // Identity
  identityStatus: 'Resolved' | 'Needs Verification';
  identityDetail: string;

  // Coverage
  intelligenceCoverage: number;
  coverageStatus: IntelligenceStatus;
  
  // Evidence
  dominantEvidenceState: EvidenceState;
  evidenceBreakdown: EvidenceBreakdown;
  unresolvedClaimsCount: number;
  evidenceSummary: string;

  // Issues
  criticalIssuesCount: number;
  highIssuesCount: number;
  mediumIssuesCount: number;
  topIssues: string[];

  // Offers (Product != Offer)
  observedOffersCount: number;
  observedPriceMin: number | null;
  observedPriceMax: number | null;
  currency: string;

  // Discovery
  discoveryReadiness: number;
  discoveryStatus: IntelligenceStatus;
  majorDiscoveryGap: string;

  // Priority
  priority: RemediationPriority;
  priorityScore: number; // for priority sorting
  priorityRationale: string;

  // Timeline
  lastAnalyzed: string;

  // Primary product flag (links to Page 03)
  isPrimaryExample: boolean;

  // Deep Diagnostic Content for Drawer
  whatAIXShopKnows: string;
  whatAIXShopCannotVerify: string[];
  whyItMatters: {
    category: 'Purchase' | 'Trust' | 'Comparison' | 'Specification' | 'Discovery' | 'Use Case';
    explanation: string;
  };
  recommendedNextStep: string;
  buyerIntentScores: BuyerIntentArchetypeScores;
}

export type WorkbenchSortField = 
  | 'name'
  | 'coverage'
  | 'gaps'
  | 'conflicts'
  | 'discovery'
  | 'priority'
  | 'lastAnalyzed';

export type SortDirection = 'asc' | 'desc';

export interface WorkbenchFiltersState {
  searchQuery: string;
  intelligenceStatus: IntelligenceStatus | 'All';
  evidenceState: EvidenceState | 'All';
  coverageRange: 'All' | '90%+' | '70-89%' | 'Below 70%';
  category: WorkbenchCategory | 'All';
  priority: RemediationPriority | 'All';
  discoveryStatus: IntelligenceStatus | 'All';
}
