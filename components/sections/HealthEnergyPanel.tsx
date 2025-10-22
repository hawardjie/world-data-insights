'use client';

import React, { useEffect, useState } from 'react';
import { getUNDataCsvApi } from '@/lib/unDataCsvApi';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import MultiSeriesBarChart from '@/components/charts/MultiSeriesBarChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function HealthEnergyPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [healthData, setHealthData] = useState<any[]>([]);
  const [energyData, setEnergyData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🏥⚡ Loading Health & Energy data from UN...');
      const unCsvApi = getUNDataCsvApi();

      // Load health expenditure data
      const healthCountries = ['United States', 'Germany', 'United Kingdom', 'Japan', 'Canada', 'France'];
      const healthExpenditure = await unCsvApi.getHealthExpenditure(healthCountries, 2010);

      if (healthExpenditure.length > 0) {
        const years = [...new Set(healthExpenditure.map(d => d.year))].sort();

        const healthChartData = years.map(year => {
          const data: any = { date: year.toString() };
          healthCountries.forEach(country => {
            const point = healthExpenditure.find(d => d.year === year && d.country === country);
            if (point) data[country] = point.value;
          });
          return data;
        });

        setHealthData(healthChartData);
        console.log(`✅ Health expenditure data loaded (${healthExpenditure.length} data points)`);
      }

      // Load renewable energy data
      const energyCountries = ['Germany', 'United States', 'China', 'India', 'Brazil', 'Sweden'];
      const renewableEnergy = await unCsvApi.getRenewableEnergy(energyCountries, 2010);

      if (renewableEnergy.length > 0) {
        const years = [...new Set(renewableEnergy.map(d => d.year))].sort();

        const energyChartData = years.map(year => {
          const data: any = { date: year.toString() };
          energyCountries.forEach(country => {
            const point = renewableEnergy.find(d => d.year === year && d.country === country);
            if (point) data[country] = point.value;
          });
          return data;
        });

        setEnergyData(energyChartData);
        console.log(`✅ Renewable energy data loaded (${renewableEnergy.length} data points)`);
      }

      setLoading(false);
    } catch (err: any) {
      console.error('Error loading health & energy data:', err);
      setError('Failed to load health & energy data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  const healthSeries = [
    { id: 'United States', name: 'United States', color: '#3b82f6' },
    { id: 'Germany', name: 'Germany', color: '#f59e0b' },
    { id: 'United Kingdom', name: 'United Kingdom', color: '#22c55e' },
    { id: 'Japan', name: 'Japan', color: '#8b5cf6' },
    { id: 'Canada', name: 'Canada', color: '#ec4899' },
    { id: 'France', name: 'France', color: '#06b6d4' },
  ];

  const energySeries = [
    { id: 'Germany', name: 'Germany', color: '#f59e0b' },
    { id: 'United States', name: 'United States', color: '#3b82f6' },
    { id: 'China', name: 'China', color: '#ef4444' },
    { id: 'India', name: 'India', color: '#22c55e' },
    { id: 'Brazil', name: 'Brazil', color: '#10b981' },
    { id: 'Sweden', name: 'Sweden', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Health Systems & Sustainable Energy
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tracking healthcare investment and the transition to renewable energy sources across developed and emerging economies
        </p>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesBarChart
              data={healthData}
              title="Health Expenditure as % of GDP"
              series={healthSeries}
              description="Total health expenditure (public and private) expressed as a percentage of Gross Domestic Product. The United States consistently leads at 17%+, while other developed nations range 9-12%."
              source="United Nations Statistical Yearbook (data.un.org)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">U.S. Exceptionalism</CardTitle>
            <CardDescription>
              United States spends 17-19% of GDP on healthcare
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Universal Healthcare</CardTitle>
            <CardDescription>
              Germany, UK, Canada, France spend 9-12% with universal systems
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg">Rising Costs</CardTitle>
            <CardDescription>
              All countries show upward trend in healthcare spending
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardContent>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <MultiSeriesBarChart
              data={energyData}
              title="Renewable Energy Consumption (% of Total)"
              series={energySeries}
              description="Share of renewable energy (solar, wind, hydro, biomass, geothermal) in total final energy consumption. Sweden and Brazil lead due to extensive hydropower, while Germany shows rapid growth in wind and solar."
              source="United Nations Statistical Yearbook (data.un.org)"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg">Hydropower Leaders</CardTitle>
            <CardDescription>
              Sweden (52%) and Brazil (45%) leverage abundant water resources
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg">Rapid Transition</CardTitle>
            <CardDescription>
              Germany and China show fastest growth in wind/solar adoption
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-lg">Developing Potential</CardTitle>
            <CardDescription>
              India's high rate includes traditional biomass alongside modern renewables
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          💡 Key Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Healthcare spending paradox:</strong> The U.S. spends nearly 2x more than other developed nations (17-19% vs 9-12%) but does not have universal coverage or superior health outcomes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">•</span>
            <span><strong>Universal healthcare efficiency:</strong> Countries with single-payer or public systems (UK, Canada, France, Germany) achieve broader coverage at lower GDP percentages.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400">•</span>
            <span><strong>Aging populations:</strong> All developed countries face rising healthcare costs driven by demographic shifts and expensive new treatments/technologies.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 dark:text-green-400">•</span>
            <span><strong>Renewable energy leaders:</strong> Sweden (52%) and Brazil (45%) benefit from extensive hydropower infrastructure built over decades.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 dark:text-orange-400">•</span>
            <span><strong>Solar & wind revolution:</strong> Germany and China show dramatic increases in renewable share through massive investments in solar panels and wind turbines.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">•</span>
            <span><strong>Energy transition challenges:</strong> Despite progress, fossil fuels still dominate global energy (70%+), requiring accelerated renewable deployment to meet climate targets.</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Sources:</strong> United Nations Data (data.un.org) - Health expenditure and Energy statistics.
          Health expenditure includes all spending (public and private) on healthcare goods and services. Renewable energy includes solar, wind, hydropower, modern biomass, geothermal, and marine energy.
          Traditional biomass (wood burning for cooking) is included in some developing country statistics.
        </p>
      </div>
    </div>
  );
}
