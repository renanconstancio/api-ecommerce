import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';
// import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
// import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomerService: ShowCustomerService;
// let createCustomer: CreateCustomerService;
// let fakeHashProvider: FakeHashProvider;

describe('ShowCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomerService = new ShowCustomerService(fakeCustomersRepository);
    // fakeHashProvider = new FakeHashProvider();
    // createCustomer = new CreateCustomerService(
    //   fakeCustomersRepository,
    //   fakeHashProvider,
    // );
  });

  it('must be able to list the customers', async () => {
    expect(
      showCustomerService.execute({
        id: '',
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
