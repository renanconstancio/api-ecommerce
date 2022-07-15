import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import ProductsImagesController from '../controllers/ProductsImagesController';
import uploadConfig from '@config/upload';
import multer from 'multer';

const productsImagesRouter = Router();
const productsImagesController = new ProductsImagesController();

const upload = multer(uploadConfig.multer);

productsImagesRouter.patch(
  '/images',
  upload.single('image'),
  celebrate(
    {
      [Segments.BODY]: {
        id: Joi.string().uuid().allow(''),
        product_sku_id: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
      messages: messages,
    },
  ),
  productsImagesController.update,
);

export default productsImagesRouter;
