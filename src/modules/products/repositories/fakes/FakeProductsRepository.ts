import { v4 as uuidv4 } from 'uuid';

import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';
import { IPaginateProduct } from '@modules/products/dtos/IPaginateProduct';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsEntity } from '@modules/products/prisma/entities/Products';

export default class FakeProductsRepository implements IProductsRepository {
  private products: ProductsEntity[] = [];

  async create(data: ICreateProduct): Promise<ProductsEntity> {
    const product = {} as ProductsEntity;

    product.id = uuidv4();
    product.name = data.name;
    product.description = data.description;
    product.description_text = data.description_text;
    product.keywords = data.keywords;
    product.description_text = data.description_text;
    product.description = data.description;

    this.products.push(product);

    return product;
  }

  async update(data: ICreateProduct): Promise<ProductsEntity> {
    Object.assign(this.products, data);

    return data as ProductsEntity;
  }

  async remove(id: string): Promise<void> {
    this.products.find(products => products.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateProduct> {
    return {} as IPaginateProduct;
  }

  async findById(id: string): Promise<ProductsEntity | null> {
    const product = this.products.find(products => products.id === id);

    return product as ProductsEntity;
  }

  async findByName(name: string): Promise<ProductsEntity | null> {
    const product = this.products.find(products => products.name === name);

    return product as ProductsEntity;
  }

  async findAllByIds(): Promise<ProductsEntity[]> {
    return [];
  }
}
