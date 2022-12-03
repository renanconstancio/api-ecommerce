import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindProductSkuUseCase from '@modules/productsSkus/useCases/findProductSku/findProductSkuUseCase';

export default class FindProductSkuController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const useCase = await container
      .resolve(FindProductSkuUseCase)
      .execute(product_id, id);

    return response.json(useCase);
  }
}
