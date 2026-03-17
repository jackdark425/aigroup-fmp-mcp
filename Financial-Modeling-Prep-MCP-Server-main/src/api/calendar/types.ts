export interface Dividend {
  symbol: string;
  date: string;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
  adjDividend: number;
  dividend: number;
  yield: number;
  frequency: string;
}

export interface EarningsReport {
  symbol: string;
  date: string;
  epsActual: number | null;
  epsEstimated: number | null;
  revenueActual: number | null;
  revenueEstimated: number | null;
  lastUpdated: string;
}

export interface IPO {
  symbol: string;
  date: string;
  daa: string;
  company: string;
  exchange: string;
  actions: string;
  shares: number | null;
  priceRange: string | null;
  marketCap: number | null;
}

export interface IPODisclosure {
  symbol: string;
  filingDate: string;
  acceptedDate: string;
  effectivenessDate: string;
  cik: string;
  form: string;
  url: string;
}

export interface IPOProspectus {
  symbol: string;
  acceptedDate: string;
  filingDate: string;
  ipoDate: string;
  cik: string;
  pricePublicPerShare: number;
  pricePublicTotal: number;
  discountsAndCommissionsPerShare: number;
  discountsAndCommissionsTotal: number;
  proceedsBeforeExpensesPerShare: number;
  proceedsBeforeExpensesTotal: number;
  form: string;
  url: string;
}

export interface StockSplit {
  symbol: string;
  date: string;
  numerator: number;
  denominator: number;
}
