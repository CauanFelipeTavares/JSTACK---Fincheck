import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignupDto {
    @ApiProperty({
        enumName: 'User',
        example: 'user dev',
        required: true,
    })
    @IsString({ message: 'O nome precisa ser uma string' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        enumName: 'Email',
        example: 'email@example.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty({ message: 'Email precisa ser do tipo Email' })
    @IsEmail()
    email: string

    @ApiProperty({
        enumName: 'Password',
        example: 'password123',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
