import 'reflect-metadata';
import DeleteCustomerService from './DeleteCustomerService';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createDeleteCustomers: CreateCustomerService;
let deleteCustomers: DeleteCustomerService;
let fakeHashProvider: FakeHashProvider;

describe('DeleteCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeHashProvider = new FakeHashProvider();
    createDeleteCustomers = new CreateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
    );
    deleteCustomers = new DeleteCustomerService(fakeCustomersRepository);
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
