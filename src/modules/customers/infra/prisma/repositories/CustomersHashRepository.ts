import { compare, hash } from 'bcryptjs';
import { ICustomersHashRepository } from '@modules/customers/repositories/ICustomersHashRepository';

export default class CustomersHashRepository
  implements ICustomersHashRepository
{
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
