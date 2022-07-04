import { ICategory } from './ICategory';

export interface IPaginateCategory {
  total: number;
  per_page: number;
  current_page: number;
  data: ICategory[];
}
