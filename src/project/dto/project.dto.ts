import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    image?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subTitle:string;
}