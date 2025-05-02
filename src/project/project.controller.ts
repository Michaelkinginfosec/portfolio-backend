import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Prisma, ProjectType } from 'generated/prisma';

@ApiBearerAuth('access-token')
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @ApiOperation({summary: "Add a project"})
  @ApiResponse({ status: 201, description: 'project has been successfully created.', type: CreateProjectDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  @Post(':type')
  async addWorkProject(
    @Param('type') type: string,
    @Body() createProjectDto: CreateProjectDto
  ) {
    
    const data: Prisma.ProjectCreateInput = {
      ...createProjectDto,
      type: type.toUpperCase() as ProjectType, 
    };
  
    return await this.projectService.addProject(type, data);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({summary: "remove project"})
  @ApiResponse({ status: 200, description: 'project has been succesfully removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async deleteteProject (@Param('id') id:string){
    return await this.projectService.deleteProjectById( id);

  }
  
  
  @ApiOperation({summary: "Get all Projects"})
  @ApiResponse({ status: 200, type: CreateProjectDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get(':type')
  async getProjects( @Param('type') type: string) {
    return await this.projectService.getAllProject(type);
  }
}
