import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ScraperDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string;
}