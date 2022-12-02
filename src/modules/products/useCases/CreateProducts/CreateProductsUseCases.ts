import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';
import { ProductsEntity } from '@modules/products/infra/prisma/dtos/productDTOs';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
// import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProductsUseCases {
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
