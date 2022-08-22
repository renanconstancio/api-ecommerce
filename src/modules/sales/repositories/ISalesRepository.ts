import { IPaginateSales } from '@modules/sales/dtos/IPaginateSales';
import { Sales } from '@modules/sales/infra/prisma/entities/Sales';
import { ICreateSales } from '@modules/sales/dtos/ICreateSales';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ISalesRepository {
  nextCode(): Promise<string>;
  findById(id: string): Promise<Sales | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateSales>;
  create(data: ICreateSales): Promise<Sales>;
}
