import { inject, injectable } from 'tsyringe';
import { PaginationDTOs } from '@modules/products/dtos/paginationDTOs';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';
import { RequestDTOs } from '@modules/products/dtos/requestDTOs';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';

@injectable()
export default class FindAllProductUseCase {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  async execute({
    order,
    search,
    limit,
    page,
  }: RequestDTOs): Promise<PaginationDTOs<ProductDTOs[]>> {
    return await this.repository.findByAll({ limit, order, page, search });
  }
}
