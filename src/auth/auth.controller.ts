import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./auth.entity";
//import { GetUser } from "./get-user.decorator";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<void>{ // ValidationPipe slaagt op de @ in auth-credentials.dto
        return this.authService.signup(AuthCredentialsDto);
    }


    @Post('/signin')
    signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<{acessToken: string}>{ // ValidationPipe slaagt op de @ in auth-credentials.dto
        return this.authService.signIn(AuthCredentialsDto);
    }

    
    @Post('test')
    @UseGuards(AuthGuard())  // authentication middleware => req, res...
     test(@Req() req){
         console.log(req);
    //test(@GetUser()user:User){

    }

}