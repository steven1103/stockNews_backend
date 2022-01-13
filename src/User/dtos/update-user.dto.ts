import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateUserDto } from "./create-user.dto";

@InputType()
export class UpdateUserInputType extends PartialType(CreateUserDto) {}

@InputType()
export class UpdateUserDto {
    @Field(type => Number)
    id: number;

    @Field(type => UpdateUserInputType)
    data: UpdateUserInputType
}