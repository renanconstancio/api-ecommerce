import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllProductUseCase from '@modules/products/useCases/findAllProduct/findAllProductUseCase';

export default class FindAllProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 20;

    const { order, search } = (request.query ? request.query : '') as {
      [key: string]: '';
    };

    const useCases = container.resolve(FindAllProductUseCase);
    const products = await useCases.execute({ page, limit, order, search });

    return response.json(products);
  }
}
