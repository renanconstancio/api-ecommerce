import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsEntity } from '@modules/products/infra/prisma/entities/Products';
import { IShowProduct } from '@modules/products/dtos/IShowProduct';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindProductsUseCases {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IShowProduct): Promise<ProductsEntity> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
