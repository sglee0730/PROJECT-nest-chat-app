import { IsString, MinLength, MaxLength, IsEmail, IsNotEmpty } from 'class-validator';

export class AccountDto {
    username?: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsEmail()
    @MinLength(4)
    @MaxLength(40)
    @IsNotEmpty()
    email: string;
};