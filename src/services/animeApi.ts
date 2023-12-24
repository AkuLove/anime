import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAnimeResponse, ISingleAnimeResponse } from '@/types/IAnime';
import { IAnimeRelations } from '@/types/IAnimeRelations';
import { ICharactersByIdResponse } from '@/types/ICharactersById';

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
    getAnimeCharacters: build.query<ICharactersByIdResponse, string>({
      query: (id) => `/anime/${id}/characters`,
    }),
    getRandomAnime: build.mutation<ISingleAnimeResponse, void>({
      query: () => ({
        url: '/random/anime',
        method: 'GET',
      }),
    }),
    getAnimeSearch: build.mutation<IAnimeResponse, string>({
      query: (searchValue) => ({
        url: `/anime?q=${searchValue}&limit=3`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSingleAnimeQuery,
  useGetAnimeRelationsQuery,
  useGetAnimeCharactersQuery,
  useGetRandomAnimeMutation,
  useGetAnimeSearchMutation,
} = animeApi;
