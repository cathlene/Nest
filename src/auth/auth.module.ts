import { Module } from '@nestjs/common';
import { AuthController} from './auth.controller';
import { AuthService} from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Module({

    imports:[  // in order to do dependency injection
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.register({
            secret: 'topsecret51',
            signOptions:{
                expiresIn:3600, // expires in 1 hour
            }
        }),
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AuthController],
    providers:[AuthService,JwtStrategy],
    exports:[
        JwtStrategy, // so it can be used in other modules
        PassportModule
    ]

})
export class AuthModule {}
