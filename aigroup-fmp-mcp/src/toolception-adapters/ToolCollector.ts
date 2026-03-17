/**
 * ToolCollector - Virtual MCP server that captures tool registrations
 *
 * This class mocks the McpServer.tool() method to intercept tool registrations
 * from existing registerXxxTools() functions and convert them to toolception's
 * McpToolDefinition format.
 */

export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (args: any) => Promise<any> | any;
  annotations?: {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
    idempotentHint?: boolean;
    openWorldHint?: boolean;
  };
}

/**
 * Interface for objects that can register tools
 * Used to provide type safety for registerXxxTools functions
 */
export interface ToolRegistrar {
  tool(
    name: string,
    description: string,
    schema: Record<string, any>,
    handler: (params: any) => Promise<any>
  ): void;
}

/**
 * Virtual server that captures tool registrations instead of registering them
 */
export class ToolCollector implements ToolRegistrar {
  private tools: McpToolDefinition[] = [];

  /**
   * Mock implementation of McpServer.tool() that captures registrations
   */
  tool(
    name: string,
    description: string,
    schema: Record<string, any>,
    handler: (params: any) => Promise<any>
  ): void {
    this.tools.push({
      name,
      description,
      inputSchema: schema,
      handler,
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
        idempotentHint: true,
      }
    });
  }

  /**
   * Get all captured tool definitions
   */
  getToolDefinitions(): McpToolDefinition[] {
    return this.tools;
  }

  /**
   * Get count of captured tools
   */
  getToolCount(): number {
    return this.tools.length;
  }

  /**
   * Clear all captured tools
   */
  clear(): void {
    this.tools = [];
  }
}
