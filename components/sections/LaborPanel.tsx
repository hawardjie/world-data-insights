'use client';

import React, { useEffect, useState } from 'react';
import { getFredApi } from '@/lib/fredApi';
import { transformToChartData, transformToMultiSeriesData } from '@/utils/dataTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import AreaChart from '@/components/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function LaborPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unemploymentData, setUnemploymentData] = useState<any[]>([]);
  const [payrollsData, setPayrollsData] = useState<any[]>([]);
  const [participationData, setParticipationData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const fredApi = getFredApi();

      // Unemployment Rate
      const unemployment = await fredApi.getSeriesObservations('UNRATE', {
        observationStart: '2015-01-01',
      });
      setUnemploymentData(transformToChartData(unemployment));

      // Non-farm Payrolls
      const payrolls = await fredApi.getSeriesObservations('PAYEMS', {
        observationStart: '2015-01-01',
      });
      setPayrollsData(transformToChartData(payrolls));

      // Labor Force Participation Rate
      const participation = await fredApi.getSeriesObservations('CIVPART', {
        observationStart: '2015-01-01',
      });
      setParticipationData(transformToChartData(participation));

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
          Labor Markets & Employment
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Employment, unemployment, labor force participation, and wage data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <TimeSeriesLineChart
                data={unemploymentData}
                title="Unemployment Rate"
                color="#ef4444"
                unit="%"
                description="Percentage of the labor force that is jobless and actively seeking employment. A lower unemployment rate indicates a healthier job market."
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
                data={payrollsData}
                title="Non-Farm Payrolls"
                color="#3b82f6"
                unit="Thousands"
                description="Total number of paid workers in the U.S. economy, excluding farm workers, private household employees, and non-profit organization employees. Rising payrolls indicate job market growth."
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
              data={participationData}
              title="Labor Force Participation Rate"
              color="#10b981"
              unit="%"
              description="Percentage of the working-age population that is either employed or actively looking for work. A declining rate may indicate discouraged workers leaving the labor force."
              source="FRED API (Federal Reserve Economic Data)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-lg">Unemployment</CardTitle>
            <CardDescription>Global unemployment rates and trends</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Employment</CardTitle>
            <CardDescription>Job creation and payroll statistics</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Participation</CardTitle>
            <CardDescription>Labor force participation rates</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
