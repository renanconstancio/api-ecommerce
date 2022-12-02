import { container, delay } from 'tsyringe';

import CustomersRepository from '@modules/customers/infra/prisma/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';

import CategoriesRepository from '@modules/categories/infra/prisma/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

import StoresRepository from '@modules/stores/infra/prisma/repositories/StoresRepository';
import { IStoresRepository } from '@modules/stores/repositories/IStoresRepository';

import ProductsRepository from '@modules/products/infra/prisma/repositories/productRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';

import ProductsSkusRepository from '@modules/products/infra/prisma/repositories/ProductsSkusRepository';
import { IProductsSkusRepository } from '@modules/products/repositories/IProductsSkusRepository';

import { IProductsImagesRepository } from '@modules/products/repositories/IProductsImagesRepository';
import ProductsImagesRepository from '@modules/products/infra/prisma/repositories/productsImageRepository';

import CustomersHashRepository from '@modules/customers/infra/prisma/repositories/CustomersHashRepository';
import { ICustomersHashRepository } from '@modules/customers/repositories/ICustomersHashRepository';

import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import SalesRepository from '@modules/sales/infra/prisma/repositories/SalesRepository';

import { ISalesAddressesRepository } from '@modules/sales/repositories/ISalesAddressesRepository';
import SalesAddessesRepository from '@modules/sales/infra/prisma/repositories/SalesAddessesRepository';

import { ISalesProductsRepository } from '@modules/sales/repositories/ISalesProductsRepository';
import SalesProductsRepository from '@modules/sales/infra/prisma/repositories/SalesProductsRepository';

import SalesStatusRepository from '@modules/sales/infra/prisma/repositories/SalesStatusRepository';
import { ISalesStatusRepository } from '@modules/sales/repositories/ISalesStatusRepository';

import { IAdressesRepository } from '@modules/addresses/repositories/IAdressesRepository';
import AdressesRepository from '@modules/addresses/infra/prisma/repositories/AdressesRepository';

import { IResizeImage } from './providers/ResizeImage/dtos/IResizeImage';
import ResizeImage from './providers/ResizeImage/ResizeImage';

container.registerSingleton<IResizeImage>('ResizeImage', ResizeImage);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  delay(() => CategoriesRepository),
);

container.registerSingleton<ICustomersHashRepository>(
  'CustomersHashRepository',
  delay(() => CustomersHashRepository),
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  delay(() => CustomersRepository),
);

container.registerSingleton<IAdressesRepository>(
  'AdressesRepository',
  delay(() => AdressesRepository),
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

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  delay(() => SalesRepository),
);

container.registerSingleton<ISalesAddressesRepository>(
  'SalesAddressesRepository',
  delay(() => SalesAddessesRepository),
);

container.registerSingleton<ISalesStatusRepository>(
  'SalesStatusRepository',
  delay(() => SalesStatusRepository),
);

container.registerSingleton<ISalesProductsRepository>(
  'SalesProductsRepository',
  delay(() => SalesProductsRepository),
);
