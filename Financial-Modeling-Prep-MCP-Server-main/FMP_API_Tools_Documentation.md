# Financial Modeling Prep (FMP) API Tools Documentation

This document provides a comprehensive list of all available tools in the Financial Modeling Prep MCP Server and their respective return object types.

## Technical Indicators

| Tool Name | Return Type |
|-----------|-------------|
| getSMA | `SMAIndicator[]` |
| getEMA | `EMAIndicator[]` |
| getWMA | `WMAIndicator[]` |
| getDEMA | `DEMAIndicator[]` |
| getTEMA | `TEMAIndicator[]` |
| getRSI | `RSIIndicator[]` |
| getStandardDeviation | `StandardDeviationIndicator[]` |
| getWilliams | `WilliamsIndicator[]` |
| getADX | `ADXIndicator[]` |

## Search

| Tool Name | Return Type |
|-----------|-------------|
| searchSymbol | `SymbolSearchResult[]` |
| searchName | `NameSearchResult[]` |
| searchCIK | `CIKSearchResult[]` |
| searchCUSIP | `CUSIPSearchResult[]` |
| searchISIN | `ISINSearchResult[]` |
| stockScreener | `StockScreenerResult[]` |
| getExchangeVariants | `ExchangeVariantResult[]` |

## Quotes

| Tool Name | Return Type |
|-----------|-------------|
| getQuote | `StockQuote[]` |
| getQuoteShort | `StockQuoteShort[]` |
| getAftermarketTrade | `AftermarketTrade[]` |
| getAftermarketQuote | `AftermarketQuote[]` |
| getStockPriceChange | `StockPriceChange[]` |
| getBatchQuotes | `StockQuote[]` |
| getBatchQuotesShort | `StockQuoteShort[]` |
| getBatchAftermarketTrade | `AftermarketTrade[]` |
| getBatchAftermarketQuote | `AftermarketQuote[]` |
| getExchangeQuotes | `StockQuoteShort[]` |
| getMutualFundQuotes | `StockQuoteShort[]` |
| getETFQuotes | `StockQuoteShort[]` |
| getCommodityQuotes | `StockQuoteShort[]` |
| getCryptoQuotes | `StockQuoteShort[]` |
| getForexQuotes | `StockQuoteShort[]` |
| getIndexQuotes | `StockQuoteShort[]` |

## Company

| Tool Name | Return Type |
|-----------|-------------|
| getProfile | `CompanyProfile[]` |
| getProfileByCIK | `CompanyProfile[]` |
| getNotes | `CompanyNote[]` |
| getPeers | `StockPeer[]` |
| getDelistedCompanies | `DelistedCompany[]` |
| getEmployeeCount | `EmployeeCount[]` |
| getHistoricalEmployeeCount | `EmployeeCount[]` |
| getMarketCap | `MarketCap[]` |
| getBatchMarketCap | `MarketCap[]` |
| getHistoricalMarketCap | `MarketCap[]` |
| getShareFloat | `ShareFloat[]` |
| getAllShareFloat | `ShareFloat[]` |
| getLatestMergersAcquisitions | `MergerAcquisition[]` |
| getMergersAcquisitionsBySymbol | `MergerAcquisition[]` |
| getExecutives | `CompanyExecutive[]` |
| getExecutiveCompensation | `ExecutiveCompensation[]` |
| getExecutiveCompensationBenchmark | `ExecutiveCompensationBenchmark[]` |

## Financial Statements

| Tool Name | Return Type |
|-----------|-------------|
| getIncomeStatement | `IncomeStatement[]` |
| getBalanceSheetStatement | `BalanceSheetStatement[]` |
| getCashFlowStatement | `CashFlowStatement[]` |
| getLatestFinancialStatements | `LatestFinancialStatement[]` |
| getIncomeStatementTTM | `IncomeStatement[]` |
| getBalanceSheetStatementTTM | `BalanceSheetStatement[]` |
| getCashFlowStatementTTM | `CashFlowStatement[]` |
| getIncomeStatementGrowth | `IncomeStatementGrowth[]` |
| getBalanceSheetStatementGrowth | `BalanceSheetStatementGrowth[]` |
| getCashFlowStatementGrowth | `CashFlowStatementGrowth[]` |
| getFinancialStatementGrowth | `FinancialStatementGrowth[]` |
| getFinancialReportsDates | `FinancialReportDate[]` |
| getFinancialReportJSON | `FinancialReport10K[]` |
| getFinancialReportXLSX | `any` |
| getRevenueProductSegmentation | `RevenueProductSegmentation[]` |
| getRevenueGeographicSegmentation | `RevenueGeographicSegmentation[]` |
| getIncomeStatementAsReported | `AsReportedIncomeStatement[]` |
| getBalanceSheetStatementAsReported | `AsReportedBalanceSheet[]` |
| getCashFlowStatementAsReported | `AsReportedCashFlowStatement[]` |
| getFinancialStatementFullAsReported | `AsReportedFinancialStatement[]` |
| getKeyMetrics | `KeyMetrics[]` |
| getRatios | `Ratios[]` |
| getKeyMetricsTTM | `KeyMetricsTTM[]` |
| getFinancialRatiosTTM | `FinancialRatiosTTM[]` |
| getFinancialScores | `FinancialScores[]` |
| getOwnerEarnings | `OwnerEarnings[]` |

## Market Performance

| Tool Name | Return Type |
|-----------|-------------|
| getSectorPerformanceSnapshot | `SectorPerformance[]` |
| getIndustryPerformanceSnapshot | `IndustryPerformance[]` |
| getHistoricalSectorPerformance | `SectorPerformance[]` |
| getHistoricalIndustryPerformance | `IndustryPerformance[]` |
| getSectorPESnapshot | `SectorPE[]` |
| getIndustryPESnapshot | `IndustryPE[]` |
| getHistoricalSectorPE | `SectorPE[]` |
| getHistoricalIndustryPE | `IndustryPE[]` |
| getBiggestGainers | `StockMovement[]` |
| getBiggestLosers | `StockMovement[]` |
| getMostActiveStocks | `StockMovement[]` |

## News

| Tool Name | Return Type |
|-----------|-------------|
| getFMPArticles | `FMPArticle[]` |
| getGeneralNews | `NewsArticle[]` |
| getPressReleases | `NewsArticle[]` |
| getStockNews | `NewsArticle[]` |
| getCryptoNews | `NewsArticle[]` |
| getForexNews | `NewsArticle[]` |

## Indexes

| Tool Name | Return Type |
|-----------|-------------|
| getIndexList | `IndexItem[]` |
| getIndexQuote | `IndexQuote[]` |
| getIndexShortQuote | `IndexShortQuote[]` |
| getAllIndexQuotes | `IndexShortQuote[]` |
| getHistoricalIndexLightChart | `IndexLightChart[]` |
| getHistoricalIndexFullChart | `IndexFullChart[]` |
| getIndex1MinuteData | `IndexIntradayData[]` |
| getIndex5MinuteData | `IndexIntradayData[]` |
| getIndex1HourData | `IndexIntradayData[]` |
| getSP500Constituents | `IndexConstituent[]` |
| getNasdaqConstituents | `IndexConstituent[]` |
| getDowJonesConstituents | `IndexConstituent[]` |
| getHistoricalSP500Changes | `HistoricalIndexChange[]` |
| getHistoricalNasdaqChanges | `HistoricalIndexChange[]` |
| getHistoricalDowJonesChanges | `HistoricalIndexChange[]` |

## Insider Trades

| Tool Name | Return Type |
|-----------|-------------|
| getLatestInsiderTrading | `InsiderTrading[]` |
| getInsiderTradingBySymbol | `InsiderTrading[]` |
| getInsiderTradingByReportingName | `InsiderReportingName[]` |
| getInsiderTransactionTypes | `InsiderTransactionType[]` |
| getInsiderTradeStatistics | `InsiderTradeStatistics[]` |
| getAcquisitionOwnership | `AcquisitionOwnership[]` |

## Market Hours

| Tool Name | Return Type |
|-----------|-------------|
| getExchangeMarketHours | `ExchangeMarketHours[]` |
| getHolidaysByExchange | `HolidayByExchange[]` |
| getAllExchangeMarketHours | `ExchangeMarketHours[]` |

## Form 13F

| Tool Name | Return Type |
|-----------|-------------|
| getLatestFilings | `InstitutionalOwnershipFiling[]` |
| getFilingExtract | `SecFilingExtract[]` |
| getFilingDates | `Form13FFilingDate[]` |
| getFilingExtractAnalyticsByHolder | `FilingExtractAnalytics[]` |
| getHolderPerformanceSummary | `HolderPerformanceSummary[]` |
| getHolderIndustryBreakdown | `HolderIndustryBreakdown[]` |
| getPositionsSummary | `PositionsSummary[]` |
| getIndustryPerformanceSummary | `IndustryPerformanceSummary[]` |

## Fund

| Tool Name | Parameters | Return Type |
|-----------|------------|-------------|
| getFundHoldings | symbol (string) | `FundHolding[]` |
| getFundInfo | symbol (string) | `FundInfo` |
| getFundCountryAllocation | symbol (string) | `FundCountryAllocation[]` |
| getFundAssetExposure | symbol (string) | `FundAssetExposure[]` |
| getFundSectorWeighting | symbol (string) | `FundSectorWeighting[]` |
| getDisclosure | symbol (string) | `FundDisclosureHolder[]` |
| getFundDisclosure | symbol (string), year (number), quarter (number), cik? (string) | `FundDisclosure[]` |
| searchFundDisclosures | name (string) | `FundDisclosureSearch[]` |
| getFundDisclosureDates | symbol (string), cik? (string) | `FundDisclosureDate[]` |

## Fundraisers

| Tool Name | Return Type |
|-----------|-------------|
| getLatestCrowdfundingCampaigns | `CrowdfundingCampaign[]` |
| searchCrowdfundingCampaigns | `CrowdfundingSearchResult[]` |
| getCrowdfundingCampaignsByCIK | `CrowdfundingCampaign[]` |
| getLatestEquityOfferings | `EquityOffering[]` |
| searchEquityOfferings | `EquityOfferingSearchResult[]` |
| getEquityOfferingsByCIK | `EquityOffering[]` |

## Government Trading

| Tool Name | Return Type |
|-----------|-------------|
| getFinancialDisclosures | `FinancialDisclosure[]` |
| getFinancialDisclosuresBySymbol | `FinancialDisclosure[]` |
| getFinancialDisclosuresByName | `FinancialDisclosure[]` |

## Economics

| Tool Name | Parameters | Return Type |
|-----------|------------|-------------|
| getTreasuryRates | from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `TreasuryRate[]` |
| getEconomicIndicators | name (string), from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `EconomicIndicator[]` |
| getEconomicCalendar | from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `EconomicCalendar[]` |
| getMarketRiskPremium | (no parameters) | `MarketRiskPremium[]` |

## ESG

| Tool Name | Parameters | Return Type |
|-----------|------------|-------------|
| getESGDisclosures | symbol (string) | `ESGDisclosure[]` |
| getESGRatings | symbol (string) | `ESGRating[]` |
| getESGBenchmarks | year? (string) | `ESGBenchmark[]` |

## Forex

| Tool Name | Parameters | Return Type |
|-----------|------------|-------------|
| getForexList | (no parameters) | `ForexPair[]` |
| getForexQuote | symbol (string) | `ForexQuote[]` |
| getForexShortQuote | symbol (string) | `ForexShortQuote[]` |
| getForexBatchQuotes | short? (boolean) | `ForexShortQuote[]` |
| getForexHistoricalLightChart | symbol (string), from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `ForexLightChart[]` |
| getForexHistoricalFullChart | symbol (string), from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `ForexHistoricalChart[]` |
| getForex1MinuteData | symbol (string), from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `ForexIntradayChart[]` |
| getForex5MinuteData | symbol (string), from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `ForexIntradayChart[]` |
| getForex1HourData | symbol (string), from? (YYYY-MM-DD), to? (YYYY-MM-DD) | `ForexIntradayChart[]` |

## DCF

| Tool Name | Return Type |
|-----------|-------------|
| getDCFValuation | `DCFValuation` |
| getLeveredDCFValuation | `DCFValuation[]` |
| calculateCustomDCF | `CustomDCFOutput` |
| calculateCustomLeveredDCF | `CustomDCFOutput` |

## Directory

| Tool Name | Description | Return Type |
|-----------|-------------|-------------|
| getCompanySymbols | Get a list of all company symbols | `CompanySymbol[]` |
| getFinancialStatementSymbols | Get a list of companies with available financial statements | `FinancialStatementSymbol[]` |
| getCIKList | Get a list of CIK numbers for SEC-registered entities | `CIKEntry[]` |
| getSymbolChanges | Get a list of stock symbol changes | `SymbolChange[]` |
| getETFList | Get a list of ETFs | `ETFEntry[]` |
| getActivelyTradingList | Get a list of actively trading companies | `ActivelyTradingEntry[]` |
| getEarningsTranscriptSymbols | Get a list of companies with earnings transcripts | `EarningsTranscriptEntry[]` |
| getExchangeList | Get a list of available exchanges | `ExchangeEntry[]` |
| getSectorList | Get a list of available sectors | `SectorEntry[]` |
| getIndustryList | Get a list of available industries | `IndustryEntry[]` |
| getCountryList | Get a list of available countries | `CountryEntry[]` |

## Earnings Transcript

| Tool Name | Return Type |
|-----------|-------------|
| getLatestTranscripts | `LatestEarningTranscript[]` |
| getTranscript | `EarningTranscript[]` |
| getTranscriptDates | `TranscriptDate[]` |
| getAvailableSymbols | `AvailableTranscriptSymbol[]` |

## COT (Commitment of Traders)

| Tool Name | Return Type |
|-----------|-------------|
| getCOTReports | `COTReport[]` |
| getCOTAnalysis | `COTAnalysis[]` |
| getCOTList | `COTList[]` |

## Crypto

| Tool Name | Return Type |
|-----------|-------------|
| getCryptocurrencyList | `Cryptocurrency[]` |
| getCryptocurrencyQuote | `CryptocurrencyQuote[]` |
| getCryptocurrencyShortQuote | `CryptocurrencyShortQuote[]` |
| getCryptocurrencyBatchQuotes | `CryptocurrencyShortQuote[]` |
| getCryptocurrencyHistoricalLightChart | `CryptocurrencyLightChart[]` |
| getCryptocurrencyHistoricalFullChart | `CryptocurrencyHistoricalChart[]` |
| getCryptocurrency1MinuteData | `CryptocurrencyIntradayPrice[]` |
| getCryptocurrency5MinuteData | `CryptocurrencyIntradayPrice[]` |
| getCryptocurrency1HourData | `CryptocurrencyIntradayPrice[]` |

## Chart

| Tool Name | Return Type |
|-----------|-------------|
| getLightChart | `LightChartData[]` |
| getFullChart | `ChartData[]` |
| getUnadjustedChart | `UnadjustedChartData[]` |
| getDividendAdjustedChart | `UnadjustedChartData[]` |
| getIntradayChart | `IntradayChartData[]` |

## Commodity

| Tool Name | Return Type |
|-----------|-------------|
| listCommodities | `Commodity[]` |

## Analyst

| Tool Name | Return Type |
|-----------|-------------|
| getAnalystEstimates | `AnalystEstimate[]` |
| getRatingsSnapshot | `RatingsSnapshot[]` |
| getHistoricalRatings | `HistoricalRating[]` |
| getPriceTargetSummary | `PriceTargetSummary[]` |
| getPriceTargetConsensus | `PriceTargetConsensus[]` |
| getPriceTargetNews | `PriceTargetNews[]` |
| getStockGrades | `StockGrade[]` |
| getHistoricalStockGrades | `HistoricalStockGrade[]` |
| getStockGradeSummary | `StockGradeSummary[]` |
| getStockGradeNews | `StockGradeNews[]` |

## Bulk

**Important Note**: All bulk endpoints return data in CSV format as raw strings rather than parsed JSON objects. This endpoint returns the response as a CSV file. The provided sample response represents an individual record. This design preserves the original FMP API format and provides better performance for large datasets.

| Tool Name | Return Type |
|-----------|-------------|
| getCompanyProfiles | `string` (CSV format) |
| getStockRatings | `string` (CSV format) |
| getDCFValuations | `string` (CSV format) |
| getFinancialScores | `string` (CSV format) |
| getPriceTargetSummaries | `string` (CSV format) |
| getETFHolders | `string` (CSV format) |
| getUpgradesDowngradesConsensus | `string` (CSV format) |
| getKeyMetricsTTM | `string` (CSV format) |
| getRatiosTTM | `string` (CSV format) |
| getStockPeers | `string` (CSV format) |
| getEarningsSurprises | `string` (CSV format) |
| getIncomeStatements | `string` (CSV format) |
| getIncomeStatementGrowth | `string` (CSV format) |
| getBalanceSheetStatements | `string` (CSV format) |
| getBalanceSheetGrowth | `string` (CSV format) |
| getCashFlowStatements | `string` (CSV format) |
| getCashFlowGrowth | `string` (CSV format) |
| getEODData | `string` (CSV format) |

## Calendar

| Tool Name | Return Type |
|-----------|-------------|
| getDividendCalendar | `Dividend[]` |
| getEarningsCalendar | `EarningsReport[]` |
| getIPOCalendar | `IPO[]` |
| getIPODisclosures | `IPODisclosure[]` |
| getIPOProspectus | `IPOProspectus[]` |
| getStockSplitCalendar | `StockSplit[]` |

## SEC Filings

| Tool Name | Return Type |
|-----------|-------------|
| getLatest8KFilings | `SECFiling[]` |
| getLatestFinancialFilings | `SECFiling[]` |
| getFilingsByFormType | `SECFiling[]` |
| getFilingsBySymbol | `SECFiling[]` |
| getFilingsByCIK | `SECFiling[]` |
| searchCompanyByName | `CompanySearchResult[]` |
| searchCompanyBySymbol | `CompanySearchResult[]` |
| searchCompanyByCIK | `CompanySearchResult[]` |
| getCompanyProfile | `CompanyProfile[]` |
| getIndustryClassificationList | `IndustryClassification[]` |
| searchIndustryClassification | `IndustryClassification[]` |
| getAllIndustryClassification | `IndustryClassification[]` |

---

## Return Type Definitions

All return types are defined as TypeScript interfaces in their respective `types.ts` files within each API module. Each interface contains detailed field definitions that specify the structure and data types of the returned objects.

For example:
- `StockQuote` contains fields like symbol, name, price, changePercentage, volume, etc.
- `CompanyProfile` contains comprehensive company information including financials, contact details, and market data
- `IncomeStatement` contains detailed financial statement data with revenue, expenses, and profit metrics

Refer to the individual type definition files in the `/src/api/*/types.ts` files for complete field specifications for each return type.

---

## Complete Interface Definitions

### Technical Indicators

```typescript
interface TechnicalIndicatorBase {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface SMAIndicator extends TechnicalIndicatorBase {
  sma: number;
}

interface EMAIndicator extends TechnicalIndicatorBase {
  ema: number;
}

interface WMAIndicator extends TechnicalIndicatorBase {
  wma: number;
}

interface DEMAIndicator extends TechnicalIndicatorBase {
  dema: number;
}

interface TEMAIndicator extends TechnicalIndicatorBase {
  tema: number;
}

interface RSIIndicator extends TechnicalIndicatorBase {
  rsi: number;
}

interface StandardDeviationIndicator extends TechnicalIndicatorBase {
  standardDeviation: number;
}

interface WilliamsIndicator extends TechnicalIndicatorBase {
  williams: number;
}

interface ADXIndicator extends TechnicalIndicatorBase {
  adx: number;
}
```

### Search

```typescript
interface SymbolSearchResult {
  symbol: string;
  name: string;
  currency: string;
  exchangeFullName: string;
  exchange: string;
}

interface NameSearchResult {
  symbol: string;
  name: string;
  currency: string;
  exchangeFullName: string;
  exchange: string;
}

interface CIKSearchResult {
  symbol: string;
  companyName: string;
  cik: string;
  exchangeFullName: string;
  exchange: string;
  currency: string;
}

interface CUSIPSearchResult {
  symbol: string;
  companyName: string;
  cusip: string;
  marketCap: number;
}

interface ISINSearchResult {
  symbol: string;
  name: string;
  isin: string;
  marketCap: number;
}

interface StockScreenerResult {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string;
  industry: string;
  beta: number;
  price: number;
  lastAnnualDividend: number;
  volume: number;
  exchange: string;
  exchangeShortName: string;
  country: string;
  isEtf: boolean;
  isFund: boolean;
  isActivelyTrading: boolean;
}

interface ExchangeVariantResult {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
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
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}
```

### Quotes

```typescript
interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}

interface StockQuoteShort {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

interface AftermarketTrade {
  symbol: string;
  price: number;
  tradeSize: number;
  timestamp: number;
}

interface AftermarketQuote {
  symbol: string;
  bidSize: number;
  bidPrice: number;
  askSize: number;
  askPrice: number;
  volume: number;
  timestamp: number;
}

interface StockPriceChange {
  symbol: string;
  "1D": number;
  "5D": number;
  "1M": number;
  "3M": number;
  "6M": number;
  ytd: number;
  "1Y": number;
  "3Y": number;
  "5Y": number;
  "10Y": number;
  max: number;
}
```

### Company

```typescript
interface CompanyProfile {
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
  cik: string;
  isin: string;
  cusip: string;
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
  state: string;
  zip: string;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

interface CompanyNote {
  cik: string;
  symbol: string;
  title: string;
  exchange: string;
}

interface StockPeer {
  symbol: string;
  companyName: string;
  price: number;
  mktCap: number;
}

interface DelistedCompany {
  symbol: string;
  companyName: string;
  exchange: string;
  ipoDate: string;
  delistedDate: string;
}

interface EmployeeCount {
  symbol: string;
  cik: string;
  acceptanceTime: string;
  periodOfReport: string;
  companyName: string;
  formType: string;
  filingDate: string;
  employeeCount: number;
  source: string;
}

interface MarketCap {
  symbol: string;
  date: string;
  marketCap: number;
}

interface ShareFloat {
  symbol: string;
  date: string;
  freeFloat: number;
  floatShares: number;
  outstandingShares: number;
}

interface MergerAcquisition {
  symbol: string;
  companyName: string;
  cik: string;
  targetedCompanyName: string;
  targetedCik: string;
  targetedSymbol: string;
  transactionDate: string;
  acceptedDate: string;
  link: string;
}

interface CompanyExecutive {
  title: string;
  name: string;
  pay: number | null;
  currencyPay: string;
  gender: string | null;
  yearBorn: number | null;
  active: boolean | null;
}

interface ExecutiveCompensation {
  cik: string;
  symbol: string;
  companyName: string;
  filingDate: string;
  acceptedDate: string;
  nameAndPosition: string;
  year: number;
  salary: number;
  bonus: number;
  stockAward: number;
  optionAward: number;
  incentivePlanCompensation: number;
  allOtherCompensation: number;
  total: number;
  link: string;
}

interface ExecutiveCompensationBenchmark {
  industryTitle: string;
  year: number;
  averageCompensation: number;
}
```

### Financial Statements

```typescript
type Period = "Q1" | "Q2" | "Q3" | "Q4" | "FY";

interface BaseStatement {
  date: string;
  symbol: string;
  reportedCurrency: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  fiscalYear: string;
  period: Period;
}

interface IncomeStatement extends BaseStatement {
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  netInterestIncome: number;
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebit: number;
  nonOperatingIncomeExcludingInterest: number;
  operatingIncome: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  netIncomeFromContinuingOperations: number;
  netIncomeFromDiscontinuedOperations: number;
  otherAdjustmentsToNetIncome: number;
  netIncome: number;
  netIncomeDeductions: number;
  bottomLineNetIncome: number;
  eps: number;
  epsDiluted: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
}

interface BalanceSheetStatement extends BaseStatement {
  cashAndCashEquivalents: number;
  shortTermInvestments: number;
  cashAndShortTermInvestments: number;
  netReceivables: number;
  accountsReceivables: number;
  otherReceivables: number;
  inventory: number;
  prepaids: number;
  otherCurrentAssets: number;
  totalCurrentAssets: number;
  propertyPlantEquipmentNet: number;
  goodwill: number;
  intangibleAssets: number;
  goodwillAndIntangibleAssets: number;
  longTermInvestments: number;
  taxAssets: number;
  otherNonCurrentAssets: number;
  totalNonCurrentAssets: number;
  otherAssets: number;
  totalAssets: number;
  totalPayables: number;
  accountPayables: number;
  otherPayables: number;
  accruedExpenses: number;
  shortTermDebt: number;
  capitalLeaseObligationsCurrent: number;
  taxPayables: number;
  deferredRevenue: number;
  otherCurrentLiabilities: number;
  totalCurrentLiabilities: number;
  longTermDebt: number;
  deferredRevenueNonCurrent: number;
  deferredTaxLiabilitiesNonCurrent: number;
  otherNonCurrentLiabilities: number;
  totalNonCurrentLiabilities: number;
  otherLiabilities: number;
  capitalLeaseObligations: number;
  totalLiabilities: number;
  treasuryStock: number;
  preferredStock: number;
  commonStock: number;
  retainedEarnings: number;
  additionalPaidInCapital: number;
  accumulatedOtherComprehensiveIncomeLoss: number;
  otherTotalStockholdersEquity: number;
  totalStockholdersEquity: number;
  totalEquity: number;
  minorityInterest: number;
  totalLiabilitiesAndTotalEquity: number;
  totalInvestments: number;
  totalDebt: number;
  netDebt: number;
}

interface CashFlowStatement extends BaseStatement {
  netIncome: number;
  depreciationAndAmortization: number;
  deferredIncomeTax: number;
  stockBasedCompensation: number;
  changeInWorkingCapital: number;
  accountsReceivables: number;
  inventory: number;
  accountsPayables: number;
  otherWorkingCapital: number;
  otherNonCashItems: number;
  netCashProvidedByOperatingActivities: number;
  investmentsInPropertyPlantAndEquipment: number;
  acquisitionsNet: number;
  purchasesOfInvestments: number;
  salesMaturitiesOfInvestments: number;
  otherInvestingActivities: number;
  netCashProvidedByInvestingActivities: number;
  netDebtIssuance: number;
  longTermNetDebtIssuance: number;
  shortTermNetDebtIssuance: number;
  netStockIssuance: number;
  netCommonStockIssuance: number;
  commonStockIssuance: number;
  commonStockRepurchased: number;
  netPreferredStockIssuance: number;
  netDividendsPaid: number;
  commonDividendsPaid: number;
  preferredDividendsPaid: number;
  otherFinancingActivities: number;
  netCashProvidedByFinancingActivities: number;
  effectOfForexChangesOnCash: number;
  netChangeInCash: number;
  cashAtEndOfPeriod: number;
  cashAtBeginningOfPeriod: number;
  operatingCashFlow: number;
  capitalExpenditure: number;
  freeCashFlow: number;
  incomeTaxesPaid: number;
  interestPaid: number;
}

interface FinancialReportDate {
  symbol: string;
  fiscalYear: number;
  period: Period;
  linkXlsx: string;
  linkJson: string;
}

interface LatestFinancialStatement {
  symbol: string;
  calendarYear: number;
  period: Period;
  date: string;
  dateAdded: string;
}

interface RevenueProductSegmentation {
  symbol: string;
  fiscalYear: number;
  period: string;
  reportedCurrency: string | null;
  date: string;
  data: {
    [productCategory: string]: number;
  };
}

interface RevenueGeographicSegmentation {
  symbol: string;
  fiscalYear: number;
  period: string;
  reportedCurrency: string | null;
  date: string;
  data: {
    [region: string]: number;
  };
}

interface AsReportedStatement {
  symbol: string;
  fiscalYear: number;
  period: string;
  reportedCurrency: string | null;
  date: string;
  data: {
    [key: string]: number | string | null;
  };
}

interface AsReportedIncomeStatement extends AsReportedStatement {}
interface AsReportedBalanceSheet extends AsReportedStatement {}
interface AsReportedCashFlowStatement extends AsReportedStatement {}
interface AsReportedFinancialStatement extends AsReportedStatement {}
```

### Market Performance

```typescript
interface SectorPerformance {
  date: string;
  sector: string;
  exchange: string;
  averageChange: number;
}

interface IndustryPerformance {
  date: string;
  industry: string;
  exchange: string;
  averageChange: number;
}

interface SectorPE {
  date: string;
  sector: string;
  exchange: string;
  pe: number;
}

interface IndustryPE {
  date: string;
  industry: string;
  exchange: string;
  pe: number;
}

interface StockMovement {
  symbol: string;
  price: number;
  name: string;
  change: number;
  changesPercentage: number;
  exchange: string;
}
```

### News

```typescript
interface FMPArticle {
  title: string;
  date: string;
  content: string;
  tickers: string;
  image: string;
  link: string;
  author: string;
  site: string;
}

interface NewsArticle {
  symbol: string | null;
  publishedDate: string;
  publisher: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}
```

### Indexes

```typescript
interface IndexItem {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
}

interface IndexQuote {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number | null;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}

interface IndexShortQuote {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

interface IndexLightChart {
  symbol: string;
  date: string;
  price: number;
  volume: number;
}

interface IndexFullChart {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

interface IndexIntradayData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

interface IndexConstituent {
  symbol: string;
  name: string;
  sector: string;
  subSector: string;
  headQuarter: string;
  dateFirstAdded: string | null;
  cik: string;
  founded: string;
}

interface HistoricalIndexChange {
  dateAdded: string;
  addedSecurity: string;
  removedTicker: string;
  removedSecurity: string;
  date: string;
  symbol: string;
  reason: string;
}
```

### Insider Trades

```typescript
interface InsiderTrading {
  symbol: string;
  filingDate: string;
  transactionDate: string;
  reportingCik: string;
  companyCik: string;
  transactionType: string;
  securitiesOwned: number;
  reportingName: string;
  typeOfOwner: string;
  acquisitionOrDisposition: string;
  directOrIndirect: string;
  formType: string;
  securitiesTransacted: number;
  price: number;
  securityName: string;
  url: string;
}

interface InsiderReportingName {
  reportingCik: string;
  reportingName: string;
}

interface InsiderTransactionType {
  transactionType: string;
}

interface InsiderTradeStatistics {
  symbol: string;
  cik: string;
  year: number;
  quarter: number;
  acquiredTransactions: number;
  disposedTransactions: number;
  acquiredDisposedRatio: number;
  totalAcquired: number;
  totalDisposed: number;
  averageAcquired: number;
  averageDisposed: number;
  totalPurchases: number;
  totalSales: number;
}

interface AcquisitionOwnership {
  cik: string;
  symbol: string;
  filingDate: string;
  acceptedDate: string;
  cusip: string;
  nameOfReportingPerson: string;
  citizenshipOrPlaceOfOrganization: string;
  soleVotingPower: string;
  sharedVotingPower: string;
  soleDispositivePower: string;
  sharedDispositivePower: string;
  amountBeneficiallyOwned: string;
  percentOfClass: string;
  typeOfReportingPerson: string;
  url: string;
}
```

### Market Hours

```typescript
interface ExchangeMarketHours {
  exchange: string;
  name: string;
  openingHour: string;
  closingHour: string;
  timezone: string;
  isMarketOpen: boolean;
}

interface HolidayByExchange {
  exchange: string;
  date: string;
  name: string;
  isClosed: boolean;
  adjOpenTime: string | null;
  adjCloseTime: string | null;
}
```

### Form 13F

```typescript
interface InstitutionalOwnershipFiling {
  cik: string;
  name: string;
  date: string;
  filingDate: string;
  acceptedDate: string;
  formType: string;
  link: string;
  finalLink: string;
}

interface SecFilingExtract {
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

interface Form13FFilingDate {
  date: string;
  year: number;
  quarter: number;
}

interface FilingExtractAnalytics {
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

interface HolderPerformanceSummary {
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

interface HolderIndustryBreakdown {
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

interface PositionsSummary {
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

interface IndustryPerformanceSummary {
  industryTitle: string;
  industryValue: number;
  date: string;
}
```

### Fund

```typescript
interface FundSector {
  industry: string;
  exposure: number;
}

interface FundHolding {
  symbol: string;
  asset: string;
  name: string;
  isin: string;
  securityCusip: string;
  sharesNumber: number;
  weightPercentage: number;
  marketValue: number;
  updatedAt: string;
  updated: string;
}

interface FundInfo {
  symbol: string;
  name: string;
  description: string;
  isin: string;
  assetClass: string;
  securityCusip: string;
  domicile: string;
  website: string;
  etfCompany: string;
  expenseRatio: number;
  assetsUnderManagement: number;
  avgVolume: number;
  inceptionDate: string;
  nav: number;
  navCurrency: string;
  holdingsCount: number;
  updatedAt: string;
  sectorsList: FundSector[];
}

interface FundCountryAllocation {
  country: string;
  weightPercentage: string;
}

interface FundAssetExposure {
  symbol: string;
  asset: string;
  sharesNumber: number;
  weightPercentage: number;
  marketValue: number;
}

interface FundSectorWeighting {
  symbol: string;
  sector: string;
  weightPercentage: number;
}

interface FundDisclosureHolder {
  cik: string;
  holder: string;
  shares: number;
  dateReported: string;
  change: number;
  weightPercent: number;
}

interface FundDisclosure {
  cik: string;
  date: string;
  acceptedDate: string;
  symbol: string;
  name: string;
  lei: string;
  title: string;
  cusip: string;
  isin: string;
  balance: number;
  units: string;
  cur_cd: string;
  valUsd: number;
  pctVal: number;
  payoffProfile: string;
  assetCat: string;
  issuerCat: string;
  invCountry: string;
  isRestrictedSec: string;
  fairValLevel: string;
  isCashCollateral: string;
  isNonCashCollateral: string;
  isLoanByFund: string;
}

interface FundDisclosureSearch {
  symbol: string;
  cik: string;
  classId: string;
  seriesId: string;
  entityName: string;
  entityOrgType: string;
  seriesName: string;
  className: string;
  reportingFileNumber: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
}

interface FundDisclosureDate {
  date: string;
  year: number;
  quarter: number;
}
```

### Economics

```typescript
interface TreasuryRate {
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

interface EconomicIndicator {
  date: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  period: string;
  unit: string;
  category: string;
  subcategory: string;
  source: string;
  lastUpdated: string;
}

interface EconomicCalendar {
  date: string;
  time: string;
  country: string;
  event: string;
  importance: string;
  actual: number | null;
  forecast: number | null;
  previous: number | null;
  unit: string;
  currency: string;
  impact: string;
  description: string;
}

interface MarketRiskPremium {
  date: string;
  value: number;
  change: number;
  changePercent: number;
  period: string;
  source: string;
  lastUpdated: string;
}
```

### ESG

```typescript
interface ESGDisclosure {
  date: string;
  acceptedDate: string;
  symbol: string;
  cik: string;
  companyName: string;
  formType: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  ESGScore: number;
  url: string;
}

interface ESGRating {
  symbol: string;
  cik: string;
  companyName: string;
  industry: string;
  fiscalYear: number;
  ESGRiskRating: string;
  industryRank: string;
}

interface ESGBenchmark {
  fiscalYear: number;
  sector: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  ESGScore: number;
}
```

### Forex

```typescript
interface ForexPair {
  symbol: string;
  fromCurrency: string;
  toCurrency: string;
  fromName: string;
  toName: string;
}

interface ForexQuote {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number | null;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}

interface ForexShortQuote {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

interface ForexLightPrice {
  symbol: string;
  date: string;
  price: number;
  volume: number;
}

interface ForexHistoricalPrice {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

interface ForexIntradayPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
```

### DCF

```typescript
interface DCFValuation {
  symbol: string;
  date: string;
  ["Stock Price"]: number;
  dcf: number;
}

interface CustomDCFInput {
  symbol: string;
  revenueGrowthPct?: number;
  ebitdaPct?: number;
  depreciationAndAmortizationPct?: number;
  cashAndShortTermInvestmentsPct?: number;
  receivablesPct?: number;
  inventoriesPct?: number;
  payablePct?: number;
  ebitPct?: number;
  capitalExpenditurePct?: number;
  operatingCashFlowPct?: number;
  sellingGeneralAndAdministrativeExpensesPct?: number;
  taxRate?: number;
  longTermGrowthRate?: number;
  costOfDebt?: number;
  costOfEquity?: number;
  marketRiskPremium?: number;
  beta?: number;
  riskFreeRate?: number;
}

interface CustomDCFOutput {
  symbol: string;
  revenue?: number;
  revenuePercentage?: number;
  ebitda?: number;
  ebitdaPercentage?: number;
  ebit?: number;
  ebitPercentage?: number;
  depreciation?: number;
  depreciationPercentage?: number;
  totalCash?: number;
  totalCashPercentage?: number;
  receivables?: number;
  receivablesPercentage?: number;
  inventories?: number;
  inventoriesPercentage?: number;
  payable?: number;
  payablePercentage?: number;
  capitalExpenditure?: number;
  capitalExpenditurePercentage?: number;
  price?: number;
  beta?: number;
  dilutedSharesOutstanding?: number;
  costofDebt?: number;
  taxRate?: number;
  afterTaxCostOfDebt?: number;
  riskFreeRate?: number;
  marketRiskPremium?: number;
  costOfEquity?: number;
  totalDebt?: number;
  totalEquity?: number;
  totalCapital?: number;
  debtWeighting?: number;
  equityWeighting?: number;
  wacc?: number;
  taxRateCash?: number;
  ebiat?: number;
  ufcf?: number;
  sumPvUfcf?: number;
  longTermGrowthRate?: number;
  terminalValue?: number;
  presentTerminalValue?: number;
  enterpriseValue?: number;
  netDebt?: number;
  equityValue?: number;
  equityValuePerShare?: number;
  freeCashFlowT1?: number;
}
```

### Directory

```typescript
interface CompanySymbol {
  symbol: string;
  companyName: string;
}

interface FinancialStatementSymbol extends CompanySymbol {
  tradingCurrency: string;
  reportingCurrency: string;
}

interface CIKEntry {
  cik: string;
  companyName: string;
}

interface SymbolChange {
  date: string;
  companyName: string;
  oldSymbol: string;
  newSymbol: string;
}

interface ETFEntry {
  symbol: string;
  name: string;
}

interface ActivelyTradingEntry {
  symbol: string;
  name: string;
}

interface EarningsTranscriptEntry {
  symbol: string;
  companyName: string;
  noOfTranscripts: string;
}

interface ExchangeEntry {
  exchange: string;
}

interface SectorEntry {
  sector: string;
}

interface IndustryEntry {
  industry: string;
}

interface CountryEntry {
  country: string;
}
```

### Calendar

```typescript
interface Dividend {
  symbol: string;
  date: string;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
  adjDividend: number;
  dividend: number;
  yield: number;
  frequency: string;
}

interface EarningsReport {
  symbol: string;
  date: string;
  epsActual: number | null;
  epsEstimated: number | null;
  revenueActual: number | null;
  revenueEstimated: number | null;
  lastUpdated: string;
}

interface IPO {
  symbol: string;
  date: string;
  daa: string;
  company: string;
  exchange: string;
  actions: string;
  shares: number | null;
  priceRange: string | null;
  marketCap: number | null;
}

interface IPODisclosure {
  symbol: string;
  filingDate: string;
  acceptedDate: string;
  effectivenessDate: string;
  cik: string;
  form: string;
  url: string;
}

interface IPOProspectus {
  symbol: string;
  acceptedDate: string;
  filingDate: string;
  ipoDate: string;
  cik: string;
  pricePublicPerShare: number;
  pricePublicTotal: number;
  discountsAndCommissionsPerShare: number;
  discountsAndCommissionsTotal: number;
  proceedsBeforeExpensesPerShare: number;
  proceedsBeforeExpensesTotal: number;
  form: string;
  url: string;
}

interface StockSplit {
  symbol: string;
  date: string;
  numerator: number;
  denominator: number;
}
```

### Additional Interfaces

```typescript
// Government Trading
interface FinancialDisclosure {
  symbol: string;
  disclosureDate: string;
  transactionDate: string;
  firstName: string;
  lastName: string;
  office: string;
  district: string;
  owner: string;
  assetDescription: string;
  assetType: string;
  type: string;
  amount: string;
  capitalGainsOver200USD?: string;
  comment: string;
  link: string;
}

// Fundraisers
interface CrowdfundingCampaign {
  cik: string;
  companyName: string;
  date: string | null;
  filingDate: string;
  acceptedDate: string;
  formType: string;
  formSignification: string;
  nameOfIssuer: string;
  legalStatusForm: string;
  jurisdictionOrganization: string;
  issuerStreet: string;
  issuerCity: string;
  issuerStateOrCountry: string;
  issuerZipCode: string;
  issuerWebsite: string;
  intermediaryCompanyName: string;
  intermediaryCommissionCik: string;
  intermediaryCommissionFileNumber: string;
  compensationAmount: string;
  financialInterest: string;
  securityOfferedType: string;
  securityOfferedOtherDescription: string;
  numberOfSecurityOffered: number;
  offeringPrice: number;
  offeringAmount: number;
  overSubscriptionAccepted: string;
  overSubscriptionAllocationType: string;
  maximumOfferingAmount: number;
  offeringDeadlineDate: string;
  currentNumberOfEmployees: number;
  totalAssetMostRecentFiscalYear: number;
  totalAssetPriorFiscalYear: number;
  cashAndCashEquiValentMostRecentFiscalYear: number;
  cashAndCashEquiValentPriorFiscalYear: number;
  accountsReceivableMostRecentFiscalYear: number;
  accountsReceivablePriorFiscalYear: number;
  shortTermDebtMostRecentFiscalYear: number;
  shortTermDebtPriorFiscalYear: number;
  longTermDebtMostRecentFiscalYear: number;
  longTermDebtPriorFiscalYear: number;
  revenueMostRecentFiscalYear: number;
  revenuePriorFiscalYear: number;
  costGoodsSoldMostRecentFiscalYear: number;
  costGoodsSoldPriorFiscalYear: number;
  taxesPaidMostRecentFiscalYear: number;
  taxesPaidPriorFiscalYear: number;
  netIncomeMostRecentFiscalYear: number;
  netIncomePriorFiscalYear: number;
}

interface CrowdfundingSearchResult {
  cik: string;
  name: string;
  date: string | null;
}

interface EquityOffering {
  cik: string;
  companyName: string;
  date: string;
  filingDate: string;
  acceptedDate: string;
  formType: string;
  formSignification: string;
  entityName: string;
  issuerStreet: string;
  issuerCity: string;
  issuerStateOrCountry: string;
  issuerStateOrCountryDescription: string;
  issuerZipCode: string;
  issuerPhoneNumber: string;
  jurisdictionOfIncorporation: string;
  entityType: string;
  incorporatedWithinFiveYears: boolean | null;
  yearOfIncorporation: string;
  relatedPersonFirstName: string;
  relatedPersonLastName: string;
  relatedPersonStreet: string;
  relatedPersonCity: string;
  relatedPersonStateOrCountry: string;
  relatedPersonStateOrCountryDescription: string;
  relatedPersonZipCode: string;
  relatedPersonRelationship: string;
  industryGroupType: string;
  revenueRange: string | null;
  federalExemptionsExclusions: string;
  isAmendment: boolean;
  dateOfFirstSale: string;
  durationOfOfferingIsMoreThanYear: boolean;
  securitiesOfferedAreOfEquityType: boolean;
  isBusinessCombinationTransaction: boolean;
  minimumInvestmentAccepted: number;
  totalOfferingAmount: number;
  totalAmountSold: number;
  totalAmountRemaining: number;
  hasNonAccreditedInvestors: boolean;
  totalNumberAlreadyInvested: number;
  salesCommissions: number;
  findersFees: number;
  grossProceedsUsed: number;
}

interface EquityOfferingSearchResult {
  cik: string;
  name: string;
  date: string;
}

// Earnings Transcript
interface LatestEarningTranscript {
  symbol: string;
  period: string;
  fiscalYear: number;
  date: string;
}

interface EarningTranscript {
  symbol: string;
  period: string;
  year: number;
  date: string;
  content: string;
}

interface TranscriptDate {
  quarter: number;
  fiscalYear: number;
  date: string;
}

interface AvailableTranscriptSymbol {
  symbol: string;
  companyName: string;
  noOfTranscripts: string;
}

// COT
interface COTReport {
  symbol: string;
  date: string;
  name: string;
  sector: string;
  marketAndExchangeNames: string;
  cftcContractMarketCode: string;
  cftcMarketCode: string; 
  cftcRegionCode: string;
  cftcCommodityCode: string;
  openInterestAll: number;
  noncommPositionsLongAll: number;
  noncommPositionsShortAll: number;
  noncommPositionsSpreadAll: number;  
  commPositionsLongAll: number;
  commPositionsShortAll: number;
  totReptPositionsLongAll: number;
  totReptPositionsShortAll: number;
  nonreptPositionsLongAll: number;
  nonreptPositionsShortAll: number; 
  openInterestOld: number;
  noncommPositionsLongOld: number;
  noncommPositionsShortOld: number;
  noncommPositionsSpreadOld: number;
  commPositionsLongOld: number;
  commPositionsShortOld: number;  
  totReptPositionsLongOld: number;
  totReptPositionsShortOld: number;
  nonreptPositionsLongOld: number;
  nonreptPositionsShortOld: number;
  openInterestOther: number;
  noncommPositionsLongOther: number;  
  noncommPositionsShortOther: number;
  noncommPositionsSpreadOther: number;
  commPositionsLongOther: number;
  commPositionsShortOther: number;
  totReptPositionsLongOther: number;
  totReptPositionsShortOther: number; 
  nonreptPositionsLongOther: number;
  nonreptPositionsShortOther: number;
  changeInOpenInterestAll: number;
  changeInNoncommLongAll: number;
  changeInNoncommShortAll: number;
  changeInNoncommSpeadAll: number;  
  changeInCommLongAll: number;
  changeInCommShortAll: number;
  changeInTotReptLongAll: number;
  changeInTotReptShortAll: number;
  changeInNonreptLongAll: number;
  changeInNonreptShortAll: number;  
  pctOfOpenInterestAll: number;
  pctOfOiNoncommLongAll: number;
  pctOfOiNoncommShortAll: number;
  pctOfOiNoncommSpreadAll: number;
  pctOfOiCommLongAll: number;
  pctOfOiCommShortAll: number;  
  pctOfOiTotReptLongAll: number;
  pctOfOiTotReptShortAll: number;
  pctOfOiNonreptLongAll: number;
  pctOfOiNonreptShortAll: number;
  pctOfOpenInterestOl: number;
  pctOfOiNoncommLongOl: number; 
  pctOfOiNoncommShortOl: number;
  pctOfOiNoncommSpreadOl: number;
  pctOfOiCommLongOl: number;
  pctOfOiCommShortOl: number;
  pctOfOiTotReptLongOl: number;
  pctOfOiTotReptShortOl: number;  
  pctOfOiNonreptLongOl: number;
  pctOfOiNonreptShortOl: number;
  pctOfOpenInterestOther: number;
  pctOfOiNoncommLongOther: number;
  pctOfOiNoncommShortOther: number;
  pctOfOiNoncommSpreadOther: number;  
  pctOfOiCommLongOther: number;
  pctOfOiCommShortOther: number;
  pctOfOiTotReptLongOther: number;
  pctOfOiTotReptShortOther: number;
  pctOfOiNonreptLongOther: number;
  pctOfOiNonreptShortOther: number; 
  tradersTotAll: number;
  tradersNoncommLongAll: number;
  tradersNoncommShortAll: number;
  tradersNoncommSpreadAll: number;
  tradersCommLongAll: number;
  tradersCommShortAll: number;  
  tradersTotReptLongAll: number;
  tradersTotReptShortAll: number;
  tradersTotOl: number;
  tradersNoncommLongOl: number;
  tradersNoncommShortOl: number;
  tradersNoncommSpeadOl: number;  
  tradersCommLongOl: number;
  tradersCommShortOl: number;
  tradersTotReptLongOl: number;
  tradersTotReptShortOl: number;
  tradersTotOther: number;
  tradersNoncommLongOther: number;  
  tradersNoncommShortOther: number;
  tradersNoncommSpreadOther: number;
  tradersCommLongOther: number;
  tradersCommShortOther: number;
  tradersTotReptLongOther: number;
  tradersTotReptShortOther: number; 
  concGrossLe4TdrLongAll: number;
  concGrossLe4TdrShortAll: number;
  concGrossLe8TdrLongAll: number;
  concGrossLe8TdrShortAll: number;
  concNetLe4TdrLongAll: number;
  concNetLe4TdrShortAll: number;  
  concNetLe8TdrLongAll: number;
  concNetLe8TdrShortAll: number;
  concGrossLe4TdrLongOl: number;
  concGrossLe4TdrShortOl: number;
  concGrossLe8TdrLongOl: number;
  concGrossLe8TdrShortOl: number; 
  concNetLe4TdrLongOl: number;
  concNetLe4TdrShortOl: number;
  concNetLe8TdrLongOl: number;
  concNetLe8TdrShortOl: number;
  concGrossLe4TdrLongOther: number;
  concGrossLe4TdrShortOther: number;  
  concGrossLe8TdrLongOther: number;
  concGrossLe8TdrShortOther: number;
  concNetLe4TdrLongOther: number;
  concNetLe4TdrShortOther: number;
  concNetLe8TdrLongOther: number;
  concNetLe8TdrShortOther: number;
  contractUnits: string;
}

interface COTAnalysis {
  symbol: string;
  date: string;
  name: string;
  sector: string;
  exchange: string;
  currentLongMarketSituation: number;
  currentShortMarketSituation: number;  
  marketSituation: string;
  previousLongMarketSituation: number;
  previousShortMarketSituation: number;
  previousMarketSituation: string;
  netPostion: number;
  previousNetPosition: number;  
  changeInNetPosition: number;
  marketSentiment: string;
  reversalTrend: boolean;
}

interface COTList {
  symbol: string;
  name: string;
}

// Crypto
interface Cryptocurrency {
  symbol: string;
  name: string;
  exchange: string;
  icoDate: string;
  circulatingSupply: number;
  totalSupply: number | null;
}

interface CryptocurrencyQuote {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}

interface CryptocurrencyShortQuote {
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

interface CryptocurrencyLightChart {
  symbol: string;
  date: string;
  price: number;
  volume: number;
}

interface CryptocurrencyHistoricalChart {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

interface CryptocurrencyIntradayPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Chart
interface ChartData {
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

interface LightChartData {
  symbol: string;
  date: string;
  close: number;
  volume: number;
}

interface UnadjustedChartData {
  symbol: string;
  date: string;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  volume: number;
}

interface IntradayChartData {
  date: string;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  volume: number;
}

type Interval = "1min" | "5min" | "15min" | "30min" | "1hour" | "4hour";

// SEC Filings
interface SECFiling {
  symbol: string;
  cik: string;
  filingDate: string;
  acceptedDate: string;
  formType: string;
  hasFinancials?: boolean;
  link: string;
  finalLink: string;
}

interface CompanySearchResult {
  symbol: string;
  name: string;
  cik: string;
  sicCode: string;
  industryTitle: string;
  businessAddress: string;
  phoneNumber: string;
}

interface IndustryClassification {
  office: string;
  sicCode: string;
  industryTitle: string;
}

// Analyst
interface AnalystEstimate {
  symbol: string;
  date: string;
  revenueLow: number;
  revenueHigh: number;
  revenueAvg: number;
  ebitdaLow: number;
  ebitdaHigh: number;
  ebitdaAvg: number;
  ebitLow: number;
  ebitHigh: number;
  ebitAvg: number;
  netIncomeLow: number;
  netIncomeHigh: number;
  netIncomeAvg: number;
  sgaExpenseLow: number;
  sgaExpenseHigh: number;
  sgaExpenseAvg: number;
  epsAvg: number;
  epsHigh: number;
  epsLow: number;
  numAnalystsRevenue: number;
  numAnalystsEps: number;
}

interface RatingsSnapshot {
  symbol: string;
  rating: string;
  overallScore: number;
  discountedCashFlowScore: number;
  returnOnEquityScore: number;
  returnOnAssetsScore: number;
  debtToEquityScore: number;
  priceToEarningsScore: number;
  priceToBookScore: number;
}

interface HistoricalRating extends RatingsSnapshot {
  date: string;
}

interface PriceTargetSummary {
  symbol: string;
  lastMonthCount: number;
  lastMonthAvgPriceTarget: number;
  lastQuarterCount: number;
  lastQuarterAvgPriceTarget: number;
  lastYearCount: number;
  lastYearAvgPriceTarget: number;
  allTimeCount: number;
  allTimeAvgPriceTarget: number;
  publishers: string;
}

interface PriceTargetConsensus {
  symbol: string;
  targetHigh: number;
  targetLow: number;
  targetConsensus: number;
  targetMedian: number;
}

interface PriceTargetNews {
  symbol: string;
  publishedDate: string;
  newsURL: string;
  newsTitle: string;
  analystName: string;
  priceTarget: number;
  adjPriceTarget: number;
  priceWhenPosted: number;
  newsPublisher: string;
  newsBaseURL: string;
  analystCompany: string;
}

interface StockGrade {
  symbol: string;
  date: string;
  gradingCompany: string;
  previousGrade: string;
  newGrade: string;
  action: string;
}

interface HistoricalStockGrade {
  symbol: string;
  date: string;
  analystRatingsBuy: number;
  analystRatingsHold: number;
  analystRatingsSell: number;
  analystRatingsStrongSell: number;
}

interface StockGradeSummary {
  symbol: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
  consensus: string;
}

interface StockGradeNews {
  symbol: string;
  publishedDate: string;
  newsURL: string;
  newsTitle: string;
  newsBaseURL: string;
  newsPublisher: string;
  newGrade: string;
  previousGrade: string;
  gradingCompany: string;
  action: string;
  priceWhenPosted: number;
}

// Commodity
interface Commodity {
  symbol: string;
  name: string;
  exchange: string;
  tradeMonth: string;
  currency: string;
}
```

Refer to the individual type definition files in the `/src/api/*/types.ts` files for complete field specifications for each return type. 