export interface ChartData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change?: number;
  changePercent?: number;
  vwap: number;
}

export interface LightChartData {
  symbol: string;
  date: string;
  close: number;
  volume: number;
}



export interface UnadjustedChartData {
  symbol: string;
  date: string;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number
  volume: number;
}

export interface IntradayChartData extends Omit<UnadjustedChartData, "symbol"> {}

export type Interval = "1min" | "5min" | "15min" | "30min" | "1hour" | "4hour";
