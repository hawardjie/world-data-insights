// World Bank API Type Definitions

export interface WorldBankIndicatorValue {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface WorldBankPagination {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

export interface WorldBankResponse {
  pagination: WorldBankPagination;
  data: WorldBankIndicatorValue[];
}

export interface WorldBankIndicator {
  id: string;
  name: string;
  unit?: string;
  source: {
    id: string;
    value: string;
  };
  sourceNote: string;
  sourceOrganization: string;
  topics: Array<{
    id: string;
    value: string;
  }>;
}

export interface WorldBankCountry {
  id: string;
  iso2Code: string;
  name: string;
  region: {
    id: string;
    iso2code: string;
    value: string;
  };
  adminregion: {
    id: string;
    iso2code: string;
    value: string;
  };
  incomeLevel: {
    id: string;
    iso2code: string;
    value: string;
  };
  lendingType: {
    id: string;
    iso2code: string;
    value: string;
  };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

// Common World Bank Indicator Codes
export const WB_INDICATORS = {
  // Population
  POPULATION_TOTAL: 'SP.POP.TOTL',
  POPULATION_GROWTH: 'SP.POP.GROW',
  POPULATION_MALE: 'SP.POP.TOTL.MA.IN',
  POPULATION_FEMALE: 'SP.POP.TOTL.FE.IN',
  POPULATION_DENSITY: 'EN.POP.DNST',
  URBAN_POPULATION: 'SP.URB.TOTL.IN.ZS',
  RURAL_POPULATION: 'SP.RUR.TOTL.ZS',

  // Demographics
  LIFE_EXPECTANCY: 'SP.DYN.LE00.IN',
  FERTILITY_RATE: 'SP.DYN.TFRT.IN',
  BIRTH_RATE: 'SP.DYN.CBRT.IN',
  DEATH_RATE: 'SP.DYN.CDRT.IN',
  INFANT_MORTALITY: 'SP.DYN.IMRT.IN',

  // Economy
  GDP_CURRENT_USD: 'NY.GDP.MKTP.CD',
  GDP_PER_CAPITA: 'NY.GDP.PCAP.CD',
  GDP_GROWTH: 'NY.GDP.MKTP.KD.ZG',
  GNI_PER_CAPITA: 'NY.GNP.PCAP.CD',

  // Trade & Development
  EXPORTS_GOODS_SERVICES: 'NE.EXP.GNFS.ZS',
  IMPORTS_GOODS_SERVICES: 'NE.IMP.GNFS.ZS',
  TRADE_PERCENT_GDP: 'NE.TRD.GNFS.ZS',
  FDI_NET_INFLOWS: 'BX.KLT.DINV.CD.WD',

  // Health
  HEALTH_EXPENDITURE: 'SH.XPD.CHEX.GD.ZS',
  PHYSICIANS_PER_1000: 'SH.MED.PHYS.ZS',
  HOSPITAL_BEDS_PER_1000: 'SH.MED.BEDS.ZS',

  // Education
  LITERACY_RATE: 'SE.ADT.LITR.ZS',
  SCHOOL_ENROLLMENT_PRIMARY: 'SE.PRM.NENR',
  SCHOOL_ENROLLMENT_SECONDARY: 'SE.SEC.NENR',

  // Environment
  CO2_EMISSIONS: 'EN.ATM.CO2E.PC',
  FOREST_AREA: 'AG.LND.FRST.ZS',
  RENEWABLE_ENERGY: 'EG.FEC.RNEW.ZS',

  // Technology
  INTERNET_USERS: 'IT.NET.USER.ZS',
  MOBILE_SUBSCRIPTIONS: 'IT.CEL.SETS.P2',
} as const;

// Common country codes
export const WB_COUNTRIES = {
  WORLD: 'WLD',
  USA: 'USA',
  CHINA: 'CHN',
  INDIA: 'IND',
  JAPAN: 'JPN',
  GERMANY: 'DEU',
  UK: 'GBR',
  FRANCE: 'FRA',
  BRAZIL: 'BRA',
  CANADA: 'CAN',
  RUSSIA: 'RUS',
  SOUTH_KOREA: 'KOR',
  MEXICO: 'MEX',
  INDONESIA: 'IDN',
  TURKEY: 'TUR',
  SAUDI_ARABIA: 'SAU',
  NIGERIA: 'NGA',
  SOUTH_AFRICA: 'ZAF',
} as const;
