import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMangaDescriptions, ISingleManga } from '@/types/IManga';

const mangaSlice = createSlice({
  name: 'anime',
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
      const anime = action.payload;
      state.descriptions = {
        type: null,
        chapters: null,
        volumes: null,
        genres: [],
        status: null,
        published: null,
        authors: [],
      };

      if (anime.type) {
        state.descriptions.type = anime.type;
      }
      if (anime.chapters) {
        state.descriptions.chapters = anime.chapters;
      }
      if (anime.volumes) {
        state.descriptions.volumes = anime.volumes;
      }
      if (anime.genres) {
        state.descriptions.genres = [];
        anime.genres.forEach((genre) => {
          state.descriptions.genres?.push({
            name: genre.name,
            id: genre.mal_id,
          });
        });
      }
      if (anime.status) {
        state.descriptions.status = anime.status;
      }
      if (anime.published) {
        state.descriptions.published = anime.published.string;
      }
      if (anime.authors) {
        state.descriptions.authors = [];
        anime.authors.forEach((author) => {
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
