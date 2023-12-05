import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISingleAnimeResponse } from '@/types/IAnime';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  tagTypes: ['Anime'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getSingleAnime: build.query<ISingleAnimeResponse, string>({
      query: (id: string) => `/anime/${id}`,
    }),
  }),
});

export const { useGetSingleAnimeQuery } = animeApi;
