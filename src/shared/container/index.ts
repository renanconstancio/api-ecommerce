import { container, delay } from 'tsyringe';

// import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
// import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
// import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
// import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
// import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
// import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

import '@modules/customers/providers';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';
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
