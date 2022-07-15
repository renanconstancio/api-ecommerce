import { ICreateProductImage } from '../models/ICreateProductImage';
import { IProductImage } from '../models/IProductImage';

export interface IProductsImagesRepository {
  findById(id: string): Promise<IProductImage | null>;
  save(product: ICreateProductImage): Promise<IProductImage>;
  remove(id: string): Promise<void>;
}
