'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Minus, 
  Plus, 
  X, 
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { 
  SearchTermData, 
  NegativeKeywordFormData, 
  MatchType, 
  NegativeKeywordLevel,
  Campaign,
  AdGroup,
  SharedNegativeKeywordList
} from '@/types';

interface NegativeKeywordModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerms: SearchTermData[];
  campaigns: Campaign[];
  adGroups: AdGroup[];
  sharedLists: SharedNegativeKeywordList[];
  onSubmit: (data: NegativeKeywordFormData) => Promise<void>;
  loading?: boolean;
}

export default function NegativeKeywordModal({
  isOpen,
  onClose,
  searchTerms,
  campaigns,
  adGroups,
  sharedLists,
  onSubmit,
  loading = false,
}: NegativeKeywordModalProps) {
  const [formData, setFormData] = useState<NegativeKeywordFormData>({
    keywords: [],
    matchType: 'EXACT',
    level: 'CAMPAIGN',
    campaignId: '',
    adGroupId: '',
    sharedListId: '',
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        keywords: searchTerms.map(st => st.searchTerm),
        matchType: 'EXACT',
        level: 'CAMPAIGN',
        campaignId: '',
        adGroupId: '',
        sharedListId: '',
      });
      setNewKeyword('');
      setErrors([]);
      setStep(1);
    }
  }, [isOpen, searchTerms]);

  // Handle form submission
  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to add negative keywords']);
    }
  };

  // Validate form
  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (formData.keywords.length === 0) {
      errors.push('At least one keyword is required');
    }

    if (formData.level === 'CAMPAIGN' && !formData.campaignId) {
      errors.push('Campaign is required for campaign-level negative keywords');
    }

    if (formData.level === 'AD_GROUP' && (!formData.campaignId || !formData.adGroupId)) {
      errors.push('Campaign and Ad Group are required for ad group-level negative keywords');
    }

    if (formData.level === 'SHARED_LIST' && !formData.sharedListId) {
      errors.push('Shared list is required for shared list negative keywords');
    }

    // Validate keyword format
    formData.keywords.forEach((keyword, index) => {
      if (!keyword.trim()) {
        errors.push(`Keyword ${index + 1} cannot be empty`);
      }
      if (keyword.length > 80) {
        errors.push(`Keyword ${index + 1} is too long (max 80 characters)`);
      }
      if (!/^[a-zA-Z0-9\s\-_.,!?]+$/.test(keyword)) {
        errors.push(`Keyword ${index + 1} contains invalid characters`);
      }
    });

    return errors;
  };

  // Add keyword
  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  // Remove keyword
  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  // Get filtered ad groups based on selected campaign
  const filteredAdGroups = formData.campaignId
    ? adGroups.filter(ag => ag.campaignId === formData.campaignId)
    : [];

  // Calculate potential impact
  const calculateImpact = () => {
    const totalCost = searchTerms.reduce((sum, st) => sum + st.cost, 0);
    const totalClicks = searchTerms.reduce((sum, st) => sum + st.clicks, 0);
    const totalConversions = searchTerms.reduce((sum, st) => sum + st.conversions, 0);
    
    return {
      totalCost,
      totalClicks,
      totalConversions,
      potentialSavings: totalCost,
      affectedSearchTerms: searchTerms.length,
    };
  };

  const impact = calculateImpact();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Minus className="h-5 w-5 text-red-600" />
            <span>Add Negative Keywords</span>
          </DialogTitle>
          <DialogDescription>
            Add negative keywords to prevent unwanted search terms from triggering your ads.
          </DialogDescription>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center space-x-4 mb-6">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <span className="text-sm font-medium">Keywords</span>
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <span className="text-sm font-medium">Configuration</span>
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
            <span className="text-sm font-medium">Review</span>
          </div>
        </div>

        {/* Step 1: Keywords */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Search Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {searchTerms.map((st, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{st.searchTerm}</div>
                        <div className="text-sm text-gray-500">
                          {st.campaignName} • {st.adGroupName} • {st.cost.toFixed(2)} spent
                        </div>
                      </div>
                      <Badge variant="destructive">
                        {st.conversions === 0 ? 'No conversions' : `${st.conversions} conversions`}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="new-keyword">Add Additional Keywords</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="new-keyword"
                    placeholder="Enter keyword to add..."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} disabled={!newKeyword.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Keywords to Add ({formData.keywords.length})</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {formData.keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">{keyword}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKeyword(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="match-type">Match Type</Label>
                  <Select
                    value={formData.matchType}
                    onValueChange={(value: MatchType) => setFormData(prev => ({ ...prev, matchType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EXACT">Exact Match</SelectItem>
                      <SelectItem value="PHRASE">Phrase Match</SelectItem>
                      <SelectItem value="BROAD">Broad Match</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.matchType === 'EXACT' && 'Matches only the exact keyword'}
                    {formData.matchType === 'PHRASE' && 'Matches the keyword as a phrase'}
                    {formData.matchType === 'BROAD' && 'Matches variations of the keyword'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="level">Negative Keyword Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value: NegativeKeywordLevel) => setFormData(prev => ({ 
                      ...prev, 
                      level: value,
                      campaignId: value === 'SHARED_LIST' ? '' : prev.campaignId,
                      adGroupId: value !== 'AD_GROUP' ? '' : prev.adGroupId,
                      sharedListId: value !== 'SHARED_LIST' ? '' : prev.sharedListId,
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CAMPAIGN">Campaign Level</SelectItem>
                      <SelectItem value="AD_GROUP">Ad Group Level</SelectItem>
                      <SelectItem value="SHARED_LIST">Shared List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {formData.level === 'CAMPAIGN' && (
                  <div>
                    <Label htmlFor="campaign">Campaign</Label>
                    <Select
                      value={formData.campaignId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, campaignId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign..." />
                      </SelectTrigger>
                      <SelectContent>
                        {campaigns.map((campaign) => (
                          <SelectItem key={campaign.id} value={campaign.id}>
                            {campaign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.level === 'AD_GROUP' && (
                  <>
                    <div>
                      <Label htmlFor="campaign">Campaign</Label>
                      <Select
                        value={formData.campaignId}
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          campaignId: value,
                          adGroupId: '', // Reset ad group when campaign changes
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign..." />
                        </SelectTrigger>
                        <SelectContent>
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign.id} value={campaign.id}>
                              {campaign.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ad-group">Ad Group</Label>
                      <Select
                        value={formData.adGroupId}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, adGroupId: value }))}
                        disabled={!formData.campaignId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ad group..." />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredAdGroups.map((adGroup) => (
                            <SelectItem key={adGroup.id} value={adGroup.id}>
                              {adGroup.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {formData.level === 'SHARED_LIST' && (
                  <div>
                    <Label htmlFor="shared-list">Shared List</Label>
                    <Select
                      value={formData.sharedListId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, sharedListId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select shared list..." />
                      </SelectTrigger>
                      <SelectContent>
                        {sharedLists.map((list) => (
                          <SelectItem key={list.id} value={list.id}>
                            {list.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Review & Confirm</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Keywords ({formData.keywords.length})</h4>
                    <div className="mt-2 space-y-1">
                      {formData.keywords.map((keyword, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Configuration</h4>
                    <div className="mt-2 space-y-2 text-sm">
                      <div><strong>Match Type:</strong> {formData.matchType}</div>
                      <div><strong>Level:</strong> {formData.level}</div>
                      {formData.campaignId && (
                        <div><strong>Campaign:</strong> {campaigns.find(c => c.id === formData.campaignId)?.name}</div>
                      )}
                      {formData.adGroupId && (
                        <div><strong>Ad Group:</strong> {adGroups.find(ag => ag.id === formData.adGroupId)?.name}</div>
                      )}
                      {formData.sharedListId && (
                        <div><strong>Shared List:</strong> {sharedLists.find(sl => sl.id === formData.sharedListId)?.name}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Impact Summary</h4>
                      <div className="mt-2 text-sm text-yellow-700">
                        <div>• {impact.affectedSearchTerms} search terms will be blocked</div>
                        <div>• Potential savings: ${impact.potentialSavings.toFixed(2)}</div>
                        <div>• {impact.totalClicks} clicks and {impact.totalConversions} conversions affected</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Please fix the following errors:</h4>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Adding...' : 'Add Negative Keywords'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
