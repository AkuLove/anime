import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISingleMangaResonse } from '@/types/IManga';

export const mangaApi = createApi({
  reducerPath: 'mangaApi',
  tagTypes: ['Manga'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getSingleManga: build.query<ISingleMangaResonse, string>({
      query: (id: string) => `/manga/${id}`,
    }),
  }),
});

export const { useGetSingleMangaQuery } = mangaApi;
