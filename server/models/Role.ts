import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller',
  AGENT = 'agent',
}

/**
 *  Role (ManyToMany) -> User
 */

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Todo: better to use enum type?
  @Column({length: 50, unique: true})
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
