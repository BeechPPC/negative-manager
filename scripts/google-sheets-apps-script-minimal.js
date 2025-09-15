/**
 * Minimal Google Apps Script for testing
 * This is a simplified version to test if the basic setup works
 */

// Configuration
const SHEET_NAME = 'SearchTermData';
const NEGATIVE_KEYWORDS_SHEET_NAME = 'NegativeKeywords';

/**
 * Handle GET requests
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'test';
    
    switch (action) {
      case 'test':
        return createResponse({
          message: 'Google Apps Script is working!',
          timestamp: new Date().toISOString(),
          action: action
        });
      case 'negative-keywords':
        return handleGetNegativeKeywords(e);
      case 'search-terms':
        return handleGetSearchTerms(e);
      default:
        return createErrorResponse('Invalid action: ' + action, 400);
    }
    
  } catch (error) {
    console.error('Error in doGet:', error);
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
 * Handle POST requests
 */
function doPost(e) {
  try {
    const action = e.parameter.action || '';
    
    switch (action) {
      case 'add-negative-keywords':
        return handleAddNegativeKeywords(e);
      default:
        return createErrorResponse('Invalid action: ' + action, 400);
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createErrorResponse('Internal server error: ' + error.message, 500);
  }
}

/**
 * Get negative keyword data
 */
function handleGetNegativeKeywords(e) {
  try {
    // For now, return empty data to test the connection
    return createResponse({
      data: {
        campaign: [],
        adGroup: [],
        shared: []
      }
    });
    
  } catch (error) {
    console.error('Error getting negative keywords:', error);
    return createErrorResponse('Failed to get negative keywords: ' + error.message, 500);
  }
}

/**
 * Get search term data
 */
function handleGetSearchTerms(e) {
  try {
    // For now, return empty data to test the connection
    return createResponse({
      data: [],
      total: 0,
      page: 1,
      pageSize: 50,
      totalPages: 0,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error getting search terms:', error);
    return createErrorResponse('Failed to get search terms: ' + error.message, 500);
  }
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
    
    // For now, just return success without actually adding to sheet
    return createResponse({
      success: true,
      added: keywords.length,
      failed: 0,
      errors: [],
      message: 'Keywords would be added to sheet (test mode)'
    });
    
  } catch (error) {
    console.error('Error adding negative keywords:', error);
    return createErrorResponse('Failed to add negative keywords: ' + error.message, 500);
  }
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
  
  const output = ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
  
  return output;
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
  
  const output = ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
  
  return output;
}

/**
 * Test function
 */
function testMinimalAPI() {
  try {
    console.log('Testing minimal API...');
    
    const testResult = doGet({
      parameter: { action: 'test' }
    });
    console.log('Test result:', testResult.getContent());
    
    const negativeKeywordsResult = doGet({
      parameter: { action: 'negative-keywords' }
    });
    console.log('Negative keywords result:', negativeKeywordsResult.getContent());
    
    console.log('Minimal API test completed successfully!');
    
  } catch (error) {
    console.error('Minimal API test failed:', error);
  }
}
