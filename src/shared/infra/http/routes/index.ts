import { Router } from 'express';

import categoriesRoutes from '@shared/infra/http/routes/category.routes';
import storesRoutes from '@modules/stores/infra/http/routes/stores.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import sessionsRouter from '@modules/customers/infra/http/routes/sessions.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productsSkusRouter from '@modules/products/infra/http/routes/products.skus.routes';
import productsImagesRouter from '@modules/products/infra/http/routes/products.images.routes';

const routes = Router();

routes.use('/stores', storesRoutes);
routes.use('/categories', categoriesRoutes);
routes.use(
  '/products',
  productsRouter,
  productsSkusRouter,
  productsImagesRouter,
);
routes.use('/sessions', sessionsRouter);
routes.use('/customers', customersRouter);

export default routes;
