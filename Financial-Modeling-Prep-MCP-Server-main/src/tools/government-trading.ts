import { z } from "zod";
import { GovernmentTradingClient } from "../api/government-trading/GovernmentTradingClient.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register all government trading-related tools with the MCP server
 * @param server The MCP server instance
 * @param accessToken The Financial Modeling Prep API access token (optional when using lazy loading)
 */
export function registerGovernmentTradingTools(
  server: McpServer,
  accessToken?: string
): void {
  const governmentTradingClient = new GovernmentTradingClient(accessToken);

  server.tool(
    "getLatestSenateDisclosures",
    "Access the latest financial disclosures from U.S. Senate members with the FMP Latest Senate Financial Disclosures API. Track recent trades, asset ownership, and transaction details for enhanced transparency in government financial activities.",
    {
      page: z.number().optional().describe("Page number for pagination"),
      limit: z.number().optional().describe("Limit the number of results"),
    },
    async ({ page, limit }) => {
      try {
        const results =
          await governmentTradingClient.getLatestSenateDisclosures({
            page,
            limit,
          });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getLatestHouseDisclosures",
    "Access real-time financial disclosures from U.S. House members with the FMP Latest House Financial Disclosures API. Track recent trades, asset ownership, and financial holdings for enhanced visibility into political figures' financial activities.",
    {
      page: z.number().optional().describe("Page number for pagination"),
      limit: z.number().optional().describe("Limit the number of results"),
    },
    async ({ page, limit }) => {
      try {
        const results = await governmentTradingClient.getLatestHouseDisclosures(
          {
            page,
            limit,
          }
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getSenateTrades",
    "Monitor the trading activity of US Senators with the FMP Senate Trading Activity API. Access detailed information on trades made by Senators, including trade dates, assets, amounts, and potential conflicts of interest.",
    {
      symbol: z.string().describe("Stock symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await governmentTradingClient.getSenateTrades({
          symbol,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getSenateTradesByName",
    "Search for Senate trading activity by Senator name with the FMP Senate Trades by Name API. Access detailed information on trades made by specific Senators, including trade dates, assets, amounts, and potential conflicts of interest.",
    {
      name: z.string().describe("Senator name (first or last name)"),
    },
    async ({ name }) => {
      try {
        const results = await governmentTradingClient.getSenateTradesByName({
          name,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getHouseTrades",
    "Track the financial trades made by U.S. House members and their families with the FMP U.S. House Trades API. Access real-time information on stock sales, purchases, and other investment activities to gain insight into their financial decisions.",
    {
      symbol: z.string().describe("Stock symbol"),
    },
    async ({ symbol }) => {
      try {
        const results = await governmentTradingClient.getHouseTrades({
          symbol,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "getHouseTradesByName",
    "Search for House trading activity by Representative name with the FMP House Trades by Name API. Access detailed information on trades made by specific Representatives, including trade dates, assets, amounts, and potential conflicts of interest.",
    {
      name: z.string().describe("Representative name (first or last name)"),
    },
    async ({ name }) => {
      try {
        const results = await governmentTradingClient.getHouseTradesByName({
          name,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
