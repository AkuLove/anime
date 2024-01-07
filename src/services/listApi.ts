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
    getSeasonList: build.query<IAnimeResponse, string>({
      query: (season) => `/seasons/${season}`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ mal_id }) => ({
                type: 'List' as const,
                mal_id,
              })),
              { type: 'List', id: 'LIST' },
            ]
          : [{ type: 'List', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetFilteredListMutation,
  useGetSeasonListQuery,
} = listApi;
