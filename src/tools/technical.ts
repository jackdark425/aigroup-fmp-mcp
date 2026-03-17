/**
 * Technical Indicators Tools
 */

import { z } from 'zod';
import { fetchFMP, jsonResponse, errorResponse } from '../utils/fmp.js';
import type { TechnicalIndicator, HistoricalPrice } from '../types/index.js';

// Schemas
const TimeframeSchema = z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day']);
const IntervalSchema = z.enum(['1min', '5min', '15min', '30min', '1hour', '4hour']);

const TechnicalIndicatorSchema = z.object({
  symbol: z.string().describe('Stock ticker symbol'),
  timeframe: TimeframeSchema.describe('Timeframe for technical analysis'),
  period: z.number().optional().describe('Period length'),
});

const HistoricalChartSchema = z.object({
  symbol: z.string().describe('Stock ticker symbol'),
  interval: IntervalSchema.describe('Time interval'),
  from: z.string().optional().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().describe('End date in YYYY-MM-DD format (optional)'),
});

/**
 * Register technical indicator tools
 */
export function registerTechnicalTools(server: any) {
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
        return jsonResponse(data);
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
        return jsonResponse(data);
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
        return jsonResponse(data);
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
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );
}
