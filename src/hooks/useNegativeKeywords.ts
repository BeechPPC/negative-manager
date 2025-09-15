'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  NegativeKeyword, 
  AsyncState, 
  AddNegativeKeywordRequest, 
  AddNegativeKeywordResponse,
  GetNegativeKeywordsResponse 
} from '@/types';
import { api } from '@/utils/api';

export function useNegativeKeywords() {
  const [state, setState] = useState<AsyncState<GetNegativeKeywordsResponse>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  // Fetch negative keywords data
  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.negativeKeywords.getAll();

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
          error: response.error || 'Failed to fetch negative keywords',
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

  // Add negative keywords
  const addNegativeKeywords = useCallback(async (request: AddNegativeKeywordRequest) => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.negativeKeywords.add(request);

      if (response.success && response.data) {
        // Refresh data after successful addition
        await fetchData();
        return response.data;
      } else {
        setState(prev => ({
          ...prev,
          loading: 'error',
          error: response.error || 'Failed to add negative keywords',
        }));
        // Return the response even if there are errors so the UI can handle them
        return response;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
      throw error;
    }
  }, [fetchData]);

  // Remove negative keyword
  const removeNegativeKeyword = useCallback(async (keywordId: string) => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.negativeKeywords.remove(keywordId);

      if (response.success) {
        // Refresh data after successful removal
        await fetchData();
        return true;
      } else {
        setState(prev => ({
          ...prev,
          loading: 'error',
          error: response.error || 'Failed to remove negative keyword',
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
      return false;
    }
  }, [fetchData]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    // State
    data: state.data,
    loading: state.loading,
    error: state.error,

    // Actions
    fetchData,
    addNegativeKeywords,
    removeNegativeKeyword,
    refresh,

    // Computed values
    hasData: state.data && (state.data.data.campaign.length > 0 || state.data.data.adGroup.length > 0 || state.data.data.shared.length > 0),
    isEmpty: state.data && state.data.data.campaign.length === 0 && state.data.data.adGroup.length === 0 && state.data.data.shared.length === 0,
    isLoading: state.loading === 'loading',
    isError: state.loading === 'error',
    isSuccess: state.loading === 'success',
  };
}

// Hook for campaign negative keywords
export function useCampaignNegativeKeywords(campaignId?: string) {
  const [state, setState] = useState<AsyncState<NegativeKeyword[]>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!campaignId) {
      setState({ data: null, loading: 'idle', error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.negativeKeywords.getByCampaign(campaignId);

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
          error: response.error || 'Failed to fetch campaign negative keywords',
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, [campaignId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refresh: fetchData,
    isLoading: state.loading === 'loading',
    isError: state.loading === 'error',
    isSuccess: state.loading === 'success',
  };
}

// Hook for ad group negative keywords
export function useAdGroupNegativeKeywords(adGroupId?: string) {
  const [state, setState] = useState<AsyncState<NegativeKeyword[]>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!adGroupId) {
      setState({ data: null, loading: 'idle', error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.negativeKeywords.getByAdGroup(adGroupId);

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
          error: response.error || 'Failed to fetch ad group negative keywords',
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }, [adGroupId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refresh: fetchData,
    isLoading: state.loading === 'loading',
    isError: state.loading === 'error',
    isSuccess: state.loading === 'success',
  };
}

// Hook for shared negative keyword lists
export function useSharedNegativeKeywordLists() {
  const [state, setState] = useState<AsyncState<NegativeKeyword[]>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: 'loading' }));

    try {
      const response = await api.negativeKeywords.getSharedLists();

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
          error: response.error || 'Failed to fetch shared negative keyword lists',
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refresh: fetchData,
    isLoading: state.loading === 'loading',
    isError: state.loading === 'error',
    isSuccess: state.loading === 'success',
  };
}

// Hook for negative keyword management operations
export function useNegativeKeywordOperations() {
  const [operationState, setOperationState] = useState<{
    loading: boolean;
    error: string | null;
    lastOperation: string | null;
  }>({
    loading: false,
    error: null,
    lastOperation: null,
  });

  const executeOperation = useCallback(async (
    operation: () => Promise<any>,
    operationName: string
  ) => {
    setOperationState({
      loading: true,
      error: null,
      lastOperation: operationName,
    });

    try {
      const result = await operation();
      setOperationState({
        loading: false,
        error: null,
        lastOperation: operationName,
      });
      return result;
    } catch (error) {
      setOperationState({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        lastOperation: operationName,
      });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setOperationState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...operationState,
    executeOperation,
    clearError,
  };
}
