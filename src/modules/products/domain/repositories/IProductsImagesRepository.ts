import { ICreateProductImage } from '../models/ICreateProductImage';
import { IProductImage } from '../models/IProductImage';

export interface IProductsImagesRepository {
  findBySkuIdCount(id: string): Promise<number | null>;
  findById(id: string): Promise<IProductImage | null>;
  save(product: ICreateProductImage): Promise<IProductImage>;
  remove(id: string): Promise<void>;
}
