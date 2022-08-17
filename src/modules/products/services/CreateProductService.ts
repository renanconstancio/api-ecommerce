import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domain/dtos/ICreateProduct';
import { ProductsEntity } from '../infra/prisma/entities/Products';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: ICreateProduct): Promise<ProductsEntity> {
    const productExists = await this.productsRepository.findByName(data.name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    const product = await this.productsRepository.create({ ...data });

    return product;
  }
}
