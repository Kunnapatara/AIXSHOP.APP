/**
 * AIXSHOP — Canonical Merchant Navigation Configuration & Types
 * Single authoritative source of truth for merchant navigation items:
 * Primary: Home | Catalog | Issues | Visibility
 * Secondary Account: Connections | Subscription | Settings
 */

export type MerchantTab = 
  | 'home' 
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
 * EXACTLY 4 Primary Merchant Navigation items.
 * No 'More', No 'Readiness', No role switchers.
 */
export const MERCHANT_PRIMARY_NAV_ITEMS: readonly MerchantNavItem[] = [
  { id: 'home', label: 'Home', iconName: 'LayoutDashboard' },
  { id: 'catalog', label: 'Catalog', iconName: 'Package', badgeType: 'count' },
  { id: 'issues', label: 'Issues', iconName: 'AlertTriangle', badgeType: 'alert' },
  { id: 'visibility', label: 'Visibility', iconName: 'Compass' },
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
    description: 'Store profile, verified domains & audit schedules',
    iconName: 'Settings' 
  },
] as const;

/**
 * Resolves any tab string or alias into a canonical MerchantTab.
 * Strict canonical resolution mapping:
 * - 'overview' -> 'home'
 * - 'products' -> 'catalog'
 * - 'discovery' -> 'visibility'
 * - 'readiness' -> 'visibility'
 * - 'offers' -> 'catalog'
 * - 'monitoring' / 'analytics' / 'report' -> 'visibility'
 */
export function resolveMerchantTab(tab?: string): MerchantTab {
  if (!tab) return 'home';
  if (tab === 'home' || tab === 'overview') return 'home';
  if (tab === 'catalog' || tab === 'products' || tab === 'offers') return 'catalog';
  if (tab === 'issues' || tab === 'actions') return 'issues';
  if (
    tab === 'visibility' || 
    tab === 'audit' ||
    tab === 'discovery' || 
    tab === 'readiness' || 
    tab === 'monitoring' || 
    tab === 'analytics' || 
    tab === 'report'
  ) {
    return 'visibility';
  }
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
  { stage: 'ready', stepNum: '06', title: 'Ready', actionLabel: 'View Readiness' },
] as const;
