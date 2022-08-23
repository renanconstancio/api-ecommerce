import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindAllAdressesUseCases from '@modules/adresses/useCases/FindAllAdresses/FindAllAdressesUseCases';

export default class FindAllAdressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const customers_id = request.params.customers_id
      ? String(request.params.customers_id)
      : '';

    const useCases = container.resolve(FindAllAdressesUseCases);
    const adresses = await useCases.execute({ page, limit, customers_id });

    return response.json(adresses);
  }
}
