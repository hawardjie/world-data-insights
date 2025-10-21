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

export default function GDPPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usGdpData, setUsGdpData] = useState<any[]>([]);
  const [globalGdpData, setGlobalGdpData] = useState<any[]>([]);
  const [inflationData, setInflationData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fredApi = getFredApi();

      // US GDP
      const gdp = await fredApi.getSeriesObservations('GDP', {
        observationStart: '2010-01-01',
      });
      setUsGdpData(transformToChartData(gdp));

      // GDP Components Comparison - Using US data (more reliable)
      const gdpComponents = await fredApi.getMultipleSeriesObservations(
        ['GDP', 'GDPC1'],
        { observationStart: '2015-01-01' }
      );
      const componentsData = transformToMultiSeriesData(gdpComponents, {
        GDP: 'Nominal GDP',
        GDPC1: 'Real GDP',
      });
      setGlobalGdpData(componentsData);

      // Inflation (CPI)
      const cpi = await fredApi.getSeriesObservations('CPIAUCSL', {
        observationStart: '2020-01-01',
        units: 'pc1',
      });
      setInflationData(transformToChartData(cpi));

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
          GDP & National Accounts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Global GDP, economic growth, inflation, and macroeconomic indicators
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <TimeSeriesLineChart
              data={usGdpData}
              title="United States GDP"
              color="#3b82f6"
              unit="Billions $"
              description="Total value of all goods and services produced in the United States. A rising GDP indicates economic expansion, while a declining GDP signals economic contraction."
              source="FRED API (Federal Reserve Economic Data)"
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
                data={globalGdpData}
                title="U.S. GDP: Nominal vs Real"
                series={[
                  { id: 'GDP', name: 'Nominal GDP', color: '#3b82f6' },
                  { id: 'GDPC1', name: 'Real GDP', color: '#10b981' },
                ]}
                description="Nominal GDP measures economic output in current prices, while Real GDP adjusts for inflation to show true economic growth. The gap between them indicates the impact of inflation on the economy."
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
              <BarChart
                data={inflationData}
                title="US Inflation Rate (YoY % Change)"
                color="#f59e0b"
                unit="%"
                description="Year-over-year percentage change in the Consumer Price Index (CPI). Higher values indicate rising prices and inflation, while lower or negative values suggest deflation or stable prices."
                source="FRED API (Federal Reserve Economic Data)"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="text-lg">Economic Growth</CardTitle>
            <CardDescription>
              Track GDP growth rates across major economies including US, China, EU, Japan, and emerging markets
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-lg">Trade Balance</CardTitle>
            <CardDescription>
              Current account balances and international trade data from World Bank and national agencies
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
