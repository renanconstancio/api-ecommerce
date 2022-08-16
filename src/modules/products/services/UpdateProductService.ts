import { inject, injectable } from 'tsyringe';
// import redisCache from '@shared/cache/RedisCache';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

import AppError from '@shared/errors/AppError';
import { Products } from '@prisma/client';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: IUpdateProduct): Promise<Products> {
    const product = await this.productsRepository.findById(data.id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(data.name);

    if (productExists && data.name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    return await this.productsRepository.update(data);
  }
}
