import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteUserUseCase from './deleteUserUseCase';

export default class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: idUser } = request.user;

    const useCase = await container
      .resolve(DeleteUserUseCase)
      .execute(id, idUser);

    return response.status(204).json(useCase);
  }
}
