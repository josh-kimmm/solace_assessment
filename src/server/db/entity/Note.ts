import { Entity, PrimaryGeneratedColumn, Column, Index, BeforeInsert, BeforeUpdate, AfterInsert, AfterUpdate, Exclusion } from 'typeorm';

@Entity()
export default class Note {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text", { nullable: true })
  title: string;

  // This column actually contains a GIN index for tsqueries in postgres. No support for
  // postgresql for decorator @Index({ fullText: true }) https://github.com/typeorm/typeorm/issues/9159
  @Column("text", { nullable: true })
  contents: string;

  @Column("tsvector", { nullable: true, select: false })
  search_vector?: string;  
}