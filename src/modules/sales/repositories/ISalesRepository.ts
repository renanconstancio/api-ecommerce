import { IPaginateSales } from '@modules/sales/dtos/IPaginateSales';
import { SalesEntity } from '@modules/sales/infra/prisma/entities/Sales';
import { ICreateSales } from '@modules/sales/dtos/ICreateSales';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ISalesRepository {
  create(data: ICreateSales): Promise<SalesEntity>;
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateSales>;
  findById(id: string): Promise<SalesEntity | null>;
}
