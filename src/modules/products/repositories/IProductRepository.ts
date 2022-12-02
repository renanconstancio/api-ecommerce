import { PaginationDTOs } from '../infra/prisma/dtos/paginationDTOs';
import { ProductDTOs } from '../infra/prisma/dtos/productDTOs';
import { RequestDTOs } from '../infra/prisma/dtos/requestDTOs';

export interface IProductRepository {
  save(data: ProductDTOs): Promise<ProductDTOs>;
  delete(id: string): Promise<void>;
  findByAll({
    limit,
    order,
    page,
    search,
  }: RequestDTOs): Promise<PaginationDTOs<ProductDTOs[]>>;
  findByName(name: string): Promise<ProductDTOs | null>;
  findById(id: string): Promise<ProductDTOs | null>;
}
