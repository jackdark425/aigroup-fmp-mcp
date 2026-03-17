// Stock Market Indexes List API
export interface IndexItem {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
}

// Index Quote API
export interface IndexQuote {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number | null;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}

// Index Short Quote API
export interface IndexShortQuote {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

// Historical Index Light Chart API
export interface IndexLightChart {
  symbol: string;
  date: string;
  price: number;
  volume: number;
}

// Historical Index Full Chart API
export interface IndexFullChart {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

// Intraday Index Chart APIs (1min, 5min, 1hour)
export interface IndexIntradayData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

// Index Constituent APIs (S&P 500, Nasdaq, Dow Jones)
export interface IndexConstituent {
  symbol: string;
  name: string;
  sector: string;
  subSector: string;
  headQuarter: string;
  dateFirstAdded: string | null;
  cik: string;
  founded: string;
}

// Historical Index Changes APIs
export interface HistoricalIndexChange {
  dateAdded: string;
  addedSecurity: string;
  removedTicker: string;
  removedSecurity: string;
  date: string;
  symbol: string;
  reason: string;
}
