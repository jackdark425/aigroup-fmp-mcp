#!/usr/bin/env node

import minimist from 'minimist';
import { createMcpServer } from 'toolception';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import Fastify from 'fastify';
import { createHash } from 'node:crypto';
import { DEFAULT_PORT } from './constants/index.js';
import { showHelp } from './utils/showHelp.js';
import { ServerModeEnforcer } from './server-mode-enforcer/index.js';
import { ModeConfigMapper } from './toolception-adapters/index.js';
import { MODULE_ADAPTERS } from './toolception-adapters/moduleAdapters.js';
import { getServerVersion } from './utils/getServerVersion.js';
import { healthCheckHandler } from './endpoints/healthcheck.js';
import { pingHandler } from './endpoints/ping.js';
import { serverCardHandler } from './endpoints/server-card.js';
import { registerPrompts } from './prompts/index.js';
import { FMPClient } from './api/FMPClient.js';
import { setFMPClient } from './toolception-adapters/moduleAdapters.js';

/**
 * Generate a stable client ID from request properties when mcp-client-id header is missing.
 */
function generateStableClientId(ip: string, userAgent: string): string {
  const fingerprint = `${ip}|${userAgent}`;
  const hash = createHash('sha256').update(fingerprint).digest('hex').slice(0, 16);
  return `auto-${hash}`;
}

// Parse command line arguments
const argv = minimist(process.argv.slice(2));

// Show help if requested
if (argv.help || argv.h) {
  showHelp();
  process.exit(0);
}

async function main() {
  // Initialize the ServerModeEnforcer
  ServerModeEnforcer.initialize(process.env as Record<string, string | undefined>, argv);

  const PORT = argv.port || (process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT);
  const fmpToken = argv['fmp-token'] || process.env.FMP_ACCESS_TOKEN;
  const version = await getServerVersion();

  // Get enforcer instance to determine mode
  const enforcer = ServerModeEnforcer.getInstance();
  const mode = enforcer.serverModeOverride || 'DYNAMIC_TOOL_DISCOVERY';

  console.log(`[AIGroup FMP MCP Server] Starting v${version} in ${mode} mode...`);

  if (!fmpToken) {
    console.warn('[AIGroup FMP MCP Server] No server-level FMP access token configured. Provide via: (1) FMP_ACCESS_TOKEN env var, (2) --fmp-token CLI arg, or (3) session config {"FMP_ACCESS_TOKEN":"your_token"}. Without auth, API calls will fail.');
  }

  // Build toolception configuration
  const toolceptionConfig = ModeConfigMapper.toToolceptionConfig(
    mode,
    enforcer,
    fmpToken,
    MODULE_ADAPTERS
  );

  console.log('[AIGroup FMP MCP Server] Toolception config:', JSON.stringify({
    startup: toolceptionConfig.startup,
    exposurePolicy: toolceptionConfig.exposurePolicy,
    catalogKeys: Object.keys(toolceptionConfig.catalog),
    moduleLoaderKeys: Object.keys(toolceptionConfig.moduleLoaders)
  }, null, 2));

  try {
    console.log('[AIGroup FMP MCP Server] Calling createMcpServer...');

    // Initialize FMP client and set it in adapters
    if (fmpToken) {
      const fmpClient = new FMPClient(fmpToken);
      setFMPClient(fmpClient);
      console.log('[AIGroup FMP MCP Server] FMP client initialized');
    }

    // Create custom Fastify instance
    const app = Fastify({ logger: false });

    // Add hook to inject mcp-client-id header if missing
    app.addHook('preHandler', async (request, _reply) => {
      const existingClientId = request.headers['mcp-client-id'];

      if (!existingClientId || (typeof existingClientId === 'string' && existingClientId.trim() === '')) {
        const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';
        const userAgent = request.headers['user-agent'] || '';

        const stableId = generateStableClientId(
          typeof ip === 'string' ? ip : Array.isArray(ip) ? ip[0] : 'unknown',
          typeof userAgent === 'string' ? userAgent : ''
        );

        request.headers['mcp-client-id'] = stableId;
        console.log(`[AIGroup FMP MCP Server] Injected mcp-client-id: ${stableId} for IP ${ip}`);
      }
    });

    // Add custom health endpoints
    app.get('/health', async () => {
      const health = await healthCheckHandler();
      return health;
    });

    app.get('/ping', async () => {
      return await pingHandler();
    });

    app.get('/server-card', async () => {
      return await serverCardHandler();
    });

    // Create MCP server instance
    const mcpServer = new McpServer(
      {
        name: 'aigroup-fmp-mcp',
        version: version
      },
      {
        capabilities: {
          tools: { listChanged: mode === 'DYNAMIC_TOOL_DISCOVERY' },
          prompts: { listChanged: false }
        }
      }
    );

    // Register prompts
    registerPrompts(mcpServer);

    // Start toolception server with our Fastify app
    const { start, close } = await createMcpServer({
      ...toolceptionConfig,
      createServer: () => mcpServer,
      http: {
        host: '0.0.0.0',
        port: PORT,
        app: app
      }
    });

    // Start the server
    await start();

    console.log(`[AIGroup FMP MCP Server] Server listening on http://localhost:${PORT}`);
    console.log(`[AIGroup FMP MCP Server] Version: ${version}`);
    console.log(`[AIGroup FMP MCP Server] Mode: ${mode}`);
    console.log(`[AIGroup FMP MCP Server] Health: http://localhost:${PORT}/health`);
    console.log(`[AIGroup FMP MCP Server] Ping: http://localhost:${PORT}/ping`);
    console.log(`[AIGroup FMP MCP Server] Server Card: http://localhost:${PORT}/server-card`);

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n[AIGroup FMP MCP Server] Shutting down...');
      await close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n[AIGroup FMP MCP Server] Shutting down...');
      await close();
      process.exit(0);
    });

  } catch (error) {
    console.error('[AIGroup FMP MCP Server] Failed to start:', error);
    process.exit(1);
  }
}

// Run the server
main().catch(error => {
  console.error('[AIGroup FMP MCP Server] Fatal error:', error);
  process.exit(1);
});
