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
        private readonly user: Repository<User>,
     ) {}
    
     getAll(): Promise<User[]> {
         return this.user.find()
     }

     async createUser(createUserDto: CreateUserDto): Promise<User> {
         const newUser = this.user.create(createUserDto)
         return this.user.save(newUser)
     }

      updateUser({ id, data }: UpdateUserDto) {
         return this.user.update(id, { ...data })
     }
}