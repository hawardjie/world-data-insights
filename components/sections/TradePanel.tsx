'use client';

import React, { useEffect, useState } from 'react';
import { getFredApi } from '@/lib/fredApi';
import { transformToChartData } from '@/utils/dataTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import AreaChart from '@/components/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function TradePanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportsData, setExportsData] = useState<any[]>([]);
  const [importsData, setImportsData] = useState<any[]>([]);
  const [balanceData, setBalanceData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fredApi = getFredApi();

      // Exports
      const exports = await fredApi.getSeriesObservations('BOPGEXP', {
        observationStart: '2010-01-01',
      });
      setExportsData(transformToChartData(exports));

      // Imports
      const imports = await fredApi.getSeriesObservations('BOPGIMP', {
        observationStart: '2010-01-01',
      });
      setImportsData(transformToChartData(imports));

      // Trade Balance
      const balance = await fredApi.getSeriesObservations('BOPGTB', {
        observationStart: '2010-01-01',
      });
      setBalanceData(transformToChartData(balance));

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
          International Trade
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Global trade flows, imports, exports, and trade balances
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <AreaChart
                data={exportsData}
                title="U.S. Exports of Goods"
                color="#10b981"
                unit="Billions $"
                description="Displays the total value of goods the U.S. sells to other countries, reflecting American economic competitiveness and global demand for U.S. products."
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
                data={importsData}
                title="U.S. Imports of Goods"
                color="#ef4444"
                unit="Billions $"
                description="Shows the total value of goods the U.S. purchases from other countries, indicating domestic consumption levels and dependence on foreign products."
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
            <TimeSeriesLineChart
              data={balanceData}
              title="U.S. Trade Balance"
              color="#f59e0b"
              unit="Billions $"
              description="Represents the difference between exports and imports, where negative values indicate a trade deficit meaning the U.S. imports more than it exports."
              source="FRED API (Federal Reserve Economic Data)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg">Trade Flows</CardTitle>
            <CardDescription>Import and export volumes by country and region</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-lg">Trade Balance</CardTitle>
            <CardDescription>Current account and trade surplus/deficit</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
          <CardHeader>
            <CardTitle className="text-lg">FDI Flows</CardTitle>
            <CardDescription>Foreign direct investment trends</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
