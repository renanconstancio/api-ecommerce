import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateProductsImagesUseCases from '@modules/products/useCases/UpdateProductsImages/UpdateProductsImagesUseCases';

export default class UpdateProductsImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, product_sku_id } = request.body;
    const { filename } = request.file as { filename: string };

    const useCases = container.resolve(UpdateProductsImagesUseCases);
    const image = await useCases.execute({
      id,
      product_sku_id,
      imageFilename: filename,
    });

    return response.json(image);
  }
}
