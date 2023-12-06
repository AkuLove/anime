export interface IItem {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: ICount;
}

export interface ICount {
  count: number;
  total: number;
  per_page: number;
}

export interface Images {
  jpg: ITypeOfImages;
  webp: ITypeOfImages;
}

export interface ITypeOfImages {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface ITitle {
  type: string;
  title: string;
}

export interface IProp {
  from: IFromTo;
  to: IFromTo;
}

export interface IFromTo {
  day: number;
  month: number;
  year: number;
}

export interface IPublished {
  from: string;
  to: string;
  prop: IProp;
  string: string;
}

export interface IGenres {
  id: number;
  name: string;
}
