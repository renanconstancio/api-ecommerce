import { inject, injectable } from 'tsyringe';
import { IProductsSkusRepository } from '@modules/products/repositories/IProductsSkusRepository';
import { ProductsEntity } from '@modules/products/prisma/entities/Products';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindProductsSkusUseCases {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute(product_id: string): Promise<ProductsEntity> {
    const productSku = await this.productsSkusRepository.findAll(product_id);

    if (!productSku) {
      throw new AppError('Product Sku not found.');
    }

    return productSku;
  }
}
