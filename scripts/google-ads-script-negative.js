/**
 * Google Ads Script - Negative Keyword Processor
 * 
 * This script runs in Google Ads and processes negative keywords
 * that have been added via the webapp and stored in Google Sheets.
 * 
 * Install this as a separate Google Ads script and set it to run every 15 minutes.
 */

// Configuration - UPDATE THESE WITH YOUR ACTUAL SHEET URL
const SHEET_URL = 'YOUR_GOOGLE_SHEET_URL_HERE'; // Replace with your actual sheet URL
const NEGATIVE_KEYWORDS_TAB = 'NegativeKeywords';
const CAMPAIGN_DATA_TAB = 'CampaignData';
const SHARED_LIST_DATA_TAB = 'SharedListData';
const PROCESSING_TRIGGERS_TAB = 'ProcessingTriggers';

/**
 * Main function to process pending negative keywords
 * Set this to run every 15 minutes in Google Ads Scripts
 */
function main() {
  try {
    Logger.log('Starting negative keyword processor...');
    
    // First, update campaign and shared list data for webapp dropdowns
    updateCampaignAndAdGroupData();
    updateSharedListData();
    
    // Then process any pending negative keywords
    const results = processPendingNegativeKeywords();
    
    if (results && results.length > 0) {
      Logger.log(`Processed ${results.length} keywords:`);
      results.forEach(result => {
        Logger.log(`- ${result.keyword}: ${result.success ? 'SUCCESS' : 'FAILED'} - ${result.message}`);
      });
    } else {
      Logger.log('No pending keywords to process');
    }
    
    Logger.log('Negative keyword processor completed');
    
  } catch (error) {
    Logger.log('Error in main function: ' + error.toString());
  }
}

/**
 * Process pending negative keywords from the sheet
 */
function processPendingNegativeKeywords() {
  try {
    const sheet = getSheet(NEGATIVE_KEYWORDS_TAB);
    if (!sheet) {
      Logger.log('Negative keywords sheet not found');
      return null;
    }
    
    // Get pending keywords
    const pendingKeywords = getPendingKeywords(sheet);
    
    if (pendingKeywords.length === 0) {
      return [];
    }
    
    Logger.log(`Found ${pendingKeywords.length} pending keywords to process`);
    
    let successCount = 0;
    let failureCount = 0;
    const results = [];
    
    // Process each keyword
    pendingKeywords.forEach(keyword => {
      try {
        const result = addNegativeKeywordToGoogleAds(keyword);
        
        if (result.success) {
          successCount++;
          updateKeywordStatus(sheet, keyword.rowIndex, 'ACTIVE', result.message);
        } else {
          failureCount++;
          updateKeywordStatus(sheet, keyword.rowIndex, 'FAILED', result.error);
        }
        
        results.push({
          keyword: keyword.keywordText,
          level: keyword.level,
          success: result.success,
          message: result.success ? result.message : result.error
        });
        
      } catch (error) {
        failureCount++;
        Logger.log(`Error processing keyword ${keyword.keywordText}: ${error.toString()}`);
        updateKeywordStatus(sheet, keyword.rowIndex, 'FAILED', error.toString());
      }
    });
    
    // Update processing trigger status
    updateProcessingTriggerStatus(successCount, failureCount);
    
    Logger.log(`Processing completed: ${successCount} successful, ${failureCount} failed`);
    return results;
    
  } catch (error) {
    Logger.log('Error in processPendingNegativeKeywords: ' + error.toString());
    return null;
  }
}

/**
 * Add a negative keyword to Google Ads
 */
function addNegativeKeywordToGoogleAds(keyword) {
  try {
    switch (keyword.level) {
      case 'CAMPAIGN':
        return addCampaignNegativeKeyword(keyword);
      case 'AD_GROUP':
        return addAdGroupNegativeKeyword(keyword);
      case 'SHARED_LIST':
        return addSharedListNegativeKeyword(keyword);
      default:
        return {
          success: false,
          error: `Invalid keyword level: ${keyword.level}`
        };
    }
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Add campaign-level negative keyword
 */
function addCampaignNegativeKeyword(keyword) {
  try {
    if (!keyword.campaignId) {
      return {
        success: false,
        error: 'Campaign ID is required'
      };
    }
    
    const campaignIterator = AdsApp.campaigns()
      .withIds([keyword.campaignId])
      .get();
    
    if (!campaignIterator.hasNext()) {
      return {
        success: false,
        error: `Campaign not found: ${keyword.campaignId}`
      };
    }
    
    const campaign = campaignIterator.next();
    const operation = campaign.negativeKeywords().add(keyword.keywordText, keyword.matchType);
    
    if (operation.isSuccessful()) {
      return {
        success: true,
        message: `Added to campaign "${campaign.getName()}"`
      };
    } else {
      const errors = operation.getErrors();
      return {
        success: false,
        error: errors.length > 0 ? errors[0] : 'Unknown error adding campaign negative keyword'
      };
    }
    
  } catch (error) {
    return {
      success: false,
      error: `Campaign error: ${error.toString()}`
    };
  }
}

/**
 * Add ad group-level negative keyword
 */
function addAdGroupNegativeKeyword(keyword) {
  try {
    if (!keyword.adGroupId) {
      return {
        success: false,
        error: 'Ad Group ID is required'
      };
    }
    
    const adGroupIterator = AdsApp.adGroups()
      .withIds([keyword.adGroupId])
      .get();
    
    if (!adGroupIterator.hasNext()) {
      return {
        success: false,
        error: `Ad group not found: ${keyword.adGroupId}`
      };
    }
    
    const adGroup = adGroupIterator.next();
    const operation = adGroup.negativeKeywords().add(keyword.keywordText, keyword.matchType);
    
    if (operation.isSuccessful()) {
      return {
        success: true,
        message: `Added to ad group "${adGroup.getName()}"`
      };
    } else {
      const errors = operation.getErrors();
      return {
        success: false,
        error: errors.length > 0 ? errors[0] : 'Unknown error adding ad group negative keyword'
      };
    }
    
  } catch (error) {
    return {
      success: false,
      error: `Ad group error: ${error.toString()}`
    };
  }
}

/**
 * Add shared list negative keyword
 */
function addSharedListNegativeKeyword(keyword) {
  try {
    if (!keyword.sharedListId) {
      return {
        success: false,
        error: 'Shared List ID is required'
      };
    }
    
    const sharedListIterator = AdsApp.negativeKeywordLists()
      .withIds([keyword.sharedListId])
      .get();
    
    if (!sharedListIterator.hasNext()) {
      return {
        success: false,
        error: `Shared list not found: ${keyword.sharedListId}`
      };
    }
    
    const sharedList = sharedListIterator.next();
    const operation = sharedList.addNegativeKeyword(keyword.keywordText, keyword.matchType);
    
    if (operation.isSuccessful()) {
      return {
        success: true,
        message: `Added to shared list "${sharedList.getName()}"`
      };
    } else {
      const errors = operation.getErrors();
      return {
        success: false,
        error: errors.length > 0 ? errors[0] : 'Unknown error adding shared list negative keyword'
      };
    }
    
  } catch (error) {
    return {
      success: false,
      error: `Shared list error: ${error.toString()}`
    };
  }
}

/**
 * Get pending keywords from sheet
 */
function getPendingKeywords(sheet) {
  try {
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return [];
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    const pendingKeywords = [];
    
    data.forEach((row, index) => {
      // Check if this is a pending keyword (status column empty or 'PENDING')
      const status = row[11] || ''; // Status column
      
      if ((status === '' || status === 'PENDING') && row[0] && row[0].toString().startsWith('new_')) {
        pendingKeywords.push({
          rowIndex: index + 2, // +2 for header row and 0-based index
          id: row[0],
          keywordText: row[1],
          matchType: row[2],
          level: row[3],
          campaignId: row[4],
          campaignName: row[5],
          adGroupId: row[6],
          adGroupName: row[7],
          sharedListId: row[8],
          sharedListName: row[9],
          addedDate: row[10]
        });
      }
    });
    
    return pendingKeywords;
    
  } catch (error) {
    Logger.log('Error getting pending keywords: ' + error.toString());
    return [];
  }
}

/**
 * Update keyword status in sheet
 */
function updateKeywordStatus(sheet, rowIndex, status, message) {
  try {
    // Ensure we have enough columns
    const lastCol = sheet.getLastColumn();
    if (lastCol < 14) {
      // Add missing columns
      const headers = ['Status', 'Message', 'Processed Date'];
      sheet.getRange(1, lastCol + 1, 1, headers.length).setValues([headers]);
    }
    
    // Update status (column 12), message (column 13), processed date (column 14)
    sheet.getRange(rowIndex, 12).setValue(status);
    sheet.getRange(rowIndex, 13).setValue(message);
    sheet.getRange(rowIndex, 14).setValue(new Date().toISOString());
    
  } catch (error) {
    Logger.log(`Error updating status for row ${rowIndex}: ${error.toString()}`);
  }
}

/**
 * Update campaign and ad group data for webapp dropdowns
 */
function updateCampaignAndAdGroupData() {
  try {
    const sheet = getOrCreateSheet(CAMPAIGN_DATA_TAB);
    
    // Clear existing data
    if (sheet.getLastRow() > 0) {
      sheet.clear();
    }
    
    // Set headers
    const headers = ['Campaign ID', 'Campaign Name', 'Ad Group ID', 'Ad Group Name'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    const data = [];
    const campaignIterator = AdsApp.campaigns()
      .withCondition('Status = ENABLED')
      .get();
    
    while (campaignIterator.hasNext()) {
      const campaign = campaignIterator.next();
      const campaignId = campaign.getId();
      const campaignName = campaign.getName();
      
      // Get ad groups for this campaign
      const adGroupIterator = campaign.adGroups()
        .withCondition('Status = ENABLED')
        .get();
      
      let hasAdGroups = false;
      while (adGroupIterator.hasNext()) {
        const adGroup = adGroupIterator.next();
        data.push([
          campaignId,
          campaignName,
          adGroup.getId(),
          adGroup.getName()
        ]);
        hasAdGroups = true;
      }
      
      // If no ad groups, still add campaign row
      if (!hasAdGroups) {
        data.push([campaignId, campaignName, '', '']);
      }
    }
    
    // Write data to sheet
    if (data.length > 0) {
      sheet.getRange(2, 1, data.length, 4).setValues(data);
    }
    
    Logger.log(`Updated campaign data: ${data.length} rows`);
    
  } catch (error) {
    Logger.log('Error updating campaign data: ' + error.toString());
  }
}

/**
 * Update shared list data for webapp dropdowns
 */
function updateSharedListData() {
  try {
    const sheet = getOrCreateSheet(SHARED_LIST_DATA_TAB);
    
    // Clear existing data
    if (sheet.getLastRow() > 0) {
      sheet.clear();
    }
    
    // Set headers
    const headers = ['Shared List ID', 'Shared List Name'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    const data = [];
    const sharedListIterator = AdsApp.negativeKeywordLists().get();
    
    while (sharedListIterator.hasNext()) {
      const sharedList = sharedListIterator.next();
      data.push([
        sharedList.getId(),
        sharedList.getName()
      ]);
    }
    
    // Write data to sheet
    if (data.length > 0) {
      sheet.getRange(2, 1, data.length, 2).setValues(data);
    }
    
    Logger.log(`Updated shared list data: ${data.length} rows`);
    
  } catch (error) {
    Logger.log('Error updating shared list data: ' + error.toString());
  }
}

/**
 * Update processing trigger status
 */
function updateProcessingTriggerStatus(successCount, failureCount) {
  try {
    const sheet = getSheet(PROCESSING_TRIGGERS_TAB);
    if (!sheet) {
      return;
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return;
    }
    
    // Find the most recent PENDING trigger and update it
    const data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
    
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i][2] === 'PENDING') { // Status column
        const rowIndex = i + 2; // +2 for header and 0-based index
        const message = `Processed: ${successCount} successful, ${failureCount} failed`;
        
        sheet.getRange(rowIndex, 3).setValue('COMPLETED'); // Status
        sheet.getRange(rowIndex, 4).setValue(message); // Message
        sheet.getRange(rowIndex, 5).setValue(new Date().toISOString()); // Processed date
        
        break; // Only update the most recent one
      }
    }
    
  } catch (error) {
    Logger.log('Error updating processing trigger status: ' + error.toString());
  }
}

/**
 * Get sheet by name
 */
function getSheet(sheetName) {
  try {
    if (!SHEET_URL) {
      Logger.log('SHEET_URL not configured');
      return null;
    }
    
    const spreadsheet = SpreadsheetApp.openByUrl(SHEET_URL);
    return spreadsheet.getSheetByName(sheetName);
    
  } catch (error) {
    Logger.log(`Error getting sheet ${sheetName}: ${error.toString()}`);
    return null;
  }
}

/**
 * Get or create sheet by name
 */
function getOrCreateSheet(sheetName) {
  try {
    if (!SHEET_URL) {
      Logger.log('SHEET_URL not configured');
      return null;
    }
    
    const spreadsheet = SpreadsheetApp.openByUrl(SHEET_URL);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }
    
    return sheet;
    
  } catch (error) {
    Logger.log(`Error getting/creating sheet ${sheetName}: ${error.toString()}`);
    return null;
  }
}