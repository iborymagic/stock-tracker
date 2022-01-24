import './global.scss';

import { CompanyProfile, Quote } from '@src/domain/company.types';
import React, { useEffect, useState } from 'react';
import { getCompanyProfile, getQuote } from '@src/domain/company';

import ChartContainer from '@src/components/CompanyContainer/ChartContainer';
import CompanyContainer from '@src/components/CompanyContainer';
import DetailsContainer from '@src/components/CompanyContainer/DetailsContainer';
import HeaderContainer from '@src/components/CompanyContainer/HeaderContainer';

const defaultCompanyProfile = {
  country: '',
  currency: '',
  exchange: '',
  finnhubIndustry: '',
  ipo: '',
  logo: '',
  marketCapitalization: 0,
  name: '',
  phone: '',
  shareOutstanding: 0,
  ticker: '',
  weburl: '',
};

const defaultQuote = {
  c: 0,
  d: 0,
  dp: 0,
  h: 0,
  l: 0,
  o: 0,
  pc: 0,
};

const App = () => {
  const [profile, setProfile] = useState<CompanyProfile>(defaultCompanyProfile);
  const [quote, setQuote] = useState<Quote>(defaultQuote);

  // TODO: ETF는 검색이 안된다. 데이터가 공백일 때 에러 처리
  const symbol = 'NKLA';

  const fetchCompanyData = async () => {
    try {
      const fetchedProfile = await getCompanyProfile(symbol);
      const fetchedQuote = await getQuote(symbol);
      setProfile(fetchedProfile);
      setQuote(fetchedQuote);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanyData().catch(e => console.log(e));
  }, []);

  return (
    <CompanyContainer>
      {{
        header: (
          <HeaderContainer
            name={profile.name}
            symbol={profile.ticker}
            currentPrice={quote.c.toFixed(2)}
            change={quote.d.toFixed(2)}
            changePercent={quote.dp.toFixed(2)}
            currency={profile.currency}
            market={profile.exchange}
          ></HeaderContainer>
        ),
        chart: <ChartContainer symbol={symbol}></ChartContainer>,
        details: (
          <DetailsContainer
            country={profile.country}
            marketCap={profile.marketCapitalization}
            ipoDate={profile.ipo}
            shares={profile.shareOutstanding}
            industry={profile.finnhubIndustry}
            homepageUrl={profile.weburl}
          ></DetailsContainer>
        ),
      }}
    </CompanyContainer>
  );
};

export default App;
