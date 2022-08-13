import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { Customers } from '@prisma/client';
import { IPaginateCustomer } from '../../models/IPaginateCustomer';
import { IUpdateCustomer } from '../../models/IUpdateCustomer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customers[] = [];

  async create(data: ICreateCustomer): Promise<Customers> {
    const customer = {} as Customers;

    customer.id = uuidv4();
    customer.name = data.name;
    customer.email = data.email;
    customer.cnpj = data.cnpj;
    customer.cpf = data.cpf;
    customer.phone = data.phone;
    customer.password = data.password;

    this.customers.push(customer);

    return customer;
  }

  async update(data: IUpdateCustomer): Promise<Customers> {
    Object.assign(this.customers, data);

    return data as Customers;
  }

  async remove(id: string): Promise<void> {
    this.customers.find(loop => loop.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateCustomer> {
    return {
      total: 1,
      per_page: 1,
      current_page: 1,
      data: this.customers,
    };
  }

  async findAllPaginate(): Promise<IPaginateCustomer> {
    const customersPaginate = {
      total: 1,
      per_page: 1,
      current_page: 1,
      data: this.customers,
    };

    return customersPaginate;
  }

  async findByName(name: string): Promise<Customers | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer as Customers;
  }

  async findById(id: string): Promise<Customers | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer as Customers;
  }

  async findByEmail(email: string): Promise<Customers | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer as Customers;
  }
}

export default FakeCustomersRepository;
