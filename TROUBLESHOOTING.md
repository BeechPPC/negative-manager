# Troubleshooting Guide

## Issue: Negative Keywords Page Not Loading

### Problem Identified
The negative keywords page is not loading because the Google Apps Script is returning a redirect response instead of the expected JSON data.

### Root Cause
The Google Apps Script was trying to access Google Ads API functions (`AdsApp`) which are not available in the web app context. This caused the script to fail and return a redirect response.

### Solution Applied

1. **Removed Google Ads API calls from Google Apps Script**
   - The Google Apps Script now only handles Google Sheets operations
   - Google Ads integration is handled by the separate Google Ads script

2. **Simplified the negative keyword addition process**
   - Keywords are added to Google Sheets for tracking
   - A note is provided that Google Ads integration requires running the separate script

### Steps to Fix

1. **Update your Google Apps Script** with the new code from `scripts/google-sheets-apps-script.js`

2. **Redeploy the Google Apps Script**
   - Go to your Google Apps Script project
   - Click "Deploy" > "Manage deployments"
   - Click the edit icon (pencil) next to your existing deployment
   - Click "Deploy" to update

3. **Test the API connection**
   ```bash
   curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=negative-keywords"
   ```
   You should now get JSON data instead of an HTML redirect.

4. **Run the Google Ads script separately** to add keywords to Google Ads
   - The Google Ads script (`scripts/google-ads-script.js`) handles the actual Google Ads integration
   - Run this script in your Google Ads account to sync keywords from the sheet to Google Ads

### Testing the Fix

1. **Test the API directly:**
   ```bash
   curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=negative-keywords"
   ```

2. **Test the frontend:**
   - Start the development server: `pnpm dev`
   - Navigate to the negative keywords page
   - The page should now load without errors

3. **Test adding negative keywords:**
   - Try adding a negative keyword through the UI
   - Check that it appears in the Google Sheet
   - Run the Google Ads script to add it to Google Ads

### Alternative Approach: Direct Google Ads Integration

If you want the web app to directly add keywords to Google Ads, you would need to:

1. **Use the Google Ads API directly** instead of Google Apps Script
2. **Set up OAuth2 authentication** for Google Ads API
3. **Handle API rate limits and quotas**

However, the current approach (separate scripts) is more reliable and easier to maintain.

### Monitoring and Debugging

1. **Check Google Apps Script logs:**
   - Go to your Google Apps Script project
   - Click "Executions" to see logs and errors

2. **Check browser console:**
   - Open browser developer tools
   - Look for API errors in the console

3. **Test individual endpoints:**
   ```bash
   # Test search terms
   curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=search-terms"
   
   # Test negative keywords
   curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=negative-keywords"
   
   # Test dashboard
   curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=dashboard"
   ```

### Common Issues and Solutions

1. **"Moved Temporarily" error:**
   - The Google Apps Script is not properly deployed
   - Redeploy the script as a web app

2. **"Google Sheets API URL not configured":**
   - Check that `.env.local` exists and has the correct URL
   - Restart the development server after updating environment variables

3. **Empty data returned:**
   - Check that the Google Sheet has the correct tab names
   - Run the Google Ads script to populate data

4. **Keywords not appearing in Google Ads:**
   - Run the Google Ads script separately
   - Check that the script has proper permissions

### Next Steps

1. Update and redeploy your Google Apps Script
2. Test the API endpoints
3. Verify the negative keywords page loads
4. Test the complete workflow
5. Set up automated runs of the Google Ads script if needed
