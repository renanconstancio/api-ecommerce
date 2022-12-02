import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateAdressesUseCases from '@modules/addresses/useCases/UpdateAdresses/UpdateAdressesUseCases';

export default class UpdateAdressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customers_id,
      recipient,
      address,
      number,
      district,
      complement,
      reference,
      city,
      state,
      zip_code,
      for_sales = 'no',
    } = request.body;
    const { id } = request.params;

    const useCases = container.resolve(UpdateAdressesUseCases);

    const customer = await useCases.execute({
      id,
      customers_id,
      recipient,
      address,
      number,
      district,
      complement,
      reference,
      city,
      state,
      zip_code,
      for_sales,
    });

    return response.json(customer);
  }
}
