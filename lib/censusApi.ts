import axios from 'axios';

export interface CensusDataPoint {
  date: string;
  value: number;
  name?: string;
  state?: string;
}

export interface CensusApiResponse {
  data: any[][];
  headers: string[];
}

export class CensusApiService {
  private baseUrl = 'https://api.census.gov/data';
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_CENSUS_API_KEY;
  }

  /**
   * Get data from the American Community Survey (ACS)
   * @param year - Survey year (e.g., 2021)
   * @param dataset - Dataset type ('acs5', 'acs1', 'acs3')
   * @param variables - Variable codes to fetch (e.g., 'B01001_001E' for total population)
   * @param geography - Geographic level ('us:*', 'state:*', 'county:*')
   */
  async getACSData(
    year: number,
    dataset: 'acs5' | 'acs1' | 'acs3',
    variables: string[],
    geography: string = 'us:*'
  ): Promise<CensusDataPoint[]> {
    try {
      const variablesList = ['NAME', ...variables].join(',');
      const [geoType, geoFilter] = geography.split(':');

      const params: any = {
        get: variablesList,
        for: `${geoType}:${geoFilter}`,
      };

      if (this.apiKey) {
        params.key = this.apiKey;
      }

      const response = await axios.get(
        `${this.baseUrl}/${year}/acs/${dataset}`,
        { params }
      );

      const [headers, ...rows] = response.data;

      return rows.map((row: any[]) => {
        const dataPoint: CensusDataPoint = {
          date: year.toString(),
          value: parseFloat(row[1]) || 0,
          name: row[0],
        };

        // Add additional variables if present
        variables.slice(1).forEach((variable, index) => {
          (dataPoint as any)[variable] = parseFloat(row[index + 2]) || 0;
        });

        return dataPoint;
      });
    } catch (error) {
      console.error(`Error fetching Census ACS data:`, error);
      throw error;
    }
  }

  /**
   * Get time series data from Economic Indicators
   */
  async getEconomicIndicators(
    indicator: string,
    options?: {
      startYear?: number;
      endYear?: number;
    }
  ): Promise<CensusDataPoint[]> {
    try {
      // Census Economic Indicators API endpoint
      const params: any = {
        get: indicator,
        for: 'us:*',
      };

      if (this.apiKey) {
        params.key = this.apiKey;
      }

      if (options?.startYear) {
        params.time = `from ${options.startYear}`;
      }

      const response = await axios.get(
        `${this.baseUrl}/timeseries/eits/resconst`,
        { params }
      );

      const [headers, ...rows] = response.data;

      return rows.map((row: any[]) => ({
        date: row[headers.indexOf('time')],
        value: parseFloat(row[1]) || 0,
      }));
    } catch (error) {
      console.error(`Error fetching Census economic indicators:`, error);
      throw error;
    }
  }

  /**
   * Get population estimates
   * Note: PEP API endpoints vary by year. This tries multiple approaches.
   */
  async getPopulationEstimates(
    year: number = 2021,
    geography: string = 'state:*'
  ): Promise<CensusDataPoint[]> {
    // Try multiple endpoint formats as Census API structure varies by year
    const endpointAttempts = [
      // Format 1: Current PEP format for recent years
      `${this.baseUrl}/${year}/pep/population`,
      // Format 2: Vintage-specific format
      `${this.baseUrl}/${year}/pep/charagegroups`,
      // Format 3: Try ACS 5-year estimates as fallback (more reliable)
      year >= 2020 ? `${this.baseUrl}/${year}/acs/acs5` : null,
    ].filter(Boolean) as string[];

    for (const endpoint of endpointAttempts) {
      try {
        const params: any = {};

        if (this.apiKey) {
          params.key = this.apiKey;
        }

        // Adjust params based on endpoint type
        if (endpoint.includes('/acs/acs5')) {
          // ACS format
          params.get = 'NAME,B01003_001E'; // Total population
          params.for = geography === 'state:*' ? 'state:*' : geography;
        } else {
          // PEP format
          params.get = 'NAME,POP';
          params.for = geography;
        }

        const response = await axios.get(endpoint, {
          params,
          validateStatus: (status) => status < 500, // Don't throw on 404
        });

        if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
          const [headers, ...rows] = response.data;

          return rows.map((row: any[]) => ({
            date: year.toString(),
            value: parseFloat(row[1]) || 0,
            name: row[0],
          }));
        }
      } catch (error: any) {
        // Silently continue to next attempt (expected behavior for trying multiple endpoints)
        continue;
      }
    }

    // All attempts failed - return empty array (graceful degradation)
    console.log(`ℹ️ Census population data not available for ${year}`);
    return [];
  }

  /**
   * Get international trade data
   */
  async getTradeData(
    options?: {
      year?: number;
      month?: number;
      commodity?: string;
    }
  ): Promise<CensusDataPoint[]> {
    try {
      const year = options?.year || new Date().getFullYear() - 1;
      const month = options?.month || 12;

      const params: any = {
        get: 'CTY_NAME,ALL_VAL_MO,ALL_VAL_YR',
        time: `${year}-${String(month).padStart(2, '0')}`,
      };

      if (this.apiKey) {
        params.key = this.apiKey;
      }

      const response = await axios.get(
        `${this.baseUrl}/timeseries/intltrade/exports/porths`,
        { params }
      );

      const [headers, ...rows] = response.data;

      return rows.map((row: any[]) => ({
        date: `${year}-${String(month).padStart(2, '0')}`,
        value: parseFloat(row[1]) || 0,
        name: row[0],
      }));
    } catch (error) {
      console.error(`Error fetching Census trade data:`, error);
      throw error;
    }
  }

  /**
   * Search for available variables in a dataset
   */
  async getVariables(
    year: number,
    dataset: string
  ): Promise<Record<string, any>> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/${year}/${dataset}/variables.json`
      );

      return response.data.variables;
    } catch (error) {
      console.error(`Error fetching Census variables:`, error);
      throw error;
    }
  }

  /**
   * Get popular Census variable codes for quick access
   */
  getPopularVariables() {
    return {
      population: {
        total: 'B01001_001E',
        male: 'B01001_002E',
        female: 'B01001_026E',
        median_age: 'B01002_001E',
      },
      housing: {
        total_units: 'B25001_001E',
        occupied: 'B25002_002E',
        vacant: 'B25002_003E',
        median_value: 'B25077_001E',
        median_rent: 'B25058_001E',
      },
      income: {
        median_household: 'B19013_001E',
        median_family: 'B19113_001E',
        per_capita: 'B19301_001E',
      },
      employment: {
        labor_force: 'B23025_002E',
        employed: 'B23025_004E',
        unemployed: 'B23025_005E',
      },
      education: {
        high_school_or_higher: 'B15003_017E',
        bachelors_or_higher: 'B15003_022E',
      },
    };
  }

  /**
   * Helper to build geography strings
   */
  buildGeography(type: 'us' | 'state' | 'county', code?: string): string {
    if (type === 'us') return 'us:*';
    if (type === 'state') return code ? `state:${code}` : 'state:*';
    if (type === 'county') return code ? `county:${code}` : 'county:*';
    return 'us:*';
  }
}

// Create a singleton instance
let censusApiInstance: CensusApiService | null = null;

export function getCensusApi(apiKey?: string): CensusApiService {
  if (!censusApiInstance) {
    censusApiInstance = new CensusApiService(apiKey);
  }
  return censusApiInstance;
}
