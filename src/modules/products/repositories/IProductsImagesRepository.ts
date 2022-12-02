import { ProductsImagesEntity } from '@modules/products/infra/prisma/dtos/productImage';
import { ICreateProductImage } from '@modules/products/dtos/ICreateProductImage';

export interface IProductImageRepository {
  findBySkuIdCount(id: string): Promise<number>;
  findById(id: string): Promise<ProductsImagesEntity | null>;
  create(product: ICreateProductImage): Promise<ProductsImagesEntity>;
  remove(id: string): Promise<void>;
}
