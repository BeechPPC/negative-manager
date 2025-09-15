'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  Download,
  Minus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { SearchTermData, SortConfig, SearchTermFilters } from '@/types';
import { utils } from '@/utils/calculations';

interface SearchTermTableProps {
  data: SearchTermData[];
  loading?: boolean | string;
  onAddNegativeKeywords?: (searchTerms: SearchTermData[]) => void;
}

export default function SearchTermTable({ 
  data, 
  loading = false, 
  onAddNegativeKeywords 
}: SearchTermTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'cost',
    direction: 'desc',
  });
  const [filters, setFilters] = useState<SearchTermFilters>({});
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = utils.data.filterSearchTerms(data, filters);
    filtered = utils.data.sortSearchTerms(filtered, sortConfig.field, sortConfig.direction);
    return filtered;
  }, [data, filters, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  // Handle sorting
  const handleSort = (field: keyof SearchTermData) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle row selection
  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchTermFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  // Get sort icon
  const getSortIcon = (field: keyof SearchTermData) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  // Handle add negative keywords
  const handleAddNegativeKeywords = () => {
    const selectedData = data.filter(row => selectedRows.has(row.id));
    if (onAddNegativeKeywords && selectedData.length > 0) {
      onAddNegativeKeywords(selectedData);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Search Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Search Terms ({filteredAndSortedData.length})</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddNegativeKeywords}
              disabled={selectedRows.size === 0}
            >
              <Minus className="h-4 w-4 mr-2" />
              Add Negative Keywords ({selectedRows.size})
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Search Term</label>
                <Input
                  placeholder="Filter by search term..."
                  value={filters.searchTerm || ''}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Campaign</label>
                <Input
                  placeholder="Filter by campaign..."
                  value={filters.campaignName || ''}
                  onChange={(e) => handleFilterChange('campaignName', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Ad Group</label>
                <Input
                  placeholder="Filter by ad group..."
                  value={filters.adGroupName || ''}
                  onChange={(e) => handleFilterChange('adGroupName', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Min Cost</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.minCost || ''}
                  onChange={(e) => handleFilterChange('minCost', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Max Cost</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={filters.maxCost || ''}
                  onChange={(e) => handleFilterChange('maxCost', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Has Conversions</label>
                <Select
                  value={filters.hasConversions?.toString() || ''}
                  onValueChange={(value) => handleFilterChange('hasConversions', value === '' ? undefined : value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('searchTerm')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Search Term</span>
                    {getSortIcon('searchTerm')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('campaignName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Campaign</span>
                    {getSortIcon('campaignName')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('adGroupName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Ad Group</span>
                    {getSortIcon('adGroupName')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('cost')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Cost</span>
                    {getSortIcon('cost')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Clicks</span>
                    {getSortIcon('clicks')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('conversions')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Conversions</span>
                    {getSortIcon('conversions')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('ctr')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>CTR</span>
                    {getSortIcon('ctr')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('cpc')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>CPC</span>
                    {getSortIcon('cpc')}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow 
                  key={row.id}
                  className={selectedRows.has(row.id) ? 'bg-blue-50' : ''}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {row.searchTerm}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {row.campaignName}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {row.adGroupName}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className={row.cost > 50 ? 'text-red-600 font-semibold' : ''}>
                        {formatCurrency(row.cost)}
                      </span>
                      {row.conversions === 0 && row.cost > 10 && (
                        <Badge variant="destructive" className="text-xs">
                          Waste
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {row.clicks}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span>{row.conversions}</span>
                      {row.conversions === 0 && row.clicks > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          No Conv
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercentage(row.ctr)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(row.cpc)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddNegativeKeywords?.([row])}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages} ({filteredAndSortedData.length} total)
            </span>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
