import { inject, injectable } from 'tsyringe';
import { IShowProductSku } from '../domain/dtos/IShowProductSku';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import { ProductsEntity } from '../infra/prisma/entities/Products';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute({ product_id, id }: IShowProductSku): Promise<ProductsEntity> {
    const product = await this.productsSkusRepository.findById(product_id, id);

    if (!product) {
      throw new AppError('Product and Sku not found.');
    }

    return product;
  }
}
