import { ICreateProductImage } from '../models/ICreateProductImage';
import { IProductImage } from '../models/IProductImage';

export interface IProductsImagesRepository {
  findBySkuIdCount(id: string): Promise<number>;
  findById(id: string): Promise<IProductImage | null>;
  create(product: ICreateProductImage): Promise<IProductImage>;
  remove(id: string): Promise<void>;
}
