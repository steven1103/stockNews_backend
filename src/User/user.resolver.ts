import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateAccountOutput, CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly usersService : UserService) {}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.usersService.getAll()
    }

    @Mutation(returns => Boolean)
    async createAccount(
        @Args('input') createAccountInput: CreateUserDto,
      ): Promise<CreateAccountOutput> {
        try {
          const error = await this.usersService.createAccount(createAccountInput);
          if (error) {
            return {
              ok: false,
              error,
            };
          }
          return {
            ok: true,
          };
        } catch (error) {
          return {
            error,
            ok: false,
          };
        }
      }

    @Mutation(returns => Boolean)
    async updateUser(
        @Args('input') updateUserDto: UpdateUserDto
    ): Promise<boolean> {
        try {
            await this.usersService.updateUser(updateUserDto);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    @Mutation(returns => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {}
}