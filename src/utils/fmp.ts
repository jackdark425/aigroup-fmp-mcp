/**
 * FMP API utility functions
 */

const FMP_API_KEY = process.env.FMP_API_KEY;
const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';

if (!FMP_API_KEY) {
  console.error('Error: FMP_API_KEY environment variable is required');
  process.exit(1);
}

/**
 * Make a request to FMP API
 */
export async function fetchFMP<T = unknown>(endpoint: string): Promise<T> {
  const url = `${FMP_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}apikey=${FMP_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json() as Promise<T>;
}

/**
 * Format response as MCP tool result
 */
export function jsonResponse(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  };
}

/**
 * Format error as MCP tool result
 */
export function errorResponse(error: unknown) {
  return {
    content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
    isError: true,
  };
}

/**
 * Build query string from parameters
 */
export function buildQueryString(params: Record<string, string | number | undefined>): string {
  const queryParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  
  return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
}

/**
 * Format number with commas
 */
export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null) return 'N/A';
  return num.toLocaleString();
}

/**
 * Format percentage
 */
export function formatPercent(num: number | undefined | null): string {
  if (num === undefined || num === null) return 'N/A';
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
}

/**
 * Format currency
 */
export function formatCurrency(num: number | undefined | null, currency = 'USD'): string {
  if (num === undefined || num === null) return 'N/A';
  return `${currency} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format large numbers (billions, millions)
 */
export function formatLargeNumber(num: number | undefined | null): string {
  if (num === undefined || num === null) return 'N/A';
  
  const absNum = Math.abs(num);
  if (absNum >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  } else if (absNum >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (absNum >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  } else if (absNum >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  }
  return num.toString();
}
