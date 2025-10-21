'use client';

import React, { useEffect, useState } from 'react';
import { getUNDataCsvApi } from '@/lib/unDataCsvApi';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function EducationPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [primaryData, setPrimaryData] = useState<any[]>([]);
  const [secondaryData, setSecondaryData] = useState<any[]>([]);
  const [tertiaryData, setTertiaryData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('📚 Loading Education data from UN...');
      const unCsvApi = getUNDataCsvApi();

      const countries = ['United States', 'China', 'India', 'Germany', 'Japan'];
      const educationData = await unCsvApi.getEducationEnrollment(countries, 2010);

      if (educationData.length > 0) {
        // Transform data for charts - group by education level
        const primaryEnrollment: any[] = [];
        const secondaryEnrollment: any[] = [];
        const tertiaryEnrollment: any[] = [];

        // Group by year
        const yearMap = new Map<number, any>();

        educationData.forEach(item => {
          const year = typeof item.year === 'number' ? item.year : parseInt(item.year);
          if (!yearMap.has(year)) {
            yearMap.set(year, { date: year.toString() });
          }

          const yearData = yearMap.get(year);

          if (item.series?.includes('Primary')) {
            yearData[item.country] = item.value;
            if (!primaryEnrollment.includes(yearData)) {
              primaryEnrollment.push(yearData);
            }
          } else if (item.series?.includes('Secondary')) {
            yearData[`${item.country}_secondary`] = item.value;
            if (!secondaryEnrollment.includes(yearData)) {
              secondaryEnrollment.push(yearData);
            }
          } else if (item.series?.includes('Tertiary')) {
            yearData[`${item.country}_tertiary`] = item.value;
            if (!tertiaryEnrollment.includes(yearData)) {
              tertiaryEnrollment.push(yearData);
            }
          }
        });

        // Create separate datasets for each level
        const years = Array.from(yearMap.keys()).sort();

        // Primary enrollment
        const primaryChartData = years.map(year => {
          const data: any = { date: year.toString() };
          countries.forEach(country => {
            const point = educationData.find(
              d => d.year === year && d.country === country && d.series?.includes('Primary')
            );
            if (point) data[country] = point.value;
          });
          return data;
        });

        // Secondary enrollment
        const secondaryChartData = years.map(year => {
          const data: any = { date: year.toString() };
          countries.forEach(country => {
            const point = educationData.find(
              d => d.year === year && d.country === country && d.series?.includes('Secondary')
            );
            if (point) data[country] = point.value;
          });
          return data;
        });

        // Tertiary enrollment
        const tertiaryChartData = years.map(year => {
          const data: any = { date: year.toString() };
          countries.forEach(country => {
            const point = educationData.find(
              d => d.year === year && d.country === country && d.series?.includes('Tertiary')
            );
            if (point) data[country] = point.value;
          });
          return data;
        });

        setPrimaryData(primaryChartData);
        setSecondaryData(secondaryChartData);
        setTertiaryData(tertiaryChartData);

        console.log(`✅ Education data loaded (${educationData.length} data points)`);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading education data:', err);
      setError('Failed to load education data. Please try again later.');
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
    { id: 'China', name: 'China', color: '#ef4444' },
    { id: 'India', name: 'India', color: '#22c55e' },
    { id: 'Germany', name: 'Germany', color: '#f59e0b' },
    { id: 'Japan', name: 'Japan', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Global Education Statistics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Education enrollment rates at primary, secondary, and tertiary levels across major economies
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesLineChart
              data={primaryData}
              title="Primary Education Enrollment"
              series={countrySeries}
              description="Gross enrollment ratio for primary education (typically ages 6-11). Shows the percentage of children enrolled in primary school relative to the official school-age population."
              source="United Nations Statistical Yearbook (data.un.org)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <MultiSeriesLineChart
                data={secondaryData}
                title="Secondary Education Enrollment"
                series={countrySeries}
                description="Gross enrollment ratio for secondary education (typically ages 12-17). Indicates access to middle and high school education across countries."
                source="United Nations Statistical Yearbook (data.un.org)"
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <MultiSeriesLineChart
                data={tertiaryData}
                title="Tertiary Education Enrollment"
                series={countrySeries}
                description="Gross enrollment ratio for tertiary education (university and higher education). Shows the percentage of the population in the typical tertiary education age group enrolled in higher education."
                source="United Nations Statistical Yearbook (data.un.org)"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Primary Education</CardTitle>
            <CardDescription>
              Near-universal access in developed countries
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Secondary Education</CardTitle>
            <CardDescription>
              Growing access but gaps remain in developing nations
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Higher Education</CardTitle>
            <CardDescription>
              Increasing participation driven by economic needs
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Source:</strong> United Nations Data (data.un.org) - Education statistics including enrollment rates at primary, secondary, and tertiary levels.
          Gross enrollment ratio is the total enrollment in a specific level of education, regardless of age, expressed as a percentage of the eligible official school-age population.
        </p>
      </div>
    </div>
  );
}
