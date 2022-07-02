import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import UpdateCustomerService from './UpdateCustomerService';
// import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
// import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomerService: UpdateCustomerService;
// let createCustomer: CreateCustomerService;
// let fakeHashProvider: FakeHashProvider;

describe('UpdateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);
    // fakeHashProvider = new FakeHashProvider();
    // createCustomer = new CreateCustomerService(
    //   fakeCustomersRepository,
    //   fakeHashProvider,
    // );
  });

  it('must be able to list the customers', async () => {
    expect(
      updateCustomerService.execute({
        id: '',
        name: '',
        email: '',
        cnpj: '',
        cpf: '',
        phone: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // expect(customerShow).toEqual(expect.objectContaining({}));
  });

  // it('should not be able to delete a customer', async () => {
  //   expect(
  //     deleteCustomers.execute({
  //       id: '',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  //   //.toBeNull();
  // });
});
