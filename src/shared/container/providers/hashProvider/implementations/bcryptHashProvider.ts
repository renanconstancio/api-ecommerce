import { compare, hash } from 'bcryptjs';
import { IBcryptHashPovider } from '../interfaces/IBcryptHashPovider';

export default class BcryptHashProvider implements IBcryptHashPovider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
