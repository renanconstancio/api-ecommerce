import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllProductsUseCases from '@modules/products/useCases/FindAllProducts/FindAllProductsUseCases';

export default class FindAllProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const { name } = (request.query.products ? request.query.products : '') as {
      [key: string]: '';
    };

    const useCases = container.resolve(FindAllProductsUseCases);
    const products = await useCases.execute({ page, limit, name });

    return response.json(products);
  }
}
