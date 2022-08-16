import { Products, ProductsSkus } from '@prisma/client';
import { IUpdateStockProductsSkus } from '../models/IUpdateStockProductsSkus';
import { ICreateProductSku } from '../models/ICreateProductSku';
import { IProductSku } from '../models/IProductSku';

export interface IProductsSkusRepository {
  findAll(product_id: string): Promise<Products | null>;
  findById(product_id: string, id: string): Promise<Products | null>;
  findByIdSku(sku: string): Promise<ProductsSkus | null>;
  findBySku(sku: string): Promise<ProductsSkus | null>;

  create(data: ICreateProductSku): Promise<ProductsSkus>;
  update(data: IProductSku): Promise<ProductsSkus>;
  updateStock(data: IUpdateStockProductsSkus[]): Promise<void>;
  remove(id: string): Promise<void>;
}
