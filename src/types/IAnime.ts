import {
  IGenres,
  IItem,
  IPublished,
  ITitle,
  Images,
  Pagination,
} from './ICommon';

export interface IAnimeResponse {
  pagination: Pagination;
  data: ISingleAnime[];
}

export interface ISingleAnimeResponse {
  data: ISingleAnime;
}

export interface ISingleAnime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: ITrailer;
  approved: boolean;
  titles: ITitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: IPublished;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: IBroadcast;
  producers: IItem[];
  licensors: IItem[];
  studios: IItem[];
  authors: IItem[];
  genres: IItem[];
  themes: IItem[];
  demographics: IItem[];
}

export interface ITrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: IImages2;
}

export interface IImages2 {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
}

export interface IBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}
export interface IChooseAnimeOrManga {
  id: string;
  type: 'anime' | 'manga';
}

export interface IAnimeDescriptions {
  type: null | string;
  episodes: null | number;
  genres: null | IGenres[];
  status: null | string;
  aired: null | string;
  duration: null | string;
  rating: null | string;
  studios: null | IGenres[];
}
