import { Router } from 'express';

import productsRouter from '@shared/infra/http/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
