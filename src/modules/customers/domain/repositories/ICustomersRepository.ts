import { Customers } from '@prisma/client';
import { ICreateCustomer } from '../models/ICreateCustomer';
import { IUpdateCustomer } from '../models/IUpdateCustomer';
import { IPaginateCustomer } from '../models/IPaginateCustomer';

export type CustomersParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: CustomersParams): Promise<IPaginateCustomer>;
  findByName(name: string): Promise<Customers | null>;
  findById(id: string): Promise<Customers | null>;
  findByEmail(email: string): Promise<Customers | null>;

  create(data: ICreateCustomer): Promise<Customers>;
  update(customer: IUpdateCustomer): Promise<Customers>;
  remove(id: string): Promise<void>;
}
