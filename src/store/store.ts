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
import storage from 'redux-persist/lib/storage';
import { animeApi } from '@/services/animeApi';
import animeReducer from './AnimeSlice';
import mangaReducer from './MangaSlice';
import { mangaApi } from '@/services/mangaApi';
import { listApi } from '@/services/listApi';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  [animeApi.reducerPath]: animeApi.reducer,
  [mangaApi.reducerPath]: mangaApi.reducer,
  [listApi.reducerPath]: listApi.reducer,
  anime: animeReducer,
  manga: mangaReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(listApi.middleware, animeApi.middleware, mangaApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
