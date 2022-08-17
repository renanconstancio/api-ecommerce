import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';

export interface ICustomerAuthenticated {
  customer: CustomersEntity;
  token: string;
}
