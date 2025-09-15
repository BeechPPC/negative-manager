import { SearchTermData, DashboardMetrics, NegativeKeywordOpportunity, MatchType, NegativeKeywordLevel } from '@/types';

// Core calculation functions
export const calculations = {
  // Calculate CTR (Click-Through Rate)
  calculateCTR(clicks: number, impressions: number): number {
    if (impressions === 0) return 0;
    return Number(((clicks / impressions) * 100).toFixed(2));
  },

  // Calculate CPC (Cost Per Click)
  calculateCPC(cost: number, clicks: number): number {
    if (clicks === 0) return 0;
    return Number((cost / clicks).toFixed(2));
  },

  // Calculate CPA (Cost Per Acquisition/Conversion)
  calculateCPA(cost: number, conversions: number): number {
    if (conversions === 0) return 0;
    return Number((cost / conversions).toFixed(2));
  },

  // Calculate conversion rate
  calculateConversionRate(conversions: number, clicks: number): number {
    if (clicks === 0) return 0;
    return Number(((conversions / clicks) * 100).toFixed(2));
  },

  // Calculate wasted spend (cost with no conversions)
  calculateWastedSpend(data: SearchTermData[]): number {
    return data
      .filter(item => item.conversions === 0)
      .reduce((total, item) => total + item.cost, 0);
  },

  // Calculate potential savings from negative keywords
  calculatePotentialSavings(data: SearchTermData[]): number {
    return data
      .filter(item => item.conversions === 0 && item.cost > 5) // High cost, no conversions
      .reduce((total, item) => total + item.cost, 0);
  },

  // Calculate average metrics
  calculateAverageCTR(data: SearchTermData[]): number {
    if (data.length === 0) return 0;
    const totalCTR = data.reduce((sum, item) => sum + item.ctr, 0);
    return Number((totalCTR / data.length).toFixed(2));
  },

  calculateAverageCPC(data: SearchTermData[]): number {
    if (data.length === 0) return 0;
    const totalCPC = data.reduce((sum, item) => sum + item.cpc, 0);
    return Number((totalCPC / data.length).toFixed(2));
  },

  calculateAverageCPA(data: SearchTermData[]): number {
    const itemsWithConversions = data.filter(item => item.conversions > 0);
    if (itemsWithConversions.length === 0) return 0;
    
    const totalCPA = itemsWithConversions.reduce((sum, item) => sum + item.costPerConversion, 0);
    return Number((totalCPA / itemsWithConversions.length).toFixed(2));
  },
};

// Dashboard metrics calculations
export const dashboardCalculations = {
  // Generate comprehensive dashboard metrics
  generateDashboardMetrics(data: SearchTermData[]): DashboardMetrics {
    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
    const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
    const wastedSpend = calculations.calculateWastedSpend(data);
    const potentialSavings = calculations.calculatePotentialSavings(data);

    // Find top negative keyword opportunities
    const opportunities = negativeKeywordAnalysis.identifyOpportunities(data)
      .sort((a, b) => b.potentialSavings - a.potentialSavings)
      .slice(0, 10);

    return {
      totalSearchTerms: data.length,
      totalCost: Number(totalCost.toFixed(2)),
      totalClicks,
      totalConversions,
      wastedSpend: Number(wastedSpend.toFixed(2)),
      potentialSavings: Number(potentialSavings.toFixed(2)),
      averageCtr: calculations.calculateAverageCTR(data),
      averageCpc: calculations.calculateAverageCPC(data),
      averageCpa: calculations.calculateAverageCPA(data),
      topNegativeKeywordOpportunities: opportunities.map(opp => ({
        id: `${opp.searchTerm}-${opp.campaignName}-${opp.adGroupName}`,
        searchTerm: opp.searchTerm,
        campaignName: opp.campaignName,
        adGroupName: opp.adGroupName,
        keywordText: opp.searchTerm, // Use search term as keyword text for opportunities
        cost: opp.cost,
        clicks: opp.clicks,
        impressions: opp.clicks * 10, // Estimate impressions
        conversions: opp.conversions,
        costPerConversion: opp.conversions > 0 ? opp.cost / opp.conversions : 0,
        ctr: opp.clicks > 0 ? (opp.clicks / (opp.clicks * 10)) * 100 : 0,
        cpc: opp.clicks > 0 ? opp.cost / opp.clicks : 0,
        associatedNegativeKeywordLists: [],
        date: new Date().toISOString(),
      })),
    };
  },

  // Calculate spend distribution by campaign
  calculateSpendDistribution(data: SearchTermData[]) {
    const campaignMap = new Map<string, {
      campaign: string;
      cost: number;
      conversions: number;
      clicks: number;
      impressions: number;
    }>();

    data.forEach(item => {
      const existing = campaignMap.get(item.campaignName) || {
        campaign: item.campaignName,
        cost: 0,
        conversions: 0,
        clicks: 0,
        impressions: 0,
      };

      campaignMap.set(item.campaignName, {
        campaign: item.campaignName,
        cost: existing.cost + item.cost,
        conversions: existing.conversions + item.conversions,
        clicks: existing.clicks + item.clicks,
        impressions: existing.impressions + item.impressions,
      });
    });

    return Array.from(campaignMap.values()).map(item => ({
      ...item,
      ctr: calculations.calculateCTR(item.clicks, item.impressions),
      cpa: calculations.calculateCPA(item.cost, item.conversions),
    }));
  },

  // Calculate performance trends over time
  calculatePerformanceTrends(data: SearchTermData[], days: number = 30) {
    const trends = new Map<string, {
      date: string;
      cost: number;
      clicks: number;
      conversions: number;
      impressions: number;
    }>();

    data.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      const existing = trends.get(date) || {
        date,
        cost: 0,
        clicks: 0,
        conversions: 0,
        impressions: 0,
      };

      trends.set(date, {
        date,
        cost: existing.cost + item.cost,
        clicks: existing.clicks + item.clicks,
        conversions: existing.conversions + item.conversions,
        impressions: existing.impressions + item.impressions,
      });
    });

    return Array.from(trends.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-days);
  },
};

// Negative keyword analysis
export const negativeKeywordAnalysis = {
  // Identify negative keyword opportunities
  identifyOpportunities(data: SearchTermData[]): NegativeKeywordOpportunity[] {
    return data
      .filter(item => 
        item.conversions === 0 && // No conversions
        item.cost > 5 && // High cost threshold
        item.clicks > 0 // Has clicks (not just impressions)
      )
      .map(item => ({
        searchTerm: item.searchTerm,
        cost: item.cost,
        clicks: item.clicks,
        conversions: item.conversions,
        potentialSavings: item.cost,
        recommendedMatchType: this.recommendMatchType(item.searchTerm),
        recommendedLevel: this.recommendLevel(item),
        campaignName: item.campaignName,
        adGroupName: item.adGroupName,
      }))
      .sort((a, b) => b.potentialSavings - a.potentialSavings);
  },

  // Recommend match type based on search term characteristics
  recommendMatchType(searchTerm: string): MatchType {
    const term = searchTerm.toLowerCase();
    
    // If it's a single word or very specific, recommend exact
    if (term.split(' ').length === 1 || term.length <= 3) {
      return 'EXACT';
    }
    
    // If it contains brand names or specific products, recommend phrase
    if (this.containsBrandTerms(term) || this.containsProductTerms(term)) {
      return 'PHRASE';
    }
    
    // Default to broad for general terms
    return 'BROAD';
  },

  // Recommend negative keyword level
  recommendLevel(item: SearchTermData): NegativeKeywordLevel {
    // If the search term is very specific to this ad group, recommend ad group level
    if (this.isAdGroupSpecific(item.searchTerm, item.adGroupName)) {
      return 'AD_GROUP';
    }
    
    // If it's campaign-specific, recommend campaign level
    if (this.isCampaignSpecific(item.searchTerm, item.campaignName)) {
      return 'CAMPAIGN';
    }
    
    // Default to shared list for general negative terms
    return 'SHARED_LIST';
  },

  // Helper methods for recommendations
  containsBrandTerms(term: string): boolean {
    const brandTerms = ['brand', 'official', 'store', 'shop', 'buy', 'purchase'];
    return brandTerms.some(brand => term.includes(brand));
  },

  containsProductTerms(term: string): boolean {
    const productTerms = ['price', 'cost', 'cheap', 'free', 'discount', 'sale'];
    return productTerms.some(product => term.includes(product));
  },

  isAdGroupSpecific(searchTerm: string, adGroupName: string): boolean {
    const adGroupWords = adGroupName.toLowerCase().split(' ');
    const searchWords = searchTerm.toLowerCase().split(' ');
    
    // If more than 50% of words match, it's ad group specific
    const matchingWords = searchWords.filter(word => 
      adGroupWords.some(adGroupWord => adGroupWord.includes(word) || word.includes(adGroupWord))
    );
    
    return (matchingWords.length / searchWords.length) > 0.5;
  },

  isCampaignSpecific(searchTerm: string, campaignName: string): boolean {
    const campaignWords = campaignName.toLowerCase().split(' ');
    const searchWords = searchTerm.toLowerCase().split(' ');
    
    // If any significant words match, it's campaign specific
    const matchingWords = searchWords.filter(word => 
      campaignWords.some(campaignWord => campaignWord.includes(word) || word.includes(campaignWord))
    );
    
    return matchingWords.length > 0;
  },

  // Calculate potential impact of adding negative keywords
  calculateImpact(opportunities: NegativeKeywordOpportunity[]): {
    totalSavings: number;
    affectedSearchTerms: number;
    averageSavingsPerTerm: number;
  } {
    const totalSavings = opportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0);
    const affectedSearchTerms = opportunities.length;
    const averageSavingsPerTerm = affectedSearchTerms > 0 ? totalSavings / affectedSearchTerms : 0;

    return {
      totalSavings: Number(totalSavings.toFixed(2)),
      affectedSearchTerms,
      averageSavingsPerTerm: Number(averageSavingsPerTerm.toFixed(2)),
    };
  },
};

// Data filtering and sorting utilities
export const dataUtils = {
  // Filter search terms based on criteria
  filterSearchTerms(data: SearchTermData[], filters: {
    campaignName?: string;
    adGroupName?: string;
    minCost?: number;
    maxCost?: number;
    minClicks?: number;
    maxClicks?: number;
    hasConversions?: boolean;
    searchTerm?: string;
    keywordText?: string;
  }): SearchTermData[] {
    return data.filter(item => {
      if (filters.campaignName && !item.campaignName.toLowerCase().includes(filters.campaignName.toLowerCase())) {
        return false;
      }
      if (filters.adGroupName && !item.adGroupName.toLowerCase().includes(filters.adGroupName.toLowerCase())) {
        return false;
      }
      if (filters.minCost !== undefined && item.cost < filters.minCost) {
        return false;
      }
      if (filters.maxCost !== undefined && item.cost > filters.maxCost) {
        return false;
      }
      if (filters.minClicks !== undefined && item.clicks < filters.minClicks) {
        return false;
      }
      if (filters.maxClicks !== undefined && item.clicks > filters.maxClicks) {
        return false;
      }
      if (filters.hasConversions !== undefined) {
        const hasConversions = item.conversions > 0;
        if (filters.hasConversions !== hasConversions) {
          return false;
        }
      }
      if (filters.searchTerm && !item.searchTerm.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.keywordText && !item.keywordText.toLowerCase().includes(filters.keywordText.toLowerCase())) {
        return false;
      }
      return true;
    });
  },

  // Sort search terms by field and direction
  sortSearchTerms(data: SearchTermData[], field: keyof SearchTermData, direction: 'asc' | 'desc'): SearchTermData[] {
    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  },

  // Paginate data
  paginateData<T>(data: T[], page: number, pageSize: number): {
    data: T[];
    total: number;
    totalPages: number;
    currentPage: number;
  } {
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      totalPages,
      currentPage: page,
    };
  },
};

// Export all calculation utilities
export const utils = {
  calculations,
  dashboard: dashboardCalculations,
  negativeKeywords: negativeKeywordAnalysis,
  data: dataUtils,
};
