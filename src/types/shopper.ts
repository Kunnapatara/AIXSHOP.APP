// Type definitions for Page 11 — Shopper Product Intelligence Page (AIXSHOP.APP)
import { EvidenceState } from './landing';

export type ShopperEvidenceState = EvidenceState;

export type ShopperEvidenceLabel = 
  | 'Observed from source'
  | 'Derived from verified information'
  | 'Verified by merchant'
  | 'Not verified'
  | 'Sources disagree';

export interface ShopperProductFact {
  id: string;
  name: string;
  category: 'Specifications' | 'Materials' | 'Biomechanics' | 'Cushioning' | 'Fit & Support' | 'Commercial Policy';
  value: string;
  state: ShopperEvidenceState;
  shopperLabel: ShopperEvidenceLabel;
  source: string;
  detectedAt: string;
  validUntil?: string;
  confidence: number; // 0 - 100
  note?: string;
  conflictDetails?: {
    sourceA: { name: string; value: string; timestamp: string };
    sourceB: { name: string; value: string; timestamp: string };
    explanation: string;
  };
}

export interface ShopperObservedOffer {
  id: string;
  sellerName: string;
  sellerType: 'Official Store' | 'Authorized Retailer' | 'Third-Party Marketplace';
  sellerStatus: 'Authorized Direct' | 'Authorized Retailer' | 'Marketplace Seller';
  price: number;
  originalPrice?: number;
  currency: string;
  availability: 'In Stock' | 'Limited Stock' | 'Low Stock' | 'Out of Stock' | 'Unknown';
  availabilityDetail?: string;
  shipping: string;
  shippingState: 'Observed' | 'Unknown';
  returnPolicy: string;
  returnPolicyState: 'Observed' | 'Unknown' | 'Missing';
  promotion: string;
  promotionState: 'Observed' | 'None Observed' | 'Unknown';
  source: string;
  observedAt: string;
  evidenceState: ShopperEvidenceState;
  shopperLabel: ShopperEvidenceLabel;
  isOfficial?: boolean;
  isOfficialSeller?: boolean;
  deliveryTerms?: string;
  visitUrl: string;
  notes?: string;
}

export interface ShopperProductIdentity {
  brand: string;
  model: string;
  category: string;
  gtin: string;
  mpn: string;
  canonicalId: string;
  status: 'Identity Resolved';
  evidenceState: ShopperEvidenceState;
  publicRoute: string;
  summary: string;
}

export interface BuyerIntentShopperItem {
  id: string;
  archetype: 'Discovery' | 'Problem' | 'Comparison' | 'Specification' | 'Purchase' | 'Use Case' | 'Trust';
  question: string;
  isAnswerable: boolean;
  answerSummary: string;
  evidenceBasis: string;
  limitations?: string;
  status?: string;
  category?: string;
  confidence?: number;
  answer?: string;
  sourceLabel?: string;
}

export interface VerificationAuditPoint {
  id: string;
  title: string;
  description: string;
  evidenceRef?: string;
}

export interface ShopperTimelineEvent {
  id: string;
  timeframe: string;
  title: string;
  source: string;
  details: string;
  state: ShopperEvidenceState;
}

export interface ShopperProductData {
  identity: ShopperProductIdentity;
  priceRange: {
    min: number;
    max: number;
    currency: string;
    totalObserved: number;
  };
  facts: ShopperProductFact[];
  offers: ShopperObservedOffer[];
  intents: BuyerIntentShopperItem[];
  canVerify: VerificationAuditPoint[];
  cannotVerify: VerificationAuditPoint[];
  timeline: ShopperTimelineEvent[];
  whatWeKnow: {
    identity: string;
    specs: string;
    offers: string;
    evidence: string;
    conflicts: string;
  };
  whatNeedsCaution: string[];
}
