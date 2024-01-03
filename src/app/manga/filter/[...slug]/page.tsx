'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import List from '@/components/List/List';
// import styles from './page.module.scss';

export default function Slug() {
  const params = useParams();

  const joinQueryString = () => {
    const resultQuery: string[] = [];
    if (Array.isArray(params.slug)) {
      params.slug.forEach((param) => {
        const splittedParam = param.split('-is-');
        const singleQuery = [];
        singleQuery.push(
          splittedParam[0],
          '=',
          splittedParam[1].replaceAll('-or-', ',')
        );
        resultQuery.push(singleQuery.join(''));
      });
    }
    return resultQuery.join('&');
  };

  useEffect(() => {
    joinQueryString();
  }, [params]);

  return <List type="manga" query={joinQueryString()} />;
}
