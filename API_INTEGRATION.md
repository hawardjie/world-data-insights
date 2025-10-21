# API Integration Guide

This document provides information about the data sources integrated into the World Data Insights platform.

## Data Sources Overview

| Data Source | API Key Required | Rate Limits | Status |
|-------------|------------------|-------------|--------|
| FRED (Federal Reserve) | ✅ Yes | 120 requests/min | ✅ Integrated |
| World Bank | ❌ No | ~120 requests/min | ✅ Integrated |
| Google Data Commons | ⚠️ Optional | Basic: low, With key: high | ✅ Integrated |
| U.S. Census Bureau | ✅ Yes (optional) | 500 requests/day | ✅ Integrated |
| UN Data | ❌ No | Moderate | ✅ Integrated |

## Setup Instructions

### 1. FRED API (Required)

**Status:** ✅ Required for Money & Finance, GDP, Labor, Prices, Exchange Rates, and Trade panels

**How to get API key:**
1. Visit https://fred.stlouisfed.org/docs/api/api_key.html
2. Request an API key (free)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_FRED_API_KEY=your_fred_api_key_here
   ```

**Data available:**
- 800,000+ economic time series
- U.S. and international data
- Federal Reserve economic indicators
- Interest rates, GDP, employment, inflation, etc.

### 2. U.S. Census Bureau API (Optional but Recommended)

**Status:** ⚠️ Optional - works without key but has lower rate limits

**How to get API key:**
1. Visit https://api.census.gov/data/key_signup.html
2. Fill out the form (free, instant approval)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CENSUS_API_KEY=your_census_api_key_here
   ```

**Benefits with API key:**
- 500 requests per day (vs limited without key)
- Better reliability
- Access to all datasets

**Data available:**
- American Community Survey (ACS)
- Population estimates
- Economic indicators
- International trade data
- Demographic statistics

### 3. Google Data Commons (No Key Needed)

**Status:** ✅ Works immediately, no setup required

**Optional API key for higher limits:**
1. Create a Google Cloud project
2. Enable Data Commons API
3. Generate API key
4. Add to `.env.local` (optional):
   ```
   NEXT_PUBLIC_DATA_COMMONS_API_KEY=your_key_here
   ```

**Data available:**
- Aggregated data from multiple sources
- Combines Census, World Bank, WHO, CDC data
- Population, health, economy, education
- Environment and climate data

### 4. World Bank API (No Key Needed)

**Status:** ✅ Already working, no setup required

**Data available:**
- 16,000+ development indicators
- Global economic data
- Country statistics
- Historical time series

### 5. UN Data APIs (No Key Needed)

**Status:** ✅ Works immediately, no setup required

**Data available:**
- UN Population Division data
- UN Comtrade (international trade)
- SDG (Sustainable Development Goals) indicators
- Global development statistics

## Quick Start

1. **Minimum setup** (just FRED):
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your FRED API key
   ```

2. **Recommended setup** (FRED + Census):
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add both FRED and Census API keys
   ```

3. **Full setup** (all services):
   - Get FRED API key (required)
   - Get Census API key (recommended)
   - Optionally get Google Cloud API key for Data Commons

## Usage Examples

### Google Data Commons

```typescript
import { getDataCommonsApi } from '@/lib/dataCommonsApi';

const api = getDataCommonsApi();

// Get unemployment rate for USA
const data = await api.getObservations(
  'UnemploymentRate_Person',
  'country/USA',
  { startDate: '2020', endDate: '2024' }
);

// Get multiple variables
const multiData = await api.getMultipleVariables(
  ['Count_Person', 'UnemploymentRate_Person'],
  'country/USA'
);
```

### U.S. Census Bureau

```typescript
import { getCensusApi } from '@/lib/censusApi';

const api = getCensusApi();

// Get population by state
const population = await api.getPopulationEstimates(2021, 'state:*');

// Get ACS data (income, housing, etc.)
const income = await api.getACSData(
  2021,
  'acs5',
  ['B19013_001E'], // Median household income
  'state:*'
);
```

### UN Data

```typescript
import { getUNDataApi } from '@/lib/unDataApi';

const api = getUNDataApi();

// Get world population data
const population = await api.getPopulationData(
  ['900'], // World
  ['49'], // Total population
  { startYear: 2000, endYear: 2024 }
);

// Get trade data
const trade = await api.getComtradeData('USA', 'all', 2023);
```

## Rate Limits

- **FRED**: 120 requests per minute
- **World Bank**: ~120 requests per minute (unofficial limit)
- **Census** (with key): 500 requests per day
- **Census** (without key): Very limited, not recommended
- **Google Data Commons** (no key): Basic usage limits
- **Google Data Commons** (with key): Higher limits
- **UN Data**: Fair use policy, moderate limits

## Troubleshooting

### FRED API Errors
- Check that your API key is correct in `.env.local`
- Verify you haven't exceeded rate limits (120/min)
- Check FRED API status: https://fred.stlouisfed.org/docs/api/

### Census API Errors
- If no API key: Very limited access, get a free key
- If 429 errors: You've hit the daily limit (500 requests)
- Some datasets require specific geographic levels

### Data Commons Errors
- Usually works without issues
- Check internet connection
- Verify variable and place IDs are correct

### UN Data Errors
- UN APIs can be slow or temporarily unavailable
- Implement fallback/retry logic
- Check specific API endpoint status

## Support

For issues with:
- **This platform**: Check GitHub issues
- **FRED API**: https://fred.stlouisfed.org/docs/api/
- **Census API**: https://www.census.gov/data/developers/guidance.html
- **Data Commons**: https://docs.datacommons.org/
- **UN Data**: https://data.un.org/
