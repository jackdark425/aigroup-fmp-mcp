import { FMPClient } from '../api/FMPClient.js';
import { z } from 'zod';

/**
 * Financial Statements Tools
 * Provides income statements, balance sheets, cash flow statements
 */
export class StatementsTools {
  constructor(private readonly fmp: FMPClient) {}

  /**
   * Get income statement
   */
  async getIncomeStatement(
    symbol: string,
    period: 'annual' | 'quarter' = 'annual',
    limit: number = 5
  ): Promise<unknown[]> {
    const endpoint = period === 'annual' 
      ? `/income-statement/${symbol}`
      : `/income-statement/${symbol}?period=quarter`;
    return this.fmp.get(endpoint, { limit });
  }

  /**
   * Get balance sheet
   */
  async getBalanceSheet(
    symbol: string,
    period: 'annual' | 'quarter' = 'annual',
    limit: number = 5
  ): Promise<unknown[]> {
    const endpoint = period === 'annual'
      ? `/balance-sheet-statement/${symbol}`
      : `/balance-sheet-statement/${symbol}?period=quarter`;
    return this.fmp.get(endpoint, { limit });
  }

  /**
   * Get cash flow statement
   */
  async getCashFlow(
    symbol: string,
    period: 'annual' | 'quarter' = 'annual',
    limit: number = 5
  ): Promise<unknown[]> {
    const endpoint = period === 'annual'
      ? `/cash-flow-statement/${symbol}`
      : `/cash-flow-statement/${symbol}?period=quarter`;
    return this.fmp.get(endpoint, { limit });
  }

  /**
   * Get financial ratios
   */
  async getRatios(
    symbol: string,
    period: 'annual' | 'quarter' = 'annual',
    limit: number = 5
  ): Promise<unknown[]> {
    const endpoint = period === 'annual'
      ? `/ratios/${symbol}`
      : `/ratios-ttm/${symbol}`;
    return this.fmp.get(endpoint, { limit });
  }

  /**
   * Get key metrics
   */
  async getKeyMetrics(
    symbol: string,
    period: 'annual' | 'quarter' = 'annual',
    limit: number = 5
  ): Promise<unknown[]> {
    const endpoint = period === 'annual'
      ? `/key-metrics/${symbol}`
      : `/key-metrics-ttm/${symbol}`;
    return this.fmp.get(endpoint, { limit });
  }
}

/**
 * Zod schemas for statements tools
 */
export const StatementsSchemas = {
  getIncomeStatement: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.enum(['annual', 'quarter']).optional().describe('Statement period (default: annual)'),
    limit: z.number().optional().describe('Number of statements to return (default: 5)')
  }),
  getBalanceSheet: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.enum(['annual', 'quarter']).optional().describe('Statement period (default: annual)'),
    limit: z.number().optional().describe('Number of statements to return (default: 5)')
  }),
  getCashFlow: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.enum(['annual', 'quarter']).optional().describe('Statement period (default: annual)'),
    limit: z.number().optional().describe('Number of statements to return (default: 5)')
  }),
  getRatios: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.enum(['annual', 'quarter']).optional().describe('Statement period (default: annual)'),
    limit: z.number().optional().describe('Number of ratios to return (default: 5)')
  }),
  getKeyMetrics: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    period: z.enum(['annual', 'quarter']).optional().describe('Metrics period (default: annual)'),
    limit: z.number().optional().describe('Number of metrics to return (default: 5)')
  })
};
