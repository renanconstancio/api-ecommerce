import { Products } from '@prisma/client';
import { IFindProducts } from '../models/IFindProducts';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';
import { IPaginateProduct } from '../models/IPaginateProduct';
import { ICreateProduct } from '../models/ICreateProduct';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export interface IProductsRepository {
  findAll({ page, skip, take, name }: SearchParams): Promise<IPaginateProduct>;
  findByName(name: string): Promise<Products | null>;
  findById(id: string): Promise<Products | null>;
  findAllByIds(id: IFindProducts[]): Promise<Products[]>;

  create(data: ICreateProduct): Promise<Products>;
  update(data: IUpdateStockProduct): Promise<Products>;
  updateStock(data: IUpdateStockProduct[]): Promise<void>;
  remove(id: string): Promise<void>;
}
