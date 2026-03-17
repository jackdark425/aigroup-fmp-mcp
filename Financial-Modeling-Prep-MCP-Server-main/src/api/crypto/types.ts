export interface Cryptocurrency {
  symbol: string;
  name: string;
  exchange: string;
  icoDate: string;
  circulatingSupply: number;
  totalSupply: number | null;
}

export interface CryptocurrencyQuote {
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
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}

export interface CryptocurrencyShortQuote {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

export interface CryptocurrencyLightChart {
  symbol: string;
  date: string;
  price: number;
  volume: number;
}

export interface CryptocurrencyHistoricalChart {
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

export interface CryptocurrencyIntradayPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
