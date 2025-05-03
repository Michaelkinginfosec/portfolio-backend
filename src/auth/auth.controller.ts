import { Controller, Post, Body, UseGuards, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.token.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: "Signup"})
  @ApiResponse({ status: 201, description: 'User has been successfully created.', type: SignupDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({summary: "Login"})
  @ApiResponse({ status: 201, description: 'Login Success', type: LoginDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const loginResult = await this.authService.login(dto);

    res.cookie('access_token', loginResult.accessToken, {
      httpOnly: true,  
      secure: true,   
      sameSite: 'lax', 
      maxAge: 24 * 60 * 60 * 1000, 
    });

    
    return {
      message: "Login successful",
      token: loginResult.accessToken
      
    };
  }

  
  @ApiBearerAuth('access-token')
  @Post('refresh')
  @ApiOperation({summary: "Refresh token"})
  @ApiResponse({ status: 201, type: RefreshTokenDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async refreshTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@User() user: any) {
    return user;  
  }
}
