import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.token.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Response } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

//  to be deleted
  // @Post('signup')
  // signup(@Body() dto: SignupDto) {
  //   return this.authService.signup(dto);
  // }

 
  @ApiOperation({summary: "Login"})
  @ApiResponse({ status: 201, description: 'Login Success', type: LoginDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post('login')
async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
  const loginResult = await this.authService.login(dto);

  res.cookie('access_token', loginResult.accessToken, {
    httpOnly: true,  // Cannot be accessed by JavaScript (good security)
    secure: false,   // true if using https
    sameSite: 'lax', // protection against CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // You can still return user data if you want
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
