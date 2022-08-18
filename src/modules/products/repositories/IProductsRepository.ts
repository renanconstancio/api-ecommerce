import { IPaginateProduct } from '@modules/products/dtos/IPaginateProduct';
import { IFindProducts } from '@modules/products/dtos/IFindProducts';
import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';
import { IUpdateProduct } from '@modules/products/dtos/IUpdateProduct';
import { ProductsEntity } from '@modules/products/infra/prisma/entities/Products';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export interface IProductsRepository {
  findAll({ page, skip, take, name }: SearchParams): Promise<IPaginateProduct>;
  findById(id: string): Promise<ProductsEntity | null>;
  findByName(name: string): Promise<ProductsEntity | null>;
  findAllByIds(id: IFindProducts[]): Promise<ProductsEntity[]>;

  create(data: ICreateProduct): Promise<ProductsEntity>;
  update(data: IUpdateProduct): Promise<ProductsEntity>;
  remove(id: string): Promise<void>;
}
