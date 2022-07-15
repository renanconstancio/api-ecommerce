import Product from '../entities/Product';
import { In, Like, Repository } from 'typeorm';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { dataSource } from '@shared/infra/typeorm';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }

  async create({
    name,
    keywords,
    description,
    description_text,
    visible,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      description,
      description_text,
      keywords,
      name,
      visible,
    });

    await this.ormRepository.save(product);

    return product;
  }

  async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  async remove(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
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
    const product = this.ormRepository.findOne({
      relations: ['skus', 'skus.images'],
      where: {
        id,
      },
    });

    return product;
  }

  async findAll({
    page,
    skip,
    take,
    name,
  }: SearchParams): Promise<IProductPaginate> {
    const where = {} as { [key: string]: unknown };

    if (name) where.name = Like(`%${name}%`);

    const [products, count] = await this.ormRepository.findAndCount({
      relations: ['skus', 'skus.images'],
      take: take,
      skip: skip,
      where,
    });

    const result = {
      total: count,
      per_page: take,
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
