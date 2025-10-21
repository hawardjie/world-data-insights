import axios from 'axios';
import type { FredSeriesObservations, FredSeriesSearchResult, FredSeries } from '@/types/fred';

export class FredApiService {
  /**
   * Get observations for a specific series via proxy API
   */
  async getSeriesObservations(
    seriesId: string,
    options?: {
      observationStart?: string;
      observationEnd?: string;
      units?: string;
      frequency?: string;
      aggregationMethod?: string;
    }
  ): Promise<FredSeriesObservations> {
    try {
      const params = new URLSearchParams({
        series_id: seriesId,
      });

      if (options?.observationStart) {
        params.append('observation_start', options.observationStart);
      }
      if (options?.observationEnd) {
        params.append('observation_end', options.observationEnd);
      }
      if (options?.units) {
        params.append('units', options.units);
      }
      if (options?.frequency) {
        params.append('frequency', options.frequency);
      }
      if (options?.aggregationMethod) {
        params.append('aggregation_method', options.aggregationMethod);
      }

      const response = await axios.get<FredSeriesObservations>(
        `/api/fred/series/observations?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error(`Error fetching series ${seriesId}:`, error);
      throw error;
    }
  }

  /**
   * Get information about a specific series via proxy API
   */
  async getSeriesInfo(seriesId: string): Promise<FredSeries> {
    try {
      const params = new URLSearchParams({
        series_id: seriesId,
      });

      const response = await axios.get(
        `/api/fred/series/info?${params.toString()}`
      );

      return response.data.seriess[0];
    } catch (error) {
      console.error(`Error fetching series info for ${seriesId}:`, error);
      throw error;
    }
  }

  /**
   * Search for series via proxy API
   */
  async searchSeries(
    searchText: string,
    options?: {
      limit?: number;
      offset?: number;
      orderBy?: string;
      sortOrder?: 'asc' | 'desc';
      filterVariable?: string;
      filterValue?: string;
    }
  ): Promise<FredSeriesSearchResult> {
    try {
      const params = new URLSearchParams({
        search_text: searchText,
        limit: (options?.limit || 100).toString(),
        offset: (options?.offset || 0).toString(),
      });

      if (options?.orderBy) {
        params.append('order_by', options.orderBy);
      }
      if (options?.sortOrder) {
        params.append('sort_order', options.sortOrder);
      }
      if (options?.filterVariable) {
        params.append('filter_variable', options.filterVariable);
      }
      if (options?.filterValue) {
        params.append('filter_value', options.filterValue);
      }

      const response = await axios.get<FredSeriesSearchResult>(
        `/api/fred/series/search?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error(`Error searching series:`, error);
      throw error;
    }
  }

  /**
   * Get multiple series observations in parallel
   */
  async getMultipleSeriesObservations(
    seriesIds: string[],
    options?: {
      observationStart?: string;
      observationEnd?: string;
      units?: string;
      frequency?: string;
      aggregationMethod?: string;
    }
  ): Promise<Record<string, FredSeriesObservations>> {
    try {
      const promises = seriesIds.map((id) =>
        this.getSeriesObservations(id, options)
      );

      const results = await Promise.all(promises);

      return seriesIds.reduce((acc, id, index) => {
        acc[id] = results[index];
        return acc;
      }, {} as Record<string, FredSeriesObservations>);
    } catch (error) {
      console.error('Error fetching multiple series:', error);
      throw error;
    }
  }
}

// Create a singleton instance
let fredApiInstance: FredApiService | null = null;

export function getFredApi(): FredApiService {
  if (!fredApiInstance) {
    fredApiInstance = new FredApiService();
  }
  return fredApiInstance;
}
