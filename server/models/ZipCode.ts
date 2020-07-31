/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

import {City} from './City';
import {State} from './State';
import {Country} from './Country';

@Entity()
export class ZipCode {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
