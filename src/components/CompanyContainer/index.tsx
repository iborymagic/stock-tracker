import React, { ReactNode } from 'react';

import styles from './style.module.scss';

interface Props {
  children: {
    header: ReactNode;
    chart: ReactNode;
    details: ReactNode;
  };
}

const CompanyContainer = ({ children }: Props) => {
  const { header, chart, details } = children;
  return (
    <div className={styles.container}>
      {header}
      {chart}
      {details}
    </div>
  );
};

export default CompanyContainer;
