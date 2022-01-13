import { ArgsType, Field } from "@nestjs/graphql";
import { Contains, IsString, Length } from "class-validator";

@ArgsType()
export class CreateUserDto {
    @Field(type => String)
    @IsString()
    @Length(5,10)
    username: string

    @Field(type => String)
    @IsString()
    @Contains("@")
    email: string

    @Field(type => String)
    @IsString()
    password: string

    @Field(type => String)
    @IsString()
    profileImage: string
}