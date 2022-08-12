import { ICustomer } from '../models/ICustomer';
import { ICreateCustomer } from '../models/ICreateCustomer';
import { IUpdateCustomer } from '../models/IUpdateCustomer';
import { ICustomerPaginate } from '../models/ICustomerPaginate';

export type CustomersParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: CustomersParams): Promise<ICustomerPaginate>;
  findByName(name: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;

  create(data: ICreateCustomer): Promise<ICustomer>;
  update(customer: IUpdateCustomer): Promise<ICustomer>;
  remove(id: string): Promise<void>;
}
