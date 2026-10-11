// src/types/analytics.ts
// AIXSHOP.APP — Page 13: Analytics & Intelligence Performance Data Types
// All metrics represent diagnostic intelligence states, provenance completeness,
// and workflow progress. Explicitly labeled as Representative Preview Data.

import { EvidenceState, IntentArchetype } from './landing';

export type AnalyticsDataState = 'REPRESENTATIVE_PREVIEW' | 'SIMULATED' | 'PREVIEW' | 'ACTUAL';

export type TimeRangeOption = '7d' | '30d' | '90d' | 'representative';

export interface AnalyticsSummaryKPIs {
  productsAnalyzed: number;
  intelligenceCoveragePercentage: number;
  evidenceCompletenessPercentage: number;
  openIssuesCount: number;
  conflictsCount: number;
  recoveryResolutionPercentage: number;
  dataState: AnalyticsDataState;
  periodLabel: string;
}

export interface MetricDefinition {
  id: string;
  name: string;
  definition: string;
  ruleOfTruth: string;
  whyItMatters: string;
}

export interface IntelligenceCoverageProgressionPoint {
  period: string;
  coveragePercentage: number;
  changeRationale: string;
}

export interface CoverageDimensionItem {
  id: string;
  name: string;
  coveragePercentage: number;
  status: 'Strong' | 'Good' | 'Needs Attention' | 'Critical';
  modeledElementsCount: number;
  groundedElementsCount: number;
  rationale: string;
}

export interface EvidenceDistributionItem {
  state: EvidenceState;
  count: number;
  percentage: number;
  description: string;
  ruleOfTruth: string;
  colorClass: string;
  badgeBg: string;
}

export interface EvidenceTrendPoint {
  period: string;
  missing: number;
  conflicts: number;
  merchantVerified: number;
  observed: number;
}

export interface ConflictAnalyticsBreakdown {
  totalConflicts: number;
  criticalConflicts: number;
  variantConflicts: number;
  attributeConflicts: number;
  offerConflicts: number;
  rationale: string;
}

export interface IssueLifecycleDistribution {
  open: number;
  diagnosing: number;
  recoveryProposed: number;
  validationRequired: number;
  merchantVerification: number;
  resolved: number;
  blocked: number;
}

export interface RecoveryPerformanceMetrics {
  issuesDetected: number;
  recoveryEligible: number;
  evidenceGated: number;
  merchantVerificationRequired: number;
  validationPassed: number;
  resolved: number;
  blocked: number;
  operationalNotes: string;
}

export interface ChangeDiagnosisConversion {
  changesDetected: number;
  diagnosedAsIssues: number;
  remainedInformational: number;
  rationale: string;
}

export interface MonitoringCategoryItem {
  category: string;
  label: string;
  count: number;
  page09CategoryKey: string;
  description: string;
}

export interface OfferAnalyticsSummary {
  observedOffersCount: number;
  productsWithOffersCount: number;
  priceConflictsCount: number;
  availabilityConflictsCount: number;
  missingOfferEvidenceCount: number;
  promotionsDetectedCount: number;
  distinctSellersCount: number;
  medianPriceUsd: number;
  lowestPriceUsd: number;
  highestPriceUsd: number;
  rationale: string;
}

export interface BuyerIntentAnalyticsItem {
  archetype: IntentArchetype;
  coveragePercentage: number;
  modeledDimensionsCount: number;
  groundedDimensionsCount: number;
  topGap: string;
  buyerJourneyPhase: string;
  impactLevel: 'High' | 'Medium' | 'Critical';
}

export interface IntentGapItem {
  id: string;
  rank: number;
  archetype: IntentArchetype;
  title: string;
  issueDescription: string;
  evidenceState: EvidenceState;
  recommendedPage: 'Page 03' | 'Page 08' | 'Page 10';
  targetView: 'report' | 'issues' | 'workbench';
}

export interface DiscoverySurfaceAnalyticsItem {
  id: string;
  surfaceName: string;
  surfaceType: 'Search' | 'AI' | 'Commerce' | 'AIXSHOP';
  readinessPercentage: number;
  modeledStatus: 'Modeled' | 'Observed' | 'Not Observed';
  evidenceStatus: 'Grounded' | 'Partial' | 'Gaps Detected';
  topConstraint: string;
  testedSignalsCount: number;
}

export interface DiscoveryReadinessTrendPoint {
  period: string;
  readinessPercentage: number;
  milestoneNote: string;
}

export interface SourceCategoryContribution {
  id: string;
  categoryName: string;
  sourcesCount: number;
  productRecordsCount: number;
  variantRecordsCount: number;
  offerObservationsCount: number;
  evidenceRecordsCount: number;
  conflictsContributedCount: number;
  primaryProvider: string;
  connectionMethod: string;
}

export interface SourceHealthDimensionItem {
  dimensionName: string;
  status: 'Healthy' | 'Needs Attention' | 'Partial' | 'Unknown';
  description: string;
}

export interface DataQualityFunnelStage {
  step: number;
  label: string;
  count: number;
  unit: string;
  description: string;
  conversionRateFromPrevious?: number;
}

export interface TopIntelligenceRiskItem {
  id: string;
  dimension: string;
  impactArchetypes: string;
  evidenceState: EvidenceState;
  severity: 'Critical' | 'High' | 'Medium';
  affectedProductTitle: string;
  affectedProductId: string;
  issueSummary: string;
  targetPage: 'Page 10' | 'Page 03';
  targetView: 'issues' | 'report';
  rank?: number;
  title?: string;
  affectedTarget?: string;
  impactDescription?: string;
  category?: string;
}

export type IntelligenceRiskItem = TopIntelligenceRiskItem;

export interface ProductLevelAnalyticsProfile {
  id: string;
  productId: string;
  name: string;
  productName?: string;
  sku: string;
  gtin: string;
  brand: string;
  category: string;
  variantsCount?: number;
  intelligenceCoveragePercentage: number;
  evidenceCompletenessPercentage?: number;
  evidenceBreakdown: {
    observed: number;
    derived: number;
    verified: number;
    missing: number;
    conflict: number;
  };
  openIssuesCount: number;
  issuesCount?: number;
  conflictsCount?: number;
  observedOffersCount: number;
  discoveryReadinessPercentage: number;
  topBuyerIntent: string;
  weakestBuyerIntent: string;
  recentMonitoringEventsCount: number;
  recoveryStatus: string;
  primaryRiskNote: string;
}

export type ProductAnalyticsRow = ProductLevelAnalyticsProfile;

export interface AnalyticsInsightItem {
  id: string;
  category: 'Evidence' | 'Variants' | 'Offers' | 'Discovery' | 'Recovery';
  headline: string;
  explanation: string;
  underlyingMetric: string;
  stateBadge: string;
}

export interface ExportAnalyticsRecord {
  metric: string;
  metric_type: string;
  product_id: string;
  dimension: string;
  value: string | number;
  state: string;
  source: string;
  detected_at: string;
  period: string;
  representative_flag: boolean;
  data_state: AnalyticsDataState;
}
