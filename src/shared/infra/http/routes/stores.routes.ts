import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { celebrate, Joi, Segments } from 'celebrate';
import CreateStoresController from '@modules/stores/useCases/CreateStores/CreateStoresController';
import UpdateStoresController from '@modules/stores/useCases/UpdateStores/UpdateStoresController';
import DeleteStoresController from '@modules/stores/useCases/DeleteStores/DeleteStoresController';
import FindAllStoresController from '@modules/stores/useCases/FindAllStores/FindAllStoresController';
import FindStoresController from '@modules/stores/useCases/FindStores/FindStoresController';

const storesRouter = Router();

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
    new CreateStoresController().handle,
  )
  .put(
    '/:id',
    celebrate(
      {
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
          visible: Joi.boolean().default(0).optional(),
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
    new UpdateStoresController().handle,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    new DeleteStoresController().handle,
  )
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    new FindStoresController().handle,
  )
  .get('/', new FindAllStoresController().handle);

export default storesRouter;
