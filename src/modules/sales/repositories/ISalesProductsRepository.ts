import { ProductsSkusEntity } from '@modules/products/infra/prisma/entities/ProductsSkus';
import { IFindSalesProducts } from '@modules/sales/dtos/IFindSalesProducts';
import { ICreateSalesProducts } from '@modules/sales/dtos/ICreateSalesProducts';
import { SalesProductsEntity } from '@modules/sales/infra/prisma/entities/SalesProducts';
import { IUpdateStockSalesProducts } from '@modules/sales/dtos/IUpdateStockSalesProducts';

export interface ISalesProductsRepository {
  updateStock(data: IUpdateStockSalesProducts[]): Promise<void>;
  findAllByIds(ids: IFindSalesProducts[]): Promise<ProductsSkusEntity[]>;
  create(data: ICreateSalesProducts): Promise<SalesProductsEntity>;
}
