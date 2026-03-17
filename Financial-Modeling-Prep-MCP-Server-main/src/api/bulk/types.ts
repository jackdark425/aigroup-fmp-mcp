export interface CompanyProfile {
  symbol: string;
  price: number;
  marketCap: number;
  beta: number;
  lastDividend: number;
  range: string;
  change: number;
  changePercentage: number;
  volume: number;
  averageVolume: number;
  companyName: string;
  currency: string;
  cik: string | null;
  isin: string;
  cusip: string | null;
  exchangeFullName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string | null;
  zip: string;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export interface StockRating {
  symbol: string;
  date: string;
  rating: string;
  ratingRecommendation: string;
  ratingDetailsDCFRecommendation: string;
  ratingDetailsROERecommendation: string;
  ratingDetailsROARecommendation: string;
  ratingDetailsDERecommendation: string;
  ratingDetailsPERecommendation: string;
  ratingDetailsPBRecommendation: string;
}

export interface DCFValuation {
  symbol: string;
  date: string;
  discountedCashFlow: string;
  dcfPercentDiff: string;
}

export interface FinancialScore {
  symbol: string;
  reportedCurrency: string;
  altmanZScore: string;
  piotroskiScore: string;
  workingCapital: string;
  totalAssets: string;
  retainedEarnings: string;
  ebit: string;
  marketCap: string;
  totalLiabilities: string;
  revenue: string;
}

export interface PriceTargetSummary {
  symbol: string;
  lastMonth: string;
  lastMonthAvgPT: string;
  lastMonthAvgPTPercentDif: string;
  lastQuarter: string;
  lastQuarterAvgPT: string;
  lastQuarterAvgPTPercentDif: string;
  lastYear: string;
  lastYearAvgPT: string;
  lastYearAvgPTPercentDif: string;
  allTime: string;
  allTimeAvgPT: string;
  allTimeAvgPTPercentDif: string;
  publishers: string;
}

export interface ETFHolder {
  symbol: string;
  sharesNumber: string;
  asset: string;
  weightPercentage: string;
  cusip: string;
  isin: string;
  name: string;
  marketValue: string;
  updatedAt: string;
}

export interface UpgradesDowngradesConsensus {
  symbol: string;
  strongBuy: string;
  buy: string;
  hold: string;
  sell: string;
  strongSell: string;
  consensus: string;
}

export interface KeyMetricsTTM {
  symbol: string;
  marketCapTTM: string;
  enterpriseValueTTM: string;
  evToSalesTTM: string;
  evToOperatingCashFlowTTM: string;
  evToFreeCashFlowTTM: string;
  evToEBITDATTM: string;
  netDebtToEBITDATTM: string;
  currentRatioTTM: string;
  incomeQualityTTM: string;
  grahamNumberTTM: string;
  grahamNetNetTTM: string;
  workingCapitalTTM: string;
  investedCapitalTTM: string;
  returnOnAssetsTTM: string;
  returnOnEquityTTM: string;
  returnOnInvestedCapitalTTM: string;
  earningsYieldTTM: string;
  freeCashFlowYieldTTM: string;
  capexToOperatingCashFlowTTM: string;
  capexToRevenueTTM: string;
  // Plus many more financial metrics...
}

export interface RatiosTTM {
  symbol: string;
  grossProfitMarginTTM: string;
  operatingProfitMarginTTM: string;
  netProfitMarginTTM: string;
  currentRatioTTM: string;
  quickRatioTTM: string;
  priceToEarningsRatioTTM: string;
  priceToBookRatioTTM: string;
  priceToSalesRatioTTM: string;
  debtToEquityRatioTTM: string;
  dividendYieldTTM: string;
  dividendYieldPercentageTTM: string;
  // Plus many more financial ratios...
}

export interface StockPeer {
  symbol: string;
  peers: string;
}

export interface EarningsSurprise {
  symbol: string;
  date: string;
  epsActual: string;
  epsEstimated: string;
  lastUpdated: string;
}

export interface FinancialStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: string;
}

export interface IncomeStatement extends FinancialStatement {
  revenue: string;
  costOfRevenue: string;
  grossProfit: string;
  operatingExpenses: string;
  operatingIncome: string;
  incomeBeforeTax: string;
  incomeTaxExpense: string;
  netIncome: string;
  eps: string;
  epsDiluted: string;
  // Plus more income statement fields...
}

export interface IncomeStatementGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  growthRevenue: string;
  growthCostOfRevenue: string;
  growthGrossProfit: string;
  growthOperatingExpenses: string;
  growthOperatingIncome: string;
  growthNetIncome: string;
  // Plus more growth fields...
}

export interface BalanceSheetStatement extends FinancialStatement {
  cashAndCashEquivalents: string;
  shortTermInvestments: string;
  totalCurrentAssets: string;
  propertyPlantEquipmentNet: string;
  goodwill: string;
  totalAssets: string;
  totalCurrentLiabilities: string;
  totalLiabilities: string;
  totalStockholdersEquity: string;
  // Plus more balance sheet fields...
}

export interface BalanceSheetGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  growthCashAndCashEquivalents: string;
  growthTotalCurrentAssets: string;
  growthTotalAssets: string;
  growthTotalLiabilities: string;
  growthTotalStockholdersEquity: string;
  // Plus more growth fields...
}

export interface CashFlowStatement extends FinancialStatement {
  netIncome: string;
  operatingCashFlow: string;
  capitalExpenditure: string;
  freeCashFlow: string;
  netCashProvidedByOperatingActivities: string;
  netCashProvidedByInvestingActivities: string;
  netCashProvidedByFinancingActivities: string;
  // Plus more cash flow fields...
}

export interface CashFlowGrowth {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  growthNetIncome: string;
  growthOperatingCashFlow: string;
  growthCapitalExpenditure: string;
  growthFreeCashFlow: string;
  // Plus more growth fields...
}

export interface EODData {
  symbol: string;
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  adjClose: number;
  volume: number;
}

export interface PartParams {
  part: string;
}

export interface YearPeriodParams {
  year: string;
  period: string;
}

export interface EarningsSurpriseParams {
  year: string;
}

export interface EODParams {
  date: string;
}
