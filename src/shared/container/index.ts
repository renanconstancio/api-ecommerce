import { container, delay } from 'tsyringe';

import '@modules/products/providers';

import CustomersRepository from '@modules/customers/infra/prisma/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';

import CategoriesRepository from '@modules/categories/infra/prisma/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

import StoresRepository from '@modules/stores/infra/prisma/repositories/StoresRepository';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';

import ProductsRepository from '@modules/products/infra/prisma/repositories/ProductsRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

import ProductsSkusRepository from '@modules/products/infra/prisma/repositories/ProductsSkusRepository';
import { IProductsSkusRepository } from '@modules/products/repositories/IProductsSkusRepository';

import { IProductsImagesRepository } from '@modules/products/repositories/IProductsImagesRepository';
import ProductsImagesRepository from '@modules/products/infra/prisma/repositories/ProductsImagesRepository';

import CustomersHashRepository from '@modules/customers/infra/prisma/repositories/CustomersHashRepository';
import { ICustomersHashRepository } from '@modules/customers/repositories/ICustomersHashRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  delay(() => CategoriesRepository),
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  delay(() => CustomersRepository),
);

container.registerSingleton<ICustomersHashRepository>(
  'CustomersHashRepository',
  delay(() => CustomersHashRepository),
);

container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  delay(() => StoresRepository),
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  delay(() => ProductsRepository),
);

container.registerSingleton<IProductsSkusRepository>(
  'ProductsSkusRepository',
  delay(() => ProductsSkusRepository),
);

container.registerSingleton<IProductsImagesRepository>(
  'ProductsImagesRepository',
  delay(() => ProductsImagesRepository),
);

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
