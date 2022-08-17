import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCategoriesUseCases from '@modules/categories/useCases/CreateCategories/CreateCategoriesUseCases';

export default class CreateCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const useCase = container.resolve(CreateCategoriesUseCases);

    const result = await useCase.execute(data);

    return response.status(200).json(result);
  }
}
