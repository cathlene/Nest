import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { JwtPayLoad } from './jwt-payload.interface';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){ // hier pak je eingelijk je usergegevens uit token, enkel usename, zet geen gevoelige data in token, enkel unieke 

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'topSecret51',
        });
    }

    async validate(payload:JwtPayLoad): Promise<User>{ // this method must exists for every strategy
        const {username} = payload;
        const user= await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}