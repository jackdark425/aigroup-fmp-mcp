/**
 * MCP Server Configuration
 * 
 * This file sets up the McpServer instance with all capabilities
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAllTools } from './tools/index.js';
import { registerAllResources } from './resources/index.js';
import { registerAllPrompts } from './prompts/index.js';
import http from 'http';

/**
 * Server metadata
 */
const SERVER_NAME = 'aigroup-fmp-mcp';
const SERVER_VERSION = '2.0.3';

/**
 * Create and configure the MCP server
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Register all capabilities
  registerAllTools(server);
  registerAllResources(server);
  registerAllPrompts(server);

  return server;
}

/**
 * Start the server with stdio transport
 */
export async function startStdioServer(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  
  await server.connect(transport);
  
  // Log to stderr to avoid interfering with stdio protocol
  console.error(`FMP MCP Server v${SERVER_VERSION} running on stdio`);
  console.error(`Server name: ${SERVER_NAME}`);
  console.error('Capabilities: tools, resources, prompts');
}

/**
 * Start the server with HTTP transport (using simple JSON-RPC over HTTP)
 */
export async function startHttpServer(port: number = 3000): Promise<void> {
  const server = createServer();
  
  // For HTTP mode, we'll use stdio transport over a custom bridge
  // since the StreamableHTTPTransport requires specific handling
  
  const httpServer = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    // Health check endpoint
    if (req.url === '/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'ok',
        server: SERVER_NAME,
        version: SERVER_VERSION,
      }));
      return;
    }
    
    // MCP endpoint - HTTP MCP transport is not implemented in this build.
    if (req.url === '/mcp' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
      req.on('end', () => {
        res.writeHead(501, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32600,
            message: 'HTTP MCP transport is not implemented in this build. Please use stdio mode.',
          },
        }));
      });
      return;
    }
    
    // Default response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: SERVER_NAME,
      version: SERVER_VERSION,
      description: 'FMP MCP Server - Financial Modeling Prep integration',
      mode: 'http',
      note: 'HTTP mode currently provides health/info endpoints only. Use stdio mode for MCP tools, resources, and prompts.',
      endpoints: {
        health: { method: 'GET', path: '/health' },
        mcp: { method: 'POST', path: '/mcp' },
      },
    }));
  });

  httpServer.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`);
    } else {
      console.error('HTTP server failed to start:', error);
    }
    process.exit(1);
  });
  
  httpServer.listen(port, () => {
    console.log(`FMP MCP Server v${SERVER_VERSION} running on HTTP`);
    console.log(`Listening on http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
  });
}

/**
 * Start server based on environment/configuration
 */
export async function startServer(): Promise<void> {
  const useHttp = process.argv.includes('--http');
  const portArg = process.argv.find((arg: string) => arg.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3000;
  
  if (useHttp) {
    await startHttpServer(port);
  } else {
    await startStdioServer();
  }
}
