import { IScore } from './ICommon';

export interface IMangaStatisticsResponse {
  data: IMangaStatistics;
}

export interface IMangaStatistics {
  watching: number;
  completed: number;
  on_hold: number;
  dropped: number;
  plan_to_read: number;
  total: number;
  scores: IScore[];
}
