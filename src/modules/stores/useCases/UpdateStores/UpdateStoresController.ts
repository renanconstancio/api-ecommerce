import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateStoresUseCases from '@modules/stores/useCases/UpdateStores/UpdateStoresUseCases';

export default class UpdateStoresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      fantasy_name,
      email,
      phone,
      opening_hours,
      address,
      number,
      district,
      complement,
      city,
      state,
      zip_code,
      visible,
    } = request.body;
    const { id } = request.params;

    const useCases = container.resolve(UpdateStoresUseCases);

    const store = await useCases.execute({
      id,
      title,
      fantasy_name,
      email,
      phone,
      opening_hours,
      address,
      number,
      district,
      complement,
      city,
      state,
      zip_code,
      visible,
    });

    return response.json(store);
  }
}
