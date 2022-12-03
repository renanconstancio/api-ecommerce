import { Router } from 'express';
import DeleteProductsController from '@modules/products/useCases/deleteProducts/deleteProductController';
import FindProductsController from '@modules/products/useCases/findProduct/findProductController';
import FindAllProductsController from '@modules/products/useCases/findAllProduct/findAllProductController';
import PatchProductController from '@modules/products/useCases/patchProduct/patchProductController';

const productsRouter = Router();

productsRouter
  .post('/', new PatchProductController().handle)
  .put('/:id', new PatchProductController().handle)
  .patch('/', new PatchProductController().handle)
  .delete('/:id', new DeleteProductsController().handle)
  .get('/:id', new FindProductsController().handle)
  .get('/', new FindAllProductsController().handle);

export default productsRouter;
