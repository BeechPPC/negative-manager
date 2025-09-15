/**
 * Google Ads Script for Negative Keyword Management System - CORRECTED VERSION
 * 
 * This script collects search term data and negative keyword information
 * from Google Ads accounts and exports it to Google Sheets for analysis.
 * 
 * Features:
 * - Uses GAQL (Google Ads Query Language) for data collection
 * - Exports search term performance data
 * - Collects existing negative keyword lists
 * - Handles cost conversion from micros to actual currency
 * - Includes proper error handling and logging
 * - Optimized for bulk data operations
 * - Includes status tracking for processor integration
 */

// Configuration
const SHEET_URL = ''; // Will be created if empty
const TAB = 'SearchTermData';
const NEGATIVE_KEYWORDS_TAB = 'NegativeKeywords';

// Global variable to store the spreadsheet reference
let globalSpreadsheet = null;

// GAQL Queries
const SEARCH_TERM_QUERY = `
  SELECT 
    search_term_view.search_term,
    campaign.name,
    ad_group.name,
    metrics.impressions,
    metrics.clicks, 
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    segments.date
  FROM search_term_view
  WHERE segments.date DURING LAST_30_DAYS
    AND campaign.advertising_channel_type = "SEARCH"
    AND metrics.impressions > 0
  ORDER BY metrics.cost_micros DESC
`;

const NEG_KEYWORD_QUERY = `
  SELECT
    campaign.id,
    campaign.name,
    campaign_criterion.keyword.text,
    campaign_criterion.keyword.match_type
  FROM campaign_criterion
  WHERE campaign_criterion.negative = TRUE
    AND campaign_criterion.type = KEYWORD
  ORDER BY campaign.name ASC
`;

/**
 * Main function to execute the script
 */
function main() {
  try {
    Logger.log('Starting Negative Keyword Management Data Collection...');
    
    // Initialize Google Sheets
    const sheet = initializeSheet();
    const negativeKeywordsSheet = initializeNegativeKeywordsSheet();
    
    // Collect search term data
    Logger.log('Collecting search term data...');
    const searchTermData = collectSearchTermData();
    Logger.log(`Collected ${searchTermData.length} search term records`);
    
    // Collect negative keyword data
    Logger.log('Collecting negative keyword data...');
    const negativeKeywordData = collectNegativeKeywordData();
    Logger.log(`Collected ${negativeKeywordData.length} negative keyword records`);
    
    // Collect shared negative keyword lists
    Logger.log('Collecting shared negative keyword lists...');
    const sharedNegativeKeywordData = collectSharedNegativeKeywordData();
    Logger.log(`Collected ${sharedNegativeKeywordData.length} shared negative keyword records`);
    
    // Write data to sheets
    Logger.log('Writing data to Google Sheets...');
    writeSearchTermData(sheet, searchTermData);
    writeNegativeKeywordData(negativeKeywordsSheet, negativeKeywordData, sharedNegativeKeywordData);
    
    // Calculate and log summary
    const metrics = calculateMetrics(searchTermData);
    logSummary(metrics);
    
    Logger.log('Data collection completed successfully!');
    
    // Log the spreadsheet URL for easy access
    if (globalSpreadsheet) {
      Logger.log('Spreadsheet URL: ' + globalSpreadsheet.getUrl());
    }
    
  } catch (error) {
    Logger.log('Error in main function: ' + error.toString());
    throw error;
  }
}

/**
 * Initialize or get the main data sheet
 */
function initializeSheet() {
  let sheet;
  
  if (SHEET_URL) {
    // Use existing sheet
    globalSpreadsheet = SpreadsheetApp.openByUrl(SHEET_URL);
    sheet = globalSpreadsheet.getSheetByName(TAB);
    
    if (!sheet) {
      sheet = globalSpreadsheet.insertSheet(TAB);
    }
  } else {
    // Create new spreadsheet
    globalSpreadsheet = SpreadsheetApp.create('Negative Keyword Management Data');
    sheet = globalSpreadsheet.getActiveSheet();
    sheet.setName(TAB);
    Logger.log('Created new spreadsheet: ' + globalSpreadsheet.getUrl());
  }
  
  // Set up headers
  const headers = [
    'ID',
    'Search Term',
    'Campaign Name',
    'Ad Group Name',
    'Cost',
    'Clicks',
    'Impressions',
    'Conversions',
    'Cost Per Conversion',
    'CTR',
    'CPC',
    'Date'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  
  return sheet;
}

/**
 * Initialize or get the negative keywords sheet - CORRECTED VERSION
 */
function initializeNegativeKeywordsSheet() {
  let sheet = globalSpreadsheet.getSheetByName(NEGATIVE_KEYWORDS_TAB);
  
  if (!sheet) {
    sheet = globalSpreadsheet.insertSheet(NEGATIVE_KEYWORDS_TAB);
  }
  
  // Set up headers for negative keywords - CORRECTED TO INCLUDE STATUS COLUMNS
  const headers = [
    'ID',                    // Column 1 (index 0)
    'Keyword Text',          // Column 2 (index 1)
    'Match Type',            // Column 3 (index 2)
    'Level',                 // Column 4 (index 3)
    'Campaign ID',           // Column 5 (index 4)
    'Campaign Name',         // Column 6 (index 5)
    'Ad Group ID',           // Column 7 (index 6)
    'Ad Group Name',         // Column 8 (index 7)
    'Shared List ID',        // Column 9 (index 8)
    'Shared List Name',      // Column 10 (index 9)
    'Added Date',            // Column 11 (index 10)
    'Status',                // Column 12 (index 11) - NEW
    'Message',               // Column 13 (index 12) - NEW
    'Processed Date'         // Column 14 (index 13) - NEW
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#ea4335');
  headerRange.setFontColor('white');
  
  return sheet;
}

/**
 * Collect search term data using GAQL
 */
function collectSearchTermData() {
  const rows = [];
  
  try {
    const searchIterator = AdsApp.search(SEARCH_TERM_QUERY);
    
    // Log first row structure for debugging
    let rowCount = 0;
    if (searchIterator.hasNext()) {
      const firstRow = searchIterator.next();
      Logger.log('First row structure: ' + JSON.stringify(firstRow));
      
      const processedRow = processSearchTermRow(firstRow, ++rowCount);
      rows.push(processedRow);
    }
    
    // Process remaining rows
    while (searchIterator.hasNext()) {
      const row = searchIterator.next();
      rowCount++;
      
      const processedRow = processSearchTermRow(row, rowCount);
      rows.push(processedRow);
      
      // Log progress every 1000 rows
      if (rowCount % 1000 === 0) {
        Logger.log(`Processed ${rowCount} search term rows...`);
      }
    }
    
    Logger.log(`Total search term rows processed: ${rowCount}`);
    
  } catch (error) {
    Logger.log('Error collecting search term data: ' + error.toString());
    throw error;
  }
  
  return rows;
}

/**
 * Process individual search term row
 */
function processSearchTermRow(row, rowId) {
  try {
    // Access data using correct camelCase property names
    const searchTerm = row.searchTermView ? row.searchTermView.searchTerm : '';
    const campaignName = row.campaign ? row.campaign.name : '';
    const adGroupName = row.adGroup ? row.adGroup.name : '';
    
    // Access metrics object
    const metrics = row.metrics || {};
    const impressions = Number(metrics.impressions || 0);
    const clicks = Number(metrics.clicks || 0);
    const costMicros = Number(metrics.costMicros || 0);
    const conversions = Number(metrics.conversions || 0);
    const conversionsValue = Number(metrics.conversionsValue || 0);
    
    // Access segments
    const date = row.segments ? row.segments.date : '';
    
    // Convert cost from micros to actual currency
    const cost = costMicros / 1000000;
    
    // Calculate derived metrics
    const ctr = impressions > 0 ? (clicks / impressions) : 0;
    const cpc = clicks > 0 ? cost / clicks : 0;
    const costPerConversion = conversions > 0 ? cost / conversions : 0;
    
    return [
      rowId.toString(),
      searchTerm,
      campaignName,
      adGroupName,
      Number(cost.toFixed(2)),
      clicks,
      impressions,
      conversions,
      Number(costPerConversion.toFixed(2)),
      Number(ctr.toFixed(4)), // Keep more decimal places for CTR
      Number(cpc.toFixed(2)),
      date
    ];
    
  } catch (error) {
    Logger.log(`Error processing search term row ${rowId}: ${error.toString()}`);
    return [
      rowId.toString(),
      'ERROR',
      'ERROR',
      'ERROR',
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ''
    ];
  }
}

/**
 * Collect negative keyword data
 */
function collectNegativeKeywordData() {
  const rows = [];
  
  try {
    const searchIterator = AdsApp.search(NEG_KEYWORD_QUERY);
    
    let rowCount = 0;
    while (searchIterator.hasNext()) {
      const row = searchIterator.next();
      rowCount++;
      
      const processedRow = processNegativeKeywordRow(row, rowCount);
      rows.push(processedRow);
    }
    
    Logger.log(`Total negative keyword rows processed: ${rowCount}`);
    
  } catch (error) {
    Logger.log('Error collecting negative keyword data: ' + error.toString());
    // Don't throw error, just return empty array
    Logger.log('Continuing with empty negative keyword data...');
  }
  
  return rows;
}

/**
 * Process individual negative keyword row - CORRECTED VERSION
 */
function processNegativeKeywordRow(row, rowId) {
  try {
    const campaignId = row.campaign ? row.campaign.id : '';
    const campaignName = row.campaign ? row.campaign.name : '';
    const keywordText = row.campaignCriterion && row.campaignCriterion.keyword ? 
                       row.campaignCriterion.keyword.text : '';
    const matchType = row.campaignCriterion && row.campaignCriterion.keyword ? 
                     row.campaignCriterion.keyword.matchType : '';
    
    return [
      `neg_${rowId}`,          // ID
      keywordText,             // Keyword Text
      matchType,               // Match Type
      'CAMPAIGN',              // Level
      campaignId,              // Campaign ID
      campaignName,            // Campaign Name
      '',                      // Ad Group ID
      '',                      // Ad Group Name
      '',                      // Shared List ID
      '',                      // Shared List Name
      new Date().toISOString(),// Added Date
      'ACTIVE',                // Status (existing negatives are active)
      'Existing negative keyword', // Message
      new Date().toISOString() // Processed Date
    ];
    
  } catch (error) {
    Logger.log(`Error processing negative keyword row ${rowId}: ${error.toString()}`);
    return [
      `neg_${rowId}`,
      'ERROR',
      'ERROR',
      'ERROR',
      '',
      '',
      '',
      '',
      '',
      '',
      new Date().toISOString(),
      'ERROR',
      error.toString(),
      new Date().toISOString()
    ];
  }
}

/**
 * Collect shared negative keyword data using iterator approach - CORRECTED VERSION
 */
function collectSharedNegativeKeywordData() {
  const rows = [];
  
  try {
    // Get shared negative keyword lists using the iterator approach
    const sharedSets = AdsApp.negativeKeywordLists().get();
    
    let rowCount = 0;
    while (sharedSets.hasNext()) {
      const sharedSet = sharedSets.next();
      const sharedSetName = sharedSet.getName();
      const sharedSetId = sharedSet.getId ? sharedSet.getId() : '';
      
      // Get negative keywords in this shared set
      const negativeKeywords = sharedSet.negativeKeywords().get();
      
      while (negativeKeywords.hasNext()) {
        const negKeyword = negativeKeywords.next();
        rowCount++;
        
        const keywordText = negKeyword.getText();
        const matchType = negKeyword.getMatchType();
        
        const processedRow = [
          `shared_${rowCount}`,    // ID
          keywordText,             // Keyword Text
          matchType,               // Match Type
          'SHARED_LIST',           // Level
          '',                      // Campaign ID
          '',                      // Campaign Name
          '',                      // Ad Group ID
          '',                      // Ad Group Name
          sharedSetId,             // Shared List ID
          sharedSetName,           // Shared List Name
          new Date().toISOString(),// Added Date
          'ACTIVE',                // Status (existing negatives are active)
          'Existing shared negative keyword', // Message
          new Date().toISOString() // Processed Date
        ];
        
        rows.push(processedRow);
      }
    }
    
    Logger.log(`Total shared negative keyword rows processed: ${rowCount}`);
    
  } catch (error) {
    Logger.log('Error collecting shared negative keyword data: ' + error.toString());
    // Don't throw error, just return empty array
    Logger.log('Continuing with empty shared negative keyword data...');
  }
  
  return rows;
}

/**
 * Write search term data to sheet in bulk
 */
function writeSearchTermData(sheet, data) {
  try {
    if (data.length === 0) {
      Logger.log('No search term data to write');
      return;
    }
    
    // Clear existing data (except headers)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
    }
    
    // Write data in bulk
    const range = sheet.getRange(2, 1, data.length, data[0].length);
    range.setValues(data);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, data[0].length);
    
    // Format numeric columns
    formatNumericColumns(sheet, data.length);
    
    Logger.log(`Successfully wrote ${data.length} search term rows to sheet`);
    
  } catch (error) {
    Logger.log('Error writing search term data: ' + error.toString());
    throw error;
  }
}

/**
 * Write negative keyword data to sheet
 */
function writeNegativeKeywordData(sheet, campaignData, sharedData) {
  try {
    const allData = [...campaignData, ...sharedData];
    
    if (allData.length === 0) {
      Logger.log('No negative keyword data to write');
      return;
    }
    
    // Clear existing data (except headers)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
    }
    
    // Write data in bulk
    const range = sheet.getRange(2, 1, allData.length, allData[0].length);
    range.setValues(allData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, allData[0].length);
    
    Logger.log(`Successfully wrote ${allData.length} negative keyword rows to sheet`);
    
  } catch (error) {
    Logger.log('Error writing negative keyword data: ' + error.toString());
    throw error;
  }
}

/**
 * Format numeric columns in the sheet
 */
function formatNumericColumns(sheet, rowCount) {
  try {
    if (rowCount === 0) return;
    
    // Format cost column (column 5)
    const costRange = sheet.getRange(2, 5, rowCount, 1);
    costRange.setNumberFormat('$#,##0.00');
    
    // Format CTR column (column 10) - as percentage
    const ctrRange = sheet.getRange(2, 10, rowCount, 1);
    ctrRange.setNumberFormat('0.00%');
    
    // Format CPC column (column 11)
    const cpcRange = sheet.getRange(2, 11, rowCount, 1);
    cpcRange.setNumberFormat('$#,##0.00');
    
    // Format Cost Per Conversion column (column 9)
    const cpaRange = sheet.getRange(2, 9, rowCount, 1);
    cpaRange.setNumberFormat('$#,##0.00');
    
  } catch (error) {
    Logger.log('Error formatting numeric columns: ' + error.toString());
  }
}

/**
 * Calculate metrics for search term data
 */
function calculateMetrics(rows) {
  const metrics = {
    totalRows: rows.length,
    totalCost: 0,
    totalClicks: 0,
    totalImpressions: 0,
    totalConversions: 0,
    averageCTR: 0,
    averageCPC: 0,
    averageCPA: 0
  };
  
  if (rows.length === 0) {
    return metrics;
  }
  
  let totalCTR = 0;
  let totalCPC = 0;
  let totalCPA = 0;
  let itemsWithConversions = 0;
  
  rows.forEach(row => {
    const cost = Number(row[4]) || 0; // Column 5 (index 4)
    const clicks = Number(row[5]) || 0; // Column 6 (index 5)
    const impressions = Number(row[6]) || 0; // Column 7 (index 6)
    const conversions = Number(row[7]) || 0; // Column 8 (index 7)
    const ctr = Number(row[9]) || 0; // Column 10 (index 9)
    const cpc = Number(row[10]) || 0; // Column 11 (index 10)
    const cpa = Number(row[8]) || 0; // Column 9 (index 8)
    
    metrics.totalCost += cost;
    metrics.totalClicks += clicks;
    metrics.totalImpressions += impressions;
    metrics.totalConversions += conversions;
    
    totalCTR += ctr;
    totalCPC += cpc;
    
    if (conversions > 0) {
      totalCPA += cpa;
      itemsWithConversions++;
    }
  });
  
  metrics.averageCTR = totalCTR / rows.length;
  metrics.averageCPC = totalCPC / rows.length;
  metrics.averageCPA = itemsWithConversions > 0 ? totalCPA / itemsWithConversions : 0;
  
  return metrics;
}

/**
 * Log summary statistics
 */
function logSummary(metrics) {
  Logger.log('=== DATA COLLECTION SUMMARY ===');
  Logger.log(`Total Search Terms: ${metrics.totalRows}`);
  Logger.log(`Total Cost: $${metrics.totalCost.toFixed(2)}`);
  Logger.log(`Total Clicks: ${metrics.totalClicks}`);
  Logger.log(`Total Impressions: ${metrics.totalImpressions}`);
  Logger.log(`Total Conversions: ${metrics.totalConversions}`);
  Logger.log(`Average CTR: ${(metrics.averageCTR * 100).toFixed(2)}%`);
  Logger.log(`Average CPC: $${metrics.averageCPC.toFixed(2)}`);
  Logger.log(`Average CPA: $${metrics.averageCPA.toFixed(2)}`);
  Logger.log('===============================');
}