import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';

interface SearchParams {
  page: number;
  limit: number;
  name: string;
}

@injectable()
export default class FindAllProductsUseCases {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    page,
    limit,
    name,
  }: SearchParams): Promise<IPaginateProducts> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
      name,
    });

    return products;
  }
}
