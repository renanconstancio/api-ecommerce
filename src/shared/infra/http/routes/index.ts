import { Router } from 'express';

import categoriesRoutes from '@shared/infra/http/routes/category.routes';
import storesRoutes from '@shared/infra/http/routes/stores.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import customersRouter from '@shared/infra/http/routes/customers.routes';
import productsRouter from '@shared/infra/http/routes/products.routes';
import productsSkusRouter from '@shared/infra/http/routes/products.skus.routes';
import productsImagesRouter from '@shared/infra/http/routes/products.images.routes';

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
