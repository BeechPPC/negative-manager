# Negative Keywords Fixes and Setup Guide

## Issues Fixed

### 1. Data Structure Mismatch
- **Problem**: Frontend expected different data structure than what Google Apps Script provided
- **Fix**: Updated Google Apps Script to include all required fields (adGroupId, adGroupName, addedDate)
- **Files Updated**: 
  - `scripts/google-sheets-apps-script.js`
  - `scripts/google-ads-script.js`

### 2. Missing Google Ads Integration
- **Problem**: System only stored negative keywords in Google Sheets but didn't add them to Google Ads
- **Fix**: Added `addNegativeKeywordsToGoogleAds()` function that actually adds keywords to Google Ads
- **Files Updated**: `scripts/google-sheets-apps-script.js`

### 3. Missing Environment Configuration
- **Problem**: No `.env.local` file with required API URL
- **Fix**: Created environment template and setup instructions

### 4. Poor Error Handling
- **Problem**: Limited error feedback when adding negative keywords
- **Fix**: Enhanced error handling and user feedback
- **Files Updated**: 
  - `src/components/NegativeKeywordModal.tsx`
  - `src/hooks/useNegativeKeywords.ts`
  - `src/utils/api.ts`

## Setup Instructions

### Step 1: Create Environment File
Create a `.env.local` file in the root directory:

```env
# Google Sheets API Configuration
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Optional: API Key for additional security
NEXT_PUBLIC_API_KEY=your-api-key-here

# Development settings
NODE_ENV=development
```

### Step 2: Google Apps Script Setup
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Copy the updated code from `scripts/google-sheets-apps-script.js`
4. Save and deploy as a web app with "Anyone" execute permissions
5. Copy the web app URL to your `.env.local` file

### Step 3: Google Ads Script Setup
1. Go to your Google Ads account
2. Navigate to Tools & Settings > Scripts
3. Create a new script
4. Copy the updated code from `scripts/google-ads-script.js`
5. Update the `SHEET_URL` variable with your Google Sheets URL
6. Run the script to populate your sheet with data

### Step 4: Test the Integration
1. Start the development server: `pnpm dev`
2. Navigate to the negative keywords page
3. Try adding a negative keyword
4. Check both the Google Ads account and the Google Sheet to verify the keyword was added

## New Features Added

### 1. Real Google Ads Integration
- Negative keywords are now actually added to Google Ads campaigns, ad groups, or shared lists
- Proper error handling for Google Ads API failures
- Detailed feedback about which keywords were successfully added

### 2. Enhanced Data Structure
- Added support for ad group level negative keywords
- Added timestamp tracking for when keywords were added
- Better data validation and error reporting

### 3. Improved User Experience
- Better error messages that distinguish between sheet errors and Google Ads errors
- More detailed feedback about the addition process
- Proper loading states and error handling

## Troubleshooting

### Common Issues

1. **"Google Sheets API URL not configured"**
   - Make sure you have created `.env.local` with the correct URL
   - Verify the Google Apps Script is deployed as a web app

2. **"Negative keywords not appearing in Google Ads"**
   - Check that the Google Apps Script has access to your Google Ads account
   - Verify the campaign/ad group IDs are correct
   - Check the Google Ads script logs for errors

3. **"Page not loading"**
   - Ensure the Google Apps Script is properly deployed
   - Check browser console for API errors
   - Verify the sheet has the correct tab names

### Debug Mode
Add `?debug=true` to your URL to see additional logging information in the browser console.

## Testing Checklist

- [ ] Environment file created with correct API URL
- [ ] Google Apps Script deployed and accessible
- [ ] Google Ads script running and populating data
- [ ] Negative keywords page loads without errors
- [ ] Can add negative keywords to campaigns
- [ ] Can add negative keywords to ad groups
- [ ] Can add negative keywords to shared lists
- [ ] Keywords appear in Google Ads account
- [ ] Keywords are tracked in Google Sheet
- [ ] Error handling works properly
- [ ] Can remove negative keywords
- [ ] Data refreshes after operations

## Next Steps

1. Test the complete workflow
2. Verify all negative keyword operations work correctly
3. Check that the data is properly synchronized between Google Ads and Google Sheets
4. Monitor for any remaining issues and report them
