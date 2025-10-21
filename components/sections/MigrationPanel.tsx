'use client';

import React, { useEffect, useState } from 'react';
import { getUNDataCsvApi } from '@/lib/unDataCsvApi';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function MigrationPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [migrantData, setMigrantData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🌍 Loading Migration data from UN...');
      const unCsvApi = getUNDataCsvApi();

      const countries = ['United States', 'Germany', 'Saudi Arabia', 'United Kingdom', 'Canada', 'Australia'];
      const migrationData = await unCsvApi.getInternationalMigrants(countries, 2010);

      if (migrationData.length > 0) {
        // Transform data for chart
        const years = [...new Set(migrationData.map(d => d.year))].sort();

        const chartData = years.map(year => {
          const data: any = { date: year.toString() };
          countries.forEach(country => {
            const point = migrationData.find(d => d.year === year && d.country === country);
            if (point) data[country] = point.value;
          });
          return data;
        });

        setMigrantData(chartData);
        console.log(`✅ Migration data loaded (${migrationData.length} data points)`);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading migration data:', err);
      setError('Failed to load migration data. Please try again later.');
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
    { id: 'United States', name: 'United States', color: '#3b82f6' },
    { id: 'Germany', name: 'Germany', color: '#f59e0b' },
    { id: 'Saudi Arabia', name: 'Saudi Arabia', color: '#22c55e' },
    { id: 'United Kingdom', name: 'United Kingdom', color: '#8b5cf6' },
    { id: 'Canada', name: 'Canada', color: '#ec4899' },
    { id: 'Australia', name: 'Australia', color: '#06b6d4' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          International Migration & Refugees
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tracking global migration patterns, refugee movements, and the percentage of international migrants in national populations
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesLineChart
              data={migrantData}
              title="International Migrants as % of Population"
              series={countrySeries}
              description="Stock of international migrants (persons living in a country other than their birth country) expressed as a percentage of total population. Shows the diversity and attraction of different countries for global migration."
              source="United Nations Statistical Yearbook (data.un.org)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Gulf States Leadership</CardTitle>
            <CardDescription>
              Saudi Arabia and UAE have highest migrant shares (30-40%+)
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Traditional Destinations</CardTitle>
            <CardDescription>
              USA, Canada, Australia maintain 15-30% migrant populations
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">European Hubs</CardTitle>
            <CardDescription>
              Germany and UK show steady growth in migrant populations
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          💡 Key Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">•</span>
            <span><strong>Gulf States</strong> (Saudi Arabia, UAE) have the highest migrant shares globally (30-40%+) due to labor migration for oil and construction sectors.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Traditional immigrant nations</strong> (USA, Canada, Australia) maintain stable high rates (15-30%) with established immigration systems and diverse economies.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400">•</span>
            <span><strong>European countries</strong> (Germany, UK) show increasing migrant shares due to EU free movement, labor shortages, and humanitarian admissions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 dark:text-orange-400">•</span>
            <span><strong>Global migration</strong> has grown steadily from ~214 million (2010) to ~280 million (2023), representing ~3.6% of world population.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600 dark:text-pink-400">•</span>
            <span><strong>Refugee populations</strong> have surged since 2010 due to conflicts in Syria, Afghanistan, Ukraine, and other regions, with major hosting countries including Turkey, Colombia, and Germany.</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Source:</strong> United Nations Data (data.un.org) - International Migration and Refugee Statistics.
          International migrants are persons living in a country or area other than their country of birth. Data includes both voluntary migrants (economic, family reunification)
          and forced displacement (refugees, asylum seekers). Percentages calculated against total population estimates.
        </p>
      </div>
    </div>
  );
}
