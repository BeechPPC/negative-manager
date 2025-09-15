'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchTermTable from '@/components/SearchTermTable';
import NegativeKeywordModal from '@/components/NegativeKeywordModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Minus,
  TrendingUp,
  AlertTriangle,
  Target
} from 'lucide-react';
import { 
  SearchTermData, 
  NegativeKeywordFormData,
  Campaign,
  AdGroup,
  SharedNegativeKeywordList
} from '@/types';
import { useSearchTerms, useSearchTermAnalytics } from '@/hooks/useSearchTerms';
import { useNegativeKeywords } from '@/hooks/useNegativeKeywords';
import { api } from '@/utils/api';

export default function SearchTermsPage() {
  const [selectedSearchTerms, setSelectedSearchTerms] = useState<SearchTermData[]>([]);
  const [isNegativeKeywordModalOpen, setIsNegativeKeywordModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adGroups, setAdGroups] = useState<AdGroup[]>([]);
  const [sharedLists, setSharedLists] = useState<SharedNegativeKeywordList[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'opportunities' | 'high-cost' | 'no-conversions'>('all');

  // Use hooks for data management
  const {
    data: searchTermsData,
    loading: searchTermsLoading,
    error: searchTermsError,
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    refresh: refreshSearchTerms,
  } = useSearchTerms();

  const {
    data: negativeKeywordsData,
    refresh: refreshNegativeKeywords,
  } = useNegativeKeywords();

  const analytics = useSearchTermAnalytics(searchTermsData);

  // Filter data based on view mode
  const getFilteredData = () => {
    if (!searchTermsData) return [];

    switch (viewMode) {
      case 'opportunities':
        return analytics.topOpportunities;
      case 'high-cost':
        return searchTermsData.filter(st => st.cost > 50);
      case 'no-conversions':
        return searchTermsData.filter(st => st.conversions === 0 && st.cost > 0);
      default:
        return searchTermsData;
    }
  };

  // Handle adding negative keywords
  const handleAddNegativeKeywords = async (formData: NegativeKeywordFormData) => {
    try {
      const request = {
        keywords: formData.keywords.map(keyword => ({
          text: keyword,
          matchType: formData.matchType,
          level: formData.level,
          campaignId: formData.campaignId,
          adGroupId: formData.adGroupId,
          sharedListId: formData.sharedListId,
        })),
      };

      await api.negativeKeywords.add(request);
      
      // Refresh data
      await Promise.all([
        refreshSearchTerms(),
        refreshNegativeKeywords(),
      ]);

      setIsNegativeKeywordModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  // Handle search term selection for negative keywords
  const handleSearchTermSelection = (searchTerms: SearchTermData[]) => {
    setSelectedSearchTerms(searchTerms);
    setIsNegativeKeywordModalOpen(true);
  };

  // Export data
  const handleExport = () => {
    const data = getFilteredData();
    if (!data || data.length === 0) return;

    const csvContent = [
      // Headers
      ['Search Term', 'Campaign', 'Ad Group', 'Cost', 'Clicks', 'Conversions', 'CTR', 'CPC', 'Cost Per Conversion'],
      // Data
      ...data.map(st => [
        st.searchTerm,
        st.campaignName,
        st.adGroupName,
        st.cost.toFixed(2),
        st.clicks,
        st.conversions,
        st.ctr.toFixed(2),
        st.cpc.toFixed(2),
        st.costPerConversion.toFixed(2),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-terms-${viewMode}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Initialize reference data
  React.useEffect(() => {
    if (searchTermsData) {
      const uniqueCampaigns = Array.from(
        new Set(searchTermsData.map(st => st.campaignName))
      ).map((name, index) => ({
        id: `campaign_${index}`,
        name,
        status: 'ACTIVE',
        negativeKeywordLists: [],
      }));

      const uniqueAdGroups = Array.from(
        new Set(searchTermsData.map(st => `${st.campaignName}|${st.adGroupName}`))
      ).map((combined, index) => {
        const [campaignName, adGroupName] = combined.split('|');
        return {
          id: `adgroup_${index}`,
          name: adGroupName,
          campaignId: uniqueCampaigns.find(c => c.name === campaignName)?.id || '',
          campaignName,
          negativeKeywords: [],
        };
      });

      setCampaigns(uniqueCampaigns);
      setAdGroups(uniqueAdGroups);
    }

    // Mock shared lists
    setSharedLists([
      {
        id: 'shared_1',
        name: 'General Negative Keywords',
        keywords: [],
        associatedCampaigns: [],
      },
      {
        id: 'shared_2',
        name: 'Brand Protection',
        keywords: [],
        associatedCampaigns: [],
      },
    ]);
  }, [searchTermsData]);

  const filteredData = getFilteredData();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Search Terms</h1>
            <p className="text-gray-600 mt-1">
              Analyze search term performance and identify negative keyword opportunities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExport} disabled={!filteredData.length}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={refreshSearchTerms} disabled={searchTermsLoading === 'loading'}>
              <RefreshCw className={`h-4 w-4 mr-2 ${searchTermsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error state */}
        {searchTermsError && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                <span>{searchTermsError}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* View Mode Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>View Mode</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                All Search Terms
                <Badge variant="secondary" className="ml-2">
                  {searchTermsData?.length || 0}
                </Badge>
              </Button>
              <Button
                variant={viewMode === 'opportunities' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('opportunities')}
              >
                <Target className="h-4 w-4 mr-1" />
                Opportunities
                <Badge variant="destructive" className="ml-2">
                  {analytics.topOpportunities.length}
                </Badge>
              </Button>
              <Button
                variant={viewMode === 'high-cost' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('high-cost')}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                High Cost
                <Badge variant="secondary" className="ml-2">
                  {searchTermsData?.filter(st => st.cost > 50).length || 0}
                </Badge>
              </Button>
              <Button
                variant={viewMode === 'no-conversions' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('no-conversions')}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                No Conversions
                <Badge variant="destructive" className="ml-2">
                  {searchTermsData?.filter(st => st.conversions === 0 && st.cost > 0).length || 0}
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Search Terms</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredData.length}</div>
              <p className="text-xs text-muted-foreground">
                {viewMode === 'all' ? 'All search terms' : `${viewMode} view`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${filteredData.reduce((sum, st) => sum + st.cost, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {viewMode === 'opportunities' ? 'Wasted spend' : 'Total spend'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.reduce((sum, st) => sum + st.clicks, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total clicks received
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.reduce((sum, st) => sum + st.conversions, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {viewMode === 'no-conversions' ? 'No conversions' : 'Total conversions'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Terms Table */}
        <SearchTermTable
          data={filteredData}
          loading={searchTermsLoading === 'loading'}
          onAddNegativeKeywords={handleSearchTermSelection}
        />

        {/* Negative Keyword Modal */}
        <NegativeKeywordModal
          isOpen={isNegativeKeywordModalOpen}
          onClose={() => setIsNegativeKeywordModalOpen(false)}
          searchTerms={selectedSearchTerms}
          campaigns={campaigns}
          adGroups={adGroups}
          sharedLists={sharedLists}
          onSubmit={handleAddNegativeKeywords}
        />
      </div>
    </Layout>
  );
}
