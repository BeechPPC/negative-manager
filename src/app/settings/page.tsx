'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  TestTube, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Info,
  Database,
  Clock,
  Download
} from 'lucide-react';
import { AppSettings, SettingsFormData } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    googleSheetsUrl: '',
    apiKey: '',
    refreshInterval: 5,
    defaultPageSize: 50,
    autoRefresh: true,
    exportFormat: 'csv',
  });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [clientInfo, setClientInfo] = useState<{
    lastUpdated: string;
    browser: string;
    storageAvailable: boolean;
  }>({
    lastUpdated: '',
    browser: '',
    storageAvailable: false,
  });

  // Set client-side information to prevent hydration mismatch
  useEffect(() => {
    setClientInfo({
      lastUpdated: new Date().toLocaleDateString(),
      browser: navigator.userAgent.split(' ')[0],
      storageAvailable: !!navigator.storage,
    });
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to localStorage
  const saveSettings = async () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // Test API connection
  const testConnection = async () => {
    setTestStatus('testing');
    setTestMessage('');

    try {
      if (!settings.googleSheetsUrl) {
        throw new Error('Google Sheets URL is required');
      }

      // Test the API endpoint
      const response = await fetch(`${settings.googleSheetsUrl}?action=search-terms&page=1&pageSize=1`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTestStatus('success');
          setTestMessage('Connection successful! API is responding correctly.');
        } else {
          setTestStatus('error');
          setTestMessage(`API Error: ${data.error || 'Unknown error'}`);
        }
      } else {
        setTestStatus('error');
        setTestMessage(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setTestStatus('error');
      setTestMessage(error instanceof Error ? error.message : 'Connection failed');
    }
  };

  // Handle setting changes
  const handleSettingChange = (key: keyof AppSettings, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings({
      googleSheetsUrl: '',
      apiKey: '',
      refreshInterval: 5,
      defaultPageSize: 50,
      autoRefresh: true,
      exportFormat: 'csv',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Configure your negative keyword management system
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={testConnection}
              disabled={testStatus === 'testing'}
            >
              <TestTube className="h-4 w-4 mr-2" />
              {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
            </Button>
            <Button
              onClick={saveSettings}
              disabled={saveStatus === 'saving'}
            >
              <Save className="h-4 w-4 mr-2" />
              {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>

        {/* Test Status */}
        {testMessage && (
          <Card className={testStatus === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                {testStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={testStatus === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {testMessage}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Status */}
        {saveStatus === 'saved' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span>Settings saved successfully!</span>
              </div>
            </CardContent>
          </Card>
        )}

        {saveStatus === 'error' && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-800">
                <XCircle className="h-5 w-5" />
                <span>Failed to save settings. Please try again.</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tabs */}
        <Tabs defaultValue="api" className="space-y-6">
          <TabsList>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="display">Display Settings</TabsTrigger>
            <TabsTrigger value="export">Export Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* API Configuration */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Google Sheets API</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sheets-url">Google Sheets API URL</Label>
                  <Input
                    id="sheets-url"
                    placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
                    value={settings.googleSheetsUrl}
                    onChange={(e) => handleSettingChange('googleSheetsUrl', e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    The URL of your Google Apps Script web app that serves as the API endpoint.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key (Optional)</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter API key if required"
                    value={settings.apiKey}
                    onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Some APIs may require authentication. Leave empty if not needed.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Setup Instructions</h4>
                      <div className="mt-2 text-sm text-blue-700 space-y-1">
                        <p>1. Create a new Google Apps Script project</p>
                        <p>2. Copy the provided script code into the editor</p>
                        <p>3. Deploy as a web app with execute permissions for &quot;Anyone&quot;</p>
                        <p>4. Copy the web app URL and paste it above</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Display Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="page-size">Default Page Size</Label>
                    <Select
                      value={settings.defaultPageSize.toString()}
                      onValueChange={(value) => handleSettingChange('defaultPageSize', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 rows</SelectItem>
                        <SelectItem value="50">50 rows</SelectItem>
                        <SelectItem value="100">100 rows</SelectItem>
                        <SelectItem value="200">200 rows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">Auto-refresh Interval (minutes)</Label>
                    <Select
                      value={settings.refreshInterval.toString()}
                      onValueChange={(value) => handleSettingChange('refreshInterval', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="0">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
                    <p className="text-sm text-gray-500">
                      Automatically refresh data at the specified interval
                    </p>
                  </div>
                  <Switch
                    id="auto-refresh"
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Settings */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Export Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="export-format">Default Export Format</Label>
                  <Select
                    value={settings.exportFormat}
                    onValueChange={(value: 'csv' | 'xlsx') => handleSettingChange('exportFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Choose the default format for data exports
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Export Limitations</h4>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>• CSV exports are limited to 10,000 rows</p>
                        <p>• Excel exports may have performance issues with large datasets</p>
                        <p>• Consider using filters to reduce data size before exporting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Advanced Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reset to Defaults</h4>
                      <p className="text-sm text-gray-500">
                        Restore all settings to their default values
                      </p>
                    </div>
                    <Button variant="outline" onClick={resetToDefaults}>
                      Reset
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Clear Cache</h4>
                      <p className="text-sm text-gray-500">
                        Clear all cached data and force fresh data loading
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        localStorage.removeItem(STORAGE_KEYS.CACHE);
                        localStorage.removeItem(STORAGE_KEYS.FILTERS);
                        localStorage.removeItem(STORAGE_KEYS.TABLE_STATE);
                        window.location.reload();
                      }}
                    >
                      Clear Cache
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Export Settings</h4>
                      <p className="text-sm text-gray-500">
                        Download your current settings as a JSON file
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const dataStr = JSON.stringify(settings, null, 2);
                        const dataBlob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'negative-manager-settings.json';
                        link.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Export
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">System Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Version: 1.0.0</p>
                    <p>Last Updated: {clientInfo.lastUpdated || '--'}</p>
                    <p>Browser: {clientInfo.browser || '--'}</p>
                    <p>Storage Available: {clientInfo.storageAvailable ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
