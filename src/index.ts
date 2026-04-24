#!/usr/bin/env node

/**
 * Financial Modeling Prep MCP Server v2.0
 * 
 * A modern MCP server using the latest SDK features:
 * - McpServer class with registerTool/registerResource/registerPrompt APIs
 * - Zod schema validation
 * - Stdio transport for full MCP support
 * - HTTP health/info mode for operational checks
 * - Comprehensive financial data tools
 * - Resource-based data access
 * - Prompt templates for common analysis tasks
 */

import { startServer } from './server.js';

// Start the server
startServer().catch((error: unknown) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
