import { Router } from 'express';

import productsRouter from '@shared/infra/http/routes/products.routes';
import productsSkusRouter from '@shared/infra/http/routes/productsSkus.routes';
import productsImagesRouter from './productsImages.route';

const routes = Router();

routes.use('/products', productsRouter, productsSkusRouter);
routes.use('/uploads-images', productsImagesRouter);

export default routes;
