/**
 * Analyst Data Tools
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fetchFMP, jsonResponse, errorResponse } from '../utils/fmp.js';
import type { AnalystEstimate, PriceTarget, AnalystRating, InsiderTrading, InstitutionalHolder } from '../types/index.js';

// Schemas
const SymbolSchema = z.string();
const PeriodSchema = z.enum(['annual', 'quarter']).optional();
const LimitSchema = z.number().optional();
const OutputFormatSchema = z.enum(['text', 'file']).optional()
  .describe('Output format: "text" returns JSON directly, "file" saves to file (recommended for large data)');

const AnalystEstimatesSchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
  period: PeriodSchema.describe('Period type (annual or quarter)'),
  limit: LimitSchema.describe('Number of periods to return (default: 10)'),
  outputFormat: OutputFormatSchema,
});

const SymbolOnlySchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
  outputFormat: OutputFormatSchema,
});

const InsiderTradingSchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
  limit: LimitSchema.describe('Number of transactions to return (default: 100)'),
  outputFormat: OutputFormatSchema,
});

const InstitutionalHoldersSchema = z.object({
  symbol: SymbolSchema.describe('Stock ticker symbol'),
  limit: LimitSchema.describe('Number of holders to return (default: 100)'),
  outputFormat: OutputFormatSchema,
});

/**
 * Register analyst data tools
 */
export function registerAnalysisTools(server: McpServer) {
  // Analyst Estimates
  server.registerTool(
    'get_analyst_estimates',
    {
      description: 'Get analyst financial estimates for a stock (revenue, EPS forecasts)',
      inputSchema: AnalystEstimatesSchema,
    },
    async (args: z.infer<typeof AnalystEstimatesSchema>) => {
      try {
        const period = args.period || 'annual';
        const limit = args.limit || 10;
        const data = await fetchFMP<AnalystEstimate[]>(
          `/analyst-estimates?symbol=${args.symbol.toUpperCase()}&period=${period}&limit=${limit}`
        );
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'analyst-estimates' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Price Target
  server.registerTool(
    'get_price_target',
    {
      description: 'Get analyst price target summary for a stock',
      inputSchema: SymbolOnlySchema,
    },
    async (args: z.infer<typeof SymbolOnlySchema>) => {
      try {
        const data = await fetchFMP<PriceTarget[]>(`/price-target-summary?symbol=${args.symbol.toUpperCase()}`);
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'price-target' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Analyst Ratings
  server.registerTool(
    'get_analyst_ratings',
    {
      description: 'Get analyst ratings and upgrades/downgrades for a stock',
      inputSchema: SymbolOnlySchema,
    },
    async (args: z.infer<typeof SymbolOnlySchema>) => {
      try {
        const data = await fetchFMP<AnalystRating[]>(`/grades?symbol=${args.symbol.toUpperCase()}`);
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'analyst-ratings' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Insider Trading
  server.registerTool(
    'get_insider_trading',
    {
      description: 'Get recent insider trading activity for a stock',
      inputSchema: InsiderTradingSchema,
    },
    async (args: z.infer<typeof InsiderTradingSchema>) => {
      try {
        const limit = args.limit || 100;
        const data = await fetchFMP<InsiderTrading[]>(
          `/insider-trading/search?symbol=${args.symbol.toUpperCase()}&limit=${limit}`
        );
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'insider-trading' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Institutional Holders
  server.registerTool(
    'get_institutional_holders',
    {
      description: 'Get institutional ownership (13F filings) for a stock',
      inputSchema: InstitutionalHoldersSchema,
    },
    async (args: z.infer<typeof InstitutionalHoldersSchema>) => {
      try {
        const limit = args.limit || 100;
        const data = await fetchFMP<InstitutionalHolder[]>(
          `/institutional-ownership/latest?symbol=${args.symbol.toUpperCase()}&limit=${limit}`
        );
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'institutional-holders' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );
}
