/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

import {Address} from './Address';
import {Country} from './Country';
import {State} from './State';
import {City} from './City';

@Entity()
export class ZipCode {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // ZipCode can have multiple addresses
  @OneToMany((type) => Address, (address) => address.zipCode)
  addresses: Address[];

  @OneToOne((type) => Country)
  @JoinColumn()
  country: Country;

  @OneToOne((type) => State)
  @JoinColumn()
  state: State;

  @OneToOne((type) => City)
  @JoinColumn()
  city: City;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
