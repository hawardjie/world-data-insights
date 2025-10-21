'use client';

import React, { useEffect, useState } from 'react';
import { getWorldBankApi } from '@/lib/worldBankApi';
import { WB_INDICATORS } from '@/types/worldbank';
import { getDataCommonsApi } from '@/lib/dataCommonsApi';
import { mockWorldPopulationData, mockWorldGDPData, mockLifeExpectancyData, mockUrbanPopulationData } from '@/lib/mockWorldBankData';
import { transformWBToChartData } from '@/utils/worldBankTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import AreaChart from '@/components/charts/AreaChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function WorldDevelopmentPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [populationData, setPopulationData] = useState<any[]>([]);
  const [gdpData, setGdpData] = useState<any[]>([]);
  const [lifeExpectancyData, setLifeExpectancyData] = useState<any[]>([]);
  const [urbanPopulationData, setUrbanPopulationData] = useState<any[]>([]);
  const [unemploymentComparisonData, setUnemploymentComparisonData] = useState<any[]>([]);
  const [usingMockData, setUsingMockData] = useState(false);
  const [hasDataCommons, setHasDataCommons] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    setHasDataCommons(false);

    try {
      const wbApi = getWorldBankApi();

      console.log('🌍 Loading World Population data...');
      const population = await wbApi.getIndicatorData(WB_INDICATORS.POPULATION_TOTAL, {
        country: 'WLD', // World
        date: '2010:2024',
      });
      setPopulationData(transformWBToChartData(population));

      console.log('🌍 Loading World GDP data...');
      const gdp = await wbApi.getIndicatorData(WB_INDICATORS.GDP_CURRENT_USD, {
        country: 'WLD',
        date: '2010:2024',
      });
      setGdpData(transformWBToChartData(gdp));

      console.log('🌍 Loading Life Expectancy data...');
      const lifeExpectancy = await wbApi.getIndicatorData(WB_INDICATORS.LIFE_EXPECTANCY, {
        country: 'WLD',
        date: '2010:2024',
      });
      setLifeExpectancyData(transformWBToChartData(lifeExpectancy));

      console.log('🌍 Loading Urban Population data...');
      const urbanPop = await wbApi.getIndicatorData(WB_INDICATORS.URBAN_POPULATION, {
        country: 'WLD',
        date: '2010:2024',
      });
      setUrbanPopulationData(transformWBToChartData(urbanPop));

      // Try to load additional data from Google Data Commons (optional)
      try {
        console.log('📊 Loading comparative data from Google Data Commons...');
        const dcApi = getDataCommonsApi();
        const places = dcApi.getCommonPlaces();

        // Load unemployment rates for major economies
        const usUnemployment = await dcApi.getObservations(
          'UnemploymentRate_Person',
          places.countries.usa,
          { startDate: '2015', endDate: '2024' }
        ).catch(() => []);

        const chinaUnemployment = await dcApi.getObservations(
          'UnemploymentRate_Person',
          places.countries.china,
          { startDate: '2015', endDate: '2024' }
        ).catch(() => []);

        const euUnemployment = await dcApi.getObservations(
          'UnemploymentRate_Person',
          places.countries.germany,
          { startDate: '2015', endDate: '2024' }
        ).catch(() => []);

        // Combine the data for comparison chart
        if (usUnemployment.length > 0 || chinaUnemployment.length > 0 || euUnemployment.length > 0) {
          // Create a combined dataset for multi-series chart
          const allDates = new Set([
            ...usUnemployment.map(d => d.date),
            ...chinaUnemployment.map(d => d.date),
            ...euUnemployment.map(d => d.date)
          ]);

          const combinedData = Array.from(allDates).sort().map(date => {
            const dataPoint: any = { date };
            const usPoint = usUnemployment.find(d => d.date === date);
            const chinaPoint = chinaUnemployment.find(d => d.date === date);
            const euPoint = euUnemployment.find(d => d.date === date);

            if (usPoint) dataPoint['USA'] = usPoint.value;
            if (chinaPoint) dataPoint['China'] = chinaPoint.value;
            if (euPoint) dataPoint['Germany'] = euPoint.value;

            return dataPoint;
          });

          setUnemploymentComparisonData(combinedData);
          setHasDataCommons(true);
          console.log('✅ Google Data Commons data loaded successfully');
        }
      } catch (dcErr) {
        console.log('ℹ️ Google Data Commons data not available');
      }

      console.log('✅ World Bank data loaded successfully');
      setLoading(false);
    } catch (err: any) {
      console.warn('⚠️ World Bank API unavailable, using mock data:', err.message);

      // Fallback to mock data
      try {
        setPopulationData(transformWBToChartData(mockWorldPopulationData));
        setGdpData(transformWBToChartData(mockWorldGDPData));
        setLifeExpectancyData(transformWBToChartData(mockLifeExpectancyData));
        setUrbanPopulationData(transformWBToChartData(mockUrbanPopulationData));

        setUsingMockData(true);
        console.log('✅ Loaded with mock World Bank data successfully');
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
          World Development Indicators
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Global trends in population, economic development, health, and urbanization from the World Bank
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
              <AreaChart
                data={populationData}
                title="World Population Growth"
                color="#3b82f6"
                unit="People"
                description="Tracks the total number of people on Earth over time, showing how global population continues to grow and placing pressure on resources, infrastructure, and the environment."
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
              <TimeSeriesLineChart
                data={gdpData}
                title="World GDP (Current US$)"
                color="#10b981"
                unit="USD"
                description="Measures the total economic output of all countries combined, indicating global economic health and prosperity levels across the world."
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
              <TimeSeriesLineChart
                data={lifeExpectancyData}
                title="Global Life Expectancy at Birth"
                color="#8b5cf6"
                unit="Years"
                description="Shows the average number of years a newborn is expected to live, reflecting improvements in healthcare, nutrition, and living conditions worldwide."
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
              <TimeSeriesLineChart
                data={urbanPopulationData}
                title="Global Urbanization Rate"
                color="#f59e0b"
                unit="%"
                description="Displays the percentage of the world's population living in urban areas, highlighting the shift from rural to city living and its implications for infrastructure and services."
                source="World Bank Open Data API"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional data from Google Data Commons */}
      {hasDataCommons && (
        <Card>
          <CardContent>
            <MultiSeriesLineChart
              data={unemploymentComparisonData}
              title="Global Unemployment Rate Comparison"
              series={[
                { id: 'USA', name: 'United States', color: '#3b82f6' },
                { id: 'China', name: 'China', color: '#ef4444' },
                { id: 'Germany', name: 'Germany', color: '#f59e0b' },
              ]}
              description="Google Data Commons aggregated unemployment rates for major economies, showing how different countries' labor markets perform relative to each other over time."
              source="World Bank Open Data API"
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Population & Demographics</CardTitle>
            <CardDescription>Global population trends and growth rates</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Economic Development</CardTitle>
            <CardDescription>World GDP and economic indicators</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Health & Urbanization</CardTitle>
            <CardDescription>Life expectancy and urban development</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Sources:</strong> World Bank World Development Indicators (WDI) database via World Bank API v2
          {hasDataCommons && ', Google Data Commons - Aggregated global economic indicators'}
          . Data is cached for 12 hours to improve performance and reduce API load.
        </p>
      </div>
    </div>
  );
}
