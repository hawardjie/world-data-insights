'use client';

import React, { useState } from 'react';
import { getFredApi } from '@/lib/fredApi';
import { transformToChartData } from '@/utils/dataTransform';
import { exportToCSV, exportToJSON } from '@/utils/dataTransform';
import TimeSeriesLineChart from '@/components/charts/TimeSeriesLineChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Search, Download } from 'lucide-react';

interface SearchPanelProps {
  searchQuery?: string;
}

export default function SearchPanel({ searchQuery: initialQuery = '' }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-search when initialQuery prop changes
  React.useEffect(() => {
    if (initialQuery && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
      handleSearchWithQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchWithQuery = async (query: string) => {
    if (!query.trim()) return;

    setSearching(true);
    setError(null);

    try {
      const fredApi = getFredApi();
      const results = await fredApi.searchSeries(query, {
        limit: 20,
        orderBy: 'popularity',
        sortOrder: 'desc',
      });

      setSearchResults(results.seriess || []);
      setSearching(false);
    } catch (err: any) {
      setError(err.message || 'Failed to search series');
      setSearching(false);
    }
  };

  const handleSearch = () => {
    handleSearchWithQuery(searchQuery);
  };

  const handleSeriesSelect = async (series: any) => {
    setSelectedSeries(series);
    setLoadingChart(true);
    setError(null);

    try {
      const fredApi = getFredApi();
      const observations = await fredApi.getSeriesObservations(series.id, {
        observationStart: '2015-01-01',
      });

      const data = transformToChartData(observations);
      setChartData(data);
      setLoadingChart(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load series data');
      setLoadingChart(false);
    }
  };

  const handleExportCSV = () => {
    if (chartData.length > 0 && selectedSeries) {
      exportToCSV(chartData, `${selectedSeries.id}_data.csv`);
    }
  };

  const handleExportJSON = () => {
    if (chartData.length > 0 && selectedSeries) {
      exportToJSON(
        {
          series: selectedSeries,
          data: chartData,
        },
        `${selectedSeries.id}_data.json`
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Search Economic Series
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Search and explore 800,000+ economic time series from FRED
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for economic series (e.g., GDP, unemployment, inflation, bitcoin)..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
            <CardDescription>Click on a series to visualize its data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((series) => (
                <button
                  key={series.id}
                  onClick={() => handleSeriesSelect(series)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedSeries?.id === series.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {series.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ID: {series.id} | Frequency: {series.frequency} | Units: {series.units}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {series.observation_start} to {series.observation_end}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      Popularity: {series.popularity}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {error && <ErrorMessage message={error} />}

      {selectedSeries && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle>{selectedSeries.title}</CardTitle>
                <CardDescription className="mt-2">
                  Series ID: {selectedSeries.id} | Units: {selectedSeries.units} | Frequency:{' '}
                  {selectedSeries.frequency}
                </CardDescription>
                {selectedSeries.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {selectedSeries.notes.substring(0, 200)}
                    {selectedSeries.notes.length > 200 && '...'}
                  </p>
                )}
              </div>
              {chartData.length > 0 && (
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    CSV
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    JSON
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loadingChart ? (
              <LoadingSpinner />
            ) : (
              <TimeSeriesLineChart
                data={chartData}
                title={selectedSeries.title}
                color="#3b82f6"
                unit={selectedSeries.units_short || selectedSeries.units}
              />
            )}
          </CardContent>
        </Card>
      )}

      {!searching && searchResults.length === 0 && searchQuery && (
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="pt-6">
            <p className="text-center text-gray-700 dark:text-gray-300">
              No results found for "{searchQuery}". Try different search terms.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
