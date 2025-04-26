import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.token.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Response } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 
  
  
  
  

 
  @ApiOperation({summary: "Login"})
  @ApiResponse({ status: 201, description: 'Login Success', type: LoginDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const loginResult = await this.authService.login(dto);

    res.cookie('access_token', loginResult.accessToken, {
      httpOnly: true,  
      secure: false,   
      sameSite: 'lax', 
      maxAge: 24 * 60 * 60 * 1000, 
    });

    
    return {
      message: "Login successful",
      user: loginResult.user,
    };
  }

  
  @ApiBearerAuth('access-token')
  @Post('refresh')
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({summary: "Refresh token"})
  @ApiResponse({ status: 201, type: RefreshTokenDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async refreshTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }
}
