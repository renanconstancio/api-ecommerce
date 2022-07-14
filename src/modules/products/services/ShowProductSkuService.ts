import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IShowProductSku } from '../domain/models/IShowProductSku';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute({ product_id, id }: IShowProductSku): Promise<IProduct> {
    const product = await this.productsSkusRepository.findById(product_id, id);

    if (!product) {
      throw new AppError('Product and Sku not found.');
    }

    return product;
  }
}
