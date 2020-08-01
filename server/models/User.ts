/* eslint-disable class-methods-use-this, @typescript-eslint/no-unused-vars */
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
import bcryptjs from 'bcryptjs';

import {UserFavourite} from './UserFavourite';
import {UserListing} from './UserListing';
import {Role} from './Role';

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

  @Column({select: true})
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
  @OneToOne((type) => UserListing, (listing) => listing.user) // specify inverse side as a second parameter
  @JoinColumn()
  userListing: UserListing;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  getPasswordHash(password: string): string {
    return bcryptjs.hashSync(password, 10);
  }

  checkIfPasswordsMatch(password: string): boolean {
    return bcryptjs.compareSync(password, this.password);
  }

  // https://github.com/typeorm/typeorm/issues/535#issuecomment-662471151
  toJSON(): this {
    delete this.password;
    return this;
  }
}
