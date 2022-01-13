import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService : UserService) {}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Mutation(returns => Boolean)
    async createUser(@Args('input') createUserDto: CreateUserDto): Promise<boolean> {
        try {
            await this.userService.createUser(createUserDto)
            return true;
        } catch(e) {
            console.log(e)
            return false;
        }
    }

    @Mutation(returns => Boolean)
    async updateUser(
        @Args('input') updateUserDto: UpdateUserDto
    ): Promise<boolean> {
        try {
            await this.userService.updateUser(updateUserDto);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}