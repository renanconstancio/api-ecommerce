import { inject, injectable } from 'tsyringe';
import { IProductSkuRepository } from '@modules/products/repositories/IProductSkuRepository';
import { ProductsEntity } from '@modules/products/infra/prisma/dtos/productDTOs';
import AppError from '@shared/errors/appError';

@injectable()
export default class FindProductsSkusUseCases {
  constructor(
    @inject('ProductSkuRepository')
    private ProductSkuRepository: IProductSkuRepository,
  ) {}

  async execute(product_id: string): Promise<ProductsEntity> {
    const productSku = await this.ProductSkuRepository.findAll(product_id);

    if (!productSku) {
      throw new AppError('Product Sku not found.');
    }

    return productSku;
  }
}
