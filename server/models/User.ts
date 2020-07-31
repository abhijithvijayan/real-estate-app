import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({length: 64, nullable: false})
  email: string;

  @Column()
  password: string;

  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'last_name'})
  lastName: string;

  @Column()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Column()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
