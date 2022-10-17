import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';
import { IRequestProduct } from '../dtos/IRequestProduct';
import { IResponseProduct } from '../dtos/IResponseProduct';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export interface IProductsRepository {
  findAll({ page, skip, take, name }: SearchParams): Promise<IPaginateProducts>;
  findById(id: string): Promise<IResponseProduct | null>;
  findByName(name: string): Promise<IResponseProduct | null>;
  delete(id: string): Promise<void>;
  save(data: IRequestProduct): Promise<IResponseProduct>;
}
