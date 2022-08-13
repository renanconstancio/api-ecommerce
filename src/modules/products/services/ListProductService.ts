import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IPaginateProduct } from '../domain/models/IPaginateProduct';

interface SearchParams {
  page: number;
  limit: number;
  name: string;
}

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    page,
    limit,
    name,
  }: SearchParams): Promise<IPaginateProduct> {
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
