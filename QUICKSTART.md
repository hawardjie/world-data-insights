# Quick Start Guide

Get your World Data Insights dashboard up and running in 5 minutes!

## Step 1: Get Your FRED API Key

1. Go to [https://fred.stlouisfed.org/docs/api/api_key.html](https://fred.stlouisfed.org/docs/api/api_key.html)
2. Sign in with your email (or create a free account)
3. Click "Request API Key"
4. Copy your API key (it looks like: `abcd1234efgh5678ijkl9012mnop3456`)

## Step 2: Configure Your Environment

1. Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and paste your API key:

```
NEXT_PUBLIC_FRED_API_KEY=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with the API key you copied in Step 1.

## Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages (Next.js, React, Recharts, Tailwind CSS, etc.)

## Step 4: Start the Development Server

```bash
npm run dev
```

## Step 5: Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your web browser.

You should see the World Data Insights dashboard!

## What You Can Do

### Explore Pre-built Dashboards
- **Money & Finance**: Interest rates, Fed Funds Rate, Treasury yields
- **GDP & National Accounts**: US GDP, global GDP comparison, inflation
- **Labor Markets**: Unemployment, non-farm payrolls, participation rates
- **Prices & Inflation**: CPI, PPI, global inflation comparison
- **Exchange Rates**: Dollar index, major currency pairs
- **International Trade**: Imports, exports, trade balance

### Search Any Economic Data
1. Click on "Search Series" in the navigation
2. Type keywords like:
   - "GDP" - Find GDP data for any country
   - "unemployment" - Employment statistics
   - "inflation" - CPI and price data
   - "bitcoin" - Cryptocurrency data
   - "housing" - Real estate metrics
   - "oil price" - Energy commodities
3. Click on any result to visualize it
4. Export data as CSV or JSON

## Troubleshooting

### "Failed to load data" error?
- Check that your API key is correctly set in `.env.local`
- Make sure you copied the entire API key without extra spaces
- Restart the development server after changing `.env.local`

### Build failed?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Port 3000 already in use?
```bash
# Use a different port
npm run dev -- -p 3001
```

Then open [http://localhost:3001](http://localhost:3001)

## Production Build

To build for production:

```bash
npm run build
npm start
```

The production build is optimized and faster than the development server.

## Need Help?

- **FRED API Documentation**: [https://fred.stlouisfed.org/docs/api/](https://fred.stlouisfed.org/docs/api/)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Report Issues**: Open an issue on GitHub

---

Happy exploring! You now have access to 800,000+ economic time series at your fingertips.
