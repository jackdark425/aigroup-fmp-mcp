/**
 * FMP API utility functions
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';

/**
 * Default output directory for JSON files
 */
const DEFAULT_OUTPUT_DIR = process.env.FMP_OUTPUT_DIR || path.join(os.tmpdir(), 'fmp-mcp-output');

// Ensure output directory exists
if (!fs.existsSync(DEFAULT_OUTPUT_DIR)) {
  fs.mkdirSync(DEFAULT_OUTPUT_DIR, { recursive: true });
}

/**
 * Generate a unique filename for output
 */
function generateOutputFilename(prefix: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}.json`;
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
  const url = `${FMP_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}apikey=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
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
