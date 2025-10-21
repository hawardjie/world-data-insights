// Mock Environment & Climate data for fallback
import type { WorldBankResponse } from '@/types/worldbank';

export const mockCO2EmissionsData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 14 },
  data: [
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 4.71, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 4.76, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 4.78, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 4.79, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 4.77, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 4.73, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 4.71, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 4.74, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 4.77, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 4.74, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 4.45, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 4.61, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 4.65, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EN.ATM.CO2E.PC', value: 'CO2 emissions (metric tons per capita)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 4.68, unit: '', obs_status: '', decimal: 2 },
  ],
};

export const mockRenewableEnergyData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 14 },
  data: [
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 16.63, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 16.58, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 16.73, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 17.02, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 17.35, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 17.55, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 17.72, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 17.88, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 18.12, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 18.34, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 18.95, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 19.21, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 19.45, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'EG.FEC.RNEW.ZS', value: 'Renewable energy consumption (% of total final energy consumption)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 19.68, unit: '', obs_status: '', decimal: 2 },
  ],
};

export const mockForestAreaData: WorldBankResponse = {
  pagination: { page: 1, pages: 1, per_page: 1000, total: 14 },
  data: [
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2010', value: 31.45, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2011', value: 31.39, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2012', value: 31.33, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2013', value: 31.27, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2014', value: 31.22, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2015', value: 31.16, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2016', value: 31.11, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2017', value: 31.06, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2018', value: 31.01, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2019', value: 30.96, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2020', value: 30.91, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2021', value: 30.87, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2022', value: 30.82, unit: '', obs_status: '', decimal: 2 },
    { indicator: { id: 'AG.LND.FRST.ZS', value: 'Forest area (% of land area)' }, country: { id: 'WLD', value: 'World' }, countryiso3code: 'WLD', date: '2023', value: 30.78, unit: '', obs_status: '', decimal: 2 },
  ],
};
