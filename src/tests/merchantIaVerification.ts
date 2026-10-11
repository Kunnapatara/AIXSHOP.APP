/**
 * AIXSHOP — MERCHANT NAVIGATION & INFORMATION ARCHITECTURE VERIFICATION
 * 
 * Verifies:
 * 1. Authoritative Merchant Navigation: EXACTLY Home | Catalog | Issues | Visibility
 * 2. Absolutely NO More dropdown, NO Readiness, NO Shopper/Admin switchers
 * 3. Secondary Account Structure: Connections | Subscription | Settings
 * 4. Authoritative Tab Resolver Mapping
 * 5. Complete Absence of Legacy Machinery & Leakage in Merchant Surface
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  MERCHANT_PRIMARY_NAV_ITEMS, 
  MERCHANT_ACCOUNT_SECTIONS,
  resolveMerchantTab, 
  MERCHANT_MENTAL_MODEL_STAGES
} from '../components/merchant/merchantNavigationConfig';
import { CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n======================================================');
console.log(' AIXSHOP VERIFICATION: MERCHANT SURFACE ISOLATION & IA');
console.log('======================================================\n');

// 1. CANONICAL PRIMARY NAVIGATION CONTRACT
console.log('--- 1. CANONICAL PRIMARY NAVIGATION CONTRACT ---');

assert(MERCHANT_PRIMARY_NAV_ITEMS.length === 4, 'Exactly 4 primary navigation tabs', `found: ${MERCHANT_PRIMARY_NAV_ITEMS.length}`);
const primaryIds = MERCHANT_PRIMARY_NAV_ITEMS.map(i => i.id);
assert(primaryIds.includes('home'), 'Primary nav contains "home"');
assert(primaryIds.includes('audit'), 'Primary nav contains "audit"');
assert(primaryIds.includes('products'), 'Primary nav contains "products"');
assert(primaryIds.includes('actions'), 'Primary nav contains "actions"');

// Prohibited items in primary nav
const prohibitedPrimary = [
  'readiness', 'more', 'offers', 'monitoring', 'analytics', 
  'evidence', 'observations', 'pipeline', 'identity', 'governance', 
  'discovery', 'integrations', 'billing', 'report', 'shopper', 
  'admin', 'landing', 'platform', 'control tower'
];

for (const prohibited of prohibitedPrimary) {
  assert(!primaryIds.includes(prohibited as any), `Primary nav does NOT contain prohibited "${prohibited}"`);
}

// 2. SECONDARY ACCOUNT STRUCTURE
console.log('\n--- 2. SECONDARY ACCOUNT STRUCTURE (Connections | Subscription | Settings) ---');

assert(MERCHANT_ACCOUNT_SECTIONS.length === 3, 'Exactly 3 secondary account sections');
const accountIds = MERCHANT_ACCOUNT_SECTIONS.map(s => s.id);
assert(accountIds.includes('connections'), 'Account contains "connections"');
assert(accountIds.includes('subscription'), 'Account contains "subscription"');
assert(accountIds.includes('settings'), 'Account contains "settings"');

// 3. TAB RESOLUTION AND COMPATIBILITY MAPPING
console.log('\n--- 3. AUTHORITATIVE TAB RESOLVER ---');

assert(resolveMerchantTab('home') === 'home', 'Resolves home -> home');
assert(resolveMerchantTab('overview') === 'home', 'Resolves alias overview -> home');
assert(resolveMerchantTab('audit') === 'audit', 'Resolves audit -> audit');
assert(resolveMerchantTab('visibility') === 'audit', 'Resolves alias visibility -> audit');
assert(resolveMerchantTab('readiness') === 'audit', 'Resolves legacy readiness -> audit');
assert(resolveMerchantTab('discovery') === 'audit', 'Resolves legacy discovery -> audit');
assert(resolveMerchantTab('monitoring') === 'audit', 'Resolves legacy monitoring -> audit');
assert(resolveMerchantTab('analytics') === 'audit', 'Resolves legacy analytics -> audit');
assert(resolveMerchantTab('report') === 'audit', 'Resolves legacy report -> audit');
assert(resolveMerchantTab('products') === 'products', 'Resolves products -> products');
assert(resolveMerchantTab('catalog') === 'products', 'Resolves alias catalog -> products');
assert(resolveMerchantTab('offers') === 'products', 'Resolves legacy offers -> products');
assert(resolveMerchantTab('actions') === 'actions', 'Resolves actions -> actions');
assert(resolveMerchantTab('issues') === 'actions', 'Resolves alias issues -> actions');
assert(resolveMerchantTab('invalid_random_tab') === 'home', 'Fallback for unknown tab is home');

// 4. SOURCE-LEVEL ARCHITECTURAL AUDIT
console.log('\n--- 4. MERCHANT EXPERIENCE SOURCE AUDIT ---');

const merchantExpPath = path.resolve(__dirname, '../components/merchant/MerchantExperience.tsx');
const merchantExpSrc = fs.readFileSync(merchantExpPath, 'utf8');

assert(!merchantExpSrc.includes('MORE_DROPDOWN_LABEL'), 'MerchantExperience does NOT contain MORE_DROPDOWN_LABEL');
assert(!merchantExpSrc.includes('isMoreOpen'), 'MerchantExperience does NOT contain More dropdown state');
assert(!merchantExpSrc.includes('Shopper Public View'), 'MerchantExperience does NOT render Shopper Public View');
assert(!merchantExpSrc.includes('Admin Governance Tower'), 'MerchantExperience does NOT render Admin Governance Tower');
assert(!merchantExpSrc.includes('Platform Landing'), 'MerchantExperience does NOT render Platform Landing');
assert(!merchantExpSrc.includes('onNavigateShopper'), 'MerchantExperience does NOT accept onNavigateShopper prop');
assert(!merchantExpSrc.includes('onNavigateAdmin'), 'MerchantExperience does NOT accept onNavigateAdmin prop');
assert(!merchantExpSrc.includes('DashboardNavigationShell'), 'MerchantExperience does NOT import DashboardNavigationShell');

// 5. ACCOUNT MODAL VERIFICATION
console.log('\n--- 5. ACCOUNT MODAL VERIFICATION ---');

const accountModalPath = path.resolve(__dirname, '../components/merchant/MerchantAccountModal.tsx');
assert(fs.existsSync(accountModalPath), 'MerchantAccountModal.tsx exists');
const accountModalSrc = fs.readFileSync(accountModalPath, 'utf8');

assert(accountModalSrc.includes('Connections & Feeds'), 'Account modal renders Connections');
assert(accountModalSrc.includes('Plan & Catalog Limits') || accountModalSrc.includes('Pro Tier'), 'Account modal renders Subscription');
assert(accountModalSrc.includes('Store Profile & Audit Preferences'), 'Account modal renders Settings');

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Merchant Navigation & IA Verification PASSED cleanly!\n');
}
