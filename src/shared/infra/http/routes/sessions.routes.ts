import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CreateSessionsCustomersController from '@modules/customers/useCases/CreateSessionsCutomers/CreateSessionsCustomersController';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  new CreateSessionsCustomersController().handle,
);

export default sessionsRouter;
