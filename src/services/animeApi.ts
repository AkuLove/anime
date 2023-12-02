import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAnimeResponse } from '@/types/IAnime';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  tagTypes: ['Anime'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getList: build.query<IAnimeResponse, string>({
      query: (type: 'anime' | 'manga', limit = '10') =>
        `/${type}?${limit && `limit=${limit}`}`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ mal_id }) => ({
                type: 'Anime' as const,
                mal_id,
              })),
              { type: 'Anime', id: 'ANIMELIST' },
            ]
          : [{ type: 'Anime', id: 'ANIMELIST' }],
    }),
  }),
});

export const { useGetListQuery } = animeApi;
