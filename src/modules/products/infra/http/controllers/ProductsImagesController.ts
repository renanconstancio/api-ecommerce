import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateProductsImagesService from '@modules/products/services/UpdateProductsImagesService';

export default class ProductsImagesController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id, product_sku_id } = request.body;
    const { filename } = request.file;

    const imageProduct = container.resolve(UpdateProductsImagesService);
    const image = await imageProduct.execute({
      id,
      product_sku_id,
      imageFilename: filename,
    });

    return response.json(classToClass(image));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;

    // const deleteProductSku = container.resolve(DeleteProductSkuService);

    // await deleteProductSku.execute({ id });

    return response.json([]);
  }
}
