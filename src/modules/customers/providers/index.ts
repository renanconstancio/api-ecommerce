import { container, delay } from 'tsyringe';
import { IHashProvider } from '@modules/customers/providers/HashProvider/dtos/IHashPovider';
import BcryptHashProvider from '@modules/customers/providers/HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  delay(() => BcryptHashProvider),
);
