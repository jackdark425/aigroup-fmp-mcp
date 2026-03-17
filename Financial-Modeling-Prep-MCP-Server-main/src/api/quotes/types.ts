export interface StockQuote {
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

export interface StockQuoteShort {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

export interface AftermarketTrade {
  symbol: string;
  price: number;
  tradeSize: number;
  timestamp: number;
}

export interface AftermarketQuote {
  symbol: string;
  bidSize: number;
  bidPrice: number;
  askSize: number;
  askPrice: number;
  volume: number;
  timestamp: number;
}

export interface StockPriceChange {
  symbol: string;
  "1D": number;
  "5D": number;
  "1M": number;
  "3M": number;
  "6M": number;
  ytd: number;
  "1Y": number;
  "3Y": number;
  "5Y": number;
  "10Y": number;
  max: number;
}

export interface QuoteParams {
  symbol: string;
}

export interface BatchQuoteParams {
  symbols: string;
}

export interface ExchangeQuoteParams {
  exchange: string;
  short?: boolean;
}

export interface ShortParams {
  short?: boolean;
}
