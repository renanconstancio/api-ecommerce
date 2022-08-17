import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import CreateCustomersController from '@modules/customers/useCases/CreateCutomers/CreateCustomersController';
import UpdateCustomersController from '@modules/customers/useCases/UpdateCustomers/UpdateCustomersController';
import DeleteCustomersController from '@modules/customers/useCases/DeleteCustomers/DeleteCustomersController';
import FindCustomersController from '@modules/customers/useCases/FindCustomers/FindCustomersController';
import FindAllCustomersController from '@modules/customers/useCases/FindAllCustomers/FindAllCustomersController';

const customersRouter = Router();

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
    new CreateCustomersController().handle,
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
    new UpdateCustomersController().handle,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    isAuthenticated,
    new DeleteCustomersController().handle,
  )
  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    new FindCustomersController().handle,
  )
  .get('/', new FindAllCustomersController().handle);

export default customersRouter;
