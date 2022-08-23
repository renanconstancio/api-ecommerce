import { inject, injectable } from 'tsyringe';
import { sign, Secret } from 'jsonwebtoken';
import { ICreateSession } from '@modules/customers/dtos/ICreateSession';
import { ICustomersHashRepository } from '@modules/customers/repositories/ICustomersHashRepository';
import { ICustomerAuthenticated } from '@modules/customers/dtos/ICustomerAuthenticated';
import { ICustomersRepository } from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

@injectable()
export default class CreateSessionsCustomersUseCases {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('CustomersHashRepository')
    private customerssHashRepository: ICustomersHashRepository,
  ) {}

  async execute({
    email,
    password,
  }: ICreateSession): Promise<ICustomerAuthenticated> {
    const customers = await this.customersRepository.findByEmail(email);

    if (!customers) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!customers?.password) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await this.customerssHashRepository.compareHash(
      password,
      customers.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: customers.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const { avatar, birth_date, cnpj, cpf, id, name, phone } = customers;
    return {
      customer: {
        id,
        email,
        name,
        cnpj,
        cpf,
        phone,
        birth_date,
        avatar,
      },
      token,
    };
  }
}
