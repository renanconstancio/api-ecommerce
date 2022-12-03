import { PaginationDTOs } from '../../dtos/paginationDTOs';
import { ProductDTOs } from '../../dtos/productDTOs';
import { RequestDTOs } from '../../dtos/requestDTOs';

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
