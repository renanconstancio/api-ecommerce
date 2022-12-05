import multer from 'multer';
import { Router } from 'express';
import resizeImages from '../middlewares/resizeImage';
import PatchProductImageController from '@modules/productsImages/useCases/patchProductImage/patchProductImageController';
import DeleteProductImageController from '@modules/productsImages/useCases/deleteProductImage/DeleteProductImageController';

const productsImagesRouter = Router();

const uploadMulter = multer({ storage: multer.memoryStorage() });

productsImagesRouter
  .patch(
    '/',
    uploadMulter.array('photos', 20),
    resizeImages,
    new PatchProductImageController().handle,
  )
  .delete('/:id', new DeleteProductImageController().handle);
// .get('/:product_id/skus/:id', new FindProductSkuController().handle);

export default productsImagesRouter;
