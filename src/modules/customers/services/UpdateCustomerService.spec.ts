import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import AppError from '@shared/errors/AppError';
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
        birth_date: '',
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
