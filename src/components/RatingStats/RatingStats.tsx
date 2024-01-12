'use client';

import { useEffect, useState } from 'react';
import { useGetStatisticsQuery } from '@/services/listApi';
import styles from './RatingStats.module.scss';
import { IScore } from '@/types/ICommon';
import Loader from '../UI/Loader/Loader';

export default function RatingStats({
  id,
  type,
  title,
}: {
  id: string;
  type: 'anime' | 'manga';
  title: string;
}) {
  const { data, isLoading } = useGetStatisticsQuery({ type, id });
  const [statisticsKeys, setStatiscticsKeys] = useState<IScore[] | null>(null);
  const statistics = data?.data;
  useEffect(() => {
    if (data) setStatiscticsKeys(data.data.scores);
  }, [isLoading]);

  return (
    <div className={styles.statisticsBlock}>
      <p className={styles.title}>{title}</p>
      {!isLoading ? (
        <div className={styles.statisticsBlock__content}>
          {statisticsKeys && statistics ? (
            <>
              <div className={styles.subTitles}>
                <span className={styles.subTitles__people}>People</span>
                <span className={styles.subTitles__percent}>Percent</span>
                <span className={styles.subTitles__list}>Score</span>
              </div>
              {statisticsKeys.map((item) => (
                <div key={item.votes} className={styles.statisticsBlock__body}>
                  <p className={styles.peoples}>{item.votes}</p>
                  <div className={styles.barRow}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    >
                      {`${item.percentage}%`}
                    </div>
                  </div>
                  <p className={styles.category}>{item.score}</p>
                </div>
              ))}
            </>
          ) : null}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
