import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Contains, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail } from 'class-validator';

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
  @IsEmail()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
