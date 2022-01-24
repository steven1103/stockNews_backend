import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly users: Repository<User>,
     ) {}
    
     getAll(): Promise<User[]> {
         return this.users.find()
     }

     async createAccount({
        email,
        password,
      }: CreateUserDto): Promise<string | undefined> {
        try {
          const exists = await this.users.findOne({ email });
          if (exists) {
            return 'There is a user with that email already';
          }
          await this.users.save(this.users.create({ email, password }));
        } catch (e) {
          return "Couldn't create account";
        }
      }

      updateUser({ id, data }: UpdateUserDto) {
         return this.users.update(id, { ...data })
     }
}