import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter
  .post(
    '/',
    celebrate(
      {
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).max(12).required(),
          phone: Joi.string().required(),
          cpf: Joi.string().allow('').optional(),
          cnpj: Joi.string().allow('').optional(),
          birth_date: Joi.string().allow('').optional(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    customersController.create,
  )
  .put(
    '/:id',
    celebrate(
      {
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          phone: Joi.string().required(),
          cpf: Joi.string().allow('').optional(),
          cnpj: Joi.string().allow('').optional(),
          birth_date: Joi.string().allow('').optional(),
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
    isAuthenticated,
    customersController.update,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    isAuthenticated,
    customersController.delete,
  )
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    customersController.show,
  )
  .get('/', customersController.index);

export default customersRouter;
