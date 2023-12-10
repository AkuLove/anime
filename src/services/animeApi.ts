import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISingleAnimeResponse } from '@/types/IAnime';
import { IAnimeRelations } from '@/types/IAnimeRelations';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  tagTypes: ['Anime'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getSingleAnime: build.query<
      ISingleAnimeResponse,
      { id: string; type?: string }
    >({
      query: ({ id, type = 'anime' }) => `/${type}/${id}`,
    }),
    getAnimeRelations: build.query<IAnimeRelations, string>({
      query: (id) => `/anime/${id}/relations`,
    }),
    getRandomAnime: build.mutation<ISingleAnimeResponse, void>({
      query: () => ({
        url: '/random/anime',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSingleAnimeQuery,
  useGetAnimeRelationsQuery,
  useGetRandomAnimeMutation,
} = animeApi;
