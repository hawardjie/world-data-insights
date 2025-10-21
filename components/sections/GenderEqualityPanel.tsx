'use client';

import React, { useEffect, useState } from 'react';
import { getUNDataCsvApi } from '@/lib/unDataCsvApi';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function GenderEqualityPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parliamentData, setParliamentData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('⚖️ Loading Gender Equality data from UN...');
      const unCsvApi = getUNDataCsvApi();

      const countries = ['United States', 'Germany', 'India', 'Japan', 'France', 'Rwanda', 'Sweden'];
      const womenData = await unCsvApi.getWomenInParliament(countries, 2010);

      if (womenData.length > 0) {
        // Transform data for chart
        const years = [...new Set(womenData.map(d => d.year))].sort();

        const chartData = years.map(year => {
          const data: any = { date: year.toString() };
          countries.forEach(country => {
            const point = womenData.find(d => d.year === year && d.country === country);
            if (point) data[country] = point.value;
          });
          return data;
        });

        setParliamentData(chartData);
        console.log(`✅ Gender equality data loaded (${womenData.length} data points)`);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading gender equality data:', err);
      setError('Failed to load gender equality data. Please try again later.');
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
    { id: 'India', name: 'India', color: '#22c55e' },
    { id: 'Japan', name: 'Japan', color: '#8b5cf6' },
    { id: 'France', name: 'France', color: '#06b6d4' },
    { id: 'Rwanda', name: 'Rwanda', color: '#ec4899' },
    { id: 'Sweden', name: 'Sweden', color: '#f97316' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gender Equality & Women in Leadership
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tracking women's representation in national parliaments and progress toward gender parity in political leadership
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesLineChart
              data={parliamentData}
              title="Women in National Parliament"
              series={countrySeries}
              description="Percentage of seats held by women in national parliaments (lower or single house). Rwanda leads globally with over 60% representation, while traditional powers like Japan and India show slower progress toward gender parity."
              source="United Nations Statistical Yearbook (data.un.org)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
          <CardHeader>
            <CardTitle className="text-lg">Rwanda's Leadership</CardTitle>
            <CardDescription>
              World's highest female parliamentary representation at 60%+
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Nordic Excellence</CardTitle>
            <CardDescription>
              Sweden and other Nordic countries consistently above 40%
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Global Progress</CardTitle>
            <CardDescription>
              Steady increase worldwide, but parity remains distant
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          💡 Key Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-pink-600 dark:text-pink-400">•</span>
            <span><strong>Rwanda</strong> achieved the world's highest female representation through constitutional reforms and gender quotas following the 1994 genocide.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400">•</span>
            <span><strong>Nordic countries</strong> (Sweden, Finland, Norway, Iceland) consistently rank in the top 10, with cultural and policy support for gender equality.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Global average</strong> has increased from ~19% (2010) to ~26% (2024), but true parity (50%) remains a distant goal for most nations.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">•</span>
            <span><strong>Asia-Pacific</strong> shows the slowest progress, with traditional gender roles and cultural barriers impacting women's political participation.</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Source:</strong> United Nations Data (data.un.org) - Gender statistics tracking seats held by women in national parliaments.
          Data reflects the proportion of seats held by women members in single or lower chambers of national parliaments, expressed as a percentage of all occupied seats.
        </p>
      </div>
    </div>
  );
}
