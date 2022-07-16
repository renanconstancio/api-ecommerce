import ProductsController from '../controllers/ProductsController';
import { Router } from 'express';
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
    productsController.create,
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
