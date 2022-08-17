import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindCategoriesUseCases from '@modules/categories/useCases/FindCategories/FindCategoriesUseCases';

export default class FindCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindCategoriesUseCases);

    const category = await useCase.execute({ id });

    return response.json(category);
  }
}
