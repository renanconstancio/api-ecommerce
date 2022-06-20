import { container, delay } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
// import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
// import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
// import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
// import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
// import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
// import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

import '@modules/customers/providers';

import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  delay(() => CategoriesRepository),
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  delay(() => CustomersRepository),
);

// container.registerSingleton<IProductsRepository>(
//   'ProductsRepository',
//   ProductsRepository,
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
