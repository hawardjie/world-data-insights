'use client';

import React, { useEffect, useState } from 'react';
import { WB_INDICATORS } from '@/types/worldbank';
import { mockCO2EmissionsData, mockRenewableEnergyData, mockForestAreaData } from '@/lib/mockEnvironmentData';
import { transformWBToChartData } from '@/utils/worldBankTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import AreaChart from '@/components/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function EnvironmentPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [renewableData, setRenewableData] = useState<any[]>([]);
  const [forestData, setForestData] = useState<any[]>([]);
  const [usingMockData, setUsingMockData] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);

    try {
      console.log('🌍 Loading Energy Use Per Capita data...');
      const energyResponse = await fetch(
        `/api/worldbank/indicator?indicator=${WB_INDICATORS.ENERGY_USE_PER_CAPITA}&country=WLD&date=2010:2023&per_page=1000`
      );
      const energyResult = await energyResponse.json();

      console.log('🌍 Loading Renewable Energy data...');
      const renewableResponse = await fetch(
        `/api/worldbank/indicator?indicator=${WB_INDICATORS.RENEWABLE_ENERGY}&country=WLD&date=2010:2023&per_page=1000`
      );
      const renewableResult = await renewableResponse.json();

      console.log('🌍 Loading Forest Area data...');
      const forestResponse = await fetch(
        `/api/worldbank/indicator?indicator=${WB_INDICATORS.FOREST_AREA}&country=WLD&date=2010:2023&per_page=1000`
      );
      const forestResult = await forestResponse.json();

      // Check if we got valid data
      if (energyResult.data && energyResult.data.length > 0) {
        setEnergyData(transformWBToChartData(energyResult));
        console.log(`✅ Loaded ${energyResult.data.length} energy use data points`);
      } else {
        console.warn('⚠️ No energy use data available, using mock data');
        setEnergyData(transformWBToChartData(mockCO2EmissionsData));
        setUsingMockData(true);
      }

      if (renewableResult.data && renewableResult.data.length > 0) {
        setRenewableData(transformWBToChartData(renewableResult));
        console.log(`✅ Loaded ${renewableResult.data.length} renewable energy data points`);
      } else {
        console.warn('⚠️ No renewable energy data available, using mock data');
        setRenewableData(transformWBToChartData(mockRenewableEnergyData));
        setUsingMockData(true);
      }

      if (forestResult.data && forestResult.data.length > 0) {
        setForestData(transformWBToChartData(forestResult));
        console.log(`✅ Loaded ${forestResult.data.length} forest data points`);
      } else {
        console.warn('⚠️ No forest data available, using mock data');
        setForestData(transformWBToChartData(mockForestAreaData));
        setUsingMockData(true);
      }

      console.log('✅ Environment data loaded successfully');
      setLoading(false);
    } catch (err: any) {
      console.warn('⚠️ World Bank API unavailable, using mock data:', err.message);

      // Fallback to mock data
      try {
        setEnergyData(transformWBToChartData(mockCO2EmissionsData));
        setRenewableData(transformWBToChartData(mockRenewableEnergyData));
        setForestData(transformWBToChartData(mockForestAreaData));

        setUsingMockData(true);
        console.log('✅ Loaded with mock environment data successfully');
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
          Environment & Climate Indicators
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Global environmental trends including energy consumption, renewable energy adoption, and forest conservation
        </p>
        {usingMockData && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-lg flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 text-sm">⚠️</span>
            <div className="flex-1">
              <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                Using Sample Data
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                World Bank API is currently unavailable. Displaying sample data for demonstration purposes.
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
                data={energyData}
                title="Global Energy Use Per Capita"
                color="#f59e0b"
                unit="kg of oil equivalent"
                description="X-axis: Year | Y-axis: Energy consumption in kg of oil equivalent per capita. This measures global energy consumption per person, showing trends in energy demand and efficiency improvements over time."
                source="World Bank Open Data API"
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
                data={renewableData}
                title="Renewable Energy Consumption"
                color="#22c55e"
                unit="% of total energy"
                description="X-axis: Year | Y-axis: Percentage of total energy consumption (%). This shows the share of total energy that comes from renewable sources like solar, wind, and hydro, reflecting the global transition away from fossil fuels."
                source="World Bank Open Data API"
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
              data={forestData}
              title="Global Forest Coverage"
              color="#16a34a"
              unit="% of land area"
              description="X-axis: Year | Y-axis: Percentage of land area (%). This tracks the percentage of Earth's land area covered by forests, highlighting deforestation trends and conservation efforts critical for biodiversity and carbon sequestration."
              source="World Bank Open Data API"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-lg">Energy Consumption</CardTitle>
            <CardDescription>
              Per capita energy use showing global demand trends
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Clean Energy</CardTitle>
            <CardDescription>
              Rising renewable energy adoption worldwide
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg">Forest Conservation</CardTitle>
            <CardDescription>
              Tracking global deforestation and conservation
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Source:</strong> World Bank World Development Indicators (WDI) - Environmental and climate data.
          Data is cached for 12 hours to improve performance.
        </p>
      </div>
    </div>
  );
}
