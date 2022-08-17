import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateSessionsService from '@modules/customers/services/CreateSessionsService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsService);

    const customer = await createSession.execute({
      email,
      password,
    });

    return response.json(customer);
  }
}
