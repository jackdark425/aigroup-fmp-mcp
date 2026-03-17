export interface CrowdfundingCampaign {
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

export interface CrowdfundingSearchResult {
  cik: string;
  name: string;
  date: string | null;
}

export interface EquityOffering {
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

export interface EquityOfferingSearchResult {
  cik: string;
  name: string;
  date: string;
}
