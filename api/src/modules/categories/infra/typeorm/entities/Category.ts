import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category', { orderBy: { position: 'ASC' } })
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  category_id!: string;

  @Column()
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  keywords!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: 0 })
  position!: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deleted_at!: Date;

  @TreeParent()
  @JoinColumn({ name: 'category_id' })
  parent!: Category;

  @TreeChildren({
    cascade: true,
  })
  @JoinColumn({ name: 'id' })
  children!: Category[];
}
