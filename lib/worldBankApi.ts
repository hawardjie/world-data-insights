import axios from 'axios';
import type { WorldBankResponse } from '@/types/worldbank';

class WorldBankApiService {
  /**
   * Get indicator data for a country or region
   */
  async getIndicatorData(
    indicator: string,
    options?: {
      country?: string;
      date?: string; // e.g., "2010:2023" or "2023"
      perPage?: number;
    }
  ): Promise<WorldBankResponse> {
    const params = new URLSearchParams({
      indicator,
      country: options?.country || 'all',
      per_page: String(options?.perPage || 1000),
    });

    if (options?.date) {
      params.append('date', options.date);
    }

    const response = await axios.get<WorldBankResponse>(
      `/api/worldbank/indicator?${params.toString()}`
    );

    return response.data;
  }

  /**
   * Get multiple indicators for comparison
   */
  async getMultipleIndicators(
    indicators: string[],
    options?: {
      country?: string;
      date?: string;
    }
  ): Promise<Record<string, WorldBankResponse>> {
    const results: Record<string, WorldBankResponse> = {};

    for (const indicator of indicators) {
      try {
        results[indicator] = await this.getIndicatorData(indicator, options);
      } catch (error) {
        console.error(`Failed to fetch indicator ${indicator}:`, error);
      }
    }

    return results;
  }
}

let worldBankApiInstance: WorldBankApiService | null = null;

export function getWorldBankApi(): WorldBankApiService {
  if (!worldBankApiInstance) {
    worldBankApiInstance = new WorldBankApiService();
  }
  return worldBankApiInstance;
}
