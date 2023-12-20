import { Images, Pagination } from './ICommon';

export interface ICharacterResponse {
  pagination: Pagination;
  data: ISingleCharacter[];
}

export interface ISingleCharacter {
  mal_id: number;
  url: string;
  images: ICharacterImages;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

export interface ISingleCharacterFullResponse {
  data: ISingleCharacterFull;
}

export interface ISingleCharacterFull extends ISingleCharacter {
  anime: Anime[];
  manga: Manga[];
  voices: Voice[];
}

export interface ICharacterImages {
  jpg: ICharacterJpg;
  webp: ICharacterWebp;
}

export interface ICharacterJpg {
  image_url: string;
}

export interface ICharacterWebp {
  image_url: string;
  small_image_url: string;
}

export interface Anime {
  role: string;
  anime: IContent;
}

export interface Manga {
  role: string;
  manga: IContent;
}

export interface Voice {
  person: Person;
  language: string;
}

export interface IContent {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface Person {
  mal_id: number;
  url: string;
  images: ImagesJPG;
  name: string;
}

export interface ImagesJPG {
  jpg: Jpg4;
}

export interface Jpg4 {
  image_url: string;
}
