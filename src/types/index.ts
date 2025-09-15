// Core data types for the negative keyword management system

export interface SearchTermData {
  id: string;
  searchTerm: string;
  campaignName: string;
  adGroupName: string;
  keywordText: string;
  cost: number;
  clicks: number;
  impressions: number;
  conversions: number;
  costPerConversion: number;
  ctr: number;
  cpc: number;
  associatedNegativeKeywordLists: string[];
  date: string;
}

export interface NegativeKeyword {
  id: string;
  keywordText: string;
  matchType: MatchType;
  level: NegativeKeywordLevel;
  campaignId?: string;
  campaignName?: string;
  adGroupId?: string;
  adGroupName?: string;
  sharedListId?: string;
  sharedListName?: string;
  addedDate?: string;
}

export type MatchType = 'EXACT' | 'PHRASE' | 'BROAD';

export type NegativeKeywordLevel = 'CAMPAIGN' | 'AD_GROUP' | 'SHARED_LIST';

export interface Campaign {
  id: string;
  name: string;
  status: string;
  negativeKeywordLists: string[];
}

export interface AdGroup {
  id: string;
  name: string;
  campaignId: string;
  campaignName: string;
  negativeKeywords: string[];
}

export interface SharedNegativeKeywordList {
  id: string;
  name: string;
  keywords: NegativeKeyword[];
  associatedCampaigns: string[];
}

export interface DashboardMetrics {
  totalSearchTerms: number;
  totalCost: number;
  totalClicks: number;
  totalConversions: number;
  wastedSpend: number;
  potentialSavings: number;
  averageCtr: number;
  averageCpc: number;
  averageCpa: number;
  topNegativeKeywordOpportunities: SearchTermData[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchTermFilters {
  campaignName?: string;
  adGroupName?: string;
  minCost?: number;
  maxCost?: number;
  minClicks?: number;
  maxClicks?: number;
  hasConversions?: boolean;
  searchTerm?: string;
  keywordText?: string;
}

export interface SortConfig {
  field: keyof SearchTermData;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface TableState {
  data: SearchTermData[];
  filteredData: SearchTermData[];
  sortConfig: SortConfig;
  filters: SearchTermFilters;
  pagination: PaginationConfig;
  selectedRows: string[];
  loading: boolean;
  error?: string;
}

export interface AppSettings {
  googleSheetsUrl: string;
  apiKey?: string;
  refreshInterval: number;
  defaultPageSize: number;
  autoRefresh: boolean;
  exportFormat: 'csv' | 'xlsx';
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface SpendDistributionData {
  campaign: string;
  cost: number;
  conversions: number;
  ctr: number;
  cpa: number;
}

export interface NegativeKeywordOpportunity {
  searchTerm: string;
  cost: number;
  clicks: number;
  conversions: number;
  potentialSavings: number;
  recommendedMatchType: MatchType;
  recommendedLevel: NegativeKeywordLevel;
  campaignName: string;
  adGroupName: string;
}

// API request/response types
export interface AddNegativeKeywordRequest {
  keywords: {
    text: string;
    matchType: MatchType;
    level: NegativeKeywordLevel;
    campaignId?: string;
    adGroupId?: string;
    sharedListId?: string;
  }[];
}

export interface AddNegativeKeywordResponse {
  success: boolean;
  added: number;
  failed: number;
  errors: string[];
  adsResult?: {
    added: number;
    failed: number;
    errors: string[];
  };
}

export interface GetSearchTermsResponse {
  success: boolean;
  data: SearchTermData[];
  total: number;
  lastUpdated: string;
}

export interface GetNegativeKeywordsResponse {
  success: boolean;
  data: {
    campaign: NegativeKeyword[];
    adGroup: NegativeKeyword[];
    shared: NegativeKeyword[];
  };
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}

// Form types
export interface NegativeKeywordFormData {
  keywords: string[];
  matchType: MatchType;
  level: NegativeKeywordLevel;
  campaignId?: string;
  adGroupId?: string;
  sharedListId?: string;
}

export interface SettingsFormData {
  googleSheetsUrl: string;
  apiKey: string;
  refreshInterval: number;
  defaultPageSize: number;
  autoRefresh: boolean;
  exportFormat: 'csv' | 'xlsx';
}

// Export types
export interface ExportOptions {
  format: 'csv' | 'xlsx';
  includeMetrics: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  filters?: SearchTermFilters;
}
