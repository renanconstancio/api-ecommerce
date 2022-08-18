import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindProductsSkusUseCases from '@modules/products/useCases/FindProductsSkus/FindProductsSkusUseCases';

export default class FindProductsSkusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const useCases = container.resolve(FindProductsSkusUseCases);

    const product = await useCases.execute({ id, product_id });

    return response.json(product);
  }
}
