import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Contains, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  username: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Contains('@')
  email: string;

  @Field((type) => String)
  @Column()
  @IsString()
  password: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  @IsOptional()
  profileImage: string;
}
