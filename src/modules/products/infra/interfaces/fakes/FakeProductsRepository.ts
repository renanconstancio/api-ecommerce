import { v4 as uuidv4 } from 'uuid';

import { IProductsRepository } from '@modules/products/infra/interfaces/IProductRepository';
import { ProductsEntity } from '@modules/products/dtos/productDTOs';
import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';
import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';

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

  async findAll(): Promise<IPaginateProducts> {
    return {} as IPaginateProducts;
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
