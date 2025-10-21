// Mock Demographics data for fallback
import type { WorldBankResponse } from '@/types/worldbank';

export const mockFertilityRateData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 15 },
  data: [
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 2.52, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 2.50, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 2.49, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 2.47, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 2.46, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 2.45, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 2.44, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 2.42, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 2.40, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 2.38, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 2.36, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 2.33, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 2.30, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'SP.DYN.TFRT.IN', value: 'Fertility rate, total (births per woman)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 2.28, unit: '', obs_status: '', decimal: 2 },
  ],
};

export const mockInfantMortalityData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 15 },
  data: [
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 35.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 34.6, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 33.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 32.3, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 31.2, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 30.2, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 29.2, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 28.3, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 27.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 26.6, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 26.0, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 25.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 24.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.IMRT.IN', value: 'Mortality rate, infant (per 1,000 live births)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 24.3, unit: '', obs_status: '', decimal: 1 },
  ],
};

export const mockBirthRateData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 15 },
  data: [
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 19.6, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 19.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 19.2, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 19.0, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 18.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 18.7, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 18.5, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 18.3, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 18.1, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 17.9, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 17.7, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 17.4, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 17.2, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CBRT.IN', value: 'Birth rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 17.0, unit: '', obs_status: '', decimal: 1 },
  ],
};

export const mockDeathRateData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 15 },
  data: [
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 7.9, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 7.9, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 7.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 7.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 7.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 7.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 7.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 7.7, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 7.7, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 7.6, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 8.5, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 8.3, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 7.8, unit: '', obs_status: '', decimal: 1 },
    { indicator: { id: 'SP.DYN.CDRT.IN', value: 'Death rate, crude (per 1,000 people)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 7.7, unit: '', obs_status: '', decimal: 1 },
  ],
};
