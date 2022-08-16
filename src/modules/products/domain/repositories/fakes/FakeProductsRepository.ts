import { v4 as uuidv4 } from 'uuid';
import { Products } from '@prisma/client';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IPaginateProduct } from '@modules/products/domain/models/IPaginateProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
// import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProductsSkus';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Products[] = [];

  async create(data: ICreateProduct): Promise<Products> {
    const product = {} as Products;

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

  async save(data: ICreateProduct): Promise<Products> {
    Object.assign(this.products, data);

    return data as Products;
  }

  async remove(id: string): Promise<void> {
    this.products.find(products => products.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateProduct> {
    return {} as IPaginateProduct;
  }

  async findAllByIds(): Promise<Products[]> {
    return [];
  }

  async findById(id: string): Promise<Products | null> {
    const product = this.products.find(products => products.id === id);

    return product as Products;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateStock(_products: IUpdateStockProduct[]): Promise<void> {
    return;
  }

  async findByName(name: string): Promise<Products | null> {
    const product = this.products.find(products => products.name === name);

    return product as Products;
  }
}
