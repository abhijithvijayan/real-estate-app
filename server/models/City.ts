/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  Entity,
  Unique,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import {ZipCode} from './ZipCode';

@Entity()
@Unique(['name'])
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne((type) => ZipCode, (zipCode) => zipCode.cities)
  zipCode: ZipCode;

  @Column({length: 64, nullable: false})
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
