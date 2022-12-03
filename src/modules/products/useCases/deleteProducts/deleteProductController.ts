import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteProductUseCase from '@modules/products/useCases/deleteProducts/deleteProductUseCase';

export default class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductUseCase);

    await deleteProduct.execute(id);

    return response.status(204).json([]);
  }
}
