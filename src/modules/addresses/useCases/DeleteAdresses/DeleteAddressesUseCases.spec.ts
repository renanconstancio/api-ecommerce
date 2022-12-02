import 'reflect-metadata';
import DeleteCustomersUseCases from '@modules/customers/useCases/DeleteCustomers/DeleteCustomersUseCases';
import CreateCustomersUseCases from '@modules/customers/useCases/CreateCutomers/CreateCustomersUseCases';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import FakeHashProvider from '@modules/customers/repositories/fakes/FakeCustomersHashRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createDeleteCustomers: CreateCustomersUseCases;
let deleteCustomers: DeleteCustomersUseCases;
let fakeHashProvider: FakeHashProvider;

describe('DeleteCustomersUseCases', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeHashProvider = new FakeHashProvider();
    createDeleteCustomers = new CreateCustomersUseCases(
      fakeCustomersRepository,
      fakeHashProvider,
    );
    deleteCustomers = new DeleteCustomersUseCases(fakeCustomersRepository);
  });

  it('should be able to delete a customer', async () => {
    const customer = await createDeleteCustomers.execute({
      name: 'Renan Constancio',
      email: 'renan@dcisuporte.com.br',
      cnpj: 'cnpj',
      cpf: 'cpf',
      phone: 'phone',
      birth_date: '',
      password: 'password',
    });

    const customerDelete = await deleteCustomers.execute({
      id: customer.id,
    });

    expect(customerDelete).toBeUndefined();
    // expect(customerDelete).rejects.toBeInstanceOf(AppError);
    //.toBeNull();
  });

  it('should not be able to delete a customer', async () => {
    expect(
      deleteCustomers.execute({
        id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
    //.toBeNull();
  });
});
