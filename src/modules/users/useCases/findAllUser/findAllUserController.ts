import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllUserUseCase from './findAllUserUseCase';

export default class FindAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const { search, order } = (request.query ? request.query : null) as any;

    const useCases = await container.resolve(FindAllUserUseCase).execute();

    return response.json(useCases);
  }
}
