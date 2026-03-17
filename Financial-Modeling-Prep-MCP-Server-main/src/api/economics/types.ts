export interface TreasuryRate {
  date: string;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  year1: number;
  year2: number;
  year3: number;
  year5: number;
  year7: number;
  year10: number;
  year20: number;
  year30: number;
}

export interface EconomicIndicator {
  date: string;
  name: string;
  value: number;
}

export interface EconomicCalendar {
  date: string;
  country: string;
  event: string;
  currency: string;
  previous: number;
  estimate: number | null;
  actual: number; 
  change: number;
  impact: string;
  changePercentage: number;
}

export interface MarketRiskPremium {
  country: string;
  continent: string;
  countryRiskPremium: number;
  totalEquityRiskPremium: number;
}
