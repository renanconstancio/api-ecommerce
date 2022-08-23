import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAdressesUseCases from '@modules/adresses/useCases/CreateAdresses/CreateAdressesUseCases';

export default class CreateAdressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customers_id } = request.params;
    const {
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

    const useCases = container.resolve(CreateAdressesUseCases);

    const customer = await useCases.execute({
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
