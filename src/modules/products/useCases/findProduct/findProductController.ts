import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindProductUseCase from './findProductUseCase';

export default class FindProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindProductUseCase);
    const product = await useCase.execute(id);

    return response.json(product);
  }
}
