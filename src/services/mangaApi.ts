import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISingleMangaResonse } from '@/types/IManga';
import { IAnimeRelations } from '@/types/IAnimeRelations';

export const mangaApi = createApi({
  reducerPath: 'mangaApi',
  tagTypes: ['Manga'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getSingleManga: build.query<
      ISingleMangaResonse,
      { id: string; type?: string }
    >({
      query: ({ id, type = 'manga' }) => `/${type}/${id}`,
    }),
    getMangaRelations: build.query<IAnimeRelations, string>({
      query: (id) => `/manga/${id}/relations`,
    }),
  }),
});

export const { useGetSingleMangaQuery, useGetMangaRelationsQuery } = mangaApi;
