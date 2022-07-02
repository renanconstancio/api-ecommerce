import { ICustomer } from './ICustomer';

export interface ICustomerPaginate {
  total: number;
  per_page: number;
  current_page: number;
  data: ICustomer[];
}
