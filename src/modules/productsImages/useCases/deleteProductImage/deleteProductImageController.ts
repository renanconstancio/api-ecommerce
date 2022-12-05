import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteProductImageUseCase from './DeleteProductImageUseCase';

export default class DeleteProductImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(DeleteProductImageUseCase);

    await useCase.execute(id);

    return response.status(204).json([]);
  }
}
