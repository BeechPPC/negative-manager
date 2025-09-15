# Negative Keyword Manager

A comprehensive negative keyword management system for Google Ads that helps you identify and manage negative keywords to improve campaign performance and reduce wasted spend.

## Features

### 🎯 Core Functionality
- **Search Term Analysis**: View and analyze search term performance data
- **Negative Keyword Management**: Add, remove, and manage negative keywords at campaign, ad group, and shared list levels
- **Opportunity Identification**: Automatically identify high-cost, low-converting search terms
- **Bulk Operations**: Select and manage multiple keywords at once
- **Real-time Data**: Connect to Google Sheets for live data updates

### 📊 Analytics & Reporting
- **Dashboard Overview**: Key metrics and performance indicators
- **Cost Analysis**: Track wasted spend and potential savings
- **Performance Metrics**: CTR, CPC, CPA, and conversion tracking
- **Export Capabilities**: Export data in CSV and Excel formats

### 🔧 Advanced Features
- **Smart Filtering**: Filter by campaign, ad group, cost, conversions, and more
- **Sorting & Pagination**: Efficiently navigate large datasets
- **Match Type Management**: Support for Exact, Phrase, and Broad match types
- **Multi-level Organization**: Campaign, ad group, and shared list management
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with ShadCN/UI components
- **State Management**: React hooks and context
- **Data Source**: Google Sheets via Apps Script API
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd negative-manager
pnpm install
```

### 2. Google Sheets Setup

#### Step 1: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Copy the code from `scripts/google-sheets-apps-script.js`
4. Save the project

#### Step 2: Deploy as Web App
1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set execute permissions to "Anyone"
4. Copy the web app URL

#### Step 3: Configure Google Ads Script
1. Go to your Google Ads account
2. Navigate to Tools & Settings > Scripts
3. Create a new script
4. Copy the code from `scripts/google-ads-script.js`
5. Update the `SHEET_URL` variable with your Google Sheets URL
6. Run the script to populate your sheet with data

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_API_KEY=your-api-key-if-needed
```

### 4. Run the Application

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### Getting Started
1. **Configure API**: Go to Settings and enter your Google Sheets API URL
2. **Test Connection**: Use the "Test Connection" button to verify your setup
3. **View Data**: Navigate to the Dashboard to see your search term data

### Managing Negative Keywords
1. **Identify Opportunities**: Use the "Opportunities" tab to find high-cost, low-converting search terms
2. **Add Negative Keywords**: Select search terms and click "Add Negative Keywords"
3. **Choose Level**: Select whether to add at campaign, ad group, or shared list level
4. **Set Match Type**: Choose Exact, Phrase, or Broad match
5. **Review & Confirm**: Review your selections before adding

### Analyzing Performance
1. **Dashboard**: View key metrics and performance indicators
2. **Search Terms Table**: Sort and filter your search term data
3. **Export Data**: Download your data for further analysis
4. **Track Progress**: Monitor the impact of your negative keyword additions

## File Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard page
│   ├── search-terms/      # Search terms page
│   ├── negative-keywords/ # Negative keywords page
│   ├── settings/          # Settings page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # ShadCN/UI components
│   ├── Layout.tsx        # Main layout component
│   ├── DashboardCards.tsx # Dashboard metrics
│   ├── SearchTermTable.tsx # Search terms table
│   └── NegativeKeywordModal.tsx # Negative keyword modal
├── hooks/                # Custom React hooks
│   ├── useSearchTerms.ts # Search terms data management
│   └── useNegativeKeywords.ts # Negative keywords management
├── utils/                # Utility functions
│   ├── api.ts           # API client functions
│   ├── calculations.ts  # Data calculations
│   └── constants.ts     # Application constants
├── types/               # TypeScript type definitions
│   └── index.ts         # Main type definitions
└── scripts/             # Google Apps Script files
    ├── google-ads-script.js      # Google Ads data collection
    └── google-sheets-apps-script.js # Google Sheets API
```

## API Endpoints

The Google Sheets Apps Script provides the following endpoints:

### Search Terms
- `GET /?action=search-terms` - Get search term data
- `GET /?action=search-terms&page=1&pageSize=50` - Get paginated data
- `GET /?action=search-terms&filters={...}` - Get filtered data

### Negative Keywords
- `GET /?action=negative-keywords` - Get all negative keywords
- `POST /?action=add-negative-keywords` - Add negative keywords
- `POST /?action=remove-negative-keyword&id=...` - Remove negative keyword

### Dashboard
- `GET /?action=dashboard` - Get dashboard metrics

## Configuration Options

### Settings
- **Google Sheets URL**: Your Apps Script web app URL
- **API Key**: Optional authentication key
- **Refresh Interval**: Auto-refresh frequency (1-60 minutes)
- **Page Size**: Default number of rows per page
- **Export Format**: CSV or Excel export format

### Filtering Options
- **Campaign**: Filter by campaign name
- **Ad Group**: Filter by ad group name
- **Cost Range**: Filter by cost thresholds
- **Conversions**: Filter by conversion status
- **Search Term**: Text search in search terms

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Verify your Google Sheets API URL is correct
   - Check that your Apps Script is deployed as a web app
   - Ensure execute permissions are set to "Anyone"

2. **No Data Displayed**
   - Run the Google Ads script to populate your sheet
   - Check that the sheet has the correct tab names
   - Verify your Google Ads account has search term data

3. **Negative Keywords Not Adding**
   - Check that you've selected a campaign/ad group
   - Verify the keyword text is valid
   - Ensure you have the correct permissions in Google Ads

### Debug Mode
Enable debug mode by adding `?debug=true` to your URL to see additional logging information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the Google Ads and Google Sheets documentation

## Changelog

### Version 1.0.0
- Initial release
- Search term analysis and management
- Negative keyword management
- Dashboard with key metrics
- Export functionality
- Responsive design