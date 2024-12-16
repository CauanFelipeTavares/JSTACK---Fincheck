import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignupDto {
    @IsString({ message: 'O nome precisa ser uma string' })
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Email precisa ser do tipo Email' })
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
