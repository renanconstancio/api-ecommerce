import { IProductSku } from '../models/IProductSku';
import { ICreateProductSku } from '../models/ICreateProductSku';
import { IProduct } from '../models/IProduct';

export interface IProductsSkusRepository {
  findAll(product_id: string): Promise<IProduct | null>;
  findById(product_id: string, id: string): Promise<IProduct | null>;
  findBySku(name: string): Promise<IProductSku | null>;
  create(data: ICreateProductSku): Promise<IProductSku>;
  save(product: IProductSku): Promise<IProductSku>;
  remove(id: string): Promise<void>;
}
