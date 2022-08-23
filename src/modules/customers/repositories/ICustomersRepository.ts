import { Customers } from '@modules/customers/infra/prisma/etities/Customers';
import { IPaginateCustomer } from '@modules/customers/dtos/IPaginateCustomer';
import { ICreateCustomer } from '@modules/customers/dtos/ICreateCustomer';
import { IUpdateCustomer } from '@modules/customers/dtos/IUpdateCustomer';
import { IDeleteCustomer } from '@modules/customers/dtos/IDeleteCustomer';
import { IFindCustomer } from '@modules/customers/dtos/IFindCustomer';

export type CustomersParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: CustomersParams): Promise<IPaginateCustomer>;
  findByName(name: string): Promise<Customers | null>;
  findByEmail(email: string): Promise<Customers | null>;
  findById(data: IFindCustomer): Promise<Customers | null>;

  create(data: ICreateCustomer): Promise<Customers>;
  update(data: IUpdateCustomer): Promise<Customers>;
  remove(data: IDeleteCustomer): Promise<void>;
}
