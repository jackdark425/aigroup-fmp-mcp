import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Get server version from package.json
 */
export async function getServerVersion(): Promise<string> {
  try {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const content = await readFile(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(content);
    return pkg.version;
  } catch (error) {
    console.warn('[getServerVersion] Failed to read version from package.json:', error);
    return '0.0.0';
  }
}
