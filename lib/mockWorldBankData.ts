// Mock World Bank data for fallback
import type { WorldBankResponse } from '@/types/worldbank';

export const mockWorldPopulationData: WorldBankResponse = {
  pagination: {
    page: 1,
    pages: 1,
    per_page: 1000,
    total: 15,
  },
  data: [
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 6956823603, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 7052338695, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 7144008427, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 7236377024, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 7328447604, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 7418685116, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 7508554347, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 7598556058, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 7688523891, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 7778520157, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 7868377934, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 7958518960, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 8047923006, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 8137059925, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'SP.POP.TOTL', value: 'Population, total' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2024', value: 8225690000, unit: '', obs_status: '', decimal: 0 },
  ],
};

export const mockWorldGDPData: WorldBankResponse = {
  pagination: {
    page: 1,
    pages: 1,
    per_page: 1000,
    total: 15,
  },
  data: [
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 66051934413222, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 73315947756579, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 75227658292843, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 77281033449988, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 80108093540681, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 75209850040806, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 76134012456734, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 81399169430062, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 86774515343021, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 87697862801043, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 85123611851651, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 96874523754692, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 101390734283256, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 105411455713000, unit: '', obs_status: '', decimal: 0 },
    { indicator: { id: 'NY.GDP.MKTP.CD', value: 'GDP (current US$)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2024', value: 109500000000000, unit: '', obs_status: '', decimal: 0 },
  ],
};

export const mockLifeExpectancyData: WorldBankResponse = {
  pagination: {
    page: 1,
    pages: 1,
    per_page: 1000,
    total: 15,
  },
  data: [
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 69.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 70.1, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 70.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 70.7, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 71.0, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 71.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 71.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 72.1, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 72.3, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 72.6, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 71.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 71.0, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 71.6, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 72.1, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.LE00.IN', value: 'Life expectancy at birth, total (years)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2024', value: 72.5, unit: '', obs_status: '', decimal: 1 },
  ],
};

export const mockUrbanPopulationData: WorldBankResponse = {
  pagination: {
    page: 1,
    pages: 1,
    per_page: 1000,
    total: 15,
  },
  data: [
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 51.65, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 52.03, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 52.41, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 52.80, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 53.19, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 53.58, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 53.96, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 54.34, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 54.73, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 55.11, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 55.49, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 55.87, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 56.25, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 56.64, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.URB.TOTL.IN.ZS', value: 'Urban population (% of total population)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2024', value: 57.02, unit: '', obs_status: '', decimal: 2 },
  ],
};
