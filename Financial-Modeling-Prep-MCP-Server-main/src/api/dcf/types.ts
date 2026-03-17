export interface DCFValuation {
  symbol: string;
  date: string;
  ["Stock Price"]: number;
  dcf: number;
}

export interface CustomDCFInput {
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

export interface CustomDCFOutput {
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
