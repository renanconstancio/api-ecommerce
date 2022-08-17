import 'express-async-errors';
import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { celebrate, Joi, Segments } from 'celebrate';
import CreateCategoriesController from '@modules/categories/useCases/CreateCategories/CreateCategoriesController';
import FindAllCategoriesController from '@modules/categories/useCases/FindAllCategories/FindAllCategoriesController';
import FindCategoriesController from '@modules/categories/useCases/FindCategories/FindCategoriesController';
import UpdateCategoriesController from '@modules/categories/useCases/UpdateCategories/UpdateCategoriesController';
import DeleteCategoriesControllers from '@modules/categories/useCases/DeleteCategories/DeleteCategoriesControllers';

const categoryRouter = Router();

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
    new CreateCategoriesController().handle,
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
    new UpdateCategoriesController().handle,
  )
  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    new DeleteCategoriesControllers().handle,
  )
  .get('/:id', new FindCategoriesController().handle)
  .get('/', new FindAllCategoriesController().handle);

export default categoryRouter;
