'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DashboardCards from '@/components/DashboardCards';
import SearchTermTable from '@/components/SearchTermTable';
import NegativeKeywordModal from '@/components/NegativeKeywordModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RefreshCw, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  BarChart3,
  Download
} from 'lucide-react';
import { 
  SearchTermData, 
  DashboardMetrics, 
  NegativeKeywordFormData,
  Campaign,
  AdGroup,
  SharedNegativeKeywordList
} from '@/types';
import { useSearchTerms, useSearchTermAnalytics } from '@/hooks/useSearchTerms';
import { useNegativeKeywords } from '@/hooks/useNegativeKeywords';
import { api } from '@/utils/api';
import { utils } from '@/utils/calculations';

export default function DashboardPage() {
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
  const [selectedSearchTerms, setSelectedSearchTerms] = useState<SearchTermData[]>([]);
  const [isNegativeKeywordModalOpen, setIsNegativeKeywordModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adGroups, setAdGroups] = useState<AdGroup[]>([]);
  const [sharedLists, setSharedLists] = useState<SharedNegativeKeywordList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use hooks for data management
  const {
    data: searchTermsData,
    loading: searchTermsLoading,
    error: searchTermsError,
    refresh: refreshSearchTerms,
  } = useSearchTerms();

  const {
    data: negativeKeywordsData,
    loading: negativeKeywordsLoading,
    refresh: refreshNegativeKeywords,
  } = useNegativeKeywords();

  const analytics = useSearchTermAnalytics(searchTermsData);

  // Fetch dashboard metrics
  const fetchDashboardMetrics = async () => {
    try {
      const response = await api.dashboard.getMetrics();
      if (response.success && response.data) {
        setDashboardMetrics(response.data);
      } else {
        setError(response.error || 'Failed to fetch dashboard metrics');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  // Fetch campaigns, ad groups, and shared lists
  const fetchReferenceData = async () => {
    try {
      // In a real implementation, these would come from separate API endpoints
      // For now, we'll extract them from the search terms data
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

      // Mock shared lists for now
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
    } catch (error) {
      console.error('Error fetching reference data:', error);
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
        fetchDashboardMetrics(),
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

  // Refresh all data
  const handleRefresh = async () => {
    setLoading(true);
    try {
      await Promise.all([
        refreshSearchTerms(),
        refreshNegativeKeywords(),
        fetchDashboardMetrics(),
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Export data
  const handleExport = () => {
    if (!searchTermsData) return;

    const csvContent = [
      // Headers
      ['Search Term', 'Campaign', 'Ad Group', 'Cost', 'Clicks', 'Conversions', 'CTR', 'CPC'],
      // Data
      ...searchTermsData.map(st => [
        st.searchTerm,
        st.campaignName,
        st.adGroupName,
        st.cost.toFixed(2),
        st.clicks,
        st.conversions,
        st.ctr.toFixed(2),
        st.cpc.toFixed(2),
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-terms-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Initial data fetch
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchDashboardMetrics(),
          fetchReferenceData(),
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [searchTermsData]);

  // Update reference data when search terms change
  useEffect(() => {
    fetchReferenceData();
  }, [searchTermsData]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor your search term performance and manage negative keywords
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExport} disabled={!searchTermsData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="search-terms">Search Terms</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Dashboard Cards */}
            <DashboardCards 
              metrics={dashboardMetrics || {
                totalSearchTerms: analytics.totalCost > 0 ? searchTermsData?.length || 0 : 0,
                totalCost: analytics.totalCost,
                totalClicks: analytics.totalClicks,
                totalConversions: analytics.totalConversions,
                wastedSpend: analytics.wastedSpend,
                potentialSavings: analytics.potentialSavings,
                averageCtr: analytics.averageCtr,
                averageCpc: analytics.averageCpc,
                averageCpa: analytics.averageCpa,
                topNegativeKeywordOpportunities: analytics.topOpportunities,
              }}
              loading={loading || searchTermsLoading === 'loading'}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High-Cost Opportunities</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics.topOpportunities.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Search terms with high cost and no conversions
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => handleSearchTermSelection(analytics.topOpportunities)}
                    disabled={analytics.topOpportunities.length === 0}
                  >
                    Review Opportunities
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${analytics.potentialSavings.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estimated savings from negative keywords
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Waste Percentage</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {analytics.totalCost > 0 
                      ? ((analytics.wastedSpend / analytics.totalCost) * 100).toFixed(1)
                      : 0
                    }%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentage of spend with no conversions
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Search Terms Tab */}
          <TabsContent value="search-terms">
            <SearchTermTable
              data={searchTermsData || []}
              loading={searchTermsLoading === 'loading'}
              onAddNegativeKeywords={handleSearchTermSelection}
            />
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <SearchTermTable
              data={analytics.topOpportunities}
              loading={searchTermsLoading === 'loading'}
              onAddNegativeKeywords={handleSearchTermSelection}
            />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average CTR</span>
                    <span className="font-semibold">{analytics.averageCtr.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average CPC</span>
                    <span className="font-semibold">${analytics.averageCpc.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average CPA</span>
                    <span className="font-semibold">${analytics.averageCpa.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="font-semibold">
                      {analytics.totalClicks > 0 
                        ? ((analytics.totalConversions / analytics.totalClicks) * 100).toFixed(2)
                        : 0
                      }%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Negative Keyword Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Negative Keywords</span>
                    <span className="font-semibold">
                      {negativeKeywordsData ? 
                        negativeKeywordsData.data.campaign.length +
                        negativeKeywordsData.data.adGroup.length +
                        negativeKeywordsData.data.shared.length
                        : 0
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Campaign Level</span>
                    <span className="font-semibold">
                      {negativeKeywordsData?.data?.campaign.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ad Group Level</span>
                    <span className="font-semibold">
                      {negativeKeywordsData?.data?.adGroup.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shared Lists</span>
                    <span className="font-semibold">
                      {negativeKeywordsData?.data?.shared.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

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