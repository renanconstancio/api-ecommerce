import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from '@modules/customers/useCases/FindCustomers/FindCustomersUseCases';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomerService: ShowCustomerService;

describe('FindCustomersUseCases', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomerService = new ShowCustomerService(fakeCustomersRepository);
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
