import { inject, injectable } from 'tsyringe';
// import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { Products } from '@prisma/client';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: ICreateProduct): Promise<Products> {
    const productExists = await this.productsRepository.findByName(data.name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    const product = await this.productsRepository.create({ ...data });

    return product;
  }
}
