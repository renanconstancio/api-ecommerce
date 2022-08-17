import 'reflect-metadata';
import CreateCustomersUseCases from '@modules/customers/useCases/CreateCutomers/CreateCustomersUseCases';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import FakeHashProvider from '@modules/customers/repositories/fakes/FakeCustomersHashRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomersUseCases;
let fakeHashProvider: FakeHashProvider;

describe('CreateCustomersUseCases', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeHashProvider = new FakeHashProvider();
    createCustomer = new CreateCustomersUseCases(
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
      birth_date: '',
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
      birth_date: '',
    });

    expect(
      createCustomer.execute({
        name: 'Renan Constancio',
        email: 'renan@dcisuporte.com.br',
        cnpj: 'cnpj',
        cpf: 'cpf',
        phone: 'phone',
        password: 'password',
        birth_date: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
