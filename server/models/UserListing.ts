/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  Column,
  Entity,
} from 'typeorm';

import {Property} from './Property';
import {User} from './User';

/**
 *  User (OneToOne) -> UserListing (OneToMany) -> Property
 */

@Entity()
export class UserListing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // bidirectional
  @OneToOne((type) => User, (user) => user.userListing) // specify inverse side as a second parameter
  user: User;

  @OneToMany((type) => Property, (property) => property.listing)
  properties: Promise<Property[]>;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
