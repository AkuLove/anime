import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAnimeResponse,
  IChooseAnimeOrManga,
  ISingleAnimeResponse,
} from '@/types/IAnime';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  tagTypes: ['Anime'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getList: build.query<IAnimeResponse, string>({
      query: (type, limit = '10') => `/${type}?${limit && `limit=${limit}`}`,
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
    getSingleAnime: build.query<ISingleAnimeResponse, IChooseAnimeOrManga>({
      query: ({ id, type }) => `/${type}/${id}`,
    }),
  }),
});

export const { useGetListQuery, useGetSingleAnimeQuery } = animeApi;
