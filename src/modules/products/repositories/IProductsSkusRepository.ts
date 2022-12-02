import { ICreateProductSku } from '@modules/products/dtos/ICreateProductSku';
import { IUpdateProductSku } from '@modules/products/dtos/IUpdateProductSku';
import { IUpdateStockProductsSkus } from '@modules/products/dtos/IUpdateStockProductsSkus';
import { IFindProductsSkus } from '@modules/products/dtos/IFindProductsSkus';
import { ProductsSkusEntity } from '@modules/products/infra/prisma/dtos/productSku';
import { ProductsEntity } from '@modules/products/infra/prisma/dtos/productDTOs';

export interface IProductsSkusRepository {
  findBySku(sku: string): Promise<ProductsSkusEntity | null>;
  findAll(product_id: string): Promise<ProductsEntity | null>;
  findById(product_id: string, id: string): Promise<ProductsEntity | null>;
  findAllByIds(id: IFindProductsSkus[]): Promise<ProductsSkusEntity[]>;

  updateStock(data: IUpdateStockProductsSkus[]): Promise<void>;
  update(data: IUpdateProductSku): Promise<ProductsSkusEntity>;
  create(data: ICreateProductSku): Promise<ProductsSkusEntity>;
  remove(id: string): Promise<void>;
}
