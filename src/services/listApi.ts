import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAnimeResponse } from '@/types/IAnime';
import { IAnimeStatisticsResponse } from '@/types/IAnimeStatistics';
import { IMangaStatisticsResponse } from '@/types/IMangaStatistics';

export const listApi = createApi({
  reducerPath: 'listApi',
  tagTypes: ['List'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getList: build.query<IAnimeResponse, string>({
      query: (type, limit = '10') => `/${type}?${limit && `limit=${limit}`}`,
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
  }),
});

export const { useGetListQuery, useGetStatisticsQuery } = listApi;
