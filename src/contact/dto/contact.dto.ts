import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ContactMeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;
}