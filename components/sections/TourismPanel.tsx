'use client';

import React, { useEffect, useState } from 'react';
import { getUNDataCsvApi } from '@/lib/unDataCsvApi';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function TourismPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tourismData, setTourismData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('✈️ Loading Tourism data from UN...');
      const unCsvApi = getUNDataCsvApi();

      const countries = ['France', 'Spain', 'United States', 'China', 'Italy', 'Turkey'];
      const touristArrivals = await unCsvApi.getTouristArrivals(countries, 2010);

      if (touristArrivals.length > 0) {
        // Transform data for chart
        const years = [...new Set(touristArrivals.map(d => d.year))].sort();

        const chartData = years.map(year => {
          const data: any = { date: year.toString() };
          countries.forEach(country => {
            const point = touristArrivals.find(d => d.year === year && d.country === country);
            if (point) data[country] = point.value;
          });
          return data;
        });

        setTourismData(chartData);
        console.log(`✅ Tourism data loaded (${touristArrivals.length} data points)`);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading tourism data:', err);
      setError('Failed to load tourism data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  const countrySeries = [
    { id: 'France', name: 'France', color: '#3b82f6' },
    { id: 'Spain', name: 'Spain', color: '#f59e0b' },
    { id: 'United States', name: 'United States', color: '#22c55e' },
    { id: 'China', name: 'China', color: '#ef4444' },
    { id: 'Italy', name: 'Italy', color: '#8b5cf6' },
    { id: 'Turkey', name: 'Turkey', color: '#ec4899' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          International Tourism & Travel
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tracking global tourism flows, international visitor arrivals, and the dramatic impact of COVID-19 on the travel industry
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesLineChart
              data={tourismData}
              title="International Tourist Arrivals (Millions)"
              series={countrySeries}
              description="Number of international tourist arrivals (overnight visitors) by destination country. France and Spain consistently lead as the world's most visited countries, while the pandemic caused an unprecedented 75% collapse in 2020."
              source="United Nations Statistical Yearbook (data.un.org)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">European Dominance</CardTitle>
            <CardDescription>
              France and Spain lead globally with 80-90M+ annual visitors
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-lg">COVID-19 Collapse</CardTitle>
            <CardDescription>
              Pandemic caused 75% drop in global tourism (2020-2021)
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Recovery Underway</CardTitle>
            <CardDescription>
              2024 arrivals approaching pre-pandemic levels
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          💡 Key Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span><strong>France</strong> has been the world's #1 tourist destination for decades, attracting 89M+ annual visitors (pre-COVID) with Paris, Mediterranean beaches, Alps, and wine regions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 dark:text-orange-400">•</span>
            <span><strong>Spain</strong> ranks #2 globally with 83M+ visitors, driven by Mediterranean resorts, Barcelona, Madrid, and affordable beach tourism.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 dark:text-red-400">•</span>
            <span><strong>COVID-19 devastation:</strong> Global tourism collapsed by ~75% in 2020 as borders closed and travel restrictions took effect. The industry lost an estimated $4.5 trillion and 62 million jobs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">•</span>
            <span><strong>Uneven recovery:</strong> By 2024, most countries have recovered to 90-105% of 2019 levels, but Asia-Pacific lags due to stricter border policies and China's slow reopening.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400">•</span>
            <span><strong>Emerging destinations:</strong> Turkey has grown rapidly as an affordable alternative to Western Europe, while China's domestic tourism now dwarfs international arrivals.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600 dark:text-pink-400">•</span>
            <span><strong>Economic importance:</strong> Tourism accounts for ~10% of global GDP and 1 in 10 jobs worldwide, making the sector's recovery critical for many economies (especially island nations and Mediterranean countries).</span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="text-lg">🏆 Pre-Pandemic Champions (2019)</CardTitle>
            <CardDescription className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span>1. France</span>
                <span className="font-semibold">89M visitors</span>
              </div>
              <div className="flex justify-between">
                <span>2. Spain</span>
                <span className="font-semibold">83M visitors</span>
              </div>
              <div className="flex justify-between">
                <span>3. United States</span>
                <span className="font-semibold">79M visitors</span>
              </div>
              <div className="flex justify-between">
                <span>4. China</span>
                <span className="font-semibold">65M visitors</span>
              </div>
              <div className="flex justify-between">
                <span>5. Italy</span>
                <span className="font-semibold">64M visitors</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-800/20 border-red-200 dark:border-red-700">
          <CardHeader>
            <CardTitle className="text-lg">📉 Pandemic Impact by Year</CardTitle>
            <CardDescription className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span>2019 (Pre-COVID)</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Baseline (100%)</span>
              </div>
              <div className="flex justify-between">
                <span>2020 (Lockdowns)</span>
                <span className="font-semibold text-red-600 dark:text-red-400">-75% collapse</span>
              </div>
              <div className="flex justify-between">
                <span>2021 (Vaccines)</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">-60% vs 2019</span>
              </div>
              <div className="flex justify-between">
                <span>2022 (Reopening)</span>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">-30% vs 2019</span>
              </div>
              <div className="flex justify-between">
                <span>2023-2024</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Recovery to 90-105%</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Source:</strong> United Nations Data (data.un.org) - Tourism and Transport Statistics.
          International tourist arrivals are defined as overnight visitors (tourists) traveling to a country other than their usual place of residence for less than one year,
          with purposes including leisure, business, health, education, or other activities. Data based on UNWTO (World Tourism Organization) methodology.
          COVID-19 impact estimates based on 2020-2024 reported data from national tourism boards.
        </p>
      </div>
    </div>
  );
}
