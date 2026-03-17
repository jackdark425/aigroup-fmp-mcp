import type { ModuleLoader, McpToolDefinition } from 'toolception';
import { QuotesTools, QuotesSchemas } from '../tools/quotes.js';
import { CompanyTools, CompanySchemas } from '../tools/company.js';
import { StatementsTools, StatementsSchemas } from '../tools/statements.js';
import { FMPClient } from '../api/FMPClient.js';

/**
 * Module adapters for toolception
 * Each adapter provides a module loader for a specific tool category
 */

// Store FMP client instance
let fmpClient: FMPClient | null = null;

/**
 * Set the FMP client for all adapters
 */
export function setFMPClient(client: FMPClient): void {
  fmpClient = client;
}

/**
 * Get the FMP client
 */
function getFMPClient(): FMPClient {
  if (!fmpClient) {
    throw new Error('FMPClient not initialized. Call setFMPClient() first.');
  }
  return fmpClient;
}

/**
 * Create tool definition from method
 */
function createToolDefinition(
  name: string,
  description: string,
  handler: (...args: any[]) => any,
  inputSchema: any
): McpToolDefinition {
  return {
    name,
    description,
    inputSchema: inputSchema as Record<string, unknown>,
    handler: async (...args: any[]) => {
      return handler(...args);
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: true
    }
  };
}

/**
 * Quotes module adapter
 */
export function quotesAdapter(): ModuleLoader {
  return async (_context?: unknown) => {
    const fmp = getFMPClient();
    const tools = new QuotesTools(fmp);

    return [
      createToolDefinition(
        'getQuote',
        'Get real-time stock quote',
        (symbol: string) => tools.getQuote(symbol),
        QuotesSchemas.getQuote
      ),
      createToolDefinition(
        'getBatchQuotes',
        'Get batch quotes for multiple symbols',
        (symbols: string[]) => tools.getBatchQuotes(symbols),
        QuotesSchemas.getBatchQuotes
      ),
      createToolDefinition(
        'getHistoricalPrices',
        'Get historical price data',
        (symbol: string, fromDate: string, toDate: string) => tools.getHistoricalPrices(symbol, fromDate, toDate),
        QuotesSchemas.getHistoricalPrices
      ),
      createToolDefinition(
        'getSMA',
        'Get simple moving average (SMA)',
        (symbol: string, period?: number, fromDate?: string, toDate?: string) => tools.getSMA(symbol, period, fromDate, toDate),
        QuotesSchemas.getSMA
      ),
      createToolDefinition(
        'getRSI',
        'Get relative strength index (RSI)',
        (symbol: string, period?: number, fromDate?: string, toDate?: string) => tools.getRSI(symbol, period, fromDate, toDate),
        QuotesSchemas.getRSI
      ),
      createToolDefinition(
        'getSupportedIndicators',
        'Get supported technical indicators',
        () => tools.getSupportedIndicators(),
        QuotesSchemas.getSupportedIndicators
      )
    ];
  };
}

/**
 * Company module adapter
 */
export function companyAdapter(): ModuleLoader {
  return async (_context?: unknown) => {
    const fmp = getFMPClient();
    const tools = new CompanyTools(fmp);

    return [
      createToolDefinition(
        'getProfile',
        'Get company profile',
        (symbol: string) => tools.getProfile(symbol),
        CompanySchemas.getProfile
      ),
      createToolDefinition(
        'getExecutives',
        'Get company executives',
        (symbol: string) => tools.getExecutives(symbol),
        CompanySchemas.getExecutives
      ),
      createToolDefinition(
        'getRatings',
        'Get company ratings',
        (symbol: string) => tools.getRatings(symbol),
        CompanySchemas.getRatings
      ),
      createToolDefinition(
        'getNews',
        'Get company news',
        (symbol: string, limit?: number) => tools.getNews(symbol, limit),
        CompanySchemas.getNews
      ),
      createToolDefinition(
        'searchCompanies',
        'Search for companies',
        (query: string, limit?: number) => tools.searchCompanies(query, limit),
        CompanySchemas.searchCompanies
      ),
      createToolDefinition(
        'getExchanges',
        'Get available exchanges',
        () => tools.getExchanges(),
        CompanySchemas.getExchanges
      )
    ];
  };
}

/**
 * Statements module adapter
 */
export function statementsAdapter(): ModuleLoader {
  return async (_context?: unknown) => {
    const fmp = getFMPClient();
    const tools = new StatementsTools(fmp);

    return [
      createToolDefinition(
        'getIncomeStatement',
        'Get income statement',
        (symbol: string, period?: 'annual' | 'quarter', limit?: number) => tools.getIncomeStatement(symbol, period, limit),
        StatementsSchemas.getIncomeStatement
      ),
      createToolDefinition(
        'getBalanceSheet',
        'Get balance sheet',
        (symbol: string, period?: 'annual' | 'quarter', limit?: number) => tools.getBalanceSheet(symbol, period, limit),
        StatementsSchemas.getBalanceSheet
      ),
      createToolDefinition(
        'getCashFlow',
        'Get cash flow statement',
        (symbol: string, period?: 'annual' | 'quarter', limit?: number) => tools.getCashFlow(symbol, period, limit),
        StatementsSchemas.getCashFlow
      ),
      createToolDefinition(
        'getRatios',
        'Get financial ratios',
        (symbol: string, period?: 'annual' | 'quarter', limit?: number) => tools.getRatios(symbol, period, limit),
        StatementsSchemas.getRatios
      ),
      createToolDefinition(
        'getKeyMetrics',
        'Get key metrics',
        (symbol: string, period?: 'annual' | 'quarter', limit?: number) => tools.getKeyMetrics(symbol, period, limit),
        StatementsSchemas.getKeyMetrics
      )
    ];
  };
}

/**
 * Module adapters registry
 */
export const MODULE_ADAPTERS: Record<string, ModuleLoader> = {
  quotes: quotesAdapter(),
  company: companyAdapter(),
  statements: statementsAdapter()
};
