import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [UserResolver, UserService],
    imports: [TypeOrmModule.forFeature([User]), ConfigModule, JwtService],
})

export class UserModule {}