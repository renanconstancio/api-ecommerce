import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteProductsUseCases from '@modules/products/useCases/DeleteProducts/DeleteProductsUseCases';

export default class DeleteProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductsUseCases);

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
