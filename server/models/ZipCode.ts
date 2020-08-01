/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
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

  // ZipCode can have one country
  @ManyToOne((type) => Country, (country) => country.zipCodes)
  country: Country;

  // ZipCode can have one state
  @ManyToOne((type) => State, (state) => state.zipCodes)
  state: State;

  // ZipCode can have one city
  @ManyToOne((type) => City, (city) => city.zipCodes)
  city: City;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
