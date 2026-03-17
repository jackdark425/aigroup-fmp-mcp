export interface LatestEarningTranscript {
  symbol: string;
  period: string;
  fiscalYear: number;
  date: string;
}

export interface EarningTranscript {
  symbol: string;
  period: string;
  year: number;
  date: string;
  content: string;
}

export interface TranscriptDate {
  quarter: number;
  fiscalYear: number;
  date: string;
}

export interface AvailableTranscriptSymbol {
  symbol: string;
  companyName: string;
  noOfTranscripts: string;
}

export interface LatestTranscriptsParams {
  limit?: number;
  page?: number;
}

export interface TranscriptParams {
  symbol: string;
  year: string;
  quarter: string;
  limit?: number;
}

export interface TranscriptDatesParams {
  symbol: string;
}
