import { inject, injectable } from 'tsyringe';
import { ICreateProductSku } from '@modules/products/dtos/ICreateProductSku';
import { IProductsSkusRepository } from '@modules/products/repositories/IProductsSkusRepository';
import { ProductsSkus } from '@modules/products/infra/prisma/dtos/productSku';
import AppError from '@shared/errors/AppError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class CreateProductSkusUseCases {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute(data: ICreateProductSku): Promise<ProductsSkus> {
    const productSkuExists = await this.productsSkusRepository.findBySku(
      data.sku,
    );

    if (productSkuExists) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    const productSku = await this.productsSkusRepository.create({ ...data });

    return productSku;
  }
}
