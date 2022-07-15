import { DataSource } from 'typeorm';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Store from '@modules/stores/infra/typeorm/entities/Store';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ProductSku from '@modules/products/infra/typeorm/entities/ProductSku';
import ProductImage from '@modules/products/infra/typeorm/entities/ProductImage';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'rootpass',
  database: process.env.DB_DATABASE || 'ecommerce_db',
  entities: [Store, Category, Product, ProductSku, ProductImage, Customer],
  synchronize: true,
});
