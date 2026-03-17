import type { ServerCard } from '../types/index.js';

/**
 * Server card endpoint handler
 * Provides server metadata and capabilities
 */
export async function serverCardHandler(): Promise<ServerCard> {
  const version = await getServerVersion();
  
  return {
    name: 'aigroup-fmp-mcp',
    version,
    description: 'AIGroup Financial Modeling Prep MCP Server - Model Context Protocol server for financial data, market insights, and analysis',
    capabilities: [
      'tool_execution',
      'dynamic_tool_loading',
      'session_config'
    ],
    tools: 0, // Will be populated dynamically
    toolsets: 0 // Will be populated dynamically
  };
}

/**
 * Get server version from package.json
 */
async function getServerVersion(): Promise<string> {
  try {
    const { readFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const packageJsonPath = join(process.cwd(), 'package.json');
    const content = await readFile(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(content);
    return pkg.version;
  } catch (error) {
    console.warn('[serverCard] Failed to read version:', error);
    return '0.0.0';
  }
}
