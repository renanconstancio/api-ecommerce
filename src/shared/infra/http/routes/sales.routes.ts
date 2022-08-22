import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
// import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import FindAllSalesController from '@modules/sales/useCases/FindAllSales/FindAllSalesController';
import CreateSalesController from '@modules/sales/useCases/CreateSales/CreateSalesController';

const salesRouter = Router();

// salesRouter.use(isAuthenticated);

salesRouter
  .post(
    '/',
    // celebrate({
    //   [Segments.BODY]: {
    //     // customers_id: Joi.string().uuid().required(),
    //     // products: Joi.required(),
    //   },
    // }),
    new CreateSalesController().handle,
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
