'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { TrendingUp, Globe, DollarSign, Users, BarChart3, ArrowUpDown } from 'lucide-react';

interface OverviewPanelProps {
  onSectionChange: (section: string) => void;
}

export default function OverviewPanel({ onSectionChange }: OverviewPanelProps) {

  const categories = [
    {
      sectionId: 'finance',
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: 'Money & Finance',
      description: 'Interest rates, monetary aggregates, and financial market indicators',
      color: 'blue',
      stats: 'SOFR, AMERIBOR, SONIA, Central Bank Rates',
      details: {
        overview: 'Comprehensive monetary and financial data from central banks and financial markets worldwide.',
        keyIndicators: [
          'Federal Funds Effective Rate (DFF)',
          'M2 Money Supply (M2SL)',
          '10-Year Treasury Rate (DGS10)',
          '2-Year Treasury Rate (DGS2)',
          'SOFR - Secured Overnight Financing Rate',
          'AMERIBOR - American Interbank Offered Rate',
        ],
        sources: 'Federal Reserve Economic Data (FRED), Federal Reserve Banks',
        updateFrequency: 'Daily, Monthly',
      },
    },
    {
      sectionId: 'gdp',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'GDP & National Accounts',
      description: 'Global GDP, inflation, trade balances, and current accounts',
      color: 'green',
      stats: 'World Bank, Eurostat, IMF, OECD',
      details: {
        overview: 'Comprehensive national accounts data including GDP, GNI, consumption, investment, and government spending across countries.',
        keyIndicators: [
          'Real GDP (GDP)',
          'GDP Growth Rate (A191RL1Q225SBEA)',
          'Gross National Income (GNI)',
          'Personal Consumption Expenditures',
          'Gross Fixed Capital Formation',
          'Government Final Consumption',
        ],
        sources: 'World Bank, OECD, Eurostat, IMF, National Statistical Offices',
        updateFrequency: 'Quarterly, Annually',
      },
    },
    {
      sectionId: 'labor',
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Labor Markets',
      description: 'Employment, unemployment, labor force participation',
      color: 'purple',
      stats: 'Population, Migration, Wage Trends',
      details: {
        overview: 'Labor market statistics covering employment levels, unemployment rates, labor force participation, wages, and demographic trends.',
        keyIndicators: [
          'Unemployment Rate (UNRATE)',
          'Labor Force Participation Rate (CIVPART)',
          'Nonfarm Payroll Employment (PAYEMS)',
          'Average Hourly Earnings (CES0500000003)',
          'Job Openings (JTSJOL)',
          'Initial Jobless Claims (ICSA)',
        ],
        sources: 'U.S. Bureau of Labor Statistics, Eurostat, ILO, National Labor Agencies',
        updateFrequency: 'Weekly, Monthly',
      },
    },
    {
      sectionId: 'prices',
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: 'Prices & Inflation',
      description: 'Consumer and producer price indexes worldwide',
      color: 'orange',
      stats: 'CPI, PPI, Commodity Indexes',
      details: {
        overview: 'Price level indicators tracking inflation and deflation through consumer prices, producer prices, and commodity price indexes.',
        keyIndicators: [
          'Consumer Price Index (CPIAUCSL)',
          'Core CPI (CPILFESL)',
          'Producer Price Index (PPIACO)',
          'Personal Consumption Expenditures Price Index (PCEPI)',
          'Core PCE Price Index (PCEPILFE)',
          'Commodity Price Index',
        ],
        sources: 'U.S. Bureau of Labor Statistics, Eurostat, IMF, World Bank',
        updateFrequency: 'Monthly',
      },
    },
    {
      sectionId: 'exchange',
      icon: <ArrowUpDown className="h-8 w-8 text-cyan-600" />,
      title: 'Exchange Rates',
      description: 'Currency exchange rates and indexes',
      color: 'cyan',
      stats: 'USD, EUR, JPY, GBP, CNY',
      details: {
        overview: 'Foreign exchange rates for major and emerging market currencies, including bilateral rates and trade-weighted indexes.',
        keyIndicators: [
          'U.S. Dollar Index (DTWEXBGS)',
          'Euro to USD (DEXUSEU)',
          'British Pound to USD (DEXUSUK)',
          'Japanese Yen to USD (DEXJPUS)',
          'Chinese Yuan to USD (DEXCHUS)',
          'Real Effective Exchange Rate Indexes',
        ],
        sources: 'Federal Reserve, European Central Bank, Bank of England, BIS',
        updateFrequency: 'Daily, Monthly',
      },
    },
    {
      sectionId: 'trade',
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: 'International Trade',
      description: 'Import/export values and foreign direct investment',
      color: 'indigo',
      stats: 'Balance of Payments, FDI Flows',
      details: {
        overview: 'International trade statistics including imports, exports, trade balances, foreign direct investment, and balance of payments data.',
        keyIndicators: [
          'Trade Balance (BOPGSTB)',
          'Exports of Goods and Services',
          'Imports of Goods and Services',
          'Current Account Balance',
          'Foreign Direct Investment Flows',
          'Portfolio Investment',
        ],
        sources: 'U.S. Census Bureau, WTO, UNCTAD, IMF Balance of Payments',
        updateFrequency: 'Monthly, Quarterly',
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          World Data Insights
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          Explore 800,000+ Economic Time Series from 100+ Global Sources
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Powered by FRED - Federal Reserve Economic Data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Card
            key={index}
            onClick={() => onSectionChange(category.sectionId)}
            className="hover:shadow-lg transition-shadow cursor-pointer border-2"
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                {category.icon}
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {category.stats}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-2xl">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Comprehensive Coverage
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Access data from World Bank, IMF, OECD, Eurostat</li>
                <li>• National statistical agencies worldwide</li>
                <li>• Major central banks (ECB, Bank of Japan, etc.)</li>
                <li>• Real-time and historical time series</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Advanced Visualizations
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Interactive line, area, and bar charts</li>
                <li>• Multi-series comparisons</li>
                <li>• Custom date ranges and frequencies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl">Available Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {[
              'World Bank',
              'International Monetary Fund (IMF)',
              'OECD',
              'Eurostat',
              'Penn World Table',
              'Bank of Japan',
              'European Central Bank',
              'U.S. Bureau of Labor Statistics',
              'U.S. Census Bureau',
              'National Statistical Agencies',
            ].map((source, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {source}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
