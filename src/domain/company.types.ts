export interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface CandleData {
  c: Array<number>;
  h: Array<number>;
  l: Array<number>;
  o: Array<number>;
  t: Array<number>;
  v: Array<number>;
  s: 'ok' | 'no_data';
}

export interface PriceData {
  price: number;
  date: number;
}

export interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}
