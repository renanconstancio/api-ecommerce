import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import ProductsSkusController from '../controllers/ProductsSkusController';

const productsSkusRouter = Router();
const productsSkuController = new ProductsSkusController();

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
    productsSkuController.create,
  )
  .put(
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
        [Segments.PARAMS]: {
          id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    productsSkuController.update,
  )
  .delete(
    '/:product_id/skus/:id',
    celebrate(
      {
        [Segments.PARAMS]: {
          id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    productsSkuController.delete,
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
    productsSkuController.show,
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
    productsSkuController.index,
  );

export default productsSkusRouter;
