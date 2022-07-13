import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter
  .post(
    '/',
    celebrate(
      {
        [Segments.BODY]: {
          sku: Joi.string().required(),
          name: Joi.string().required(),
          price: Joi.number().precision(2).required(),
          quantity: Joi.number().required(),
          description: Joi.string().allow('').default(''),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    productsController.create,
  )
  .put(
    '/:id',
    celebrate(
      {
        [Segments.BODY]: {
          sku: Joi.string().required(),
          name: Joi.string().required(),
          price: Joi.number().precision(2).required(),
          quantity: Joi.number().required(),
          description: Joi.string().allow('').default(''),
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
    productsController.update,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.delete,
  )
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.show,
  )
  .get('/', productsController.index);

export default productsRouter;
