import { Products } from '@prisma/client';
import { IFindProducts } from '../models/IFindProducts';
import { IPaginateProduct } from '../models/IPaginateProduct';
import { ICreateProduct } from '../models/ICreateProduct';
import { IUpdateProduct } from '../models/IUpdateProduct';

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
  update(data: IUpdateProduct): Promise<Products>;
  remove(id: string): Promise<void>;
}
