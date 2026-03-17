// FMP Articles API
export interface FMPArticle {
  title: string;
  date: string;
  content: string;
  tickers: string;
  image: string;
  link: string;
  author: string;
  site: string;
}

// General News, Stock News, Press Releases, Crypto News, Forex News APIs
export interface NewsArticle {
  symbol: string | null;
  publishedDate: string;
  publisher: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

// Common parameters for news API requests
export interface NewsParams {
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

// Parameters for searching news by symbols
export interface NewsSearchParams extends NewsParams {
  symbols: string;
}
