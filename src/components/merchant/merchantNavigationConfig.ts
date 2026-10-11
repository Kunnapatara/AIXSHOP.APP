/**
 * AIXSHOP — Authoritative Merchant Navigation Configuration & Types
 * Locked 7-Page Architecture Contract:
 * 1. Landing / Sales / Store Check (Public Entry)
 * 2. Home (Merchant Console Overview)
 * 3. Audit (Store & Catalog Audit Diagnostics + AI Visibility Observations)
 * 4. Products (Catalog Workbench)
 * 5. Product Detail (Contextual Drill-down)
 * 6. Actions (Issues & Remediation Action Center)
 * 7. Store / Settings (Secondary Account & Store Profile Surface)
 *
 * Primary Merchant Destinations: Home | Audit | Products | Actions
 * Account Surface: Connections | Subscription | Settings
 */

export type MerchantTab = 
  | 'home' 
  | 'audit' 
  | 'products' 
  | 'actions'
  | 'catalog' 
  | 'issues' 
  | 'visibility';

export type AccountSubSection = 'connections' | 'subscription' | 'settings';

export interface MerchantNavItem {
  id: MerchantTab;
  label: string;
  iconName: string;
  badgeType?: 'count' | 'alert';
}

export interface AccountSectionItem {
  id: AccountSubSection;
  label: string;
  description: string;
  iconName: string;
}

/**
 * EXACTLY 4 Primary Merchant Navigation destinations as specified in the product contract:
 * 1. Home
 * 2. Audit
 * 3. Products
 * 4. Actions
 */
export const MERCHANT_PRIMARY_NAV_ITEMS: readonly MerchantNavItem[] = [
  { id: 'home', label: 'Home', iconName: 'LayoutDashboard' },
  { id: 'audit', label: 'Audit', iconName: 'Compass' },
  { id: 'products', label: 'Products', iconName: 'Package', badgeType: 'count' },
  { id: 'actions', label: 'Actions', iconName: 'AlertTriangle', badgeType: 'alert' },
] as const;

export const MERCHANT_ACCOUNT_SECTIONS: readonly AccountSectionItem[] = [
  { 
    id: 'connections', 
    label: 'Connections', 
    description: 'Store connectors, feeds & live catalog sync endpoints',
    iconName: 'Cpu' 
  },
  { 
    id: 'subscription', 
    label: 'Subscription', 
    description: 'Merchant plan tier, quotas & catalog limits',
    iconName: 'CreditCard' 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    description: 'Store profile, verified domains & audit preferences',
    iconName: 'Settings' 
  },
] as const;

/**
 * Authoritative tab resolver mapping directly to the four primary destinations:
 * - 'audit' (and legacy aliases 'visibility', 'readiness', 'discovery', 'monitoring', 'report') -> 'audit'
 * - 'products' (and legacy aliases 'catalog', 'offers') -> 'products'
 * - 'actions' (and legacy alias 'issues') -> 'actions'
 * - 'home' (and alias 'overview') -> 'home'
 */
export function resolveMerchantTab(tab?: string): MerchantTab {
  if (!tab) return 'home';
  if (tab === 'home' || tab === 'overview') return 'home';
  if (
    tab === 'audit' || 
    tab === 'visibility' || 
    tab === 'discovery' || 
    tab === 'readiness' || 
    tab === 'monitoring' || 
    tab === 'analytics' || 
    tab === 'report'
  ) {
    return 'audit';
  }
  if (tab === 'products' || tab === 'catalog' || tab === 'offers') return 'products';
  if (tab === 'actions' || tab === 'issues') return 'actions';
  return 'home';
}

/**
 * 6-Stage Task-First Merchant Mental Model Pipeline
 * Mental Model: Add → Check → Review → Approve → Recheck → Ready
 */
export const MERCHANT_MENTAL_MODEL_STAGES = [
  { stage: 'add', stepNum: '01', title: 'Add', actionLabel: '+ Add SKUs' },
  { stage: 'check', stepNum: '02', title: 'Check', actionLabel: 'Audit Catalog' },
  { stage: 'review', stepNum: '03', title: 'Review', actionLabel: 'Review Tasks' },
  { stage: 'approve', stepNum: '04', title: 'Approve', actionLabel: 'Approve Fixes' },
  { stage: 'recheck', stepNum: '05', title: 'Recheck', actionLabel: 'Run Recheck' },
  { stage: 'ready', stepNum: '06', title: 'Ready', actionLabel: 'AI Discoverable' },
] as const;
