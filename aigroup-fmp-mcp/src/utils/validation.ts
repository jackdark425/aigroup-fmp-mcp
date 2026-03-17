import { getToolSetByKey } from '../constants/index.js';

/**
 * Validate that all tool sets in a list are valid
 */
export function validateToolSets(toolSets: string[]): { valid: string[]; invalid: string[] } {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const toolSet of toolSets) {
    if (getToolSetByKey(toolSet)) {
      valid.push(toolSet);
    } else {
      invalid.push(toolSet);
    }
  }

  return { valid, invalid };
}

/**
 * Validate dynamic tool discovery configuration
 */
export function validateDynamicToolDiscoveryConfig(
  dynamicToolDiscovery?: boolean,
  staticToolSets?: string[],
  allTools?: boolean
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const modesEnabled = [
    dynamicToolDiscovery === true,
    staticToolSets && staticToolSets.length > 0,
    allTools === true
  ].filter(Boolean).length;

  if (modesEnabled > 1) {
    errors.push('Only one server mode can be enabled at a time');
  }

  if (staticToolSets) {
    const { invalid } = validateToolSets(staticToolSets);
    if (invalid.length > 0) {
      errors.push(`Invalid tool sets: ${invalid.join(', ')}`);
    }
  }

  return { isValid: errors.length === 0, errors };
}
