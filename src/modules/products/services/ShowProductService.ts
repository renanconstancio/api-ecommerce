import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ProductsEntity } from '../infra/prisma/entities/Products';
import { IShowProduct } from '../domain/dtos/IShowProduct';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowProductService {
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
