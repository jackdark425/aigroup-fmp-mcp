/**
 * Prompts registration entry point
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerAnalysisPrompts } from './analysis.js';

/**
 * Register all prompts with the MCP server
 */
export function registerAllPrompts(server: McpServer): void {
  registerAnalysisPrompts(server);
}
