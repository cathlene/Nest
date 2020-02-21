import { createParamDecorator } from "@nestjs/common";
import { User } from "./auth.entity";

//CUSTOM DECORATOR

export const getUser = createParamDecorator((data,req): User=>{
    return req.user;
});