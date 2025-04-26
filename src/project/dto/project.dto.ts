import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    image?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    androidLink?: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    iosLink?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    webLink?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    githubLink?: string;
    

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    subTitle:string;
}
