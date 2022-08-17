import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '@modules/customers/providers/HashProvider/dtos/IHashPovider';

export default class BcryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
