import React, { useEffect, useRef, useState } from 'react';

import Chart from 'chart.js/auto';
import { PriceData } from '@src/domain/company.types';
import { getDateFromUNIX } from '@src/utils/date';
import { getHistoricalCandles } from '@src/domain/company';
import styles from './style.module.scss';

interface Props {
  symbol: string;
}

const ChartContainer = ({ symbol }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [stockPrices, setStockPrices] = useState<Array<PriceData>>([]);

  const fetchCandles = async () => {
    const historicalCandles = await getHistoricalCandles(symbol);
    setStockPrices(historicalCandles);
  };

  const drawChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (canvasRef.current) {
      const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

      const gradient = ctx.createLinearGradient(0, 0, 0, 240);
      gradient.addColorStop(0, 'rgba(153, 102, 255, 0.5)');
      gradient.addColorStop(1, '#FFFFFF');

      /* animation start */
      const totalDuration = 2000;
      const delayBetweenPoints = totalDuration / stockPrices.length;
      const previousY = (ctx: object) =>
        ctx.index === 0
          ? ctx.chart.scales.y.getPixelForValue(100)
          : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      const animation = {
        x: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: NaN, // the point is initially skipped
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
              return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
          },
        },
        y: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
              return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
          },
        },
      };
      /* animation end */

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockPrices.map(candle => getDateFromUNIX(candle.date)),
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: stockPrices.map(stockPrice => stockPrice.price),
              fill: true,
              backgroundColor: gradient,
              borderWidth: 1,
              borderColor: 'rgba(153, 102, 255, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 8,
                maxRotation: 0,
                minRotation: 0,
                align: 'start',
              },
            },
            y: {
              position: 'right',
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    fetchCandles().catch(e => console.error(e));
  }, []);

  useEffect(() => {
    console.log(stockPrices);
    drawChart();
  }, [stockPrices]);

  return (
    <div className={styles.container}>
      <canvas id="chart" ref={canvasRef}></canvas>
    </div>
  );
};

export default ChartContainer;
