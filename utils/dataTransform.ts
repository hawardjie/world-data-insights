import type {
  FredSeriesObservations,
  ChartDataPoint,
  MultiSeriesDataPoint,
  DateRange,
} from '@/types/fred';
import { format, subMonths, subYears, parseISO } from 'date-fns';

/**
 * Transform FRED observations to chart data points
 */
export function transformToChartData(
  observations: FredSeriesObservations
): ChartDataPoint[] {
  return observations.observations
    .filter((obs) => obs.value !== '.')
    .map((obs) => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }));
}

/**
 * Transform multiple series to multi-series chart data
 */
export function transformToMultiSeriesData(
  seriesData: Record<string, FredSeriesObservations>,
  seriesNames: Record<string, string>
): MultiSeriesDataPoint[] {
  const allDates = new Set<string>();
  const dataMap = new Map<string, Record<string, number>>();

  // Collect all dates and values
  Object.entries(seriesData).forEach(([seriesId, data]) => {
    data.observations
      .filter((obs) => obs.value !== '.')
      .forEach((obs) => {
        allDates.add(obs.date);
        if (!dataMap.has(obs.date)) {
          dataMap.set(obs.date, {});
        }
        const seriesName = seriesNames[seriesId] || seriesId;
        dataMap.get(obs.date)![seriesName] = parseFloat(obs.value);
      });
  });

  // Convert to array and sort by date
  return Array.from(allDates)
    .sort()
    .map((date) => ({
      date,
      ...(dataMap.get(date) || {}),
    }));
}

/**
 * Get date range for API queries
 */
export function getDateRangeForQuery(range: DateRange): {
  start: string;
  end: string;
} {
  const end = new Date();
  let start: Date;

  switch (range) {
    case '1m':
      start = subMonths(end, 1);
      break;
    case '3m':
      start = subMonths(end, 3);
      break;
    case '6m':
      start = subMonths(end, 6);
      break;
    case '1y':
      start = subYears(end, 1);
      break;
    case '5y':
      start = subYears(end, 5);
      break;
    case '10y':
      start = subYears(end, 10);
      break;
    case 'max':
      start = new Date('1900-01-01');
      break;
  }

  return {
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  };
}

/**
 * Format large numbers for display
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (Math.abs(value) >= 1e12) {
    return `${(value / 1e12).toFixed(decimals)}T`;
  }
  if (Math.abs(value) >= 1e9) {
    return `${(value / 1e9).toFixed(decimals)}B`;
  }
  if (Math.abs(value) >= 1e6) {
    return `${(value / 1e6).toFixed(decimals)}M`;
  }
  if (Math.abs(value) >= 1e3) {
    return `${(value / 1e3).toFixed(decimals)}K`;
  }
  return value.toFixed(decimals);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, formatStr: string = 'MMM yyyy'): string {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
}

/**
 * Calculate percentage change
 */
export function calculatePercentChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Export data to CSV
 */
export function exportToCSV(
  data: ChartDataPoint[] | MultiSeriesDataPoint[],
  filename: string
): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => row[header as keyof typeof row]).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Export data to JSON
 */
export function exportToJSON(data: any, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
