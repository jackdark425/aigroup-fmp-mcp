import type {
  ServerMode,
  ToolSet,
  ToolceptionConfig,
  SessionContextConfig
} from '../types/index.js';
import { ServerModeEnforcer } from '../server-mode-enforcer/index.js';
import { TOOL_SETS, getToolSetByKey, getToolSetKeys } from '../constants/index.js';
import type { ModuleLoader } from 'toolception';

/**
 * Maps FMP server modes to toolception configuration
 */
export class ModeConfigMapper {
  /**
   * Convert FMP ServerMode to toolception configuration
   */
  static toToolceptionConfig(
    mode: ServerMode,
    enforcer: ServerModeEnforcer,
    accessToken?: string,
    moduleLoaders?: Record<string, ModuleLoader>
  ): ToolceptionConfig {
    const catalog = this.buildCatalog();
    const loaders = moduleLoaders || {};

    switch (mode) {
      case 'DYNAMIC_TOOL_DISCOVERY':
        return {
          catalog,
          moduleLoaders: loaders,
          startup: {
            mode: 'DYNAMIC'
          },
          context: {
            accessToken
          },
          sessionContext: this.buildSessionContextConfig(),
          exposurePolicy: {
            namespaceToolsWithSetKey: false,
            maxActiveToolsets: undefined
          }
        };

      case 'STATIC_TOOL_SETS': {
        const toolSets = this.resolveToolSets(enforcer);
        return {
          catalog: this.buildCatalogForToolSets(toolSets),
          moduleLoaders: loaders,
          startup: {
            mode: 'STATIC',
            toolsets: toolSets.map(ts => ts.key)
          },
          context: {
            accessToken
          },
          sessionContext: this.buildSessionContextConfig(),
          exposurePolicy: {
            namespaceToolsWithSetKey: true,
            maxActiveToolsets: toolSets.length
          }
        };
      }

      case 'ALL_TOOLS':
        return {
          catalog: this.buildCatalogForAllTools(),
          moduleLoaders: loaders,
          startup: {
            mode: 'STATIC',
            toolsets: getToolSetKeys()
          },
          context: {
            accessToken
          },
          sessionContext: this.buildSessionContextConfig(),
          exposurePolicy: {
            namespaceToolsWithSetKey: false,
            maxActiveToolsets: undefined
          }
        };

      default:
        throw new Error(`Unknown server mode: ${mode}`);
    }
  }

  /**
   * Build complete tool catalog
   */
  private static buildCatalog(): Record<string, { 
    name: string; 
    description: string; 
    decisionCriteria?: string;
    modules?: string[]; 
  }> {
    const catalog: Record<string, { 
      name: string; 
      description: string; 
      decisionCriteria?: string;
      modules?: string[]; 
    }> = {};

    for (const toolSet of TOOL_SETS) {
      catalog[toolSet.key] = {
        name: toolSet.name,
        description: toolSet.description,
        modules: [toolSet.key]
      };
    }

    return catalog;
  }

  /**
   * Build catalog for specific tool sets
   */
  private static buildCatalogForToolSets(toolSets: ToolSet[]): Record<string, { 
    name: string; 
    description: string; 
    decisionCriteria?: string;
    modules?: string[]; 
  }> {
    const catalog: Record<string, { 
      name: string; 
      description: string; 
      decisionCriteria?: string;
      modules?: string[]; 
    }> = {};

    for (const toolSet of toolSets) {
      catalog[toolSet.key] = {
        name: toolSet.name,
        description: toolSet.description,
        modules: [toolSet.key]
      };
    }

    return catalog;
  }

  /**
   * Build catalog for all tools (flat namespace)
   */
  private static buildCatalogForAllTools(): Record<string, { 
    name: string; 
    description: string; 
    decisionCriteria?: string;
    modules?: string[]; 
  }> {
    const catalog: Record<string, { 
      name: string; 
      description: string; 
      decisionCriteria?: string;
      modules?: string[]; 
    }> = {};

    for (const toolSet of TOOL_SETS) {
      catalog[toolSet.key] = {
        name: toolSet.name,
        description: toolSet.description,
        modules: [toolSet.key]
      };
    }

    return catalog;
  }

  /**
   * Resolve tool sets from enforcer
   */
  private static resolveToolSets(enforcer: ServerModeEnforcer): ToolSet[] {
    const enforcerToolSets = enforcer.toolSets;
    if (enforcerToolSets.length === 0) {
      return TOOL_SETS; // Default to all tool sets
    }

    const resolved: ToolSet[] = [];
    for (const tsKey of enforcerToolSets.map(ts => ts.key)) {
      const toolSet = getToolSetByKey(tsKey);
      if (toolSet) {
        resolved.push(toolSet);
      }
    }

    return resolved;
  }

  /**
   * Build session context configuration
   */
  private static buildSessionContextConfig(): SessionContextConfig {
    return {
      enabled: true,
      queryParam: {
        name: 'sessionConfig',
        encoding: 'json',
        allowedKeys: ['FMP_ACCESS_TOKEN']
      },
      merge: 'shallow'
    };
  }
}
