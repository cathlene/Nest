import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    //@Matches(Regular expression) voor een sterk password met symbolen hoofdletters...
    password: string;
}