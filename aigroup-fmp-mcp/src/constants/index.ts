export const DEFAULT_PORT = 8080;
export const DEFAULT_API_KEY = "PLACEHOLDER_TOKEN_FOR_TOOL_LISTING";

export * from "./toolSets.js";

import { TOOL_SETS } from "./toolSets.js";
import type { ToolSet } from "../types/index.js";

/**
 * Get all available tool set keys
 */
export function getAvailableToolSets(): string[] {
  return TOOL_SETS.map(set => set.key);
}

/**
 * Get tool set by key
 */
export function getToolSetByKey(key: string): ToolSet | undefined {
  return TOOL_SETS.find(set => set.key === key);
}
