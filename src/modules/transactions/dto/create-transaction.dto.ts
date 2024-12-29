import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { TransactionType } from "../entities/Transaction";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty({
        description: 'Bank Account ID',
        example: 'asdfg-asdfg-asdfg-asdfg-asdfg',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    bankAccountId: string
    
    @ApiProperty({
        description: 'Category ID',
        example: 'asdfg-asdfg-asdfg-asdfg-asdfg',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string

    @ApiProperty({
        description: 'Name',
        example: 'Sushi night',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Value',
        example: '100',
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    value: number

    @ApiProperty({
        description: 'ISO string date',
        example: new Date,
        required: true,
    })
    @IsNotEmpty()
    @IsDateString()
    date: string

    @ApiProperty({
        description: 'Type',
        enum: TransactionType,
        example: TransactionType.EXPENSE,
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType
}
