import { TOOL_SETS } from '../constants/index.js';

/**
 * Display help information
 */
export function showHelp(_toolSets?: string[]): void {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           AIGroup FMP MCP Server - Help                       ║
╚═══════════════════════════════════════════════════════════════╝

USAGE:
  node dist/index.js [OPTIONS]

OPTIONS:
  --help, -h              Show this help message
  --port <number>         Port to run the server on (default: 8080)
  --fmp-token <token>     FMP API access token
  --dynamic-tool-discovery Enable dynamic tool discovery mode
  --static-tool-sets      Use static tool sets mode
  --all-tools             Expose all tools directly

ENVIRONMENT VARIABLES:
  PORT                    Server port (default: 8080)
  FMP_ACCESS_TOKEN        FMP API access token (required for API calls)
  DYNAMIC_TOOL_DISCOVERY  Set to 'true' for dynamic mode
  STATIC_TOOL_SETS        Comma-separated list of tool sets
  ALL_TOOLS               Set to 'true' to expose all tools

SERVER MODES:
  1. DYNAMIC_TOOL_DISCOVERY (default)
     - Meta-tools enabled: enable_toolset, disable_toolset,
       list_toolsets, describe_toolset, list_tools
     - Tools loaded on-demand
     - Flexible toolset management

  2. STATIC_TOOL_SETS
     - Pre-configured tool sets from environment/CLI
     - Predictable tool exposure
     - Use --static-tool-sets or STATIC_TOOL_SETS env

  3. ALL_TOOLS
     - All available tools exposed directly
     - No toolset management needed
     - Use --all-tools or ALL_TOOLS env

AVAILABLE TOOL SETS (${TOOL_SETS.length}):
${TOOL_SETS.map((set, i) => `  ${i + 1}. ${set.key}: ${set.description}`).join('\n')}

EXAMPLES:

  # Dynamic mode (default)
  export FMP_ACCESS_TOKEN=your_token
  npx aigroup-fmp-mcp

  # Static mode with specific toolsets
  export FMP_ACCESS_TOKEN=your_token
  export STATIC_TOOL_SETS=quotes,company,statements
  npx aigroup-fmp-mcp

  # All tools mode
  export FMP_ACCESS_TOKEN=your_token
  export ALL_TOOLS=true
  npx aigroup-fmp-mcp

  # Custom port
  npx aigroup-fmp-mcp --port 3000 --fmp-token your_token

For more information, visit: https://github.com/aigroup/aigroup-fmp-mcp
`);
}
