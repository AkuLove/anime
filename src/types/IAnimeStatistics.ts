import { IScore } from './ICommon';

export interface IAnimeStatisticsResponse {
  data: IAnimeStatistics;
}

export interface IAnimeStatistics {
  watching: number;
  completed: number;
  on_hold: number;
  dropped: number;
  plan_to_watch: number;
  total: number;
  scores: IScore[];
}
