import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCustomersUseCases from '@modules/customers/useCases/CreateCutomers/CreateCustomersUseCases';

export default class CreateCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, cnpj, cpf, password, phone, birth_date } =
      request.body;

    const useCases = container.resolve(CreateCustomersUseCases);

    const customer = await useCases.execute({
      name,
      email,
      cnpj,
      cpf,
      password,
      phone,
      birth_date,
    });

    return response.json(customer);
  }
}
