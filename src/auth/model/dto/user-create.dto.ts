import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { AuthCredentialDTO } from "./auth-credential.dto";

export class UserCreateDTO extends AuthCredentialDTO {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsPhoneNumber()
    noHP: string
}