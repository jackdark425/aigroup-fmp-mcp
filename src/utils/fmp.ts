/**
 * FMP API utility functions
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { randomUUID } from 'crypto';

const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';
const DEFAULT_REQUEST_TIMEOUT_MS = 30000;

/**
 * Default output directory for JSON files
 */
const DEFAULT_OUTPUT_DIR = process.env.FMP_OUTPUT_DIR || path.join(os.tmpdir(), 'fmp-mcp-output');

/**
 * Generate a unique filename for output
 */
function generateOutputFilename(prefix: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${prefix}_${timestamp}_${randomUUID().slice(0, 8)}.json`;
}

function ensureOutputDir(): void {
  if (!fs.existsSync(DEFAULT_OUTPUT_DIR)) {
    fs.mkdirSync(DEFAULT_OUTPUT_DIR, { recursive: true });
  }
}

function getRequestTimeoutMs(): number {
  const raw = process.env.FMP_REQUEST_TIMEOUT_MS;
  if (!raw) {
    return DEFAULT_REQUEST_TIMEOUT_MS;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_REQUEST_TIMEOUT_MS;
}

/**
 * Get FMP API key from environment
 */
function getApiKey(): string {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    throw new Error('FMP_API_KEY environment variable is required');
  }
  return apiKey;
}

/**
 * Make a request to FMP API
 */
export async function fetchFMP<T = unknown>(endpoint: string): Promise<T> {
  const apiKey = getApiKey();
  // Ensure endpoint doesn't end with '&' before adding apikey
  const cleanEndpoint = endpoint.endsWith('&') ? endpoint.slice(0, -1) : endpoint;
  const url = `${FMP_BASE_URL}${cleanEndpoint}${cleanEndpoint.includes('?') ? '&' : '?'}apikey=${apiKey}`;

  const timeoutMs = getRequestTimeoutMs();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response: Response;

  try {
    response = await fetch(url, { signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`FMP API request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
  
  if (!response.ok) {
    const errorBody = await response.text();
    const message = errorBody.trim() || response.statusText;
    throw new Error(`FMP API error: ${response.status} ${message}`);
  }
  
  return response.json() as Promise<T>;
}

/**
 * Format response as MCP tool result
 * Supports both text and file output modes
 */
export function jsonResponse(
  data: unknown,
  options: { outputFormat?: 'text' | 'file'; filenamePrefix?: string; maxTextLength?: number } = {}
) {
  const { outputFormat = 'text', filenamePrefix = 'fmp', maxTextLength = 5000 } = options;
  
  const jsonString = JSON.stringify(data, null, 2);
  
  // Auto-switch to file if data is too large
  const shouldUseFile = outputFormat === 'file' || jsonString.length > maxTextLength;
  
  if (shouldUseFile) {
    // Save to file
    ensureOutputDir();
    const filename = generateOutputFilename(filenamePrefix);
    const filepath = path.join(DEFAULT_OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, jsonString, 'utf-8');
    
    // Get file stats
    const stats = fs.statSync(filepath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    // Return file reference
    const isArray = Array.isArray(data);
    const itemCount = isArray ? data.length : 1;
    
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            _outputMode: 'file',
            _message: `Data saved to file due to large size (${jsonString.length} chars, ${sizeKB} KB)`,
            filePath: filepath,
            itemCount,
            fileSize: `${sizeKB} KB`,
          }, null, 2),
        },
      ],
    };
  }
  
  // Return as text (original behavior)
  return {
    content: [{ type: 'text' as const, text: jsonString }],
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
 * Handle invalid symbol error with consistent format
 * Used when API returns empty data or invalid symbol is detected
 */
export function invalidSymbolError(symbol: string): { content: Array<{ type: 'text'; text: string }>; isError: boolean } {
  return {
    content: [{
      type: 'text' as const,
      text: `Error: Invalid or unknown symbol "${symbol}". Please verify the ticker symbol and try again.`
    }],
    isError: true,
  };
}

/**
 * Validate API response data and return appropriate error if invalid
 * Returns null if data is valid, error response if invalid
 */
export function validateSymbolResponse<T>(data: T | T[] | null | undefined, symbol: string): { content: Array<{ type: 'text'; text: string }>; isError: boolean } | null {
  // Check for null/undefined
  if (data === null || data === undefined) {
    return invalidSymbolError(symbol);
  }
  
  // Check for empty array
  if (Array.isArray(data) && data.length === 0) {
    return invalidSymbolError(symbol);
  }
  
  // Check for empty object
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) {
    return invalidSymbolError(symbol);
  }
  
  return null;
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
