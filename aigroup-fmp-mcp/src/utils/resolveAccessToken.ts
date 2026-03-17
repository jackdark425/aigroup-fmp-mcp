/**
 * Resolve access token from multiple sources
 * Priority: CLI arg > Environment variable > Session config
 */
export function resolveAccessToken(
  cliToken?: string,
  envToken?: string,
  sessionConfig?: Record<string, unknown>
): string | undefined {
  // CLI argument has highest priority
  if (cliToken) {
    return cliToken;
  }

  // Environment variable is second
  if (envToken) {
    return envToken;
  }

  // Session config could be used in the future
  if (sessionConfig?.FMP_ACCESS_TOKEN) {
    return sessionConfig.FMP_ACCESS_TOKEN as string;
  }

  return undefined;
}
