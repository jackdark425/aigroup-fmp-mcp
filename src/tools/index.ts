/**
 * Tools registration entry point
 */

import { registerMarketTools } from './market.js';
import { registerFinancialsTools } from './financials.js';
import { registerAnalysisTools } from './analysis.js';
import { registerTechnicalTools } from './technical.js';
import { registerCalendarTools } from './calendar.js';

/**
 * Register all tools with the MCP server
 */
export function registerAllTools(server: any): void {
  registerMarketTools(server);
  registerFinancialsTools(server);
  registerAnalysisTools(server);
  registerTechnicalTools(server);
  registerCalendarTools(server);
}

// Export individual tool modules for direct access
export * from './market.js';
export * from './financials.js';
export * from './analysis.js';
export * from './technical.js';
export * from './calendar.js';
