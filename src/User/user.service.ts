import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

}