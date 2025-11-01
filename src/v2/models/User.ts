
import { role } from "./Enums";

export interface IUserBase {
    id:string;
    email: string;
    role: role;
}


export interface IUser {
    username: string;
    email: string;
    password:string;
    role: role;
    favorites?:string[]
}




