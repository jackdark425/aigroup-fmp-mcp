// Global Exchange Market Hours API
export interface ExchangeMarketHours {
  exchange: string;
  name: string;
  openingHour: string;
  closingHour: string;
  timezone: string;
  isMarketOpen: boolean;
}

export interface HolidayByExchange {
  exchange: string;
  date: string;
  name: string;
  isClosed: boolean;
  adjOpenTime: string | null;
  adjCloseTime: string | null;
}
