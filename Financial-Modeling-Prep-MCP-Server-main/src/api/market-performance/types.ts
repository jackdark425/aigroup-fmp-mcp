// Market Sector Performance Snapshot API
export interface SectorPerformance {
  date: string;
  sector: string;
  exchange: string;
  averageChange: number;
}

// Industry Performance Snapshot API
export interface IndustryPerformance {
  date: string;
  industry: string;
  exchange: string;
  averageChange: number;
}

// Sector PE Snapshot API
export interface SectorPE {
  date: string;
  sector: string;
  exchange: string;
  pe: number;
}

// Industry PE Snapshot API
export interface IndustryPE {
  date: string;
  industry: string;
  exchange: string;
  pe: number;
}

// Biggest Stock Gainers/Losers/Most Active APIs
export interface StockMovement {
  symbol: string;
  price: number;
  name: string;
  change: number;
  changesPercentage: number;
  exchange: string;
}
