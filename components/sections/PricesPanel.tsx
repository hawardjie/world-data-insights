'use client';

import React, { useEffect, useState } from 'react';
import { getFredApi } from '@/lib/fredApi';
import { transformToChartData, transformToMultiSeriesData } from '@/utils/dataTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import BarChart from '@/components/charts/BarChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function PricesPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cpiData, setCpiData] = useState<any[]>([]);
  const [ppiData, setPpiData] = useState<any[]>([]);
  const [globalInflationData, setGlobalInflationData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fredApi = getFredApi();

      // CPI - YoY % change
      const cpi = await fredApi.getSeriesObservations('CPIAUCSL', {
        observationStart: '2015-01-01',
        units: 'pc1',
      });
      setCpiData(transformToChartData(cpi));

      // PPI - YoY % change
      const ppi = await fredApi.getSeriesObservations('PPIACO', {
        observationStart: '2015-01-01',
        units: 'pc1',
      });
      setPpiData(transformToChartData(ppi));

      // Use Core CPI and Headline CPI for comparison
      const inflationComparison = await fredApi.getMultipleSeriesObservations(
        ['CPIAUCSL', 'CPILFESL'],
        {
          observationStart: '2015-01-01',
          units: 'pc1', // Percent change from year ago
        }
      );
      const comparisonData = transformToMultiSeriesData(inflationComparison, {
        CPIAUCSL: 'Headline CPI',
        CPILFESL: 'Core CPI (ex Food & Energy)',
      });
      setGlobalInflationData(comparisonData);

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Prices & Inflation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Consumer and producer price indexes, inflation trends worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <BarChart
                data={cpiData}
                title="U.S. CPI - Annual % Change"
                color="#f59e0b"
                unit="%"
                description="Tracks how much consumer prices have increased or decreased compared to the previous year, helping you understand the cost of living changes for everyday goods and services."
                source="FRED API (Federal Reserve Economic Data)"
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <TimeSeriesLineChart
                data={ppiData}
                title="U.S. PPI - Annual % Change"
                color="#8b5cf6"
                unit="%"
                description="Shows the year-over-year change in prices that producers receive for their goods, indicating future consumer price trends since producer costs often get passed to consumers."
                source="FRED API (Federal Reserve Economic Data)"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesLineChart
              data={globalInflationData}
              title="U.S. Inflation: Headline vs Core CPI"
              series={[
                { id: 'CPIAUCSL', name: 'Headline CPI', color: '#3b82f6' },
                { id: 'CPILFESL', name: 'Core CPI (ex Food & Energy)', color: '#10b981' },
              ]}
              description="Compares overall inflation (headline) with core inflation that excludes volatile food and energy prices, helping identify whether price increases are broad-based or driven by temporary factors."
              source="FRED API (Federal Reserve Economic Data)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-lg">Consumer Prices</CardTitle>
            <CardDescription>
              CPI data for major economies covering food, energy, housing, and core inflation
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800">
          <CardHeader>
            <CardTitle className="text-lg">Producer Prices</CardTitle>
            <CardDescription>
              PPI trends by commodity and industry sector from global sources
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
