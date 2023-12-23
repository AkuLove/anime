import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISingleMangaResponse } from '@/types/IManga';
import { IAnimeRelations } from '@/types/IAnimeRelations';
import { ICharactersByIdResponse } from '@/types/ICharactersById';

export const mangaApi = createApi({
  reducerPath: 'mangaApi',
  tagTypes: ['Manga'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getSingleManga: build.query<
      ISingleMangaResponse,
      { id: string; type?: string }
    >({
      query: ({ id, type = 'manga' }) => `/${type}/${id}`,
    }),
    getMangaRelations: build.query<IAnimeRelations, string>({
      query: (id) => `/manga/${id}/relations`,
    }),
    getMangaCharacters: build.query<ICharactersByIdResponse, string>({
      query: (id) => `/manga/${id}/characters`,
    }),
  }),
});

export const {
  useGetSingleMangaQuery,
  useGetMangaRelationsQuery,
  useGetMangaCharactersQuery,
} = mangaApi;
