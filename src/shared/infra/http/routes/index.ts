import { Router } from 'express';

import storesRoutes from '@modules/stores/infra/http/routes/stores.routes';
import categoriesRoutes from '@modules/categories/infra/http/routes/category.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import sessionsRouter from '@modules/customers/infra/http/routes/sessions.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/stores', storesRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/products', productsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/customers', customersRouter);

export default routes;
