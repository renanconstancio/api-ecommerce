import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindCustomersUseCases from '@modules/customers/useCases/FindCustomers/FindCustomersUseCases';

export default class FindCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCases = container.resolve(FindCustomersUseCases);
    const customers = await useCases.execute({ id });

    return response.json(customers);
  }
}
