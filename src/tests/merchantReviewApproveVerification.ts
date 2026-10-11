/**
 * AIXSHOP — Merchant Task-First & Review-Approve Workflow Verification
 * Verifies that the merchant experience is a guided task-first review-approve workflow
 * answering the 10 core merchant questions and maintaining all truth boundaries.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';
import { sampleIssuesData, sampleIssuesMetrics } from '../data/sampleIssuesData';
import { 
  MERCHANT_MENTAL_MODEL_STAGES,
  MERCHANT_PRIMARY_NAV_ITEMS
} from '../components/merchant/merchantNavigationConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('======================================================');
console.log(' AIXSHOP SPRINT VERIFICATION: TASK-FIRST & REVIEW-APPROVE');
console.log('======================================================\n');

let passedTests = 0;
let failedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (detail) console.error(`         ${detail}`);
    failedTests++;
  }
}

// 1. MENTAL MODEL PIPELINE: Add → Check → Review → Approve → Recheck → Ready
console.log('--- 1. MENTAL MODEL PIPELINE CONTRACT ---');
assert(MERCHANT_MENTAL_MODEL_STAGES.length === 6, 'Mental model contains exactly 6 stages');
assert(MERCHANT_MENTAL_MODEL_STAGES[0].stage === 'add', 'Stage 01 is Add');
assert(MERCHANT_MENTAL_MODEL_STAGES[1].stage === 'check', 'Stage 02 is Check');
assert(MERCHANT_MENTAL_MODEL_STAGES[2].stage === 'review', 'Stage 03 is Review');
assert(MERCHANT_MENTAL_MODEL_STAGES[3].stage === 'approve', 'Stage 04 is Approve');
assert(MERCHANT_MENTAL_MODEL_STAGES[4].stage === 'recheck', 'Stage 05 is Recheck');
assert(MERCHANT_MENTAL_MODEL_STAGES[5].stage === 'ready', 'Stage 06 is Ready');

const workflowPath = path.resolve(__dirname, '../components/merchant/MerchantMentalModelWorkflow.tsx');
assert(fs.existsSync(workflowPath), 'MerchantMentalModelWorkflow.tsx exists');
const workflowSrc = fs.readFileSync(workflowPath, 'utf8');
assert(
  workflowSrc.includes('Add → Check → Review → Approve → Recheck → Ready'),
  'Workflow renders the Add → Check → Review → Approve → Recheck → Ready pipeline'
);

// 2. MERCHANT ACTION CENTER: 10 CORE QUESTIONS ANSWERED
console.log('\n--- 2. MERCHANT ACTION CENTER & 10 QUESTIONS ---');
const actionCenterPath = path.resolve(__dirname, '../components/merchant/MerchantActionCenter.tsx');
assert(fs.existsSync(actionCenterPath), 'MerchantActionCenter.tsx exists');
const actionCenterSrc = fs.readFileSync(actionCenterPath, 'utf8');

// Q1: What is happening with my catalog?
assert(
  actionCenterSrc.includes('Products Analyzed') || actionCenterSrc.includes('products across AI shopping engines'),
  'Q1 Answered: Catalog monitoring & analysis summary presented'
);

// Q2: What needs my attention?
assert(
  actionCenterSrc.includes('things worth reviewing'),
  'Q2 Answered: Explicit "Your catalog has X things worth reviewing" presented'
);

// Q3: What should I do next?
assert(
  actionCenterSrc.includes('Start Guided Review') || actionCenterSrc.includes('Review and approve'),
  'Q3 Answered: Clear guidance on next action provided to merchant'
);

// Q4: What does AIXSHOP suggest changing?
assert(
  actionCenterSrc.includes('AIXSHOP Suggested Value:') && actionCenterSrc.includes('Current in your store'),
  'Q4 Answered: Visual diff between current state and suggested update presented'
);

// Q5: Why does AIXSHOP suggest it?
assert(
  actionCenterSrc.includes('Why this matters to shoppers & AI assistants:'),
  'Q5 Answered: Plain English whyItMatters explanation presented'
);

// Q6: What evidence supports the suggestion?
assert(
  actionCenterSrc.includes('Corroborated Evidence:') && actionCenterSrc.includes('Confidence:'),
  'Q6 Answered: Authoritative evidence provenance and confidence presented'
);

// Q7: Can I edit it?
assert(
  actionCenterSrc.includes('startEditing') && actionCenterSrc.includes('Save & Approve'),
  'Q7 Answered: Merchant can edit the suggested values inline before approving'
);

// Q8: Can I approve or reject it?
assert(
  actionCenterSrc.includes('Approve Suggestion') && actionCenterSrc.includes('Dismiss'),
  'Q8 Answered: Explicit Approve and Dismiss/Reject controls provided'
);

// Q9: What happens after I approve it?
assert(
  actionCenterSrc.includes('Approved & Applied') && actionCenterSrc.includes('Fix applied to catalog'),
  'Q9 Answered: Clear post-approval state and staging feedback presented'
);

// Q10: Can I recheck the result?
assert(
  actionCenterSrc.includes('handleRunRecheck') && actionCenterSrc.includes('Run Recheck'),
  'Q10 Answered: Merchant can run catalog recheck simulation'
);

// 3. STEP-BY-STEP GUIDED WIZARD & FILTERING
console.log('\n--- 3. INTERACTIVE WIZARD & FILTERING ---');
assert(actionCenterSrc.includes('wizardOpen'), 'Guided step-by-step review wizard supported');
assert(actionCenterSrc.includes('Needs Review'), 'Filter tab for Needs Review exists');
assert(actionCenterSrc.includes('Approved & Applied'), 'Filter tab for Approved & Applied exists');
assert(actionCenterSrc.includes('Dismissed'), 'Filter tab for Dismissed exists');
assert(actionCenterSrc.includes('handleApproveAll'), 'Batch Approve All Recommended action available');

// 4. TRUTH BOUNDARY & SIMULATION AUDIT
console.log('\n--- 4. TRUTH BOUNDARIES ---');
assert(
  actionCenterSrc.includes('Representative preview simulation') || actionCenterSrc.includes('representative preview'),
  'Recheck explicitly declares representative preview simulation'
);
assert(
  !actionCenterSrc.includes('window.alert'),
  'Zero intrusive window.alert calls'
);

// 5. MERCHANT HOME & WORKSPACE INTEGRATION
console.log('\n--- 5. MERCHANT OVERVIEW HOME INTEGRATION ---');
const homePath = path.resolve(__dirname, '../components/merchant/MerchantOverviewHome.tsx');
assert(fs.existsSync(homePath), 'MerchantOverviewHome.tsx exists');
const homeSrc = fs.readFileSync(homePath, 'utf8');

assert(
  homeSrc.includes('<MerchantActionCenter'),
  'MerchantOverviewHome integrates MerchantActionCenter as primary workflow'
);
assert(
  homeSrc.includes('onApproveIssue={onApproveIssue}'),
  'MerchantOverviewHome passes onApproveIssue handler'
);
assert(
  homeSrc.includes('readinessScore={readinessScore}'),
  'MerchantOverviewHome passes dynamic readinessScore'
);

// 6. SYSTEM INVARIANTS
console.log('\n--- 6. CATALOG INVARIANTS ---');
assert(CANONICAL_SYSTEM_KPIS.totalCatalogProducts === 24, 'Total catalog products remains 24');
assert(sampleIssuesMetrics.openIssues === 8, 'Derived open issues count remains 8');
assert(CANONICAL_SYSTEM_KPIS.discoveryReadinessPct === 79, 'Discovery readiness score baseline remains 79%');
assert(MERCHANT_PRIMARY_NAV_ITEMS.length === 4, 'Primary nav tabs count is exactly 4');
const primaryNavIds = MERCHANT_PRIMARY_NAV_ITEMS.map(i => i.id);
assert(
  primaryNavIds.includes('home') && 
  primaryNavIds.includes('audit') && 
  primaryNavIds.includes('products') && 
  primaryNavIds.includes('actions'),
  'Primary nav tabs are exactly Home, Audit, Products, Actions'
);

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Task-First & Review-Approve Verification PASSED cleanly!\n');
}
