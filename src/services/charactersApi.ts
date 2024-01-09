import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICharacterResponse,
  ISingleCharacterFullResponse,
} from '@/types/ICharacters';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  tagTypes: ['Characters'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getCharactersList: build.mutation<ICharacterResponse, { page: number }>({
      query: ({ page }) => ({
        url: `/characters?order_by=favorites&limit=20&page=${page}`,
        method: 'GET',
      }),
    }),
    getSingleCharacter: build.query<
      ISingleCharacterFullResponse,
      { id: string; type?: string }
    >({
      query: ({ id, type = 'characters' }) => `/${type}/${id}/full`,
    }),
    getCharacterSearch: build.mutation<ICharacterResponse, string>({
      query: (searchValue) => ({
        url: `/characters?q=${searchValue}&limit=3`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSingleCharacterQuery,
  useGetCharactersListMutation,
  useGetCharacterSearchMutation,
} = charactersApi;
