import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import StoresController from '../controllers/StoresController';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter
  .post(
    '/',
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
        fantasy_name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        opening_hours: Joi.string().allow('').optional(),
        address: Joi.string().required(),
        number: Joi.string().max(4).required(),
        district: Joi.string().required(),
        complement: Joi.string().allow('').optional(),
        city: Joi.string().required(),
        state: Joi.string().max(2).required(),
        zip_code: Joi.string().required(),
        visible: Joi.boolean().default(0).optional(),
      },
    }),
    storesController.create,
  )
  .put(
    '/:id',
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().required(),
        fantasy_name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        opening_hours: Joi.string().allow('').optional(),
        address: Joi.string().required(),
        number: Joi.string().required(),
        district: Joi.string().required(),
        complement: Joi.string().allow('').optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip_code: Joi.string().required(),
        visible: Joi.string().allow('').optional().default(0),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    storesController.update,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    storesController.delete,
  )
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    storesController.show,
  )
  .get('/', storesController.index);

export default storesRouter;
