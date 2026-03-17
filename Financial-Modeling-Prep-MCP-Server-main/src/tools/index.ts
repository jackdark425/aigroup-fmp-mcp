import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSearchTools } from "./search.js";
import { registerDirectoryTools } from "./directory.js";
import { registerAnalystTools } from "./analyst.js";
import { registerCalendarTools } from "./calendar.js";
import { registerChartTools } from "./chart.js";
import { registerCompanyTools } from "./company.js";
import { registerCOTTools } from "./cot.js";
import { registerESGTools } from "./esg.js";
import { registerEconomicsTools } from "./economics.js";
import { registerDCFTools } from "./dcf.js";
import { registerFundTools } from "./fund.js";
import { registerCommodityTools } from "./commodity.js";
import { registerFundraisersTools } from "./fundraisers.js";
import { registerCryptoTools } from "./crypto.js";
import { registerForexTools } from "./forex.js";
import { registerStatementsTools } from "./statements.js";
import { registerForm13FTools } from "./form-13f.js";
import { registerIndexesTools } from "./indexes.js";
import { registerInsiderTradesTools } from "./insider-trades.js";
import { registerMarketPerformanceTools } from "./market-performance.js";
import { registerMarketHoursTools } from "./market-hours.js";
import { registerNewsTools } from "./news.js";
import { registerTechnicalIndicatorsTools } from "./technical-indicators.js";
import { registerQuotesTools } from "./quotes.js";
import { registerEarningsTranscriptTools } from "./earnings-transcript.js";
import { registerSECFilingsTools } from "./sec-filings.js";
import { registerGovernmentTradingTools } from "./government-trading.js";
import { registerBulkTools } from "./bulk.js";
import { getModulesForToolSets } from "../constants/index.js";
import type { ToolSet } from "../types/index.js";

/**
 * Module registration function mapping
 */
const MODULE_REGISTRATIONS = {
  search: registerSearchTools,
  directory: registerDirectoryTools,
  analyst: registerAnalystTools,
  calendar: registerCalendarTools,
  chart: registerChartTools,
  company: registerCompanyTools,
  cot: registerCOTTools,
  esg: registerESGTools,
  economics: registerEconomicsTools,
  dcf: registerDCFTools,
  fund: registerFundTools,
  commodity: registerCommodityTools,
  fundraisers: registerFundraisersTools,
  crypto: registerCryptoTools,
  forex: registerForexTools,
  statements: registerStatementsTools,
  "form-13f": registerForm13FTools,
  indexes: registerIndexesTools,
  "insider-trades": registerInsiderTradesTools,
  "market-performance": registerMarketPerformanceTools,
  "market-hours": registerMarketHoursTools,
  news: registerNewsTools,
  "technical-indicators": registerTechnicalIndicatorsTools,
  quotes: registerQuotesTools,
  "earnings-transcript": registerEarningsTranscriptTools,
  "sec-filings": registerSECFilingsTools,
  "government-trading": registerGovernmentTradingTools,
  bulk: registerBulkTools,
} as const;

/**
 * Register tools based on specified tool sets
 * @param server The MCP server instance
 * @param toolSets Array of tool set names to load (if empty, loads all tools)
 * @param accessToken The Financial Modeling Prep API access token (optional when using lazy loading)
 */
export function registerToolsBySet(
  server: McpServer,
  toolSets: ToolSet[],
  accessToken?: string
): void {
  // If no tool sets specified, load all tools for backward compatibility
  if (toolSets.length === 0) {
    registerAllTools(server, accessToken);
    return;
  }

  // Get the modules that should be loaded for the specified tool sets
  const modulesToLoad = getModulesForToolSets(toolSets);

  // Register each required module
  for (const moduleName of modulesToLoad) {
    const registrationFunction =
      MODULE_REGISTRATIONS[moduleName as keyof typeof MODULE_REGISTRATIONS];
    if (registrationFunction) {
      registrationFunction(server, accessToken);
    } else {
      console.warn(`Unknown module: ${moduleName}`);
    }
  }

  console.log(
    `Loaded ${modulesToLoad.length} modules for tool sets: ${toolSets.join(
      ", "
    )}`
  );
}

/**
 * Register all tools with the MCP server
 * @param server The MCP server instance
 * @param accessToken The Financial Modeling Prep API access token (optional when using lazy loading)
 */
export function registerAllTools(
  server: McpServer,
  accessToken?: string
): void {
  registerSearchTools(server, accessToken);
  registerDirectoryTools(server, accessToken);
  registerAnalystTools(server, accessToken);
  registerCalendarTools(server, accessToken);
  registerChartTools(server, accessToken);
  registerCompanyTools(server, accessToken);
  registerCOTTools(server, accessToken);
  registerESGTools(server, accessToken);
  registerEconomicsTools(server, accessToken);
  registerDCFTools(server, accessToken);
  registerFundTools(server, accessToken);
  registerCommodityTools(server, accessToken);
  registerFundraisersTools(server, accessToken);
  registerCryptoTools(server, accessToken);
  registerForexTools(server, accessToken);
  registerStatementsTools(server, accessToken);
  registerForm13FTools(server, accessToken);
  registerIndexesTools(server, accessToken);
  registerInsiderTradesTools(server, accessToken);
  registerMarketPerformanceTools(server, accessToken);
  registerMarketHoursTools(server, accessToken);
  registerNewsTools(server, accessToken);
  registerTechnicalIndicatorsTools(server, accessToken);
  registerQuotesTools(server, accessToken);
  registerEarningsTranscriptTools(server, accessToken);
  registerSECFilingsTools(server, accessToken);
  registerGovernmentTradingTools(server, accessToken);
  registerBulkTools(server, accessToken);
}
