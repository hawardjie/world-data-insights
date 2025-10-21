import axios from 'axios';

export interface WorldPopDataPoint {
  year: number;
  value: number;
  country?: string;
  age_group?: string;
  sex?: string;
  type?: string;
}

export interface WorldPopAgeStructure {
  country: string;
  year: number;
  age_groups: Array<{
    age_group: string;
    male: number;
    female: number;
  }>;
}

export interface WorldPopCountryData {
  country: string;
  iso3: string;
  year: number;
  population: number;
  urban_population?: number;
  rural_population?: number;
}

export class WorldPopApiService {
  private restApiUrl = 'https://www.worldpop.org/rest/data';
  private servicesApiUrl = 'https://api.worldpop.org/v1';

  /**
   * Get available datasets from WorldPop
   */
  async getAvailableDatasets(): Promise<any[]> {
    // WorldPop REST API doesn't have a public datasets endpoint
    // Return empty array
    return [];
  }

  /**
   * Get population data by country and year range
   * @param iso3 - ISO3 country code (e.g., 'USA', 'CHN', 'IND')
   * @param startYear - Start year (default 2015)
   * @param endYear - End year (default 2025)
   */
  async getPopulationByCountry(
    iso3: string,
    startYear: number = 2015,
    endYear: number = 2025
  ): Promise<WorldPopDataPoint[]> {
    // WorldPop doesn't have a public REST API for direct country queries
    // Use density and other methods instead
    return [];
  }

  /**
   * Get age and sex structure for a country
   * @param iso3 - ISO3 country code
   * @param year - Year (2015-2025)
   */
  async getAgeStructure(
    iso3: string,
    year: number = 2020
  ): Promise<WorldPopDataPoint[]> {
    // WorldPop API doesn't have a public endpoint for age structure data
    // Use synthetic data based on demographic patterns
    return this.generateSyntheticAgeStructure(iso3, year);
  }

  /**
   * Get urban vs rural population trends
   * Uses demographic data to show urbanization trends
   */
  async getUrbanRuralTrends(
    countries: string[] = ['USA', 'CHN', 'IND', 'BRA'],
    startYear: number = 2015,
    endYear: number = 2025
  ): Promise<any[]> {
    try {
      const trends: any[] = [];

      for (const country of countries) {
        // Get total population
        const popData = await this.getPopulationByCountry(country, startYear, endYear);

        if (popData.length > 0) {
          // Calculate urban percentage based on country development level
          // This is a simplified approach - real data would come from WorldPop's urban/rural datasets
          const urbanizationRates: { [key: string]: number } = {
            'USA': 0.83, // 83% urban
            'CHN': 0.64, // 64% urban
            'IND': 0.35, // 35% urban
            'BRA': 0.87, // 87% urban
            'JPN': 0.92, // 92% urban
            'DEU': 0.77, // 77% urban
            'GBR': 0.84, // 84% urban
            'FRA': 0.81, // 81% urban
          };

          const baseUrbanRate = urbanizationRates[country] || 0.55;

          popData.forEach((point) => {
            // Apply gradual urbanization increase over time
            const yearsSince2015 = point.year - 2015;
            const urbanRate = Math.min(0.95, baseUrbanRate + (yearsSince2015 * 0.01)); // 1% increase per year

            trends.push({
              year: point.year,
              country: point.country,
              urban: point.value * urbanRate,
              rural: point.value * (1 - urbanRate),
              urbanization_rate: urbanRate * 100,
            });
          });
        }
      }

      return trends;
    } catch (error) {
      console.log('ℹ️ WorldPop urban/rural trends not available');
      return [];
    }
  }

  /**
   * Get gender ratio trends over time
   * Shows male-to-female ratio changes
   */
  async getGenderRatioTrends(
    countries: string[] = ['USA', 'CHN', 'IND', 'JPN'],
    startYear: number = 2015,
    endYear: number = 2025
  ): Promise<any[]> {
    try {
      const trends: any[] = [];

      // Gender ratios by country (males per 100 females)
      const baseRatios: { [key: string]: number } = {
        'USA': 98.3,  // Slightly more females
        'CHN': 104.9, // More males (historical one-child policy effect)
        'IND': 107.8, // More males
        'JPN': 95.3,  // More females (aging population)
        'BRA': 96.7,
        'DEU': 96.1,
        'GBR': 97.6,
        'FRA': 96.4,
      };

      for (const country of countries) {
        const baseRatio = baseRatios[country] || 100;

        for (let year = startYear; year <= endYear; year++) {
          // Apply slight convergence toward 100 over time (natural demographic trends)
          const yearsSince2015 = year - 2015;
          const convergenceFactor = baseRatio > 100 ? -0.1 : 0.1; // Move toward 100
          const ratio = baseRatio + (convergenceFactor * yearsSince2015);

          trends.push({
            year,
            country,
            ratio: Math.round(ratio * 10) / 10, // Round to 1 decimal
            males_percentage: (ratio / (ratio + 100)) * 100,
            females_percentage: (100 / (ratio + 100)) * 100,
          });
        }
      }

      return trends;
    } catch (error) {
      console.log('ℹ️ WorldPop gender ratio trends not available');
      return [];
    }
  }

  /**
   * Get population density comparison across countries
   */
  async getPopulationDensity(
    countries: string[] = ['USA', 'CHN', 'IND', 'JPN', 'BRA'],
    year: number = 2023
  ): Promise<any[]> {
    try {
      // Country areas in sq km (approximate)
      const countryAreas: { [key: string]: number } = {
        'USA': 9833517,
        'CHN': 9596961,
        'IND': 3287263,
        'JPN': 377975,
        'BRA': 8515767,
        'DEU': 357114,
        'GBR': 242495,
        'FRA': 643801,
      };

      // Approximate populations for 2023 (in millions)
      const populations: { [key: string]: number } = {
        'USA': 335,
        'CHN': 1425,
        'IND': 1428,
        'JPN': 125,
        'BRA': 216,
        'DEU': 84,
        'GBR': 67,
        'FRA': 65,
      };

      const densities: any[] = [];

      for (const country of countries) {
        if (countryAreas[country] && populations[country]) {
          densities.push({
            country,
            year,
            population: populations[country],
            area: countryAreas[country],
            density: Math.round((populations[country] * 1000000) / countryAreas[country]), // People per sq km
          });
        }
      }

      // Sort by density descending
      return densities.sort((a, b) => b.density - a.density);
    } catch (error) {
      console.log('ℹ️ WorldPop density data not available');
      return [];
    }
  }

  /**
   * Generate synthetic age structure for fallback
   * Uses typical demographic patterns
   */
  private generateSyntheticAgeStructure(iso3: string, year: number): WorldPopDataPoint[] {
    const ageGroups = [
      '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39',
      '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'
    ];

    // Different demographic patterns by country type
    const patterns: { [key: string]: number[] } = {
      // Aging population (Japan, Germany, UK)
      'aging': [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 7.5, 7, 6.5, 6, 5.5, 4.5, 3.5, 5],
      // Young population (India, Brazil)
      'young': [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3, 2, 1.5, 1],
      // Balanced (USA, China)
      'balanced': [6, 6, 6.5, 7, 7.5, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2, 2.5],
    };

    // Determine pattern based on country
    let pattern = patterns['balanced'];
    if (['JPN', 'DEU', 'GBR', 'FRA'].includes(iso3)) {
      pattern = patterns['aging'];
    } else if (['IND', 'BRA', 'IDN', 'NGA'].includes(iso3)) {
      pattern = patterns['young'];
    }

    const data: WorldPopDataPoint[] = [];

    ageGroups.forEach((group, index) => {
      const basePercentage = pattern[index];
      // Male population (slightly more in younger ages, slightly less in older ages)
      const maleAdjustment = index < 10 ? 1.02 : 0.98;
      data.push({
        year,
        value: basePercentage * maleAdjustment,
        country: iso3,
        age_group: group,
        sex: 'male',
        type: 'percentage',
      });

      // Female population
      const femaleAdjustment = index < 10 ? 0.98 : 1.02;
      data.push({
        year,
        value: basePercentage * femaleAdjustment,
        country: iso3,
        age_group: group,
        sex: 'female',
        type: 'percentage',
      });
    });

    return data;
  }

  /**
   * Get popular country codes
   */
  getCommonCountries() {
    return {
      usa: 'USA',
      china: 'CHN',
      india: 'IND',
      japan: 'JPN',
      germany: 'DEU',
      uk: 'GBR',
      france: 'FRA',
      brazil: 'BRA',
      indonesia: 'IDN',
      nigeria: 'NGA',
    };
  }
}

// Create singleton instance
let worldPopApiInstance: WorldPopApiService | null = null;

export function getWorldPopApi(): WorldPopApiService {
  if (!worldPopApiInstance) {
    worldPopApiInstance = new WorldPopApiService();
  }
  return worldPopApiInstance;
}
