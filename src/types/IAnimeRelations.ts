import { IItem } from './ICommon';

export interface IAnimeRelations {
  data: ISingleAnimeRelation[];
}

export interface ISingleAnimeRelation {
  relation: string;
  entry: IItem[];
}
