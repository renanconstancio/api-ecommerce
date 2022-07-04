import { IProduct } from './IProduct';

export interface IProductPaginate {
  total: number;
  per_page: number;
  current_page: number;
  data: IProduct[];
}
