import React from 'react';
import styles from './style.module.scss';

interface CompanyDetail {
  country: string;
  ipoDate: string;
  marketCap: number;
  shares: number;
  industry: string;
  homepageUrl: string;
}

const DetailsContainer = ({ country, ipoDate, marketCap, shares, industry, homepageUrl }: CompanyDetail) => {
  const parsedDetail = [
    {
      key: 'Country',
      value: country,
    },
    {
      key: 'IPO Date',
      value: ipoDate,
    },
    {
      key: 'Market Capitalization',
      value: marketCap,
    },
    {
      key: 'Shares Outstanding',
      value: shares,
    },
    {
      key: 'Industry',
      value: industry,
    },
    {
      key: 'Homapage',
      value: homepageUrl,
    },
  ];

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {parsedDetail.map((detail, index) => (
            <tr className={styles.row} key={index}>
              <td className={styles.key}>{detail.key}</td>
              <td>{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsContainer;
