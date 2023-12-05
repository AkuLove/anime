export interface IAnimeResponse {
  pagination: Pagination;
  data: ISingleAnime[];
}

export interface ISingleAnimeResponse {
  data: ISingleAnime;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: IAnime;
}

export interface IAnime {
  count: number;
  total: number;
  per_page: number;
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
  aired: IAired;
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
  producers: IProducer[];
  licensors: ILicensor[];
  studios: IStudio[];
  authors: IAuthors[];
  genres: IGenre[];
  themes: ITheme[];
}

export interface Images {
  jpg: IJpg;
  webp: IWebp;
}

export interface IJpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface IWebp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
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

export interface ITitle {
  type: string;
  title: string;
}

export interface IAired {
  from: string;
  to: string;
  prop: IProp;
  string: string;
}

export interface IProp {
  from: IFrom;
  to: ITo;
}

export interface IFrom {
  day: number;
  month: number;
  year: number;
}

export interface ITo {
  day: number;
  month: number;
  year: number;
}

export interface IBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface IProducer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ILicensor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IStudio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ITheme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IChooseAnimeOrManga {
  id: string;
  type: 'anime' | 'manga';
}

export interface IAuthors {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IGenres {
  id: number;
  name: string;
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
