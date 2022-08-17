import { ICustomer } from './ICustomer';

export interface ICustomerAuthenticated {
  customer: ICustomer;
  token: string;
}
