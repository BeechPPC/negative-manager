/**
 * Google Sheets Apps Script API for Negative Keyword Management System
 * 
 * This script turns a Google Sheet into a REST API endpoint for the
 * negative keyword management web application.
 * 
 * Features:
 * - GET endpoint for reading search term data
 * - POST endpoint for adding negative keywords
 * - Campaign and shared list data endpoints
 * - Dashboard metrics calculation
 * - Proper CORS handling
 * - JSON responses
 * - Error handling
 * - Data validation
 * - Status tracking integration
 */

// Configuration
const SHEET_NAME = 'SearchTermData';
const NEGATIVE_KEYWORDS_SHEET_NAME = 'NegativeKeywords';
const CAMPAIGN_DATA_SHEET_NAME = 'CampaignData';
const SHARED_LIST_DATA_SHEET_NAME = 'SharedListData';
const PROCESSING_TRIGGERS_SHEET_NAME = 'ProcessingTriggers';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

/**
 * Handle GET requests
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'search-terms';
    
    switch (action) {
      case 'search-terms':
        return handleGetSearchTerms(e);
      case 'negative-keywords':
        return handleGetNegativeKeywords(e);
      case 'dashboard':
        return handleGetDashboard(e);
      case 'campaigns':
        return handleGetCampaigns(e);
      case 'shared-lists':
        return handleGetSharedLists(e);
      case 'processing-status':
        return handleGetProcessingStatus(e);
      case 'test':
        return handleTest(e);
      default:
        return createErrorResponse('Invalid action', 400);
    }
    
  } catch (error) {
    console.error('Error in doGet:', error);
    return createErrorResponse('Internal server error: ' + error.message, 500);
  }
}

/**
 * Handle POST requests
 */
function doPost(e) {
  try {
    const action = e.parameter.action || '';
    
    switch (action) {
      case 'add-negative-keywords':
        return handleAddNegativeKeywords(e);
      case 'remove-negative-keyword':
        return handleRemoveNegativeKeyword(e);
      case 'process-keywords':
        return handleProcessKeywords(e);
      default:
        return createErrorResponse('Invalid action', 400);
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createErrorResponse('Internal server error: ' + error.message, 500);
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '3600'
    });
}

/**
 * Get search term data with pagination and filtering
 */
function handleGetSearchTerms(e) {
  try {
    const page = parseInt(e.parameter.page) || 1;
    const pageSize = Math.min(parseInt(e.parameter.pageSize) || 50, 1000);
    const filters = e.parameter.filters ? JSON.parse(decodeURIComponent(e.parameter.filters)) : {};
    
    const sheet = getSheet(SHEET_NAME);
    if (!sheet) {
      return createErrorResponse('Search terms sheet not found', 404);
    }
    
    const result = getSearchTermData(sheet, page, pageSize, filters);
    
    return createResponse({
      data: result.data,
      total: result.total,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(result.total / pageSize),
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error getting search terms:', error);
    return createErrorResponse('Failed to get search terms: ' + error.message, 500);
  }
}

/**
 * Get negative keyword data
 */
function handleGetNegativeKeywords(e) {
  try {
    const sheet = getSheet(NEGATIVE_KEYWORDS_SHEET_NAME);
    if (!sheet) {
      return createErrorResponse('Negative keywords sheet not found', 404);
    }
    
    const data = getNegativeKeywordData(sheet);
    
    return createResponse({
      data: {
        campaign: data.filter(item => item.level === 'CAMPAIGN'),
        adGroup: data.filter(item => item.level === 'AD_GROUP'),
        shared: data.filter(item => item.level === 'SHARED_LIST'),
        all: data
      },
      total: data.length
    });
    
  } catch (error) {
    console.error('Error getting negative keywords:', error);
    return createErrorResponse('Failed to get negative keywords: ' + error.message, 500);
  }
}

/**
 * Get dashboard metrics
 */
function handleGetDashboard(e) {
  try {
    const searchTermsSheet = getSheet(SHEET_NAME);
    if (!searchTermsSheet) {
      return createErrorResponse('Search terms sheet not found', 404);
    }
    
    const metrics = calculateDashboardMetrics(searchTermsSheet);
    
    return createResponse({
      data: metrics
    });
    
  } catch (error) {
    console.error('Error getting dashboard metrics:', error);
    return createErrorResponse('Failed to get dashboard metrics: ' + error.message, 500);
  }
}

/**
 * Get campaigns and ad groups for dropdown
 */
function handleGetCampaigns(e) {
  try {
    const campaignData = getCampaignDataFromSheet();
    
    return createResponse({
      data: campaignData
    });
    
  } catch (error) {
    console.error('Error getting campaigns:', error);
    return createErrorResponse('Failed to get campaigns: ' + error.message, 500);
  }
}

/**
 * Get shared negative keyword lists for dropdown
 */
function handleGetSharedLists(e) {
  try {
    const sharedListData = getSharedListDataFromSheet();
    
    return createResponse({
      data: sharedListData
    });
    
  } catch (error) {
    console.error('Error getting shared lists:', error);
    return createErrorResponse('Failed to get shared lists: ' + error.message, 500);
  }
}

/**
 * Get processing status
 */
function handleGetProcessingStatus(e) {
  try {
    const sheet = getSheet(PROCESSING_TRIGGERS_SHEET_NAME);
    if (!sheet) {
      return createResponse({
        status: 'No processing history found',
        lastProcessed: null,
        pendingRequests: 0
      });
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return createResponse({
        status: 'No processing history found',
        lastProcessed: null,
        pendingRequests: 0
      });
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
    
    let lastProcessed = null;
    let pendingRequests = 0;
    
    data.forEach(row => {
      if (row[2] === 'PENDING') {
        pendingRequests++;
      } else if (row[2] === 'COMPLETED' && row[4]) {
        if (!lastProcessed || new Date(row[4]) > new Date(lastProcessed)) {
          lastProcessed = row[4];
        }
      }
    });
    
    return createResponse({
      status: pendingRequests > 0 ? 'Processing pending' : 'Up to date',
      lastProcessed: lastProcessed,
      pendingRequests: pendingRequests
    });
    
  } catch (error) {
    console.error('Error getting processing status:', error);
    return createErrorResponse('Failed to get processing status: ' + error.message, 500);
  }
}

/**
 * Handle test endpoint
 */
function handleTest(e) {
  return createResponse({
    message: 'Google Apps Script API is working!',
    timestamp: new Date().toISOString(),
    action: e.parameter.action || 'test'
  });
}

/**
 * Add negative keywords
 */
function handleAddNegativeKeywords(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      return createErrorResponse('No data provided', 400);
    }
    
    const postData = JSON.parse(e.postData.contents);
    const { keywords } = postData;
    
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return createErrorResponse('Invalid keywords data', 400);
    }
    
    // Validate keywords
    const validationErrors = [];
    keywords.forEach((keyword, index) => {
      const errors = validateKeyword(keyword);
      if (errors.length > 0) {
        validationErrors.push(`Keyword ${index + 1}: ${errors.join(', ')}`);
      }
    });
    
    if (validationErrors.length > 0) {
      return createErrorResponse('Validation errors: ' + validationErrors.join('; '), 400);
    }
    
    // Add to sheet for tracking
    const sheet = getSheet(NEGATIVE_KEYWORDS_SHEET_NAME);
    if (!sheet) {
      return createErrorResponse('Negative keywords sheet not found', 404);
    }
    
    const sheetResult = addNegativeKeywords(sheet, keywords);
    
    // Trigger processing
    const triggerSheet = getOrCreateTriggerSheet();
    if (triggerSheet) {
      const timestamp = new Date().toISOString();
      triggerSheet.appendRow(['PROCESS_NEGATIVE_KEYWORDS', timestamp, 'PENDING', '', '']);
    }
    
    return createResponse({
      added: sheetResult.added,
      failed: sheetResult.failed,
      errors: sheetResult.errors,
      message: `${sheetResult.added} negative keywords queued for addition to Google Ads. Processing will occur automatically within 15 minutes, or you can trigger it manually.`
    });
    
  } catch (error) {
    console.error('Error adding negative keywords:', error);
    return createErrorResponse('Failed to add negative keywords: ' + error.message, 500);
  }
}

/**
 * Remove negative keyword
 */
function handleRemoveNegativeKeyword(e) {
  try {
    const keywordId = e.parameter.id;
    
    if (!keywordId) {
      return createErrorResponse('Keyword ID is required', 400);
    }
    
    const sheet = getSheet(NEGATIVE_KEYWORDS_SHEET_NAME);
    if (!sheet) {
      return createErrorResponse('Negative keywords sheet not found', 404);
    }
    
    const success = removeNegativeKeyword(sheet, keywordId);
    
    return createResponse({
      success: success,
      message: success ? 'Negative keyword removed successfully' : 'Failed to remove negative keyword'
    });
    
  } catch (error) {
    console.error('Error removing negative keyword:', error);
    return createErrorResponse('Failed to remove negative keyword: ' + error.message, 500);
  }
}

/**
 * Trigger processing of pending negative keywords
 */
function handleProcessKeywords(e) {
  try {
    const sheet = getSheet(NEGATIVE_KEYWORDS_SHEET_NAME);
    if (!sheet) {
      return createErrorResponse('Negative keywords sheet not found', 404);
    }
    
    // Add a trigger flag to indicate processing should happen
    const triggerSheet = getOrCreateTriggerSheet();
    const timestamp = new Date().toISOString();
    
    // Add processing request
    triggerSheet.appendRow(['PROCESS_NEGATIVE_KEYWORDS', timestamp, 'PENDING', '', '']);
    
    return createResponse({
      message: 'Processing request queued. Keywords will be added to Google Ads shortly.',
      timestamp: timestamp
    });
    
  } catch (error) {
    console.error('Error triggering keyword processing:', error);
    return createErrorResponse('Failed to trigger processing: ' + error.message, 500);
  }
}

/**
 * Get sheet by name
 */
function getSheet(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    return spreadsheet.getSheetByName(sheetName);
  } catch (error) {
    console.error(`Error getting sheet ${sheetName}:`, error);
    return null;
  }
}

/**
 * Get search term data with pagination and filtering
 */
function getSearchTermData(sheet, page, pageSize, filters) {
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return { data: [], total: 0 };
    }
    
    const data = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()).getValues();
    const headers = data[0];
    let rows = data.slice(1);
    
    // Apply filters
    if (filters.campaignName) {
      rows = rows.filter(row => 
        row[2] && row[2].toString().toLowerCase().includes(filters.campaignName.toLowerCase())
      );
    }
    if (filters.adGroupName) {
      rows = rows.filter(row => 
        row[3] && row[3].toString().toLowerCase().includes(filters.adGroupName.toLowerCase())
      );
    }
    if (filters.minCost !== undefined && filters.minCost !== '') {
      rows = rows.filter(row => 
        parseFloat(row[4]) >= parseFloat(filters.minCost)
      );
    }
    if (filters.maxCost !== undefined && filters.maxCost !== '') {
      rows = rows.filter(row => 
        parseFloat(row[4]) <= parseFloat(filters.maxCost)
      );
    }
    if (filters.hasConversions !== undefined) {
      rows = rows.filter(row => {
        const hasConversions = parseFloat(row[7]) > 0;
        return filters.hasConversions === hasConversions;
      });
    }
    if (filters.searchTerm) {
      rows = rows.filter(row => 
        row[1] && row[1].toString().toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    const total = rows.length;
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRows = rows.slice(startIndex, endIndex);
    
    // Convert to objects based on corrected column indices
    const convertedData = paginatedRows.map(row => ({
      id: row[0] || '',
      searchTerm: row[1] || '',
      campaignName: row[2] || '',
      adGroupName: row[3] || '',
      cost: parseFloat(row[4]) || 0,
      clicks: parseInt(row[5]) || 0,
      impressions: parseInt(row[6]) || 0,
      conversions: parseFloat(row[7]) || 0,
      costPerConversion: parseFloat(row[8]) || 0,
      ctr: parseFloat(row[9]) || 0,
      cpc: parseFloat(row[10]) || 0,
      date: row[11] || ''
    }));
    
    return { data: convertedData, total: total };
    
  } catch (error) {
    console.error('Error getting search term data:', error);
    return { data: [], total: 0 };
  }
}

/**
 * Get negative keyword data - CORRECTED FOR 14-COLUMN STRUCTURE
 */
function getNegativeKeywordData(sheet) {
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return [];
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    
    return data.map(row => ({
      id: row[0] || '',
      keywordText: row[1] || '',
      matchType: row[2] || '',
      level: row[3] || '',
      campaignId: row[4] || '',
      campaignName: row[5] || '',
      adGroupId: row[6] || '',
      adGroupName: row[7] || '',
      sharedListId: row[8] || '',
      sharedListName: row[9] || '',
      addedDate: row[10] || '',
      status: row[11] || 'PENDING',     // NEW FIELD
      message: row[12] || '',           // NEW FIELD
      processedDate: row[13] || ''      // NEW FIELD
    }));
    
  } catch (error) {
    console.error('Error getting negative keyword data:', error);
    return [];
  }
}

/**
 * Calculate dashboard metrics
 */
function calculateDashboardMetrics(sheet) {
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return getEmptyMetrics();
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    
    let totalCost = 0;
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalConversions = 0;
    let wastedSpend = 0;
    let potentialSavings = 0;
    
    const opportunities = [];
    
    data.forEach(row => {
      const cost = parseFloat(row[4]) || 0;
      const clicks = parseInt(row[5]) || 0;
      const impressions = parseInt(row[6]) || 0;
      const conversions = parseFloat(row[7]) || 0;
      
      totalCost += cost;
      totalClicks += clicks;
      totalImpressions += impressions;
      totalConversions += conversions;
      
      if (conversions === 0) {
        wastedSpend += cost;
        
        if (cost > 5) {
          potentialSavings += cost;
          opportunities.push({
            searchTerm: row[1] || '',
            cost: cost,
            clicks: clicks,
            conversions: conversions,
            potentialSavings: cost,
            campaignName: row[2] || '',
            adGroupName: row[3] || ''
          });
        }
      }
    });
    
    const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const averageCPC = totalClicks > 0 ? totalCost / totalClicks : 0;
    const averageCPA = totalConversions > 0 ? totalCost / totalConversions : 0;
    
    // Sort opportunities by potential savings
    opportunities.sort((a, b) => b.potentialSavings - a.potentialSavings);
    
    return {
      totalSearchTerms: data.length,
      totalCost: Math.round(totalCost * 100) / 100,
      totalClicks: totalClicks,
      totalConversions: totalConversions,
      wastedSpend: Math.round(wastedSpend * 100) / 100,
      potentialSavings: Math.round(potentialSavings * 100) / 100,
      averageCtr: Math.round(averageCTR * 100) / 100,
      averageCpc: Math.round(averageCPC * 100) / 100,
      averageCpa: Math.round(averageCPA * 100) / 100,
      topNegativeKeywordOpportunities: opportunities.slice(0, 10)
    };
    
  } catch (error) {
    console.error('Error calculating dashboard metrics:', error);
    return getEmptyMetrics();
  }
}

/**
 * Get campaign data from sheet (populated by Google Ads script)
 */
function getCampaignDataFromSheet() {
  try {
    const sheet = getSheet(CAMPAIGN_DATA_SHEET_NAME);
    if (!sheet) {
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return [];
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    
    // Group by campaign
    const campaigns = {};
    
    data.forEach(row => {
      const campaignId = row[0];
      const campaignName = row[1];
      const adGroupId = row[2];
      const adGroupName = row[3];
      
      if (!campaigns[campaignId]) {
        campaigns[campaignId] = {
          id: campaignId,
          name: campaignName,
          adGroups: []
        };
      }
      
      if (adGroupId && adGroupName) {
        campaigns[campaignId].adGroups.push({
          id: adGroupId,
          name: adGroupName
        });
      }
    });
    
    return Object.values(campaigns);
    
  } catch (error) {
    console.error('Error getting campaign data from sheet:', error);
    return [];
  }
}

/**
 * Get shared list data from sheet (populated by Google Ads script)
 */
function getSharedListDataFromSheet() {
  try {
    const sheet = getSheet(SHARED_LIST_DATA_SHEET_NAME);
    if (!sheet) {
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return [];
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
    
    return data.map(row => ({
      id: row[0],
      name: row[1]
    }));
    
  } catch (error) {
    console.error('Error getting shared list data from sheet:', error);
    return [];
  }
}

/**
 * Add negative keywords to sheet - CORRECTED FOR 14-COLUMN STRUCTURE
 */
function addNegativeKeywords(sheet, keywords) {
  try {
    let added = 0;
    let failed = 0;
    const errors = [];
    
    const lastRow = sheet.getLastRow();
    const newRows = [];
    
    keywords.forEach((keyword, index) => {
      try {
        // Generate unique ID
        const id = `new_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const newRow = [
          id,                              // ID
          keyword.text,                    // Keyword Text
          keyword.matchType,               // Match Type
          keyword.level,                   // Level
          keyword.campaignId || '',        // Campaign ID
          keyword.campaignName || '',      // Campaign Name
          keyword.adGroupId || '',         // Ad Group ID
          keyword.adGroupName || '',       // Ad Group Name
          keyword.sharedListId || '',      // Shared List ID
          keyword.sharedListName || '',    // Shared List Name
          new Date().toISOString(),        // Added Date
          'PENDING',                       // Status
          'Waiting for processing',        // Message
          ''                               // Processed Date (empty until processed)
        ];
        
        newRows.push(newRow);
        added++;
        
      } catch (error) {
        failed++;
        errors.push(`Keyword ${index + 1}: ${error.message}`);
      }
    });
    
    // Write new rows to sheet
    if (newRows.length > 0) {
      const range = sheet.getRange(lastRow + 1, 1, newRows.length, newRows[0].length);
      range.setValues(newRows);
    }
    
    return { added, failed, errors };
    
  } catch (error) {
    console.error('Error adding negative keywords:', error);
    return { added: 0, failed: keywords.length, errors: [error.message] };
  }
}

/**
 * Remove negative keyword from sheet
 */
function removeNegativeKeyword(sheet, keywordId) {
  try {
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) { // Skip header row
      if (data[i][0] === keywordId) {
        sheet.deleteRow(i + 1); // +1 because sheet rows are 1-indexed
        return true;
      }
    }
    
    return false; // Keyword not found
    
  } catch (error) {
    console.error('Error removing negative keyword:', error);
    return false;
  }
}

/**
 * Get or create trigger sheet for communication between Apps Script and Google Ads script
 */
function getOrCreateTriggerSheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(PROCESSING_TRIGGERS_SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(PROCESSING_TRIGGERS_SHEET_NAME);
      
      // Set up headers
      const headers = ['Action', 'Timestamp', 'Status', 'Message', 'Processed Date'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#34a853');
      headerRange.setFontColor('white');
    }
    
    return sheet;
    
  } catch (error) {
    console.error('Error getting/creating trigger sheet:', error);
    return null;
  }
}

/**
 * Get empty metrics object
 */
function getEmptyMetrics() {
  return {
    totalSearchTerms: 0,
    totalCost: 0,
    totalClicks: 0,
    totalConversions: 0,
    wastedSpend: 0,
    potentialSavings: 0,
    averageCtr: 0,
    averageCpc: 0,
    averageCpa: 0,
    topNegativeKeywordOpportunities: []
  };
}

/**
 * Create success response with CORS support
 */
function createResponse(data, statusCode = 200, message = 'Success') {
  const response = {
    success: true,
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response with CORS support
 */
function createErrorResponse(message, statusCode = 400) {
  const response = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Validate keyword data
 */
function validateKeyword(keyword) {
  const errors = [];
  
  if (!keyword.text || keyword.text.trim().length === 0) {
    errors.push('Keyword text is required');
  }
  
  if (keyword.text && keyword.text.length > 80) {
    errors.push('Keyword text must be 80 characters or less');
  }
  
  if (!['EXACT', 'PHRASE', 'BROAD'].includes(keyword.matchType)) {
    errors.push('Invalid match type. Must be EXACT, PHRASE, or BROAD');
  }
  
  if (!['CAMPAIGN', 'AD_GROUP', 'SHARED_LIST'].includes(keyword.level)) {
    errors.push('Invalid level. Must be CAMPAIGN, AD_GROUP, or SHARED_LIST');
  }
  
  if (keyword.level === 'CAMPAIGN' && !keyword.campaignId) {
    errors.push('Campaign ID is required for campaign level keywords');
  }
  
  if (keyword.level === 'AD_GROUP' && (!keyword.campaignId || !keyword.adGroupId)) {
    errors.push('Campaign ID and Ad Group ID are required for ad group level keywords');
  }
  
  if (keyword.level === 'SHARED_LIST' && !keyword.sharedListId) {
    errors.push('Shared List ID is required for shared list keywords');
  }
  
  return errors;
}

/**
 * Test function to verify API is working
 */
function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test search terms endpoint
    const searchTermsResult = handleGetSearchTerms({
      parameter: { page: '1', pageSize: '10' }
    });
    console.log('Search terms test:', searchTermsResult.getContent());
    
    // Test negative keywords endpoint
    const negativeKeywordsResult = handleGetNegativeKeywords({
      parameter: {}
    });
    console.log('Negative keywords test:', negativeKeywordsResult.getContent());
    
    // Test dashboard endpoint
    const dashboardResult = handleGetDashboard({
      parameter: {}
    });
    console.log('Dashboard test:', dashboardResult.getContent());
    
    console.log('API tests completed successfully!');
    
  } catch (error) {
    console.error('API test failed:', error);
  }
}

/**
 * Get API URL for deployment
 */
function getApiUrl() {
  const url = ScriptApp.getService().getUrl();
  console.log('API URL:', url);
  return url;
}