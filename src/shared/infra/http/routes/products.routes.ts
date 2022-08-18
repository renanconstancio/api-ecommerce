import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import CreateProductsController from '@modules/products/useCases/CreateProducts/CreateProductsController';
import UpdateProductsController from '@modules/products/useCases/UpdateProducts/UpdateProductsController';
import DeleteProductsController from '@modules/products/useCases/DeleteProducts/DeleteProductsController';
import FindProductsController from '@modules/products/useCases/FindProducts/FindProductsController';
import FindAllProductsController from '@modules/products/useCases/FindAllProducts/FindAllProductsController';

const productsRouter = Router();

productsRouter
  .post(
    '/',
    celebrate(
      {
        [Segments.BODY]: {
          name: Joi.string().required(),
          keywords: Joi.string().allow('').optional(),
          description: Joi.string().allow('').optional(),
          description_text: Joi.string().allow('').optional(),
          visible: Joi.string().allow('').default('invisible'),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new CreateProductsController().handle,
  )
  .put(
    '/:id',
    celebrate(
      {
        [Segments.BODY]: {
          name: Joi.string().required(),
          keywords: Joi.string().allow('').optional(),
          description: Joi.string().allow('').optional(),
          description_text: Joi.string().allow('').optional(),
          visible: Joi.string().allow('').default('invisible'),
        },
        [Segments.PARAMS]: {
          id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new UpdateProductsController().handle,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    new DeleteProductsController().handle,
  )
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    new FindProductsController().handle,
  )
  .get('/', new FindAllProductsController().handle);

export default productsRouter;
