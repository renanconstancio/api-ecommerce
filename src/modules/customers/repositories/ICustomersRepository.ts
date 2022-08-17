import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import { IPaginateCustomer } from '@modules/customers/dtos/IPaginateCustomer';
import { ICreateCustomer } from '@modules/customers/dtos/ICreateCustomer';
import { IUpdateCustomer } from '@modules/customers/dtos/IUpdateCustomer';

export type CustomersParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: CustomersParams): Promise<IPaginateCustomer>;
  findByName(name: string): Promise<CustomersEntity | null>;
  findByEmail(email: string): Promise<CustomersEntity | null>;
  findById(id: string): Promise<CustomersEntity | null>;

  create(data: ICreateCustomer): Promise<CustomersEntity>;
  update(customer: IUpdateCustomer): Promise<CustomersEntity>;
  remove(id: string): Promise<void>;
}
