import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserUseCase from './loginUserUseCase';

export default class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const useCases = await container.resolve(CreateUserUseCase).execute({
      email,
      password,
    });

    return response.status(201).json(useCases);
  }
}
