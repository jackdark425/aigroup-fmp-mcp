import type { HealthResponse } from '../types/index.js';

/**
 * Health check endpoint handler
 */
export async function healthCheckHandler(): Promise<HealthResponse> {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: await getServerVersion(),
    uptime: process.uptime()
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
    console.warn('[healthcheck] Failed to read version:', error);
    return '0.0.0';
  }
}
