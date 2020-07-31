/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  Entity,
  Column,
  Unique,
  JoinColumn,
} from 'typeorm';

import {UserFavourite} from './UserFavourite';
import {UserListing} from './UserListing';
import {Role} from './Role';

export enum UserRole {
  ADMIN = 'admin',
  BUYER = 'buyer',
  SELLER = 'seller',
}

/**
 *  User (ManyToMany) -> Role
 *  User (OneToOne)   -> UserFavourite
 *  User (OneToOne)   -> UserListing
 */

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 64, nullable: false})
  email: string;

  @Column()
  password: string;

  // ManyToOne relationship to role
  @ManyToMany((type) => Role)
  @JoinTable()
  roles: Role[];

  // OneToOne relationship to UserFavourite(buyer favourite list)
  @OneToOne((type) => UserFavourite)
  @JoinColumn()
  userFavourite: UserFavourite;

  // OneToOne relationship to UserListing(buyer listings)
  @OneToOne((type) => UserListing)
  @JoinColumn()
  userListing: UserListing;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
