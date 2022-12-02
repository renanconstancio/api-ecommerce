import { ProductsSkus } from '@modules/products/infra/prisma/dtos/productSku';
import { IFindSalesProducts } from '@modules/sales/dtos/IFindSalesProducts';
import { ICreateSalesProducts } from '@modules/sales/dtos/ICreateSalesProducts';
import { IUpdateStockSalesProducts } from '@modules/sales/dtos/IUpdateStockSalesProducts';

export interface ISalesProductsRepository {
  updateStock(data: IUpdateStockSalesProducts[]): Promise<void>;
  findAllByIds(ids: IFindSalesProducts[]): Promise<ProductsSkus[]>;
  create(data: ICreateSalesProducts[]): Promise<void>;
}
