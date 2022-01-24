import React from 'react';
import styles from './style.module.scss';

interface Props {
  name: string;
  symbol: string;
  currentPrice: string;
  change: string;
  changePercent: string;
  currency: string;
  market: string;
}

const HeaderContainer = ({ name, symbol, currentPrice, change, changePercent, currency, market }: Props) => {
  const isPositive = Number(change) > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {name} ({symbol})
      </h1>
      <h2 className={styles.market}>{market}</h2>
      <span className={`${styles.current} ${isPositive ? styles.positive : styles.negative}`}>
        {currentPrice} {currency}
      </span>
      <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
        {change}
        <span className={styles.percent}>({changePercent}%)</span>
      </span>
    </div>
  );
};

export default HeaderContainer;
