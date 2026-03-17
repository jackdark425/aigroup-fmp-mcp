export interface ESGDisclosure {
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

export interface ESGRating {
  symbol: string;
  cik: string;
  companyName: string;
  industry: string;
  fiscalYear: number;
  ESGRiskRating: string;
  industryRank: string;
}

export interface ESGBenchmark {
  fiscalYear: number;
  sector: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  ESGScore: number;
}
