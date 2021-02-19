import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class AccountDto {
    @IsOptional()
    @IsEmail()
    @MinLength(4)
    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    @MinLength(4)
    username: string;
}