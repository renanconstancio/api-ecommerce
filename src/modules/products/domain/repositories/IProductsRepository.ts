import { Products } from '@prisma/client';
import { IFindProducts } from '../dtos/IFindProducts';
import { IPaginateProduct } from '../dtos/IPaginateProduct';
import { ICreateProduct } from '../dtos/ICreateProduct';
import { IUpdateProduct } from '../dtos/IUpdateProduct';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export interface IProductsRepository {
  findAll({ page, skip, take, name }: SearchParams): Promise<IPaginateProduct>;
  findById(id: string): Promise<Products | null>;
  findByName(name: string): Promise<Products | null>;
  findAllByIds(id: IFindProducts[]): Promise<Products[]>;

  create(data: ICreateProduct): Promise<Products>;
  update(data: IUpdateProduct): Promise<Products>;
  remove(id: string): Promise<void>;
}
