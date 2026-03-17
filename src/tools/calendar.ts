/**
 * Calendar Data Tools
 */

import { z } from 'zod';
import { fetchFMP, jsonResponse, errorResponse } from '../utils/fmp.js';
import type { EarningsCalendar, EconomicCalendar } from '../types/index.js';

// Schemas
const DateRangeSchema = z.object({
  from: z.string().optional().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().describe('End date in YYYY-MM-DD format (optional)'),
});

const EconomicIndicatorSchema = z.object({
  name: z.string().describe('Indicator name (e.g., GDP, unemploymentRate, CPI)'),
  from: z.string().optional().describe('Start date in YYYY-MM-DD format (optional)'),
  to: z.string().optional().describe('End date in YYYY-MM-DD format (optional)'),
});

/**
 * Register calendar data tools
 */
export function registerCalendarTools(server: any) {
  // Earnings Calendar
  server.registerTool(
    'get_earnings_calendar',
    {
      description: 'Get upcoming earnings announcements calendar',
      inputSchema: DateRangeSchema,
    },
    async (args: z.infer<typeof DateRangeSchema>) => {
      try {
        const params: string[] = [];
        if (args.from) params.push(`from=${args.from}`);
        if (args.to) params.push(`to=${args.to}`);
        const endpoint = '/earnings-calendar' + (params.length ? `?${params.join('&')}` : '');
        const data = await fetchFMP<EarningsCalendar[]>(endpoint);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Economic Calendar
  server.registerTool(
    'get_economic_calendar',
    {
      description: 'Get upcoming economic data releases calendar',
      inputSchema: DateRangeSchema,
    },
    async (args: z.infer<typeof DateRangeSchema>) => {
      try {
        const params: string[] = [];
        if (args.from) params.push(`from=${args.from}`);
        if (args.to) params.push(`to=${args.to}`);
        const endpoint = '/economic-calendar' + (params.length ? `?${params.join('&')}` : '');
        const data = await fetchFMP<EconomicCalendar[]>(endpoint);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Economic Indicator
  server.registerTool(
    'get_economic_indicator',
    {
      description: 'Get economic indicator data (GDP, unemployment, inflation, etc.)',
      inputSchema: EconomicIndicatorSchema,
    },
    async (args: z.infer<typeof EconomicIndicatorSchema>) => {
      try {
        let endpoint = `/economic-indicators?name=${args.name}`;
        if (args.from) endpoint += `&from=${args.from}`;
        if (args.to) endpoint += `&to=${args.to}`;
        const data = await fetchFMP(endpoint);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );
}
