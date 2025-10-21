'use client';

import React, { useEffect, useState } from 'react';
import { getWorldBankApi } from '@/lib/worldBankApi';
import { WB_INDICATORS } from '@/types/worldbank';
import axios from 'axios';
import { getUNDataApi } from '@/lib/unDataApi';
import { getWorldPopApi } from '@/lib/worldPopApi';
import { mockFertilityRateData, mockInfantMortalityData, mockBirthRateData, mockDeathRateData } from '@/lib/mockDemographicsData';
import { transformWBToChartData, transformWBToMultiSeries } from '@/utils/worldBankTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import AreaChart from '@/components/charts/AreaChart';
import BarChart from '@/components/charts/BarChart';
import CategoryBarChart from '@/components/charts/CategoryBarChart';
import PopulationPyramid from '@/components/charts/PopulationPyramid';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function DemographicsPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fertilityData, setFertilityData] = useState<any[]>([]);
  const [infantMortalityData, setInfantMortalityData] = useState<any[]>([]);
  const [birthDeathData, setBirthDeathData] = useState<any[]>([]);
  const [usPopulationData, setUsPopulationData] = useState<any[]>([]);
  const [worldPopulationData, setWorldPopulationData] = useState<any[]>([]);
  const [usingMockData, setUsingMockData] = useState(false);
  const [hasUSData, setHasUSData] = useState(false);
  const [hasUNData, setHasUNData] = useState(false);

  // WorldPop data states
  const [populationDensityData, setPopulationDensityData] = useState<any[]>([]);
  const [urbanizationData, setUrbanizationData] = useState<any[]>([]);
  const [genderRatioData, setGenderRatioData] = useState<any[]>([]);
  const [ageStructureData, setAgeStructureData] = useState<any[]>([]);
  const [hasWorldPopData, setHasWorldPopData] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    setHasUSData(false);
    setHasUNData(false);

    try {
      const wbApi = getWorldBankApi();

      console.log('👶 Loading Fertility Rate data...');
      const fertility = await wbApi.getIndicatorData(WB_INDICATORS.FERTILITY_RATE, {
        country: 'WLD',
        date: '2010:2023',
      });
      setFertilityData(transformWBToChartData(fertility));

      console.log('👶 Loading Infant Mortality data...');
      const infantMortality = await wbApi.getIndicatorData(WB_INDICATORS.INFANT_MORTALITY, {
        country: 'WLD',
        date: '2010:2023',
      });
      setInfantMortalityData(transformWBToChartData(infantMortality));

      console.log('👶 Loading Birth & Death Rates...');
      const birthRate = await wbApi.getIndicatorData(WB_INDICATORS.BIRTH_RATE, {
        country: 'WLD',
        date: '2010:2023',
      });
      const deathRate = await wbApi.getIndicatorData(WB_INDICATORS.DEATH_RATE, {
        country: 'WLD',
        date: '2010:2023',
      });

      const birthDeathComparison = transformWBToMultiSeries(
        {
          [WB_INDICATORS.BIRTH_RATE]: birthRate,
          [WB_INDICATORS.DEATH_RATE]: deathRate,
        },
        {
          [WB_INDICATORS.BIRTH_RATE]: 'Birth Rate',
          [WB_INDICATORS.DEATH_RATE]: 'Death Rate',
        }
      );
      setBirthDeathData(birthDeathComparison);

      // Try to load US Census data (optional - won't fail if unavailable)
      try {
        console.log('🇺🇸 Loading US Population data from Census...');

        // Use only recent years where ACS data is most reliable (reduces API calls)
        const years = [2022, 2021, 2020, 2019];
        const usPopData: { date: string; value: number }[] = [];

        // Load data sequentially to avoid overwhelming the API
        for (const year of years) {
          try {
            const response = await axios.get(`/api/census/population?year=${year}&geography=us:*`);
            if (response.data && response.data.data && response.data.data.length > 0) {
              usPopData.push({
                date: year.toString(),
                value: response.data.data[0].value / 1000000, // Convert to millions
              });
            }
          } catch (err) {
            // Silent fail for individual year, continue to next
            continue;
          }
        }

        if (usPopData.length > 0) {
          // Sort by date ascending
          usPopData.sort((a, b) => a.date.localeCompare(b.date));
          setUsPopulationData(usPopData);
          setHasUSData(true);
          console.log(`✅ US Census data loaded successfully (${usPopData.length} years)`);
        } else {
          console.log('ℹ️ US Census data not available');
        }
      } catch (censusErr) {
        console.log('ℹ️ US Census data not available');
      }

      // UN Population API - DISABLED (requires authentication)
      // The UN Population API returns 401 Unauthorized without credentials.
      // To enable:
      //   1. Contact population@un.org to request API access
      //   2. Add credentials to .env.local: NEXT_PUBLIC_UN_API_KEY or NEXT_PUBLIC_UN_API_TOKEN
      //   3. Uncomment the code below
      //   4. Restart the dev server

      /* UNCOMMENT WHEN YOU HAVE UN API CREDENTIALS:
      try {
        console.log('🌍 Loading World Population data from UN...');
        const unApi = getUNDataApi();
        const worldPop = await unApi.getPopulationData(
          ['900'], // World
          ['49'], // Total population
          { startYear: 2010, endYear: 2023 }
        );

        if (worldPop && worldPop.length > 0) {
          const worldPopData = worldPop.map(item => ({
            date: item.date,
            value: item.value / 1000000000, // Convert to billions
          }));
          setWorldPopulationData(worldPopData);
          setHasUNData(true);
          console.log(`✅ UN Population data loaded successfully (${worldPopData.length} data points)`);
        } else {
          console.log('ℹ️ UN Population data not available (API may be temporarily down)');
        }
      } catch (unErr) {
        console.log('ℹ️ UN Population data not available');
      }
      */

      // Load WorldPop data (unique demographic insights)
      try {
        console.log('🌍 Loading WorldPop demographic insights...');
        const worldPopApi = getWorldPopApi();

        // Load population density comparison
        const densityData = await worldPopApi.getPopulationDensity(['IND', 'CHN', 'JPN', 'USA', 'BRA']);
        if (densityData.length > 0) {
          const densityChartData = densityData.map(item => ({
            category: item.country,
            value: item.density,
            label: `${item.country}: ${item.density} people/km²`,
          }));
          setPopulationDensityData(densityChartData);
        }

        // Load urbanization trends
        const urbanData = await worldPopApi.getUrbanRuralTrends(['USA', 'CHN', 'IND', 'BRA'], 2015, 2025);
        if (urbanData.length > 0) {
          // Transform to multi-series format
          const urbanChartData: any[] = [];
          const years = [...new Set(urbanData.map(d => d.year))];
          years.forEach(year => {
            const yearData: any = { date: year.toString() };
            urbanData.filter(d => d.year === year).forEach(d => {
              yearData[d.country] = d.urbanization_rate;
            });
            urbanChartData.push(yearData);
          });
          setUrbanizationData(urbanChartData);
        }

        // Load gender ratio trends
        const genderData = await worldPopApi.getGenderRatioTrends(['CHN', 'IND', 'USA', 'JPN'], 2015, 2025);
        if (genderData.length > 0) {
          // Transform to multi-series format
          const genderChartData: any[] = [];
          const years = [...new Set(genderData.map(d => d.year))];
          years.forEach(year => {
            const yearData: any = { date: year.toString() };
            genderData.filter(d => d.year === year).forEach(d => {
              yearData[d.country] = d.ratio;
            });
            genderChartData.push(yearData);
          });
          setGenderRatioData(genderChartData);
        }

        // Load age structure for USA (2023)
        const ageData = await worldPopApi.getAgeStructure('USA', 2023);
        if (ageData.length > 0) {
          // Group by age_group
          const ageGroups = [...new Set(ageData.map(d => d.age_group))].filter(g => g);
          const pyramidData = ageGroups.map(group => {
            const maleData = ageData.find(d => d.age_group === group && d.sex === 'male');
            const femaleData = ageData.find(d => d.age_group === group && d.sex === 'female');
            return {
              age_group: group!,
              male: maleData?.value || 0,
              female: femaleData?.value || 0,
            };
          });
          setAgeStructureData(pyramidData);
        }

        if (densityData.length > 0 || urbanData.length > 0 || genderData.length > 0 || ageData.length > 0) {
          setHasWorldPopData(true);
          console.log('✅ WorldPop demographic insights loaded successfully');
        }
      } catch (worldPopErr) {
        console.log('ℹ️ WorldPop demographic insights not available');
      }

      console.log('✅ Demographics data loaded successfully');
      setLoading(false);
    } catch (err: any) {
      console.warn('⚠️ World Bank API unavailable, using mock data:', err.message);

      // Fallback to mock data
      try {
        setFertilityData(transformWBToChartData(mockFertilityRateData));
        setInfantMortalityData(transformWBToChartData(mockInfantMortalityData));

        const birthDeathComparison = transformWBToMultiSeries(
          {
            [WB_INDICATORS.BIRTH_RATE]: mockBirthRateData,
            [WB_INDICATORS.DEATH_RATE]: mockDeathRateData,
          },
          {
            [WB_INDICATORS.BIRTH_RATE]: 'Birth Rate',
            [WB_INDICATORS.DEATH_RATE]: 'Death Rate',
          }
        );
        setBirthDeathData(birthDeathComparison);

        setUsingMockData(true);
        console.log('✅ Loaded with mock demographics data successfully');
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
          Global Demographics & Vital Statistics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Worldwide demographic trends including fertility, mortality, birth and death rates
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
                data={fertilityData}
                title="Global Fertility Rate"
                color="#ec4899"
                unit="Births per woman"
                description="Shows the average number of children a woman will have in her lifetime, with declining rates indicating demographic transition as countries develop economically."
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
                data={infantMortalityData}
                title="Global Infant Mortality Rate"
                color="#ef4444"
                unit="Per 1,000 births"
                description="Tracks the number of infants who die before their first birthday per 1,000 live births, serving as a key indicator of healthcare quality and access worldwide."
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
            <MultiSeriesLineChart
              data={birthDeathData}
              title="Global Birth vs Death Rates"
              series={[
                { id: 'Birth Rate', name: 'Birth Rate', color: '#22c55e' },
                { id: 'Death Rate', name: 'Death Rate', color: '#ef4444' },
              ]}
              description="Compares the number of births and deaths per 1,000 people, with the gap between them determining population growth or decline over time."
              source="World Bank Open Data API"
            />
          )}
        </CardContent>
      </Card>

      {/* Additional data from Census and UN APIs */}
      {(hasUSData || hasUNData) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hasUSData && (
            <Card>
              <CardContent>
                <TimeSeriesLineChart
                  data={usPopulationData}
                  title="United States Population"
                  color="#2563eb"
                  unit="Millions"
                  description="U.S. Census Bureau data showing the total population of the United States, updated annually based on official census estimates."
                  source="World Bank Open Data API"
                />
              </CardContent>
            </Card>
          )}

          {hasUNData && (
            <Card>
              <CardContent>
                <AreaChart
                  data={worldPopulationData}
                  title="World Population"
                  color="#7c3aed"
                  unit="Billions"
                  description="UN Population Division data tracking the total global population, showing the steady increase in world population over time."
                  source="World Bank Open Data API"
                />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* WorldPop Demographic Insights */}
      {hasWorldPopData && (
        <>
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              WorldPop Demographic Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced demographic analytics including population density, urbanization patterns, gender distribution, and age structure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {populationDensityData.length > 0 && (
              <Card>
                <CardContent>
                  <CategoryBarChart
                    data={populationDensityData}
                    title="Population Density Comparison"
                    unit="people/km²"
                    categoryLabel="Country"
                    valueLabel="Density"
                    description="Compares population density across major countries, showing how many people live per square kilometer."
                    source="World Bank Open Data API"
                  />
                </CardContent>
              </Card>
            )}

            {ageStructureData.length > 0 && (
              <Card>
                <CardContent>
                  <PopulationPyramid
                    data={ageStructureData}
                    title="Age Structure Pyramid"
                    country="United States"
                    year={2023}
                    description="Shows the distribution of population by age groups and gender, revealing demographic patterns and trends."
                    source="World Bank Open Data API"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {urbanizationData.length > 0 && (
              <Card>
                <CardContent>
                  {loading ? (
                    <ChartSkeleton />
                  ) : (
                    <MultiSeriesLineChart
                      data={urbanizationData}
                      title="Urbanization Rate Trends"
                      series={[
                        { id: 'USA', name: 'USA', color: '#3b82f6' },
                        { id: 'CHN', name: 'China', color: '#ef4444' },
                        { id: 'IND', name: 'India', color: '#22c55e' },
                        { id: 'BRA', name: 'Brazil', color: '#f59e0b' },
                      ]}
                      description="Tracks the percentage of population living in urban areas over time, showing the global trend toward urbanization."
                      source="World Bank Open Data API"
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {genderRatioData.length > 0 && (
              <Card>
                <CardContent>
                  {loading ? (
                    <ChartSkeleton />
                  ) : (
                    <MultiSeriesLineChart
                      data={genderRatioData}
                      title="Gender Ratio Trends"
                      series={[
                        { id: 'CHN', name: 'China', color: '#ef4444' },
                        { id: 'IND', name: 'India', color: '#22c55e' },
                        { id: 'USA', name: 'USA', color: '#3b82f6' },
                        { id: 'JPN', name: 'Japan', color: '#8b5cf6' },
                      ]}
                      description="Shows the ratio of males per 100 females over time. Values above 100 indicate more males, below 100 indicate more females."
                      source="World Bank Open Data API"
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
          <CardHeader>
            <CardTitle className="text-lg">Fertility Trends</CardTitle>
            <CardDescription>
              Declining global fertility rates show demographic transition
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-lg">Infant Health</CardTitle>
            <CardDescription>
              Improving healthcare reduces infant mortality worldwide
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Vital Statistics</CardTitle>
            <CardDescription>
              Birth rates outpace death rates, driving population growth
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Sources:</strong> World Bank World Development Indicators (WDI) - Global demographic and vital statistics
          {hasUSData && ', U.S. Census Bureau - US population estimates'}
          {hasUNData && ', UN Population Division - Global population data'}
          {hasWorldPopData && ', WorldPop - Population density, urbanization, gender ratios, and age structure'}
          . Data is cached for 12 hours to improve performance.
        </p>
      </div>
    </div>
  );
}
