import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateSalesUseCases from './CreateSalesUseCases';

export default class CreateSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id, products_skus_id } = request.body;

    const createOrder = container.resolve(CreateSalesUseCases);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
