import { Entity, BaseEntity,PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username']) //array of column names that must be unique, wordt gdn op db level, nu moet je niet meer in je repositroy checken of user al is toegevoegd of niet
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    // custom method for user
    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password,this.salt);
        return hash === this.password;
    }
  
}