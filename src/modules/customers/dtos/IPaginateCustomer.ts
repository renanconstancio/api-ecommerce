import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';

export interface IPaginateCustomer {
  total: number;
  per_page: number;
  current_page: number;
  data: CustomersEntity[];
}
