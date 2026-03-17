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

export interface CompanyNote {
  cik: string;
  symbol: string;
  title: string;
  exchange: string;
}

export interface StockPeer {
  symbol: string;
  companyName: string;
  price: number;
  mktCap: number;
}

export interface DelistedCompany {
  symbol: string;
  companyName: string;
  exchange: string;
  ipoDate: string;
  delistedDate: string;
}

export interface EmployeeCount {
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

export interface MarketCap {
  symbol: string;
  date: string;
  marketCap: number;
}

export interface ShareFloat {
  symbol: string;
  date: string;
  freeFloat: number;
  floatShares: number;
  outstandingShares: number;
}

export interface MergerAcquisition {
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

export interface CompanyExecutive {
  title: string;
  name: string;
  pay: number | null;
  currencyPay: string;
  gender: string | null;
  yearBorn: number | null;
  active: boolean | null;
}

export interface ExecutiveCompensation {
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

export interface ExecutiveCompensationBenchmark {
  industryTitle: string;
  year: number;
  averageCompensation: number;
}
