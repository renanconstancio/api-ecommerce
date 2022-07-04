import { In, Repository } from 'typeorm';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '../entities/Product';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { dataSource } from '@shared/infra/typeorm';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  async create({
    sku,
    name,
    price,
    quantity,
    description,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      sku,
      name,
      price,
      quantity,
      description,
    });

    await this.ormRepository.save(product);

    return product;
  }

  async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.ormRepository.findOneBy({
      name,
    });

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.ormRepository.findOneBy({ id });

    return product;
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result;
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}
