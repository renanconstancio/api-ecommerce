import { container } from 'tsyringe';
import { Request, Response } from 'express';
import PatchProductImageUseCase from './patchProductImageUseCase';

export default class PatchProductImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_sku_id } = request.body;
    const { photos } = request.body;

    const useCases = container.resolve(PatchProductImageUseCase);
    const image = await useCases.execute({
      product_sku_id,
      photos,
    });

    return response.status(201).json(image);
  }
}
