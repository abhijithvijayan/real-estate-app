/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  Entity,
  Unique,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import {ZipCode} from './ZipCode';

@Entity()
@Unique(['name', 'code'])
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne((type) => ZipCode, (zipCode) => zipCode.countries)
  zipCode: ZipCode;

  @Column({nullable: false})
  code: string;

  @Column({length: 64, nullable: false})
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
