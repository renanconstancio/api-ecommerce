import { inject, injectable } from 'tsyringe';
import { IDeleteProduct } from '@modules/products/dtos/IDeleteProduct';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
import AppError from '@shared/errors/appError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class DeleteProductsUseCases {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.productsRepository.remove(id);
  }
}
