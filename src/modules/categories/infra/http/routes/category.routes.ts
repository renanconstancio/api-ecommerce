import 'express-async-errors';
import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { CategoriesController } from '../controllers/CategoriesController';
import { celebrate, Joi, Segments } from 'celebrate';

const categoryRouter = Router();
const categoryController = new CategoriesController();

categoryRouter
  .post(
    '/',
    celebrate(
      {
        [Segments.BODY]: {
          category_id: Joi.string(),
          name: Joi.string().min(6).max(55).required(),
          keywords: Joi.string().allow(''),
          description: Joi.string().allow(''),
          position: Joi.number().allow(0),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    categoryController.create,
  )
  .put(
    '/:id',
    celebrate(
      {
        [Segments.PARAMS]: {
          id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
          category_id: Joi.string(),
          name: Joi.string().min(6).max(55).required(),
          keywords: Joi.string().allow(''),
          description: Joi.string().allow(''),
          position: Joi.number().allow(0),
        },
      },
      {
        abortEarly: false,
        messages: messages,
      },
    ),
    categoryController.update,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    categoryController.delete,
  )
  .get('/:id', categoryController.show)
  .get('/', categoryController.index);

export default categoryRouter;
