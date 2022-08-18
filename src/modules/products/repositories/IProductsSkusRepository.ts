import { ICreateProductSku } from '@modules/products/dtos/ICreateProductSku';
import { IUpdateProductSku } from '@modules/products/dtos/IUpdateProductSku';
import { IUpdateStockProductsSkus } from '@modules/products/dtos/IUpdateStockProductsSkus';
import { ProductsSkusEntity } from '@modules/products/infra/prisma/entities/ProductsSkus';
import { ProductsEntity } from '@modules/products/infra/prisma/entities/Products';

export interface IProductsSkusRepository {
  findAll(product_id: string): Promise<ProductsEntity | null>;
  findById(product_id: string, id: string): Promise<ProductsEntity | null>;
  // findById(product_id: string, id: string): Promise<ProductsSkusEntity | null>;
  findBySku(sku: string): Promise<ProductsSkusEntity | null>;

  updateStock(data: IUpdateStockProductsSkus[]): Promise<void>;
  update(data: IUpdateProductSku): Promise<ProductsSkusEntity>;
  create(data: ICreateProductSku): Promise<ProductsSkusEntity>;
  remove(id: string): Promise<void>;
}
