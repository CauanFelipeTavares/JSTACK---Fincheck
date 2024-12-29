import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { BankAccountType } from "../entities/BankAccount"
import { ApiProperty } from "@nestjs/swagger"

export class CreateBankAccountDto {
    @ApiProperty({
        description: 'Name',
        example: 'Test Dev',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Initial Balance',
        example: '100',
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    initialBalance: number

    @ApiProperty({
        description: 'Type',
        enum: BankAccountType,
        example: BankAccountType.CHECKING,
        required: true,
    })
    @IsEnum(BankAccountType)
    @IsNotEmpty()
    type: BankAccountType

    @ApiProperty({
        description: 'Hexadecimal Color',
        example: '#777',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsHexColor()
    color: string
}
