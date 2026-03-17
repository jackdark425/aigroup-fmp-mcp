/**
 * Company Resources
 * 
 * Resources provide data that can be read by clients
 */

import { fetchFMP } from '../utils/fmp.js';
import type { CompanyProfile, StockQuote, IncomeStatement, BalanceSheet, CashFlow } from '../types/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register company profile resource
 */
function registerCompanyProfileResource(server: McpServer) {
  server.registerResource(
    'company-profile',
    'fmp://company/{symbol}/profile',
    {
      title: 'Company Profile',
      description: 'Detailed company profile including description, industry, sector, CEO, and more',
      mimeType: 'application/json',
    },
    async (uri: URL) => {
      const symbol = uri.pathname.split('/')[2];
      const data = await fetchFMP<CompanyProfile[]>(`/profile?symbol=${symbol.toUpperCase()}`);
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2),
        }],
      };
    }
  );
}

/**
 * Register company quote resource
 */
function registerCompanyQuoteResource(server: McpServer) {
  server.registerResource(
    'company-quote',
    'fmp://company/{symbol}/quote',
    {
      title: 'Company Quote',
      description: 'Real-time stock quote for a company',
      mimeType: 'application/json',
    },
    async (uri: URL) => {
      const symbol = uri.pathname.split('/')[2];
      const data = await fetchFMP<StockQuote[]>(`/quote?symbol=${symbol.toUpperCase()}`);
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2),
        }],
      };
    }
  );
}

/**
 * Register company financial statements resource
 */
function registerCompanyFinancialsResource(server: McpServer) {
  server.registerResource(
    'company-financials',
    'fmp://company/{symbol}/financials/{statement}/{period}',
    {
      title: 'Company Financial Statements',
      description: 'Income statement, balance sheet, or cash flow statement',
      mimeType: 'application/json',
    },
    async (uri: URL) => {
      const parts = uri.pathname.split('/');
      const symbol = parts[2];
      const statement = parts[4] as 'income' | 'balance' | 'cashflow';
      const period = parts[5] as 'annual' | 'quarter';
      
      const endpointMap = {
        income: '/income-statement',
        balance: '/balance-sheet-statement',
        cashflow: '/cash-flow-statement',
      };
      
      let data;
      switch (statement) {
        case 'income':
          data = await fetchFMP<IncomeStatement[]>(`${endpointMap.income}?symbol=${symbol.toUpperCase()}&period=${period}&limit=5`);
          break;
        case 'balance':
          data = await fetchFMP<BalanceSheet[]>(`${endpointMap.balance}?symbol=${symbol.toUpperCase()}&period=${period}&limit=5`);
          break;
        case 'cashflow':
          data = await fetchFMP<CashFlow[]>(`${endpointMap.cashflow}?symbol=${symbol.toUpperCase()}&period=${period}&limit=5`);
          break;
      }
      
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2),
        }],
      };
    }
  );
}

/**
 * Register market overview resource
 */
function registerMarketOverviewResource(server: McpServer) {
  server.registerResource(
    'market-overview',
    'fmp://market/overview',
    {
      title: 'Market Overview',
      description: 'Current market overview including gainers, losers, and most active stocks',
      mimeType: 'application/json',
    },
    async (uri: URL) => {
      const [gainers, losers, active] = await Promise.all([
        fetchFMP('/biggest-gainers'),
        fetchFMP('/biggest-losers'),
        fetchFMP('/most-actives'),
      ]);
      
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify({
            gainers,
            losers,
            mostActive: active,
            timestamp: new Date().toISOString(),
          }, null, 2),
        }],
      };
    }
  );
}

/**
 * Register sector performance resource
 */
function registerSectorPerformanceResource(server: McpServer) {
  server.registerResource(
    'sector-performance',
    'fmp://market/sectors/{date}',
    {
      title: 'Sector Performance',
      description: 'Sector performance for a specific date',
      mimeType: 'application/json',
    },
    async (uri: URL) => {
      const date = uri.pathname.split('/')[3];
      const data = await fetchFMP(`/sector-performance-snapshot?date=${date}`);
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2),
        }],
      };
    }
  );
}

/**
 * Register all resources with the MCP server
 */
export function registerCompanyResources(server: McpServer) {
  registerCompanyProfileResource(server);
  registerCompanyQuoteResource(server);
  registerCompanyFinancialsResource(server);
  registerMarketOverviewResource(server);
  registerSectorPerformanceResource(server);
}
