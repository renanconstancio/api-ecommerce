import { v4 as uuidv4 } from 'uuid';

import Product from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  async create({
    description,
    name,
    price,
    quantity,
    sku,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = uuidv4();
    product.sku = sku;
    product.description = description;
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    this.products.push(product);

    return product;
  }

  async save(data: Product): Promise<Product> {
    Object.assign(this.products, data);

    return data;
  }

  async remove(id: string): Promise<void> {
    this.products.find(products => products.id !== id);
    return;
  }

  async findAll(): Promise<IProductPaginate> {
    return {} as IProductPaginate;
  }

  async findAllByIds(): Promise<IProduct[]> {
    return [];
  }

  async findById(id: string): Promise<Product | null> {
    const category = this.products.find(products => products.id === id);

    return category as Product;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateStock(_products: IUpdateStockProduct[]): Promise<void> {
    return;
  }

  async findByName(name: string): Promise<Product | null> {
    const category = this.products.find(products => products.name === name);

    return category as Product;
  }
}
