// import 'reflect-metadata';
// import CreateAdressesUseCases from '@modules/adresses/useCases/CreateAdresses/CreateAdressesUseCases';
// import FakeAdressesRepository from '@modules/adresses/repositories/fakes/FakeAdressesRepository';
// import FakeHashProvider from '@modules/adresses/repositories/fakes/FakeAdressesHashRepository';
// import AppError from '@shared/errors/AppError';

// let fakeAdressesRepository: FakeAdressesRepository;
// let createCustomer: CreateAdressesUseCases;
// let fakeHashProvider: FakeHashProvider;

// describe('CreateAdressesUseCases', () => {
//   beforeEach(() => {
//     fakeAdressesRepository = new FakeAdressesRepository();
//     fakeHashProvider = new FakeHashProvider();
//     createCustomer = new CreateAdressesUseCases(
//       fakeAdressesRepository,
//       fakeHashProvider,
//     );
//   });

//   it('should be able to create a new customer', async () => {
//     const customer = await createCustomer.execute({
//       name: 'Renan Constancio',
//       email: 'renan@dcisuporte.com.br',
//       cnpj: 'cnpj',
//       cpf: 'cpf',
//       phone: 'phone',
//       password: 'password',
//       birth_date: '',
//     });

//     expect(customer).toHaveProperty('id');
//   });

//   it('should not be able to create two adresses with the same email', async () => {
//     await createCustomer.execute({
//       name: 'Renan Constancio',
//       email: 'renan@dcisuporte.com.br',
//       cnpj: 'cnpj',
//       cpf: 'cpf',
//       phone: 'phone',
//       password: 'password',
//       birth_date: '',
//     });

//     expect(
//       createCustomer.execute({
//         name: 'Renan Constancio',
//         email: 'renan@dcisuporte.com.br',
//         cnpj: 'cnpj',
//         cpf: 'cpf',
//         phone: 'phone',
//         password: 'password',
//         birth_date: '',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
