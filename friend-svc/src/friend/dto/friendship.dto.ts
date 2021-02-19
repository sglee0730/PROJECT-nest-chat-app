import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FriendshipDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    username?: string;
    target?: string;
    password?: string;

}