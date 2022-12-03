import { container } from 'tsyringe';
import { Request, Response } from 'express';
import PatchProductUseCase from '@modules/products/useCases/patchProduct/patchProductUseCase';

export default class PatchProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: idQuey } = request.params;
    const {
      id: idPatch,
      name,
      keywords,
      description,
      description_text,
      visible,
    } = request.body;

    const id = idQuey ? idQuey : idPatch;

    const useCases = container.resolve(PatchProductUseCase);
    const product = await useCases.execute({
      id,
      name,
      keywords,
      description,
      description_text,
      visible,
    });

    return response.status(!id ? 201 : 200).json(product);
  }
}
