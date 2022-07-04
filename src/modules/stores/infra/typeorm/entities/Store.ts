import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stores')
export default class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 105 })
  title!: string;

  @Column({ type: 'varchar', length: 105 })
  fantasy_name!: string;

  @Column({ type: 'varchar', length: 55 })
  email!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'varchar', length: 155 })
  opening_hours!: string;

  @Column({ type: 'varchar', length: 55 })
  address!: string;

  @Column({ type: 'varchar', length: 4 })
  number!: string;

  @Column({ type: 'varchar', length: 35 })
  district!: string;

  @Column({ type: 'varchar', length: 45 })
  complement!: string;

  @Column({ type: 'varchar', length: 35 })
  city!: string;

  @Column({ type: 'varchar', length: 2 })
  state!: string;

  @Column({ type: 'varchar', length: 9 })
  zip_code!: string;

  @Column({ type: 'boolean', default: true })
  visible!: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleated_at: Date;
}
