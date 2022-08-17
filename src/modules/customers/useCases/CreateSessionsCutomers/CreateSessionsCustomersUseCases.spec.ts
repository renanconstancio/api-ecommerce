import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCustomersHashRepository from '@modules/customers/repositories/fakes/FakeCustomersHashRepository';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import CreateSessionsCustomersUseCases from '@modules/customers/useCases/CreateSessionsCutomers/CreateSessionsCustomersUseCases';

let fakeCutomersRepository: FakeCustomersRepository;
let createSession: CreateSessionsCustomersUseCases;
let fakeHashProvider: FakeCustomersHashRepository;

describe('CreateSessionsCustomersUseCases', () => {
  beforeEach(() => {
    fakeCutomersRepository = new FakeCustomersRepository();
    fakeHashProvider = new FakeCustomersHashRepository();
    createSession = new CreateSessionsCustomersUseCases(
      fakeCutomersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const customer = await fakeCutomersRepository.create({
      name: 'Renan Testes',
      email: 'teste@teste.com',
      password: '123456',
      phone: '',
      cnpj: '',
      cpf: '',
      birth_date: '',
    });

    const response = await createSession.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(customer).toEqual(response.customer);

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existent customer or wrong password', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
