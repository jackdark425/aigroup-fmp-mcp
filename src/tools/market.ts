/**
 * Market Data Tools
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fetchFMP, jsonResponse, errorResponse } from '../utils/fmp.js';
import type { StockQuote, MarketMover, SectorPerformance } from '../types/index.js';

// Schemas
const QuoteSchema = z.object({
  symbol: z.string().describe('Stock ticker symbol (e.g., AAPL)'),
});

const SearchSchema = z.object({
  query: z.string().describe('Search query (company name or ticker)'),
});

const SectorPerformanceSchema = z.object({
  date: z.string().optional().describe('Date in YYYY-MM-DD format (optional, defaults to latest)'),
});

/**
 * Register market data tools
 */
export function registerMarketTools(server: McpServer) {
  // Get Quote
  server.registerTool(
    'get_quote',
    {
      description: 'Get real-time stock quote for a symbol (e.g., AAPL, TSLA, MSFT)',
      inputSchema: QuoteSchema,
    },
    async (args: z.infer<typeof QuoteSchema>) => {
      try {
        const data = await fetchFMP<StockQuote[]>(`/quote?symbol=${args.symbol.toUpperCase()}`);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Search Symbol
  server.registerTool(
    'search_symbol',
    {
      description: 'Search for stock symbols by company name or ticker',
      inputSchema: SearchSchema,
    },
    async (args: z.infer<typeof SearchSchema>) => {
      try {
        const data = await fetchFMP(`/search-symbol?query=${encodeURIComponent(args.query)}&limit=10`);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Market Gainers
  server.registerTool(
    'get_market_gainers',
    {
      description: 'Get stocks with the largest price increases (top gainers)',
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const data = await fetchFMP<MarketMover[]>('/biggest-gainers');
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Market Losers
  server.registerTool(
    'get_market_losers',
    {
      description: 'Get stocks with the largest price drops (top losers)',
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const data = await fetchFMP<MarketMover[]>('/biggest-losers');
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Most Active
  server.registerTool(
    'get_most_active',
    {
      description: 'Get most actively traded stocks by volume',
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const data = await fetchFMP<MarketMover[]>('/most-actives');
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // Sector Performance
  server.registerTool(
    'get_sector_performance',
    {
      description: 'Get current sector performance snapshot',
      inputSchema: SectorPerformanceSchema,
    },
    async (args: z.infer<typeof SectorPerformanceSchema>) => {
      try {
        const date = args.date || new Date().toISOString().split('T')[0];
        const data = await fetchFMP<SectorPerformance[]>(`/sector-performance-snapshot?date=${date}`);
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );

  // S&P 500 Constituents
  server.registerTool(
    'get_sp500_constituents',
    {
      description: 'Get list of S&P 500 index constituents',
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const data = await fetchFMP('/sp500-constituent');
        return jsonResponse(data);
      } catch (error) {
        return errorResponse(error);
      }
    }
  );
}
