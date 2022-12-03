import { container, delay } from 'tsyringe';

// import StoreRepository from '@modules/stores/infra/prisma/repositories/StoreRepository';
// import { IStoreRepository } from '@modules/stores/repositories/IStoreRepository';

import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import ProductRepository from '@modules/products/infra/prisma/repositories/productRepository';
import { IProductSkuRepository } from '@modules/productsSkus/infra/interfaces/IProductSkuRepository';
import ProductSkuRepository from '@modules/productsSkus/infra/prisma/respositories/productSkuRepository';
import { IProductImageRepository } from '@modules/productsImages/infra/interfaces/IProductImageRepository';
import ProductImageRepository from '@modules/productsImages/infra/prisma/repositories/productImageRepository';
import { IResizeImage } from './providers/resizeImage/dtos/IResizeImage';
import ResizeImage from './providers/resizeImage/resizeImage';

// import ProductSkuRepository from '@modules/products/infra/prisma/repositories/ProductSkuRepository';
// import { IProductSkuRepository } from '@modules/products/repositories/IProductSkuRepository';

// import { IProductImageRepository } from '@modules/products/repositories/IProductImageRepository';
// import ProductImageRepository from '@modules/products/infra/prisma/repositories/productsImageRepository';

// import { IResizeImage } from './providers/resizeImage/dtos/IResizeImage';
// import ResizeImage from './providers/resizeImage/ResizeImage';

container.registerSingleton<IResizeImage>(
  'ResizeImage',
  delay(() => ResizeImage),
);

// container.registerSingleton<IStoreRepository>(
//   'StoreRepository',
//   delay(() => StoreRepository),
// );

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

// container.registerSingleton<IProductSkuRepository>(
//   'ProductSkuRepository',
//   delay(() => ProductSkuRepository),
// );

// container.registerSingleton<IProductImageRepository>(
//   'ProductImageRepository',
//   delay(() => ProductImageRepository),
// );
