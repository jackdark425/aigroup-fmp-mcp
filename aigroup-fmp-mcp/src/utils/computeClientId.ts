import { createHash } from 'node:crypto';

/**
 * Generate a stable client ID from request properties
 * Used when mcp-client-id header is missing
 */
export function computeClientId(ip: string, userAgent: string): string {
  const fingerprint = `${ip}|${userAgent}`;
  const hash = createHash('sha256').update(fingerprint).digest('hex').slice(0, 16);
  return `auto-${hash}`;
}
