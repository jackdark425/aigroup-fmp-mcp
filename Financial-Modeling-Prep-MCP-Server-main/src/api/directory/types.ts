export interface CompanySymbol {
  symbol: string;
  companyName: string;
}

export interface FinancialStatementSymbol extends CompanySymbol {
  tradingCurrency: string;
  reportingCurrency: string;
}

export interface CIKEntry {
  cik: string;
  companyName: string;
}

export interface SymbolChange {
  date: string;
  companyName: string;
  oldSymbol: string;
  newSymbol: string;
}

export interface ETFEntry {
  symbol: string;
  name: string;
}

export interface ActivelyTradingEntry {
  symbol: string;
  name: string;
}

export interface EarningsTranscriptEntry {
  symbol: string;
  companyName: string;
  noOfTranscripts: string;
}

export interface ExchangeEntry {
  exchange: string;
  name: string;
  countryName: string;
  countryCode: string;
  symbolSuffix: string;
  delay: string
}

export interface SectorEntry {
  sector: string;
}

export interface IndustryEntry {
  industry: string;
}

export interface CountryEntry {
  country: string;
}
