import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserUseCase from './UpdateUserUseCase';

export default class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, email, password, first_name, last_name, phone } =
      request.body;
    const { id } = request.params;
    const { id: idUser } = request.user;

    const useCases = await container.resolve(UpdateUserUseCase).execute(
      {
        id,
        type,
        email,
        password,
        first_name,
        last_name,
        phone,
      },
      idUser,
    );

    return response.json(useCases);
  }
}
