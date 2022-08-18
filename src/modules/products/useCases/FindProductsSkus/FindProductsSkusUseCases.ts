import { inject, injectable } from 'tsyringe';
import { IShowProductSku } from '../../dtos/IShowProductSku';
import { IProductsSkusRepository } from '../../repositories/IProductsSkusRepository';
import { ProductsEntity } from '../../prisma/entities/Products';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindProductsSkusUseCases {
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
