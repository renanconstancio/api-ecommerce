import { inject, injectable } from 'tsyringe';
import { PaginationDTOs } from '@modules/products/infra/prisma/dtos/paginationDTOs';
import { ProductDTOs } from '@modules/products/infra/prisma/dtos/productDTOs';
import { RequestDTOs } from '@modules/products/infra/prisma/dtos/requestDTOs';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';

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
