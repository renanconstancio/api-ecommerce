import multer from 'multer';
import { Router } from 'express';
import PatchProductImageController from '@modules/productsImages/useCases/patchProductImage/patchProductImageController';
import resizeImages from '../middlewares/resizeImage';

const productsImagesRouter = Router();

const uploadMulter = multer({ storage: multer.memoryStorage() });

productsImagesRouter.patch(
  '/',
  uploadMulter.array('photos', 20),
  resizeImages,
  new PatchProductImageController().handle,
);
// .get('/:product_id/skus/:id', new FindProductSkuController().handle);

export default productsImagesRouter;
