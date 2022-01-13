import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  username: string;

  @Field(type => Boolean)
  @Column()
  email: boolean;

  @Field(type => String)
  @Column()
  password: string;

  @Field(type => String)
  @Column()
  profileImage: string;
}