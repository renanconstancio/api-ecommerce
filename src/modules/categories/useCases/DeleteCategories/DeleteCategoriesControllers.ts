import { container } from 'tsyringe';
import { Request, Response } from 'express';
import DeleteCategoriesUseCases from '@modules/categories/useCases/DeleteCategories/DeleteCategoriesUseCases';

export default class DeleteCategoriesControllers {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCases = container.resolve(DeleteCategoriesUseCases);

    await useCases.execute({ id });

    return response.json([]);
  }
}
