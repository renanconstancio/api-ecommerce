import { container } from 'tsyringe';
import { Request, Response } from 'express';
import PatchUserUseCase from './patchUserUseCase';

export default class PatchUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, type, email, password, first_name, last_name, phone } =
      request.body;

    const useCases = await container.resolve(PatchUserUseCase).execute({
      id,
      type,
      email,
      password,
      first_name,
      last_name,
      phone,
    });

    return response.status(id ? 200 : 201).json(useCases);
  }
}
