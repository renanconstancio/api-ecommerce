import { Router } from 'express';
import { messages } from 'joi-translation-pt-br';
import { celebrate, Joi, Segments } from 'celebrate';
import UpdateProductsImagesController from '@modules/products/useCases/UpdateProductsImages/UpdateProductsImagesController';
import uploadConfig from '@config/upload';
import multer from 'multer';

const productsImagesRouter = Router();

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
  new UpdateProductsImagesController().handle,
);

export default productsImagesRouter;
