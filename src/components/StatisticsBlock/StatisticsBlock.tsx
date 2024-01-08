'use client';

import { useEffect, useState } from 'react';
import { useGetStatisticsQuery } from '@/services/listApi';
import styles from './StatisticsBlock.module.scss';
import Loader from '../UI/Loader/Loader';

export default function StatisticsBlock({
  id,
  type,
  title,
}: {
  id: string;
  type: 'anime' | 'manga';
  title: string;
}) {
  const { data, isLoading } = useGetStatisticsQuery({ type, id });
  const [statisticsKeys, setStatiscticsKeys] = useState<string[] | null>(null);
  const statistics = data?.data;
  useEffect(() => {
    if (data) setStatiscticsKeys(Object.keys(data.data));
  }, [isLoading]);

  const calcBarWidth = (firstArg: number, secondArg: number) => {
    const result = Math.round((firstArg / secondArg) * 100 * 10) / 10;
    return `${result}%`;
  };

  const getItem = (item: string) => {
    return statistics
      ? (statistics[item as keyof typeof statistics] as number)
      : 0;
  };

  return (
    <div className={styles.statisticsBlock}>
      <p className={styles.title}>{title}</p>
      {!isLoading ? (
        <>
          <div className={styles.statisticsBlock__content}>
            {statisticsKeys && statistics ? (
              <>
                <div className={styles.subTitles}>
                  <p className={styles.subTitles__people}>People</p>
                  <p className={styles.subTitles__percent}>Percent</p>
                  <p className={styles.subTitles__list}>List</p>
                </div>
                {statisticsKeys.map((item) => (
                  <div key={item} className={styles.statisticsBlock__body}>
                    {item !== 'total' &&
                    !Array.isArray(
                      statistics[item as keyof typeof statistics]
                    ) ? (
                      <>
                        <p className={styles.peoples}>{getItem(item)}</p>
                        <div className={styles.barRow}>
                          <div
                            className={styles.bar}
                            style={{
                              width: calcBarWidth(
                                getItem(item),
                                statistics.total
                              ),
                            }}
                          >
                            {calcBarWidth(getItem(item), statistics.total)}
                          </div>
                        </div>
                        <p className={styles.category}>
                          {item.split('_').join(' ')}
                        </p>
                      </>
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <p className={styles.total}>
            There are <span>{statistics?.total}</span> people on the lists
          </p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
