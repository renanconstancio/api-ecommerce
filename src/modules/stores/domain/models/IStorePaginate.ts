import { IStore } from './IStore';

export interface IStorePaginate {
  total: number;
  per_page: number;
  current_page: number;
  data: IStore[];
}
