import { EntityRepository, Repository } from "typeorm";
import { User } from "./auth.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


    @EntityRepository(User) // repository is a persistence layer so in the service you dont have to write a lot of logic in order to save a task bijvoorbeeld je kan gwn een functie gebruiken
    // die bestaat in de repository
    export class UserRepository extends Repository<User>{
        async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
            const{username,password} = authCredentialsDto;

            const salt = await bcrypt.genSalt(); // per keer een random string die op je wachtwacht wordt geplakt voor je wachtwoord wordt gehashed

            const user:User = new User();
            user.username = username;
            user.password = await this.hashedPassword(password,salt);
            user.salt = salt;
            try{
                await user.save(); // dit zal een error gooien als user al bestaat
            }catch(error){
                if(error.code ==='ER_DUP_ENTRY'){ // dit is de error code voor duplicate
                    throw new ConflictException('Username already exists');
                }
                else{
                    throw new InternalServerErrorException();
                }
            }
           
        }
        async validateUserPassword(authCredentialsDto: AuthCredentialsDto):Promise<string>{
            const {username,password} = authCredentialsDto;
            const user = await this.findOne({username});
            if(user && await user.validatePassword(password)){
                return user.username;
            }
            return null;

        }

        private async hashedPassword(password:string, salt:string): Promise<string>{
            return bcrypt.hash(password,salt);
        }
}