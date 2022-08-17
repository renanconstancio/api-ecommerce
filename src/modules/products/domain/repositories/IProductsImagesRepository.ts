import { ProductsImagesEntity } from '@modules/products/infra/prisma/entities/ProductsImages';
import { ICreateProductImage } from '../dtos/ICreateProductImage';

export interface IProductsImagesRepository {
  findBySkuIdCount(id: string): Promise<number>;
  findById(id: string): Promise<ProductsImagesEntity | null>;
  create(product: ICreateProductImage): Promise<ProductsImagesEntity>;
  remove(id: string): Promise<void>;
}
