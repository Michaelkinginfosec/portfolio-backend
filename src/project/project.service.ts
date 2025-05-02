import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ProjectType } from 'generated/prisma';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    async addProject(type: string, data: Prisma.ProjectCreateInput) {
        const { title, subTitle,type: _type, ...rest } = data;
    
        const existingTitle = await this.prisma.project.findUnique({
            where: { title },
        });
    
        const existingSubTitle = await this.prisma.project.findUnique({
            where: { subTitle },
        });
    
        if (existingTitle || existingSubTitle) {
            throw new BadRequestException('Project already added');
        }
    
        if (type === ProjectType.WORK || type === 'work') {
            const project = await this.prisma.project.create({
                data: {
                    title,
                    subTitle,
                    type: ProjectType.WORK,
                    ...rest, // No need to include 'type' here, it will be handled explicitly
                },
            });
    
            if (!project) {
                throw new BadRequestException('Error creating project');
            }
    
            return project;
        }
    
        if (type === ProjectType.HOBBY || type === 'hobby') {
            const project = await this.prisma.project.create({
                data: {
                    title,
                    subTitle,
                    type: ProjectType.HOBBY,
                    ...rest, // No need to include 'type' here either
                },
            });
    
            if (!project) {
                throw new BadRequestException('Error creating hobbyProject');
            }
    
            return project;
        }
    
        throw new BadRequestException('Invalid project type');
    }
    
    async getAllProject(type: string) {
        if (type === ProjectType.WORK || type === 'work') {
            const projects = await this.prisma.project.findMany({
                where: { type: ProjectType.WORK }, // Filter by type 'WORK'
            });
            if (projects.length === 0) {
                throw new NotFoundException("No work projects found");
            }
            return projects;
        }
    
        if (type === ProjectType.HOBBY || type === 'hobby') {
            const projects = await this.prisma.project.findMany({
                where: { type: ProjectType.HOBBY }, // Filter by type 'HOBBY'
            });
            if (projects.length === 0) {
                throw new NotFoundException("No hobby projects found");
            }
            return projects;
        }
    
        throw new BadRequestException("Invalid project type");
    }
    async deleteProjectById(type: string, id: string) {
        if (type === ProjectType.WORK || type === 'work') {
            // Delete project of type WORK
            const project = await this.prisma.project.delete({
                where: {
                    id: id,
                    type: ProjectType.WORK, // Ensure project is of type WORK
                },
            });
            if (!project) {
                throw new NotFoundException('Work project not found');
            }
            return project;
        }
    
        if (type === ProjectType.HOBBY || type === 'hobby') {
            
            const project = await this.prisma.project.delete({
                where: {
                    id: id,
                    type: ProjectType.HOBBY, 
                },
            });
            if (!project) {
                throw new NotFoundException('Hobby project not found');
            }
            return project;
        }
    
        throw new BadRequestException('Invalid project type');
    }
    
}
