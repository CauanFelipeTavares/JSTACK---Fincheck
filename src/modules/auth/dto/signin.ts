import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SigninDto {
    @ApiProperty({
        description: 'Email',
        example: 'email@example.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Password',
        example: 'password123',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string
}