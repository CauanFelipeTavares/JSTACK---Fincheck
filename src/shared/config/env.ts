import { plainToInstance } from "class-transformer"
import { IsNotEmpty, IsString, NotEquals, validateSync } from "class-validator"

class Env { // like a Dto
    @IsString()
    @IsNotEmpty()
    dbURL: string

    @IsString()
    @IsNotEmpty()
    @NotEquals('JWT_EXAMPLE_SECRET')
    jwtSecret: string
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
    dbURL: process.env.DATABASE_URL,
}) // Transfor object to instance, to apply validations

const errors = validateSync(env) // Validate errors

if(errors.length > 0) throw new Error(JSON.stringify(errors, null, 2)) // Send error if exists
