// import 'reflect-metadata';
// import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository';
// import FindAllCustomersUseCases from '@modules/customers/useCases/FindAllCustomers/FindAllCustomersUseCases';
// import FakeHashProvider from '@modules/customers/repositories/fakes/FakeCustomersHashRepository';
// import CreateCustomersUseCases from '@modules/customers/useCases/CreateCutomers/CreateCustomersUseCases';

// let fakeCustomersRepository: FakeCustomersRepository;
// let listCustomerService: FindAllCustomersUseCases;
// let createCustomer: CreateCustomersUseCases;
// let fakeHashProvider: FakeHashProvider;

// describe('FindAllCustomersUseCases', () => {
//   beforeEach(() => {
//     fakeCustomersRepository = new FakeCustomersRepository();
//     listCustomerService = new FindAllCustomersUseCases(fakeCustomersRepository);
//     fakeHashProvider = new FakeHashProvider();
//     createCustomer = new CreateCustomersUseCases(
//       fakeCustomersRepository,
//       fakeHashProvider,
//     );
//   });

//   it('must be able to list the customers', async () => {
//     await createCustomer.execute({
//       name: 'Renan Constancio',
//       email: 'renan@dcisuporte.com.br',
//       cnpj: 'cnpj',
//       cpf: 'cpf',
//       phone: 'phone',
//       password: 'password',
//       birth_date: '',
//     });

//     const customerList = await listCustomerService.execute({
//       page: 1,
//       limit: 100,
//     });

//     expect(customerList).toEqual(expect.objectContaining({}));
//   });
// });
