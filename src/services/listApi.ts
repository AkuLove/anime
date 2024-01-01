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
    getList: build.query<IAnimeResponse | IMangaResponse, string>({
      query: (type, limit = '10') =>
        `/top/${type}?${limit && `limit=${limit}`}&${
          type === 'anime' ? 'filter=airing' : 'filter=publishing'
        }`,
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
    getStatistics: build.query<
      IAnimeStatisticsResponse | IMangaStatisticsResponse,
      { type: 'anime' | 'manga'; id: string }
    >({
      query: ({ type, id }) => `/${type}/${id}/statistics`,
    }),
    getFilteredList: build.mutation<
      IAnimeResponse | IMangaResponse,
      { type: 'anime' | 'manga'; filterValue: string }
    >({
      query: ({ type, filterValue }) => ({
        url: `/${type}?${filterValue}&order_by=popularity&limit=10`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetListQuery,
  useGetStatisticsQuery,
  useGetFilteredListMutation,
} = listApi;
