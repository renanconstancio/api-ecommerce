import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindProductsUseCases from '@modules/products/useCases/FindProducts/FindProductsUseCases';

export default class FindProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(FindProductsUseCases);
    const product = await showProduct.execute({ id });

    return response.json(product);
  }
}
