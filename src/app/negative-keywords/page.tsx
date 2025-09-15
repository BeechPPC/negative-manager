'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Minus,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  Trash2,
  Edit,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { 
  NegativeKeyword, 
  MatchType, 
  NegativeKeywordLevel 
} from '@/types';
import { useNegativeKeywords } from '@/hooks/useNegativeKeywords';

export default function NegativeKeywordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<NegativeKeywordLevel | 'all'>('all');
  const [selectedMatchType, setSelectedMatchType] = useState<MatchType | 'all'>('all');
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());

  const {
    data: negativeKeywordsData,
    loading,
    error,
    removeNegativeKeyword,
    refresh,
  } = useNegativeKeywords();

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Show loading state
  if (loading === 'loading') {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (loading === 'error' || error) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading negative keywords</h3>
                <div className="mt-2 text-sm text-red-700">
                  {error || 'An unexpected error occurred'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show success state with data
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Negative Keywords</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Keywords
          </Button>
        </div>
        
        {negativeKeywordsData && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Negative Keywords Data</h2>
              <div className="text-sm text-gray-600">
                <p>Campaign keywords: {negativeKeywordsData.campaign?.length || 0}</p>
                <p>Ad Group keywords: {negativeKeywordsData.adGroup?.length || 0}</p>
                <p>Shared keywords: {negativeKeywordsData.shared?.length || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}