import { 
  ApiResponse, 
  SearchTermData, 
  GetSearchTermsResponse,
  GetNegativeKeywordsResponse,
  AddNegativeKeywordRequest,
  AddNegativeKeywordResponse,
  NegativeKeyword,
  DashboardMetrics
} from '@/types';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL || '';

// Default headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Generic API request function using Next.js API proxy
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Use Next.js API route as proxy to avoid CORS issues
    const proxyUrl = `/api/proxy${endpoint}`;
    const response = await fetch(proxyUrl, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Search Terms API
export const searchTermsApi = {
  // Get all search term data
  async getAll(): Promise<ApiResponse<SearchTermData[]>> {
    return apiRequest<SearchTermData[]>('?action=search-terms');
  },

  // Get search terms with pagination
  async getPaginated(
    page: number = 1,
    pageSize: number = 50,
    filters?: Record<string, any>
  ): Promise<ApiResponse<GetSearchTermsResponse>> {
    const params = new URLSearchParams({
      action: 'search-terms',
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters && { filters: JSON.stringify(filters) }),
    });

    return apiRequest<GetSearchTermsResponse>(`?${params}`);
  },

  // Get search terms by campaign
  async getByCampaign(campaignName: string): Promise<ApiResponse<SearchTermData[]>> {
    const params = new URLSearchParams({
      action: 'search-terms',
      campaign: campaignName,
    });
    return apiRequest<SearchTermData[]>(`?${params}`);
  },

  // Get search terms by ad group
  async getByAdGroup(adGroupName: string): Promise<ApiResponse<SearchTermData[]>> {
    const params = new URLSearchParams({
      action: 'search-terms',
      adGroup: adGroupName,
    });
    return apiRequest<SearchTermData[]>(`?${params}`);
  },

  // Get high-cost, low-converting search terms (negative keyword opportunities)
  async getNegativeKeywordOpportunities(
    minCost: number = 10,
    maxConversions: number = 0
  ): Promise<ApiResponse<SearchTermData[]>> {
    const params = new URLSearchParams({
      action: 'search-terms',
      minCost: minCost.toString(),
      maxConversions: maxConversions.toString(),
    });

    return apiRequest<SearchTermData[]>(`?${params}`);
  },
};

// Negative Keywords API
export const negativeKeywordsApi = {
  // Get all negative keywords
  async getAll(): Promise<ApiResponse<GetNegativeKeywordsResponse>> {
    return apiRequest<GetNegativeKeywordsResponse>('?action=negative-keywords');
  },

  // Get negative keywords by campaign
  async getByCampaign(campaignId: string): Promise<ApiResponse<NegativeKeyword[]>> {
    const params = new URLSearchParams({
      action: 'negative-keywords',
      campaignId: campaignId,
    });
    return apiRequest<NegativeKeyword[]>(`?${params}`);
  },

  // Get negative keywords by ad group
  async getByAdGroup(adGroupId: string): Promise<ApiResponse<NegativeKeyword[]>> {
    const params = new URLSearchParams({
      action: 'negative-keywords',
      adGroupId: adGroupId,
    });
    return apiRequest<NegativeKeyword[]>(`?${params}`);
  },

  // Get shared negative keyword lists
  async getSharedLists(): Promise<ApiResponse<NegativeKeyword[]>> {
    const params = new URLSearchParams({
      action: 'negative-keywords',
      type: 'shared',
    });
    return apiRequest<NegativeKeyword[]>(`?${params}`);
  },

  // Add negative keywords
  async add(request: AddNegativeKeywordRequest): Promise<ApiResponse<AddNegativeKeywordResponse>> {
    try {
      const response = await apiRequest<AddNegativeKeywordResponse>('?action=add-negative-keywords', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      
      // Log the response for debugging
      console.log('Add negative keywords response:', response);
      
      return response;
    } catch (error) {
      console.error('Error adding negative keywords:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add negative keywords'
      };
    }
  },

  // Remove negative keyword
  async remove(keywordId: string): Promise<ApiResponse<boolean>> {
    const params = new URLSearchParams({
      action: 'remove-negative-keyword',
      id: keywordId,
    });
    return apiRequest<boolean>(`?${params}`, {
      method: 'POST',
    });
  },
};

// Dashboard API
export const dashboardApi = {
  // Get dashboard metrics
  async getMetrics(): Promise<ApiResponse<DashboardMetrics>> {
    return apiRequest<DashboardMetrics>('?action=dashboard');
  },

  // Get spend distribution data
  async getSpendDistribution(): Promise<ApiResponse<any[]>> {
    return apiRequest<any[]>('?action=spend-distribution');
  },

  // Get performance trends
  async getPerformanceTrends(days: number = 30): Promise<ApiResponse<any[]>> {
    return apiRequest<any[]>(`?action=trends&days=${days}`);
  },
};

// Utility functions for data transformation
export const dataTransformers = {
  // Convert Google Sheets row to SearchTermData
  transformSearchTermRow(row: any[]): SearchTermData {
    return {
      id: row[0] || '',
      searchTerm: row[1] || '',
      campaignName: row[2] || '',
      adGroupName: row[3] || '',
      keywordText: row[4] || '',
      cost: Number(row[5]) || 0,
      clicks: Number(row[6]) || 0,
      impressions: Number(row[7]) || 0,
      conversions: Number(row[8]) || 0,
      costPerConversion: Number(row[9]) || 0,
      ctr: Number(row[10]) || 0,
      cpc: Number(row[11]) || 0,
      associatedNegativeKeywordLists: row[12] ? row[12].split(',') : [],
      date: row[13] || new Date().toISOString(),
    };
  },

  // Convert SearchTermData to Google Sheets row
  transformToSheetRow(data: SearchTermData): any[] {
    return [
      data.id,
      data.searchTerm,
      data.campaignName,
      data.adGroupName,
      data.keywordText,
      data.cost,
      data.clicks,
      data.impressions,
      data.conversions,
      data.costPerConversion,
      data.ctr,
      data.cpc,
      data.associatedNegativeKeywordLists.join(','),
      data.date,
    ];
  },

  // Calculate derived metrics
  calculateMetrics(data: SearchTermData): Partial<SearchTermData> {
    const ctr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
    const cpc = data.clicks > 0 ? data.cost / data.clicks : 0;
    const costPerConversion = data.conversions > 0 ? data.cost / data.conversions : 0;

    return {
      ctr: Number(ctr.toFixed(2)),
      cpc: Number(cpc.toFixed(2)),
      costPerConversion: Number(costPerConversion.toFixed(2)),
    };
  },
};

// Error handling utilities
export const errorHandlers = {
  // Handle API errors with user-friendly messages
  getErrorMessage(error: any): string {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.error) return error.error;
    return 'An unexpected error occurred';
  },

  // Check if error is network related
  isNetworkError(error: any): boolean {
    return error?.message?.includes('fetch') || 
           error?.message?.includes('network') ||
           error?.message?.includes('Failed to fetch');
  },

  // Check if error is authentication related
  isAuthError(error: any): boolean {
    return error?.message?.includes('401') || 
           error?.message?.includes('unauthorized') ||
           error?.message?.includes('authentication');
  },
};

// Cache utilities for API responses
export const cacheUtils = {
  // Simple in-memory cache
  cache: new Map<string, { data: any; timestamp: number; ttl: number }>(),

  // Set cache entry
  set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  },

  // Get cache entry
  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  },

  // Clear cache
  clear(): void {
    this.cache.clear();
  },

  // Clear expired entries
  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  },
};

// Export all API functions
export const api = {
  searchTerms: searchTermsApi,
  negativeKeywords: negativeKeywordsApi,
  dashboard: dashboardApi,
  transformers: dataTransformers,
  errors: errorHandlers,
  cache: cacheUtils,
};
