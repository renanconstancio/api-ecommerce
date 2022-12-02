import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';
import { IRequestProduct } from '../dtos/IRequestProduct';
import { IResponseProduct } from '../dtos/IResponseProduct';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export interface IProductRepository {
  findAll({ page, skip, take, name }: SearchParams): Promise<IPaginateProducts>;
  findByName(name: string): Promise<IResponseProduct | null>;
  findById(id: string): Promise<IResponseProduct | null>;
  save(data: IRequestProduct): Promise<IResponseProduct>;
  delete(id: string): Promise<void>;
}
