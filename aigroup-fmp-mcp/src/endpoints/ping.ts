/**
 * Ping endpoint handler
 * Simple liveness probe
 */
export async function pingHandler(): Promise<{ ping: string; timestamp: string }> {
  return {
    ping: 'pong',
    timestamp: new Date().toISOString()
  };
}
