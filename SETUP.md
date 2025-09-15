# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Create environment file:**
   Create a `.env.local` file in the root directory with:
   ```env
   NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   NEXT_PUBLIC_API_KEY=your-api-key-here
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Google Sheets Setup

### Step 1: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Copy the code from `scripts/google-sheets-apps-script.js`
4. Save the project

### Step 2: Deploy as Web App
1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set execute permissions to "Anyone"
4. Copy the web app URL and add it to your `.env.local` file

### Step 3: Configure Google Ads Script
1. Go to your Google Ads account
2. Navigate to Tools & Settings > Scripts
3. Create a new script
4. Copy the code from `scripts/google-ads-script.js`
5. Update the `SHEET_URL` variable with your Google Sheets URL
6. Run the script to populate your sheet with data

## Configuration

### Settings Page
Once the app is running, go to the Settings page to:
- Test your API connection
- Configure refresh intervals
- Set default page sizes
- Choose export formats

### Data Requirements
The system expects your Google Sheet to have two tabs:
- `SearchTermData`: Contains search term performance data
- `NegativeKeywords`: Contains negative keyword lists

## Troubleshooting

### Common Issues

1. **"API Connection Failed"**
   - Verify your Google Sheets API URL is correct
   - Check that your Apps Script is deployed as a web app
   - Ensure execute permissions are set to "Anyone"

2. **"No Data Displayed"**
   - Run the Google Ads script to populate your sheet
   - Check that the sheet has the correct tab names
   - Verify your Google Ads account has search term data

3. **"Negative Keywords Not Adding"**
   - Check that you've selected a campaign/ad group
   - Verify the keyword text is valid
   - Ensure you have the correct permissions in Google Ads

### Debug Mode
Add `?debug=true` to your URL to see additional logging information.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm type-check` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts
- `pnpm setup` - Install dependencies and run type checking
