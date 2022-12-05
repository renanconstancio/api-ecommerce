import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindUserUseCase from './findUserUseCase';

export default class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = await container.resolve(FindUserUseCase).execute(id);

    return response.json(useCase);
  }
}
