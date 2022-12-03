import { Router } from 'express';

import PatchProductSkuController from '@modules/productsSkus/useCases/patchProductSku/patchProductSkuController';
import DeleteProductSkuController from '@modules/productsSkus/useCases/deleteProductSku/deleteProductSkuController';
import FindProductSkuController from '@modules/productsSkus/useCases/findProductSku/findProductSkuController';

const productsSkusRouter = Router();

productsSkusRouter
  .post('/:product_id/skus', new PatchProductSkuController().handle)
  .put('/:product_id/skus/:id', new PatchProductSkuController().handle)
  .patch('/:product_id/skus', new PatchProductSkuController().handle)
  .delete('/:product_id/skus/:id', new DeleteProductSkuController().handle)
  .get('/:product_id/skus/:id', new FindProductSkuController().handle);

export default productsSkusRouter;
