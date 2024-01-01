import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnimeDescriptions, ISingleAnime } from '@/types/IAnime';

const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    descriptions: {
      type: null,
      episodes: null,
      genres: [],
      status: null,
      aired: null,
      duration: null,
      rating: null,
      studios: [],
    } as IAnimeDescriptions,
  },
  reducers: {
    checkValidAnimeDescription(state, action: PayloadAction<ISingleAnime>) {
      const anime = action.payload;
      state.descriptions = {
        type: null,
        episodes: null,
        genres: [],
        status: null,
        aired: null,
        duration: null,
        rating: null,
        studios: [],
      };

      if (anime.type) {
        state.descriptions.type = anime.type;
      }
      if (anime.episodes) {
        state.descriptions.episodes = anime.episodes;
      }
      if (anime.genres) {
        state.descriptions.genres = [];
        anime.genres.forEach((genre) => {
          state.descriptions.genres?.push({
            name: genre.name,
            id: genre.mal_id,
          });
        });
        anime.themes.forEach((theme) => {
          state.descriptions.genres?.push({
            name: theme.name,
            id: theme.mal_id,
          });
        });
        anime.demographics.forEach((demographic) => {
          state.descriptions.genres?.push({
            name: demographic.name,
            id: demographic.mal_id,
          });
        });
      }
      if (anime.status) {
        state.descriptions.status = anime.status;
      }
      if (anime.aired) {
        state.descriptions.aired = anime.aired.string;
      }
      if (anime.duration) {
        state.descriptions.duration = anime.duration;
      }
      if (anime.rating) {
        state.descriptions.rating = anime.rating;
      }
      if (anime.studios) {
        state.descriptions.studios = [];
        anime.studios.forEach((studio) => {
          state.descriptions.studios?.push({
            name: studio.name,
            id: studio.mal_id,
          });
        });
      }
    },
  },
});

export const { checkValidAnimeDescription } = animeSlice.actions;

export default animeSlice.reducer;
