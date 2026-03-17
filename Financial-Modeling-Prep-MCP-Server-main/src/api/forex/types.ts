export interface ForexPair {
  symbol: string;
  fromCurrency: string;
  toCurrency: string;
  fromName: string;
  toName: string;
}

export interface ForexQuote {
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

export interface ForexShortQuote {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

export interface ForexLightChart {
  symbol: string;
  date: string;
  price: number;
  volume: number;
}

export interface ForexHistoricalChart {
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

export interface ForexIntradayChart {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
