export interface FinancialDisclosure {
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

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SymbolParams {
  symbol: string;
}

export interface NameParams {
  name: string;
}
