// Latest Insider Trading API
export interface InsiderTrading {
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

// Search Insider Trades by Reporting Name API
export interface InsiderReportingName {
  reportingCik: string;
  reportingName: string;
}

// All Insider Transaction Types API
export interface InsiderTransactionType {
  transactionType: string;
}

// Insider Trade Statistics API
export interface InsiderTradeStatistics {
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

// Acquisition Ownership API
export interface AcquisitionOwnership {
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
