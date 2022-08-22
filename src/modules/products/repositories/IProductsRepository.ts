import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';
import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';
import { IUpdateProduct } from '@modules/products/dtos/IUpdateProduct';
import { Products } from '@modules/products/infra/prisma/entities/Products';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export interface IProductsRepository {
  findAll({ page, skip, take, name }: SearchParams): Promise<IPaginateProducts>;
  findById(id: string): Promise<Products | null>;
  findByName(name: string): Promise<Products | null>;
  create(data: ICreateProduct): Promise<Products>;
  update(data: IUpdateProduct): Promise<Products>;
  remove(id: string): Promise<void>;
}
