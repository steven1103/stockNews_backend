import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";

import { User } from "../entities/user.entity";

@InputType()
export class CreateUserDto extends OmitType(User, ['id']) {}

@ObjectType()
export class CreateAccountOutput {
  @Field(type => String, { nullable: true })
  error?: string;

  @Field(type => Boolean)
  ok: boolean;
}