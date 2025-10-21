import type { WorldBankResponse, WorldBankIndicatorValue } from '@/types/worldbank';
import type { ChartDataPoint, MultiSeriesDataPoint } from '@/types/fred';

/**
 * Transform World Bank data to simple chart format
 */
export function transformWBToChartData(response: WorldBankResponse): ChartDataPoint[] {
  return response.data
    .filter(item => item.value !== null)
    .map(item => ({
      date: item.date,
      value: item.value as number,
      label: item.country.value,
    }))
    .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date ascending
}

/**
 * Transform multiple World Bank indicators to multi-series chart format
 */
export function transformWBToMultiSeries(
  indicatorData: Record<string, WorldBankResponse>,
  seriesNames: Record<string, string>
): MultiSeriesDataPoint[] {
  // Get all unique dates across all indicators
  const allDates = new Set<string>();
  Object.values(indicatorData).forEach(response => {
    response.data.forEach(item => {
      if (item.value !== null) {
        allDates.add(item.date);
      }
    });
  });

  const sortedDates = Array.from(allDates).sort();

  // Build multi-series data
  return sortedDates.map(date => {
    const dataPoint: MultiSeriesDataPoint = { date };

    Object.entries(indicatorData).forEach(([indicatorId, response]) => {
      const seriesName = seriesNames[indicatorId] || indicatorId;
      const value = response.data.find(item => item.date === date)?.value;

      if (value !== null && value !== undefined) {
        dataPoint[seriesName] = value;
      }
    });

    return dataPoint;
  });
}

/**
 * Transform World Bank data for country comparison
 */
export function transformWBForCountryComparison(
  responses: WorldBankIndicatorValue[]
): ChartDataPoint[] {
  return responses
    .filter(item => item.value !== null)
    .map(item => ({
      date: item.countryiso3code,
      value: item.value as number,
      label: item.country.value,
    }))
    .sort((a, b) => (b.value || 0) - (a.value || 0)); // Sort by value descending
}
