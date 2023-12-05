import {
  IGenre,
  IGenres,
  IProp,
  ITheme,
  ITitle,
  Images,
  Pagination,
} from './IAnime';

export interface ISingleMangaResonse {
  pagination: Pagination;
  data: ISingleManga;
}

export interface ISingleManga {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: ITitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  serializations: Serialization[];
  genres: IGenre[];
  themes: ITheme[];
}

export interface Published {
  from: string;
  to: string;
  prop: IProp;
  string: string;
}

export interface Author {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Serialization {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IMangaDescriptions {
  type: null | string;
  chapters: null | number;
  volumes: null | number;
  genres: null | IGenres[];
  status: null | string;
  published: null | string;
  authors: null | IGenres[];
}
