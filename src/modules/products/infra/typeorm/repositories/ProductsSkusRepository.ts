import { Repository } from 'typeorm';
import { IProductsSkusRepository } from '@modules/products/domain/repositories/IProductsSkusRepository';
import { ICreateProductSku } from '@modules/products/domain/models/ICreateProductSku';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { dataSource } from '@shared/infra/typeorm';
import Product from '../entities/Product';
import ProductSku from '../entities/ProductSku';

export default class ProductsSkusRepository implements IProductsSkusRepository {
  private ormRepository: Repository<ProductSku>;
  private ormProductRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductSku);
    this.ormProductRepository = dataSource.getRepository(Product);
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

  async findById(product_id: string, id: string): Promise<IProduct | null> {
    const productSku = this.ormProductRepository.findOne({
      relations: ['skus'],
      where: {
        id: product_id,
        skus: {
          id,
        },
      },
    });
    return productSku;
  }

  async findAll(product_id: string): Promise<IProduct | null> {
    const productSku = this.ormProductRepository.findOne({
      relations: ['skus'],
      where: { id: product_id },
    });
    return productSku;
  }
}
