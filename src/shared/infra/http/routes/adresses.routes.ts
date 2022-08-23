import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { celebrate, Joi, Segments } from 'celebrate';
// import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import CreateAdressesController from '@modules/adresses/useCases/CreateAdresses/CreateAdressesController';
import FindAllAdressesController from '@modules/adresses/useCases/FindAllAdresses/FindAllAdressesController';
// import UpdateAdressesController from '@modules/adresses/useCases/UpdateAdresses/UpdateAdressesController';
// import DeleteAdressesController from '@modules/adresses/useCases/DeleteAdresses/DeleteAdressesController';
// import FindAdressesController from '@modules/adresses/useCases/FindAdresses/FindAdressesController';
// import FindAllAdressesController from '@modules/adresses/useCases/FindAllAdresses/FindAllAdressesController';

const adressesRouter = Router();

adressesRouter
  .post(
    '/:customers_id/adresses',
    celebrate(
      {
        [Segments.BODY]: {
          // customers_id: Joi.string().uuid().required(),
          recipient: Joi.string().required(),
          address: Joi.string().required(),
          number: Joi.string().required(),
          district: Joi.string().required(),
          complement: Joi.string().allow('').optional(),
          reference: Joi.string().allow('').optional(),
          city: Joi.string().required(),
          state: Joi.string().max(2).required(),
          zip_code: Joi.string().required(),
          for_sales: Joi.string().required(),
        },
        [Segments.PARAMS]: {
          customers_id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new CreateAdressesController().handle,
  )
  // .put(
  //   '/:id',
  //   celebrate(
  //     {
  //       [Segments.BODY]: {
  //         name: Joi.string().required(),
  //         email: Joi.string().email().required(),
  //         phone: Joi.string().required(),
  //         cpf: Joi.string().allow('').optional(),
  //         cnpj: Joi.string().allow('').optional(),
  //         birth_date: Joi.string().allow('').optional(),
  //       },
  //       [Segments.PARAMS]: {
  //         id: Joi.string().uuid().required(),
  //       },
  //     },
  //     {
  //       abortEarly: false,
  //       messages: messages,
  //     },
  //   ),
  //   isAuthenticated,
  //   new UpdateAdressesController().handle,
  // )
  // .delete(
  //   '/:id',
  //   celebrate({
  //     [Segments.PARAMS]: {
  //       id: Joi.string().uuid().required(),
  //     },
  //   }),
  //   isAuthenticated,
  //   new DeleteAdressesController().handle,
  // )
  // .get(
  //   '/:id',
  //   celebrate({
  //     [Segments.PARAMS]: {
  //       id: Joi.string().uuid().required(),
  //     },
  //   }),
  //   new FindAdressesController().handle,
  // )
  .get(
    '/:customers_id/adresses',
    celebrate(
      {
        [Segments.PARAMS]: {
          customers_id: Joi.string().uuid().required(),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    new FindAllAdressesController().handle,
  );

export default adressesRouter;
