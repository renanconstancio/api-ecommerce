import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteProductsSkusUseCases from '@modules/products/useCases/DeleteProductsSkus/DeleteProductsSkusUseCases';

export default class DeleteProductsSkusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const deleteProductSku = container.resolve(DeleteProductsSkusUseCases);

    await deleteProductSku.execute({ product_id, id });

    return response.json([]);
  }
}
