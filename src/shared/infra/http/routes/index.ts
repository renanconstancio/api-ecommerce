import { Router } from 'express';

import productsRouter from '@shared/infra/http/routes/products.routes';
import productsSkusRouter from '@shared/infra/http/routes/productsSkus.routes';

const routes = Router();

routes.use('/products', productsRouter, productsSkusRouter);

export default routes;
