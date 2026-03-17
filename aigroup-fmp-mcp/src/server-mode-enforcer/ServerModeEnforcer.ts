import { getAvailableToolSets, getToolSetByKey } from '../constants/index.js';
import type { ServerMode, ToolSet } from '../types/index.js';

/**
 * Server mode enforcer
 * Determines and validates server mode from environment variables and CLI arguments
 * Uses singleton pattern for global access
 */
export class ServerModeEnforcer {
  private static instance: ServerModeEnforcer | null = null;
  
  private readonly _serverModeOverride: ServerMode | null;
  private readonly _toolSets: ToolSet[] = [];

  private constructor(
    envVars: Record<string, string | undefined>,
    cliArgs: Record<string, unknown>
  ) {
    const result = this._determineOverride(envVars, cliArgs);
    this._serverModeOverride = result.mode;
    this._toolSets = result.toolSets || [];
  }

  /**
   * Initialize the singleton instance with environment variables and CLI arguments
   */
  public static initialize(
    envVars: Record<string, string | undefined>,
    cliArgs: Record<string, unknown>
  ): void {
    if (ServerModeEnforcer.instance) {
      console.warn('[ServerModeEnforcer] Already initialized, ignoring subsequent initialization');
      return;
    }
    ServerModeEnforcer.instance = new ServerModeEnforcer(envVars, cliArgs);
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): ServerModeEnforcer {
    if (!ServerModeEnforcer.instance) {
      throw new Error('[ServerModeEnforcer] Instance not initialized. Call ServerModeEnforcer.initialize() first.');
    }
    return ServerModeEnforcer.instance;
  }

  /**
   * Reset the singleton instance (for testing)
   */
  public static reset(): void {
    ServerModeEnforcer.instance = null;
  }

  /**
   * Gets the server mode override, or null if no override is needed
   */
  public get serverModeOverride(): ServerMode | null {
    return this._serverModeOverride;
  }

  /**
   * Gets the validated toolsets when mode is STATIC_TOOL_SETS
   */
  public get toolSets(): ToolSet[] {
    return [...this._toolSets]; // Return copy to prevent mutation
  }

  /**
   * Determines if there's a server-level mode override from CLI args or env vars
   */
  private _determineOverride(
    envVars: Record<string, string | undefined>,
    cliArgs: Record<string, unknown>
  ): { mode: ServerMode | null; toolSets?: ToolSet[] } {
    // Check CLI arguments first (highest precedence)

    // Support multiple CLI argument variations for dynamic tool discovery
    const dynamicToolDiscovery =
      cliArgs['dynamic-tool-discovery'] === true ||
      cliArgs['dynamicToolDiscovery'] === true;
    
    if (dynamicToolDiscovery) {
      return { mode: 'DYNAMIC_TOOL_DISCOVERY' };
    }

    // Check for static tool sets via CLI
    const staticToolSetsArg = cliArgs['static-tool-sets'] as string | undefined;
    if (staticToolSetsArg) {
      const toolSetKeys = staticToolSetsArg.split(',').map(s => s.trim());
      const { valid, invalid } = this.validateToolSets(toolSetKeys);
      
      if (invalid.length > 0) {
        throw new Error(`Invalid tool sets in --static-tool-sets: ${invalid.join(', ')}`);
      }
      
      const toolSets = valid.map((key: string) => getToolSetByKey(key)!);
      return { mode: 'STATIC_TOOL_SETS', toolSets };
    }

    // Check for all tools via CLI
    if (cliArgs['all-tools'] === true || cliArgs.allTools === true) {
      return { mode: 'ALL_TOOLS' };
    }

    // Check environment variables (lower precedence than CLI)

    // DYNAMIC_TOOL_DISCOVERY env var
    if (envVars.DYNAMIC_TOOL_DISCOVERY === 'true') {
      return { mode: 'DYNAMIC_TOOL_DISCOVERY' };
    }

    // STATIC_TOOL_SETS env var
    const staticToolSetsEnv = envVars.STATIC_TOOL_SETS;
    if (staticToolSetsEnv) {
      const toolSetKeys = staticToolSetsEnv.split(',').map(s => s.trim());
      const { valid, invalid } = this.validateToolSets(toolSetKeys);
      
      if (invalid.length > 0) {
        throw new Error(`Invalid tool sets in STATIC_TOOL_SETS: ${invalid.join(', ')}`);
      }
      
      const toolSets = valid.map((key: string) => getToolSetByKey(key)!);
      return { mode: 'STATIC_TOOL_SETS', toolSets };
    }

    // ALL_TOOLS env var
    if (envVars.ALL_TOOLS === 'true') {
      return { mode: 'ALL_TOOLS' };
    }

    // No override specified
    return { mode: null };
  }

  /**
   * Validate tool sets
   */
  private validateToolSets(toolSets: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];
    const availableKeys = getAvailableToolSets();

    for (const toolSet of toolSets) {
      if (availableKeys.includes(toolSet)) {
        valid.push(toolSet);
      } else {
        invalid.push(toolSet);
      }
    }

    return { valid, invalid };
  }
}
