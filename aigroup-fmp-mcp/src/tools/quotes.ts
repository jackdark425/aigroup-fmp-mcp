import { FMPClient } from '../api/FMPClient.js';
import { z } from 'zod';

/**
 * Quotes and Price Data Tools
 * Provides real-time and historical stock quotes, price data
 */
export class QuotesTools {
  constructor(private readonly fmp: FMPClient) {}

  /**
   * Get real-time stock quote
   */
  async getQuote(symbol: string): Promise<unknown> {
    return this.fmp.get(`/quote/${symbol}`);
  }

  /**
   * Get batch quotes for multiple symbols
   */
  async getBatchQuotes(symbols: string[]): Promise<unknown[]> {
    const symbolList = symbols.join(',');
    return this.fmp.get(`/quote/${symbolList}`);
  }

  /**
   * Get historical price data
   */
  async getHistoricalPrices(
    symbol: string,
    fromDate: string,
    toDate: string
  ): Promise<unknown[]> {
    return this.fmp.get(`/historical-price-full/${symbol}`, {
      from: fromDate,
      to: toDate
    });
  }

  /**
   * Get simple moving average (SMA)
   */
  async getSMA(
    symbol: string,
    period: number = 50,
    fromDate?: string,
    toDate?: string
  ): Promise<unknown[]> {
    const params: Record<string, unknown> = { period };
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;
    return this.fmp.get(`/technical-indicator/${symbol}`, params);
  }

  /**
   * Get relative strength index (RSI)
   */
  async getRSI(
    symbol: string,
    period: number = 14,
    fromDate?: string,
    toDate?: string
  ): Promise<unknown[]> {
    const params: Record<string, unknown> = { period };
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;
    return this.fmp.get(`/technical-indicator/${symbol}`, {
      ...params,
      type: 'rsi'
    });
  }

  /**
   * Get supported technical indicators
   */
  async getSupportedIndicators(): Promise<string[]> {
    return [
      'sma', 'ema', 'rsi', 'macd', 'bollinger', 'stochastic',
      'atr', 'cci', 'adx', 'williams', 'vortex', 'keltner'
    ];
  }
}

/**
 * Zod schemas for quotes tools
 */
export const QuotesSchemas = {
  getQuote: z.object({
    symbol: z.string().describe('Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)')
  }),
  getBatchQuotes: z.object({
    symbols: z.array(z.string()).describe('Array of ticker symbols')
  }),
  getHistoricalPrices: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    fromDate: z.string().describe('Start date in YYYY-MM-DD format'),
    toDate: z.string().describe('End date in YYYY-MM-DD format')
  }),
  getSMA: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.number().optional().describe('SMA period (default: 50)'),
    fromDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
    toDate: z.string().optional().describe('End date in YYYY-MM-DD format')
  }),
  getRSI: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.number().optional().describe('RSI period (default: 14)'),
    fromDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
    toDate: z.string().optional().describe('End date in YYYY-MM-DD format')
  }),
  getSupportedIndicators: z.object({})
};
