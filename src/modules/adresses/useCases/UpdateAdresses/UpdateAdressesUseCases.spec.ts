// import 'reflect-metadata';
// import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
// import UpdateCustomersUseCases from '@modules/customers/useCases/UpdateCustomers/UpdateCustomersUseCases';

// import AppError from '@shared/errors/AppError';

// let fakeCustomersRepository: FakeCustomersRepository;
// let updateCustomerService: UpdateCustomersUseCases;

// describe('UpdateCustomersUseCases', () => {
//   beforeEach(() => {
//     fakeCustomersRepository = new FakeCustomersRepository();
//     updateCustomerService = new UpdateCustomersUseCases(
//       fakeCustomersRepository,
//     );
//     // fakeHashProvider = new FakeHashProvider();
//     // createCustomer = new CreateCustomerService(
//     //   fakeCustomersRepository,
//     //   fakeHashProvider,
//     // );
//   });

//   it('must be able to list the customers', async () => {
//     expect(
//       updateCustomerService.execute({
//         id: '',
//         name: '',
//         email: '',
//         cnpj: '',
//         cpf: '',
//         phone: '',
//         birth_date: '',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//     // expect(customerShow).toEqual(expect.objectContaining({}));
//   });

//   // it('should not be able to delete a customer', async () => {
//   //   expect(
//   //     deleteCustomers.execute({
//   //       id: '',
//   //     }),
//   //   ).rejects.toBeInstanceOf(AppError);
//   //   //.toBeNull();
//   // });
// });
