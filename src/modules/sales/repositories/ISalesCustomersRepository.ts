import { Customers } from '@modules/customers/infra/prisma/etities/Customers';

export interface ISalesCustomersRepository {
  // create(data: ICreateSales): Promise<SalesEntity>;
  // findAll({ page, skip, take }: SearchParams): Promise<IPaginateSales>;
  findById(id: string): Promise<Customers | null>;
}
