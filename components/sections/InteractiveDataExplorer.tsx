'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import MultiSeriesLineChart from '@/components/charts/MultiSeriesLineChart';
import CategoryBarChart from '@/components/charts/CategoryBarChart';
import DataFilters, { FilterOption } from '@/components/ui/DataFilters';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChartSkeleton } from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { UN_DATASETS, getAllCategories } from '@/lib/unDataDownloader';
import { Download, Filter, TrendingUp, BarChart3 } from 'lucide-react';

interface ParsedDataPoint {
  country: string;
  year: number;
  value: number;
  series?: string;
  [key: string]: any;
}

export default function InteractiveDataExplorer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);

  // Dataset selection
  const [selectedDataset, setSelectedDataset] = useState('wb-population-total');
  const [selectedCategory, setSelectedCategory] = useState('Population');

  // Filters
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [startYear, setStartYear] = useState(2010);
  const [endYear, setEndYear] = useState(2025);

  // Chart type
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Get datasets for current category
  const datasetsInCategory = useMemo(() => {
    return UN_DATASETS.filter((ds) => ds.category === selectedCategory);
  }, [selectedCategory]);

  const currentDataset = useMemo(() => {
    return UN_DATASETS.find((ds) => ds.id === selectedDataset);
  }, [selectedDataset]);

  // Load data from UN CSV or World Bank API
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const dataset = UN_DATASETS.find((ds) => ds.id === selectedDataset);
      if (!dataset) {
        throw new Error('Dataset not found');
      }

      // Handle World Bank datasets
      if (dataset.source === 'WorldBank' && dataset.worldBankIndicator) {
        console.log(`📊 Loading ${dataset.name} from World Bank API...`);
        await loadWorldBankData(dataset);
        return;
      }

      // Handle UN CSV datasets
      console.log(`📊 Loading ${dataset.name} data from UN Data...`);

      // Fetch CSV data from UN Data through our API proxy
      const apiUrl = `/api/un-data/csv?url=${encodeURIComponent(dataset.csvUrl!)}&datasetId=${encodeURIComponent(dataset.id)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }

      const csvText = await response.text();

      // Parse CSV with PapaParse
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            console.log(`✅ Loaded ${results.data.length} rows from UN Data`);
            processData(results.data);
          } else {
            throw new Error('No data available in CSV file');
          }
        },
        error: (error: any) => {
          console.error('CSV parsing error:', error);
          throw new Error(`Failed to parse CSV: ${error.message}`);
        },
      });
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data');
      setLoading(false);
    }
  };

  // Load data from World Bank API
  const loadWorldBankData = async (dataset: any) => {
    try {
      const indicator = dataset.worldBankIndicator;
      const date = '2000:2025'; // Request wide date range including 2024-2025

      const response = await fetch(
        `/api/worldbank/indicator?indicator=${indicator}&country=all&date=${date}&per_page=10000`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch World Bank data');
      }

      const result = await response.json();

      if (!result.data || result.data.length === 0) {
        throw new Error('No data available from World Bank');
      }

      // Transform World Bank data to match UN CSV format
      const transformedData = result.data.map((item: any) => ({
        Country: item.country?.value || item.countryiso3code,
        country: item.country?.value || item.countryiso3code,
        Year: item.date,
        year: item.date,
        Value: item.value,
        value: item.value,
      }));

      console.log(`✅ Loaded ${transformedData.length} rows from World Bank`);
      processData(transformedData);
    } catch (err: any) {
      console.error('Error loading World Bank data:', err);
      setError(err.message || 'Failed to load World Bank data');
      setLoading(false);
    }
  };

  const processData = (data: any[]) => {
    setRawData(data);

    // Extract unique countries and years
    const countries = new Set<string>();
    const years = new Set<number>();

    data.forEach((row) => {
      if (row.Country || row.country || row.Region) {
        countries.add(row.Country || row.country || row.Region);
      }
      if (row.Year || row.year) {
        const year = parseInt(row.Year || row.year);
        if (!isNaN(year)) {
          years.add(year);
        }
      }
    });

    const countryList = Array.from(countries).sort();
    const yearList = Array.from(years).sort();

    // Ensure year range extends to 2025 even if data doesn't have those years yet
    const minYear = yearList.length > 0 ? Math.min(yearList[0], 2000) : 2000;
    const maxYear = Math.max(yearList.length > 0 ? yearList[yearList.length - 1] : 2025, 2025);
    const extendedYearList = [];
    for (let year = minYear; year <= maxYear; year++) {
      extendedYearList.push(year);
    }

    setAvailableCountries(countryList);
    setAvailableYears(extendedYearList);

    // Auto-select first 5 countries
    if (selectedCountries.length === 0) {
      setSelectedCountries(countryList.slice(0, 5));
    }

    // Auto-set year range
    if (yearList.length > 0) {
      setStartYear(Math.max(yearList[0], 2010));
      setEndYear(Math.max(yearList[yearList.length - 1], 2025));
    }

    setLoading(false);
  };

  // Load data when dataset changes
  useEffect(() => {
    loadData();
  }, [selectedDataset]);

  // Prepare chart data based on filters
  const chartData = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];

    const filtered = rawData.filter((row) => {
      const country = row.Country || row.country || row.Region;
      const year = parseInt(row.Year || row.year);

      if (!country || !year) return false;
      if (!selectedCountries.includes(country)) return false;
      if (year < startYear || year > endYear) return false;

      return true;
    });

    if (chartType === 'line') {
      // Group by year for line chart
      const yearMap = new Map<number, any>();

      filtered.forEach((row) => {
        const year = parseInt(row.Year || row.year);
        const country = row.Country || row.country || row.Region;
        const value = parseFloat(row.Value || row.value || '0');

        if (!yearMap.has(year)) {
          yearMap.set(year, { date: year.toString() });
        }

        const yearData = yearMap.get(year);
        yearData[country] = value;
      });

      return Array.from(yearMap.values()).sort((a, b) =>
        parseInt(a.date) - parseInt(b.date)
      );
    } else {
      // Aggregate for bar chart (latest year)
      const latestYear = Math.max(...availableYears.filter(y => y >= startYear && y <= endYear));
      const latestData = filtered.filter(
        (row) => parseInt(row.Year || row.year) === latestYear
      );

      return latestData.map((row) => ({
        category: row.Country || row.country || row.Region,
        value: parseFloat(row.Value || row.value || '0'),
      }));
    }
  }, [rawData, selectedCountries, startYear, endYear, chartType, availableYears]);

  // Country filter options
  const countryOptions: FilterOption[] = availableCountries.map((country) => ({
    value: country,
    label: country,
  }));

  // Category options
  const categoryOptions: FilterOption[] = getAllCategories().map((cat) => ({
    value: cat,
    label: cat,
  }));

  // Series for line chart
  const countrySeries = selectedCountries.map((country, index) => {
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
    return {
      id: country,
      name: country,
      color: colors[index % colors.length],
    };
  });

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Interactive Data Explorer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore 40+ datasets from UN and World Bank with interactive filters. World Bank datasets include 2024-2025 data.
          Select category, dataset, countries, and time range to customize your analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1 space-y-4">
          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Dataset Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    // Auto-select first dataset in new category
                    const firstDataset = UN_DATASETS.find(
                      (ds) => ds.category === e.target.value
                    );
                    if (firstDataset) {
                      setSelectedDataset(firstDataset.id);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {getAllCategories().map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dataset
                </label>
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {datasetsInCategory.map((ds) => (
                    <option key={ds.id} value={ds.id}>
                      {ds.name}
                    </option>
                  ))}
                </select>
              </div>

              {currentDataset && (
                <div className="text-xs text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  {currentDataset.description}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filters */}
          {!loading && availableCountries.length > 0 && (
            <DataFilters
              countries={countryOptions}
              selectedCountries={selectedCountries}
              onCountriesChange={setSelectedCountries}
              years={availableYears}
              startYear={startYear}
              endYear={endYear}
              onTimeRangeChange={(start, end) => {
                setStartYear(start);
                setEndYear(end);
              }}
            />
          )}
        </div>

        {/* Main Content - Chart */}
        <div className="lg:col-span-3 space-y-4">
          {/* Chart Type Selector */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {currentDataset?.name || 'Select a dataset'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCountries.length} countries, {endYear - startYear + 1} years
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType('line')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                  chartType === 'line'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                Line Chart
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                  chartType === 'bar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Bar Chart
              </button>
            </div>
          </div>

          {/* Chart Display */}
          <Card>
            <CardContent>
              {loading ? (
                <ChartSkeleton />
              ) : chartData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No data available for the selected filters
                  </p>
                </div>
              ) : chartType === 'line' ? (
                <MultiSeriesLineChart
                  data={chartData}
                  title={currentDataset?.name || 'Data Visualization'}
                  series={countrySeries}
                  description={`Showing ${selectedCountries.length} countries from ${startYear} to ${endYear}`}
                  source={
                    currentDataset?.source === 'WorldBank'
                      ? 'World Bank Open Data (data.worldbank.org)'
                      : 'United Nations Statistical Yearbook (data.un.org)'
                  }
                />
              ) : (
                <CategoryBarChart
                  data={chartData}
                  title={`${currentDataset?.name || 'Data'} (${endYear})`}
                  description={`Latest year data for ${selectedCountries.length} countries`}
                  colors={countrySeries.map((s) => s.color)}
                  source={
                    currentDataset?.source === 'WorldBank'
                      ? 'World Bank Open Data (data.worldbank.org)'
                      : 'United Nations Statistical Yearbook (data.un.org)'
                  }
                />
              )}
            </CardContent>
          </Card>

          {/* Data Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg">Data Points</CardTitle>
                <CardDescription>
                  {rawData.length.toLocaleString()} total records
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg">Coverage</CardTitle>
                <CardDescription>
                  {availableCountries.length} countries/regions
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-lg">Time Span</CardTitle>
                <CardDescription>
                  {availableYears.length > 0
                    ? `${Math.min(...availableYears)} - ${Math.max(...availableYears)}`
                    : 'N/A'}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Data Sources:</strong> Live data fetched from United Nations Statistical Yearbook (data.un.org) and World Bank Open Data (data.worldbank.org).
          World Bank datasets include 2024-2025 data. Use the filters above to explore different countries,
          time periods, and metrics. Switch between line charts (trends over time) and bar charts (latest year comparison).
        </p>
      </div>
    </div>
  );
}
