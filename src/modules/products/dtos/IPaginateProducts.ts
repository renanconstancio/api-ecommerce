import { IResponseProduct } from './IResponseProduct';

export interface IPaginateProducts {
  total: number;
  per_page: number;
  current_page: number;
  data: IResponseProduct[];
}
