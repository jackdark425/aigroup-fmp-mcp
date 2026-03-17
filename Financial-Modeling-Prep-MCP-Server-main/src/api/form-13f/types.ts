// Institutional Ownership Filings API types
export interface InstitutionalOwnershipFiling {
  cik: string;
  name: string;
  date: string;
  filingDate: string;
  acceptedDate: string;
  formType: string;
  link: string;
  finalLink: string;
}

// SEC Filings Extract API types
export interface SecFilingExtract {
  date: string;
  filingDate: string;
  acceptedDate: string;
  cik: string;
  securityCusip: string;
  symbol: string;
  nameOfIssuer: string;
  shares: number;
  titleOfClass: string;
  sharesType: string;
  putCallShare: string;
  value: number;
  link: string;
  finalLink: string;
}

// Form 13F Filings Dates API types
export interface Form13FFilingDate {
  date: string;
  year: number;
  quarter: number;
}

// Filings Extract With Analytics By Holder API types
export interface FilingExtractAnalytics {
  date: string;
  cik: string;
  filingDate: string;
  investorName: string;
  symbol: string;
  securityName: string;
  typeOfSecurity: string;
  securityCusip: string;
  sharesType: string;
  putCallShare: string;
  investmentDiscretion: string;
  industryTitle: string;
  weight: number;
  lastWeight: number;
  changeInWeight: number;
  changeInWeightPercentage: number;
  marketValue: number;
  lastMarketValue: number;
  changeInMarketValue: number;
  changeInMarketValuePercentage: number;
  sharesNumber: number;
  lastSharesNumber: number;
  changeInSharesNumber: number;
  changeInSharesNumberPercentage: number;
  quarterEndPrice: number;
  avgPricePaid: number;
  isNew: boolean;
  isSoldOut: boolean;
  ownership: number;
  lastOwnership: number;
  changeInOwnership: number;
  changeInOwnershipPercentage: number;
  holdingPeriod: number;
  firstAdded: string;
  performance: number;
  performancePercentage: number;
  lastPerformance: number;
  changeInPerformance: number;
  isCountedForPerformance: boolean;
}

// Holder Performance Summary API types
export interface HolderPerformanceSummary {
  date: string;
  cik: string;
  investorName: string;
  portfolioSize: number;
  securitiesAdded: number;
  securitiesRemoved: number;
  marketValue: number;
  previousMarketValue: number;
  changeInMarketValue: number;
  changeInMarketValuePercentage: number;
  averageHoldingPeriod: number;
  averageHoldingPeriodTop10: number;
  averageHoldingPeriodTop20: number;
  turnover: number;
  turnoverAlternateSell: number;
  turnoverAlternateBuy: number;
  performance: number;
  performancePercentage: number;
  lastPerformance: number;
  changeInPerformance: number;
  performance1year: number;
  performancePercentage1year: number;
  performance3year: number;
  performancePercentage3year: number;
  performance5year: number;
  performancePercentage5year: number;
  performanceSinceInception: number;
  performanceSinceInceptionPercentage: number;
  performanceRelativeToSP500Percentage: number;
  performance1yearRelativeToSP500Percentage: number;
  performance3yearRelativeToSP500Percentage: number;
  performance5yearRelativeToSP500Percentage: number;
  performanceSinceInceptionRelativeToSP500Percentage: number;
}

// Holders Industry Breakdown API types
export interface HolderIndustryBreakdown {
  date: string;
  cik: string;
  investorName: string;
  industryTitle: string;
  weight: number;
  lastWeight: number;
  changeInWeight: number;
  changeInWeightPercentage: number;
  performance: number;
  performancePercentage: number;
  lastPerformance: number;
  changeInPerformance: number;
}

// Positions Summary API types
export interface PositionsSummary {
  symbol: string;
  cik: string;
  date: string;
  investorsHolding: number;
  lastInvestorsHolding: number;
  investorsHoldingChange: number;
  numberOf13Fshares: number;
  lastNumberOf13Fshares: number;
  numberOf13FsharesChange: number;
  totalInvested: number;
  lastTotalInvested: number;
  totalInvestedChange: number;
  ownershipPercent: number;
  lastOwnershipPercent: number;
  ownershipPercentChange: number;
  newPositions: number;
  lastNewPositions: number;
  newPositionsChange: number;
  increasedPositions: number;
  lastIncreasedPositions: number;
  increasedPositionsChange: number;
  closedPositions: number;
  lastClosedPositions: number;
  closedPositionsChange: number;
  reducedPositions: number;
  lastReducedPositions: number;
  reducedPositionsChange: number;
  totalCalls: number;
  lastTotalCalls: number;
  totalCallsChange: number;
  totalPuts: number;
  lastTotalPuts: number;
  totalPutsChange: number;
  putCallRatio: number;
  lastPutCallRatio: number;
  putCallRatioChange: number;
}

// Industry Performance Summary API types
export interface IndustryPerformanceSummary {
  industryTitle: string;
  industryValue: number;
  date: string;
}
