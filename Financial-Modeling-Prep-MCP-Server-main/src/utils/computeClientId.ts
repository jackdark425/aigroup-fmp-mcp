import crypto from 'node:crypto';

/**
 * Computes a stable client identifier from an access token.
 * - If a token is provided, returns `client:<sha256(token)>`.
 * - If no token is provided, returns a per-request unique `anon:<uuid>`.
 */
export function computeClientId(accessToken?: string): string {
  if (typeof accessToken === 'string' && accessToken.length > 0) {
    const hash = crypto.createHash('sha256').update(accessToken).digest('hex');
    return `client:${hash}`;
  }
  return `anon:${crypto.randomUUID()}`;
}


