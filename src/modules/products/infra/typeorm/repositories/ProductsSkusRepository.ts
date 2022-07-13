import { Like, Repository } from 'typeorm';
import ProductSku from '../entities/ProductSku';
import { IProductsSkusRepository } from '@modules/products/domain/repositories/IProductsSkusRepository';
import { ICreateProductSku } from '@modules/products/domain/models/ICreateProductSku';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { dataSource } from '@shared/infra/typeorm';

export default class ProductsSkusRepository implements IProductsSkusRepository {
  private ormRepository: Repository<ProductSku>;

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductSku);
  }

  async create({
    product_id,
    sku,
    price,
    cost_price,
    sale_price,
    quantity,
  }: ICreateProductSku): Promise<ProductSku> {
    const productSku = this.ormRepository.create({
      product_id,
      sku,
      price,
      cost_price,
      sale_price,
      quantity,
    });

    await this.ormRepository.save(productSku);

    return productSku;
  }

  async save(sku: ProductSku): Promise<ProductSku> {
    await this.ormRepository.save(sku);

    return sku;
  }

  async remove(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findBySku(sku: string): Promise<ProductSku | null> {
    const productSku = this.ormRepository.findOneBy({
      sku,
    });

    return productSku;
  }

  async findById(id: string): Promise<ProductSku | null> {
    const productSku = this.ormRepository.findOneBy({
      id,
    });

    return productSku;
  }

  async findAll({
    product_id,
  }: {
    product_id: string;
  }): Promise<IProductPaginate> {
    const where = {} as { [key: string]: unknown };

    if (name) where.name = Like(`%${name}%`);

    const [products, count] = await this.ormRepository.findAndCount({
      relations: ['skus'],

      where,
    });

    // const [products, count] = await this.ormRepository
    //   .createQueryBuilder()
    //   .skip(skip)
    //   .take(take)
    //   .getManyAndCount();

    const result = {
      total: count,
      per_page: 1,
      current_page: 1,
      data: products,
    };

    return result;
  }
}
