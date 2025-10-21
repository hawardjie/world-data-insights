'use client';

import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  color?: string;
}

export interface DataFiltersProps {
  // Country filter
  countries: FilterOption[];
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;

  // Category/Series filter
  categories?: FilterOption[];
  selectedCategories?: string[];
  onCategoriesChange?: (categories: string[]) => void;

  // Time range filter
  years: number[];
  startYear: number;
  endYear: number;
  onTimeRangeChange: (start: number, end: number) => void;

  // Metric filter
  metrics?: FilterOption[];
  selectedMetric?: string;
  onMetricChange?: (metric: string) => void;
}

export default function DataFilters({
  countries,
  selectedCountries,
  onCountriesChange,
  categories,
  selectedCategories = [],
  onCategoriesChange,
  years,
  startYear,
  endYear,
  onTimeRangeChange,
  metrics,
  selectedMetric,
  onMetricChange,
}: DataFiltersProps) {
  const [countrySearchOpen, setCountrySearchOpen] = React.useState(false);
  const [categorySearchOpen, setCategorySearchOpen] = React.useState(false);

  const toggleCountry = (countryValue: string) => {
    const newSelection = selectedCountries.includes(countryValue)
      ? selectedCountries.filter((c) => c !== countryValue)
      : [...selectedCountries, countryValue];
    onCountriesChange(newSelection);
  };

  const toggleCategory = (categoryValue: string) => {
    if (!onCategoriesChange) return;
    const newSelection = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter((c) => c !== categoryValue)
      : [...selectedCategories, categoryValue];
    onCategoriesChange(newSelection);
  };

  const selectAllCountries = () => {
    onCountriesChange(countries.map((c) => c.value));
  };

  const clearAllCountries = () => {
    onCountriesChange([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Filter Data
      </h3>

      {/* Country Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Countries ({selectedCountries.length} selected)
        </label>
        <div className="flex gap-2 mb-2">
          <button
            onClick={selectAllCountries}
            className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            Select All
          </button>
          <button
            onClick={clearAllCountries}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Clear All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-3">
          {countries.map((country) => (
            <label
              key={country.value}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedCountries.includes(country.value)}
                onChange={() => toggleCountry(country.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {country.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      {categories && onCategoriesChange && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categories ({selectedCategories.length} selected)
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-3">
            {categories.map((category) => (
              <label
                key={category.value}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => toggleCategory(category.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Metric Filter */}
      {metrics && onMetricChange && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Metric
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => onMetricChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {metrics.map((metric) => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Time Range Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Time Range: {startYear} - {endYear}
        </label>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">Start Year</label>
            <input
              type="range"
              min={Math.min(...years)}
              max={Math.max(...years)}
              value={startYear}
              onChange={(e) => onTimeRangeChange(parseInt(e.target.value), endYear)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {startYear}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">End Year</label>
            <input
              type="range"
              min={Math.min(...years)}
              max={Math.max(...years)}
              value={endYear}
              onChange={(e) => onTimeRangeChange(startYear, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {endYear}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Active Filters:</strong>
          <ul className="mt-2 space-y-1">
            <li>• {selectedCountries.length} countries selected</li>
            {categories && <li>• {selectedCategories.length} categories selected</li>}
            <li>• Time range: {endYear - startYear + 1} years</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
