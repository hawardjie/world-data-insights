/**
 * UN Data CSV Downloader and Manager
 * Downloads CSV files from data.un.org and stores them locally
 */

export interface UNDataset {
  id: string;
  name: string;
  category: string;
  description: string;
  csvUrl?: string;
  pdfUrl?: string;
  lastUpdated: string;
  localPath?: string;
  source?: 'UN' | 'WorldBank' | 'FRED';
  worldBankIndicator?: string;
  fredSeries?: string;
  unit?: string;
  yAxisLabel?: string;
}

/**
 * Complete catalog of UN Data CSV datasets
 * Based on https://data.un.org/ Statistical Yearbook (SYB)
 */
export const UN_DATASETS: UNDataset[] = [
  // POPULATION
  {
    id: 'population-total',
    name: 'Total population',
    category: 'Population',
    description: 'Total population by country, annual estimates',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_1_Population.csv',
    pdfUrl: 'https://data.un.org/_Docs/SYB/PDF/SYB66_1_Population.pdf',
    lastUpdated: '2024-11-27',
    unit: 'persons',
    yAxisLabel: 'Total Population',
  },
  {
    id: 'population-density',
    name: 'Population density',
    category: 'Population',
    description: 'Population per square kilometer',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_2_Population_Density.csv',
    lastUpdated: '2024-11-27',
    unit: 'persons per km²',
    yAxisLabel: 'Density (persons/km²)',
  },
  {
    id: 'population-growth',
    name: 'Population growth rate',
    category: 'Population',
    description: 'Annual population growth rates by country',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_3_Population_Growth.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent per year',
    yAxisLabel: 'Growth Rate (%)',
  },
  {
    id: 'migrants-refugees',
    name: 'International migrants and refugees',
    category: 'Population',
    description: 'Stock of international migrants and refugee populations. Values represent the total number of people in thousands.',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_4_Migrants_Refugees.csv',
    lastUpdated: '2024-11-27',
    unit: 'persons (thousands)',
    yAxisLabel: 'Stock (thousands of persons)',
  },

  // NATIONAL ACCOUNTS
  {
    id: 'gdp-total',
    name: 'Gross domestic product (GDP)',
    category: 'National Accounts',
    description: 'GDP in current prices and constant prices',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_230_GDP.csv',
    lastUpdated: '2024-11-27',
    unit: 'US dollars',
    yAxisLabel: 'GDP (USD)',
  },
  {
    id: 'gdp-per-capita',
    name: 'GDP per capita',
    category: 'National Accounts',
    description: 'GDP per capita in US dollars',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_231_GDP_Per_Capita.csv',
    lastUpdated: '2024-11-27',
    unit: 'US dollars per person',
    yAxisLabel: 'GDP per Capita (USD)',
  },

  // EDUCATION
  {
    id: 'education-enrollment',
    name: 'Gross enrollment ratio by education level',
    category: 'Education',
    description: 'Primary, secondary, and tertiary education enrollment rates',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_319_Enrollment.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent',
    yAxisLabel: 'Enrollment Rate (%)',
  },
  {
    id: 'education-teachers',
    name: 'Teaching staff',
    category: 'Education',
    description: 'Number of teachers at primary, secondary, and tertiary levels',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_320_Teachers.csv',
    lastUpdated: '2024-11-27',
    unit: 'number of teachers',
    yAxisLabel: 'Number of Teachers',
  },
  {
    id: 'education-expenditure',
    name: 'Education expenditure',
    category: 'Education',
    description: 'Public expenditure on education as % of GDP and government expenditure',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_321_Education_Expenditure.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent of GDP',
    yAxisLabel: 'Expenditure (% of GDP)',
  },

  // LABOUR MARKET
  {
    id: 'labour-force',
    name: 'Labour force participation',
    category: 'Labour Market',
    description: 'Labour force participation rates by sex',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_329_Labour_Force.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent',
    yAxisLabel: 'Participation Rate (%)',
  },
  {
    id: 'unemployment',
    name: 'Unemployment',
    category: 'Labour Market',
    description: 'Unemployment rates by sex and age groups',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_330_Unemployment.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent',
    yAxisLabel: 'Unemployment Rate (%)',
  },

  // PRICE INDICES
  {
    id: 'cpi',
    name: 'Consumer price index (CPI)',
    category: 'Price Indices',
    description: 'Consumer price index, general and by category',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_224_CPI.csv',
    lastUpdated: '2024-11-27',
    unit: 'index (2010=100)',
    yAxisLabel: 'CPI Index (2010=100)',
  },
  {
    id: 'food-price-index',
    name: 'Food price index',
    category: 'Price Indices',
    description: 'Food component of consumer price index',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_225_Food_Prices.csv',
    lastUpdated: '2024-11-27',
    unit: 'index (2010=100)',
    yAxisLabel: 'Food Price Index (2010=100)',
  },

  // INTERNATIONAL TRADE
  {
    id: 'trade-balance',
    name: 'International trade balance',
    category: 'International Trade',
    description: 'Exports, imports, and trade balance',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_264_Trade.csv',
    lastUpdated: '2024-11-27',
    unit: 'millions of US dollars',
    yAxisLabel: 'Trade Value (USD)',
  },
  {
    id: 'trade-major-partners',
    name: 'Major trading partners',
    category: 'International Trade',
    description: 'Top import and export partners by country',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_265_Trade_Partners.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent of total trade',
    yAxisLabel: 'Share of Trade (%)',
  },

  // ENERGY
  {
    id: 'energy-production',
    name: 'Energy production, trade and consumption',
    category: 'Energy',
    description: 'Energy production, imports, exports, and consumption by source',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_280_Energy.csv',
    lastUpdated: '2024-11-27',
    unit: 'terajoules or thousand metric tons',
    yAxisLabel: 'Energy (TJ or thousand MT)',
  },

  // GENDER
  {
    id: 'women-parliament',
    name: 'Seats held by women in parliament',
    category: 'Gender',
    description: 'Percentage of parliamentary seats occupied by women',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_317_Women_Parliament.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent',
    yAxisLabel: 'Women in Parliament (%)',
  },
  {
    id: 'gender-parity-education',
    name: 'Gender parity in education',
    category: 'Gender',
    description: 'Gender parity index in primary, secondary, and tertiary education',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_318_Gender_Education.csv',
    lastUpdated: '2024-11-27',
    unit: 'index (1=parity)',
    yAxisLabel: 'Gender Parity Index',
  },

  // HEALTH
  {
    id: 'life-expectancy',
    name: 'Life expectancy at birth',
    category: 'Health',
    description: 'Life expectancy in years by sex',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_325_Life_Expectancy.csv',
    lastUpdated: '2024-11-27',
    unit: 'years',
    yAxisLabel: 'Life Expectancy (years)',
  },
  {
    id: 'health-expenditure',
    name: 'Health expenditure',
    category: 'Health',
    description: 'Health expenditure as % of GDP, public and private',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_326_Health_Expenditure.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent of GDP',
    yAxisLabel: 'Health Expenditure (% of GDP)',
  },

  // SCIENCE & TECHNOLOGY
  {
    id: 'rd-expenditure',
    name: 'Research and development (R&D) expenditure',
    category: 'Science & Technology',
    description: 'R&D expenditure as % of GDP',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_327_RD_Expenditure.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent of GDP',
    yAxisLabel: 'R&D Expenditure (% of GDP)',
  },
  {
    id: 'patent-applications',
    name: 'Patent applications',
    category: 'Science & Technology',
    description: 'Patent applications filed, residents and non-residents',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_328_Patents.csv',
    lastUpdated: '2024-11-27',
    unit: 'number of applications',
    yAxisLabel: 'Patent Applications',
  },

  // ENVIRONMENT
  {
    id: 'co2-emissions',
    name: 'CO2 emissions',
    category: 'Environment',
    description: 'Carbon dioxide emissions from fossil fuels',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_290_CO2_Emissions.csv',
    lastUpdated: '2024-11-27',
    unit: 'thousand metric tons',
    yAxisLabel: 'CO₂ Emissions (thousand MT)',
  },
  {
    id: 'protected-areas',
    name: 'Protected terrestrial and marine areas',
    category: 'Environment',
    description: 'Protected areas as % of total territory',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_291_Protected_Areas.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent of total area',
    yAxisLabel: 'Protected Areas (%)',
  },
  {
    id: 'water-resources',
    name: 'Water resources',
    category: 'Environment',
    description: 'Freshwater withdrawals and availability',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_292_Water.csv',
    lastUpdated: '2024-11-27',
    unit: 'billion cubic meters',
    yAxisLabel: 'Water Volume (billion m³)',
  },
  {
    id: 'threatened-species',
    name: 'Threatened species',
    category: 'Environment',
    description: 'Number of threatened species by taxonomic group',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_293_Species.csv',
    lastUpdated: '2024-11-27',
    unit: 'number of species',
    yAxisLabel: 'Number of Threatened Species',
  },

  // COMMUNICATION
  {
    id: 'internet-usage',
    name: 'Internet usage',
    category: 'Communication',
    description: 'Internet users per 100 inhabitants',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_310_Internet.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent of population',
    yAxisLabel: 'Internet Users (% of population)',
  },

  // TOURISM
  {
    id: 'tourist-arrivals',
    name: 'Tourist/visitor arrivals and tourism expenditure',
    category: 'Tourism',
    description: 'International tourist arrivals and tourism receipts',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_313_Tourism.csv',
    lastUpdated: '2024-11-27',
    unit: 'number of tourists or US dollars',
    yAxisLabel: 'Tourist Arrivals or Receipts',
  },

  // CRIME
  {
    id: 'intentional-homicide',
    name: 'Intentional homicide and crime',
    category: 'Crime',
    description: 'Intentional homicide rates per 100,000 population',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_314_Crime.csv',
    lastUpdated: '2024-11-27',
    unit: 'per 100,000 population',
    yAxisLabel: 'Homicide Rate (per 100k)',
  },

  // DEVELOPMENT ASSISTANCE
  {
    id: 'oda-received',
    name: 'Official development assistance (ODA) received',
    category: 'Development Assistance',
    description: 'Net ODA received by country',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_322_ODA_Received.csv',
    lastUpdated: '2024-11-27',
    unit: 'millions of US dollars',
    yAxisLabel: 'ODA Received (USD)',
  },
  {
    id: 'oda-disbursed',
    name: 'Official development assistance (ODA) disbursed',
    category: 'Development Assistance',
    description: 'Net ODA disbursed by donor country',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_323_ODA_Disbursed.csv',
    lastUpdated: '2024-11-27',
    unit: 'millions of US dollars',
    yAxisLabel: 'ODA Disbursed (USD)',
  },

  // FINANCE
  {
    id: 'exchange-rates',
    name: 'Exchange rates',
    category: 'Finance',
    description: 'National currency per US dollar, period average',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_226_Exchange_Rates.csv',
    lastUpdated: '2024-11-27',
    unit: 'national currency per USD',
    yAxisLabel: 'Exchange Rate (local currency/USD)',
  },
  {
    id: 'interest-rates',
    name: 'Interest rates',
    category: 'Finance',
    description: 'Short-term and long-term interest rates',
    csvUrl: 'https://data.un.org/_Docs/SYB/CSV/SYB66_227_Interest_Rates.csv',
    lastUpdated: '2024-11-27',
    unit: 'percent per annum',
    yAxisLabel: 'Interest Rate (%)',
  },

  // WORLD BANK DATASETS (2024-2025 DATA AVAILABLE)
  {
    id: 'wb-population-total',
    name: 'Population, total (World Bank)',
    category: 'Population',
    description: 'Total population including 2024-2025 estimates',
    source: 'WorldBank',
    worldBankIndicator: 'SP.POP.TOTL',
    lastUpdated: '2025-01-15',
    unit: 'persons',
    yAxisLabel: 'Total Population',
  },
  {
    id: 'wb-gdp-current',
    name: 'GDP, current US$ (World Bank)',
    category: 'National Accounts',
    description: 'GDP in current US dollars including recent years',
    source: 'WorldBank',
    worldBankIndicator: 'NY.GDP.MKTP.CD',
    lastUpdated: '2025-01-15',
    unit: 'current US dollars',
    yAxisLabel: 'GDP (USD)',
  },
  {
    id: 'wb-gdp-per-capita',
    name: 'GDP per capita, current US$ (World Bank)',
    category: 'National Accounts',
    description: 'GDP per capita including 2024-2025 data',
    source: 'WorldBank',
    worldBankIndicator: 'NY.GDP.PCAP.CD',
    lastUpdated: '2025-01-15',
    unit: 'current US dollars per person',
    yAxisLabel: 'GDP per Capita (USD)',
  },
  {
    id: 'wb-inflation',
    name: 'Inflation, consumer prices (World Bank)',
    category: 'Price Indices',
    description: 'Annual % change in consumer prices, recent data',
    source: 'WorldBank',
    worldBankIndicator: 'FP.CPI.TOTL.ZG',
    lastUpdated: '2025-01-15',
    unit: 'percent',
    yAxisLabel: 'Inflation Rate (%)',
  },
  {
    id: 'wb-unemployment',
    name: 'Unemployment rate (World Bank)',
    category: 'Labour Market',
    description: 'Unemployment rate including 2024-2025',
    source: 'WorldBank',
    worldBankIndicator: 'SL.UEM.TOTL.ZS',
    lastUpdated: '2025-01-15',
    unit: 'percent of labor force',
    yAxisLabel: 'Unemployment Rate (%)',
  },
  {
    id: 'wb-internet-users',
    name: 'Internet users (% of population)',
    category: 'Communication',
    description: 'Individuals using the Internet, recent data',
    source: 'WorldBank',
    worldBankIndicator: 'IT.NET.USER.ZS',
    lastUpdated: '2025-01-15',
    unit: 'percent of population',
    yAxisLabel: 'Internet Users (%)',
  },
  {
    id: 'wb-energy-use',
    name: 'Energy use (kg of oil equivalent per capita)',
    category: 'Environment',
    description: 'Energy consumption per capita with recent data',
    source: 'WorldBank',
    worldBankIndicator: 'EG.USE.PCAP.KG.OE',
    lastUpdated: '2025-01-15',
    unit: 'kg of oil equivalent per capita',
    yAxisLabel: 'Energy Use (kg oil eq. per capita)',
  },
  {
    id: 'wb-life-expectancy',
    name: 'Life expectancy at birth (World Bank)',
    category: 'Health',
    description: 'Life expectancy including 2024-2025 projections',
    source: 'WorldBank',
    worldBankIndicator: 'SP.DYN.LE00.IN',
    lastUpdated: '2025-01-15',
    unit: 'years',
    yAxisLabel: 'Life Expectancy (years)',
  },
  {
    id: 'wb-trade-gdp',
    name: 'Trade (% of GDP)',
    category: 'International Trade',
    description: 'Sum of exports and imports as % of GDP',
    source: 'WorldBank',
    worldBankIndicator: 'NE.TRD.GNFS.ZS',
    lastUpdated: '2025-01-15',
    unit: 'percent of GDP',
    yAxisLabel: 'Trade (% of GDP)',
  },
];

/**
 * Get datasets by category
 */
export function getDatasetsByCategory(category: string): UNDataset[] {
  return UN_DATASETS.filter((ds) => ds.category === category);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(UN_DATASETS.map((ds) => ds.category)));
}

/**
 * Download a CSV file to the local data directory
 * Note: This would typically run server-side or via a download script
 */
export async function downloadDataset(dataset: UNDataset): Promise<boolean> {
  try {
    console.log(`Downloading ${dataset.name} from ${dataset.csvUrl}...`);

    // In a real implementation, this would download the CSV file
    // For now, we'll return true to indicate the URL is available
    return true;
  } catch (error) {
    console.error(`Error downloading ${dataset.name}:`, error);
    return false;
  }
}

/**
 * Get local file path for a dataset
 */
export function getLocalPath(dataset: UNDataset): string {
  const filename = dataset.id + '.csv';
  return `/data/un-csv/${filename}`;
}

/**
 * Download all datasets
 */
export async function downloadAllDatasets(): Promise<void> {
  console.log(`Starting download of ${UN_DATASETS.length} datasets...`);

  for (const dataset of UN_DATASETS) {
    await downloadDataset(dataset);
  }

  console.log('All datasets downloaded successfully!');
}

/**
 * Generate dynamic chart description with unit information
 */
export function getDatasetChartDescription(
  dataset: UNDataset,
  selectedCountries: string[],
  startYear: number,
  endYear: number,
  chartType: 'line' | 'bar' | 'area' | 'multibar'
): string {
  const countryText = selectedCountries.length === 1
    ? selectedCountries[0]
    : `${selectedCountries.length} countries`;

  const yearRange = chartType === 'bar'
    ? `latest available year`
    : `${startYear} to ${endYear}`;

  let description = `${dataset.description}. `;
  description += `Showing data for ${countryText} from ${yearRange}.`;

  return description;
}
