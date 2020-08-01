/* eslint-disable @typescript-eslint/no-unused-vars */
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import {Property} from './Property';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne((type) => Property, (property) => property.photos)
  property: Property;
}
