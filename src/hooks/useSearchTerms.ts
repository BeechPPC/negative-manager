'use client';

import { useState, useEffect, useCallback } from 'react';
import { SearchTermData, AsyncState, SearchTermFilters, SortConfig } from '@/types';
import { api } from '@/utils/api';

export function useSearchTerms() {
  const [state, setState] = useState<AsyncState<SearchTermData[]>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const [filters, setFilters] = useState<SearchTermFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'cost',
    direction: 'desc',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 50,
    total: 0,
  });

  // Fetch search terms data
  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.searchTerms.getPaginated(
        pagination.page,
        pagination.pageSize,
        filters
      );

      if (response.success && response.data) {
        setState({
          data: response.data.data,
          loading: 'success',
          error: null,
        });
        setPagination(prev => ({
          ...prev,
          total: response.data?.total || 0,
        }));
      } else {
        setState({
          data: null,
          loading: 'error',
          error: response.error || 'Failed to fetch search terms',
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, [pagination.page, pagination.pageSize, filters]);

  // Fetch all search terms (for export, etc.)
  const fetchAllData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.searchTerms.getAll();

      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: 'success',
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: 'error',
          error: response.error || 'Failed to fetch search terms',
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, []);

  // Fetch negative keyword opportunities
  const fetchOpportunities = useCallback(async (minCost: number = 10, maxConversions: number = 0) => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.searchTerms.getNegativeKeywordOpportunities(minCost, maxConversions);

      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: 'success',
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: 'error',
          error: response.error || 'Failed to fetch opportunities',
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchTermFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Check if there are active filters
  const hasActiveFilters = Object.keys(filters).length > 0;

  // Update sort configuration
  const updateSortConfig = useCallback((newSortConfig: SortConfig) => {
    setSortConfig(newSortConfig);
  }, []);

  // Update pagination
  const updatePagination = useCallback((newPagination: Partial<typeof pagination>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh effect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    // State
    data: state.data,
    loading: state.loading,
    error: state.error,
    filters,
    sortConfig,
    pagination,

    // Actions
    fetchData,
    fetchAllData,
    fetchOpportunities,
    updateFilters,
    clearFilters,
    updateSortConfig,
    updatePagination,
    refresh,

    // Computed values
    hasData: state.data && state.data.length > 0,
    isEmpty: state.data && state.data.length === 0,
    isLoading: state.loading === 'loading',
    isError: state.loading === 'error',
    isSuccess: state.loading === 'success',
    hasActiveFilters,
  };
}

// Hook for search term analytics
export function useSearchTermAnalytics(data: SearchTermData[] | null) {
  const [analytics, setAnalytics] = useState({
    totalCost: 0,
    totalClicks: 0,
    totalConversions: 0,
    wastedSpend: 0,
    potentialSavings: 0,
    averageCtr: 0,
    averageCpc: 0,
    averageCpa: 0,
    topOpportunities: [] as SearchTermData[],
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      setAnalytics({
        totalCost: 0,
        totalClicks: 0,
        totalConversions: 0,
        wastedSpend: 0,
        potentialSavings: 0,
        averageCtr: 0,
        averageCpc: 0,
        averageCpa: 0,
        topOpportunities: [],
      });
      return;
    }

    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
    const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
    const wastedSpend = data
      .filter(item => item.conversions === 0)
      .reduce((sum, item) => sum + item.cost, 0);
    const potentialSavings = data
      .filter(item => item.conversions === 0 && item.cost > 5)
      .reduce((sum, item) => sum + item.cost, 0);

    const averageCtr = data.length > 0 
      ? data.reduce((sum, item) => sum + item.ctr, 0) / data.length 
      : 0;
    const averageCpc = data.length > 0 
      ? data.reduce((sum, item) => sum + item.cpc, 0) / data.length 
      : 0;
    const averageCpa = data.length > 0 
      ? data.reduce((sum, item) => sum + item.costPerConversion, 0) / data.length 
      : 0;

    const topOpportunities = data
      .filter(item => item.conversions === 0 && item.cost > 10)
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 10);

    setAnalytics({
      totalCost,
      totalClicks,
      totalConversions,
      wastedSpend,
      potentialSavings,
      averageCtr,
      averageCpc,
      averageCpa,
      topOpportunities,
    });
  }, [data]);

  return analytics;
}

// Hook for search term filtering
export function useSearchTermFilters() {
  const [filters, setFilters] = useState<SearchTermFilters>({});

  const updateFilter = useCallback((key: keyof SearchTermFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilter = useCallback((key: keyof SearchTermFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.keys(filters).length > 0;

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  };
}
