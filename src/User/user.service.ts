import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginInput } from "./dtos/login.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly config : ConfigService,
        private readonly jwtService: JwtService
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

     async login({
        email,
        password,
      }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
        // make a JWT and give it to the user
        try {
          const user = await this.users.findOne({ email });
          if (!user) {
            return {
              ok: false,
              error: 'User not found',
            };
          }
          const passwordCorrect = await user.checkPassword(password);
          if (!passwordCorrect) {
            return {
              ok: false,
              error: 'Wrong password',
            };
          }
          const token = jwt.sign({id:user.id}, this.config.get('SECRET_KEY'))
          return {
            ok: true,
            token,
          };
        } catch (error) {
          return {
            ok: false,
            error,
          };
        }
      }
}