import { FMPClient } from '../api/FMPClient.js';
import { z } from 'zod';

/**
 * Company Information Tools
 * Provides company profiles, metadata, and basic information
 */
export class CompanyTools {
  constructor(private readonly fmp: FMPClient) {}

  /**
   * Get company profile
   */
  async getProfile(symbol: string): Promise<unknown> {
    return this.fmp.get(`/profile/${symbol}`);
  }

  /**
   * Get company executives
   */
  async getExecutives(symbol: string): Promise<unknown[]> {
    return this.fmp.get(`/key-executives/${symbol}`);
  }

  /**
   * Get company ratings
   */
  async getRatings(symbol: string): Promise<unknown[]> {
    return this.fmp.get(`/rating/${symbol}`);
  }

  /**
   * Get company news
   */
  async getNews(
    symbol: string,
    limit: number = 50
  ): Promise<unknown[]> {
    return this.fmp.get(`/stock_news?tickers=${symbol}`, { limit });
  }

  /**
   * Search for companies
   */
  async searchCompanies(query: string, limit: number = 10): Promise<unknown[]> {
    return this.fmp.get(`/search?query=${encodeURIComponent(query)}`, { limit });
  }

  /**
   * Get available exchanges
   */
  async getExchanges(): Promise<unknown[]> {
    return this.fmp.get('/is-list');
  }
}

/**
 * Zod schemas for company tools
 */
export const CompanySchemas = {
  getProfile: z.object({
    symbol: z.string().describe('Stock ticker symbol')
  }),
  getExecutives: z.object({
    symbol: z.string().describe('Stock ticker symbol')
  }),
  getRatings: z.object({
    symbol: z.string().describe('Stock ticker symbol')
  }),
  getNews: z.object({
    symbol: z.string().describe('Stock ticker symbol'),
    limit: z.number().optional().describe('Number of news articles (default: 50)')
  }),
  searchCompanies: z.object({
    query: z.string().describe('Search query (company name, symbol, etc.)'),
    limit: z.number().optional().describe('Maximum results (default: 10)')
  }),
  getExchanges: z.object({})
};
