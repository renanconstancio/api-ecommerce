import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteProductSkuUseCase from '@modules/productsSkus/useCases/deleteProductSku/deleteProductSkuUseCase';

export default class DeleteProductSkuController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductSku = container.resolve(DeleteProductSkuUseCase);

    await deleteProductSku.execute(id);

    return response.status(204).json([]);
  }
}
