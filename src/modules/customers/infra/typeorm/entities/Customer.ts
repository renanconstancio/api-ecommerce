import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

@Entity('customers')
class Customer implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 105 })
  name!: string;

  @Column({ type: 'varchar', length: 85 })
  email!: string;

  @Column({ type: 'varchar', length: 86 })
  password!: string;

  @Column({ type: 'varchar', length: 20 })
  cpf!: string;

  @Column({ type: 'varchar', length: 22 })
  cnpj!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'varchar', length: 41 })
  avatar!: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at!: Date;
}

export default Customer;
