import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    async addProject (data: Prisma.ProjectCreateInput){
        const existingTitle = await this.prisma.project.findUnique({where: {
            title: data.title
        } });
        const existingSubTitle = await this.prisma.project.findUnique({where: {
            subTitle: data.subTitle
        } });
        if(existingTitle || existingSubTitle){
            throw new BadRequestException("Project already added");
        }
        return await this.prisma.project.create({data});
    }


    async getAllProject (){
        return await this.prisma.project.findMany()
    }

    async deleteProjectById(id: string){
        return await this.prisma.project.delete({where: {
            id: id
        }})
    }
}
