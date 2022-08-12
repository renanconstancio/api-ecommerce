import { container, delay } from 'tsyringe';

import '@modules/customers/providers';
import '@modules/products/providers';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import CategoriesRepository from '@modules/categories/infra/prisma/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';

import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/prisma/repositories/StoresRepository';

import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import { IProductsSkusRepository } from '@modules/products/domain/repositories/IProductsSkusRepository';
import ProductsSkusRepository from '@modules/products/infra/typeorm/repositories/ProductsSkusRepository';

import { IProductsImagesRepository } from '@modules/products/domain/repositories/IProductsImagesRepository';
import ProductsImagesRepository from '@modules/products/infra/typeorm/repositories/ProductsImagesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  delay(() => CategoriesRepository),
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  delay(() => CustomersRepository),
);

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  delay(() => StoresRepository),
);

// container.registerSingleton<IProductsRepository>(
//   'ProductsRepository',
//   delay(() => ProductsRepository),
// );

// container.registerSingleton<IProductsSkusRepository>(
//   'ProductsSkusRepository',
//   delay(() => ProductsSkusRepository),
// );

// container.registerSingleton<IProductsImagesRepository>(
//   'ProductsImagesRepository',
//   delay(() => ProductsImagesRepository),
// );

// container.registerSingleton<IOrdersRepository>(
//   'OrdersRepository',
//   OrdersRepository,
// );

// container.registerSingleton<IUsersRepository>(
//   'UsersRepository',
//   UsersRepository,
// );

// container.registerSingleton<IUserTokensRepository>(
//   'UserTokensRepository',
//   UserTokensRepository,
// );
