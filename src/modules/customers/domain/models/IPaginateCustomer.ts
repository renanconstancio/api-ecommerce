import { Customers } from '@prisma/client';

export interface IPaginateCustomer {
  total: number;
  per_page: number;
  current_page: number;
  data: Customers[];
}
