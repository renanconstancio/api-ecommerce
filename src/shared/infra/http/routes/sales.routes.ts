import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
// import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import FindAllSalesController from '@modules/sales/useCases/FindAllSales/FindAllSalesController';

const salesRouter = Router();

// salesRouter.use(isAuthenticated);

salesRouter
  .post(
    '/',
    celebrate({
      [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        products: Joi.required(),
      },
    }),
    salesController.create,
  )
  .get('/', new FindAllSalesController().handle);

// salesRouter.get(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   salesController.show,
// );

// .post(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       customer_id: Joi.string().uuid().required(),
//       products: Joi.required(),
//     },
//   }),
//   salesController.create,
// );

export default salesRouter;
