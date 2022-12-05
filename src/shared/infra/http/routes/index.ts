import { Router } from 'express';

import productsRouter from '@shared/infra/http/routes/products.routes';
import productsSkusRouter from '@shared/infra/http/routes/productsSkus.routes';
import productsImagesRouter from './productsImages.route';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/products', productsRouter, productsSkusRouter);
routes.use('/uploads-images', productsImagesRouter);
routes.use('/users', usersRoutes);

export default routes;
