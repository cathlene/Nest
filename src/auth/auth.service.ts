import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.respository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayLoad } from "./jwt-payload.interface";

@Injectable() // make service available for injection in other components like controller
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) // inject repository into service
        private userrepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userrepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{acessToken: string}>{
        const username =await  this.userrepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credentials'); // je gaat niet specifiek zeggen wat er is mis gelopen want je wilt niet dat hackers inside krijgen
        }
        const payload: JwtPayLoad= {username}; // username hier moet hetzelfde noemen als in de interface
        const acessToken = await this.jwtService.sign(payload);
        return {acessToken};
    }
}