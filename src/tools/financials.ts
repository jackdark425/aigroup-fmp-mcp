/**
 * Financial Statements Tools
 */

import { z } from 'zod';
import { fetchFMP, jsonResponse, errorResponse } from '../utils/fmp.js';
import type { IncomeStatement, BalanceSheet, CashFlow, CompanyProfile } from '../types/index.js';

// Common schemas
const PeriodSchema = z.enum(['annual', 'quarter']).optional();
const LimitSchema = z.number().optional();
const SymbolSchema = z.string();

const FinancialStatementSchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
  period: PeriodSchema.describe('Period type (annual or quarter)'),
  limit: LimitSchema.describe('Number of periods to return (default: 5)'),
});

const CompanyProfileSchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
});

const StockNewsSchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
  limit: z.number().optional().describe('Number of articles to return (default: 10)'),
});

/**
 * Register financial statement tools
 */
export function registerFinancialsTools(server: any) {
  // Company Profile
  server.registerTool(
    'get_company_profile',
    {
      description: 'Get detailed company profile information including description, industry, sector, CEO, and more',
      inputSchema: CompanyProfileSchema,
    },
    async (args: z.infer<typeof CompanyProfileSchema>) => {
      try {
        const data = await fetchFMP<CompanyProfile[]>(`/profile?symbol=${args.symbol.toUpperCase()}`);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Income Statement
  server.registerTool(
    'get_income_statement',
    {
      description: 'Get company income statement (annual or quarterly)',
      inputSchema: FinancialStatementSchema,
    },
    async (args: z.infer<typeof FinancialStatementSchema>) => {
      try {
        const period = args.period || 'annual';
        const limit = args.limit || 5;
        const data = await fetchFMP<IncomeStatement[]>(
          `/income-statement?symbol=${args.symbol.toUpperCase()}&period=${period}&limit=${limit}`
        );
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Balance Sheet
  server.registerTool(
    'get_balance_sheet',
    {
      description: 'Get company balance sheet statement (annual or quarterly)',
      inputSchema: FinancialStatementSchema,
    },
    async (args: z.infer<typeof FinancialStatementSchema>) => {
      try {
        const period = args.period || 'annual';
        const limit = args.limit || 5;
        const data = await fetchFMP<BalanceSheet[]>(
          `/balance-sheet-statement?symbol=${args.symbol.toUpperCase()}&period=${period}&limit=${limit}`
        );
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Cash Flow
  server.registerTool(
    'get_cash_flow',
    {
      description: 'Get company cash flow statement (annual or quarterly)',
      inputSchema: FinancialStatementSchema,
    },
    async (args: z.infer<typeof FinancialStatementSchema>) => {
      try {
        const period = args.period || 'annual';
        const limit = args.limit || 5;
        const data = await fetchFMP<CashFlow[]>(
          `/cash-flow-statement?symbol=${args.symbol.toUpperCase()}&period=${period}&limit=${limit}`
        );
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Stock News
  server.registerTool(
    'get_stock_news',
    {
      description: 'Get latest news articles for a stock symbol',
      inputSchema: StockNewsSchema,
    },
    async (args: z.infer<typeof StockNewsSchema>) => {
      try {
        const limit = args.limit || 10;
        const data = await fetchFMP(`/news/stock?symbols=${args.symbol.toUpperCase()}&limit=${limit}`);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Key Metrics
  server.registerTool(
    'get_key_metrics',
    {
      description: 'Get key financial metrics (P/E, ROE, debt ratios, etc.)',
      inputSchema: FinancialStatementSchema,
    },
    async (args: z.infer<typeof FinancialStatementSchema>) => {
      try {
        const period = args.period || 'annual';
        const limit = args.limit || 5;
        const data = await fetchFMP(
          `/key-metrics?symbol=${args.symbol.toUpperCase()}&period=${period}&limit=${limit}`
        );
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Financial Ratios
  server.registerTool(
    'get_financial_ratios',
    {
      description: 'Get detailed financial ratios (profitability, liquidity, efficiency)',
      inputSchema: FinancialStatementSchema,
    },
    async (args: z.infer<typeof FinancialStatementSchema>) => {
      try {
        const period = args.period || 'annual';
        const limit = args.limit || 5;
        const data = await fetchFMP(
          `/ratios?symbol=${args.symbol.toUpperCase()}&period=${period}&limit=${limit}`
        );
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );
}
