import { inject, injectable } from 'tsyringe';
// import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    description_text,
    keywords,
    visible,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    product.name = name;
    product.description = description;
    product.description_text = description_text;
    product.keywords = keywords;
    product.visible = visible;

    await this.productsRepository.save(product);

    return product;
  }
}
