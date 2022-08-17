import { inject, injectable } from 'tsyringe';
import { ICreateProductSku } from '../domain/dtos/ICreateProductSku';
import { ProductsSkusEntity } from '../infra/prisma/entities/ProductsSkus';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';

import AppError from '@shared/errors/AppError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class CreateProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute(data: ICreateProductSku): Promise<ProductsSkusEntity> {
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
