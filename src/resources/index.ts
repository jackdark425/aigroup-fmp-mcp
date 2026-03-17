/**
 * Resources registration entry point
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerCompanyResources } from './company.js';

/**
 * Register all resources with the MCP server
 */
export function registerAllResources(server: McpServer): void {
  registerCompanyResources(server);
}
