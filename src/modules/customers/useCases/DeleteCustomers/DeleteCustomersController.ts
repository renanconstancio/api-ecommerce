import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteCustomersUseCases from '@modules/customers/useCases/DeleteCustomers/DeleteCustomersUseCases';

export default class DeleteCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCases = container.resolve(DeleteCustomersUseCases);

    await useCases.execute({ id });

    return response.json([]);
  }
}
