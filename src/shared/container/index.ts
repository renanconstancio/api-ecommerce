import { container, delay } from 'tsyringe';

import { IBcryptHashProvider } from './providers/hashProvider/interfaces/IBcryptHashProvider';
import BcryptHashProvider from './providers/hashProvider/implementations/bcryptHashProvider';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import ProductRepository from '@modules/products/infra/prisma/repositories/productRepository';
import { IProductSkuRepository } from '@modules/productsSkus/infra/interfaces/IProductSkuRepository';
import ProductSkuRepository from '@modules/productsSkus/infra/prisma/respositories/productSkuRepository';
import { IProductImageRepository } from '@modules/productsImages/infra/interfaces/IProductImageRepository';
import ProductImageRepository from '@modules/productsImages/infra/prisma/repositories/productImageRepository';
import { IUserRepository } from '@modules/users/infra/interfaces/IUserRepository';
import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';

container.registerSingleton<IBcryptHashProvider>(
  'BcryptHashProvider',
  delay(() => BcryptHashProvider),
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  delay(() => UserRepository),
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  delay(() => ProductRepository),
);

container.registerSingleton<IProductImageRepository>(
  'ProductImageRepository',
  delay(() => ProductImageRepository),
);

container.registerSingleton<IProductSkuRepository>(
  'ProductSkuRepository',
  delay(() => ProductSkuRepository),
);
