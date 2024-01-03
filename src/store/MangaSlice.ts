import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMangaDescriptions, ISingleManga } from '@/types/IManga';

const mangaSlice = createSlice({
  name: 'manga',
  initialState: {
    descriptions: {
      type: null,
      chapters: null,
      volumes: null,
      genres: [],
      status: null,
      published: null,
      authors: [],
    } as IMangaDescriptions,
  },
  reducers: {
    checkValidMangaDescription(state, action: PayloadAction<ISingleManga>) {
      const manga = action.payload;
      state.descriptions = {
        type: null,
        chapters: null,
        volumes: null,
        genres: [],
        status: null,
        published: null,
        authors: [],
      };

      if (manga.type) {
        state.descriptions.type = manga.type;
      }
      if (manga.chapters) {
        state.descriptions.chapters = manga.chapters;
      }
      if (manga.volumes) {
        state.descriptions.volumes = manga.volumes;
      }
      if (manga.genres) {
        state.descriptions.genres = [];
        manga.genres.forEach((genre) => {
          state.descriptions.genres?.push({
            name: genre.name,
            id: genre.mal_id,
          });
        });
        manga.themes.forEach((theme) => {
          state.descriptions.genres?.push({
            name: theme.name,
            id: theme.mal_id,
          });
        });
        manga.demographics.forEach((demographic) => {
          state.descriptions.genres?.push({
            name: demographic.name,
            id: demographic.mal_id,
          });
        });
      }
      if (manga.status) {
        state.descriptions.status = manga.status;
      }
      if (manga.published) {
        state.descriptions.published = manga.published.string;
      }
      if (manga.authors) {
        state.descriptions.authors = [];
        manga.authors.forEach((author) => {
          state.descriptions.authors?.push({
            name: author.name,
            id: author.mal_id,
          });
        });
      }
    },
  },
});

export const { checkValidMangaDescription } = mangaSlice.actions;

export default mangaSlice.reducer;
