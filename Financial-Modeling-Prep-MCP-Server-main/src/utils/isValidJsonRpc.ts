/**
 * Validates if a request follows JSON-RPC 2.0 specification
 * @param request The parsed JSON-RPC request
 * @returns true if valid, false otherwise
 */
export function isValidJsonRpc(request: any): boolean {
  // Must be an object
  if (!request || typeof request !== "object") return false;

  // Must have jsonrpc property with value "2.0"
  if (request.jsonrpc !== "2.0") return false;

  // Must have method property that is a string
  if (typeof request.method !== "string") return false;

  // Must have id (can be string, number, null, but not undefined)
  if (request.id === undefined) return false;

  // If params exists, it must be an object or array
  if (request.params !== undefined && !(typeof request.params === "object"))
    return false;

  return true;
}
