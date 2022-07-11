import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { Exclude } from 'class-transformer';

@Entity('customers')
export default class Customer implements ICustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 105 })
  name!: string;

  @Column({ type: 'varchar', length: 85 })
  email!: string;

  @Column({ type: 'varchar', length: 86 })
  @Exclude()
  password!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  cpf!: string;

  @Column({ type: 'varchar', length: 22, nullable: true })
  cnpj!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  birth_date!: string;

  @Column({ type: 'varchar', length: 41, nullable: true })
  avatar!: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at!: Date;
}
