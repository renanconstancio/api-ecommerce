import { inject, injectable } from 'tsyringe';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import { ProductsEntity } from '../infra/prisma/entities/Products';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ListProductSkuService {
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
