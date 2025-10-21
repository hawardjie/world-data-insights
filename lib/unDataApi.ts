import axios from 'axios';

export interface UNDataPoint {
  date: string;
  value: number;
  country?: string;
  indicator?: string;
  unit?: string;
}

export interface UNComtradeData {
  dataset: string;
  data: Array<{
    period: string;
    reporterDesc: string;
    partnerDesc: string;
    tradeValue: number;
    commodityDesc: string;
  }>;
}

export interface UNPopulationData {
  country: string;
  year: number;
  population: number;
  medianAge?: number;
  fertilityRate?: number;
}

export class UNDataApiService {
  private baseUrl = 'https://data.un.org/ws/rest/data';
  private comtradeUrl = 'https://comtradeapi.un.org/public/v1';
  private populationUrl = 'https://population.un.org/dataportalapi/api/v1';
  private apiKey: string | undefined;
  private apiToken: string | undefined;

  constructor() {
    // Load from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_UN_API_KEY;
    this.apiToken = process.env.NEXT_PUBLIC_UN_API_TOKEN;
  }

  /**
   * Get authentication headers for UN API calls
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    // Try bearer token first (more common for modern APIs)
    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }
    // Fallback to API key if provided
    else if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
      // Some APIs use different header names, try multiple
      headers['api-key'] = this.apiKey;
    }

    return headers;
  }

  /**
   * Get data from UNdata database
   * @param dataflow - Dataset identifier
   * @param indicators - Indicator codes
   * @param countries - Country codes
   */
  async getUNData(
    dataflow: string,
    indicators: string[],
    countries: string[] = [],
    options?: {
      startYear?: number;
      endYear?: number;
    }
  ): Promise<UNDataPoint[]> {
    try {
      const params: any = {
        format: 'json',
      };

      // Build dimension filters
      if (indicators.length > 0) {
        params.indicator = indicators.join('+');
      }
      if (countries.length > 0) {
        params.ref_area = countries.join('+');
      }
      if (options?.startYear) {
        params.startPeriod = options.startYear;
      }
      if (options?.endYear) {
        params.endPeriod = options.endYear;
      }

      const response = await axios.get(
        `${this.baseUrl}/${dataflow}`,
        { params }
      );

      // Parse UNdata response format
      const data = response.data;
      const observations: UNDataPoint[] = [];

      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((item: any) => {
          observations.push({
            date: item.TIME_PERIOD || item.period,
            value: parseFloat(item.OBS_VALUE || item.value) || 0,
            country: item.REF_AREA || item.country,
            indicator: item.INDICATOR || item.indicator,
          });
        });
      }

      return observations.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error(`Error fetching UN data for ${dataflow}:`, error);
      throw error;
    }
  }

  /**
   * Get trade data from UN Comtrade
   * @param reporterCode - Reporting country code
   * @param partnerCode - Partner country code ('all' for world)
   * @param year - Year or year range
   */
  async getComtradeData(
    reporterCode: string = 'USA',
    partnerCode: string = 'all',
    year: number = new Date().getFullYear() - 1
  ): Promise<UNDataPoint[]> {
    try {
      // UN Comtrade API endpoint
      const params = {
        reporterCode,
        partnerCode,
        period: year.toString(),
        flowCode: 'M', // Imports and Exports
        format: 'json',
      };

      const response = await axios.get(
        `${this.comtradeUrl}/get/C/A/HS`,
        { params }
      );

      const data = response.data;
      const observations: UNDataPoint[] = [];

      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((item: any) => {
          observations.push({
            date: item.period || year.toString(),
            value: parseFloat(item.TradeValue || item.tradeValue) || 0,
            country: item.reporterDesc,
          });
        });
      }

      return observations;
    } catch (error) {
      console.error('Error fetching UN Comtrade data:', error);
      // Return empty array on error since Comtrade often has access issues
      return [];
    }
  }

  /**
   * Get population data from UN Population Division
   * Note: UN Population API has unstable endpoints. Returns empty array on failure.
   */
  async getPopulationData(
    countryCodes: string[] = ['900'], // 900 = World
    indicators: string[] = ['49'], // 49 = Total Population
    options?: {
      startYear?: number;
      endYear?: number;
    }
  ): Promise<UNDataPoint[]> {
    try {
      const startYear = options?.startYear || 2000;
      const endYear = options?.endYear || new Date().getFullYear();

      // Try multiple UN API endpoints as they change frequently
      // Note: UN APIs often return 401 (Unauthorized) or change their authentication requirements
      // We handle these gracefully by trying multiple endpoints and returning empty array if all fail
      const endpointAttempts = [
        // Attempt 1: Data Portal API v1 with query params
        {
          url: `${this.populationUrl}/data/indicators`,
          params: {
            locations: countryCodes.join(','),
            indicators: indicators.join(','),
            startYear,
            endYear,
            format: 'json',
          }
        },
        // Attempt 2: Alternative data portal format (path-based)
        // Note: This often returns 401 but we try it anyway as fallback
        {
          url: `https://population.un.org/dataportalapi/api/v1/data/indicators/${indicators[0]}/locations/${countryCodes[0]}/start/${startYear}/end/${endYear}`,
          params: {}
        },
      ];

      for (const attempt of endpointAttempts) {
        try {
          // Get authentication headers
          const authHeaders = this.getAuthHeaders();

          // Suppress console errors for failed requests (only if no auth provided)
          const shouldSuppressErrors = !this.apiKey && !this.apiToken;
          const originalConsoleError = console.error;
          if (shouldSuppressErrors) {
            console.error = () => {}; // Temporarily disable console.error
          }

          const response = await axios.get(attempt.url, {
            params: attempt.params,
            headers: authHeaders, // Include authentication headers
            timeout: 5000, // 5 second timeout (faster fail)
            validateStatus: () => true, // Accept all status codes to prevent axios from throwing
          }).finally(() => {
            if (shouldSuppressErrors) {
              console.error = originalConsoleError; // Restore console.error
            }
          });

          // Skip if unauthorized, forbidden, or not found
          if (response.status === 401 || response.status === 403 || response.status === 404) {
            continue; // Try next endpoint silently
          }

          // Skip if not successful
          if (response.status !== 200) {
            continue;
          }

          const data = response.data;
          const observations: UNDataPoint[] = [];

          // Handle different response formats
          if (data.data && Array.isArray(data.data)) {
            data.data.forEach((item: any) => {
              observations.push({
                date: item.timeLabel || item.year?.toString() || item.timeMid?.toString(),
                value: parseFloat(item.value) || 0,
                country: item.location || item.locationName,
                indicator: item.indicator || item.indicatorName,
              });
            });
          } else if (Array.isArray(data)) {
            data.forEach((item: any) => {
              if (item.value && item.year) {
                observations.push({
                  date: item.year?.toString(),
                  value: parseFloat(item.value) || 0,
                  country: item.location,
                  indicator: item.indicator,
                });
              }
            });
          }

          if (observations.length > 0) {
            return observations.sort((a, b) => a.date.localeCompare(b.date));
          }
        } catch (endpointError: any) {
          // Silently continue to next endpoint
          continue;
        }
      }

      // All attempts failed - return empty array (graceful degradation)
      console.log('ℹ️ UN Population data not available (API endpoints may have changed)');
      return [];
    } catch (error) {
      // Catch-all for unexpected errors
      console.log('ℹ️ UN Population data not available');
      return [];
    }
  }

  /**
   * Get SDG (Sustainable Development Goals) indicators
   */
  async getSDGData(
    goal: number,
    target: string,
    indicator: string,
    countries: string[] = []
  ): Promise<UNDataPoint[]> {
    try {
      const params: any = {
        goal,
        target,
        indicator,
        format: 'json',
      };

      if (countries.length > 0) {
        params.countries = countries.join(',');
      }

      const response = await axios.get(
        'https://unstats.un.org/sdgapi/v1/sdg/Indicator/Data',
        { params }
      );

      const data = response.data;
      const observations: UNDataPoint[] = [];

      if (data && Array.isArray(data)) {
        data.forEach((item: any) => {
          observations.push({
            date: item.timePeriod || item.year?.toString(),
            value: parseFloat(item.value) || 0,
            country: item.geoAreaName,
            indicator: item.seriesDescription,
          });
        });
      }

      return observations;
    } catch (error) {
      console.error('Error fetching UN SDG data:', error);
      throw error;
    }
  }

  /**
   * Get popular UN indicators for quick access
   */
  getPopularIndicators() {
    return {
      population: {
        total: '49', // Total Population
        growth: '58', // Population Growth Rate
        density: '52', // Population Density
        urban: '71', // Urban Population
      },
      economy: {
        gdp: 'NY.GDP.MKTP.CD', // GDP (current US$)
        gdpGrowth: 'NY.GDP.MKTP.KD.ZG', // GDP growth
        gni: 'NY.GNP.PCAP.CD', // GNI per capita
      },
      health: {
        lifeExpectancy: '68', // Life Expectancy at Birth
        infantMortality: '60', // Infant Mortality Rate
        maternalMortality: '61', // Maternal Mortality Ratio
      },
      education: {
        literacy: 'SE.ADT.LITR.ZS', // Adult Literacy Rate
        schoolEnrollment: 'SE.PRM.ENRR', // Primary School Enrollment
      },
      environment: {
        co2Emissions: 'EN.ATM.CO2E.PC', // CO2 emissions per capita
        forestArea: 'AG.LND.FRST.ZS', // Forest area (% of land)
      },
      sdg: {
        noPoverty: { goal: 1, target: '1.1', indicator: '1.1.1' },
        zeroHunger: { goal: 2, target: '2.1', indicator: '2.1.1' },
        goodHealth: { goal: 3, target: '3.1', indicator: '3.1.1' },
      },
    };
  }

  /**
   * Get common country codes for UN databases
   */
  getCommonCountries() {
    return {
      world: '900',
      usa: '840',
      china: '156',
      india: '356',
      japan: '392',
      germany: '276',
      uk: '826',
      france: '250',
      brazil: '076',
      canada: '124',
    };
  }

  /**
   * Helper to search for available datasets
   */
  async searchDataflows(keyword: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/dataflow/all`,
        {
          params: { format: 'json' },
        }
      );

      const dataflows = response.data.dataflow || [];
      return dataflows.filter((df: any) =>
        df.name?.toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching UN dataflows:', error);
      return [];
    }
  }
}

// Create a singleton instance
let unDataApiInstance: UNDataApiService | null = null;

export function getUNDataApi(): UNDataApiService {
  if (!unDataApiInstance) {
    unDataApiInstance = new UNDataApiService();
  }
  return unDataApiInstance;
}
