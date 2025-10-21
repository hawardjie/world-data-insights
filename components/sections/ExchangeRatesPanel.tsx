'use client';

import React, { useEffect, useState } from 'react';
import { getFredApi } from '@/lib/fredApi';
import { transformToChartData, transformToMultiSeriesData } from '@/utils/dataTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function ExchangeRatesPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dxyData, setDxyData] = useState<any[]>([]);
  const [majorRatesData, setMajorRatesData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fredApi = getFredApi();

      // US Dollar Index (DXY)
      const dxy = await fredApi.getSeriesObservations('DTWEXBGS', {
        observationStart: '2015-01-01',
      });
      setDxyData(transformToChartData(dxy));

      // Major Currency Pairs (USD/EUR, USD/JPY, USD/GBP)
      const rates = await fredApi.getMultipleSeriesObservations(
        ['DEXUSEU', 'DEXJPUS', 'DEXUSUK'],
        { observationStart: '2020-01-01' }
      );
      const ratesData = transformToMultiSeriesData(rates, {
        DEXUSEU: 'USD/EUR',
        DEXJPUS: 'USD/JPY',
        DEXUSUK: 'USD/GBP',
      });
      setMajorRatesData(ratesData);

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
          Exchange Rates
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Major currency exchange rates and US Dollar Index
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <TimeSeriesLineChart
              data={dxyData}
              title="Trade Weighted U.S. Dollar Index"
              color="#8b5cf6"
              unit="Index"
              description="Measures the strength of the U.S. dollar against a basket of major currencies, with higher values indicating a stronger dollar which makes imports cheaper but exports more expensive."
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
            <MultiSeriesLineChart
              data={majorRatesData}
              title="Major Currency Exchange Rates"
              series={[
                { id: 'DEXUSEU', name: 'USD/EUR', color: '#3b82f6' },
                { id: 'DEXJPUS', name: 'USD/JPY', color: '#ef4444' },
                { id: 'DEXUSUK', name: 'USD/GBP', color: '#10b981' },
              ]}
              description="Shows how the U.S. dollar exchanges against major global currencies, helping you track international purchasing power and the relative economic strength of different regions."
              source="FRED API (Federal Reserve Economic Data)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Major Currencies</CardTitle>
            <CardDescription>
              Track USD, EUR, JPY, GBP, CHF, CAD, AUD, and other major currency pairs
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
          <CardHeader>
            <CardTitle className="text-lg">Emerging Markets</CardTitle>
            <CardDescription>
              Exchange rates for CNY, INR, BRL, MXN, and other emerging market currencies
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
