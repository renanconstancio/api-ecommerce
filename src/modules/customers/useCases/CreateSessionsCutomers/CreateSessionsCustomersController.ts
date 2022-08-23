import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateSessionsCustomersUseCases from '@modules/customers/useCases/CreateSessionsCutomers/CreateSessionsCustomersUseCases';

export default class CreateSessionsCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const useCases = container.resolve(CreateSessionsCustomersUseCases);

    const customer = await useCases.execute({
      email,
      password,
    });

    return response.json(customer);
  }
}
