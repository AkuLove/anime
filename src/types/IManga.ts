import {
  IGenres,
  IItem,
  IPublished,
  ITitle,
  Images,
  Pagination,
} from './ICommon';

export interface IMangaResponse {
  pagination: Pagination;
  data: ISingleManga[];
}

export interface ISingleMangaResponse {
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
  published: IPublished;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: IItem[];
  serializations: IItem[];
  genres: IItem[];
  themes: IItem[];
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
