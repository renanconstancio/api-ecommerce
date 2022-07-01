import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let fakeHashProvider: FakeHashProvider;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeHashProvider = new FakeHashProvider();
    createCustomer = new CreateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Renan Constancio',
      email: 'renan@dcisuporte.com.br',
      cnpj: 'cnpj',
      cpf: 'cpf',
      phone: 'phone',
      password: 'password',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Renan Constancio',
      email: 'renan@dcisuporte.com.br',
      cnpj: 'cnpj',
      cpf: 'cpf',
      phone: 'phone',
      password: 'password',
    });

    expect(
      createCustomer.execute({
        name: 'Renan Constancio',
        email: 'renan@dcisuporte.com.br',
        cnpj: 'cnpj',
        cpf: 'cpf',
        phone: 'phone',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
