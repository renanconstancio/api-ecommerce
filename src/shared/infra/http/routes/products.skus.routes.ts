import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import CreateProductsSkusController from '@modules/products/useCases/CreateProductsSkus/CreateProductsSkusController';
import UpdateProductsSkusController from '@modules/products/useCases/UpdateProductsSkus/UpdateProductsSkusController';
import DeleteProductsSkusController from '@modules/products/useCases/DeleteProductsSkus/DeleteProductsSkusController';
import FindProductsSkusController from '@modules/products/useCases/FindProductsSkus/FindProductsSkusController';

const productsSkusRouter = Router();

productsSkusRouter
  .post(
    '/:product_id/skus',
    celebrate(
      {
        [Segments.BODY]: {
          sku: Joi.string().required(),
          sale_price: Joi.number().precision(2).required(),
          cost_price: Joi.number().precision(2).required(),
          price: Joi.number().precision(2).required(),
          quantity: Joi.number().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new CreateProductsSkusController().handle,
  )
  .put(
    '/:product_id/skus/:id',
    celebrate(
      {
        [Segments.BODY]: {
          sku: Joi.string().required(),
          sale_price: Joi.number().precision(2).required(),
          cost_price: Joi.number().precision(2).required(),
          price: Joi.number().precision(2).required(),
          quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: {
          product_id: Joi.string().uuid().required(),
          id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new UpdateProductsSkusController().handle,
  )
  .delete(
    '/:product_id/skus/:id',
    celebrate(
      {
        [Segments.PARAMS]: {
          product_id: Joi.string().uuid().required(),
          id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new DeleteProductsSkusController().handle,
  )
  .get(
    '/:product_id/skus/:id',
    celebrate(
      {
        [Segments.PARAMS]: {
          product_id: Joi.string().uuid().required(),
          id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new DeleteProductsSkusController().handle,
  )
  .get(
    '/:product_id/skus',
    celebrate(
      {
        [Segments.PARAMS]: {
          product_id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new FindProductsSkusController().handle,
  );

export default productsSkusRouter;
