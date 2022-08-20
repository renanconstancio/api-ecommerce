import { ISalesPaginate } from '@modules/sales/dtos/IPaginateSales';
import { SalesEntity } from '@modules/sales/infra/prisma/entities/Sales';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ISalesRepository {
  create(data: ICreateSales): Promise<SalesEntity>;

  findAll({ page, skip, take }: SearchParams): Promise<ISalesPaginate>;
  findById(id: string): Promise<SalesEntity | null>;
}
