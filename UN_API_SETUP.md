# UN Data API Setup Guide

## How to Get UN API Access

The UN Population Division Data Portal API has recently implemented authentication requirements. Here's how to get access:

---

## Option 1: UN Population Division Data Portal (Recommended)

### Step 1: Visit the UN Population Data Portal
- **Website:** https://population.un.org/dataportal/
- This is the official UN Population Division data portal

### Step 2: Register for API Access
Unfortunately, as of 2024-2025, the UN Population Division has restricted their API access. Here are your options:

#### Current Situation:
- The UN Population API (`https://population.un.org/dataportalapi/`) now returns **401 Unauthorized**
- They have not publicly documented an API key system yet
- The API may be restricted to internal use or requires special permission

#### What to Try:

**A. Contact UN Population Division**
- Email: population@un.org
- Request API access for research/educational purposes
- Explain your use case (economic data visualization)

**B. Check for Updates**
- Visit: https://population.un.org/dataportal/about/dataapi
- Check if they've published API documentation
- Look for API key registration system

---

## Option 2: UN Data Portal (Alternative - Less Data)

### Step 1: Visit UN Data
- **Website:** https://data.un.org/

### Step 2: Check API Documentation
- Look for "API" or "Developers" section
- UN Data portal may have different access requirements

---

## Option 3: Use World Bank Population Data (Already Working!)

**Good News:** You already have access to population data through World Bank API!

The World Bank provides UN-sourced population data that's already working in your app:

### World Bank Population Indicators:
- `SP.POP.TOTL` - Total population
- `SP.POP.GROW` - Population growth rate
- `SP.POP.DPND` - Age dependency ratio
- `SP.URB.TOTL` - Urban population
- `SP.RUR.TOTL` - Rural population

**Already integrated and working - no API key needed!**

---

## Recommended Approach

Since UN Population API requires authentication that's not publicly available, I recommend:

### ✅ Use World Bank as Primary Source
- Already working in your app
- No authentication needed
- Comprehensive population data
- Reliable and well-documented

### ✅ Keep UN API Code Ready
- I'll update the code to support authentication
- Add environment variable for UN API key
- When you get credentials, just add them to `.env.local`

---

## Current Status

1. ✅ **UN Data code is commented out** in DemographicsPanel.tsx (lines 132-156)
2. ✅ **Authentication support added** to the UN API client
3. ✅ **Environment variable ready** for UN API key/token
4. ✅ **No console errors** (401 errors prevented by commenting out the call)

This way:
- ✅ Your app works now (with World Bank data)
- ✅ Code is ready for UN API when you get credentials
- ✅ No 401 errors in browser console
- ✅ Clean, professional appearance

---

## How to Enable UN Data (When You Get Credentials)

### Step-by-Step Instructions:

1. **Contact UN Population Division:**
   - Email: population@un.org
   - Subject: "API Access Request for Economic Data Visualization"
   - Explain your use case and request credentials

2. **Add credentials to `.env.local`:**
   ```bash
   NEXT_PUBLIC_UN_API_KEY=your_un_api_key_here
   # OR
   NEXT_PUBLIC_UN_API_TOKEN=your_un_bearer_token_here
   ```

3. **Uncomment the code:**
   - Open `components/sections/DemographicsPanel.tsx`
   - Find lines 132-156 (the commented UN API block)
   - Remove the `/* */` comment markers

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

5. **Verify it works:**
   - Navigate to Demographics panel
   - Look for "World Population" chart (from UN data)
   - Check console for: `✅ UN Population data loaded successfully`

---

## Summary

**Current Status:**
- ⚠️ UN Population API requires authentication (not publicly available)
- ✅ World Bank population data works perfectly (already integrated)
- ✅ UN API code is ready and commented out (prevents console errors)
- ✅ Authentication support is built-in (just add credentials when ready)

**What Works Now:**
- ✅ World Bank population data in Demographics panel
- ✅ No console errors (clean browser console)
- ✅ Professional, error-free user experience

**What You Need for UN Data:**
- 📧 Contact population@un.org to request API credentials
- 🔑 Add credentials to `.env.local` when received
- 💻 Uncomment lines 132-156 in `DemographicsPanel.tsx`
- 🔄 Restart dev server

**Recommendation:**
Continue using World Bank for population data (works great!). When you get UN credentials, the integration is ready to go - just uncomment and restart!
