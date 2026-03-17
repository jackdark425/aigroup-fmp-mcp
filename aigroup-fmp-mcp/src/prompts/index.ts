import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register all prompts with the MCP server
 */
export function registerPrompts(_server: McpServer): void {
  // Register any prompts here
  // Example:
  // _server.prompt('analyze_stock', {
  //   symbol: { type: 'string', description: 'Stock ticker symbol' },
  //   period: { type: 'string', description: 'Analysis period' }
  // }, async ({ symbol, period }) => {
  //   return {
  //     messages: [
  //       {
  //         role: 'user',
  //         content: {
  //           type: 'text',
  //           text: `Analyze ${symbol} for ${period}...`
  //         }
  //       }
  //     ]
  //   };
  // });
}
