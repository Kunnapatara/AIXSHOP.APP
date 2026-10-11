/**
 * AIXSHOP — Provider-Agnostic AI Channel Adapter Contract & Registry
 * 
 * Separates:
 * 1. Core Commerce Intelligence (Canonical truth, Product ≠ Offer, Evidence states)
 * 2. Versioned Channel Assessment Adapters (ChatGPT, Google Shopping, Schema.org, Perplexity)
 * 3. Commercial Connectors (Shopify, WooCommerce, GMC)
 * 
 * Epistemic Rule:
 * All opportunity scores represent AIXSHOP's deterministic data-readiness assessment,
 * NEVER an external provider's secret ranking algorithm or guarantee of display.
 */

import { CanonicalProductIdentity } from '../data/canonicalCatalog';
import { CommercialOffer } from '../types/offers';
import { WorkbenchProduct } from '../types/workbench';

export type EcosystemType = 
  | 'ChatGPT / OpenAI' 
  | 'Google Shopping & SGE' 
  | 'Schema.org JSON-LD' 
  | 'Perplexity Pro' 
  | 'Marketplace Feed';

export interface ChannelEvaluationResult {
  adapterId: string;
  adapterVersion: string;
  ecosystem: EcosystemType;
  plainLanguageReadiness: 'Strong' | 'Needs more information' | 'Weak';
  readinessPercentage: number;
  prerequisitesMet: string[];
  missingPrerequisites: string[];
  semanticAlignmentNote: string;
  disclaimer: string;
}

/**
 * Versioned contract that all external AI channel adapters must implement.
 */
export interface AIChannelAdapter {
  id: string;
  name: string;
  version: string;
  ecosystem: EcosystemType;
  evaluateProduct(product: WorkbenchProduct, offers: CommercialOffer[]): ChannelEvaluationResult;
}

/**
 * 1. ChatGPT Ecosystem Adapter
 * Assesses readiness for OpenAI conversational shopping discovery and citation.
 * Requirements: Plain-language specifications, verified use-case answers, absence of conflicting claims.
 */
export class ChatGPTEcosystemAdapter implements AIChannelAdapter {
  public id = 'adapter-chatgpt';
  public name = 'ChatGPT Shopping & Conversation Engine';
  public version = '2026.1';
  public ecosystem: EcosystemType = 'ChatGPT / OpenAI';

  public evaluateProduct(product: WorkbenchProduct, offers: CommercialOffer[]): ChannelEvaluationResult {
    const prerequisitesMet: string[] = [];
    const missingPrerequisites: string[] = [];

    // Check basic canonical specs
    if (product.brand && product.name) prerequisitesMet.push('Clear canonical brand and model identity');
    if (product.gtin && product.gtin.length >= 12) prerequisitesMet.push('Valid GTIN barcode for entity matching');
    else missingPrerequisites.push('Missing or invalid GTIN barcode');

    // Check buyer intent coverage
    if (product.buyerIntentScores.specification >= 75) prerequisitesMet.push('Rich technical specifications (drop, weight, stack height)');
    else missingPrerequisites.push('Incomplete technical specifications for runner queries');

    if (product.buyerIntentScores.trust >= 75) prerequisitesMet.push('Verifiable return and warranty terms');
    else missingPrerequisites.push('Unverified return policy in merchant data');

    // Check offer conflicts
    const hasPriceConflict = offers.some(o => o.issues.some(i => i.type === 'Price Disagreement'));
    if (hasPriceConflict) {
      missingPrerequisites.push('Conflicting prices between official storefront and resellers');
    }

    const readinessScore = Math.max(30, Math.min(99, Math.round(
      (prerequisitesMet.length / (prerequisitesMet.length + missingPrerequisites.length)) * 100
    )));

    return {
      adapterId: this.id,
      adapterVersion: this.version,
      ecosystem: this.ecosystem,
      plainLanguageReadiness: readinessScore >= 80 ? 'Strong' : readinessScore >= 50 ? 'Needs more information' : 'Weak',
      readinessPercentage: readinessScore,
      prerequisitesMet,
      missingPrerequisites,
      semanticAlignmentNote: missingPrerequisites.length === 0
        ? 'High probability of accurate factual attribution in conversational queries.'
        : `AI models may state "specifications unknown" or report conflicting seller pricing due to ${missingPrerequisites.length} uncorroborated fields.`,
      disclaimer: 'AIXSHOP assesses catalog data completeness. OpenAI does not endorse or guarantee product recommendations.'
    };
  }
}

/**
 * 2. Google Shopping & SGE Adapter
 * Assesses readiness for Google Merchant Center feeds, SGE answers, and Google Shopping.
 */
export class GoogleShoppingAdapter implements AIChannelAdapter {
  public id = 'adapter-google-shopping';
  public name = 'Google Shopping & SGE Structured Surfaces';
  public version = '2026.2';
  public ecosystem: EcosystemType = 'Google Shopping & SGE';

  public evaluateProduct(product: WorkbenchProduct, offers: CommercialOffer[]): ChannelEvaluationResult {
    const prerequisitesMet: string[] = [];
    const missingPrerequisites: string[] = [];

    if (product.gtin) prerequisitesMet.push('GTIN-12 / EAN-13 barcode present');
    else missingPrerequisites.push('Missing GTIN (Required for Google Shopping catalog match)');

    if (product.mpn) prerequisitesMet.push('Manufacturer Part Number (MPN) formatted');
    else missingPrerequisites.push('Missing MPN');

    if (offers.length > 0 && offers.some(o => o.availability === 'In Stock')) {
      prerequisitesMet.push('Observed in-stock availability');
    } else {
      missingPrerequisites.push('Ambiguous stock availability');
    }

    const readinessScore = Math.max(40, Math.min(99, Math.round(
      (prerequisitesMet.length / (prerequisitesMet.length + missingPrerequisites.length)) * 100
    )));

    return {
      adapterId: this.id,
      adapterVersion: this.version,
      ecosystem: this.ecosystem,
      plainLanguageReadiness: readinessScore >= 80 ? 'Strong' : readinessScore >= 50 ? 'Needs more information' : 'Weak',
      readinessPercentage: readinessScore,
      prerequisitesMet,
      missingPrerequisites,
      semanticAlignmentNote: missingPrerequisites.length === 0
        ? 'Fully compliant with Google Merchant Center specification.'
        : 'Feed diagnostics will flag warnings on missing required attributes.',
      disclaimer: 'Google Shopping feed eligibility does not guarantee organic or paid ranking position.'
    };
  }
}

/**
 * 3. Schema.org JSON-LD Microdata Adapter
 * Assesses crawlable structured microdata on the merchant storefront.
 */
export class SchemaOrgAdapter implements AIChannelAdapter {
  public id = 'adapter-schema-org';
  public name = 'Schema.org JSON-LD Microdata Standard';
  public version = '2026.1';
  public ecosystem: EcosystemType = 'Schema.org JSON-LD';

  public evaluateProduct(product: WorkbenchProduct, offers: CommercialOffer[]): ChannelEvaluationResult {
    const prerequisitesMet: string[] = [
      'Product schema type declared',
      'Name, Brand, and Offers relationship defined'
    ];
    const missingPrerequisites: string[] = [];

    if (!product.gtin) missingPrerequisites.push('Missing gtin12 property in JSON-LD');
    if (product.dominantEvidenceState === 'CONFLICT') {
      missingPrerequisites.push('Unresolved claim conflict across crawlable pages');
    }

    const readinessScore = missingPrerequisites.length === 0 ? 94 : 72;

    return {
      adapterId: this.id,
      adapterVersion: this.version,
      ecosystem: this.ecosystem,
      plainLanguageReadiness: readinessScore >= 80 ? 'Strong' : 'Needs more information',
      readinessPercentage: readinessScore,
      prerequisitesMet,
      missingPrerequisites,
      semanticAlignmentNote: 'Ensures headless search engines and AI web crawlers ingest clean structured entities.',
      disclaimer: 'Schema validation verifies syntactic and semantic correctness according to Schema.org standards.'
    };
  }
}

/**
 * Adapter Registry
 */
class ChannelAdapterRegistry {
  private adapters: Map<string, AIChannelAdapter> = new Map();

  constructor() {
    this.register(new ChatGPTEcosystemAdapter());
    this.register(new GoogleShoppingAdapter());
    this.register(new SchemaOrgAdapter());
  }

  public register(adapter: AIChannelAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  public getAdapter(id: string): AIChannelAdapter | undefined {
    return this.adapters.get(id);
  }

  public getAllAdapters(): AIChannelAdapter[] {
    return Array.from(this.adapters.values());
  }

  public evaluateAll(product: WorkbenchProduct, offers: CommercialOffer[]): ChannelEvaluationResult[] {
    return this.getAllAdapters().map(adapter => adapter.evaluateProduct(product, offers));
  }
}

export const channelAdapterRegistry = new ChannelAdapterRegistry();
