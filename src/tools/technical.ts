/**
 * Technical Indicators Tools
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fetchFMP, jsonResponse, errorResponse } from '../utils/fmp.js';
import type { TechnicalIndicator, HistoricalPrice } from '../types/index.js';

// Schemas
const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');
const TimeframeSchema = z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']);
const IntervalSchema = z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour']);
const OutputFormatSchema = z.enum(['text', 'file']).optional()
  .describe('Output format: "text" returns JSON directly, "file" saves to file (recommended for large data)');

const TechnicalIndicatorSchema = z.object({
  symbol: z.string().min(1, "Symbol cannot be empty").describe('Stock ticker symbol'),
  timeframe: TimeframeSchema.describe('Timeframe for technical analysis'),
  period: z.number().optional().describe('Period length'),
  outputFormat: OutputFormatSchema,
});

const HistoricalChartSchema = z.object({
  symbol: z.string().min(1, "Symbol cannot be empty").describe('Stock ticker symbol'),
  interval: IntervalSchema.describe('Time interval'),
  from: DateSchema.optional().describe('Start date in YYYY-MM-DD format (optional)'),
  to: DateSchema.optional().describe('End date in YYYY-MM-DD format (optional)'),
  outputFormat: OutputFormatSchema,
});

/**
 * Register technical indicator tools
 */
export function registerTechnicalTools(server: McpServer) {
  // RSI
  server.registerTool(
    'get_technical_indicator_rsi',
    {
      description: 'Get Relative Strength Index (RSI) technical indicator',
      inputSchema: TechnicalIndicatorSchema,
    },
    async (args: z.infer<typeof TechnicalIndicatorSchema>) => {
      try {
        const period = args.period || 14;
        const data = await fetchFMP<TechnicalIndicator[]>(
          `/technical-indicators/rsi?symbol=${args.symbol.toUpperCase()}&timeframe=${args.timeframe}&periodLength=${period}`
        );
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'technical-rsi' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // SMA
  server.registerTool(
    'get_technical_indicator_sma',
    {
      description: 'Get Simple Moving Average (SMA) technical indicator',
      inputSchema: TechnicalIndicatorSchema,
    },
    async (args: z.infer<typeof TechnicalIndicatorSchema>) => {
      try {
        const period = args.period || 10;
        const data = await fetchFMP<TechnicalIndicator[]>(
          `/technical-indicators/sma?symbol=${args.symbol.toUpperCase()}&timeframe=${args.timeframe}&periodLength=${period}`
        );
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'technical-sma' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // EMA
  server.registerTool(
    'get_technical_indicator_ema',
    {
      description: 'Get Exponential Moving Average (EMA) technical indicator',
      inputSchema: TechnicalIndicatorSchema,
    },
    async (args: z.infer<typeof TechnicalIndicatorSchema>) => {
      try {
        const period = args.period || 10;
        const data = await fetchFMP<TechnicalIndicator[]>(
          `/technical-indicators/ema?symbol=${args.symbol.toUpperCase()}&timeframe=${args.timeframe}&periodLength=${period}`
        );
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'technical-ema' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Historical Chart
  server.registerTool(
    'get_historical_chart',
    {
      description: 'Get historical price data with flexible time intervals',
      inputSchema: HistoricalChartSchema,
    },
    async (args: z.infer<typeof HistoricalChartSchema>) => {
      try {
        let endpoint = `/historical-chart/${args.interval}?symbol=${args.symbol.toUpperCase()}`;
        if (args.from) endpoint += `&from=${args.from}`;
        if (args.to) endpoint += `&to=${args.to}`;
        const data = await fetchFMP<HistoricalPrice[]>(endpoint);
        return jsonResponse(data, { 
          outputFormat: args.outputFormat, 
          filenamePrefix: 'historical-chart' 
        });
      } catch (error) {
        return errorResponse(error);
      }
    }
  );
}
