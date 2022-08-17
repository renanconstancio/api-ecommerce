import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllCustomersUseCases from '@modules/customers/useCases/FindAllCustomers/FindAllCustomersUseCases';

export default class FindAllCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const useCases = container.resolve(FindAllCustomersUseCases);
    const customers = await useCases.execute({ page, limit });

    return response.json(customers);
  }
}
