'use client';

import React, { useEffect, useState } from 'react';
import { getFredApi } from '@/lib/fredApi';
import { mockFedFundsData, mockM2Data, mockDGS10Data, mockDGS2Data } from '@/lib/mockData';
import { transformToChartData, transformToMultiSeriesData } from '@/utils/dataTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import AreaChart from '@/components/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import LoadingSpinner, { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function MoneyFinancePanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fedFundsData, setFedFundsData] = useState<any[]>([]);
  const [interestRatesData, setInterestRatesData] = useState<any[]>([]);
  const [m2Data, setM2Data] = useState<any[]>([]);
  const [usingMockData, setUsingMockData] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);

    try {
      const fredApi = getFredApi();

      console.log('🔄 Loading Fed Funds Rate...');
      // Fed Funds Rate
      const fedFunds = await fredApi.getSeriesObservations('DFF', {
        observationStart: '2023-01-01', // Shorter date range for faster loading
      });
      const transformedFedFunds = transformToChartData(fedFunds);
      console.log('✓ Fed Funds Data:', transformedFedFunds.length, 'points');
      setFedFundsData(transformedFedFunds);

      // Wait a bit to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('🔄 Loading M2 Money Supply...');
      // M2 Money Supply
      const m2 = await fredApi.getSeriesObservations('M2SL', {
        observationStart: '2020-01-01', // Shorter date range
      });
      const transformedM2 = transformToChartData(m2);
      console.log('✓ M2 Data:', transformedM2.length, 'points');
      setM2Data(transformedM2);

      // Wait a bit before loading multiple series
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('🔄 Loading Interest Rates Comparison...');
      // Multiple Interest Rates Comparison - load sequentially
      const dff = await fredApi.getSeriesObservations('DFF', {
        observationStart: '2023-01-01',
      });
      await new Promise(resolve => setTimeout(resolve, 300));

      const dgs10 = await fredApi.getSeriesObservations('DGS10', {
        observationStart: '2023-01-01',
      });
      await new Promise(resolve => setTimeout(resolve, 300));

      const dgs2 = await fredApi.getSeriesObservations('DGS2', {
        observationStart: '2023-01-01',
      });

      const ratesData = transformToMultiSeriesData(
        { DFF: dff, DGS10: dgs10, DGS2: dgs2 },
        {
          DFF: 'Fed Funds Rate',
          DGS10: '10-Year Treasury',
          DGS2: '2-Year Treasury',
        }
      );
      console.log('✓ Interest Rates Data:', ratesData.length, 'points');
      setInterestRatesData(ratesData);

      console.log('✅ All data loaded successfully from FRED API');
      setLoading(false);
    } catch (err: any) {
      console.warn('⚠️ FRED API unavailable, using mock data:', err.message);

      // Fallback to mock data
      try {
        const transformedFedFunds = transformToChartData(mockFedFundsData);
        setFedFundsData(transformedFedFunds);

        const transformedM2 = transformToChartData(mockM2Data);
        setM2Data(transformedM2);

        const ratesData = transformToMultiSeriesData(
          { DFF: mockFedFundsData, DGS10: mockDGS10Data, DGS2: mockDGS2Data },
          {
            DFF: 'Fed Funds Rate',
            DGS10: '10-Year Treasury',
            DGS2: '2-Year Treasury',
          }
        );
        setInterestRatesData(ratesData);

        setUsingMockData(true);
        console.log('✅ Loaded with mock data successfully');
        setLoading(false);
      } catch (mockErr: any) {
        console.error('❌ Error loading mock data:', mockErr);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
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
          Money, Banking & Finance
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Key financial indicators including interest rates, monetary aggregates, and central bank rates
        </p>
        {usingMockData && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 text-sm">⚠️</span>
            <div className="flex-1">
              <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                Using Sample Data
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                FRED API is currently unavailable. Displaying sample data for demonstration purposes.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <TimeSeriesLineChart
                data={fedFundsData}
                title="Federal Funds Effective Rate"
                color="#3b82f6"
                unit="%"
                description="The interest rate at which banks lend reserve balances to other banks overnight. This is a key tool used by the Federal Reserve to implement monetary policy."
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
              <AreaChart
                data={m2Data}
                title="M2 Money Supply"
                color="#10b981"
                unit="Billions $"
                description="Total amount of money in circulation including cash, checking deposits, and easily convertible near money. M2 growth indicates expansion or contraction of the money supply."
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
              data={interestRatesData}
              title="Interest Rates Comparison"
              series={[
                { id: 'DFF', name: 'Fed Funds Rate', color: '#3b82f6' },
                { id: 'DGS10', name: '10-Year Treasury', color: '#10b981' },
                { id: 'DGS2', name: '2-Year Treasury', color: '#f59e0b' },
              ]}
              description="Comparison of short-term Fed Funds Rate with medium and long-term Treasury yields. The relationship between these rates (yield curve) indicates market expectations for economic growth and inflation."
              source="FRED API (Federal Reserve Economic Data)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Central Banks</CardTitle>
            <CardDescription>Global monetary policy rates</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Money Supply</CardTitle>
            <CardDescription>Monetary aggregates (M1, M2, M3)</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Treasury Rates</CardTitle>
            <CardDescription>Government bond yields</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
