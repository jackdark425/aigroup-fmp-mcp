/**
 * Server mode enumeration
 * Determines how tools are exposed to MCP clients
 */
export type ServerMode =
  | 'DYNAMIC_TOOL_DISCOVERY'  // Meta-tools enabled, dynamic toolset management
  | 'STATIC_TOOL_SETS'        // Pre-configured static toolsets
  | 'ALL_TOOLS';              // All tools exposed directly

/**
 * Represents a tool set/category
 */
export interface ToolSet {
  key: string;
  name: string;
  description: string;
}

/**
 * Configuration for session-level context (per-session tokens)
 */
export interface SessionContextConfig {
  enabled: boolean;
  queryParam: {
    name: string;
    encoding: 'base64' | 'json';
    allowedKeys: string[];
  };
  merge: 'shallow' | 'deep';
}

/**
 * Toolception exposure policy
 */
export interface ExposurePolicy {
  namespaceToolsWithSetKey: boolean;
  maxActiveToolsets?: number;
  allowlist?: string[];
  denylist?: string[];
}

/**
 * Complete toolception configuration
 */
export interface ToolceptionConfig {
  catalog: Record<string, {
    name: string;
    description: string;
    decisionCriteria?: string;
    modules?: string[];
  }>;
  moduleLoaders: Record<string, ModuleLoader>;
  startup: {
    mode: 'DYNAMIC' | 'STATIC';
    toolsets?: string[] | 'ALL';
  };
  context: {
    accessToken?: string;
    [key: string]: any;
  };
  sessionContext?: SessionContextConfig;
  exposurePolicy: ExposurePolicy;
}

/**
 * Module loader function type (re-exported from toolception)
 * We use 'any' for the return type to avoid circular dependencies
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModuleLoader = (context?: any) => Promise<any[]> | any[];

/**
 * Server configuration from environment/CLI
 */
export interface ServerConfig {
  mode: ServerMode;
  toolsets?: string[];
  accessToken?: string;
  port?: number;
  dynamicToolDiscovery?: boolean;
}

/**
 * Health check response
 */
export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
}

/**
 * Server card information
 */
export interface ServerCard {
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  tools: number;
  toolsets: number;
}
