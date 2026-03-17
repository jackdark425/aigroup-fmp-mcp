import type { ToolSet } from '../types/index.js';

/**
 * Available tool sets in the server
 * Each tool set represents a category of functionality
 * NOTE: Only the tool sets with implemented adapters are included
 */
export const TOOL_SETS: ToolSet[] = [
  {
    key: 'quotes',
    name: 'Quotes and Price Data',
    description: 'Real-time and historical stock quotes, price data, and market data'
  },
  {
    key: 'company',
    name: 'Company Information',
    description: 'Company profiles, metadata, and basic information'
  },
  {
    key: 'statements',
    name: 'Financial Statements',
    description: 'Income statements, balance sheets, cash flow statements'
  }
];

/**
 * Get tool set by key
 */
export function getToolSetByKey(key: string): ToolSet | undefined {
  return TOOL_SETS.find(set => set.key === key);
}

/**
 * Get all tool set keys
 */
export function getToolSetKeys(): string[] {
  return TOOL_SETS.map(set => set.key);
}

/**
 * Get tool set names
 */
export function getToolSetNames(): string[] {
  return TOOL_SETS.map(set => set.name);
}
