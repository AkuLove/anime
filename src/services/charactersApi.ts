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
    getCharactersList: build.query<
      ICharacterResponse,
      { type?: string; limit?: string }
    >({
      query: ({ type = 'characters', limit = '10' }) =>
        `/${type}?${limit && `limit=${limit}`}`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ mal_id }) => ({
                type: 'Characters' as const,
                mal_id,
              })),
              { type: 'Characters', id: 'CHARACTERS' },
            ]
          : [{ type: 'Characters', id: 'CHARACTERS' }],
    }),
    getSingleCharacter: build.query<
      ISingleCharacterFullResponse,
      { id: string; type?: string }
    >({
      query: ({ id, type = 'characters' }) => `/${type}/${id}/full`,
    }),
  }),
});

export const { useGetSingleCharacterQuery, useGetCharactersListQuery } =
  charactersApi;
