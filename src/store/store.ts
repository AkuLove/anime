import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { animeApi } from '@/services/animeApi';
import animeReducer from './AnimeSlice';
import mangaReducer from './MangaSlice';
import charactersReducer from './CharactersSlice';
import { mangaApi } from '@/services/mangaApi';
import { listApi } from '@/services/listApi';
import { charactersApi } from '@/services/charactersApi';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  [animeApi.reducerPath]: animeApi.reducer,
  [mangaApi.reducerPath]: mangaApi.reducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
  [listApi.reducerPath]: listApi.reducer,
  anime: animeReducer,
  manga: mangaReducer,
  charaters: charactersReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(
      listApi.middleware,
      animeApi.middleware,
      mangaApi.middleware,
      charactersApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
