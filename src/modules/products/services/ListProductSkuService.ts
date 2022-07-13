import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';

@injectable()
export default class ListProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute(): Promise<IProduct> {
    const products = await this.productsSkusRepository.findAll({
      product_id,
    });

    return products;
  }
}
