import axios, { AxiosInstance } from 'axios';

/**
 * Base FMP API Client
 * Handles authentication and HTTP requests to Financial Modeling Prep API
 */
export class FMPClient {
  public readonly client: AxiosInstance;
  public readonly baseURL: string;
  public readonly accessToken: string;

  constructor(accessToken: string, baseURL?: string) {
    this.accessToken = accessToken;
    this.baseURL = baseURL || 'https://financialmodelingprep.com/api/v3';

    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        apikey: this.accessToken
      },
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[FMPClient] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response: { status: number; data: unknown } };
          const { status, data } = axiosError.response;
          console.error(`[FMPClient] API Error ${status}:`, data);
          
          // Handle specific error codes
          if (status === 401) {
            throw new Error('Invalid or expired FMP API token');
          } else if (status === 429) {
            throw new Error('FMP API rate limit exceeded. Please try again later.');
          } else if (status === 403) {
            throw new Error('FMP API access forbidden. Check your API key permissions.');
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request
   */
  public async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  /**
   * Make a POST request
   */
  public async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  /**
   * Check if the client is properly configured
   */
  public isValid(): boolean {
    return !!this.accessToken && this.accessToken !== 'PLACEHOLDER_TOKEN_FOR_TOOL_LISTING';
  }
}
