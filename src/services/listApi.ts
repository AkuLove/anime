import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAnimeResponse } from '@/types/IAnime';
import { IAnimeStatisticsResponse } from '@/types/IAnimeStatistics';
import { IMangaStatisticsResponse } from '@/types/IMangaStatistics';
import { IMangaResponse } from '@/types/IManga';

export const listApi = createApi({
  reducerPath: 'listApi',
  tagTypes: ['List'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getStatistics: build.query<
      IAnimeStatisticsResponse | IMangaStatisticsResponse,
      { type: 'anime' | 'manga'; id: string }
    >({
      query: ({ type, id }) => `/${type}/${id}/statistics`,
    }),
    getFilteredList: build.mutation<
      IAnimeResponse | IMangaResponse,
      { type: 'anime' | 'manga'; filterValue?: string; page: number }
    >({
      query: ({ type, filterValue, page }) => ({
        url: `/${type}?order_by=popularity&limit=15&${filterValue}page=${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStatisticsQuery, useGetFilteredListMutation } = listApi;
