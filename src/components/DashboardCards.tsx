'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  MousePointer, 
  Target, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  DollarSign as SavingsIcon,
  BarChart3
} from 'lucide-react';
import { DashboardMetrics } from '@/types';

interface DashboardCardsProps {
  metrics: DashboardMetrics;
  loading?: boolean | string;
}

export default function DashboardCards({ metrics, loading = false }: DashboardCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) {
      return '0';
    }
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) {
      return '0.00%';
    }
    return `${num.toFixed(2)}%`;
  };

  const cards = [
    {
      title: 'Total Search Terms',
      value: formatNumber(metrics.totalSearchTerms),
      description: 'Search terms analyzed',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Cost',
      value: formatCurrency(metrics.totalCost),
      description: 'Total spend across all terms',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Clicks',
      value: formatNumber(metrics.totalClicks),
      description: 'Total clicks received',
      icon: MousePointer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Conversions',
      value: formatNumber(metrics.totalConversions),
      description: 'Total conversions achieved',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Wasted Spend',
      value: formatCurrency(metrics.wastedSpend),
      description: 'Cost with no conversions',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Potential Savings',
      value: formatCurrency(metrics.potentialSavings),
      description: 'Savings from negative keywords',
      icon: SavingsIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Average CTR',
      value: formatPercentage(metrics.averageCtr),
      description: 'Click-through rate',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Average CPC',
      value: formatCurrency(metrics.averageCpc),
      description: 'Cost per click',
      icon: DollarSign,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost efficiency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Cost Efficiency</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average CPA</span>
                <span className="font-semibold">
                  {formatCurrency(metrics.averageCpa)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold">
                  {metrics.totalClicks && metrics.totalClicks > 0 
                    ? formatPercentage((metrics.totalConversions || 0) / metrics.totalClicks * 100)
                    : '0.00%'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ROI Potential</span>
                <Badge 
                  variant={(metrics.potentialSavings || 0) > (metrics.totalCost || 0) * 0.1 ? "default" : "secondary"}
                  className={(metrics.potentialSavings || 0) > (metrics.totalCost || 0) * 0.1 ? "bg-green-100 text-green-800" : ""}
                >
                  {(metrics.potentialSavings || 0) > (metrics.totalCost || 0) * 0.1 ? "High" : "Low"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waste analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Waste Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Waste Percentage</span>
                <span className="font-semibold text-red-600">
                  {(metrics.totalCost || 0) > 0 
                    ? formatPercentage(((metrics.wastedSpend || 0) / (metrics.totalCost || 1)) * 100)
                    : '0.00%'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Savings Potential</span>
                <span className="font-semibold text-green-600">
                  {(metrics.totalCost || 0) > 0 
                    ? formatPercentage(((metrics.potentialSavings || 0) / (metrics.totalCost || 1)) * 100)
                    : '0.00%'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Priority Level</span>
                <Badge 
                  variant={(metrics.wastedSpend || 0) > (metrics.totalCost || 0) * 0.2 ? "destructive" : "secondary"}
                >
                  {(metrics.wastedSpend || 0) > (metrics.totalCost || 0) * 0.2 ? "High" : "Medium"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top opportunities */}
      {metrics.topNegativeKeywordOpportunities && metrics.topNegativeKeywordOpportunities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Top Negative Keyword Opportunities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topNegativeKeywordOpportunities.slice(0, 5).map((opportunity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {opportunity.searchTerm}
                    </div>
                    <div className="text-sm text-gray-500">
                      {opportunity.campaignName} • {opportunity.adGroupName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">
                      {formatCurrency(opportunity.cost)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {opportunity.clicks} clicks, {opportunity.conversions} conversions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
