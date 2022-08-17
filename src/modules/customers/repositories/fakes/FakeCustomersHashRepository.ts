import { ICustomersHashRepository } from '@modules/customers/repositories/ICustomersHashRepository';

export default class FakeCustomersHashRepository
  implements ICustomersHashRepository
{
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
