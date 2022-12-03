import { container } from 'tsyringe';
import { Request, Response } from 'express';
import PatchProductSkuUseCase from '@modules/productsSkus/useCases/patchProductSku/patchProductSkuUseCase';

export default class PatchProductSkuController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: idQuey, product_id: productIdQuery } = request.params;

    const {
      id: idPatch,
      product_id: productId,
      sku,
      codebar,
      price,
      cost_price,
      sale_price,
      quantity,
    } = request.body;

    const id = idQuey ? idQuey : idPatch;
    const product_id = productIdQuery ? productIdQuery : productId;

    const useCases = container.resolve(PatchProductSkuUseCase);
    const resp = await useCases.execute({
      id,
      product_id,
      sku,
      codebar,
      price,
      cost_price,
      sale_price,
      quantity,
    });

    return response.status(!id ? 201 : 200).json(resp);
  }
}
