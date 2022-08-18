import { inject, injectable } from 'tsyringe';
import { IUpdateProduct } from '@modules/products/dtos/IUpdateProduct';
import { ProductsEntity } from '@modules/products/infra/prisma/entities/Products';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
// import redisCache from '@shar../../infra/prisma/entities/Products
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateProductsUseCases {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(data: IUpdateProduct): Promise<ProductsEntity> {
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
