import { inject, injectable } from 'tsyringe';
import { sign, Secret } from 'jsonwebtoken';
import { ICreateSession } from '@modules/customers/domain/dtos/ICreateSession';
import { IHashProvider } from '@modules/customers/providers/HashProvider/dtos/IHashPovider';
import { ICustomerAuthenticated } from '@modules/customers/domain/dtos/ICustomerAuthenticated';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    password,
  }: ICreateSession): Promise<ICustomerAuthenticated> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      customer.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: customer.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      customer,
      token,
    };
  }
}
