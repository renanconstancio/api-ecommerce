import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateSalesUseCases from './CreateSalesUseCases';

export default class CreateSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customers_id, address_id, products, transations } = request.body;

    const useCases = container.resolve(CreateSalesUseCases);

    const sale = await useCases.execute({
      customers_id,
      address_id,
      products,
      transations,
    });

    return response.json(sale);
  }
}
