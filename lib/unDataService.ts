/**
 * UN Data Service
 * Generates synthetic data for all 35+ UN datasets
 * Used by Interactive Data Explorer
 */

import { UN_DATASETS } from './unDataDownloader';

export interface DataRow {
  Country: string;
  Year: number;
  Value: number;
  Series?: string;
  Unit?: string;
}

const COUNTRIES = [
  'United States', 'China', 'India', 'Japan', 'Germany', 'United Kingdom',
  'France', 'Brazil', 'Italy', 'Canada', 'South Korea', 'Russia',
  'Spain', 'Australia', 'Mexico', 'Indonesia', 'Netherlands', 'Saudi Arabia',
  'Turkey', 'Switzerland', 'Poland', 'Sweden', 'Belgium', 'Argentina',
  'Thailand', 'Nigeria', 'Austria', 'Norway', 'United Arab Emirates', 'Israel',
  'Ireland', 'Singapore', 'Denmark', 'Finland', 'Chile', 'Portugal',
  'Rwanda', 'Kenya', 'Egypt', 'South Africa'
];

/**
 * Generate synthetic data for a specific dataset
 */
export function generateDataForDataset(datasetId: string, startYear: number = 2010, endYear: number = 2023): DataRow[] {
  const dataset = UN_DATASETS.find(ds => ds.id === datasetId);
  if (!dataset) return [];

  const data: DataRow[] = [];

  // Different data generation strategies based on dataset type
  switch (datasetId) {
    case 'population-total':
      return generatePopulationData(startYear, endYear);
    case 'population-density':
      return generatePopulationDensityData(startYear, endYear);
    case 'population-growth':
      return generatePopulationGrowthData(startYear, endYear);
    case 'migrants-refugees':
      return generateMigrantData(startYear, endYear);
    case 'gdp-total':
      return generateGDPData(startYear, endYear);
    case 'gdp-per-capita':
      return generateGDPPerCapitaData(startYear, endYear);
    case 'education-enrollment':
      return generateEducationEnrollmentData(startYear, endYear);
    case 'education-teachers':
      return generateTeachersData(startYear, endYear);
    case 'education-expenditure':
      return generateEducationExpenditureData(startYear, endYear);
    case 'labour-force':
      return generateLabourForceData(startYear, endYear);
    case 'unemployment':
      return generateUnemploymentData(startYear, endYear);
    case 'cpi':
      return generateCPIData(startYear, endYear);
    case 'food-price-index':
      return generateFoodPriceData(startYear, endYear);
    case 'trade-balance':
      return generateTradeBalanceData(startYear, endYear);
    case 'energy-production':
      return generateEnergyData(startYear, endYear);
    case 'women-parliament':
      return generateWomenParliamentData(startYear, endYear);
    case 'gender-parity-education':
      return generateGenderParityData(startYear, endYear);
    case 'life-expectancy':
      return generateLifeExpectancyData(startYear, endYear);
    case 'health-expenditure':
      return generateHealthExpenditureData(startYear, endYear);
    case 'rd-expenditure':
      return generateRDExpenditureData(startYear, endYear);
    case 'patent-applications':
      return generatePatentData(startYear, endYear);
    case 'co2-emissions':
      return generateCO2Data(startYear, endYear);
    case 'protected-areas':
      return generateProtectedAreasData(startYear, endYear);
    case 'water-resources':
      return generateWaterData(startYear, endYear);
    case 'threatened-species':
      return generateSpeciesData(startYear, endYear);
    case 'internet-usage':
      return generateInternetData(startYear, endYear);
    case 'tourist-arrivals':
      return generateTourismData(startYear, endYear);
    case 'intentional-homicide':
      return generateCrimeData(startYear, endYear);
    case 'exchange-rates':
      return generateExchangeRateData(startYear, endYear);
    case 'interest-rates':
      return generateInterestRateData(startYear, endYear);
    default:
      return generateGenericTrendData(startYear, endYear, datasetId);
  }
}

// Population data generators
function generatePopulationData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const basePopulations: Record<string, number> = {
    'China': 1400000000, 'India': 1380000000, 'United States': 331000000,
    'Indonesia': 273000000, 'Brazil': 212000000, 'Nigeria': 206000000,
    'Russia': 146000000, 'Japan': 126000000, 'Mexico': 128000000,
    'Germany': 83000000, 'United Kingdom': 67000000, 'France': 65000000
  };

  COUNTRIES.forEach(country => {
    const basePopulation = basePopulations[country] || Math.random() * 100000000 + 10000000;
    for (let year = startYear; year <= endYear; year++) {
      const growth = (year - startYear) * 0.01; // 1% annual growth
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(basePopulation * (1 + growth)),
        Series: 'Total Population',
        Unit: 'persons'
      });
    }
  });

  return data;
}

function generatePopulationDensityData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const densities: Record<string, number> = {
    'Singapore': 8000, 'Bangladesh': 1200, 'South Korea': 530, 'India': 460,
    'Netherlands': 510, 'Japan': 330, 'United Kingdom': 280, 'Germany': 240,
    'Italy': 200, 'China': 150, 'France': 120, 'United States': 36,
    'Brazil': 25, 'Russia': 9, 'Canada': 4, 'Australia': 3
  };

  COUNTRIES.forEach(country => {
    const density = densities[country] || Math.random() * 200 + 50;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(density * (1 + (year - startYear) * 0.005)),
        Series: 'Population Density',
        Unit: 'persons per km²'
      });
    }
  });

  return data;
}

function generatePopulationGrowthData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];

  COUNTRIES.forEach(country => {
    const baseGrowth = ['Nigeria', 'Kenya', 'India'].includes(country) ? 2.5 :
                       ['China', 'Japan', 'Germany'].includes(country) ? 0.2 : 1.0;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: baseGrowth + (Math.random() - 0.5) * 0.5,
        Series: 'Population Growth Rate',
        Unit: '% annual'
      });
    }
  });

  return data;
}

function generateMigrantData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseMigrantPercent: Record<string, number> = {
    'United Arab Emirates': 88, 'Saudi Arabia': 37, 'Australia': 28,
    'Canada': 21, 'United States': 15, 'Germany': 13, 'United Kingdom': 12
  };

  COUNTRIES.forEach(country => {
    const basePercent = baseMigrantPercent[country] || Math.random() * 10;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: basePercent + (year - startYear) * 0.3,
        Series: 'International Migrants',
        Unit: '% of population'
      });
    }
  });

  return data;
}

// Economic data generators
function generateGDPData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseGDP: Record<string, number> = {
    'United States': 21000, 'China': 15000, 'Japan': 5000, 'Germany': 4000,
    'United Kingdom': 2800, 'India': 2700, 'France': 2700, 'Italy': 2000
  };

  COUNTRIES.forEach(country => {
    const gdp = baseGDP[country] || Math.random() * 1000;
    for (let year = startYear; year <= endYear; year++) {
      const growth = (year - startYear) * 0.03;
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(gdp * (1 + growth)),
        Series: 'GDP',
        Unit: 'billion USD'
      });
    }
  });

  return data;
}

function generateGDPPerCapitaData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseGDPPC: Record<string, number> = {
    'Switzerland': 80000, 'Norway': 75000, 'United States': 65000, 'Singapore': 60000,
    'Germany': 48000, 'Canada': 46000, 'Australia': 55000, 'Japan': 40000
  };

  COUNTRIES.forEach(country => {
    const gdppc = baseGDPPC[country] || Math.random() * 30000 + 5000;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(gdppc * (1 + (year - startYear) * 0.02)),
        Series: 'GDP per capita',
        Unit: 'USD'
      });
    }
  });

  return data;
}

// Education data generators
function generateEducationEnrollmentData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const baseRate = ['Germany', 'Japan', 'United States'].includes(country) ? 95 : 85;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.min(100, baseRate + (year - startYear) * 0.5),
        Series: 'Primary Enrollment',
        Unit: '% gross'
      });
    }
  });
  return data;
}

function generateTeachersData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const base = Math.random() * 1000000 + 100000;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(base * (1 + (year - startYear) * 0.015)),
        Series: 'Teaching Staff',
        Unit: 'persons'
      });
    }
  });
  return data;
}

function generateEducationExpenditureData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const basePercent = ['Norway', 'Denmark', 'Finland'].includes(country) ? 7 : 5;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: basePercent + (year - startYear) * 0.05,
        Series: 'Education Expenditure',
        Unit: '% of GDP'
      });
    }
  });
  return data;
}

// Labour & Employment generators
function generateLabourForceData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const baseRate = Math.random() * 20 + 60; // 60-80%
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: baseRate + (Math.random() - 0.5) * 2,
        Series: 'Labour Force Participation',
        Unit: '% of population'
      });
    }
  });
  return data;
}

function generateUnemploymentData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    let baseRate = Math.random() * 8 + 3; // 3-11%
    for (let year = startYear; year <= endYear; year++) {
      // COVID spike in 2020
      const covidImpact = year === 2020 ? 4 : year === 2021 ? 2 : 0;
      data.push({
        Country: country,
        Year: year,
        Value: baseRate + covidImpact + (Math.random() - 0.5),
        Series: 'Unemployment Rate',
        Unit: '% of labour force'
      });
    }
  });
  return data;
}

// Price & Trade generators
function generateCPIData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    let cpi = 100;
    for (let year = startYear; year <= endYear; year++) {
      cpi *= (1 + (Math.random() * 0.04 + 0.01)); // 1-5% inflation
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(cpi * 10) / 10,
        Series: 'Consumer Price Index',
        Unit: 'Index (2010=100)'
      });
    }
  });
  return data;
}

function generateFoodPriceData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    let index = 100;
    for (let year = startYear; year <= endYear; year++) {
      index *= (1 + (Math.random() * 0.06 + 0.02)); // 2-8% inflation (higher than CPI)
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(index * 10) / 10,
        Series: 'Food Price Index',
        Unit: 'Index (2010=100)'
      });
    }
  });
  return data;
}

function generateTradeBalanceData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const isExporter = ['Germany', 'China', 'Japan'].includes(country);
    const baseBalance = isExporter ? Math.random() * 200 + 50 : -(Math.random() * 100 + 20);
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(baseBalance * (1 + (year - startYear) * 0.02)),
        Series: 'Trade Balance',
        Unit: 'billion USD'
      });
    }
  });
  return data;
}

// Health & Social generators
function generateLifeExpectancyData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseLE: Record<string, number> = {
    'Japan': 84, 'Switzerland': 83, 'Singapore': 83, 'Spain': 83,
    'France': 82, 'Canada': 82, 'Australia': 82, 'United States': 79,
    'China': 76, 'Brazil': 75, 'Russia': 72, 'India': 69, 'Nigeria': 54
  };

  COUNTRIES.forEach(country => {
    const le = baseLE[country] || Math.random() * 20 + 65;
    for (let year = startYear; year <= endYear; year++) {
      const covidDrop = year === 2020 ? -0.5 : year === 2021 ? -0.3 : 0;
      data.push({
        Country: country,
        Year: year,
        Value: le + (year - startYear) * 0.1 + covidDrop,
        Series: 'Life Expectancy',
        Unit: 'years'
      });
    }
  });
  return data;
}

function generateHealthExpenditureData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseHealth: Record<string, number> = {
    'United States': 17, 'Germany': 11.5, 'France': 11.3, 'Japan': 10.9,
    'Canada': 10.8, 'United Kingdom': 9.8
  };

  COUNTRIES.forEach(country => {
    const health = baseHealth[country] || Math.random() * 5 + 5;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: health + (year - startYear) * 0.15,
        Series: 'Health Expenditure',
        Unit: '% of GDP'
      });
    }
  });
  return data;
}

// Environment & Technology generators
function generateCO2Data(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const isDeveloped = ['United States', 'Germany', 'Japan'].includes(country);
    let emissions = isDeveloped ? Math.random() * 5 + 8 : Math.random() * 4 + 2;
    for (let year = startYear; year <= endYear; year++) {
      emissions *= isDeveloped ? 0.98 : 1.02; // Developed decreasing, developing increasing
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(emissions * 10) / 10,
        Series: 'CO2 Emissions',
        Unit: 'tons per capita'
      });
    }
  });
  return data;
}

function generateRDExpenditureData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseRD: Record<string, number> = {
    'Israel': 4.9, 'South Korea': 4.5, 'Switzerland': 3.4, 'Japan': 3.3,
    'Germany': 3.0, 'United States': 2.8
  };

  COUNTRIES.forEach(country => {
    const rd = baseRD[country] || Math.random() * 1.5 + 0.5;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: rd + (year - startYear) * 0.05,
        Series: 'R&D Expenditure',
        Unit: '% of GDP'
      });
    }
  });
  return data;
}

function generatePatentData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const isInnovative = ['United States', 'China', 'Japan', 'Germany', 'South Korea'].includes(country);
    const base = isInnovative ? Math.random() * 200000 + 50000 : Math.random() * 10000 + 1000;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(base * (1 + (year - startYear) * 0.05)),
        Series: 'Patent Applications',
        Unit: 'applications'
      });
    }
  });
  return data;
}

// Gender & Social generators
function generateWomenParliamentData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseRates: Record<string, number> = {
    'Rwanda': 56, 'Sweden': 46, 'Finland': 42, 'Norway': 41,
    'Germany': 33, 'Spain': 39, 'United Kingdom': 32, 'France': 39,
    'United States': 17, 'Japan': 10, 'India': 11
  };

  COUNTRIES.forEach(country => {
    const rate = baseRates[country] || Math.random() * 25 + 15;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.min(50, rate + (year - startYear) * 0.8),
        Series: 'Women in Parliament',
        Unit: '% of seats'
      });
    }
  });
  return data;
}

function generateGenderParityData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const baseIndex = Math.random() * 0.2 + 0.85; // 0.85-1.05
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.min(1.05, baseIndex + (year - startYear) * 0.01),
        Series: 'Gender Parity Index',
        Unit: 'ratio'
      });
    }
  });
  return data;
}

// Other generators
function generateEnergyData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const baseEnergy = Math.random() * 10000 + 1000;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(baseEnergy * (1 + (year - startYear) * 0.02)),
        Series: 'Energy Production',
        Unit: 'thousand TOE'
      });
    }
  });
  return data;
}

function generateProtectedAreasData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const basePercent = Math.random() * 15 + 5;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: basePercent + (year - startYear) * 0.2,
        Series: 'Protected Areas',
        Unit: '% of territory'
      });
    }
  });
  return data;
}

function generateWaterData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const baseWithdrawal = Math.random() * 500 + 200;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(baseWithdrawal * (1 + (year - startYear) * 0.01)),
        Series: 'Water Withdrawal',
        Unit: 'm³ per capita'
      });
    }
  });
  return data;
}

function generateSpeciesData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const baseSpecies = Math.round(Math.random() * 200 + 50);
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: baseSpecies + Math.round((year - startYear) * 2),
        Series: 'Threatened Species',
        Unit: 'number'
      });
    }
  });
  return data;
}

function generateInternetData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const isDeveloped = ['Norway', 'Sweden', 'Denmark', 'Switzerland', 'United States'].includes(country);
    const basePercent = isDeveloped ? 85 : 40;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.min(98, basePercent + (year - startYear) * 2),
        Series: 'Internet Users',
        Unit: '% of population'
      });
    }
  });
  return data;
}

function generateTourismData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const baseTourists: Record<string, number> = {
    'France': 89, 'Spain': 83, 'United States': 79, 'China': 65, 'Italy': 64
  };

  COUNTRIES.forEach(country => {
    const base = baseTourists[country] || Math.random() * 30 + 5;
    for (let year = startYear; year <= endYear; year++) {
      let value = base;
      if (year < 2020) {
        value *= (1 + (year - startYear) * 0.025);
      } else if (year === 2020) {
        value *= 0.25; // COVID drop
      } else if (year === 2021) {
        value *= 0.4;
      } else {
        value *= 0.9;
      }
      data.push({
        Country: country,
        Year: year,
        Value: Math.round(value * 10) / 10,
        Series: 'Tourist Arrivals',
        Unit: 'millions'
      });
    }
  });
  return data;
}

function generateCrimeData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const isDangerous = ['Brazil', 'South Africa', 'Mexico'].includes(country);
    const baseRate = isDangerous ? Math.random() * 20 + 20 : Math.random() * 3 + 0.5;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: Math.round((baseRate + (Math.random() - 0.5) * 2) * 10) / 10,
        Series: 'Intentional Homicide',
        Unit: 'per 100,000'
      });
    }
  });
  return data;
}

function generateExchangeRateData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  const currencies = ['EUR', 'JPY', 'GBP', 'CNY', 'INR', 'BRL', 'RUB', 'KRW'];
  const baseRates: Record<string, number> = {
    'EUR': 0.85, 'JPY': 110, 'GBP': 0.75, 'CNY': 6.5,
    'INR': 70, 'BRL': 4.0, 'RUB': 65, 'KRW': 1100
  };

  currencies.forEach((currency, idx) => {
    const country = COUNTRIES[idx] || 'Country';
    const base = baseRates[currency] || 1;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: base * (1 + (Math.random() - 0.5) * 0.1),
        Series: `Exchange Rate (${currency})`,
        Unit: `${currency} per USD`
      });
    }
  });
  return data;
}

function generateInterestRateData(startYear: number, endYear: number): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    let rate = Math.random() * 3 + 1; // 1-4%
    for (let year = startYear; year <= endYear; year++) {
      // Low rates 2010-2021, rising 2022+
      if (year >= 2022) {
        rate += 0.5;
      }
      data.push({
        Country: country,
        Year: year,
        Value: Math.max(0.1, Math.min(6, rate + (Math.random() - 0.5) * 0.5)),
        Series: 'Interest Rate',
        Unit: '% per annum'
      });
    }
  });
  return data;
}

// Generic trend generator for any other dataset
function generateGenericTrendData(startYear: number, endYear: number, datasetId: string): DataRow[] {
  const data: DataRow[] = [];
  COUNTRIES.forEach(country => {
    const base = Math.random() * 100 + 10;
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        Country: country,
        Year: year,
        Value: base + (year - startYear) * (Math.random() * 2),
        Series: datasetId,
        Unit: 'units'
      });
    }
  });
  return data;
}
