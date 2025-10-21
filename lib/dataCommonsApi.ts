import axios from 'axios';

export interface DataCommonsObservation {
  date: string;
  value: number;
}

export interface DataCommonsSeriesResponse {
  facets: Record<string, any>;
  byVariable: Record<string, {
    byEntity: Record<string, {
      orderedFacets: Array<{ facetId: string }>;
    }>;
  }>;
  observations: Array<{
    date: string;
    value: number;
    entity: string;
    variable: string;
  }>;
}

export interface DataCommonsSearchResult {
  statVars: Array<{
    dcid: string;
    name: string;
    description?: string;
  }>;
}

export class DataCommonsApiService {
  private baseUrl = '/api/datacommons'; // Use local Next.js API route

  /**
   * Get statistical variable observations for a specific place
   * @param variable - Statistical variable ID (e.g., "Count_Person", "UnemploymentRate_Person")
   * @param place - Place ID (e.g., "country/USA", "geoId/06" for California)
   * @param options - Optional date range and other parameters
   */
  async getObservations(
    variable: string,
    place: string,
    options?: {
      startDate?: string;
      endDate?: string;
    }
  ): Promise<DataCommonsObservation[]> {
    try {
      const params: any = {
        key: variable,
        entity: place,
      };

      if (options?.startDate) {
        params.startDate = options.startDate;
      }
      if (options?.endDate) {
        params.endDate = options.endDate;
      }

      // Call local API route instead of external API
      const response = await axios.get(`${this.baseUrl}/observation`, {
        params,
      });

      // API route returns transformed data
      const data = response.data;

      if (data.observations && Array.isArray(data.observations)) {
        return data.observations;
      }

      return [];
    } catch (error) {
      console.log(`ℹ️ Data Commons data not available for ${variable}`);
      return []; // Graceful degradation - return empty array
    }
  }

  /**
   * Get multiple variables for a place
   */
  async getMultipleVariables(
    variables: string[],
    place: string,
    options?: {
      startDate?: string;
      endDate?: string;
    }
  ): Promise<Record<string, DataCommonsObservation[]>> {
    try {
      const promises = variables.map((variable) =>
        this.getObservations(variable, place, options)
      );

      const results = await Promise.all(promises);

      return variables.reduce((acc, variable, index) => {
        acc[variable] = results[index];
        return acc;
      }, {} as Record<string, DataCommonsObservation[]>);
    } catch (error) {
      console.error('Error fetching multiple Data Commons variables:', error);
      throw error;
    }
  }

  /**
   * Search for statistical variables
   */
  async searchVariables(query: string): Promise<DataCommonsSearchResult> {
    try {
      const response = await axios.get(`${this.baseUrl}/node`, {
        params: {
          nodes: ['dc/g/Root'],
          property: '->*',
        },
      });

      // This is a simplified search - the actual Data Commons API
      // has more complex search capabilities
      return {
        statVars: [],
      };
    } catch (error) {
      console.error('Error searching Data Commons variables:', error);
      throw error;
    }
  }

  /**
   * Get popular statistical variables for quick access
   */
  getPopularVariables() {
    return {
      population: {
        total: 'Count_Person',
        male: 'Count_Person_Male',
        female: 'Count_Person_Female',
      },
      economy: {
        gdp: 'Amount_EconomicActivity_GrossDomesticProduction_Nominal',
        gdpPerCapita: 'Amount_EconomicActivity_GrossDomesticProduction_PurchasingPowerParity_PerCapita',
        unemployment: 'UnemploymentRate_Person',
      },
      health: {
        lifeExpectancy: 'LifeExpectancy_Person',
        infantMortality: 'Count_Death_0Years_AsFractionOf_Count_BirthEvent',
      },
      education: {
        literacyRate: 'Count_Person_15OrMoreYears_Literate_AsFractionOf_Count_Person_15OrMoreYears',
      },
      environment: {
        co2Emissions: 'Annual_Emissions_CarbonDioxide',
        temperature: 'Mean_Temperature',
      },
    };
  }

  /**
   * Get common place IDs
   */
  getCommonPlaces() {
    return {
      countries: {
        usa: 'country/USA',
        china: 'country/CHN',
        japan: 'country/JPN',
        germany: 'country/DEU',
        uk: 'country/GBR',
        france: 'country/FRA',
        india: 'country/IND',
        canada: 'country/CAN',
      },
      usStates: {
        california: 'geoId/06',
        texas: 'geoId/48',
        florida: 'geoId/12',
        newYork: 'geoId/36',
      },
    };
  }
}

// Create a singleton instance
let dataCommonsApiInstance: DataCommonsApiService | null = null;

export function getDataCommonsApi(): DataCommonsApiService {
  if (!dataCommonsApiInstance) {
    dataCommonsApiInstance = new DataCommonsApiService();
  }
  return dataCommonsApiInstance;
}
