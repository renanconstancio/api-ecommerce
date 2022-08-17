import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateCustomersUseCases from '@modules/customers/useCases/UpdateCustomers/UpdateCustomersUseCases';

export default class UpdateCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, birth_date, cnpj, cpf, phone } = request.body;
    const { id } = request.params;

    const useCases = container.resolve(UpdateCustomersUseCases);

    const customer = await useCases.execute({
      id,
      name,
      email,
      birth_date,
      cnpj,
      cpf,
      phone,
    });

    return response.json(customer);
  }
}
