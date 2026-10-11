import { WorkbenchProduct } from '../types/workbench';
import {
  CANONICAL_PRODUCT_ID,
  CANONICAL_PRODUCT_GTIN,
  CANONICAL_PRODUCT_MPN,
  CANONICAL_PRODUCT_SKU,
  CANONICAL_PRODUCT_NAME
} from './canonicalCatalog';
import { sampleCommercialOffers } from './sampleOffersData';

/**
 * Derives offer summary metrics from the canonical Offer collection
 * Enforces architectural rule: PRODUCT != OFFER
 */
export function deriveProductOfferSummary(productId: string) {
  const offers = sampleCommercialOffers.filter(
    o => o.productId === productId ||
         o.canonicalProductId === productId ||
         (productId === CANONICAL_PRODUCT_ID && (o.productId === CANONICAL_PRODUCT_ID || o.canonicalProductId === CANONICAL_PRODUCT_ID))
  );
  if (offers.length === 0) {
    return {
      observedOffersCount: 0,
      observedPriceMin: null,
      observedPriceMax: null,
      currency: 'USD'
    };
  }
  const validPrices = offers.map(o => o.offerPrice).filter((p): p is number => typeof p === 'number' && !isNaN(p));
  return {
    observedOffersCount: offers.length,
    observedPriceMin: validPrices.length > 0 ? Math.min(...validPrices) : null,
    observedPriceMax: validPrices.length > 0 ? Math.max(...validPrices) : null,
    currency: offers[0]?.currency || 'USD'
  };
}

const rawWorkbenchProducts: WorkbenchProduct[] = [
  // 1. PRIMARY MODEL - VaporStride Carbon Elite (Critical / Modeled in P03)
  {
    id: CANONICAL_PRODUCT_ID,
    name: CANONICAL_PRODUCT_NAME,
    brand: 'AeroPulse Athletics',
    category: 'Running',
    sku: CANONICAL_PRODUCT_SKU,
    gtin: CANONICAL_PRODUCT_GTIN,
    mpn: CANONICAL_PRODUCT_MPN,
    modelNumber: 'VSC-2024-X',
    variantCount: 12,
    identityStatus: 'Needs Verification',
    identityDetail: 'Variant GTIN collision detected between size 10.5 and 11 on partner feeds.',
    intelligenceCoverage: 70,
    coverageStatus: 'Critical',
    dominantEvidenceState: 'CONFLICT',
    evidenceBreakdown: {
      observed: 7,
      verified: 1,
      derived: 1,
      conflict: 2,
      missing: 2
    },
    unresolvedClaimsCount: 4,
    evidenceSummary: 'Conflicting upper material (Matrix Engineered Mesh vs 100% Recycled Poly) and missing return warranty.',
    criticalIssuesCount: 1,
    highIssuesCount: 2,
    mediumIssuesCount: 1,
    topIssues: [
      'Variant GTIN barcode collision on 2 sizes',
      'Upper material composition conflict between manufacturer and retailer',
      'Missing authoritative return window schema'
    ],
    observedOffersCount: 4,
    observedPriceMin: 189.00,
    observedPriceMax: 260.00,
    currency: 'USD',
    discoveryReadiness: 64,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Unresolved material conflict reduces conversational answer confidence on durability.',
    priority: 'Critical',
    priorityScore: 98,
    priorityRationale: 'High buyer volume with critical GTIN conflict affecting feed ingestion and shopping engines.',
    lastAnalyzed: 'Today 08:42 AM',
    isPrimaryExample: true,
    whatAIXShopKnows: 'Weight (198g), Heel Drop (8mm), Full-length Carbon Plate, PEBA midsole verified via tech spec sheet.',
    whatAIXShopCannotVerify: [
      'Exact percentage of post-consumer recycled upper polyester',
      'Authorized return window across multi-brand third-party sellers'
    ],
    whyItMatters: {
      category: 'Purchase',
      explanation: 'Shoppers querying AI engines regarding marathon legality or sustainability receive contradictory claims.'
    },
    recommendedNextStep: 'Arbitrate upper material spec and assign unique GS1 barcodes to variants.',
    buyerIntentScores: {
      discovery: 78,
      problem: 62,
      comparison: 70,
      specification: 85,
      purchase: 65,
      useCase: 72,
      trust: 58
    }
  },

  // 2. Critical Product - AeroPulse Horizon Trail Hydro
  {
    id: 'aix-prod-849201948450',
    name: 'AeroPulse Horizon Trail Hydro',
    brand: 'AeroPulse Athletics',
    category: 'Outdoor',
    sku: 'AP-HTH-002',
    gtin: '0084012398450',
    mpn: 'AP-HTH-400',
    modelNumber: 'HTH-GTX-24',
    variantCount: 8,
    identityStatus: 'Needs Verification',
    identityDetail: 'Waterproof rating membrane certification missing from canonical GS1 record.',
    intelligenceCoverage: 64,
    coverageStatus: 'Critical',
    dominantEvidenceState: 'CONFLICT',
    evidenceBreakdown: {
      observed: 6,
      verified: 0,
      derived: 2,
      conflict: 2,
      missing: 3
    },
    unresolvedClaimsCount: 5,
    evidenceSummary: 'Membrane claim conflict: retailer lists Gore-Tex, brand manual states proprietary HydroShield.',
    criticalIssuesCount: 1,
    highIssuesCount: 2,
    mediumIssuesCount: 2,
    topIssues: [
      'Waterproof membrane trademark discrepancy',
      'Missing outsole lug depth specification (4mm vs 5mm)',
      'No cold-weather temperature comfort rating'
    ],
    observedOffersCount: 3,
    observedPriceMin: 165.00,
    observedPriceMax: 210.00,
    currency: 'USD',
    discoveryReadiness: 58,
    discoveryStatus: 'Critical',
    majorDiscoveryGap: 'Answer engines cannot confirm waterproof standard (IPX or mm water column).',
    priority: 'Critical',
    priorityScore: 94,
    priorityRationale: 'Active trademark conflict exposes merchant to deceptive advertising flags.',
    lastAnalyzed: 'Today 08:15 AM',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Vibram Megagrip rubber compound and rock plate presence corroborated across 3 retailers.',
    whatAIXShopCannotVerify: [
      'Hydrostatic head pressure rating (mm water resistance)',
      'Sub-zero rubber brittleness threshold'
    ],
    whyItMatters: {
      category: 'Trust',
      explanation: 'Trail runners requiring certified waterproofing encounter conflicting membrane specifications.'
    },
    recommendedNextStep: 'Upload official HydroShield lab certification document.',
    buyerIntentScores: {
      discovery: 65,
      problem: 54,
      comparison: 60,
      specification: 72,
      purchase: 61,
      useCase: 58,
      trust: 52
    }
  },

  // 3. Critical Product - ApexVelocity Spikes Pro
  {
    id: 'aix-prod-849201948499',
    name: 'ApexVelocity Spikes Pro',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    sku: 'AP-AVS-003',
    gtin: '0084012398499',
    mpn: 'AP-AVS-TRACK-01',
    modelNumber: 'AVS-PRO-01',
    variantCount: 6,
    identityStatus: 'Needs Verification',
    identityDetail: 'Spike receptacle thread pitch unverified for World Athletics compliance.',
    intelligenceCoverage: 62,
    coverageStatus: 'Critical',
    dominantEvidenceState: 'CONFLICT',
    evidenceBreakdown: {
      observed: 5,
      verified: 0,
      derived: 1,
      conflict: 2,
      missing: 3
    },
    unresolvedClaimsCount: 5,
    evidenceSummary: 'Track pin thread diameter (4mm vs 5mm) conflicts between EU and US distributor catalogs.',
    criticalIssuesCount: 1,
    highIssuesCount: 1,
    mediumIssuesCount: 2,
    topIssues: [
      'Spike thread diameter discrepancy',
      'Missing World Athletics shoe certification reference',
      'Unverified plate stiffness index'
    ],
    observedOffersCount: 2,
    observedPriceMin: 145.00,
    observedPriceMax: 180.00,
    currency: 'USD',
    discoveryReadiness: 55,
    discoveryStatus: 'Critical',
    majorDiscoveryGap: 'Track coaches searching for WA-sanctioned sprint shoes cannot verify compliance.',
    priority: 'Critical',
    priorityScore: 92,
    priorityRationale: 'High regulatory rejection risk for competitive athlete buyers.',
    lastAnalyzed: 'Yesterday',
    isPrimaryExample: false,
    whatAIXShopKnows: '6-pin spike layout with Pebax spike plate confirmed on factory spec sheet.',
    whatAIXShopCannotVerify: [
      'World Athletics Certificate Number',
      'Replacement pin thread pitch standard'
    ],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Athletes disqualified from track meets if shoes exceed sole stack height regulations.'
    },
    recommendedNextStep: 'Provide WA approval ID and verified spike wrench thread specs.',
    buyerIntentScores: {
      discovery: 58,
      problem: 50,
      comparison: 62,
      specification: 68,
      purchase: 55,
      useCase: 50,
      trust: 48
    }
  },

  // 4. Critical Product - AeroPulse HydroVest 10L
  {
    id: 'aix-prod-849201948512',
    name: 'AeroPulse HydroVest 10L Pro',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    sku: 'AP-ACC-HV10',
    gtin: '0084012398512',
    mpn: 'AP-HV10-BK',
    modelNumber: 'HV-10L-2024',
    variantCount: 3,
    identityStatus: 'Needs Verification',
    identityDetail: 'Included bladder capacity conflicting between 1.5L and 2.0L.',
    intelligenceCoverage: 66,
    coverageStatus: 'Critical',
    dominantEvidenceState: 'CONFLICT',
    evidenceBreakdown: {
      observed: 6,
      verified: 0,
      derived: 1,
      conflict: 2,
      missing: 2
    },
    unresolvedClaimsCount: 4,
    evidenceSummary: 'Hydration reservoir volume listed as 1.5L on box barcode, 2.0L in product title on marketplace.',
    criticalIssuesCount: 1,
    highIssuesCount: 1,
    mediumIssuesCount: 1,
    topIssues: [
      'Hydration reservoir volume discrepancy',
      'BPA/PVC free certification lab certificate missing',
      'Chest strap size adjustment range unverified'
    ],
    observedOffersCount: 4,
    observedPriceMin: 120.00,
    observedPriceMax: 155.00,
    currency: 'USD',
    discoveryReadiness: 61,
    discoveryStatus: 'Critical',
    majorDiscoveryGap: 'Search engines struggle to index volume attributes for filtering.',
    priority: 'Critical',
    priorityScore: 90,
    priorityRationale: 'Direct return driver: buyers receiving wrong hydration pack capacity.',
    lastAnalyzed: 'Yesterday',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Ripstop 70D nylon fabric and front pole attachment loops observed in photos.',
    whatAIXShopCannotVerify: [
      'Actual reservoir volumetric capacity shipped in package',
      'Washability temperature limitation for magnetic bite valve'
    ],
    whyItMatters: {
      category: 'Purchase',
      explanation: 'Ultra-marathon mandatory gear checks require exact liquid capacity compliance.'
    },
    recommendedNextStep: 'Standardize hydration flask volume and update packaging schema.',
    buyerIntentScores: {
      discovery: 68,
      problem: 58,
      comparison: 64,
      specification: 70,
      purchase: 62,
      useCase: 60,
      trust: 54
    }
  },

  // 5. Critical Product - AeroCarbon Road TriSuit
  {
    id: 'aix-prod-849201948544',
    name: 'AeroCarbon Road TriSuit Speed',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    sku: 'AP-APP-TS05',
    gtin: '0084012398544',
    mpn: 'AP-TS-SPEED-MEN',
    modelNumber: 'TS-AERO-24',
    variantCount: 5,
    identityStatus: 'Needs Verification',
    identityDetail: 'UPF sun protection rating unbacked by laboratory test standard.',
    intelligenceCoverage: 68,
    coverageStatus: 'Critical',
    dominantEvidenceState: 'CONFLICT',
    evidenceBreakdown: {
      observed: 7,
      verified: 0,
      derived: 2,
      conflict: 1,
      missing: 3
    },
    unresolvedClaimsCount: 4,
    evidenceSummary: 'UPF 50+ claim conflicts with laboratory wash test reporting UPF 30 after 15 washes.',
    criticalIssuesCount: 1,
    highIssuesCount: 2,
    mediumIssuesCount: 1,
    topIssues: [
      'UPF sun protection degradation discrepancy',
      'Chamois quick-dry timing unverified',
      'Missing chlorine resistance guarantee'
    ],
    observedOffersCount: 2,
    observedPriceMin: 220.00,
    observedPriceMax: 275.00,
    currency: 'USD',
    discoveryReadiness: 62,
    discoveryStatus: 'Critical',
    majorDiscoveryGap: 'Triathletes searching for sun-safe race day suits receive unverified claims.',
    priority: 'Critical',
    priorityScore: 89,
    priorityRationale: 'Health and safety claims without verified lab backing.',
    lastAnalyzed: '2 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Italian Dimple aero fabric on shoulders and micro-perforated back panel.',
    whatAIXShopCannotVerify: [
      'Certified UPF rating standard (AS/NZS 4399 vs ASTM D6544)',
      'Thermal retention in open water swim transitions'
    ],
    whyItMatters: {
      category: 'Trust',
      explanation: 'Endurance athletes competing for 6+ hours rely on certified UV protection.'
    },
    recommendedNextStep: 'Attach certified textile laboratory sun protection test results.',
    buyerIntentScores: {
      discovery: 70,
      problem: 60,
      comparison: 66,
      specification: 74,
      purchase: 65,
      useCase: 64,
      trust: 55
    }
  },

  // 6. Needs Attention - ApexStride Pro Marathoner (Conflict on sizing)
  {
    id: 'aix-prod-849201948577',
    name: 'ApexStride Pro Marathoner',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    sku: 'AP-ASM-006',
    gtin: '0084012398577',
    mpn: 'AP-ASM-MARATHON',
    modelNumber: 'ASM-M2-24',
    variantCount: 10,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; sole drop measurement discrepancies identified.',
    intelligenceCoverage: 76,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'CONFLICT',
    evidenceBreakdown: {
      observed: 8,
      verified: 1,
      derived: 1,
      conflict: 1,
      missing: 2
    },
    unresolvedClaimsCount: 3,
    evidenceSummary: 'Heel-to-toe drop listed as 6mm in user reviews and 8mm on packaging.',
    criticalIssuesCount: 0,
    highIssuesCount: 2,
    mediumIssuesCount: 1,
    topIssues: [
      'Heel-to-toe drop millimeter variance (6mm vs 8mm)',
      'Missing verified race day energy return percentage',
      'Incomplete return policy evidence'
    ],
    observedOffersCount: 3,
    observedPriceMin: 175.00,
    observedPriceMax: 215.00,
    currency: 'USD',
    discoveryReadiness: 71,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Comparison queries between 6mm and 8mm drop shoes show conflicting data.',
    priority: 'High',
    priorityScore: 82,
    priorityRationale: 'Shoe drop is a core biomechanical purchase criterion.',
    lastAnalyzed: 'Today 07:30 AM',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Dual-density nitrogen infused superfoam and carbon wing plate confirmed.',
    whatAIXShopCannotVerify: [
      'True stack height at center of forefoot and heel under ISO standard',
      'Outsole lifespan in wet pavement conditions'
    ],
    whyItMatters: {
      category: 'Comparison',
      explanation: 'Runners prone to Achilles tendinitis strictly filter by shoe drop measurements.'
    },
    recommendedNextStep: 'Publish ISO-standardized caliper stack measurements.',
    buyerIntentScores: {
      discovery: 76,
      problem: 68,
      comparison: 72,
      specification: 82,
      purchase: 74,
      useCase: 70,
      trust: 66
    }
  },

  // 7. Needs Attention - CloudDrift Daily Trainer v3
  {
    id: 'aix-prod-849201948601',
    name: 'CloudDrift Daily Trainer v3',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    sku: 'AP-CDT-007',
    gtin: '0084012398601',
    mpn: 'AP-CDT-V3-MEN',
    modelNumber: 'CDT-300-24',
    variantCount: 14,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; missing warranty documentation.',
    intelligenceCoverage: 79,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 9,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 3
    },
    unresolvedClaimsCount: 3,
    evidenceSummary: 'Missing return policy schema and high-mileage durability guarantee evidence.',
    criticalIssuesCount: 0,
    highIssuesCount: 2,
    mediumIssuesCount: 1,
    topIssues: [
      'Missing return policy and warranty timeframe',
      'No structured 500-mile midsole pack-out data',
      'Incomplete wide (2E) sizing availability data'
    ],
    observedOffersCount: 5,
    observedPriceMin: 140.00,
    observedPriceMax: 165.00,
    currency: 'USD',
    discoveryReadiness: 74,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'AI shopping engines hesitate on warranty and satisfaction guarantee answers.',
    priority: 'High',
    priorityScore: 78,
    priorityRationale: 'High sales volume shoe suffering trust penalties due to missing policy schema.',
    lastAnalyzed: 'Yesterday',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Engineered jacquard upper, 280g shoe weight, 10mm drop verified.',
    whatAIXShopCannotVerify: [
      'Manufacturer 30-day wear-and-test guarantee',
      'Recyclability program participation'
    ],
    whyItMatters: {
      category: 'Trust',
      explanation: 'First-time buyers looking for a dependable daily shoe look for return guarantees.'
    },
    recommendedNextStep: 'Link merchant store return policy structured JSON-LD.',
    buyerIntentScores: {
      discovery: 82,
      problem: 72,
      comparison: 75,
      specification: 86,
      purchase: 78,
      useCase: 75,
      trust: 60
    }
  },

  // 8. Needs Attention - AeroKnit Recovery Slide
  {
    id: 'aix-prod-849201948634',
    name: 'AeroKnit Recovery Slide Cushion',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    sku: 'AP-REC-008',
    gtin: '0084012398634',
    mpn: 'AP-REC-SLIDE-01',
    modelNumber: 'REC-SL-24',
    variantCount: 6,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; sizing conversion table needs validation.',
    intelligenceCoverage: 81,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 10,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 2
    },
    unresolvedClaimsCount: 2,
    evidenceSummary: 'Sizing scale discrepancy between US and EU whole sizing increments.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 2,
    topIssues: [
      'EU to US unisex size conversion chart missing',
      'Plantar fasciitis podiatrist endorsement unverified'
    ],
    observedOffersCount: 3,
    observedPriceMin: 55.00,
    observedPriceMax: 70.00,
    currency: 'USD',
    discoveryReadiness: 76,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Queries asking "do these run true to size?" lack verified consumer guidance.',
    priority: 'Medium',
    priorityScore: 71,
    priorityRationale: 'Unisex slide sizing causes avoidable return logistics.',
    lastAnalyzed: '2 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Dual-density EVA foam and textured footbed cradle modeled accurately.',
    whatAIXShopCannotVerify: [
      'Footbed arch height in millimeters',
      'Exact half-size up/down sizing recommendation'
    ],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Recovery footwear buyers have specific arch support needs.'
    },
    recommendedNextStep: 'Add verified foot length (cm) to US/EU size conversion grid.',
    buyerIntentScores: {
      discovery: 84,
      problem: 75,
      comparison: 70,
      specification: 80,
      purchase: 82,
      useCase: 78,
      trust: 68
    }
  },

  // 9. Needs Attention - AeroTempo Carbon Half-Zip
  {
    id: 'aix-prod-849201948668',
    name: 'AeroTempo Thermal Half-Zip',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    sku: 'AP-APP-THZ09',
    gtin: '0084012398668',
    mpn: 'AP-HZ-THERMAL-M',
    modelNumber: 'HZ-TH-24',
    variantCount: 8,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; fabric grammage unverified.',
    intelligenceCoverage: 77,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 8,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 3
    },
    unresolvedClaimsCount: 3,
    evidenceSummary: 'Fabric weight (GSM) unverified; thumbhole loop durability missing.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 2,
    topIssues: [
      'Missing GSM fabric density specification',
      'Windproof front panel resistance rating missing',
      'Reflective trim lumens rating unbacked'
    ],
    observedOffersCount: 2,
    observedPriceMin: 88.00,
    observedPriceMax: 110.00,
    currency: 'USD',
    discoveryReadiness: 73,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Winter runner queries regarding temperature comfort ranges cannot be answered reliably.',
    priority: 'Medium',
    priorityScore: 68,
    priorityRationale: 'Winter running apparel needs clear temperature threshold specifications.',
    lastAnalyzed: '2 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Brushed fleece interior and YKK semi-autolock zipper verified.',
    whatAIXShopCannotVerify: [
      'Ideal ambient running temperature range (°C)',
      'Odor-control zinc pyrithione wash retention'
    ],
    whyItMatters: {
      category: 'Use Case',
      explanation: 'Shoppers need to know if half-zip is suitable for sub-freezing runs without layers.'
    },
    recommendedNextStep: 'Document fabric weight in grams per square meter (GSM).',
    buyerIntentScores: {
      discovery: 78,
      problem: 70,
      comparison: 68,
      specification: 75,
      purchase: 76,
      useCase: 72,
      trust: 65
    }
  },

  // 10. Needs Attention - AeroPulse TrailGaiter Pro
  {
    id: 'aix-prod-849201948692',
    name: 'AeroPulse TrailGaiter Low Pro',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    sku: 'AP-ACC-TG10',
    gtin: '0084012398692',
    mpn: 'AP-TG-LOW-01',
    modelNumber: 'TG-LOW-24',
    variantCount: 4,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; shoe attachment compatibility unlisted.',
    intelligenceCoverage: 75,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 7,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 3
    },
    unresolvedClaimsCount: 3,
    evidenceSummary: 'Compatibility list with non-AeroPulse trail shoes is missing from schema.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 2,
    topIssues: [
      'Third-party trail shoe hook compatibility missing',
      'Under-arch hypalon strap replacement availability missing',
      'Sand vs scree mesh density unverified'
    ],
    observedOffersCount: 3,
    observedPriceMin: 28.00,
    observedPriceMax: 35.00,
    currency: 'USD',
    discoveryReadiness: 70,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Shoppers asking "will these work on Altra or Hoka trail shoes?" find no answer.',
    priority: 'Medium',
    priorityScore: 66,
    priorityRationale: 'Universal compatibility questions determine buyer confidence.',
    lastAnalyzed: '3 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Abrasion-resistant elastane stretch fabric and rear velcro tab verified.',
    whatAIXShopCannotVerify: [
      'Gaiter hook aperture diameter (mm)',
      'Warranty against rock puncture'
    ],
    whyItMatters: {
      category: 'Comparison',
      explanation: 'Trail runners need to know if gaiter attaches to their specific shoe models.'
    },
    recommendedNextStep: 'Publish structured compatibility chart for top trail running brands.',
    buyerIntentScores: {
      discovery: 74,
      problem: 68,
      comparison: 64,
      specification: 72,
      purchase: 75,
      useCase: 69,
      trust: 62
    }
  },

  // 11. Needs Attention - CoreImpact Kettlebell 16kg
  {
    id: 'aix-prod-849201948725',
    name: 'CoreImpact Cast Iron Kettlebell 16kg',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    sku: 'AP-TRN-KB16',
    gtin: '0084012398725',
    mpn: 'AP-KB-16KG-POWDER',
    modelNumber: 'KB-16-24',
    variantCount: 5,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; handle diameter tolerance missing.',
    intelligenceCoverage: 80,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 9,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 2
    },
    unresolvedClaimsCount: 2,
    evidenceSummary: 'Handle grip diameter millimeter spec missing; powder coating texture standard unlisted.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 1,
    topIssues: [
      'Handle diameter tolerance (33mm vs 35mm) unverified',
      'Base flat ground diameter unlisted'
    ],
    observedOffersCount: 2,
    observedPriceMin: 65.00,
    observedPriceMax: 80.00,
    currency: 'USD',
    discoveryReadiness: 75,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Strength athletes filtering for competition-standard handle thickness.',
    priority: 'Low',
    priorityScore: 58,
    priorityRationale: 'Simple physical spec gap with low warranty liability.',
    lastAnalyzed: '3 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Single-piece gravity cast iron with color-coded handle bands.',
    whatAIXShopCannotVerify: [
      'Weight casting tolerance percentage (+/- 1%)',
      'Coating scratch resistance rating'
    ],
    whyItMatters: {
      category: 'Specification',
      explanation: 'High-rep kettlebell athletes require verified handle diameter for grip endurance.'
    },
    recommendedNextStep: 'Add caliper-verified handle circumference to product specifications.',
    buyerIntentScores: {
      discovery: 80,
      problem: 72,
      comparison: 74,
      specification: 80,
      purchase: 82,
      useCase: 76,
      trust: 70
    }
  },

  // 12. Needs Attention - AeroStrobe Running Headlamp 400
  {
    id: 'aix-prod-849201948758',
    name: 'AeroStrobe NightVision Headlamp 400',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    sku: 'AP-ACC-HL400',
    gtin: '0084012398758',
    mpn: 'AP-HL-400-LUMEN',
    modelNumber: 'HL-400-NV',
    variantCount: 2,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; lumen runtime curve unverified.',
    intelligenceCoverage: 78,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 8,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 3
    },
    unresolvedClaimsCount: 3,
    evidenceSummary: 'ANSI FL1 runtime curve at 400 lumens peak output unverified.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 2,
    topIssues: [
      'Missing ANSI FL1 runtime step-down graph',
      'IPX rating (IPX4 vs IPX6) unverified on packaging',
      'Battery rechargeable mAh capacity unlisted'
    ],
    observedOffersCount: 4,
    observedPriceMin: 42.00,
    observedPriceMax: 55.00,
    currency: 'USD',
    discoveryReadiness: 72,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Night trail runners asking how long 400 lumens lasts before stepping down.',
    priority: 'Medium',
    priorityScore: 69,
    priorityRationale: 'Night trail safety relies on honest light runtime data.',
    lastAnalyzed: '4 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'USB-C charging port, red night vision mode, and tilt mechanism verified.',
    whatAIXShopCannotVerify: [
      'True constant lumen duration before step-down to 150 lumens',
      'Cold weather lithium battery discharge profile'
    ],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Ultra runners require headlamps that do not step down suddenly during 100-mile races.'
    },
    recommendedNextStep: 'Publish ANSI/NEMA FL 1 runtime discharge graph.',
    buyerIntentScores: {
      discovery: 76,
      problem: 71,
      comparison: 68,
      specification: 78,
      purchase: 74,
      useCase: 73,
      trust: 64
    }
  },

  // 13. Needs Attention - AeroSprint Compression Tights
  {
    id: 'aix-prod-849201948791',
    name: 'AeroSprint Targeted Compression Tights',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    sku: 'AP-APP-CT13',
    gtin: '0084012398791',
    mpn: 'AP-CT-MENS-BLK',
    modelNumber: 'CT-AERO-24',
    variantCount: 6,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; mmHg pressure rating unverified.',
    intelligenceCoverage: 76,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 8,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 3
    },
    unresolvedClaimsCount: 3,
    evidenceSummary: 'Graduated compression rating in mmHg missing; medical class claim unbacked.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 2,
    topIssues: [
      'Ankle to thigh mmHg pressure graduation missing',
      'Post-workout recovery claim unbacked by clinical study',
      'Inseam length millimeter chart unlisted'
    ],
    observedOffersCount: 3,
    observedPriceMin: 85.00,
    observedPriceMax: 105.00,
    currency: 'USD',
    discoveryReadiness: 71,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Athletes filtering for medical grade 20-30 mmHg compression find missing data.',
    priority: 'Medium',
    priorityScore: 67,
    priorityRationale: 'Compression claims require quantitative pressure documentation.',
    lastAnalyzed: '4 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'High-filament nylon/elastane blend and flatlock anti-chafing seams verified.',
    whatAIXShopCannotVerify: [
      'Quantitative pressure in millimeters of mercury (mmHg)',
      'Recovery lactate clearance research backing'
    ],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Shoppers looking for medical-grade recovery need exact pressure metrics.'
    },
    recommendedNextStep: 'Specify calibrated graduated pressure gradient values.',
    buyerIntentScores: {
      discovery: 75,
      problem: 69,
      comparison: 67,
      specification: 76,
      purchase: 73,
      useCase: 71,
      trust: 62
    }
  },

  // 14. Needs Attention - AeroHydro Insulated Flask 750ml
  {
    id: 'aix-prod-849201948824',
    name: 'AeroHydro Titanium Double-Wall Flask 750ml',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    sku: 'AP-ACC-FL750',
    gtin: '0084012398824',
    mpn: 'AP-FLASK-TI-750',
    modelNumber: 'FL-TI-24',
    variantCount: 3,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; thermal retention test methodology unverified.',
    intelligenceCoverage: 79,
    coverageStatus: 'Needs Attention',
    dominantEvidenceState: 'MISSING',
    evidenceBreakdown: {
      observed: 9,
      verified: 1,
      derived: 2,
      conflict: 0,
      missing: 2
    },
    unresolvedClaimsCount: 2,
    evidenceSummary: '24-hour ice cold claim missing standardized test ambient temperature.',
    criticalIssuesCount: 0,
    highIssuesCount: 1,
    mediumIssuesCount: 1,
    topIssues: [
      'Thermal test ambient temperature unlisted',
      'Dishwasher safety caveat unverified'
    ],
    observedOffersCount: 2,
    observedPriceMin: 48.00,
    observedPriceMax: 60.00,
    currency: 'USD',
    discoveryReadiness: 74,
    discoveryStatus: 'Needs Attention',
    majorDiscoveryGap: 'Outdoor comparison engines cannot verify standardized thermal retention curve.',
    priority: 'Low',
    priorityScore: 59,
    priorityRationale: 'Thermal claim vagueness is common but easily remedied with test data.',
    lastAnalyzed: '5 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Grade 1 titanium inner wall and vacuum seal technology verified.',
    whatAIXShopCannotVerify: [
      'Internal water temperature after 12h at 30°C ambient',
      'BPA-free lid seal material breakdown'
    ],
    whyItMatters: {
      category: 'Comparison',
      explanation: 'Campers compare thermal insulation against established vacuum bottles.'
    },
    recommendedNextStep: 'Document test parameters: initial water temp vs 24h temp curve.',
    buyerIntentScores: {
      discovery: 79,
      problem: 71,
      comparison: 72,
      specification: 81,
      purchase: 80,
      useCase: 75,
      trust: 68
    }
  },

  // 15. Strong Product - TempoFlow Everyday Trainer
  {
    id: 'aix-prod-849201948857',
    name: 'AeroPulse TempoFlow Everyday Trainer',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    sku: 'AP-TFT-015',
    gtin: '0084012398857',
    mpn: 'AP-TFT-GEN3',
    modelNumber: 'TFT-300',
    variantCount: 12,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved and verified against GS1 registry.',
    intelligenceCoverage: 94,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 11,
      verified: 4,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'All core attributes verified with manufacturer spec sheet and lab tests.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 5,
    observedPriceMin: 125.00,
    observedPriceMax: 145.00,
    currency: 'USD',
    discoveryReadiness: 92,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None. Complete machine-readable schema across search and AI answer engines.',
    priority: 'None',
    priorityScore: 12,
    priorityRationale: 'Fully grounded canonical product model. No immediate remediation required.',
    lastAnalyzed: 'Today 08:30 AM',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Weight (245g), 9mm drop, supercritical EVA foam, and carbon rubber outsole verified.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Purchase',
      explanation: 'High discovery readiness leads to accurate representation across AI search engines.'
    },
    recommendedNextStep: 'Maintain monitoring for seller price discrepancies.',
    buyerIntentScores: {
      discovery: 95,
      problem: 91,
      comparison: 93,
      specification: 98,
      purchase: 96,
      useCase: 92,
      trust: 90
    }
  },

  // 16. Strong Product - Velocity Carbon Pro Distance
  {
    id: 'aix-prod-849201948880',
    name: 'AeroPulse Velocity Carbon Pro 5K/10K',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    sku: 'AP-VCP-016',
    gtin: '0084012398880',
    mpn: 'AP-VCP-RACE',
    modelNumber: 'VCP-5K10K',
    variantCount: 8,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity verified; World Athletics shoe certificate linked.',
    intelligenceCoverage: 92,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 10,
      verified: 3,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'Full stack height (34mm heel / 28mm forefoot) and plate curvature verified.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 4,
    observedPriceMin: 195.00,
    observedPriceMax: 220.00,
    currency: 'USD',
    discoveryReadiness: 90,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None. WA regulatory certificate code in schema.',
    priority: 'None',
    priorityScore: 14,
    priorityRationale: 'Authoritative race shoe documentation.',
    lastAnalyzed: 'Today 08:00 AM',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Stack height (34mm), Drop (6mm), PEBA superfoam, 168g weight confirmed.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Competitive runners can instantly verify track and road race legality.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 93,
      problem: 88,
      comparison: 92,
      specification: 96,
      purchase: 94,
      useCase: 90,
      trust: 89
    }
  },

  // 17. Strong Product - AeroPulse TrailCore X Mountain
  {
    id: 'aix-prod-849201948913',
    name: 'AeroPulse TrailCore X Mountain Shoe',
    brand: 'AeroPulse Athletics',
    category: 'Outdoor',
    sku: 'AP-TCX-017',
    gtin: '0084012398913',
    mpn: 'AP-TCX-MTN',
    modelNumber: 'TCX-2024',
    variantCount: 10,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved and verified with Vibram partnership data.',
    intelligenceCoverage: 91,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'OBSERVED',
    evidenceBreakdown: {
      observed: 11,
      verified: 2,
      derived: 2,
      conflict: 0,
      missing: 1
    },
    unresolvedClaimsCount: 1,
    evidenceSummary: '5mm multidirectional traction lugs and Matryx kevlar reinforced weave verified.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 1,
    topIssues: ['Minor: Winter ice stud compatibility not explicitly specified'],
    observedOffersCount: 4,
    observedPriceMin: 155.00,
    observedPriceMax: 180.00,
    currency: 'USD',
    discoveryReadiness: 88,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'Minor ice traction spec detail.',
    priority: 'Low',
    priorityScore: 22,
    priorityRationale: 'High overall coverage with minor peripheral specification omission.',
    lastAnalyzed: 'Yesterday',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Lug depth (5.0mm), Vibram Litebase outsole, Kevlar upper blend verified.',
    whatAIXShopCannotVerify: ['Tungsten carbide aftermarket stud compatibility'],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Trail runners need deep lug specs for muddy alpine terrain.'
    },
    recommendedNextStep: 'Add winter studding compatibility note to tech specs.',
    buyerIntentScores: {
      discovery: 90,
      problem: 86,
      comparison: 90,
      specification: 94,
      purchase: 92,
      useCase: 89,
      trust: 88
    }
  },

  // 18. Strong Product - AeroGlide Recovery Mule
  {
    id: 'aix-prod-849201948946',
    name: 'AeroGlide Post-Run Recovery Mule',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    sku: 'AP-REC-ML18',
    gtin: '0084012398946',
    mpn: 'AP-REC-MULE-UNISEX',
    modelNumber: 'MULE-REC-24',
    variantCount: 6,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved with verified unisex conversion table.',
    intelligenceCoverage: 93,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 10,
      verified: 3,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'Deep heel cup, medial arch lift, and closed-cell antibacterial foam verified.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 3,
    observedPriceMin: 65.00,
    observedPriceMax: 75.00,
    currency: 'USD',
    discoveryReadiness: 91,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 11,
    priorityRationale: 'Clean intelligence model with complete sizing data.',
    lastAnalyzed: 'Yesterday',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Arch support elevation (32mm), antimicrobial additive, waterproof washability.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Purchase',
      explanation: 'Sizing clarity prevents recovery slide return friction.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 92,
      problem: 90,
      comparison: 91,
      specification: 95,
      purchase: 95,
      useCase: 93,
      trust: 91
    }
  },

  // 19. Strong Product - AeroZero Race Singlet
  {
    id: 'aix-prod-849201948979',
    name: 'AeroZero Featherweight Race Singlet',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    sku: 'AP-APP-RS19',
    gtin: '0084012398979',
    mpn: 'AP-RS-MENS-AERO',
    modelNumber: 'RS-ZERO-24',
    variantCount: 5,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; certified 48g garment weight.',
    intelligenceCoverage: 95,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 11,
      verified: 4,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'Laser-cut bonded seams, micro-perforated cooling zones, and anti-cling tech verified.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 3,
    observedPriceMin: 60.00,
    observedPriceMax: 70.00,
    currency: 'USD',
    discoveryReadiness: 94,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 9,
    priorityRationale: 'Exemplary product intelligence model.',
    lastAnalyzed: '2 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: 'Garment weight (48g size M), bonded hem tape, 100% recycled micro-polyester.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Weight-conscious marathon racers filter by sub-50g racing tops.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 96,
      problem: 92,
      comparison: 95,
      specification: 98,
      purchase: 97,
      useCase: 94,
      trust: 92
    }
  },

  // 20. Strong Product - AeroPulse SpeedSplit 3" Shorts
  {
    id: 'aix-prod-849201949002',
    name: 'AeroPulse SpeedSplit 3" Racing Shorts',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    sku: 'AP-APP-SS20',
    gtin: '0084012399002',
    mpn: 'AP-SS-3INCH-M',
    modelNumber: 'SS-3IN-24',
    variantCount: 5,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; gel pocket capacity verified.',
    intelligenceCoverage: 91,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 10,
      verified: 3,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'Built-in anti-chafe brief, waterproof zippered rear key pocket, 4 gel pass-through loops.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 4,
    observedPriceMin: 55.00,
    observedPriceMax: 65.00,
    currency: 'USD',
    discoveryReadiness: 90,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 10,
    priorityRationale: 'Complete specification and storage dimensions modeled.',
    lastAnalyzed: '2 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: '3-inch inseam, split side seam, laser-cut ventilation ports verified.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Use Case',
      explanation: 'Marathon runners need verified energy gel storage capacity.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 93,
      problem: 89,
      comparison: 92,
      specification: 96,
      purchase: 94,
      useCase: 93,
      trust: 90
    }
  },

  // 21. Strong Product - ApexGrip Chalk Block 8-Pack
  {
    id: 'aix-prod-849201949035',
    name: 'ApexGrip Pure Magnesium Carbonate Chalk',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    sku: 'AP-TRN-CH21',
    gtin: '0084012399035',
    mpn: 'AP-CHALK-8PACK',
    modelNumber: 'CH-MG-24',
    variantCount: 2,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; USP-grade chemical purity verified.',
    intelligenceCoverage: 96,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 11,
      verified: 4,
      derived: 1,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: '100% pure magnesium carbonate without toxic fillers, rosin-free laboratory certified.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 3,
    observedPriceMin: 18.00,
    observedPriceMax: 24.00,
    currency: 'USD',
    discoveryReadiness: 95,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 6,
    priorityRationale: 'Chemical purity and package weight verified with MSDS documentation.',
    lastAnalyzed: '3 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: '8x 56g blocks, lab certified free of silica and artificial drying agents.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Trust',
      explanation: 'Rock climbers and gymnasts require skin-safe filler-free chalk.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 97,
      problem: 94,
      comparison: 96,
      specification: 99,
      purchase: 98,
      useCase: 96,
      trust: 95
    }
  },

  // 22. Strong Product - AeroPulse SpeedRope Pro Bearing
  {
    id: 'aix-prod-849201949068',
    name: 'AeroPulse SpeedRope Dual-Bearing Speed Rope',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    sku: 'AP-TRN-SR22',
    gtin: '0084012399068',
    mpn: 'AP-SR-BEARING-01',
    modelNumber: 'SR-PRO-24',
    variantCount: 4,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; cable diameter and bearing rating verified.',
    intelligenceCoverage: 92,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'OBSERVED',
    evidenceBreakdown: {
      observed: 10,
      verified: 2,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'ABEC-7 dual rotational steel bearings and 2.5mm nylon-coated wire verified.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 4,
    observedPriceMin: 29.00,
    observedPriceMax: 38.00,
    currency: 'USD',
    discoveryReadiness: 90,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 12,
    priorityRationale: 'Complete technical bearing and cable specs.',
    lastAnalyzed: '3 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: '3-meter adjustable wire, knurled aluminum handles, weight (140g).',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Crossfit athletes require precision bearing spin rates for double unders.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 92,
      problem: 88,
      comparison: 91,
      specification: 95,
      purchase: 94,
      useCase: 91,
      trust: 89
    }
  },

  // 23. Strong Product - AeroPulse Foam Roller 36"
  {
    id: 'aix-prod-849201949091',
    name: 'AeroPulse High-Density EPP Foam Roller 36"',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    sku: 'AP-TRN-FR23',
    gtin: '0084012399091',
    mpn: 'AP-FR-36INCH-EPP',
    modelNumber: 'FR-EPP-36',
    variantCount: 2,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; density Shore rating verified.',
    intelligenceCoverage: 90,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    evidenceBreakdown: {
      observed: 9,
      verified: 3,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'Molded expanded polypropylene (EPP), 2lb/cu ft density, Shore 45A hardness.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 3,
    observedPriceMin: 32.00,
    observedPriceMax: 40.00,
    currency: 'USD',
    discoveryReadiness: 89,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 13,
    priorityRationale: 'Physical foam density verified with ISO compression standard.',
    lastAnalyzed: '4 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: '36 inch x 6 inch diameter, 350 lb max load bearing capacity.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Trust',
      explanation: 'Physical therapists need verified foam firmness that will not flatten.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 91,
      problem: 87,
      comparison: 90,
      specification: 94,
      purchase: 93,
      useCase: 90,
      trust: 89
    }
  },

  // 24. Strong Product - AeroPulse Race Day Cap
  {
    id: 'aix-prod-849201949124',
    name: 'AeroPulse Ultralight Race Day Perforated Cap',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    sku: 'AP-ACC-RC24',
    gtin: '0084012399124',
    mpn: 'AP-RC-AERO-CAP',
    modelNumber: 'RC-CAP-24',
    variantCount: 4,
    identityStatus: 'Resolved',
    identityDetail: 'Canonical identity resolved; UPF 50+ fabric rating verified.',
    intelligenceCoverage: 91,
    coverageStatus: 'Strong',
    dominantEvidenceState: 'OBSERVED',
    evidenceBreakdown: {
      observed: 10,
      verified: 2,
      derived: 2,
      conflict: 0,
      missing: 0
    },
    unresolvedClaimsCount: 0,
    evidenceSummary: 'Laser-perforated side ventilation, foldable soft bill, 32g total weight.',
    criticalIssuesCount: 0,
    highIssuesCount: 0,
    mediumIssuesCount: 0,
    topIssues: [],
    observedOffersCount: 4,
    observedPriceMin: 26.00,
    observedPriceMax: 32.00,
    currency: 'USD',
    discoveryReadiness: 89,
    discoveryStatus: 'Strong',
    majorDiscoveryGap: 'None.',
    priority: 'None',
    priorityScore: 11,
    priorityRationale: 'Complete fabric and weight specifications.',
    lastAnalyzed: '4 days ago',
    isPrimaryExample: false,
    whatAIXShopKnows: '32g weight, UPF 50+ brim, adjustable elastic drawcord with cordlock.',
    whatAIXShopCannotVerify: [],
    whyItMatters: {
      category: 'Specification',
      explanation: 'Runners compare folding soft-bill caps for pocket packability.'
    },
    recommendedNextStep: 'No action required.',
    buyerIntentScores: {
      discovery: 91,
      problem: 86,
      comparison: 89,
      specification: 93,
      purchase: 92,
      useCase: 89,
      trust: 88
    }
  }
];


/**
 * Single authoritative Workbench Product universe (24 products)
 * Dynamically binds derived offer metrics from sampleCommercialOffers
 * preventing Product/Offer boundary violations.
 */
export const sampleWorkbenchProducts: WorkbenchProduct[] = rawWorkbenchProducts.map(product => {
  const offerSummary = deriveProductOfferSummary(product.id);
  return {
    ...product,
    observedOffersCount: offerSummary.observedOffersCount,
    observedPriceMin: offerSummary.observedPriceMin,
    observedPriceMax: offerSummary.observedPriceMax,
    currency: offerSummary.currency
  };
});
