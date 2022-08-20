import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllSalesUseCases from './FindAllSalesUseCases';

export default class FindAllSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 10;
    const useCases = container.resolve(FindAllSalesUseCases);

    const orders = await useCases.execute({ page, limit });

    return response.json(orders);
  }
}
