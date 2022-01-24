import { CandleData, CompanyProfile, PriceData, Quote } from './company.types';

import axios from 'axios';
import { getUNIXTimestamp } from '@src/utils/date';

export const getCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  const response = await axios.get<CompanyProfile>(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c7fq5vaad3if3foe5hdg`
  );
  console.log(response.data);

  return response.data;
};

export const getCandles = async (symbol: string, from: number, to: number): Promise<CandleData> => {
  const response = await axios.get<CandleData>(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=c7fq5vaad3if3foe5hdg`
  );
  console.log(response.data);

  return response.data;
};

export const getQuote = async (symbol: string): Promise<Quote> => {
  const response = await axios.get<Quote>(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c7fq5vaad3if3foe5hdg`
  );
  console.log(response);

  return response.data;
};

export const getHistoricalCandles = async (symbol: string): Promise<Array<PriceData>> => {
  // TODO: 차트 기간 설정할 수 있게 하기
  /* 전체 기간 데이터를 보고 싶은 경우 */
  // const profile = await getCompanyProfile(symbol);
  // const from: number = getUNIXTimestamp(new Date(profile.ipo));
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setFullYear(currentDate.getFullYear() - 1);

  const from: number = getUNIXTimestamp(pastDate);
  const to: number = getUNIXTimestamp(currentDate);
  const candles = await getCandles(symbol, from, to);

  return candles.c.map((current, idx) => ({ price: current, date: candles.t[idx] }));
};
