# World Data Insights

A comprehensive web application for visualizing global economic data from FRED (Federal Reserve Economic Data), World Bank, United Nations, International Monetary Fund, Central Banks & National Agencies, OECD & Eurostat, featuring 800,000+ economic time series from over 100 regional, national, and international sources.

## Features

### Data Categories

- **Money, Banking & Finance**: Interest rates, monetary aggregates, and financial market indicators (SOFR, AMERIBOR, SONIA, central bank rates)
- **GDP & National Accounts**: Global GDP, inflation, trade balances, and current accounts from World Bank, Eurostat, IMF, and OECD
- **Labor Markets**: Employment, unemployment, labor force participation, and wage trends
- **Prices & Inflation**: Consumer Price Indexes (CPI) and Producer Price Indexes (PPI) for dozens of countries
- **Exchange Rates**: Historical and current exchange rates among major currencies (USD, EUR, JPY, GBP, CNY, etc.)
- **International Trade**: Import/export values, balance of payments, and foreign direct investment flows

### Visualization Types

- **Line Charts**: Time series trends with interactive tooltips
- **Area Charts**: Filled area visualizations for cumulative data
- **Bar Charts**: Year-over-year comparisons and discrete values
- **Multi-Series Charts**: Compare multiple economic indicators on the same chart

### Advanced Features

- **Search Functionality**: Search and explore 800,000+ economic series
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile
- **Dark Mode Support**: Automatic dark/light theme support
- **Error Handling**: Comprehensive error handling with retry capabilities
- **Loading States**: Skeleton loading states for better UX

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Source**: FRED API
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A FRED API key (free to obtain)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/world-data-insights.git
cd world-data-insights
```

2. **Install dependencies**

```bash
npm install
```

3. **Get your FRED API Key**

   - Visit [https://fred.stlouisfed.org/docs/api/api_key.html](https://fred.stlouisfed.org/docs/api/api_key.html)
   - Sign in or create a free account
   - Request an API key
   - Copy your API key

4. **Configure environment variables**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your FRED API key:

```
NEXT_PUBLIC_FRED_API_KEY=your_fred_api_key_here
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
world-data-insights/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── charts/              # Reusable chart components
│   │   ├── TimeSeriesLineChart.tsx
│   │   ├── MultiSeriesLineChart.tsx
│   │   ├── AreaChart.tsx
│   │   └── BarChart.tsx
│   ├── sections/            # Dashboard panels
│   │   ├── OverviewPanel.tsx
│   │   ├── MoneyFinancePanel.tsx
│   │   ├── GDPPanel.tsx
│   │   ├── LaborPanel.tsx
│   │   ├── PricesPanel.tsx
│   │   ├── ExchangeRatesPanel.tsx
│   │   ├── TradePanel.tsx
│   │   └── SearchPanel.tsx
│   ├── ui/                  # UI components
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   └── Navigation.tsx       # Main navigation
├── lib/
│   └── fredApi.ts          # FRED API service
├── types/
│   └── fred.ts             # TypeScript type definitions
├── utils/
│   └── dataTransform.ts    # Data transformation utilities
├── .env.local.example      # Environment variables template
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Usage

### Navigating the Dashboard

The application is organized into several main sections accessible via the navigation bar:

1. **Overview**: Introduction to all available data categories
2. **Money & Finance**: View interest rates, money supply, and financial indicators
3. **GDP & National Accounts**: Explore GDP, economic growth, and inflation data
4. **Labor Markets**: Analyze employment, unemployment, and participation rates
5. **Prices & Inflation**: Track CPI, PPI, and inflation trends
6. **Exchange Rates**: Monitor currency exchange rates and dollar index
7. **International Trade**: View trade balances, imports, and exports
8. **Search Series**: Search and visualize any of the 800,000+ available series

### Searching for Data

1. Click on the "Search Series" tab
2. Enter keywords (e.g., "GDP", "unemployment", "inflation", "bitcoin")
3. Click Search or press Enter
4. Browse results and click on any series to visualize it
5. Use the export buttons to download data in CSV or JSON format

### Exporting Data

When viewing a chart in the Search panel:
- Click the **CSV** button to download data as a CSV file
- Click the **JSON** button to download data as a JSON file

## Key FRED Series Used

The application includes pre-configured visualizations for these popular economic indicators:

### Finance & Money
- `DFF` - Federal Funds Effective Rate
- `DGS10` - 10-Year Treasury Constant Maturity Rate
- `DGS2` - 2-Year Treasury Constant Maturity Rate
- `M2SL` - M2 Money Supply

### GDP & Economy
- `GDP` - Gross Domestic Product
- `GDPC1` - Real Gross Domestic Product
- `CPIAUCSL` - Consumer Price Index for All Urban Consumers

### Labor Markets
- `UNRATE` - Unemployment Rate
- `PAYEMS` - All Employees, Total Nonfarm
- `CIVPART` - Labor Force Participation Rate

### Trade & Exchange
- `DTWEXBGS` - Trade Weighted U.S. Dollar Index
- `DEXUSEU` - U.S. / Euro Foreign Exchange Rate
- `DEXJPUS` - Japan / U.S. Foreign Exchange Rate
- `BOPGEXP` - U.S. Exports of Goods
- `BOPGIMP` - U.S. Imports of Goods

## Data Sources

- **World Bank**
- **International Monetary Fund (IMF)**
- **OECD**
- **Eurostat**
- **Penn World Table**
- **Bank of Japan**
- **European Central Bank**
- **U.S. Bureau of Labor Statistics**
- **U.S. Census Bureau**
- **National Statistical Agencies worldwide**

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## API Rate Limits

FRED API has rate limits:
- **120 requests per minute**
- **Requests are cached for 15 minutes**

The application is designed to handle these limits gracefully with error handling and retry capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [FRED - Federal Reserve Economic Data](https://fred.stlouisfed.org/)
- Built with [Next.js](https://nextjs.org/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)

## Support

For issues and questions:
- Open an issue on GitHub
- Visit [FRED API Documentation](https://fred.stlouisfed.org/docs/api/)
- Check [Next.js Documentation](https://nextjs.org/docs)

## Roadmap

Future enhancements planned:
- [ ] Add more visualization types (scatter plots, heatmaps)
- [ ] Implement data comparison tools
- [ ] Add custom date range selectors
- [ ] Create saved dashboards functionality
- [ ] Add real-time data updates
- [ ] Implement user authentication
- [ ] Add annotation and notes features
- [ ] Create shareable chart links
- [ ] Add PDF export capabilities
- [ ] Implement advanced statistical analysis tools

---

**Built with data from FRED - Making economic research accessible to everyone.**
