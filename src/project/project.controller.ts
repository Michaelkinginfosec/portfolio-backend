import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/project.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: "Add a project"})
  @ApiResponse({ status: 201, description: 'project has been successfully created.', type: CreateProjectDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post()
  async addProject (@Body() createProjectDto: CreateProjectDto ){
    try{
      return await this.projectService.addProject(createProjectDto);
    }catch (error){
      if(error instanceof BadRequestException){
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({summary: "remove project"})
  @ApiResponse({ status: 200, description: 'project has been succesfully removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async deleteteProject (@Param('id') id:string){
    return await this.projectService.deleteProjectById(id);

  }
  
  @Get()
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({summary: "Get all Projects"})
  @ApiResponse({ status: 200, type: CreateProjectDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async getProjects(){
    return await this.projectService.getAllProject();
  }
}
