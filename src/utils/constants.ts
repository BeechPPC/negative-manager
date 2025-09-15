// Application constants and configuration

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL || '',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 50,
  PAGE_SIZE_OPTIONS: [25, 50, 100, 200],
  MAX_PAGE_SIZE: 1000,
  SORT_DIRECTIONS: ['asc', 'desc'] as const,
  DEFAULT_SORT_FIELD: 'cost' as const,
  DEFAULT_SORT_DIRECTION: 'desc' as const,
} as const;

// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
  CHART_COLORS: [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
    '#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#0000ff'
  ],
  METRIC_THRESHOLDS: {
    HIGH_COST: 50,
    LOW_CTR: 2,
    HIGH_CPA: 100,
    WASTED_SPEND_THRESHOLD: 5,
  },
} as const;

// Negative Keyword Configuration
export const NEGATIVE_KEYWORD_CONFIG = {
  MATCH_TYPES: ['EXACT', 'PHRASE', 'BROAD'] as const,
  LEVELS: ['CAMPAIGN', 'AD_GROUP', 'SHARED_LIST'] as const,
  MAX_KEYWORDS_PER_REQUEST: 100,
  VALIDATION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 80,
    ALLOWED_CHARACTERS: /^[a-zA-Z0-9\s\-_.,!?]+$/,
  },
} as const;

// Filter Configuration
export const FILTER_CONFIG = {
  COST_RANGES: [
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $50', min: 10, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity },
  ],
  CLICK_RANGES: [
    { label: 'No clicks', min: 0, max: 0 },
    { label: '1-10 clicks', min: 1, max: 10 },
    { label: '11-50 clicks', min: 11, max: 50 },
    { label: '51-100 clicks', min: 51, max: 100 },
    { label: 'Over 100 clicks', min: 101, max: Infinity },
  ],
  CONVERSION_RANGES: [
    { label: 'No conversions', min: 0, max: 0 },
    { label: '1-5 conversions', min: 1, max: 5 },
    { label: '6-20 conversions', min: 6, max: 20 },
    { label: 'Over 20 conversions', min: 21, max: Infinity },
  ],
} as const;

// Export Configuration
export const EXPORT_CONFIG = {
  FORMATS: ['csv', 'xlsx'] as const,
  DEFAULT_FORMAT: 'csv' as const,
  MAX_ROWS_PER_EXPORT: 10000,
  INCLUDE_METRICS: true,
  DATE_FORMAT: 'YYYY-MM-DD',
} as const;

// UI Configuration
export const UI_CONFIG = {
  THEME: {
    PRIMARY: 'blue',
    SECONDARY: 'gray',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red',
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  ANIMATION: {
    DURATION: 200,
    EASING: 'ease-in-out',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  API_ERROR: 'API error. Please try again later.',
  AUTH_ERROR: 'Authentication error. Please check your API credentials.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  NO_DATA: 'No data available.',
  LOADING_ERROR: 'Failed to load data. Please refresh the page.',
  SAVE_ERROR: 'Failed to save changes. Please try again.',
  DELETE_ERROR: 'Failed to delete item. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully.',
  DATA_SAVED: 'Data saved successfully.',
  DATA_DELETED: 'Data deleted successfully.',
  NEGATIVE_KEYWORDS_ADDED: 'Negative keywords added successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
  EXPORT_COMPLETED: 'Export completed successfully.',
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING_DATA: 'Loading data...',
  SAVING_DATA: 'Saving data...',
  DELETING_DATA: 'Deleting data...',
  EXPORTING_DATA: 'Exporting data...',
  PROCESSING: 'Processing...',
} as const;

// Google Ads Script Configuration
export const GOOGLE_ADS_SCRIPT_CONFIG = {
  QUERIES: {
    SEARCH_TERMS: `
      SELECT 
        search_term_view.search_term,
        campaign.name,
        ad_group.name,
        ad_group_criterion.keyword.text,
        metrics.impressions,
        metrics.clicks, 
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value
      FROM search_term_view
      WHERE segments.date DURING LAST_30_DAYS
        AND campaign.advertising_channel_type = "SEARCH"
      ORDER BY metrics.cost_micros DESC
    `,
    NEGATIVE_KEYWORDS: `
      SELECT
        campaign.id,
        campaign.name,
        campaign_criterion.keyword.text,
        campaign_criterion.keyword.match_type
      FROM campaign_criterion
      WHERE campaign_criterion.negative = TRUE
        AND campaign_criterion.type = KEYWORD
      ORDER BY campaign.name ASC
    `,
  },
  SHEET_CONFIG: {
    TAB_NAME: 'SearchTermData',
    HEADERS: [
      'ID',
      'Search Term',
      'Campaign Name',
      'Ad Group Name',
      'Keyword Text',
      'Cost',
      'Clicks',
      'Impressions',
      'Conversions',
      'Cost Per Conversion',
      'CTR',
      'CPC',
      'Associated Negative Keyword Lists',
      'Date',
    ],
  },
} as const;

// Google Sheets Apps Script Configuration
export const SHEETS_SCRIPT_CONFIG = {
  ENDPOINTS: {
    SEARCH_TERMS: '/search-terms',
    NEGATIVE_KEYWORDS: '/negative-keywords',
    DASHBOARD: '/dashboard',
  },
  CORS_HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
} as const;

// Application Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/',
  SEARCH_TERMS: '/search-terms',
  NEGATIVE_KEYWORDS: '/negative-keywords',
  SETTINGS: '/settings',
  EXPORT: '/export',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  SETTINGS: 'negative-manager-settings',
  FILTERS: 'negative-manager-filters',
  TABLE_STATE: 'negative-manager-table-state',
  CACHE: 'negative-manager-cache',
} as const;

// Environment Variables
export const ENV_VARS = {
  GOOGLE_SHEETS_API_URL: 'NEXT_PUBLIC_GOOGLE_SHEETS_API_URL',
  API_KEY: 'NEXT_PUBLIC_API_KEY',
  NODE_ENV: 'NODE_ENV',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  URL: /^https?:\/\/.+/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  API_KEY: /^[a-zA-Z0-9\-_]+$/,
  SHEET_ID: /^[a-zA-Z0-9\-_]+$/,
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300, // milliseconds
  VIRTUAL_SCROLL_THRESHOLD: 1000, // rows
  LAZY_LOAD_THRESHOLD: 100, // rows
  CACHE_SIZE_LIMIT: 100, // items
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_EXPORT: true,
  ENABLE_BULK_ACTIONS: true,
  ENABLE_ADVANCED_FILTERS: true,
  ENABLE_CHARTS: true,
  ENABLE_REAL_TIME_UPDATES: false,
  ENABLE_OFFLINE_MODE: false,
} as const;
