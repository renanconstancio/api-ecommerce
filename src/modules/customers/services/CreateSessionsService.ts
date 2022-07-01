import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { sign, Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ICreateSession } from '../domain/models/ICreateSession';
import { ICustomerAuthenticated } from '../domain/models/ICustomerAuthenticated';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class CreateSessionsService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
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

    console.log('AQUI %O OUTRO %O', customer.password, password);

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
