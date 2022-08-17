import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import FakeHashProvider from '@modules/customers/providers/HashProvider/fakes/FakeHashProvider';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomerService: ListCustomerService;
let createCustomer: CreateCustomerService;
let fakeHashProvider: FakeHashProvider;

describe('ListCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomerService = new ListCustomerService(fakeCustomersRepository);
    fakeHashProvider = new FakeHashProvider();
    createCustomer = new CreateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
    );
  });

  it('must be able to list the customers', async () => {
    await createCustomer.execute({
      name: 'Renan Constancio',
      email: 'renan@dcisuporte.com.br',
      cnpj: 'cnpj',
      cpf: 'cpf',
      phone: 'phone',
      password: 'password',
      birth_date: '',
    });

    const customerList = await listCustomerService.execute({
      page: 1,
      limit: 100,
    });

    expect(customerList).toEqual(expect.objectContaining({}));
  });
});
